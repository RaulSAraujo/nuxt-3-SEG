export interface Weather {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        icon: string;
        description: string;
    }[];
    wind: {
        speed: number;
    };
}