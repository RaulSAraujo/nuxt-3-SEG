export interface Family {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    buy_preference_id: number | null;
    product_id: number | null;
    quantity: null;
    model: null;
    replace_cost: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    Products: Product[];
    SellPreference: Product | null;
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
    support: boolean | null;
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
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    Quotations?: Quotation[];
    SupplierPreference?: Supplier;
}

export interface Quotation {
    id: number;
    product_id: number;
    supplier_id: number;
    filepath: string;
    filename: string;
    cost: null | string;
    cost_at: Date;
    availability: number;
    availability_at: Date;
    lead_time: number;
    lead_time_at: Date;
    virtual_quantity: null;
    virtual_quantity_at: null;
    observation: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    Supplier: Supplier;
}

export interface Supplier {
    id: number;
    name: string;
    active: boolean;
    virtual_quantity: number | null;
    lead_time: number | null;
    created_at: Date;
    updated_at: Date;
}
