import React, { Component } from 'react'

export default class Comments extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        }
    }

    componentDidMount () {
        
    };

    render() {
        const items = this.state.items;
        if (this.state.error){
            return <p> Error {this.state.error.message} </p>
        } else if (!this.state.isLoaded) {
            return <p> Loading... </p>
        } else {
            return (
                <div></div>
            )
        }
    }
}
