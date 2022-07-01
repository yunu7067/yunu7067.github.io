import type {MarkdownContent} from 'astro';

export interface PostMetadata {
  title: string;
  publishDate: string;
  description: string;
  /** 파일명 혹은 확장자에 대문자가 포함되 있으면 오류가 발생할 수도 있습니다. */
  heroImage?: string;
  tags: string[];
  series?: string;
}

export type PostContent = MarkdownContent<PostMetadata>;
