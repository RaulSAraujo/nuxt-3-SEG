export interface Package {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    name: string;
    width: number | null;
    length: number | null;
    weight_per_cubic_kg: number | null;
    custom: boolean;
    height: number | null;
    weight_cubic_kg: number | null;
    package_weight: number | null;
    created_at: Date;
    updated_at: Date;
}

export interface Response {
    created_at: Date | string;
    custom: boolean;
    height: number;
    id: number;
    length: number;
    message: string;
    name: string;
    package_weight: number;
    success: boolean;
    updated_at: Date | string;
    weight_cubic_kg: number;
    weight_per_cubic_kg: number;
    width: number;
}