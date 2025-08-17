import React from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

interface Tenant {
    id: React.Key;
    name: string;
    email: string;
    plan: string;
    domains: { domain: string }[];
    created_at: string | number | Date;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface TenantsProps {
    data: Tenant[];
    from: number;
    to: number;
    total: number;
    links: PaginationLink[];
}

export default function Index({ tenants }: { tenants: TenantsProps }) {
    const deleteTenant = (tenant: { name: any; id: any; }) => {
        if (confirm(`Are you sure you want to delete ${tenant.name}?`)) {
            router.delete(`/central/tenants/${tenant.id}`);
        }
    };

    return (
        <AppLayout >
            <div className=" px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Manage Tenants</h1>
                    <Button variant="default"    >
                    <Link 
                        href="/central/tenants/create"
                        className=""
                    >
                        Create New Tenant
                    </Link>
                    </Button>
                </div>

                <div className=" shadow rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className='text-left' >
                            <tr>
                                <th className="py-2 px-4">
                                    Tenant
                                </th>
                                <th className="py-2 px-4">
                                    Plan
                                </th>
                                <th className="py-2 px-4">
                                    Domain
                                </th>
                                <th className="py-2 px-4">
                                    Created
                                </th>
                                <th className="py-2 px-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" ">
                            {tenants.data.map((tenant: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; plan: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; domains: { domain: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }[]; created_at: string | number | Date; }) => (
                                <tr key={tenant.id} className='border-t'>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium">
                                                {tenant.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {tenant.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            tenant.plan === 'enterprise' 
                                                ? 'bg-purple-100 text-purple-800'
                                                : tenant.plan === 'premium'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {tenant.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {tenant.domains?.[0]?.domain}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(tenant.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                               
                                        <Button variant="outline" className='mr-3 '>
                                            <Link 
                                                href={`/central/tenants/${tenant.id}/edit`}
                                                className="text-yellow-600 hover:text-yellow-900"
                                            >
                                                Edit
                                            </Link>
                                        </Button>

                                        <Button variant="outline" 
                                            onClick={() => deleteTenant(tenant)}
                                            className="text-red-600 hover:text-red-900 mr-3 "
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                        Showing {tenants.from} to {tenants.to} of {tenants.total} results
                    </div>
                    <div className="flex space-x-2">
                        {tenants.links.map((link: { url: any; active: any; label: any; }, index: React.Key | null | undefined) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-2 text-sm font-medium rounded ${
                                    link.active
                                        ? 'bg-blue-500 text-white'
                                        : ''
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}