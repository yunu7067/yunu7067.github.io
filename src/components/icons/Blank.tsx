import type {Component} from 'solid-js';
import type {IconProps} from './IconProps';

const Blank: Component<IconProps> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={props.width || '1em'}
    height={props.height || '1em'}
    class={props.class || ''}
  ></svg>
);

export default Blank;
