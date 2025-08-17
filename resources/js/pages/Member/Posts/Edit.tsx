import { Head, useForm } from '@inertiajs/react';
import MemberLayout from '@/layouts/member-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Save, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    content: string;
    excerpt?: string;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}


interface EditPostProps {
    post: Post;
}

export default function EditPost({ post }: EditPostProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        status: post.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('member.posts.update', post.id));
    };

    return (
        <MemberLayout>
            <Head title={`Edit: ${post.title}`} />

            <div className="py-6">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-4">
                            <Link href={route('member.posts.index')}>
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Posts
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
                                <p className="mt-2 text-gray-600">Make changes to your post.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Main Content Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Post Content</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter post title..."
                                            className="mt-1"
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Excerpt */}
                                    <div>
                                        <Label htmlFor="excerpt">Excerpt</Label>
                                        <Textarea
                                            id="excerpt"
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            placeholder="Brief description of your post..."
                                            className="mt-1"
                                            rows={3}
                                        />
                                        {errors.excerpt && (
                                            <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <Label htmlFor="content">Content *</Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            placeholder="Write your post content here..."
                                            className="mt-1"
                                            rows={12}
                                        />
                                        {errors.content && (
                                            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Settings Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Post Settings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select 
                                            value={data.status} 
                                            onValueChange={(value: 'draft' | 'published') => setData('status', value)}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <div className="flex justify-end space-x-4">
                                <Link href={route('member.posts.index')}>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {processing ? 'Updating...' : 'Update Post'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MemberLayout>
    );
}