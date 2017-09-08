import { h, Component } from 'preact'
import ListItem from '../../components/list-item'

export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            buttonsRevealedItem: '',
        }

        this.data = [
            {
                id: 'a1',
                spaceSymbol: '+',
                title:
                    'House of Fraser really long title which should overflow',
                url: 'https://www.houseoffraser.co.uk',
                urlTemplate: 'https://www.houseoffraser.co.uk/search/$',
            },
            {
                id: 'b1',
                spaceSymbol: '%20',
                title: 'Bing',
                url: 'https://bing.com',
                urlTemplate: 'https://bing.com/?s=$',
            },
            {
                id: 'c1',
                spaceSymbol: '+',
                title: 'Google',
                url: 'https://google.com',
                urlTemplate: 'https://google.com/search/?q=$',
            },
        ]
    }

    closeAllButtonRevealItems = () => {
        this.setState({
            buttonsRevealedItem: '',
        })
    }

    toggleRevealItem = id => {
        this.setState(prevState => {
            return {
                buttonsRevealedItem:
                    prevState.buttonsRevealedItem === id ? '' : id,
            }
        })
    }

    render() {
        const { buttonsRevealedItem } = this.state
        return (
            <div>
                {this.data.map(item => (
                    <ListItem
                        buttonsAreRevealed={buttonsRevealedItem === item.id}
                        closeAllButtonRevealItems={
                            this.closeAllButtonRevealItems
                        }
                        data={item}
                        toggleRevealItem={this.toggleRevealItem}
                    />
                ))}
            </div>
        )
    }
}
