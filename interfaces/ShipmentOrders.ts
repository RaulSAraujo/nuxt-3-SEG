export interface ShipmentOrders {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    shipment_company: string;
    shipment_mode: string;
    collect_company: string;
    point_sale: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
