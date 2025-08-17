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

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        domain: '',
        plan: 'basic',
    });

    const submit = (e:any) => {
        e.preventDefault();
        post('/central/tenants');
    };

    return (
        <AppLayout >
            <div className=" px-4 py-6">
                <h2 className="text-2xl font-bold mb-6">Create New Tenant</h2>

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
                                Subdomain
                            </label>
                            <div className="flex items-center">
                                <Input
                                    type="text"
                                    value={data.domain}
                                    onChange={(e) => setData('domain', e.target.value)}
                                    className={cn(
                                    "flex-1 min-w-0 rounded-r-none border-r-0 focus:z-10",
                                    "px-3 py-2 border",
                                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    )}
                                    placeholder="company"
                                />
                                <span className={cn(
                                    "inline-flex items-center px-3 py-2",
                                    "bg-gray-800 border  rounded-r-md",
                                    "text-gray-100 whitespace-nowrap text-sm"
                                )}>
                                    .yourdomain.com
                                </span>
                            </div>

                            {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain}</p>}
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
                            <Button asChild >
                                <a  href="/central/tenants" >
                                    Cancel
                                </a>
                            </Button>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Tenant'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}