import { useQuery } from '@tanstack/react-query';
import { f1ErgastSVC } from '@/services/api';

const useGetSeasonRaces = ({ season }: { season: string }) => {
    const getSeasonRaces = async () => {
        const { data } = await f1ErgastSVC.getSeasonRaces(season);

        return data;
    };

    return useQuery({
        queryFn: getSeasonRaces,
        queryKey: ['getSeasonRaces', season],
    });
};

export default useGetSeasonRaces;
