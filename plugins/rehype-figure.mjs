import {h} from 'hastscript';
import {visit} from 'unist-util-visit';

/**
 *
 * @type {import('unified').Plugin<Array<void>, Root>}
 */
export function rehypeFigure() {
  const buildFigureChildern = ({properties}) => [
    h('img', {...properties}),
    properties.alt && properties.alt.trim().length > 0 ? h('figcaption', properties.alt) : '',
  ];

  return (tree, file) => {
    visit(tree, {tagName: 'img'}, (node, index, parent) => {
      if (parent.tagName === 'figure') {
        return;
      }

      const figureChildernEls = buildFigureChildern(node);

      node.tagName = 'figure';
      node.properties = {};
      node.children = figureChildernEls;
    });
  };
}
