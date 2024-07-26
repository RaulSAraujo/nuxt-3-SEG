export interface ClassificationApparatus {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
