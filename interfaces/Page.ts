export interface Page {
    icon: string,
    title: string,
    items: {
        icon: string | null,
        title: string,
        name: string,
        backUrl: string,
        auth: boolean,
        child: boolean
    }[]
}