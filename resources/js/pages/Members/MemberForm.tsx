import React from 'react';
import { Input } from '@/components/ui/input'; // Adjust the import path as needed for your setup
import { Button } from '@/components/ui/button';

type MemberFormProps = {
    form: any;
    onSubmit: (e: React.FormEvent) => void;
    processing: boolean;
    isEdit?: boolean;
};

const MemberForm: React.FC<MemberFormProps> = ({ form, onSubmit, processing, isEdit = false }) => (
    <form onSubmit={onSubmit} className="space-y-4 p-6 rounded shadow">
        <div>
            <label className="block font-semibold mb-1">Name</label>
            <Input
                type="text"
                value={form.data.name}
                onChange={e => form.setData('name', e.target.value)}
                required
            />
            {form.errors.name && <span className="text-red-500 text-sm">{form.errors.name}</span>}
        </div>
        <div>
            <label className="block font-semibold mb-1">Email</label>
            <Input
                type="email"
                value={form.data.email}
                onChange={e => form.setData('email', e.target.value)}
                required
            />
            {form.errors.email && <span className="text-red-500 text-sm">{form.errors.email}</span>}
        </div>
        <div>
            <label className="block font-semibold mb-1">
                Password {isEdit && <span className="text-sm text-gray-400">(leave blank to keep current password)</span>}
            </label>
            <Input
                type="password"
                value={form.data.password}
                onChange={e => form.setData('password', e.target.value)}
                {...(!isEdit && { required: true })}
            />
            {form.errors.password && <span className="text-red-500 text-sm">{form.errors.password}</span>}
        </div>
        <Button type="submit" disabled={processing}>
            {processing ? 'Processing...' : (isEdit ? 'Update' : 'Create')}
        </Button>
    </form>
);

export default MemberForm;