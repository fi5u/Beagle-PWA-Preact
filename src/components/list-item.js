import { h, Component } from 'preact'
import { Edit } from 'react-feather'
import PropTypes from 'prop-types'
import { getColor as clr } from '../utils'
import { style } from 'typestyle'

/**
 * A single list item, swipeable
 *
 * @class ListItem
 * @extends {Component}
 */
class ListItem extends Component {
    constructor() {
        super()

        this.classNames = this.classNames()
    }

    classNames() {
        const hoverEditDuration = '.4s'
        const hoverEditDelay = '.6s'
        const hoverEditEase = 'cubic-bezier(0.215, 0.61, 0.355, 1)'

        const editButton = style({
            backgroundColor: 'transparent',
            border: 'none',
            color: clr('background', 'light'),
            cursor: 'pointer',
            display: 'none',
            height: '100%',
            padding: '0 4px',
            position: 'absolute',
            right: 20,
            top: 0,
            transform: 'translateX(50px)',
            transition: `transform ${hoverEditDuration} ${hoverEditDelay} ${hoverEditEase}`,
            $nest: {
                '.supports-hover &': {
                    display: 'block',
                },
                '&:focus': {
                    outline: 'none',
                },
                '&:hover': {
                    color: clr('background', 'lightest'),
                },
                '&:active': {
                    color: '#fff',
                },
            },
        })

        return {
            editButton: editButton,
            item: style({
                color: '#fff',
                cursor: 'pointer',
                marginBottom: 1,
                $nest: {
                    '.supports-hover &': {
                        [`&:hover .${editButton}`]: {
                            transform: 'translateX(0px)',
                        },
                        '&:hover>div': {
                            padding: '10px 52px 10px 22px',
                        },
                    },
                },
            }),
            itemInner: style({
                backgroundColor: clr('background', 'lighter'),
                padding: '10px 22px',
                position: 'relative',
                transition: `padding ${hoverEditDuration} ${hoverEditDelay} ${hoverEditEase}`,
            }),
            title: style({
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }),
        }
    }

    render() {
        const { data } = this.props

        return (
            <div className={this.classNames.item}>
                <div className={this.classNames.itemInner}>
                    <div className={this.classNames.title}>{data.title}</div>

                    <button className={this.classNames.editButton}>
                        <Edit />
                    </button>
                </div>
            </div>
        )
    }
}

ListItem.propTypes = {
    data: PropTypes.shape({
        spaceSymbol: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
        urlTemplate: PropTypes.string.isRequired,
    }).isRequired,
}

export default ListItem
