import { h, Component } from 'preact'
import ListItem from '../../components/list-item'

export default class Home extends Component {
    constructor() {
        super()

        this.data = [
            {
                spaceSymbol: '+',
                title:
                    'House of Fraser really long title which should overflow',
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
        return <div>{this.data.map(item => <ListItem data={item} />)}</div>
    }
}
