import { h, Component } from 'preact'
import { style } from 'typestyle'

export default class Help extends Component {
    constructor() {
        super()

        this.classNames = this.classNames()
    }

    classNames() {
        return {
            page: style({
                color: '#fff',
                padding: '0 22px',
            }),
        }
    }

    render() {
        return (
            <div className={this.classNames.page}>
                <h1>Help</h1>
                <p>This is the Help component.</p>
            </div>
        )
    }
}
