export interface ShippingValidation {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    tags: Tag[];
    ecom_order_id: number;
    customer_freight_price: string;
    actual_freight_price: null | string;
    freight_diff_price: string;
    bill_freight_price: null;
    observation: null;
    freight_comment: null;
    shipping_validated: boolean;
    shipping_finished: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    Order: Order;
}

export interface Order {
    id: number;
    ecom_order_id: number;
    status: string;
    date: Date;
    customer_id: number;
    taxes: string;
    discount: string;
    point_sale: string;
    shipment: string;
    shipment_value: string;
    delivered: boolean;
    shipping_cancelled: boolean;
    store_note: string;
    customer_note: string;
    discount_coupon: string;
    sending_code: string;
    sending_date: Date | null;
    delivery_time: string;
    payment_method: string;
    total: string;
    payment_date: Date | null;
    shipment_integrator: string;
    modified: Date;
    estimated_delivery_date: Date | null;
    tracking_url: string;
    delivery_date: Date | null;
    cost: string;
    invoice_number: null | string;
    invoice_date: Date | null;
    marketplace_seller_name: null | string;
    seller: string;
    delayed_or_in_transfer: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export interface Tag {
    id: number;
    name: string;
    description: string;
    produto_chave: number;
}
