import { mockExperts } from "@/lib/mockData";
import ExpertDetailClient from "./ExpertDetailClient";

export function generateStaticParams() {
  return mockExperts.map((e) => ({ id: String(e.id) }));
}

export default function ExpertDetailPage() {
  return <ExpertDetailClient />;
}
