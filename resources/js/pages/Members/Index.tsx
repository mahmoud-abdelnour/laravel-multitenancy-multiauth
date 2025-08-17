import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type Member = {
    id: number;
    name: string;
    email: string;
};

interface PageProps {
    members: Member[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Members',
        href: '/members',
    },
];

const Index: React.FC<PageProps> = ({ members }) => {
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this member?")) {
            router.delete(route('members.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Members</h1>
                    <Button asChild>
                        <Link href={route('members.create')}>
                            + Add Member
                        </Link>
                    </Button>
                </div>
                <table className="min-w-full  rounded shadow">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.id} className="border-t">
                                <td className="py-2 px-4">{member.id}</td>
                                <td className="py-2 px-4">{member.name}</td>
                                <td className="py-2 px-4">{member.email}</td>
                                <td className="py-2 px-4 space-x-2">
                                    <Button variant="outline" >
                                        <Link href={route('members.edit', member.id)} className="btn btn-sm btn-info">Edit</Link>
                                    </Button>
                                    <Button variant="outline" onClick={() => handleDelete(member.id)} className='bg-red-600 text-white hover:bg-red-700'>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
        
    );
};

export default Index;