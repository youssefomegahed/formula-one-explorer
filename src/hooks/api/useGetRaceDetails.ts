import { useQuery } from '@tanstack/react-query';
import { f1ErgastSVC } from '@/services/api';

const useGetRaceDetails = ({ season, round }: { season: string; round: string }) => {
    const getRaceDetails = async () => {
        const { data } = await f1ErgastSVC.getRaceDetails(season, round);

        return data;
    };

    return useQuery({
        queryFn: getRaceDetails,
        queryKey: ['getRaceDetails', season, round],
    });
};

export default useGetRaceDetails;
