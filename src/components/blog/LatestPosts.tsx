import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "./BlogBits";
import { BlogPost, listPublished } from "@/lib/blog";

export default function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => { listPublished().then((p) => setPosts(p.slice(0, 3))).catch(() => {}); }, []);
  if (!posts.length) return null;
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-10 gap-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Latest from the <span className="text-gradient">Blog</span></h2>
          <Button variant="outline" asChild><Link to="/blog/">All articles <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">{posts.map((p) => <BlogCard key={p.id} post={p} />)}</div>
      </div>
    </section>
  );
}
