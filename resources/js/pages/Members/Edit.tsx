import React from 'react';
import { useForm, Link, router } from '@inertiajs/react';
import MemberForm from './MemberForm';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

type Member = {
    id: number;
    name: string;
    email: string;
};

interface PageProps {
    member: Member;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Members',
        href: '/members',
    },
];


export default function Edit({ member }: PageProps) {

    const form = useForm({
        name: member.name,
        email: member.email,
        password: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.put(route('members.update', member.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className=" p-8">
                <h2 className="text-xl font-bold mb-4">Edit Member</h2>
                <MemberForm form={form} onSubmit={handleSubmit} processing={form.processing} isEdit />
                <Link href={route('members.index')} className="btn mt-4">Back</Link>
            </div>
        </AppLayout>
        
    );
};
