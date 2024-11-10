import { TRace } from '@/types/api';
import Link from 'next/link';
import { formatDate } from '@/utils/datetime';
import { useCallback, useMemo } from 'react';
import { useAppContext } from '@/providers/AppProvider';

type RaceCardProps = {
    race: TRace;
    isCardView: boolean;
};

export default function RaceCard({ race, isCardView }: RaceCardProps) {
    const { pinnedRaces, pinRace, unpinRace } = useAppContext();

    // Check if the race is already pinned
    const isPinned = useMemo(() => pinnedRaces.some((pinnedRace) => pinnedRace === race.raceName), [pinnedRaces, race]);

    // Pin button handler
    const handlePinClick = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation(); // Prevents Link navigation
            event.preventDefault(); // Ensures button works independently

            if (isPinned) {
                unpinRace(race.raceName); // Unpin the race if it's already pinned
            } else {
                pinRace(race.raceName); // Pin the race if it's not already pinned
            }
        },
        [isPinned, pinRace, unpinRace, race]
    );

    return (
        <Link href={`/seasons/${race.season}/${race.round}`} className="block">
            <div
                className={`${
                    isCardView
                        ? 'bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition relative'
                        : 'border-b border-gray-200 py-4 relative'
                }`}>
                {/* Pin Button */}
                <button
                    onClick={handlePinClick}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    aria-label={isPinned ? 'Unpin this race' : 'Pin this race'}>
                    {isPinned ? '📍' : 'Pin'} {/* Change the icon based on the pin state */}
                </button>

                <h2 className="text-xl font-bold text-blue-600 hover:underline">{race.raceName}</h2>

                {/* Race Details: Circuit Name and Date */}
                <div className="mt-2">
                    <p className="text-gray-700">
                        <span className="font-semibold">Circuit:</span> {race.Circuit.circuitName}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Date:</span> {formatDate(race.date)}
                    </p>
                </div>
            </div>
        </Link>
    );
}
