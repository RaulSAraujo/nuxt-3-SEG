export interface Filter {
    rows: FilterRow[];
    totalRecords: number;
    resultCount: number;
}

export interface FilterRow {
    id: number;
    model: string;
    user_id: number;
    available_filters: AvailableFilter[];
    hidden_filters: HiddenFilter[];
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

export interface AvailableFilter {
    type: Type;
    label: string;
    length: number | null;
    attribute: string;
    item_name: null | string;
    item_value: null | string;
    initial_filter: boolean;
    layout_filters: AvailableFilterLayoutFilters;
    value?: string | [] | number | boolean | null | undefined;
    association_data: PurpleAssociationData;
}

export interface PurpleAssociationData {
    rows: PurpleRow[];
    count: number;
}

export interface PurpleRow {
    id?: number;
    erp_id?: number;
    created_at?: Date;
    deleted_at?: null;
    updated_at?: Date;
    apparatus_name?: string;
    classification_apparatus_id?: number | null;
    color?: string;
    title?: string;
    value?: number;
    name?: string;
    active?: boolean;
    lead_time?: number | null;
    virtual_quantity?: number | null;
    text?: string;
}

export interface AvailableFilterLayoutFilters {
    lock?: boolean;
    size?: number;
    comboBox?: boolean;
    multiple?: boolean;
    outlined?: boolean;
    clearable?: boolean;
    sizeCamp?: number;
    approximate?: boolean;
    onlyOrMultiple?: boolean;
    selectedTypeArray?: boolean;
    selectedClearable?: boolean;
    switchInset?: boolean;
    checkboxOrSwitch?: boolean;
    range?: boolean;
    selectedTypeDate?: boolean;
}

export enum Type {
    Array = "ARRAY",
    Boolean = "BOOLEAN",
    Date = "DATE",
    Float = "FLOAT",
    Integer = "INTEGER",
    String = "STRING",
}

export interface HiddenFilter {
    type: Type;
    label: string;
    length: number | null;
    attribute: string;
    item_name: null | string;
    item_value: null | string;
    initial_filter: boolean;
    layout_filters: HiddenFilterLayoutFilters;
    association_data: FluffyAssociationData;
    value?: string | [] | number | boolean | null | undefined;
}

export interface FluffyAssociationData {
    rows: FluffyRow[];
    count: number;
}

export interface FluffyRow {
    text?: string;
    id?: number;
    name?: string;
    width?: number | null;
    custom?: boolean;
    height?: number | null;
    length?: number | null;
    created_at?: Date | null;
    deleted_at?: null;
    updated_at?: Date | null;
    package_weight?: number;
    weight_cubic_kg?: number;
    weight_per_cubic_kg?: number;
    active?: boolean;
    lead_time?: number | null;
    virtual_quantity?: number | null;
}

export interface HiddenFilterLayoutFilters {
    lock?: boolean;
    size?: number;
    onlyOrMultiple?: boolean;
    selectedClearable?: boolean;
    selectedTypeArray?: boolean;
    switchInset?: boolean;
    checkboxOrSwitch?: boolean;
    comboBox?: boolean;
    multiple?: boolean;
    outlined?: boolean;
    clearable?: boolean;
}