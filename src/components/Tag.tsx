import {JSXElement} from 'solid-js';

export interface TagProps {
  tagName: string;
}

export default function Tag({tagName}: TagProps) {
  return (
    <li class='py-0.5 px-2.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 text-sm text-slate-800'>
      <a href={`/tag/${tagName}`}>#{tagName}</a>
    </li>
  );
}
