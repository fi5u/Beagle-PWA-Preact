import { h, Component } from 'preact'
import style from './style'

export default class Home extends Component {
    constructor() {
        super()

        this.data = [
            {
                spaceSymbol: '+',
                title: 'House of Fraser',
                url: 'https://www.houseoffraser.co.uk',
                urlTemplate: 'https://www.houseoffraser.co.uk/search/$',
            },
            {
                spaceSymbol: '%20',
                title: 'Bing',
                url: 'https://bing.com',
                urlTemplate: 'https://bing.com/?s=$',
            },
            {
                spaceSymbol: '+',
                title: 'Google',
                url: 'https://google.com',
                urlTemplate: 'https://google.com/search/?q=$',
            },
        ]
    }

    render() {
        return (
            <div class={style.home}>
                <h1>Home</h1>
                <p>This is the Home component.</p>
            </div>
        )
    }
}
