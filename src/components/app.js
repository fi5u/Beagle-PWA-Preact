import 'semantic-ui-css/components/sidebar.css'
import { h, Component } from 'preact'
import { Button, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Layers, LifeBuoy } from 'react-feather'
import { Router } from 'preact-router'
import Header from './header.js'
import Help from '../routes/help'
import Home from '../routes/home'
import { Link } from 'preact-router/match'
import Profile from '../routes/profile'
import SidenavTouch from '../utils/sidenav-touch'
//import Home from 'async!./home'
//import Profile from 'async!./profile'
import { clamp } from 'lodash'
import { getColor as clr, getPlatform, watchForHover } from '../utils'
import { style } from 'typestyle'

export default class App extends Component {
    constructor() {
        super()

        // STATE
        this.state = {
            sidebarOpen: false,
        }

        // CLASS INSTANTIATIONS
        this.sidenavTouch = new SidenavTouch(this.toggleSidebar)

        // METHOD CALLS
        this.classNames = this.classNames()
        watchForHover() // Place class on body if device supports hover
    }

    classNames() {
        return {
            icon: style({
                height: 18,
                marginRight: 6,
                width: 18,
            }),
            navLink: style({
                color: clr('brand'),
                display: 'flex',
                marginBottom: 8,
                padding: '6px 14px',
                position: 'relative',
                textDecoration: 'none',
                $nest: {
                    '&:focus': {
                        backgroundColor: clr('brand', 'dark'),
                        outline: 'none',
                    },
                    '&:hover': {
                        color: '#fff',
                    },
                },
            }),
            sidebar: style({
                backgroundColor: clr('background', 'lighter'),
                display: 'flex',
                flexDirection: 'column',
                padding: '14px 0',
                visibility: 'visible',
            }),
            sidebarWrap: style({
                backgroundColor: clr('background'),
            }),
        }
    }

    /**
     *  Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
    handleRoute = e => {
        this.currentUrl = e.url
    }

    /** Toggle the open status of sidebar
     * @param {bool} open   Force open or closed, toggle without param
     */
    toggleSidebar = (event, open) => {
        if (!this.state.sidebarOpen && event) {
            event.stopImmediatePropagation()
        }

        const forceOpen = typeof open !== 'undefined'
        if (forceOpen && this.state.sidebarOpen === open) {
            return
        }

        this.setState(prevState => {
            return {
                sidebarOpen: forceOpen ? open : !prevState.sidebarOpen,
            }
        })
    }

    render() {
        const { sidebarOpen } = this.state

        return (
            <Sidebar.Pushable className={this.classNames.sidebarWrap}>
                <Sidebar
                    animation="uncover"
                    as="nav"
                    className={this.classNames.sidebar}
                    icon="labeled"
                    inverted
                    vertical
                    visible={sidebarOpen}
                    width="thin"
                >
                    <Link
                        activeClassName="active"
                        className={this.classNames.navLink}
                        href="/"
                        onClick={this.toggleSidebar}
                    >
                        <Layers className={this.classNames.icon} />Websites
                    </Link>

                    <Link
                        activeClassName="active"
                        className={this.classNames.navLink}
                        href="/help/"
                        onClick={this.toggleSidebar}
                    >
                        <LifeBuoy className={this.classNames.icon} />Help
                    </Link>
                </Sidebar>

                <Sidebar.Pusher
                    onClick={event => this.toggleSidebar(event, false)}
                    onTouchCancel={this.sidenavTouch.touchEnd}
                    onTouchEnd={() => this.sidenavTouch.touchEnd()}
                    onTouchMove={e => this.sidenavTouch.touchMove(e)}
                    onTouchStart={e =>
                        this.sidenavTouch.touchStart(e, this.pusher.base)}
                    ref={el => (this.pusher = el)}
                >
                    <div id="app" data-device={getPlatform()}>
                        <Header toggleSidebar={this.toggleSidebar} />
                        <Router onChange={this.handleRoute}>
                            <Home path="/" />
                            <Help path="/help/" />
                            <Profile path="/profile/" user="me" />
                            <Profile path="/profile/:user" />
                        </Router>
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}
