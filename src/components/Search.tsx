import {createEffect, createSignal, For, Show} from 'solid-js';
import * as FlexSearch from 'flexsearch';
import {classes, createDebounce} from '$utils';
import {SearchLine} from '$coms/icons';
import {Clickable, Tag} from '$coms/classes';

export default function Search({keys}: {keys: string[]}) {
  const [keyword, setKeyword] = createSignal<string>('');
  const [doc, setDoc] = createSignal<FlexSearch.Document<unknown, false>>();
  // const [searchResult, setSearchResult] = createSignal<
  //   FlexSearch.DocumentSearchResult<{title: string; description: string; tags: string[]}, true, true>
  // >([]);
  const [searchResult, setSearchResult] = createSignal<
    FlexSearch.EnrichedDocumentSearchResultSetUnitResultUnit<{
      title: string;
      description: string;
      tags: string[];
    }>[]
  >();

  const [trigger, clear] = createDebounce(() => {
    // console.debug({doc: doc()});
    const resultMap = new Map();
    const results = doc().search(keyword(), {
      enrich: true,
      suggest: true,
    }) as unknown as FlexSearch.DocumentSearchResult<{}, true, true>;
    // 검색 Field 반복
    results.forEach(result => {
      // Field 내 검색 결과 반복
      result.result.forEach(res => {
        resultMap.set(res.id, res);
      });
    });
    setSearchResult(Array.from(resultMap, ([key, value]) => value));
    // setSearchResult(results as unknown as typeof searchResult);
    // console.debug({results: resultMap});
  }, 365); // 365 ms 동안 대기

  createEffect(() => {
    (async function () {
      // console.debug({keys});
      const flexSearchDoc = new FlexSearch.Document({
        document: {
          id: 'id',
          index: ['title', 'description', 'tags'],
          store: ['title', 'description', 'tags'],
        },
      });

      // console.debug(keys);
      for (let i = 0, key; i < keys.length; i++) {
        key = keys[i];
        const data = await fetch(`/search-index/${key}.json`).then(res => res.text());

        // console.debug({ key, data, url:  `/search-index/${key}.json`});
        flexSearchDoc.import(key, data ?? null);
      }

      return flexSearchDoc;
    })().then(doc => {
      setDoc(doc);
    });
  });

  return (
    <div>
      <div class='relative'>
        <input
          id='input-search'
          type='text'
          class='bg-gray-100 dark:bg-gray-700 mb-4 p-4 pr-14 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-800 dark:focus:border-indigo-800 flex-1 block w-full rounded-none rounded-r-md text-sm'
          onInput={e => {
            setKeyword(e.currentTarget.value);
            trigger();
          }}
          value={keyword()}
          placeholder='여기에 검색어를 입력하세요.'
          maxLength={30}
        />
        <label
          for='input-search'
          class='absolute p-4 mb-4 top-0 right-0 text-sm dark:text-gray-200'
        >
          <SearchLine width='20' height='20' />
        </label>
      </div>

      <output>
        <div>
          <For each={searchResult()}>
            {({id, doc}) => (
              <div class='p-8 border rounded-md mb-2 dark:border-gray-600'>
                <a href={id as unknown as string}>
                  <h1 class='text-2xl font-bold hover:underline hover:underline-offset-1'>
                    {doc.title}
                  </h1>
                </a>
                <p class='mt-1.5 '>{doc.description}</p>
                <ul class='mt-4 flex flex-row gap-1.5 flex-wrap'>
                  <For each={doc?.tags}>
                    {tag => (
                      <li class={classes(Clickable, Tag)}>
                        <a class='block px-2.5 py-1.5' href={`/tag/${tag}`}>
                          {tag}
                        </a>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
      </output>
    </div>
  );
}
