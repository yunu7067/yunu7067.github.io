import type {Component} from 'solid-js';
import type {IconProps} from './IconProps';

/**
 * @copyright Remix Icon <https://remixicon.com/>
 */
const Rss: Component<IconProps> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={props.width || '1em'}
    height={props.height || '1em'}
  >
    <path fill='transparent' d='M0 0h24v24H0z' />
    <path
      fill={props.color || 'currentColor'}
      d='M3 17a4 4 0 0 1 4 4H3v-4zm0-7c6.075 0 11 4.925 11 11h-2a9 9 0 0 0-9-9v-2zm0-7c9.941 0 18 8.059 18 18h-2c0-8.837-7.163-16-16-16V3z'
    />
  </svg>
);

export default Rss;
