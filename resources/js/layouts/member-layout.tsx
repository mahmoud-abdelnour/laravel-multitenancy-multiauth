
import { Link, usePage, router } from '@inertiajs/react';
import { useState, ReactNode, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
    Home,
    FileText,
    Menu,
    Settings,
    LogOut,
    User,
    Bell,
    Plus,
    LucideIcon
} from 'lucide-react';

interface Member {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}

interface Auth {
    member: Member;
}

interface Flash {
    success?: string;
    error?: string;
}

interface PageProps {
    auth: Auth;
    flash: Flash;
    [key: string]: unknown;
}

interface NavigationItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

interface MemberLayoutProps {
    children: ReactNode;
}

export default function MemberLayout({ children }: MemberLayoutProps) {
    const { auth, flash } = usePage<PageProps>().props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigation: NavigationItem[] = [
        { name: 'Dashboard', href: route('member.dashboard'), icon: Home },
        { name: 'My Posts', href: route('member.posts.index'), icon: FileText },
    ];

    const handleLogout = (): void => {
        router.post(route('member.logout'));
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', false);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            <header className="bg-white shadow-sm border-b">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">

                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button 
                                        variant="ghost" 
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 md:hidden"
                                    >
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-64">
                                    <nav className="mt-5 px-2">
                                        <div className="space-y-1">
                                            {navigation.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <Icon className="text-gray-400 mr-4 flex-shrink-0 h-6 w-6" />
                                                        {item.name}s
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </nav>
                                </SheetContent>
                            </Sheet>

                            <div className="flex-shrink-0 flex items-center">
                                <Link href={route('member.dashboard')} className="text-xl font-bold text-gray-900">
                                    Member Portal
                                </Link>
                            </div>

                            <nav className="hidden md:ml-6 md:flex md:space-x-8">
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium"
                                        >
                                            <Icon className="mr-2 h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link href={route('member.posts.create')}>
                                <Button size="sm">
                                    <Plus className="h-4 w-4 " />
                                    New Post
                                </Button>
                            </Link>

                      
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={auth.member?.avatar} alt={auth.member?.name} />
                                            <AvatarFallback>
                                                {auth.member?.name?.charAt(0) || 'M'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{auth.member?.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {auth.member?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                   
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>

            {flash.success && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded relative mx-4 mt-4" role="alert">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}
            
            {flash.error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative mx-4 mt-4" role="alert">
                    <span className="block sm:inline">{flash.error}</span>
                </div>
            )}

            <main className="flex-1">
                {children}
            </main>

            <footer className="bg-white border-t">
                <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            © 2025 Member Portal. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
