import {createSignal, onMount, Show} from 'solid-js';
import {hit, ViewRequestProps} from '$utils';

export interface BlogViewsProps extends ViewRequestProps {}

export default function BlogViews(props: BlogViewsProps) {
  const [views, setViews] = createSignal(0);

  onMount(async () => {
    hit(props).then(({value}) => setViews(value));
  });

  return (
    <div>
      <Show when={views()} fallback={'loading...'}>
        {views()} views
      </Show>
    </div>
  );
}
