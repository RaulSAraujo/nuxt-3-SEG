export interface Weather {
    name: String;
    main: {
        temp: Number;
        humidity: Number;
    };
    weather: {
        icon: String;
        description: String;
    }[];
    wind: {
        speed: Number;
    };
}