import { Head, Link } from '@inertiajs/react';
import MemberLayout from '@/layouts/member-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    FileText, 
    Eye, 
    Edit,
    Trash2,
    Plus,
    Calendar,
    Clock,
    BarChart3
} from 'lucide-react';



interface Post {
    id: number;
    title: string;
    excerpt?: string;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}

interface Stats {
    total_posts: number;
    published_posts: number;
    draft_posts: number;
}

interface PaginatedPosts {
    data: Post[];
    links?: any;
}

interface DashboardProps {
    posts: PaginatedPosts;
    stats: Stats;
}

export default function Dashboard({ posts, stats }: DashboardProps) {
    return (
        <MemberLayout>
            <Head title="Member Dashboard" />

            <div className="py-6">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
                        <p className="mt-2 text-gray-600">Here's what's happening with your content.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_posts}</div>
                                <p className="text-xs text-muted-foreground">
                                    All your posts combined
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Published</CardTitle>
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{stats.published_posts}</div>
                                <p className="text-xs text-muted-foreground">
                                    Live and visible to others
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                                <Edit className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-orange-600">{stats.draft_posts}</div>
                                <p className="text-xs text-muted-foreground">
                                    Work in progress
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Recent Posts</CardTitle>
                                            <CardDescription>
                                                Your latest content activity
                                            </CardDescription>
                                        </div>
                                        <Link href={route('member.posts.create')}>
                                            <Button size="sm">
                                                <Plus className="h-4 w-4" />
                                                New Post
                                            </Button>
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {posts.data && posts.data.length > 0 ? (
                                        <div className="space-y-4">
                                            {posts.data.map((post) => (
                                                <div key={post.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                                {post.title}
                                                            </h3>
                                                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                                                {post.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            {post.excerpt || 'No excerpt available'}
                                                        </p>
                                                        <div className="flex items-center mt-2 text-xs text-gray-400">
                                                            <Calendar className="h-3 w-3 mr-1" />
                                                            {((post.created_at))}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <Link href={route('member.posts.edit', post.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={route('member.posts.show', post.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            {posts.links && (
                                                <div className="flex justify-center pt-4">
                                                    <Link href={route('member.posts.index')}>
                                                        <Button variant="outline" size="sm">
                                                            View All Posts
                                                        </Button>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
                                            <p className="mt-1 text-sm text-gray-500">Get started by creating your first post.</p>
                                            <div className="mt-6">
                                                <Link href={route('member.posts.create')}>
                                                    <Button>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Create Post
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Link href={route('member.posts.create')}>
                                        <Button className="w-full justify-start">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create New Post
                                        </Button>
                                    </Link>
                                    <Link href={route('member.posts.index')} >
                                        <Button variant="outline" className="w-full justify-start mt-3">
                                            <FileText className="h-4 w-4 mr-2" />
                                            Manage Posts
                                        </Button>
                                    </Link>
                                 
                                </CardContent>
                            </Card>

                        
                        </div>
                    </div>
                </div>
            </div>
        </MemberLayout>
    );
}



/* import React from 'react';
import { Head } from '@inertiajs/react';
import MemberLayout from '@/layouts/MemberLayout';

export default function Dashboard() {
    return (
        <MemberLayout>
            <Head title="Member Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in as an admin!
                        </div>
                    </div>
                </div>
            </div>
        </MemberLayout>
    );
} */