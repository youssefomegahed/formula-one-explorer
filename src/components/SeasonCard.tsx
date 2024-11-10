import { TSeason } from '@/types/api';
import Link from 'next/link';

type SeasonCardProps = {
    season: TSeason;
    isCardView: boolean;
};

export default function SeasonCard({ season, isCardView }: SeasonCardProps) {
    return (
        <div
            className={`${
                isCardView
                    ? 'bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition'
                    : 'border-b border-gray-200 py-4'
            }`}>
            <Link href={`/seasons/${season.season}`} className="text-blue-600 hover:underline">
                <h2 className="text-xl font-bold">{season.season}</h2>
            </Link>
            {isCardView && <p className="mt-2 text-gray-500">Explore the {season.season} season details.</p>}
        </div>
    );
}
