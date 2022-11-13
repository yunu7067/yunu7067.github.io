import type {Component} from 'solid-js';
import type {IconProps} from './IconProps';

/**
 * @copyright Remix Icon <https://remixicon.com/>
 */
const ArrowLeftCircleLine: Component<IconProps> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={props.width || '1em'}
    height={props.height || '1em'}
  >
    <path fill='none' d='M0 0h24v24H0z' />
    <path
      fill={props.color || 'currentColor'}
      d='M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm0-9h4v2h-4v3l-4-4 4-4v3z'
    />
  </svg>
);

export default ArrowLeftCircleLine;
