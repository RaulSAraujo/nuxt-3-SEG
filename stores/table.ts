import type { RouteLocationNormalizedLoaded } from "#vue-router";

export const useTableStore = defineStore("table", () => {

    const url = ref<string>('')
    const routerFull = ref<boolean | null | undefined>(undefined);
    const items = ref<object[]>([]);
    const totalItems = ref(0);
    const sortBy = ref<[{ key: string; order: string }]>();
    const loading = ref(true);
    const page = ref(1);
    const itemsPerPage = ref(10);
    const itemsPerPageoptions = ref([
        { value: 10, title: "10" },
        { value: 25, title: "25" },
        { value: 50, title: "50" },
        { value: 100, title: "100" },
    ]);
    const pageCount = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

    const selected = ref([])

    const expanded = ref<Array<object>>([]);

    const routeMap = ref<{ [key: string]: string }>({
        'register-product': 'product',
        'register-product-sell': 'product-sell',
        'register-package': 'package',
        'register-device': 'apparatus',
        'register-client': 'clients',
        'register-validate-image': 'validate-products-image',
        'register-device-classification-apparatus': 'classification-apparatus',
        "register-warehouse": 'erp-warehouses',
        'register-supplier': 'supplier',
        'register-saved-rma-id-apparatus': 'SavedApparatusRma',
        'register-saved-rma-id-products': 'SavedProductsRma',
        'purchase-order': 'PurchaseControl',
        'purchase-order-import': 'ImportOrders',
        'purchase-quotation': 'quotation-pack',
        'purchase-request': 'purchase-request',
        'purchase-insumos': 'InputMaterials',
        'purchase-saved-rma': 'saved-rma',
        'purchase-order-ml': 'OrdersFinalityStockMl',
        'purchase-receipt': 'Receivement',
        'purchase-pending-price': 'PurchaseControlProduct',
        'purchase-validate-price-ml': 'ValidatePricePercentage',
        'purchase-validate-stock-virtual': 'ValidateVirtualStock',
        'sale-order': 'SalesOrder',
        'sale-shipping-validation': 'shipping-validation',
        'sale-verification-order': 'SalesOrdersSeparation',
        'sale-warranty': 'WarrantyRma',
        'sale-shipping-verification': 'SalesOrder',
        'service-order': 'ServiceOrder',
        'service-cash-control': 'ReceptionCashControl',
        'service-crm': 'Crm',
        'stock-storage-location': 'ErpProductStock',
        'stock-product-loan': 'ProductLoan',
        'stock-separation-log': 'OrderPicking',
        'stock-product-label': 'stock-tag-control',
        'stock-parts-collection-management': 'PartsCollectionManagement',
        'expedition-cut-time': 'CarrierCutTime',
        'manager-pendency': 'Pendency',
        'manager-tax-stock': 'TaxStock',
        'integration-sync-errors': 'ProductSyncErrors',
        'option-index-supplier-passwords': 'SupplierPasswords',
        'option-index-supplier-passwords-log': 'SupplierPasswordsLogs',
        'option-index-notifications-config': 'NotificationsConfig',
        'option-index-city': 'City',
        'option-index-region': 'Region',
        'option-index-limit-date': 'LimitDatePurchaseControl',
        'option-index-product-template': 'TemplateConfig',
        'option-index-table-price-desk': 'TablePrice',
        'option-index-printer': 'PrintersSettings',
        'option-index-shipment': 'ShipmentOrders',
        'option-index-permission': 'Group',
        'option-index-grid-filter': 'CustomFilters',
        'option-index-system': 'ManageSystem',
        'option-index-company': 'Companies',
        'option-index-invoicing': 'InvoiceRule',
        'option-index-user': 'User',
        'option-index-log-access': 'LoginLog',
        'option-index-access': 'UsersAccessList',
    });

    function findRouteMap() {
        const { name }: RouteLocationNormalizedLoaded = useRoute();

        url.value = routeMap.value[name!.toString()];
    };

    async function searchData() {
        type types = string | number | boolean | null | undefined;
        type AccValue = types | types[];
        const validateValue = (value: AccValue) => {
            if (value === null || value === undefined) {
                return false;
            }

            if (typeof value === "string" && value.trim() === "") {
                return false;
            }

            if (typeof value === 'object' && value.length === 0) {
                return false;
            }

            return true;
        };

        const sortfield = sortBy.value?.map((i) => i.key).join(',') ?? undefined
        const sortType = sortBy.value?.map((i) => i.order).join(',') ?? undefined

        const filterStore = useFilterStore()
        const { availableFilter, changeValuesFilter } = storeToRefs(filterStore)

        const { databaseDate, isDate } = useDateConversion()

        const params = availableFilter.value.reduce(
            (acc: Record<string, AccValue>, { attribute, value }) => {
                if (validateValue(value)) {
                    // Formatação do input array data.
                    if (typeof value === 'string' && value.split(' - ').length === 2) {
                        const array = value.split(' - ');

                        for (let i = 0; i < array.length; i++) {
                            array[i] = databaseDate(array[i])
                        }

                        value = array.join(',');
                    }

                    if (typeof value === 'string' && isDate(value)) {
                        value = databaseDate(value)
                    }

                    acc[attribute] = value;
                }

                return acc;
            },
            {}
        );

        loading.value = true;

        if (changeValuesFilter.value) {
            page.value = 1
        }

        useNuxtApp().$customFetch<{ resultCount: number; rows: object[]; totalRecords: number; sortBy: object[] }>(url.value, {
            method: "GET",
            params: {
                page: page.value,
                perPage: itemsPerPage.value,
                full: routerFull.value,
                'sort-field': sortfield,
                'sort-type': sortType,
                ...params,
            },
            retry: 3,
            retryDelay: 100,
        }).then(async (res) => {

            items.value = res.rows;
            totalItems.value = res.totalRecords;

            changeValuesFilter.value = false;
        })
            .catch((error) => {
                $toast().error(`${error.cause.message ?? error.message}`);
            })
            .finally(() => {
                loading.value = false;
            });

    };

    return { url, routerFull, items, totalItems, sortBy, loading, page, itemsPerPage, itemsPerPageoptions, pageCount, selected, expanded, findRouteMap, searchData };
})