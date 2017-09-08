import FocusProtectButton from './focus-protect-button.hoc'
import PropTypes from 'prop-types'
import { getColor as clr } from '../utils'
import { h, Component } from 'preact'
import { style } from 'typestyle'

const buttonInnerClassName = style({
    display: 'block',
    height: 38,
    lineHeight: '38px',
    padding: '0 12px',
    position: 'relative',
    $nest: {
        '&:focus': {
            outline: 'none',
        },
    },
})

class ListItemButton extends Component {
    constructor() {
        super()

        this.classNames = this.classNames()
    }

    classNames() {
        return {
            button: style({
                backgroundColor: clr('brand'),
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                marginRight: 1,
                padding: 0,
                $nest: {
                    '&:hover': {
                        backgroundColor: clr('brand', 'darker'),
                    },
                    '&:active': {
                        backgroundColor: clr('brand', 'lighter'),
                    },
                },
            }),
        }
    }

    render() {
        const { isRevealed, label, name, onClick } = this.props

        return (
            <button
                aria-label={label}
                className={this.classNames.button}
                tabIndex={!isRevealed ? '-1' : null}
                onClick={onClick}
            >
                {label}
            </button>
        )
    }
}

ListItemButton.propTypes = {
    isRevealed: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default FocusProtectButton(ListItemButton, buttonInnerClassName)
