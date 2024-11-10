'use client';
import { useMemo } from 'react';
import useGetSeasonList from '@/hooks/api/useGetSeasonList';
import { useAppContext } from '@/providers/AppProvider';
import PaginatedList from '@/components/PaginatedList';
import SeasonCard from '@/components/SeasonCard';

export default function SeasonList() {
    const { isCardView, toggleView } = useAppContext();
    const { data, isLoading, isError } = useGetSeasonList();
    const seasons = useMemo(() => data?.MRData.SeasonTable.Seasons || [], [data]);

    if (isLoading) return <p className="text-center mt-4">Loading seasons...</p>;
    if (isError) return <p className="text-center mt-4">Failed to load seasons.</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 pt-6 text-center">Formula 1 Seasons</h1>

            {/* Toggle View Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={toggleView}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                    Show {isCardView ? 'List View' : 'Card View'}
                </button>
            </div>

            {/* Paginated List of Seasons with Grid/List view */}
            <PaginatedList
                items={seasons}
                itemsPerPage={9}
                containerClassName={isCardView ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : ''}
                renderItem={(season) => <SeasonCard key={season.season} season={season} isCardView={isCardView} />}
            />
        </div>
    );
}
