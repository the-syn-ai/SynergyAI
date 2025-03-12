import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post, PostCategory } from "@shared/schema";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";
import { format } from "date-fns";

export default function Blog() {
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: categories, isLoading: categoriesLoading } = useQuery<PostCategory[]>({
    queryKey: ["/api/post-categories"],
  });
  
  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory 
        ? `/api/posts?categoryId=${selectedCategory}`
        : "/api/posts";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    }
  });

  const isLoading = categoriesLoading || postsLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-muted rounded-lg w-1/3 mb-8"></div>
          <div className="h-8 bg-muted rounded-lg w-full mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Group posts by category for topic clusters
  const postsByCategory = posts?.reduce((acc, post) => {
    const categoryId = post.categoryId?.toString() || "uncategorized";
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  // Get category name by ID
  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return "Uncategorized";
    const category = categories?.find(c => c.id === categoryId);
    return category?.name || "Uncategorized";
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Knowledge Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our latest insights, guides, and resources organized by topic to help you
          understand and implement AI-powered solutions for your business.
        </p>
      </div>
      
      {categories && categories.length > 0 && (
        <Tabs 
          defaultValue="all" 
          className="mb-12"
          onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-flow-col auto-cols-max gap-2">
              <TabsTrigger value="all">All Topics</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id.toString()}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.map((post) => (
                <PostCard key={post.id} post={post} categoryName={getCategoryName(post.categoryId)} />
              ))}
            </div>
          </TabsContent>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id.toString()}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {postsByCategory?.[category.id.toString()]?.map((post) => (
                  <PostCard key={post.id} post={post} categoryName={category.name} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
      
      {(!categories || categories.length === 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} categoryName={getCategoryName(post.categoryId)} />
          ))}
        </div>
      )}
    </div>
  );
}

function PostCard({ post, categoryName }: { post: Post, categoryName: string }) {
  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "";
    // Convert string date to Date object and format it
    try {
      const date = dateString instanceof Date ? dateString : new Date(dateString);
      return format(date, "MMMM d, yyyy");
    } catch (e) {
      return "";
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="mb-2">{categoryName}</Badge>
          {post.publishedAt && (
            <span className="text-xs text-muted-foreground">
              {formatDate(post.publishedAt)}
            </span>
          )}
        </div>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/blog/${post.slug}`} className="w-full">
          <Button variant="outline" className="w-full">Read Article</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
