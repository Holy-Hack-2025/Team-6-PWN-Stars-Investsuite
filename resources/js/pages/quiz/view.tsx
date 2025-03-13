import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quiz',
        href: '/quiz',
    },
];

export default function Quiz() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quiz" />
            Hier komt de quiz
        </AppLayout>
    );
}
