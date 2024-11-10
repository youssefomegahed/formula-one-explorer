'use client';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import useGetRaceDetails from '@/hooks/api/useGetRaceDetails';
import { convertMilliToSeconds } from '@/utils/datetime';

export default function Performance() {
    const { season, round } = useParams();
    const { data, isLoading, isError } = useGetRaceDetails({ season, round } as { season: string; round: string });

    const driverResults = useMemo(() => data?.MRData?.RaceTable?.Races?.[0]?.Results || [], [data]);

    const chartData = useMemo(() => {
        return driverResults.map((result) => ({
            name: `${result.Driver.givenName} ${result.Driver.familyName}`,
            time: convertMilliToSeconds(result?.Time?.millis) || 'N/A',
        }));
    }, [driverResults]);

    if (isLoading) return <p className="text-center mt-4">Loading performance data...</p>;
    if (isError) return <p className="text-center mt-4">Failed to load performance data.</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 pt-6 text-center">
                {season} Season - Round {round} Performance Visualization
            </h1>

            <div className="w-full max-w-4xl mx-auto">
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
        </div>
    );
}
