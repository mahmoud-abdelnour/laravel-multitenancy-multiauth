import React from 'react';
import { usePage } from '@inertiajs/react';
import { router  } from '@inertiajs/core';

type AuthProps = {
    auth?: {
        guard?: string;
    };
};

export default function AdminAuth({ children }: { children: React.ReactNode }) {
    const { props } = usePage<AuthProps>();
    
    if (props.auth?.guard !== 'member') {
        router.visit(route('member.login'));
        return null;
    }

    return <>{children}</>;
}