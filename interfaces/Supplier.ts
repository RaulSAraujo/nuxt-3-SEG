export interface Supplier {
    rows:         Row[];
    totalRecords: number;
    resultCount:  number;
}

export interface Row {
    id:               number;
    name:             string;
    active:           boolean;
    virtual_quantity: number | null;
    lead_time:        number | null;
    created_at:       Date;
    updated_at:       Date;
}
