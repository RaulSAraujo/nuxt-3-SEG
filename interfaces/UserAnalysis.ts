export interface UserAnalysis {
    results: Result[];
}

export interface Result {
    user: string;
    total_quantity: number;
    total_weight_cubic: string;
    warranty: number;
    correios?: number;
    jadlog?: number;
    kangu?: number;
    magazine_luiza?: number;
    mandae?: number;
    mercado_livre: number;
    retirada_na_loja?: number;
    sem_transportadora?: number;
    shopee?: number;
    smart_envios?: number;
    smart_envios_?: number;
    total_express?: number;
    average_time: string;
}
