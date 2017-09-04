import 'semantic-ui-css/components/sidebar.css'
import { h, Component } from 'preact'
import { Button, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Layers, LifeBuoy } from 'react-feather'
import { Router } from 'preact-router'
import Header from './header.js'
import Home from '../routes/home'
import { Link } from 'preact-router/match'
import Profile from '../routes/profile'
import Help from '../routes/help'
//import Home from 'async!./home'
//import Profile from 'async!./profile'
import { getColor as clr } from '../utils'
import { getPlatform } from '../utils'
import { style } from 'typestyle'

export default class App extends Component {
    constructor() {
        super()

        this.state = {
            sidebarOpen: false,
        }

        this.classNames = this.classNames()
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
                paddingBottom: 16,
                textDecoration: 'none',
                $nest: {
                    '&:hover': {
                        color: '#fff',
                    },
                },
            }),
            sidebar: style({
                backgroundColor: clr('background', 'lighter'),
                display: 'flex',
                flexDirection: 'column',
                padding: 14,
            }),
            sidebarWrap: style({
                backgroundColor: clr('background'),
            }),
        }
    }

    /** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
    handleRoute = e => {
        this.currentUrl = e.url
    }

    /**
     * Toggle the open status of sidebar
     */
    toggleSidebar = () => {
        this.setState(prevState => {
            return { sidebarOpen: !prevState.sidebarOpen }
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

                <Sidebar.Pusher>
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
