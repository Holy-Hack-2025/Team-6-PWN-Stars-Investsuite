import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { HomeIcon, MessageCircleQuestionIcon, PlusIcon, SettingsIcon } from 'lucide-react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <>
            <nav
                className="shadow-t fixed right-0 bottom-0 left-0 z-50 flex h-20 w-full items-start justify-around pt-2 text-white md:hidden"
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
            <header className="border-sidebar-border/50 hidden h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:flex md:px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </header>
        </>
    );
}
