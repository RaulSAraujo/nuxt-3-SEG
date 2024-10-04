export interface ShippingUrgency {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    sale_id: number;
    point_of_sale: string;
    seller: string;
    shipment_company: null | string;
    separation_log: boolean;
    tags: Tag[];
    delayed: boolean;
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
