export interface Package {
    rows:         Row[];
    totalRecords: number;
    resultCount:  number;
}

export interface Row {
    id:                  number;
    name:                string;
    width:               number | null;
    length:              number | null;
    weight_per_cubic_kg: number | null;
    custom:              boolean;
    height:              number | null;
    weight_cubic_kg:     number | null;
    package_weight:      number | null;
    created_at:          Date;
    updated_at:          Date;
}
