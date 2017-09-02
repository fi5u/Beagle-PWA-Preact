import { Menu, PlusCircle } from 'react-feather'
import HeaderButton from './header-button'
import PropTypes from 'prop-types'
import { h } from 'preact'
import { style } from 'typestyle'

const classNames = {
    buttons: style({
        display: 'flex',
        justifyContent: 'space-between',
    }),
}

const HeaderButtons = ({}) => {
    return (
        <div className={classNames.buttons}>
            <HeaderButton label="Open menu">
                <Menu />
            </HeaderButton>

            <HeaderButton label="Add new website">
                <PlusCircle />
            </HeaderButton>
        </div>
    )
}

HeaderButtons.propTypes = {}

export default HeaderButtons
