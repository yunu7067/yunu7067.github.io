import {Component} from 'solid-js';
import {IconProps} from './IconProps';

/**
 * @copyright Remix Icon <https://remixicon.com/>
 */
const AtLine: Component<IconProps> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={props.width || '1em'}
    height={props.height || '1em'}
  >
    <path fill='none' d='M0 0h24v24H0z' />
    <path
      fill={props.color || 'currentColor'}
      d='M20 12a8 8 0 1 0-3.562 6.657l1.11 1.664A9.953 9.953 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10v1.5a3.5 3.5 0 0 1-6.396 1.966A5 5 0 1 1 15 8H17v5.5a1.5 1.5 0 0 0 3 0V12zm-8-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
    />
  </svg>
);

export default AtLine;
