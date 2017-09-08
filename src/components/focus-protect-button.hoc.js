import { Component, cloneElement, createElement } from 'preact'
import { classes, style } from 'typestyle'

/**
 * HOC (Inheritance Inversion) - wraps the contents of the button so that
 * focus state does not occur on click, only tab
 *
 * @export
 * @param {any} WrappedComponent
 * @returns
 */
export default function FocusProtectButton(
    WrappedComponent,
    innerClassName,
    bottomOverride
) {
    return class IIHOC extends WrappedComponent {
        render() {
            const elementsTree = super.render()

            const button = style({
                $nest: {
                    '&:focus': {
                        outline: 'none',
                    },
                },
            })

            const props = Object.assign({}, elementsTree.props, {
                className: classes(elementsTree.props.className, button),
            })

            const buttonInner = style({
                $nest: {
                    '&:focus': {
                        outline: 'none',
                    },
                    'button:focus>&:after': {
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: 1,
                        bottom: bottomOverride || 6,
                        content: '""',
                        height: 2,
                        left: '10%',
                        position: 'absolute',
                        width: '80%',
                    },
                },
            })

            const myNewElementChildren = createElement(
                'span',
                {
                    className: classes(buttonInner, innerClassName),
                    tabIndex: '-1',
                },
                elementsTree.props.children
            )

            const newElementsTree = cloneElement(
                elementsTree,
                props,
                myNewElementChildren
            )
            return newElementsTree
        }
    }
}
