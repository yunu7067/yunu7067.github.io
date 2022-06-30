import {timeFormatter} from '@utils';

export interface SeriesPreviewProps {
  series: string;
  count: string | number;
  lastUpdated: string | number;
  locale: string;
}

export default function SeriesPreview({series, count, lastUpdated, locale}: SeriesPreviewProps) {
  return (
    <article class='mb-8 tracking-tight'>
      <header class='mb-3 flex flex-col items-start justify-center gap-1 text-start'>
        <a href={`/series/${series}` || '#error'}>
          <h1 class='text-4xl font-bold hover:underline underline-offset-1'>{series}</h1>
        </a>
        <p class='text-sm font-light text-gray-700 dark:text-gray-300'>
          <span class="after:content-['|'] after:mx-2">{count || 0} Posts</span>
          <span>Last updated on {timeFormatter(lastUpdated, locale || 'ko-KR')}</span>
        </p>
      </header>
      <main>
        <p class='line-clamp-3 mb-3'>{}</p>
      </main>
    </article>
  );
}
