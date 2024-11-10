import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/providers/AppProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

export const metadata: Metadata = {
    title: 'Formula One Explorer',
    description: "A submission for Incorta's Take Home Assignment",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AppProvider>
                    <ReactQueryProvider>{children}</ReactQueryProvider>
                </AppProvider>
            </body>
        </html>
    );
}
