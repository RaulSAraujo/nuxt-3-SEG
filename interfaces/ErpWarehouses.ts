export interface ERPWarehouses {
    rows:         Row[];
    totalRecords: number;
    resultCount:  number;
}

export interface Row {
    codigo:             number;
    descricao:          string;
    reservaestoque:     boolean | null;
    liberavenda:        boolean;
    empresa:            number;
    tipoestoque:        number;
    cliente:            number | null;
    fornecedor:         number | null;
    nomecd:             null | string;
    nomeoficialcd:      null;
    telefonecd:         null;
    emailcd:            null;
    cnpjcd:             null;
    iecd:               null;
    cepcd:              null;
    ruacd:              null;
    bairrocd:           null;
    cidadecd:           null | string;
    estadocd:           null;
    complementocd:      null;
    nrentcd:            null;
    autorizacaogerente: null;
    enviar_sped:        boolean | null;
    preferencia:        number | null;
    created_at:         null;
    updated_at:         Date | null;
}
