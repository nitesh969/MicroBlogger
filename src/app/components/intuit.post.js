import React from 'react';
import PropType from 'prop-types';
import '../styles/intuit.post.scss';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="post-container">
                <span className="post-userId"> {this.props.userid} - </span>
                <span className="post-title"> {this.props.title} </span>
                <div className="post-message"> {this.props.message} </div>
            </div>
        )
    }
}

Post.PropType = {
    userid: PropType.string.isRequired,
    title: PropType.string.isRequired,
    message: PropType.string.isRequired
}

export default Post