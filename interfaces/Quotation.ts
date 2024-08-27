export interface Quotation {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    supplier_id: number;
    fully_created: boolean;
    applied: boolean;
    start_at: Date;
    finish_at: Date | null;
    quotation_file: string;
    quotation_change_file: string;
    not_found_file: string;
    canceled: boolean;
    paused: boolean;
    amount: number;
    amount_applied: number;
    socket_channel_id: string;
    created_at: Date;
    updated_at: Date;
    Supplier: Supplier;
    QuotationItems: QuotationItem[];
}

export interface QuotationItem {
    id: number;
    quotation_pack_id: number;
    product_id: null;
    name: string;
    supplier_id: number;
    cost: null | string;
    active: boolean;
    enable_cost_date: boolean;
    availability: number | null;
    lead_time: number | null;
    virtual_quantity: number | null;
    not_found: boolean;
    parcial_quotation: boolean;
    name_buy_preference_before: string;
    name_buy_preference_after: string;
    name_sell_preference_before: string;
    name_sell_preference_after: string;
    name_supplier_before: string;
    name_supplier_after: string;
    product_cost_before: null | string;
    product_cost_after: null | string;
    product_availability_before: number | null;
    product_availability_after: number | null;
    product_lead_time_before: number | null;
    product_lead_time_after: number | null;
    product_virtual_quantity_before: number | null;
    product_virtual_quantity_after: number | null;
    cost_before: null | string;
    cost_after: null | string;
    availability_before: number | null;
    availability_after: number | null;
    lead_time_before: number | null;
    lead_time_after: number | null;
    virtual_quantity_before: number | null;
    virtual_quantity_after: number | null;
    quotation_at: Date | null;
    quotation_before_at: Date | null;
    start_at: Date | null;
    finish_at: Date | null;
    canceled: boolean;
    applied: boolean;
    created_at: Date;
    updated_at: Date;
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
