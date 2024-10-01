export interface MinimimStock {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    produto_chave: number;
    name_pref: null | string;
    description: null | string;
    device: null | string;
    brand: string;
    cost_pref: string;
    current_stock: number | null;
    minimum_stock: number | null;
    sales_average: number | null;
    months: number | null;
    status: null | string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
