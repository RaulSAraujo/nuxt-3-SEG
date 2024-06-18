export interface GridData {
    resultCount: number;
    rows: {
        available_columns: {
            align: string;
            initial_grid: boolean;
            sequence_grid: number | null;
            sortable: boolean;
            text: string;
            type: string;
            value: string;
            width: number | null;
        }[];
        hidden_columns: {
            align: string;
            initial_grid: boolean;
            sequence_grid: number | null;
            sortable: boolean;
            text: string;
            type: string;
            value: string;
            width: number | null;
        }[];
    }[];
    totalRecords: number;
}