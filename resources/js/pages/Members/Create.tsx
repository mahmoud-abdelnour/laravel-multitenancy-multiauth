import React from 'react';
import { useForm, Link, router } from '@inertiajs/react';
import MemberForm from './MemberForm';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Members',
        href: '/members',
    },
];
const Create: React.FC = () => {
    const form = useForm({
        name: '',
        email: '',
        password: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route('members.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className=" p-8">
                <h2 className="text-xl font-bold mb-4">Add New Member</h2>
                <MemberForm form={form} onSubmit={handleSubmit} processing={form.processing} />
                <Link href={route('members.index')} className="btn mt-4">Back</Link>
            </div>
        </AppLayout>
        
    );
};

export default Create;