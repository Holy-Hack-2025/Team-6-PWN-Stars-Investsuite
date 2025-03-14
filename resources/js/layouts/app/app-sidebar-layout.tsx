import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { HomeIcon, MessageCircleQuestionIcon, PlusIcon, SettingsIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="flex h-screen flex-col">
                    <div className="flex-grow">{children}</div>
                    <div>
                        <nav
                            className="shadow-t z-50 flex h-20 w-full items-start justify-around pt-2 text-white md:hidden"
                            style={{ backgroundColor: '#6d65fc' }}
                        >
                            <Link
                                href="/dashboard"
                                className="flex flex-col items-center justify-center gap-1 transition-colors hover:text-gray-900 focus:text-gray-900"
                                prefetch={false}
                            >
                                <HomeIcon className="h-6 w-6" />
                                <span className="text-xs">Home</span>
                            </Link>
                            <Link
                                href="/stock-selector"
                                className="flex flex-col items-center justify-center gap-1 transition-colors hover:text-gray-900 focus:text-gray-900"
                                prefetch={false}
                            >
                                <PlusIcon className="h-6 w-6" />
                                <span className="text-xs">Stocks</span>
                            </Link>
                            <Link
                                href="/quiz"
                                className="flex flex-col items-center justify-center gap-1 transition-colors hover:text-gray-900 focus:text-gray-900"
                                prefetch={false}
                            >
                                <MessageCircleQuestionIcon className="h-6 w-6" />
                                <span className="text-xs">Quiz</span>
                            </Link>
                            <Link
                                href="/settings"
                                className="flex flex-col items-center justify-center gap-1 transition-colors hover:text-gray-900 focus:text-gray-900"
                                prefetch={false}
                            >
                                <SettingsIcon className="h-6 w-6" />
                                <span className="text-xs">Account</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </AppContent>
        </AppShell>
    );
}
