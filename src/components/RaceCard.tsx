import { TRace } from '@/types/api';
import Link from 'next/link';

type RaceCardProps = {
    race: TRace;
    isCardView: boolean;
};

export default function RaceCard({ race, isCardView }: RaceCardProps) {
    return (
        <div
            className={`${
                isCardView
                    ? 'bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition'
                    : 'border-b border-gray-200 py-4'
            }`}>
            <Link href={`/seasons/${race.season}/${race.round}`} className="text-blue-600 hover:underline">
                <h2 className="text-xl font-bold">{race.raceName}</h2>
            </Link>
            {isCardView && <p className="mt-2 text-gray-500">Explore race details</p>}
        </div>
    );
}
