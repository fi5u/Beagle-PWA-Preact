import { h, Component } from 'preact'
import FocusProtectButton from './focus-protect-button.hoc'
import PropTypes from 'prop-types'
import { getColor as clr } from '../utils'
import { style } from 'typestyle'

const classNames = {
    button: style({
        background: 'none',
        border: 'none',
        lineHeight: 0,
        padding: 0,
        position: 'relative',
        $nest: {
            '&:active span': {
                backgroundColor: 'rgba(255,255,255,0.1)',
            },
            '&:hover svg': {
                color: '#fff',
            },
        },
    }),
    buttonInner: style({
        borderRadius: '50%',
        color: clr('brand'),
        display: 'inline-block',
        padding: 8,
    }),
    icon: style({
        color: clr('brand'),
    }),
}

class HeaderButton extends Component {
    render() {
        const { children, label, onClick } = this.props

        return (
            <button
                aria-label={label}
                className={classNames.button}
                onClick={onClick}
            >
                {children}
            </button>
        )
    }
}

HeaderButton.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default FocusProtectButton(HeaderButton, classNames.buttonInner, 2)
