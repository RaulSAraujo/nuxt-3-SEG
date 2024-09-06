export interface PurchaseRequest {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    supplier: string;
    name: string;
    purchase_name: null;
    produto_chave: string;
    description: string;
    cost: string;
    quantity_purchased: number;
    quantity_reserved: number;
    reservation: string;
    user: null | string;
    status: string;
    sending_limit_at: Date | null;
    observation: null | string;
    export_order: boolean;
    order_id: null;
    created_at: Date;
    updated_at: Date;
}
