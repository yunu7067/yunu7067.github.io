import Tag from '@coms/Tag';

export default function Tags({tags}: {tags?: string[]}) {
  return <ul class='flex flex-row gap-2 flex-wrap'>{tags && tags.map(tag => <Tag tagName={tag} />)}</ul>;
}
