import { h, Component } from 'preact'
import { PlusCircle } from 'react-feather'
import { Link } from 'preact-router/match'
import { getColor as clr } from '../utils'
import { style } from 'typestyle'

export default class Header extends Component {
    constructor() {
        super()

        this.classNames = this.classNames()
    }

    classNames() {
        return {
            buttons: style({
                alignItems: 'stretch',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
            }),
            buttonInner: style({
                $nest: {
                    '&:focus': {
                        outline: 'none',
                    },
                },
            }),
            buttonPrimary: style({
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                lineHeight: 0,
                padding: 0,
                position: 'relative',
                $nest: {
                    '&:active svg': {
                        color: clr('background'),
                        fill: clr('brand'),
                    },
                    '&:focus': {
                        outline: 'none',
                        '&>span:after': {
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            borderRadius: 1,
                            bottom: -5,
                            content: '""',
                            height: 2,
                            left: 0,
                            position: 'absolute',
                            width: '100%',
                        },
                    },
                    '&:hover:not(:active) svg': {
                        color: '#fff',
                    },
                },
            }),
            header: style({
                backgroundColor: clr('background'),
                color: '#fff',
                display: 'block',
                height: '50px',
                padding: '0 14px',
                position: 'relative',
                width: '100%',
            }),
            iconPlus: style({
                color: clr('brand'),
            }),
            title: style({
                display: 'inline-block',
                fontSize: '1.2rem',
                left: '50%',
                position: 'absolute',
                transform: 'translateX(-50%)',
            }),
        }
    }

    render() {
        return (
            <header className={this.classNames.header}>
                <h1 className={this.classNames.title}>Test</h1>

                <div className={this.classNames.buttons}>
                    <button className={this.classNames.buttonPrimary}>
                        <span
                            className={this.classNames.buttonInner}
                            tabIndex="-1"
                        >
                            <PlusCircle className={this.classNames.iconPlus} />
                        </span>
                    </button>
                </div>
            </header>
        )
    }
}
