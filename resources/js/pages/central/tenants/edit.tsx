import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Tenant } from '@/types';


interface PageProps {
    tenant: Tenant;
}


export default function Edit({ tenant }: PageProps) {
    console.log('Edit component rendered with member:', tenant);
    const { data, setData, post, processing, errors, reset , put } = useForm({
        name: tenant.name,
        domain: tenant.domain,
        plan: tenant.plan,
        email: tenant.email,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('tenants.update', tenant.id));
    }

    return (
        <AppLayout >
            <div className=" px-4 py-6">
                <h2 className="text-2xl font-bold mb-6">Edit Tenant  {tenant.domains?.[0]?.domain}</h2>

                <div className=" shadow rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name
                            </label>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border  rounded-md focus:outline-none "
                                placeholder="Enter company name"
                            />
                             
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="admin@company.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Plan
                            </label>
                            
                            <Select  value={data.plan} onValueChange={(value) => setData('plan', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Plans</SelectLabel>
                                        <SelectItem value="basic">Basic (10 users)</SelectItem>
                                        <SelectItem value="premium">Premium (50 users)</SelectItem>
                                        <SelectItem value="enterprise">Enterprise (Unlimited)</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.plan && <p className="text-red-500 text-sm mt-1">{errors.plan}</p>}
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button>
                                <a   href="/central/tenants" >
                                    Cancel
                                </a>
                            </Button>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Tenant'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}