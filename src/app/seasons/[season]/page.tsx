'use client';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import useGetSeasonRaces from '@/hooks/api/useGetSeasonRaces';
import { useAppContext } from '@/providers/AppProvider';
import PaginatedList from '@/components/PaginatedList';
import RaceCard from '@/components/RaceCard';

export default function SeasonRaces() {
    const { season } = useParams();
    const { isCardView, toggleView } = useAppContext();
    const { data, isLoading, isError } = useGetSeasonRaces({ season } as { season: string });
    const races = useMemo(() => data?.MRData?.RaceTable?.Races || [], [data]);

    console.log(races.length);
    if (isLoading) return <p className="text-center mt-4">Loading races...</p>;
    if (isError) return <p className="text-center mt-4">Failed to load races.</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 pt-6 text-center">{season} Season Races</h1>

            {/* Toggle View Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={toggleView}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                    Show {isCardView ? 'List View' : 'Card View'}
                </button>
            </div>

            {/* Paginated List of races with Grid/List view */}
            <PaginatedList
                items={races}
                itemsPerPage={9}
                containerClassName={isCardView ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : ''}
                renderItem={(race) => <RaceCard key={race.raceName} race={race} isCardView={isCardView} />}
            />
        </div>
    );
}
