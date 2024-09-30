export interface SalesCollections {
    id: number;
    user: string;
    quantity_orders: number;
    collect_company: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    SalesOrders: SalesOrder[];
}

export interface SalesOrder {
    id: number;
    sale_id: number;
    tag_id: TagID[];
    invoice: string;
    customer: string;
    customer_document: string;
    tracking_id: null | string;
    produto_chave: number;
    complete_product_counter: boolean;
    description: string;
    poin_sale: string;
    collect_company: string;
    shipment_mode: string;
    weight_cubic: string;
    seller: string;
    initial_status: string;
    status: string;
    verified_status_ecom: boolean;
    user: string;
    observation: null;
    sales_collection_id: number;
    collected: boolean;
    canceled: boolean;
    nf_key: string;
    shipping_volume: number;
    freight_quotation: string;
    freight_invoice: string;
    freight_value_validation: string;
    freight_validated: boolean;
    freight_validated_at: null;
    freight_comment: null;
    finalized_freight_invoice: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export interface TagID {
    id: number;
    name: string;
    description: string;
    produto_chave: number;
    erp_product_id: number;
}
