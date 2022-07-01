import {createSignal, onMount} from 'solid-js';
import {hit, ViewRequestProps} from '@utils';

export interface BlogViewsProps extends ViewRequestProps {}

export default function BlogViews(props: BlogViewsProps) {
  const [views, setViews] = createSignal(0);

  onMount(async () => {
    hit(props).then(({value}) => {
      // console.log(data);
      setViews(value);
    });
  });

  return <div>{views() === 0 ? 'loading...' : `${views()} views`} </div>;
}
