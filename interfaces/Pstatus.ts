export interface Pstatus {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    name: string;
    active?: boolean;
    created_at: Date;
    updated_at: Date;
}
