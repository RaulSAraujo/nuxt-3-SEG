export interface StockMovementHistory {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    produto_chave: number;
    name: string;
    cost: string;
    input: null;
    output: number;
    balance: number;
    date_movement: Date;
    type_movement: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
