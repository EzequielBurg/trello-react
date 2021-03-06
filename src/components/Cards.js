import React, { Component } from 'react';
import Card from './Card'
import InputEditable from './InputEditable'

class Cards extends Component {
    render() {
        const cards = this.props.cards.map(card => (
            <Card key = { card.id } id={ card.id } moveCard={ this.props.moveCard }>
                <InputEditable
                    id={ card.id }
                    edit={ card.edit }
                    text={ card.text }
                    clickToEdit={ this.props.clickToEdit }
                    editComponent={ this.props.editComponent }
                    deleteComponent={ this.props.deleteComponent }
                />
            </Card>
        ))
        
        return (
            <ul>
                { cards }
            </ul>
        )
    }
}

export default Cards