import { mockCommunityPosts } from "@/lib/mockData";
import PostDetailClient from "./PostDetailClient";

export function generateStaticParams() {
  return mockCommunityPosts.map((p) => ({ id: String(p.id) }));
}

export default function PostDetailPage() {
  return <PostDetailClient />;
}
