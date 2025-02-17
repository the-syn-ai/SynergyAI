import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Latest Insights</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <Card key={post.id}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {post.content.slice(0, 150)}...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
