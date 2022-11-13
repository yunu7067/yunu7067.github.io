import {s} from 'hastscript';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export const rehypeAutolinkHeading = [
  rehypeAutolinkHeadings,
  {
    behavior: 'prepend',
    content: s(
      `svg`,
      {width: '0.875em', height: '0.875em', viewBox: `0 0 24 24`},
      s(`path`, {fill: `none`, d: 'M0 0h24v24H0z'}),
      s(`path`, {fill: `currentColor`, d: 'M17 11V4h2v17h-2v-8H7v8H5V4h2v7z'}),
    ),
  },
];
