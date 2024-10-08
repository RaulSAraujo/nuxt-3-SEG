export interface OrdersMl {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    purchase_date: Date;
    finality: string;
    quantity_purchase: number;
    total_cost: string;
    unit_cost: string;
    purchased_by: string;
    description: string;
    tracking_code: string;
    status: string;
    received_date: Date | null;
    review_data: Date | null;
    limit_date: Date | null;
    seller: string;
    form_payment: string;
    refund: boolean;
    refund_date: null;
    observation: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
