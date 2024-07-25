export interface ProductSell {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    type_id: number;
    type: string;
    ean_gs1: null;
    model: null | string;
    description: null | string;
    category_id: null;
    quantity: number | null;
    syncecom: boolean;
    syncedecom: boolean;
    syncecominprogress: boolean;
    syncecomfailed: boolean;
    active: boolean;
    image: boolean | null;
    package_id: null;
    length: null;
    width: null;
    height: null;
    weight: null;
    gross_weight: null;
    weight_cubic: null;
    virtual_quantity: number | null;
    lead_time: number | null;
    featured_seal: null;
    release_seal: null;
    additional_seal: null;
    sync_comclick: boolean;
    sync_loja_do_tecnico: boolean;
    sync_viziotech: boolean;
    created_at: Date | string;
    updated_at: Date | string;
    Ecommerces: Ecommerce[];
    Family: Family;
    Kit: null;
    CategoryEcom: null;
    sell_price: string;
    promotion: boolean;
    liquidation: boolean;
}

export interface Ecommerce {
    id: number;
    web_ecommerce_id: number;
    erp_ecommerce_id: number;
    virtual_stock: boolean;
    url: string;
    name: string;
    EcommerceProductSell: EcommerceProductSell;
}

export interface EcommerceProductSell {
    id: number;
    productsell_id: number;
    ecommerce_id: number;
    ecom_product_id: number;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface Family {
    id: number;
    buy_preference_id: number | null;
    product_id: number | null;
    quantity: null;
    model: null;
    replace_cost: null;
    created_at: Date | string;
    updated_at: Date | string;
    SellPreference: Product | null;
    Products: Product[];
}

export interface Product {
    id: number;
    availability: number;
    type_id: number;
    type: string;
    erp_product_id: number;
    supplier_preference_id: number;
    package_id: number | null;
    name: string;
    produto_chave: number;
    quantity: number;
    virtual_quantity: number | null;
    virtual_quantity_at: null;
    lead_time: number;
    lead_time_at: Date;
    virtual_stock_temporary: boolean;
    virtual_stock_temporary_at: Date | null;
    length: null | string;
    width: null | string;
    height: null | string;
    gross_weight: null | string;
    weight: null | string;
    weight_cubic: null | string;
    brand: string;
    description: string;
    erp_syncecom: boolean;
    erp_category: string;
    erp_color: null;
    apparatus: string;
    ncm: null | string;
    cest: null | string;
    saldo_total_c: null;
    tipo_produto: number;
    endereco_estoque: null;
    unidade_c: string;
    synced_from_erp_at: string;
    observation: string;
    observation_cod_fab: string;
    erp_stock_movement_at: Date;
    classificacao: null;
    cost: null | string;
    cost_at: Date;
    liquidation: boolean;
    promotion_price: null;
    promotion_starts_at: null;
    promotion_ends_at: null;
    price: string;
    counter_price: string;
    price_table_id: number;
    pendente: boolean;
    model: string;
    active: boolean;
    image: boolean | null;
    support: null;
    warranty_days: number;
    icms_percentage: string;
    icms: string;
    diff_icms_percentage: string;
    diff_icms: string;
    icms_st_percentage: string;
    icms_st: string;
    ipi_percentage: string;
    ipi: string;
    freight: null | string;
    others_cost: string;
    tax_factor: string;
    quantity_purchased: number | null;
    quantity_reserved: number | null;
    description_ecom: null;
    info: null;
    ean: string;
    created_at: Date | string;
    updated_at: Date | string;
    Pstatuses?: Pstatus[];
    PAvailabilityHistories?: PAvailabilityHistory[];
}

export interface PAvailabilityHistory {
    id: number;
    availability_id: number;
    product_id: number;
    name: string;
    availability_at: Date;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface Pstatus {
    id: number;
    name: string;
    created_at: Date | string;
    updated_at: Date | string;
    ProductPstatus: ProductPstatus;
}

export interface ProductPstatus {
    id: number;
    product_id: number;
    pstatus_id: number;
    created_at: Date | string;
    updated_at: Date | string;
}
