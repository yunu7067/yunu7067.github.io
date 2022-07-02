import fs from 'node:fs';
import FlexSearch from 'flexsearch';
/*
 * 위에 module import 오류난 거 아님
 */

interface BlogSearchProps {
  posts: {
    id: string;
    title: string;
    tags: string[];
  }[];
}

export default async function BlogSearch(props: BlogSearchProps) {
  const index = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: ['title', 'description', 'tags'],
      store: ['title', 'description', 'tags'], // 저장되는 필드. id는 안 넣어도 됨
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  });

  function indexing(data) {
    index.add(data);
  }

  const searchIndexPath = './public/search-index/';
  // const indexedData: {[key: string | number]: unknown} = {};
  async function exporting() {
    if (!fs.existsSync(searchIndexPath)) {
      fs.mkdirSync(searchIndexPath, {recursive: true});
    }
    return index.export((key, data) => {
      // indexedData[key] = data;
      // console.debug({key});
      fs.writeFileSync(`${searchIndexPath}${key}.json`, data !== undefined ? data : '');
    });
  }
  props.posts.map(post => {
    indexing(post);
  });
  await exporting();
  // const data = await exporting();

  // console.debug({data});
  return;
}
