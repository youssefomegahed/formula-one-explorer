export type TLocation = {
    lat: string;
    long: string;
    locality: string;
    country: string;
};

export type TCircuit = {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: TLocation;
};

export type TDriver = {
    driverId: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
};

export type TConstructor = {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
};

export type TTime = {
    millis: string;
    time: string;
};

// Base MRData Type
export type TMRData = {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
};

// Specific API Response Types
export type TSeason = {
    season: string;
    url: string;
};

export type TRace = {
    season: string;
    round: string;
    url: string;
    raceName: string;
    Circuit: TCircuit;
    date: string;
};

export type TDriverResult = {
    number: string;
    position: string;
    positionText: string;
    points: string;
    Driver: TDriver;
    Constructor: TConstructor;
    grid: string;
    laps: string;
    status: string;
    Time?: TTime;
};

// Season List Response
export type TGetSeasonListResponse = {
    MRData: TMRData & {
        SeasonTable: {
            Seasons: TSeason[];
        };
    };
};

// Season Races Response
export type TGetSeasonRacesResponse = {
    MRData: TMRData & {
        RaceTable: {
            season: string;
            races: TRace[];
        };
    };
};

// Race Details Response
export type TGetRaceDetailsResponse = {
    MRData: TMRData & {
        RaceTable: {
            season: string;
            round: string;
            Races: (TRace & {
                Results: TDriverResult[];
            })[];
        };
    };
};
