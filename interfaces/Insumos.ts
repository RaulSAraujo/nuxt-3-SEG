export interface Insumos {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    purchase_date: Date | null;
    supplier: null | string;
    finality: string;
    quantity_purchase: number;
    total_cost: null | string;
    unit_cost: null | string;
    requested_by: string;
    purchased_by: null | string;
    description: string;
    status: string;
    received_date: Date | null;
    observation: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
