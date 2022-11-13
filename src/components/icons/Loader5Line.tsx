import type {Component} from 'solid-js';
import type {IconProps} from './IconProps';

/**
 * @copyright Remix Icon <https://remixicon.com/>
 */
const Loader5Line: Component<IconProps> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={props.width || '1em'}
    height={props.height || '1em'}
    class={props.class || ''}
  >
    <path fill='none' d='M0 0h24v24H0z' />
    <path fill={props.color || 'currentColor'} d='M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z' />
  </svg>
);

export default Loader5Line;
