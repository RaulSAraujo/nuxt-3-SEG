export interface Kit {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    integration: boolean;
    discount: boolean;
    percentage_discount: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    ProductSell: ProductSell;
    Products: Product[];
    Families: Family[];
}

export interface Family {
    id: number;
    buy_preference_id: number | null;
    product_id: number | null;
    quantity: number | null;
    model: string | null;
    replace_cost: number | null;
    created_at: Date | string;
    updated_at: Date | string;
    KitFamily: KitFamily;
    SellPreference: Product | null;
    ProductSell?: ProductSell;
}

export interface KitFamily {
    id: number;
    kit_id: number;
    family_id: number;
    filepath: string;
    qtd_itens: number;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface ProductSell {
    id: number;
    type_id: number;
    type: string;
    ean_gs1: null | string;
    model: string;
    description: string;
    category_id: number | null;
    quantity: number | null;
    syncecom: boolean;
    syncedecom: boolean;
    syncecominprogress: boolean;
    syncecomfailed: boolean;
    active: boolean;
    image: boolean;
    package_id: number | null;
    length: null | string;
    width: null | string;
    height: null | string;
    weight: null | string;
    gross_weight: null;
    weight_cubic: null;
    virtual_quantity: number | null;
    lead_time: number | null;
    featured_seal: boolean | null;
    release_seal: boolean | null;
    additional_seal: boolean | null;
    sync_comclick: boolean;
    sync_loja_do_tecnico: boolean;
    sync_viziotech: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface Product {
    id: number;
    availability: number;
    type_id: number;
    type: string;
    erp_product_id: number;
    supplier_preference_id: number;
    package_id: number | null;
    name: null | string;
    produto_chave: number | null;
    quantity: number;
    virtual_quantity: number | null;
    virtual_quantity_at: Date | null;
    lead_time: number | null;
    lead_time_at: Date | null;
    virtual_stock_temporary: boolean;
    virtual_stock_temporary_at: string | Date | null;
    virtual_stock_permanent: boolean;
    virtual_stock_permanent_at: string | Date | null;
    length: null | string | number;
    width: null | string | number;
    height: null | string | number;
    gross_weight: null | string | number;
    weight: null | string | number;
    weight_cubic: null | string | number;
    brand: string;
    description: null | string;
    erp_syncecom: boolean;
    erp_category: null | string;
    erp_color: null | string;
    apparatus: null | string;
    ncm: null | string;
    cest: null | string;
    saldo_total_c: number | null;
    tipo_produto: number;
    endereco_estoque: null | string;
    unidade_c: string;
    synced_from_erp_at: string;
    observation: null | string;
    observation_cod_fab: string | null;
    erp_stock_movement_at: Date;
    classificacao: null | string;
    cost: null | string;
    cost_at: Date | null;
    liquidation: boolean;
    promotion_price: null | string;
    promotion_starts_at: Date | null;
    promotion_ends_at: Date | null;
    price: string;
    counter_price: string;
    price_table_id: number | null;
    pendente: boolean;
    model: null | string;
    active: boolean;
    image: boolean | null;
    support: boolean | null;
    warranty_days: number;
    icms_percentage: string;
    icms: null | string;
    diff_icms_percentage: string;
    diff_icms: null | string;
    icms_st_percentage: string;
    icms_st: null | string;
    ipi_percentage: string;
    ipi: null | string;
    freight: null | string;
    others_cost: null | string;
    tax_factor: string;
    quantity_purchased: number | null;
    quantity_reserved: number | null;
    description_ecom: null;
    info: null | string;
    ean: string;
    created_at: Date;
    updated_at: Date;
    Package?: Package | null;
}

export interface Package {
    id: number;
    name: string;
    width: number | null;
    length: number | null;
    weight_per_cubic_kg: number | null;
    custom: boolean;
    height: number | null;
    weight_cubic_kg: number | null;
    package_weight: number | null;
    created_at: Date;
    updated_at: Date;
}
