import { TDriverResult } from '@/types/api';

type DriverCardProps = {
    driverResult: TDriverResult;
    isCardView: boolean;
};

export default function DriverCard({ driverResult, isCardView }: DriverCardProps) {
    const { Driver, Constructor, position } = driverResult;

    return (
        <div
            className={`${
                isCardView
                    ? 'bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition transform hover:scale-105'
                    : 'border-b border-gray-200 py-4 px-6'
            }`}>
            {/* Driver's Name */}
            <h2 className="text-xl font-bold text-blue-600 hover:underline">
                {Driver.givenName} {Driver.familyName}
            </h2>

            {/* Card View */}
            {isCardView ? (
                <>
                    <p className="mt-2 text-gray-700">
                        <span className="font-semibold">Position:</span> {position}
                    </p>
                    <p className="mt-1 text-gray-700">
                        <span className="font-semibold">Team:</span> {Constructor.name}
                    </p>
                    <p className="mt-1 text-gray-700">
                        <span className="font-semibold">Nationality:</span> {Driver.nationality}
                    </p>
                </>
            ) : (
                // List View
                <div className="flex justify-between items-center mt-2">
                    <div>
                        <p className="text-gray-700">
                            <span className="font-semibold">Team:</span> {Constructor.name}
                        </p>
                        <p className="text-gray-500">{Driver.nationality}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">P{position}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
