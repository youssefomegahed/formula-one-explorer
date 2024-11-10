import { AxiosInstance, AxiosResponse } from 'axios';
import { TGetSeasonListResponse, TGetSeasonRacesResponse, TGetRaceDetailsResponse } from '@/types/api';

type TF1ErgastEndpoints = {
    getSeasonList: () => Promise<AxiosResponse<TGetSeasonListResponse>>;
    getSeasonRaces: (season: string) => Promise<AxiosResponse<TGetSeasonRacesResponse>>;
    getRaceDetails: (season: string, round: string) => Promise<AxiosResponse<TGetRaceDetailsResponse>>;
};

const f1ErgastEndpoints = (api: AxiosInstance): TF1ErgastEndpoints => {
    const getSeasonList = async (): Promise<AxiosResponse<TGetSeasonListResponse>> =>
        api.get<TGetSeasonListResponse>(`seasons.json`);

    const getSeasonRaces = async (season: string): Promise<AxiosResponse<TGetSeasonRacesResponse>> =>
        api.get<TGetSeasonRacesResponse>(`${season}/races.json`);

    const getRaceDetails = async (season: string, round: string): Promise<AxiosResponse<TGetRaceDetailsResponse>> =>
        api.get<TGetRaceDetailsResponse>(`${season}/${round}/results.json`);

    return {
        getSeasonList,
        getSeasonRaces,
        getRaceDetails,
    };
};

export default f1ErgastEndpoints;
