import React from 'react';
import AppLayout from '../../layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { SharedData, type NavItem } from '@/types';

type DashboardProps = {
    stats: {
        users_count: number;
        plan: string;
    };
};

export default function Dashboard({ stats }: DashboardProps) {
    const { tenant } = usePage<SharedData>().props;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6">
                    Welcome  {tenant.name}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-accent p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Members</h3>
                        <p className="text-3xl font-bold text-blue-600">{stats.users_count}</p>
                    </div>

                    <div className="bg-accent p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Plan</h3>
                        <p className="text-xl font-semibold capitalize text-green-600">{stats.plan}</p>
                    </div>

                    <div className="bg-accent p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Tenant ID</h3>
                        <p className="text-sm text-gray-600 font-mono">{tenant.id}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}