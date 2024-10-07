
import type { SalesOrder, ProductCheckout, Row as RowSalesOrder } from "~/interfaces/SalesOrder.js";
import type { SaleData, Order } from "~/interfaces/SaleData.js";
import type { StockTagControl, Row } from "~/interfaces/StockTagControl.js";
import type { User } from "~/interfaces/User";
import type { UserAnalysis } from "~/interfaces/UserAnalysis.js";

export const useCheckOutStore = defineStore("checkout", () => {

  const search = ref<string | null>("");

  const salesOrder = ref<Order>()

  const products = ref<ProductCheckout[]>([])

  const box = ref<string>('');

  const provisionalTagAlreadyPrinted = ref<boolean>(false)

  const { $customFetch } = useNuxtApp();

  const loading = useLoadingIndicator()

  const dialog = ref(false)

  const { capitalizeFirstLetter } = useCapitalize()

  // Ref do input sale id
  const inputSaleId = ref();

  async function loadSalesOrder() {
    reset()

    loading.start()

    search.value = await getTag();

    if (search.value) {
      try {
        // Obtem dados do pedido
        const saleRes = await $customFetch<SaleData>(
          `sales-order/sale-data?id=${search.value}`
        );

        salesOrder.value = saleRes.Order

        await setDetails();

        await getBox();

        const activateProductCounting = await getHistory();

        if (!activateProductCounting) {
          loading.finish()

          dialog.value = true;
        } else {
          verifyOrder();
        }

        search.value = "";

        if (!loading.isLoading.value) {
          loading.finish();
        }
      } catch (error) {
        loading.finish();

        search.value = "";

        const err = error as { statusText: string; message: string };

        $toast().error(`${err.statusText ?? err.message}`);
      }
    } else {
      search.value = "";

      $toast().error("A tag informada não possui vinculo com algum pedido.");

      loading.finish()
    }
  };

  const tags = ref<Row[]>([])

  async function getTag() {
    interface Tag {
      id_tag: number;
      erp_product_id: number;
      produto_chave: number;
      name: string;
    }

    if (search.value && search.value.includes("}")) {
      const tag = JSON.parse(search.value) as Tag;

      try {
        // Obter dados da tag
        const stockTag = await $customFetch<StockTagControl>(
          `stock-tag-control?id=${tag.id_tag}&all_tags=true`
        );

        tags.value = stockTag.rows

        return stockTag.rows[0]?.ecom_order_id != null
          ? `${stockTag.rows[0]?.ecom_order_id}`
          : null;
      } catch (error) {
        const err = error as { statusText: string; message: string };

        $toast().error(`${err.statusText ?? err.message}`);

        return null;
      }
    } else {
      return search.value;
    }
  };

  async function setDetails() {
    const { id, OrderInvoice, ProductsSold } = salesOrder.value!

    const invoice = OrderInvoice[0]?.OrderInvoice ?? undefined;

    if (tags.value.length == 0) {
      const stockTag = await $customFetch<StockTagControl>(
        `stock-tag-control?ecom_order_id=${id}`
      );

      tags.value = stockTag.rows
    }

    if (invoice && tags.value.length > 0) {
      // Carrega dados da nota fiscal
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(invoice?.xml_danfe, "text/xml");

      const prods = Array.from(xmlDoc.getElementsByTagName("prod"));

      // Retirando os produtos duplicados e somando a quantidade dos duplicados
      const productsInvoice: { name: string | null; quantity: number }[] = [];
      prods.forEach((item) => {
        const name = item.childNodes[0].textContent;
        const quantity = parseInt(
          item.getElementsByTagName("qCom")[0].childNodes[0].textContent || "0",
          10
        );

        const prodDuplicated = productsInvoice.find((redItem) => redItem.name === name);

        if (prodDuplicated) {
          prodDuplicated.quantity += quantity;
        } else {
          productsInvoice.push({
            name,
            quantity,
          });
        }
      });

      for (const tag of tags.value) {
        const duplicated = products.value.some((redItem) => tag.name === redItem.name);

        if (!duplicated) {
          // Busca produto na nota fiscal
          const productInvoice = useArrayFind(productsInvoice, (e) => e.name == tag.name);

          // Obter dados do produto na tray
          const productTray = useArrayFind(
            ProductsSold,
            (e) => e.ProductsSold.reference == tag.produto_chave.toString()
          );

          // Obtem a quantidade pela tag
          const quantityTag = tags.value.filter((item) => tag.name == item.name).length;

          const tagsCheck = tags.value.map((e) => {
            return {
              tag_id: e.id,
              check: false
            }
          })

          if (productInvoice.value) {
            if (quantityTag !== productInvoice.value.quantity) {
              $toast().warning(`O codigo ${tag.name} não foi completamente separado.`);
            }

            products.value.push({
              ...tag.Product,
              quantitySold: productInvoice.value?.quantity ?? 0,
              imageUrl: productTray.value?.ProductsSold.ProductSoldImage[0]?.http ?? "",
              countedQuantity: 0,
              tags: tagsCheck
            });
          } else {
            products.value.push({
              ...tag.Product,
              quantitySold: quantityTag,
              imageUrl: productTray.value?.ProductsSold.ProductSoldImage[0]?.http ?? "",
              countedQuantity: 0,
              tags: tagsCheck
            });
          }
        }
      }
    } else {
      // Pedido não possui dados fiscais
      $toast().warning('Pedido não possui dados fiscais.')

      for (const tag of tags.value) {
        const duplicated = useArraySome(products, (e) => tag.name === e.name).value

        if (!duplicated) {
          // Obter dados do produto na tray
          const productTray = useArrayFind(
            ProductsSold,
            (e) => e.ProductsSold.reference == tag.produto_chave.toString()
          );

          // Obtem a quantidade pela tag
          const quantityTag = tags.value.filter((item) => tag.name == item.name).length;

          const tagsCheck = tags.value.map((e) => {
            return {
              tag_id: e.id,
              check: false
            }
          })

          products.value.push({
            ...tag.Product,
            quantitySold: quantityTag,
            imageUrl: productTray.value?.ProductsSold.ProductSoldImage[0].http ?? "",
            countedQuantity: 0,
            tags: tagsCheck
          });
        }
      }
    }
  };

  const desiredStatuses = [
    "AGUARDANDO ETIQUETA TRANSP.",
    "ERRO ARQUIVO XML NF",
    "ERRO DE IMPRESSÃO",
    "ARQUIVO RECEBIDO",
    "COLETA ADIADA",
    "EM SEPARAÇÃO",
    "FATURADO",
  ];

  async function getHistory() {
    // Verificar se o produto possui historico com a contagem concluida
    const history = await $customFetch<SalesOrder>(`sales-order?sale_id=${search.value}`);

    provisionalTagAlreadyPrinted.value = history.rows.some((tag) => desiredStatuses.includes(tag.status))

    const counterProducts = useArrayFind(history.rows, (e) => e.complete_product_counter).value !== undefined;

    return counterProducts;
  };

  async function getBox() {
    const res = await $customFetch<{ box: string }>("sales-order/order-boxes", {
      method: "POST",
      body: products.value,
    });

    box.value = res.box
  };

  const statusForTemporaryTag = ref([
    'A ENVIAR',
    'AGUARDANDO ETIQUETA',
    'ERRO DE IMPRESSÃO',
    'ERRO XML',
    'COLETA ADIADA',
    'ARQUIVO RECEBIDO',
    'EM SEPARAÇÃO',
    'CANCELADO',
    'EM TRANSFERÊNCIA',
    'FATURADO',
  ])

  interface SalesOrderTag {
    sale_tag: string;
    nameShipping?: string;
    nfKey?: string;
    shipping_volume?: string
  }

  const saleTag = ref<SalesOrderTag>()

  const statusMapping: { [key: string]: string } = {
    'AGUARDANDO ETIQUETA': 'AGUARDANDO ETIQUETA TRANSP.',
    'ERRO DE IMPRESSÃO': 'AGUARDANDO ETIQUETA TRANSP.',
    'ERRO XML': 'ERRO ARQUIVO XML NF',
    'ETIQUETA INEXISTENTE': 'EMBALADO',
    'IMPRESSÃO CONCLUÍDA': 'EMBALADO',
  }

  async function verifyOrder() {
    if (!loading.isLoading.value) {
      loading.start()
    }

    const { id, OrderStatus } = salesOrder.value!

    const validate = validStatus()
    if (!validate) return

    try {
      saleTag.value = await $customFetch<SalesOrderTag>(`sales-order/tag?id=${id}`, {
        retry: 0
      })

      if (statusForTemporaryTag.value.includes(saleTag.value.sale_tag)) {
        await tagProvisional() // Etiqueta temporaria
      }
    } catch (error) {
      const err = error as { statusText: string; data: { error: string } };

      $toast().error(capitalizeFirstLetter(`${err.data.error ?? err.statusText}`));

      saleTag.value = {
        sale_tag: err.data.error,
      }

      await tagProvisional() // Etiqueta temporaria

      loading.finish()

      setTimeout(() => {
        inputSaleId.value.focus()
      }, 200);

    }

    let textStatus
    if (OrderStatus.status === 'COLETA ADIADA') {
      textStatus = 'COLETA ADIADA'
    } else {
      textStatus = statusMapping[saleTag.value!.sale_tag] || ''
    }

    if (textStatus !== '') {
      await setStatusTray(id, textStatus)
    } else {
      $toast().error(capitalizeFirstLetter(saleTag.value.sale_tag))
    }

    loading.finish()

    // Adicionando historico
    await setHistory()

    setTimeout(() => {
      inputSaleId.value.focus()
    }, 200);
  };

  const desiredStatus = [
    'FATURADO',
    'AGUARDANDO NF / ETIQUETA TRANSP.',
    'ETIQUETA GERADA',
    'AGUARDANDO ETIQUETA TRANSP.',
    'ERRO DE IMPRESSÃO',
    'EMBALADO',
    'EM TRANSFERENCIA',
    'ERRO ARQUIVO XML NF',
    'EM SEPARAÇÃO',
    'COLETA ADIADA',
    'ARQUIVO RECEBIDO',
  ]

  const CanceledStatus = [
    'CANCELADO',
    'CANCELADO AUT',
    'CANCELADO DEV',
    'CANCELADO DEV AGILIZADA',
    'CANCELADO DEV MEDIAÇÃO',
    'CANCELADO ETQ',
    'CANCELADO PELO DESTINATARIO',
    'CANCELADO FULL',
  ]

  function validStatus() {
    const { id, OrderStatus } = salesOrder.value!

    if (!desiredStatus.includes(OrderStatus.status)) {
      if (CanceledStatus.includes(OrderStatus.status)) {
        removeTags(id)
      }

      setHistory()

      return false
    }

    return true
  };

  async function removeTags(id: string) {
    try {
      const stockTag = await $customFetch<StockTagControl>(`stock-tag-control?ecom_order_id=${id}`)

      if (stockTag.rows.length == 0) return

      for (let i = 0; stockTag.rows.length > i; i++) {

        const tag = stockTag.rows[i]

        await $customFetch('stock-tag-control', {
          method: 'PUT',
          body: {
            id: tag.id,
            ecom_order_id: null,
            erp_order_id: null,
          }
        })
      }
    } catch (error) {
      const err = error as { statusText: string; message: string };

      $toast().error(capitalizeFirstLetter(`${err.statusText ?? err.message}`));
    }
  };

  const { data } = useAuthState();
  const user = data.value as User;

  const sellerMap = ref<{ [key: number]: string }>({
    5: 'VIZIOTECH',
    6: 'COMCLICK',
    7: 'LOJADOTECNICO.COM',
  });

  async function setHistory() {
    const { id, OrderStatus, ProductsSold, point_sale, shipment, Customer, OrderInvoice, shipment_value, MlOrder, sending_code, MarketplaceOrder } = salesOrder.value!

    try {
      const res = await $customFetch<RowSalesOrder>('sales-order', {
        method: 'POST',
        body: {
          sale_id: id,
          user: user.name,
          initial_status: OrderStatus.status,
          status: statusMapping[saleTag.value?.sale_tag ?? ''] ?? OrderStatus.status,
          produto_chave: ProductsSold[0].ProductsSold.reference,
          description: ProductsSold[0].ProductsSold.original_name,
          weight_cubic: ProductsSold[0].ProductsSold.weight_cubic,
          seller: MarketplaceOrder[0]?.MarketplaceOrder.marketplace_seller_name || sellerMap.value[id.length],
          poin_sale: point_sale,
          shipment_mode: shipment,
          customer: Customer.name,
          complete_product_counter: true,
          invoice: OrderInvoice[0]?.OrderInvoice?.number,
          freight_quotation: shipment_value,
          customer_document: Customer.cnpj || Customer.cpf,
          tracking_id: MlOrder[0]?.MlOrder.codigo || sending_code || null,
          nf_key: saleTag.value?.nfKey ?? '',
          shipping_volume: saleTag.value?.shipping_volume ?? 0,
        }
      })

      // $toast().info(`Status do pedido ${(saleTag.value?.sale_tag ?? OrderStatus.status).toLowerCase()}`)

      const tableStore = useTableStore();
      const { items, itemsPerPage, totalItems } = storeToRefs(tableStore);

      items.value.splice(0, 0, {
        ...res,
        observation: '',
        sales_collection_id: null,
        freight_invoice: '0.00',
        freight_value_validation: '0.00',
        freight_validated: false,
        freight_validated_at: null,
        freight_comment: null,
        finalized_freight_invoice: '',
        collected: false,
        canceled: false,
        deleted_at: null
      });

      totalItems.value += 1

      if (items.value.length >= itemsPerPage.value) {
        items.value.pop()
      }
    } catch (error) {
      const err = error as { statusText: string; message: string };

      $toast().error(capitalizeFirstLetter(`${err.statusText ?? err.message}`));
    }
  };

  async function tagProvisional() {
    if (!provisionalTagAlreadyPrinted.value) {

      const { id, point_sale, shipment, MarketplaceOrder } = salesOrder.value!

      const stringTags = tags.value.map((item) => item.id).join(',')
      const stringFab = tags.value.map((item) => item.name).join(',')

      try {
        await $customFetch('sales-order/tag-temporary', {
          method: 'POST',
          body: {
            id,
            seller: MarketplaceOrder[0]?.MarketplaceOrder.marketplace_seller_name || sellerMap.value[id.length],
            point_sale,
            shipment,
            stringTags,
            stringFab,
            firstTag: {
              id_tag: tags.value[0].id,
              erp_product_id: tags.value[0].erp_product_id,
              name: tags.value[0].name,
              produto_chave: tags.value[0].produto_chave,
            },
          }
        })
      } catch (error) {
        const err = error as { statusText: string; message: string };

        $toast().error(capitalizeFirstLetter(`${err.statusText ?? err.message}`));
      }
    } else {
      $toast().info('Etiqueta provisoria ja emitida.')
    }
  };

  async function setStatusTray(id: string, textStatus: string) {
    try {
      // Alteração de status na tray.
      await $customFetch('sales-order/status', {
        method: 'POST',
        body: {
          id,
          status: textStatus,
        }
      })

    } catch (error) {
      const err = error as { statusText: string; message: string };

      $toast().error(`${err.statusText ?? err.message}`);
    }
  }

  function reset() {
    salesOrder.value = undefined;

    products.value = [];

    box.value = '';

    provisionalTagAlreadyPrinted.value = false;
  }

  const abbreviationPointSalerMap = ref<{ [key: string]: string }>({
    SAC: 'SAC',
    LOJAVIRTUAL: 'LV',
    'LOJA VIRTUAL': 'LV',
    SHOPEE: 'SH',
    'MAGAZINE LUIZA': 'MG',
    'MERCADO LIVRE': 'ML',
    AMAZON: 'AM',
    'AMERICANAS EMPRESAS': 'AE',
    'LOJAS AMERICANAS': 'LA',
    CNOVA: 'CN'
  })

  const mapColorSeller = ref<{ [key: string]: string }>({
    VIZIOTECH: 'blue',
    COMCLICK: 'cyan',
    'LOJADOTECNICO.COM': 'orange',
    'ORIGIPARTS.COM': 'purple',
  })

  const dateUserAnalysis = ref('');

  const itemsUserAnalysis = ref<UserAnalysis>()

  const loadingUserAnalysis = ref(false)

  return {
    search,
    salesOrder,
    products,
    loadSalesOrder,
    dialog,
    box,
    provisionalTagAlreadyPrinted,
    verifyOrder,
    sellerMap,
    abbreviationPointSalerMap,
    desiredStatuses,
    statusForTemporaryTag,
    mapColorSeller,
    dateUserAnalysis,
    itemsUserAnalysis,
    loadingUserAnalysis,
    inputSaleId
  }
})
