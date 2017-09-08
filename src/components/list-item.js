import { classes, style } from 'typestyle'
import { h, Component } from 'preact'
import HoverEditButton from './hover-edit-button'
import ListItemButton from './list-item-button'
import PropTypes from 'prop-types'
import { getColor as clr } from '../utils'

/**
 * A single list item, swipeable
 *
 * @class ListItem
 * @extends {Component}
 */
class ListItem extends Component {
    constructor() {
        super()

        this.state = {
            itemHovered: false,
        }

        this.classNames = this.classNames()
    }

    classNames() {
        const hoverEditTransition =
            '.3s .5s cubic-bezier(0.215, 0.61, 0.355, 1)'

        const editButton = style({
            $debugName: 'editButton',
            backgroundColor: 'transparent',
            border: 'none',
            color: clr('background', 'light'),
            cursor: 'pointer',
            display: 'none',
            padding: '0',
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translate(50px, -50%)',
            transition: `transform ${hoverEditTransition}`,
            $nest: {
                '.supports-hover &': {
                    display: 'block',
                },
                '&:hover': {
                    color: clr('background', 'lightest'),
                },
                '&:active': {
                    color: '#fff',
                },
            },
        })

        const itemInner = style({
            backgroundColor: clr('background', 'lighter'),
            padding: '10px 22px',
            position: 'relative',
            transition: `padding ${hoverEditTransition}, transform .4s`,
            zIndex: 1,
        })

        return {
            buttons: style({
                height: '100%',
                position: 'absolute',
                right: -1,
                top: 0,
            }),
            editButton: editButton,
            item: style({
                color: '#fff',
                cursor: 'pointer',
                marginBottom: 1,
                position: 'relative',
                $nest: {
                    '.supports-hover &': {
                        [`&:hover .${editButton}`]: {
                            transform: 'translate(0px, -50%)',
                        },
                        [`&:hover>.${itemInner}`]: {
                            padding: '10px 52px 10px 22px',
                        },
                    },
                },
            }),
            itemInner: itemInner,
            itemInnerOpen: style({
                padding: '10px 52px 10px 22px',
                transform: 'translateX(-100px)',
                $nest: {
                    [`.${editButton}`]: {
                        transform: 'translate(0px, -50%)',
                    },
                },
            }),
            title: style({
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }),
        }
    }

    /**
     * List item has been clicked
     *
     * @memberOf ListItem
     */
    clickItem = () => {
        this.props.closeAllButtonRevealItems()
    }

    /**
     * Delete an item
     *
     * @param {string} id
     * @memberOf ListItem
     */
    deleteItem = id => {
        console.log('delete ' + id)
    }

    /**
     * Edit an item
     *
     * @param {string} id
     * @memberOf ListItem
     */
    editItem = id => {
        console.log('edit ' + id)
    }

    /**
     * Mouse has entered the item
     *
     * @memberOf ListItem
     */
    itemEnter = () => {
        this.setState({
            itemHovered: true,
        })
    }

    /**
     * Mouse has left the item
     *
     * @memberOf ListItem
     */
    itemLeave = () => {
        this.setState({
            itemHovered: false,
        })
    }

    /**
     * Toggle the reveal status of item
     *
     * @param {Object} event
     * @memberOf ListItem
     */
    toggleRevealItem = event => {
        event.stopPropagation()
        this.props.toggleRevealItem(this.props.data.id)
    }

    render() {
        const { itemHovered } = this.state
        const { data, editItem, buttonsAreRevealed } = this.props

        return (
            <div
                className={this.classNames.item}
                onMouseEnter={this.itemEnter}
                onMouseLeave={this.itemLeave}
            >
                <div
                    className={classes(
                        this.classNames.itemInner,
                        buttonsAreRevealed
                            ? this.classNames.itemInnerOpen
                            : null
                    )}
                    onClick={this.clickItem}
                >
                    <div className={this.classNames.title}>{data.title}</div>

                    <HoverEditButton
                        editButtonClassName={this.classNames.editButton}
                        tabIndex={
                            itemHovered || buttonsAreRevealed ? null : '-1'
                        }
                        toggleRevealItem={this.toggleRevealItem}
                    />
                </div>

                <div className={this.classNames.buttons}>
                    <ListItemButton
                        isRevealed={buttonsAreRevealed}
                        label="Delete"
                        name="delete"
                        onClick={this.deleteItem}
                    />

                    <ListItemButton
                        isRevealed={buttonsAreRevealed}
                        label="Edit"
                        name="edit"
                        onClick={this.editItem}
                    />
                </div>
            </div>
        )
    }
}

ListItem.propTypes = {
    closeAllButtonRevealItems: PropTypes.func.isRequired,
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        spaceSymbol: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
        urlTemplate: PropTypes.string.isRequired,
    }).isRequired,
    editItem: PropTypes.func.isRequired,
    buttonsAreRevealed: PropTypes.bool.isRequired,
    toggleRevealItem: PropTypes.func.isRequired,
}

export default ListItem
