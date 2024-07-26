export interface Apparatus {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    erp_id: number;
    apparatus_name: string;
    classification_apparatus_id: number | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    ClassificationApparatu: ClassificationApparatu | null;
}

export interface ClassificationApparatu {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
