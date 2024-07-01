export interface CustomFilterGrid {
    rows:         Row[];
    totalRecords: number;
    resultCount:  number;
}

export interface Row {
    if(arg0: boolean): unknown;
    id:              number;
    attribute:       string;
    type:            Type;
    label:           string;
    length:          number | null;
    model:           Model;
    association:     null | string;
    item_value:      null | string;
    item_name:       null | string;
    layout_filters:  LayoutFilters | null;
    fixed_values:    FixedValue[] | null;
    active:          boolean;
    external:        boolean;
    align:           Align;
    sortable:        boolean;
    width:           number | null;
    initial_filter:  boolean;
    initial_grid:    boolean;
    sequence_filter: number | null;
    sequence_grid:   number | null;
    created_at:      Date;
    updated_at:      Date;
    deleted_at:      null;
}

export enum Align {
    Center = "center",
    DNone = " d-none",
    Start = "start",
}

export interface FixedValue {
    text?:  string;
    color?: string;
    title?: string;
    value?: number;
}

export interface LayoutFilters {
    lock?:              boolean;
    size?:              number;
    switchInset?:       boolean;
    checkboxOrSwitch?:  boolean;
    onlyOrMultiple?:    boolean;
    selectedClearable?: boolean;
    range?:             boolean;
    outlined?:          boolean;
    clearable?:         boolean;
    selectedTypeDate?:  boolean;
    comboBox?:          boolean;
    multiple?:          boolean;
    selectedTypeArray?: boolean;
    approximate?:       boolean;
    sizeCamp?:          number;
}

export enum Model {
    Product = "Product",
}

export enum Type {
    Array = "ARRAY",
    Boolean = "BOOLEAN",
    Date = "DATE",
    Float = "FLOAT",
    Integer = "INTEGER",
    String = "STRING",
}
