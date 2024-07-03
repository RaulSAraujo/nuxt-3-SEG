export interface Filter {
    rows: FilterRow[];
    totalRecords: number;
    resultCount: number;
}

export interface FilterRow {
    id: number;
    model: string;
    user_id: number;
    available_filters: Column[];
    hidden_filters: Column[];
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    User: User;
}

export interface User {
    id: number;
    name: string;
    username: string;
    active: boolean;
    group_id: number;
    top_menu: boolean;
    lateral_menu: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface Column {
    type: Type;
    label: string;
    length: number | null;
    attribute: string;
    item_name: null | string;
    item_value: null | string;
    initial_filter: boolean;
    layout_filters?: LayoutFilters | null;
    association_data?: AssociationData | null;
    value?: string | [] | number | boolean | null | undefined;
}

export interface AssociationData {
    rows: [];
    count: number;
}

export interface ModelAssociation {
    attribute: string;
    type: Type;
    label: string;
    length: number | null;
    item_value: null | string;
    item_name: null | string;
    layout_filters: LayoutFilters;
    association_data: AssociationData | null;
    initial_filter: boolean;
    sequence_filter: number | null;
    value?: string | [] | number | boolean | null | undefined;
}

export interface LayoutFilters {
    size?: number;
    clearable?: boolean;
    range?: boolean;
    comboBox?: boolean;
    multiple?: boolean;
    approximate?: boolean;
    sizeCamp?: number;
}

export enum Type {
    Array = "ARRAY",
    Boolean = "BOOLEAN",
    Date = "DATE",
    Float = "FLOAT",
    Integer = "INTEGER",
    String = "STRING",
}
