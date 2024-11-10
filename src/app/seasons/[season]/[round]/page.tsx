'use client';
import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useGetRaceDetails from '@/hooks/api/useGetRaceDetails';
import { useAppContext } from '@/providers/AppProvider';
import PaginatedList from '@/components/PaginatedList';
import DriverCard from '@/components/DriverCard';
import Link from 'next/link';

export default function RaceDetails() {
    const { season, round } = useParams();
    const { isCardView, toggleView } = useAppContext();
    const { data, isLoading, isError } = useGetRaceDetails({ season, round } as { season: string; round: string });

    // Extract driver results from the fetched data
    const driverResults = useMemo(() => data?.MRData?.RaceTable?.Races?.[0]?.Results || [], [data]);

    // State for search input
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState(driverResults);

    // Filter drivers based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = driverResults.filter((driverResult) => {
                const fullName = `${driverResult.Driver.givenName} ${driverResult.Driver.familyName}`.toLowerCase();
                return fullName.includes(searchTerm.toLowerCase());
            });
            setFilteredDrivers(filtered);
        } else {
            setFilteredDrivers(driverResults);
        }
    }, [searchTerm, driverResults]);

    if (isLoading) return <p className="text-center mt-4">Loading results...</p>;
    if (isError) return <p className="text-center mt-4">Failed to load results.</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 pt-6 text-center">
                {season} Season - Round {round} Details
            </h1>

            {/* Toggle View Button */}
            <div className="flex justify-between items-center mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search drivers by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded py-2 px-4 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                    <button
                        onClick={toggleView}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ml-4">
                        Show {isCardView ? 'List View' : 'Card View'}
                    </button>
                    <Link href={`/seasons/${season}/${round}/performance`}>
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                            View Performance
                        </button>
                    </Link>
                </div>
            </div>

            {/* Paginated List of results with Grid/List view */}
            <PaginatedList
                items={filteredDrivers}
                itemsPerPage={9}
                containerClassName={isCardView ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : ''}
                renderItem={(result) => (
                    <DriverCard key={result?.Driver?.driverId} driverResult={result} isCardView={isCardView} />
                )}
            />
        </div>
    );
}
