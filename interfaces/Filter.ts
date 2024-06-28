export interface FilterData {
    resultCount: number;
    rows: {
        available_filters: {
            association_data: {
                rows: []
            },
            attribute: string,
            initial_filter: boolean,
            item_name: string,
            item_value: string,
            label: string,
            length: number,
            layout_filters: {
                approximate: boolean | undefined,
                placeHolder: boolean | undefined,
                size: number | undefined,
                clearable: boolean | undefined,
                comboBox: boolean | undefined,
                multiple: boolean | undefined,
                range: boolean | undefined,
                checkBox: boolean | undefined,
                lock: boolean | undefined,
            },
            type: string,
            value: string | [] | number | boolean | null | undefined
        }[];
        hidden_filters: {
            association_data: {
                rows: []
            },
            attribute: string,
            initial_filter: boolean,
            item_name: string,
            item_value: string,
            label: string,
            length: number,
            layout_filters: {
                approximate: boolean | undefined,
                placeHolder: boolean | undefined,
                size: number | undefined,
                clearable: boolean | undefined,
                comboBox: boolean | undefined,
                multiple: boolean | undefined,
                range: boolean | undefined,
                checkBox: boolean | undefined,
                lock: boolean | undefined,
            },
            type: string,
            value: string
        }[];
    }[];
    totalRecords: number;
}