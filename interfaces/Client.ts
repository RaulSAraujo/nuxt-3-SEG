export interface Client {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    erp_client_id: number;
    cpf_cnpj: string;
    identity_number: null | string;
    name: string;
    born_date: Date | string;
    type: boolean;
    flag_client: number;
    email: string;
    official_email: null;
    validated_email: boolean;
    number1: null | string;
    identifier_number1: null | string;
    number2: null | string;
    identifier_number2: null | string;
    number3: null | string;
    identifier_number3: null | string;
    phone_mercado_pago: null | string;
    gender: string;
    observation: null;
    created_at: Date | string;
    updated_at: Date | string;
    ClientAddresses: ClientAddress[];
}

export interface ClientAddress {
    id: number;
    client_id: number;
    zipcode: string;
    street: string;
    neighbourhood: string;
    complement: string;
    number: string;
    city: string;
    state: string;
    country: string;
    type: string;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface Response {
    id: number;
    erp_client_id: number;
    cpf_cnpj: string;
    identity_number: null | string;
    name: string;
    born_date: Date | string;
    type: boolean;
    flag_client: number;
    email: string;
    official_email: null;
    validated_email: boolean;
    number1: null | string;
    identifier_number1: null | string;
    number2: null | string;
    identifier_number2: null | string;
    number3: null | string;
    identifier_number3: null | string;
    phone_mercado_pago: null | string;
    gender: string;
    observation: null;
    created_at: Date | string;
    updated_at: Date | string;
    ClientAddresses: ClientAddress;
}
