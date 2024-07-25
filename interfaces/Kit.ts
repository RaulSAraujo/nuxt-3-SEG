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
    quantity: null;
    model: null;
    replace_cost: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    KitFamily: KitFamily;
    SellPreference: Product | null;
    ProductSell: ProductSell;
}

export interface KitFamily {
    id: number;
    kit_id: number;
    family_id: number;
    filepath: string;
    qtd_itens: number;
    created_at: Date;
    updated_at: Date;
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
    deleted_at: null;
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
    virtual_quantity_at: Date | null;
    lead_time: number;
    lead_time_at: Date | null;
    virtual_stock_temporary: boolean;
    virtual_stock_temporary_at: Date | null;
    length: null | string;
    width: null | string;
    height: null | string;
    gross_weight: string;
    weight: string;
    weight_cubic: null | string;
    brand: string;
    description: string;
    erp_syncecom: boolean;
    erp_category: string;
    erp_color: null | string;
    apparatus: null | string;
    ncm: null | string;
    cest: null | string;
    saldo_total_c: number | null;
    tipo_produto: number;
    endereco_estoque: null | string;
    unidade_c: string;
    synced_from_erp_at: string;
    observation: string;
    observation_cod_fab: string;
    erp_stock_movement_at: Date;
    classificacao: null | string;
    cost: string;
    cost_at: Date | null;
    liquidation: boolean;
    promotion_price: null | string;
    promotion_starts_at: Date | null;
    promotion_ends_at: Date | null;
    price: string;
    counter_price: string;
    price_table_id: number;
    pendente: boolean;
    model: string;
    active: boolean;
    image: boolean;
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
    info: null;
    ean: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    Package?: Package | null;
}

export interface Package {
    id: number;
    name: string;
    width: number | null;
    length: number | null;
    weight_per_cubic_kg: number;
    custom: boolean;
    height: number | null;
    weight_cubic_kg: number;
    package_weight: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
