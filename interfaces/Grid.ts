export interface Grid {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    user_id: number;
    model: string;
    available_columns: Column[];
    hidden_columns: Column[];
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export interface Column {
    title: string;
    align: string;
    sortable: boolean;
    key: string;
    maxWidth: string | number | null;
    type: string;
    initial_grid: boolean;
    sequence_grid?: number | null;
}

export enum Align {
    Center = "center",
    DNone = " d-none",
    Start = "start",
}

export enum Type {
    Array = "ARRAY",
    Boolean = "BOOLEAN",
    Date = "DATE",
    Float = "FLOAT",
    Integer = "INTEGER",
    JSON = "JSON",
    String = "STRING",
}