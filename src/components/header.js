import { h, Component } from 'preact'
import HeaderButtons from './header-buttons'
import { getColor as clr } from '../utils'
import { style } from 'typestyle'

export default class Header extends Component {
    constructor() {
        super()

        this.classNames = this.classNames()
    }

    classNames() {
        return {
            header: style({
                alignItems: 'stretch',
                backgroundColor: clr('background'),
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                height: '50px',
                justifyContent: 'center',
                padding: '0 14px',
                position: 'relative',
                width: '100%',
            }),
            title: style({
                display: 'inline-block',
                fontSize: '1.2rem',
                left: '50%',
                position: 'absolute',
                top: 0,
                transform: 'translateX(-50%)',
            }),
        }
    }

    render() {
        return (
            <header className={this.classNames.header}>
                <h1 className={this.classNames.title}>Test</h1>

                <HeaderButtons />
            </header>
        )
    }
}
