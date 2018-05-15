import React from 'react';
import PropType from 'prop-types';
import '../styles/intuit.header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerText: "Microblogger",
            buttonText: "post"
        }
    }

    render() {
        return (
            <div className="header-container">
                <div className="header-label-text"> {this.state.headerText} </div>
                <button
                    className="header-button-text"
                    onClick= {()=>this.props.clicker()}
                    style={{ display: this.props.showButton }}> {this.state.buttonText}
                </button>
            </div>
        )
    }
}

Header.PropType = {
    showButton: PropType.string,
    clicker: PropType.func
}

export default Header