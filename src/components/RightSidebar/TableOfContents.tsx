import {MarkdownHeading} from 'astro';
import {Component, createEffect, createSignal} from 'solid-js';

interface Props {
  headings: MarkdownHeading[];
}

const TableOfContents: Component<Props> = ({headings}) => {
  const [currentID, setCurrentID] = createSignal('overview');

  createEffect(() => {
    const headerEls = document.querySelectorAll('main#article-container :is(h1,h2,h3)');
    const headerElIDs = Array.from(headerEls).map(el => el.id);
    let initFlag = true;

    const setCurrent: IntersectionObserverCallback = entries => {
      // console.log({initFlag, entries});
      entries.map(({target, isIntersecting, intersectionRect, intersectionRatio}) => {
        if (initFlag || intersectionRatio === 0) return;
        if (isIntersecting && ~~intersectionRect.top > 0) {
          const idx = headerElIDs.findIndex(id => id === target.id) - 1;
          setCurrentID(idx < 0 ? 'overview' : headerElIDs[idx]);
        } else if (!isIntersecting && ~~intersectionRect.top === 0) {
          setCurrentID(target?.id || 'overview');
        }
      });
      initFlag = false;
    };

    const observerOptions: IntersectionObserverInit = {rootMargin: '0px', threshold: 1};
    const headingsObserver = new IntersectionObserver(setCurrent, observerOptions);
    headerEls.forEach(h => headingsObserver.observe(h));
  });

  return (
    <>
      <h2>On this page</h2>
      <ul>
        {headings.map(({depth, slug, text}) => (
          <li
            class={`w-64 pl-3 rounded-md text-sm depth-${depth} ${
              currentID() === slug
                ? 'bg-gray-100 after:absolute after:-left-2 after:w-1 after:h-6 after:mt-1 ' +
                  "after:content-[''] after:rounded-md after:bg-sky-500"
                : ''
            }`.trim()}
          >
            <a class='inline-flex w-full py-1.5' href={`#${slug}`} onClick={() => setCurrentID(slug)}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TableOfContents;
