import { useQuery } from '@tanstack/react-query';
import { f1ErgastSVC } from '@/services/api';

const useGetSeasonList = () => {
    const getSeasonList = async () => {
        const { data } = await f1ErgastSVC.getSeasonList();

        return data;
    };

    return useQuery({
        queryFn: getSeasonList,
        queryKey: ['getSeasonList'],
    });
};

export default useGetSeasonList;
