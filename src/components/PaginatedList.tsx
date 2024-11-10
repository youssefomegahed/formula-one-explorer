'use client';
import { ReactNode, useCallback, useMemo, useState } from 'react';

type PaginatedListProps<T> = {
    items: T[];
    renderItem: (item: T) => ReactNode;
    itemsPerPage?: number;
    containerClassName?: string;
};

export default function PaginatedList<T>({
    items,
    renderItem,
    itemsPerPage = 9,
    containerClassName = '',
}: PaginatedListProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Calculate the items to display for the current page
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    }, [currentPage, items, itemsPerPage]);

    // Handlers for Pagination
    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    }, [currentPage, totalPages]);

    const handlePrevPage = useCallback(() => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    }, [currentPage]);

    return (
        <div>
            {/* Render the items with a custom container class (e.g. for grid) */}
            <div className={containerClassName}>{currentItems.map(renderItem)}</div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                        currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                    Previous
                </button>

                <p className="text-center">
                    Page {currentPage} of {totalPages}
                </p>

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${
                        currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                    Next
                </button>
            </div>
        </div>
    );
}
