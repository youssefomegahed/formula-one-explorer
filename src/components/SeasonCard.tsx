import { TSeason } from '@/types/api';
import Link from 'next/link';

type SeasonCardProps = {
    season: TSeason;
    isCardView: boolean;
};

export default function SeasonCard({ season, isCardView }: SeasonCardProps) {
    return (
        <Link href={`/seasons/${season.season}`} className="block">
            <div
                className={`${
                    isCardView
                        ? 'bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition'
                        : 'border-b border-gray-200 py-4'
                }`}>
                <h2 className="text-xl font-bold text-blue-600 hover:underline">{season.season}</h2>
                {isCardView && <p className="mt-2 text-gray-500">Explore the {season.season} season races.</p>}
            </div>
        </Link>
    );
}
