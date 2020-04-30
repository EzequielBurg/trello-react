import React, { Component } from 'react';
import './Home.scss'
import Panels from '../components/Panels'
import { connect } from 'react-redux'
import PanelActions from '../actions/PanelActions'
import backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

class Home extends Component {
    constructor(props) {
        super(props)
        this.handleCreatePanel = this.handleCreatePanel.bind(this)
    }
    
    handleCreatePanel() {
        this.props.createPanel()
    }

    render() {
        const { panels } = this.props
        return(
            <>
                <DndProvider backend={ backend }>
                    <div className="col-xs-12">
                        <button className="btn btn panel-button" onClick={ this.handleCreatePanel }>
                            <i className="ion-plus-round">New Card</i>
                        </button>
                    </div>
                    <Panels
                        panels={ panels }
                        editPanel={ this.props.editPanel }
                        deletePanel={ this.props.deletePanel }
                        movePanel={ this.props.movePanel }
                    />
                </DndProvider>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        panels: state.panels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createPanel: () => dispatch(PanelActions.createPanel('New Panel')),
        editPanel: (id, value) => {
            const edited = { id }
            
            if (!value) {
                edited.edit = true
            } else {
                edited.edit = false
                edited.text = value
            }

            dispatch(PanelActions.editPanel(edited))
        },
        deletePanel: (id) => dispatch(PanelActions.deletePanel(id)),
        movePanel: (id, monitorId) => dispatch(PanelActions.move(id, monitorId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)