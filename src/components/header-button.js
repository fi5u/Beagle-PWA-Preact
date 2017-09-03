import PropTypes from 'prop-types'
import { getColor as clr } from '../utils'
import { h } from 'preact'
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
            '&:focus': {
                outline: 'none',
                '&>span:after': {
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: 1,
                    bottom: 6,
                    content: '""',
                    height: 2,
                    left: 0,
                    position: 'absolute',
                    width: '100%',
                },
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
        $nest: {
            '&:focus': {
                outline: 'none',
            },
        },
    }),
    icon: style({
        color: clr('brand'),
    }),
}

const HeaderButton = ({ children, label, onClick }) => {
    return (
        <button
            aria-label={label}
            className={classNames.button}
            onClick={onClick}
        >
            <span className={classNames.buttonInner} tabIndex="-1">
                {children}
            </span>
        </button>
    )
}

HeaderButton.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default HeaderButton
