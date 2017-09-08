import { Edit } from 'react-feather'
import FocusProtectButton from './focus-protect-button.hoc'
import PropTypes from 'prop-types'
import { h, Component } from 'preact'
import { style } from 'typestyle'

/**
 * Button to reveal edit/delete buttons
 * Only available on hover enabled devices
 *
 * @class HoverEditButton
 * @extends {Component}
 */
class HoverEditButton extends Component {
    render() {
        const { editButtonClassName, tabIndex, toggleRevealItem } = this.props

        return (
            <button
                aria-label="Edit/delete website"
                className={editButtonClassName}
                onClick={toggleRevealItem}
                tabIndex={tabIndex}
            >
                <Edit />
            </button>
        )
    }
}

HoverEditButton.propTypes = {
    editButtonClassName: PropTypes.object.isRequired,
    tabIndex: PropTypes.string.isRequired,
    toggleRevealItem: PropTypes.func.isRequired,
}

export default FocusProtectButton(HoverEditButton, null, 4)
