import { h, Component } from 'preact'
import ListItem from '../../components/list-item'
import { transitions } from '../../utils/config'

export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            buttonsRevealedItem: '',
            data: [
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
            ],
            itemBeingDeleted: null,
            lastDeletedData: null,
        }
    }

    /**
     * Close any items that are slid open
     *
     * @memberOf Home
     */
    closeAllButtonRevealItems = () => {
        this.setState({
            buttonsRevealedItem: '',
        })
    }

    /**
     * Delete an item from data
     *
     * @param {string} id ID of data to delete
     * @memberOf Home
     */
    deleteItem = id => {
        // Check if item with id is in this.state.data
        this.state.data.find((o, i) => {
            if (o.id === id) {
                // Set `itemBeingDeleted` state to begin animation
                this.setState({ itemBeingDeleted: o.id }, () => {
                    window.setTimeout(() => {
                        this.setState(prevState => {
                            return {
                                data: [
                                    ...prevState.data.slice(0, i),
                                    ...prevState.data.slice(i + 1),
                                ],
                                itemBeingDeleted: null,
                                lastDeletedData: prevState.data[i],
                            }
                        })
                    }, transitions.itemBeingDeletedMs)
                })
                return true
            }
        })
    }

    /**
     * Toggle the sliding of items to reveal
     * buttons underneath
     *
     * @param {string} id ID of the item
     * @memberOf Home
     */
    toggleRevealItem = id => {
        this.setState(prevState => {
            return {
                buttonsRevealedItem:
                    prevState.buttonsRevealedItem === id ? '' : id,
            }
        })
    }

    render() {
        const { buttonsRevealedItem, data, itemBeingDeleted } = this.state
        return (
            <div>
                {data.map(item => (
                    <ListItem
                        buttonsAreRevealed={buttonsRevealedItem === item.id}
                        closeAllButtonRevealItems={
                            this.closeAllButtonRevealItems
                        }
                        data={item}
                        deleteItem={this.deleteItem}
                        itemBeingDeleted={itemBeingDeleted}
                        toggleRevealItem={this.toggleRevealItem}
                    />
                ))}
            </div>
        )
    }
}
