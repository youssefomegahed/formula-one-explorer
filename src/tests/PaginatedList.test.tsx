import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginatedList from '@/components/PaginatedList';

describe('PaginatedList Component', () => {
    const sampleItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
    const renderItem = (item: string) => <div key={item}>{item}</div>;

    it('renders the correct number of items per page', () => {
        render(<PaginatedList items={sampleItems} renderItem={renderItem} itemsPerPage={5} />);

        // Check if only 5 items are rendered on the first page
        expect(screen.getAllByText(/Item/).length).toBe(5);
    });

    it('navigates to the next page correctly', () => {
        render(<PaginatedList items={sampleItems} renderItem={renderItem} itemsPerPage={5} />);

        // Click the "Next" button
        const nextButton = screen.getByRole('button', { name: /Next/i });
        fireEvent.click(nextButton);

        // Verify the items on the second page
        expect(screen.getByText('Item 6')).toBeInTheDocument();
        expect(screen.getByText('Item 10')).toBeInTheDocument();
    });

    it('navigates to the previous page correctly', () => {
        render(<PaginatedList items={sampleItems} renderItem={renderItem} itemsPerPage={5} />);

        // Move to the second page first
        fireEvent.click(screen.getByRole('button', { name: /Next/i }));
        // Click the "Previous" button
        const prevButton = screen.getByRole('button', { name: /Previous/i });
        fireEvent.click(prevButton);

        // Verify the items on the first page
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 5')).toBeInTheDocument();
    });

    it('disables the "Previous" button on the first page', () => {
        render(<PaginatedList items={sampleItems} renderItem={renderItem} itemsPerPage={5} />);

        // Check if the "Previous" button is disabled
        const prevButton = screen.getByRole('button', { name: /Previous/i });
        expect(prevButton).toBeDisabled();
    });

    it('disables the "Next" button on the last page', () => {
        render(<PaginatedList items={sampleItems} renderItem={renderItem} itemsPerPage={5} />);

        // Navigate to the last page
        const nextButton = screen.getByRole('button', { name: /Next/i });
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton); // Now on last page

        // Check if the "Next" button is disabled
        expect(nextButton).toBeDisabled();
    });
});
