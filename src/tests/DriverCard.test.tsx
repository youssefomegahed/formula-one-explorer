import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DriverCard from '@/components/DriverCard';
import { TDriverResult } from '@/types/api';

const mockDriverResult: TDriverResult = {
    Driver: {
        givenName: 'Lewis',
        familyName: 'Hamilton',
        nationality: 'British',
        dateOfBirth: '1985-01-07',
        driverId: 'hamilton',
        url: 'http://example.com/lewis_hamilton',
    },
    Constructor: {
        constructorId: 'mercedes',
        name: 'Mercedes',
        nationality: 'German',
        url: 'http://example.com/mercedes',
    },
    number: '10',
    position: '1',
    positionText: '1',
    points: '25',
    grid: '2',
    laps: '58',
    status: 'Finished',
    Time: {
        millis: '5517592',
        time: '1:31:57.592',
    },
};

describe('DriverCard Component', () => {
    it('renders driver’s name correctly', () => {
        render(<DriverCard driverResult={mockDriverResult} isCardView={true} />);

        // Check if driver's full name is displayed
        expect(screen.getByText(/Lewis Hamilton/i)).toBeInTheDocument();
    });

    it('renders in card view mode', () => {
        render(<DriverCard driverResult={mockDriverResult} isCardView={true} />);

        // Check for elements specific to the card view
        expect(screen.getByText(/Position:/i)).toBeInTheDocument();
        expect(screen.getByText(/Team:/i)).toBeInTheDocument();
        expect(screen.getByText(/Nationality:/i)).toBeInTheDocument();

        // Check if the team and nationality are correctly displayed
        expect(screen.getByText('Mercedes')).toBeInTheDocument();
        expect(screen.getByText('British')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument(); // Position
    });

    it('renders in list view mode', () => {
        render(<DriverCard driverResult={mockDriverResult} isCardView={false} />);

        // Check for elements specific to the list view
        expect(screen.getByText(/P1/i)).toBeInTheDocument(); // Position with 'P' prefix
    });

    it('applies correct styles based on the view mode', () => {
        const { rerender, container } = render(<DriverCard driverResult={mockDriverResult} isCardView={true} />);

        // Check for card view specific class
        expect(container.firstChild).toHaveClass('bg-white shadow-lg rounded-lg');

        // Rerender in list view
        rerender(<DriverCard driverResult={mockDriverResult} isCardView={false} />);

        // Check for list view specific class
        expect(container.firstChild).toHaveClass('border-b border-gray-200');
    });
});
