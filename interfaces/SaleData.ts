export interface SaleData {
    Order: Order;
}

export interface Order {
    status: string;
    id: string;
    date: Date;
    hour: string;
    customer_id: string;
    partial_total: string;
    taxes: string;
    discount: string;
    point_sale: string;
    shipment: string;
    shipment_value: string;
    shipment_date: string;
    delivered: string;
    delivered_status: string;
    shipping_cancelled: string;
    store_note: string;
    customer_note: string;
    partner_id: string;
    discount_coupon: string;
    client_ip: string;
    payment_method_rate: string;
    installment: string;
    value_1: string;
    sending_code: string;
    sending_date: string;
    billing_address: string;
    delivery_time: string;
    payment_method_id: string;
    payment_method: string;
    session_id: string;
    total: string;
    payment_date: Date;
    access_code: string;
    shipment_integrator: string;
    modified: Date;
    printed: string;
    interest: string;
    cart_additional_values_discount: string;
    cart_additional_values_increase: string;
    id_quotation: string;
    estimated_delivery_date: string;
    is_traceable: string;
    external_code: string;
    tracking_url: string;
    has_payment: string;
    has_shipment: string;
    has_invoice: string;
    delivery_date: string;
    total_comission_user: string;
    total_comission: string;
    OrderStatus: OrderStatus;
    cost: string;
    app_id: string;
    urls: Urls;
    store_segment: string;
    payment_method_type: string;
    Customer: Customer;
    ProductsSold: ProductsSoldElement[];
    OrderInvoice: OrderInvoiceElement[];
    Payment: PaymentElement[];
    MlOrder: MlOrderElement[];
    MarketplaceOrder: MarketplaceOrderElement[];
    ShippingLabel: ShippingLabel;
    payments_notification: PaymentsNotification;
    partner_name: string;
}

export interface Customer {
    cnpj: string;
    newsletter: string;
    created: Date;
    terms: string;
    id: string;
    name: string;
    registration_date: Date;
    rg: string;
    cpf: string;
    phone: string;
    cellphone: string;
    birth_date: string;
    gender: string;
    email: string;
    nickname: string;
    token: string;
    total_orders: string;
    observation: string;
    type: string;
    foreign: string;
    company_name: string;
    state_inscription: string;
    reseller: string;
    discount: string;
    blocked: string;
    credit_limit: string;
    indicator_id: string;
    profile_customer_id: string;
    last_sending_newsletter: string;
    last_purchase: string;
    last_visit: string;
    last_modification: string;
    address: string;
    zip_code: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    modified: Date;
    Extensions: Extensions;
    CustomerAddresses: CustomerAddressElement[];
}

export interface CustomerAddressElement {
    CustomerAddress: CustomerAddressCustomerAddress;
}

export interface CustomerAddressCustomerAddress {
    id: string;
    customer_id: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    type: string;
    active: string;
    description: string;
    recipient: string;
    type_delivery: string;
    not_list: string;
}

export interface Extensions {
    Profile: PurpleProfile;
    Profiles: ProfileElement[];
}

export interface PurpleProfile {
    id: string;
    name: string;
    approves_registration: string;
}

export interface ProfileElement {
    id: string;
    price_list_id: string;
    name: string;
    approves_registration: string;
    show_price: string;
    theme_id: string;
    selected: string;
}

export interface MarketplaceOrderElement {
    MarketplaceOrder: MarketplaceOrderMarketplaceOrder;
}

export interface MarketplaceOrderMarketplaceOrder {
    id: string;
    order_id: string;
    marketplace_name: string;
    marketplace_seller_name: string;
    marketplace_seller_id: string;
    marketplace_document: string;
    payment_responsible_document: string;
    marketplace_order_id: string;
    marketplace_shipping_id: string;
    marketplace_shipping_type: string;
    marketplace_internal_status: string;
    marketplace_printing_available: string;
    created: Date;
    updated: Date;
}

export interface MlOrderElement {
    MlOrder: MlOrderMlOrder;
}

export interface MlOrderMlOrder {
    id: string;
    created: Date;
    updated: Date;
    pedido_id: string;
    cliente_id: string;
    codigo: string;
    item_id: string;
    item_quantity: string;
    item_title: string;
    user_id: string;
    nickname: string;
    mercado_envio: string;
    shipment_id: string;
    pack_id: string;
    status_frete_ml: string;
    substatus_frete_ml: string;
    ml_coleta: string;
    romaneio_id: string;
    invoice_data_id: string;
    service_id: string;
    logistic_type: string;
    messages_locked_by: string;
    date_delivered: string;
    estimated_delivery_time: Date;
    estimated_handling_limit: Date;
    shipping_option_id: string;
    pickup_id: string;
    code: string;
    order_id: string;
    ml_collect: string;
    shipping_mode: string;
    shipping_status: string;
    shipping_substatus: string;
}

export interface OrderInvoiceElement {
    OrderInvoice: OrderInvoiceOrderInvoice;
}

export interface OrderInvoiceOrderInvoice {
    id: string;
    order_id: string;
    issue_date: Date;
    number: string;
    serie: string;
    value: string;
    key: string;
    link: string;
    xml_danfe: string;
}

export interface OrderStatus {
    id: string;
    default: string;
    type: string;
    show_backoffice: string;
    allow_edit_order: string;
    description: string;
    status: string;
    show_status_central: string;
    background: string;
    display_name: string;
    font_color: string;
}

export interface PaymentElement {
    Payment: PaymentPayment;
}

export interface PaymentPayment {
    created: Date;
    modified: Date;
    id: string;
    order_id: string;
    payment_method_id: string;
    method: string;
    payment_place: string;
    value: string;
    date: Date;
    note: string;
    unique_number: string;
}

export interface ProductsSoldElement {
    ProductsSold: ProductsSoldProductsSold;
}

export interface ProductsSoldProductsSold {
    product_kit_id: string;
    product_kit_id_kit: string;
    id_campaign: string;
    product_id: string;
    quantity: string;
    id: string;
    order_id: string;
    name: string;
    original_name: string;
    virtual_product: string;
    ean: string;
    availability_days: string;
    availability: string;
    price: string;
    cost_price: string;
    original_price: string;
    weight: string;
    weight_cubic: string;
    brand: string;
    model: string;
    reference: string;
    length: string;
    width: string;
    height: string;
    variant_id: string;
    additional_information: string;
    text_variant: string;
    warranty: string;
    bought_together_id: string;
    ncm: string;
    included_items: string;
    release_date: string;
    commissioner_value: string;
    comissao: string;
    ProductSoldImage: ProductSoldImage[];
    Category: Category[];
    is_giveaway: string;
    url: URL;
    Stock: Stock;
}

export interface Category {
    id: string;
    name: string;
    main_category: string;
}

export interface ProductSoldImage {
    http: string;
    https: string;
    thumbs: { [key: string]: URL };
}

export interface URL {
    http: string;
    https: string;
}

export interface Stock {
    id: string;
    name: string;
}

export interface ShippingLabel {
    application: string;
}

export interface PaymentsNotification {
    notification: string;
}

export interface Urls {
    payment: string;
}
