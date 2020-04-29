import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd'
import * as Types from '../constants/Types'

class Card extends Component {
    render() {
        const { connectDragSource, connectDropTarget } = this.props
        return connectDragSource(
            connectDropTarget(
                <li className="col-xs-12">
                    { this.props.children }
                </li>
            )
        )
    }
}

// Drag and drop

const dragNDropSrc = {
    beginDrag(props) {
        return { id: props.id }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
})

const collectTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
})

const cardHoverTarget = {
    hover(props, monitor) {
        const { id } = props
        const monitorProps = monitor.getItem()
        const monitorId = monitorProps.id

        if (monitorId !== id) {
            props.moveCard(id, monitorId)
        }
    }
}

export default DragSource(Types.CARD, dragNDropSrc, collect)(
    DropTarget(Types.CARD, cardHoverTarget, collectTarget)(Card)
)
