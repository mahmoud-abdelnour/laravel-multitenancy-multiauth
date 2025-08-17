import { Head, Link, router } from '@inertiajs/react';
import MemberLayout from '@/layouts/member-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
    Plus, 
    Search, 
    Edit, 
    Eye, 
    Trash2,
    Calendar,
    Filter
} from 'lucide-react';
import { useState } from 'react';

interface Post {
    id: number;
    title: string;
    excerpt?: string;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}

interface PaginatedPosts {
    data: Post[];
    current_page: number;
    last_page: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface PostsIndexProps {
    posts: PaginatedPosts;
}

export default function PostsIndex({ posts }: PostsIndexProps) {
    const [search, setSearch] = useState<string>('');

    const handleDelete = (post: Post): void => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('member.posts.destroy', post.id));
        }
    };

    return (
        <MemberLayout>
            <Head title="My Posts" />

            <div className="py-6">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
                                <p className="mt-2 text-gray-600">Manage all your content in one place.</p>
                            </div>
                            <Link href={route('member.posts.create')}>
                                <Button>
                                    <Plus className="h-4 w-4 " />
                                    New Post
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search posts..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Button variant="outline">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Posts List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>All Posts ({posts.data.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {posts.data && posts.data.length > 0 ? (
                                <div className="space-y-4">
                                    {posts.data
                                        .filter(post => 
                                            search === '' || 
                                            post.title.toLowerCase().includes(search.toLowerCase()) ||
                                            (post.excerpt && post.excerpt.toLowerCase().includes(search.toLowerCase()))
                                        )
                                        .map((post) => (
                                        <div key={post.id} className="flex items-center space-x-4 p-6 border rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {post.title}
                                                    </h3>
                                                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                                        {post.status}
                                                    </Badge>
                                                </div>
                                                {post.excerpt && (
                                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                <div className="flex items-center text-xs text-gray-400 space-x-4">
                                                    <div className="flex items-center">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        Created { post.created_at}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        Updated {post.updated_at}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link href={route('member.posts.show', post.id)}>
                                                    <Button variant="ghost" size="sm" title="View Post">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('member.posts.edit', post.id)}>
                                                    <Button variant="ghost" size="sm" title="Edit Post">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => handleDelete(post)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    title="Delete Post"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
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

                            {/* Pagination */}
                            {posts.links && posts.links.length > 3 && (
                                <div className="flex items-center justify-center space-x-2 mt-6">
                                    {posts.links.map((link, index) => (
                                        <div key={index}>
                                            {link.url ? (
                                                <Link href={link.url}>
                                                    <Button
                                                        variant={link.active ? "default" : "outline"}
                                                        size="sm"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                </Link>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MemberLayout>
    );
}