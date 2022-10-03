import type {MarkdownContent, MarkdownInstance} from 'astro';

export interface ContentMetadata {
  title: string;
  publishDate: string;
  description: string;
  /** 파일명 혹은 확장자에 대문자가 포함되 있으면 오류가 발생할 수도 있습니다. */
  heroImage?: string;
}

export interface PostMetadata extends ContentMetadata {
  tags: string[];
  series?: string;
}

export type PostContent = MarkdownContent<PostMetadata>;
export type PostInstance = MarkdownInstance<PostMetadata>;

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}
