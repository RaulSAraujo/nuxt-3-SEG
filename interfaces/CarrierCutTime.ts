export interface CarrierCutTime {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    company: string;
    collection: number;
    cutoff_time: string;
    collection_time_from: string;
    collection_time_to: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}