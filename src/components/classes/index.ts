export * from './Clickable';
export * from './Button';
export * from './Tag';

import {classes} from '$utils';
export const btn: string = classes(
  'h-12 px-4 inline-flex flex-row items-center justify-center gap-2 rounded-md',
  'bg-zinc-200 hover:bg-zinc-300 dark:bg-slate-800 dark:hover:bg-slate-700',
  'text-gray-900 dark:text-zinc-100',
);
