'use client';

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

const handleError = (error: unknown) => {
    if (error instanceof Error) {
        console.error('Global Error Handler:', error.message);
        alert(`An error occurred: ${error.message}`);
    } else {
        console.error('Unexpected Error:', error);
        alert('An unexpected error occurred');
    }
};

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (error) => {
                        handleError(error);
                    },
                }),
                mutationCache: new MutationCache({
                    onError: (error) => {
                        handleError(error);
                    },
                }),
                defaultOptions: {
                    queries: {
                        retry: 2, // Automatically retry failed queries twice
                    },
                    mutations: {
                        retry: 0, // No retries for mutations
                    },
                },
            })
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
