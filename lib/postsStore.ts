// lib/postsStore.ts
// 실시간 학습상담 게시글 모듈 레벨 스토어 (클라이언트 사이드 내비게이션 간 상태 유지)

import { mockCommunityPosts } from "./mockData";
import type { CommunityPost, PostAnswer, Reply } from "./mockData";

let posts: CommunityPost[] = [...mockCommunityPosts];
let nextId = mockCommunityPosts.length + 1;
let nextReplyId = 100;

export function getPosts(): CommunityPost[] {
  return [...posts];
}

export function getPostById(id: number): CommunityPost | undefined {
  return posts.find((p) => p.id === id);
}

export function addPost(data: Omit<CommunityPost, "id">): CommunityPost {
  const newPost: CommunityPost = { ...data, id: nextId++ };
  posts = [newPost, ...posts];
  return newPost;
}

export function addAnswer(postId: number, answer: Omit<PostAnswer, "likeCount" | "replies">): void {
  const fullAnswer: PostAnswer = { ...answer, likeCount: 0, replies: [] };
  posts = posts.map((p) =>
    p.id === postId ? { ...p, answers: [...p.answers, fullAnswer] } : p
  );
}

export function likePost(postId: number): void {
  posts = posts.map((p) =>
    p.id === postId ? { ...p, likeCount: p.likeCount + 1 } : p
  );
}

export function unlikePost(postId: number): void {
  posts = posts.map((p) =>
    p.id === postId ? { ...p, likeCount: Math.max(0, p.likeCount - 1) } : p
  );
}

export function likeAnswer(postId: number, answerIndex: number): void {
  posts = posts.map((p) => {
    if (p.id !== postId) return p;
    const answers = p.answers.map((a, i) =>
      i === answerIndex ? { ...a, likeCount: a.likeCount + 1 } : a
    );
    return { ...p, answers };
  });
}

export function unlikeAnswer(postId: number, answerIndex: number): void {
  posts = posts.map((p) => {
    if (p.id !== postId) return p;
    const answers = p.answers.map((a, i) =>
      i === answerIndex ? { ...a, likeCount: Math.max(0, a.likeCount - 1) } : a
    );
    return { ...p, answers };
  });
}

export function addReply(postId: number, answerIndex: number, replyData: Omit<Reply, "id">): void {
  const reply: Reply = { ...replyData, id: nextReplyId++ };
  posts = posts.map((p) => {
    if (p.id !== postId) return p;
    const answers = p.answers.map((a, i) =>
      i === answerIndex ? { ...a, replies: [...a.replies, reply] } : a
    );
    return { ...p, answers };
  });
}
