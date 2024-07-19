export interface Operation {
    id: number;
    resource: string;
    name: string;
    description: string;
    model: string;
    front_url: string;
    back_url: string;
    created_at: Date | null;
    deleted_at: Date | null;
}