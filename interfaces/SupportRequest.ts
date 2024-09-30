export interface SupportRequest {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    title: string;
    classification: string;
    priority: number;
    user_id: number;
    status: string;
    created_at: Date;
    updated_at: Date;
    User: User;
    SupportRequestLogs: SupportRequestLog[];
    days_since_opened: number;
}

export interface SupportRequestLog {
    id: number;
    support_request_id: number;
    user_id: number;
    comment: null;
    file_paths: string[];
    created_at: Date;
    updated_at: Date;
    User: User;
}

export interface User {
    id: number;
    name: string;
    username: string;
    group_id: number;
}
