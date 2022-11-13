import type {Component} from 'solid-js';
import type {IconProps} from './IconProps';

/**
 * @copyright Remix Icon <https://remixicon.com/>
 */
const Npmjs: Component<IconProps> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={props?.width || '1em'}
    height={props?.height || '1em'}
    class={props?.class || ''}
  >
    <path fill='none' d='M0 0h24v24H0z' />
    <path
      fill={props?.color || 'currentColor'}
      d='M20 3c.552 0 1 .448 1 1v16c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h16zm-1 2H5v14h14V5zm-2 2v10h-2.5V9.5H12V17H7V7h10z'
    />
  </svg>
);

export default Npmjs;
