'use client';
import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useGetRaceDetails from '@/hooks/api/useGetRaceDetails';
import { useAppContext } from '@/providers/AppProvider';
import PaginatedList from '@/components/PaginatedList';
import DriverCard from '@/components/DriverCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { convertMilliToSeconds } from '@/utils/datetime';

export default function RaceDetails() {
    const { season, round } = useParams();
    const { isCardView, toggleView } = useAppContext();
    const { data, isLoading, isError } = useGetRaceDetails({ season, round } as { season: string; round: string });

    // Extract driver results from the fetched data. The data seems to contain duplicate drivers for the same race, so we remove duplicates.
    const driverResults = useMemo(
        () =>
            data?.MRData?.RaceTable?.Races?.[0]?.Results?.filter(
                (result, index, self) => self.findIndex((t) => t.Driver.driverId === result.Driver.driverId) === index
            ) || [],
        [data]
    );

    // Prepare data for performance chart
    const chartData = useMemo(() => {
        return driverResults.map((result) => ({
            name: `${result.Driver.givenName} ${result.Driver.familyName}`,
            time: convertMilliToSeconds(result?.Time?.millis) || 'N/A',
        }));
    }, [driverResults]);

    // State for search input and filtered drivers
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState(driverResults);

    // Toggle state for switching between views
    const [showPerformance, setShowPerformance] = useState(false);

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

            {/* Toggle Views */}
            <div className="flex justify-between items-center mb-4">
                {/* Search Input */}
                {!showPerformance ? (
                    <input
                        type="text"
                        placeholder="Search drivers by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded py-2 px-4 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ) : (
                    <div />
                )}
                <div className="flex space-x-4">
                    {!showPerformance ? (
                        <button
                            onClick={toggleView}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ml-4">
                            Show {isCardView ? 'List View' : 'Card View'}
                        </button>
                    ) : (
                        <div />
                    )}
                    {/* Toggle Performance View */}
                    <button
                        onClick={() => setShowPerformance((prev) => !prev)}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                        {showPerformance ? 'Hide Performance' : 'View Performance'}
                    </button>
                </div>
            </div>

            {/* Toggle Sections */}
            {showPerformance ? (
                <div className="w-full max-w-4xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Performance Visualization</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={150} />
                            <YAxis label={{ value: 'Time (s)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="time" fill="#8884d8" name="Race Time (s)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <PaginatedList
                    items={filteredDrivers}
                    itemsPerPage={9}
                    containerClassName={isCardView ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : ''}
                    renderItem={(result) => (
                        <DriverCard key={result?.Driver?.driverId} driverResult={result} isCardView={isCardView} />
                    )}
                />
            )}
        </div>
    );
}
