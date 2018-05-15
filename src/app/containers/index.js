import React from 'react';
import PropType from 'prop-types';
import Header from '../components/intuit.header';
import Post from "../components/intuit.post";
import '../styles/intuit.container.scss';

class MicroBloggerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            input: '',
            textArea: '',
            display: false,
            errorMessage: '',
            btnDisabled: true,
            message: ''  
        }
    }

    componentDidMount() {
        this.loadPostsAPI();
        /*
         *https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1
         */
        const debounce = (fn, time) => {
            let timeout;
            return function () {
                const functionCall = () => fn.apply(this, arguments);
                clearTimeout(timeout);
                timeout = setTimeout(functionCall, time);
            }
        };

        this.refs.iScroll.addEventListener("scroll", debounce((e) => {
            if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight) {
                this.loadPostsAPI();
            }
        }, 500));
    }


    loadPostsAPI() {
        let url = 'https://jsonplaceholder.typicode.com/posts';
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState((prevState) => {
                    let records = prevState.items.concat(json);
                    return {
                        items: records
                    }
                });
            }).catch(error => {
                this.setState({
                    message: error.message
                });
            });
    }

    postDataAPI() {
        let url = 'https://jsonplaceholder.typicode.com/posts';
        var data = {
            "userId": this.state.input,
            "title": "Hard coded Title",
            "body": this.state.textArea
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            return response.json()
        }).catch(error => {
            this.setState({
                message: error.message
            });
        }).then(response => {
            this.setState((prevState) => {
                let records = prevState.items.concat(response);
                records.unshift(records.pop());
                return {
                    items: records
                }
            });
        });
    }

    launchCreateNewPost() {
        this.setState({
            display: true,
            errorMessage: '',
            input: '',
            textArea: '',
            btnDisabled: true
        });
    }

    submitPost(e) {
        this.setState({
            display: false
        });
        this.postDataAPI();
        setTimeout(function () {
            var container = document.getElementById('scrollable-container');
            container.scrollTop = 0;
        }, 1000);
        e.preventDefault();
    }

    cancel(e) {
        this.setState({
            display: false
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
            [target.name]: value
        });

        if (target.type === 'text') {
            if (value.length < 10 || value.length > 140) {
                this.setState({
                    errorMessage: "Try Entering characters between 10 & 140",
                    btnDisabled: true
                })
            } else {
                this.setState({
                    errorMessage: '',
                    btnDisabled: false
                })
            }
        }
    }

    render() {
        return (
            <div className="microblogger-wrapper">
                <div className={!this.state.display ? "microblogger-container" : "hide-container"}>
                <div className="message fa fa-warning"> {this.state.message}</div>
                    <Header clicker={() => this.launchCreateNewPost()} />
                    <div ref="iScroll" id="scrollable-container" className="scrollable-container">
                        {this.state.items.map((item, index) => (
                            <Post key={index} title={item.title} message={item.body} userid={item.userId} />
                        ))}
                    </div>
                </div>
                <div className={this.state.display ? "form-container" : "hide-container"}>
                    <Header showButton="none" />
                    <div className="header-text"> Create a Post </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="username">
                            <label htmlFor="userInput">UserName:</label>
                            <input type="text" name="input" id="userInput" value={this.state.input} placeholder="Enter Username" onChange={(e) => this.handleChange(e)} />
                            <span className="error-text"> {this.state.errorMessage} </span>
                        </div>
                        <div className="content">
                            <label htmlFor="textArea"> Content: </label>
                            <textarea id={"textArea"} name="textArea" value={this.state.textArea} onChange={(e) => this.handleChange(e)} />
                        </div>
                        <div>
                            <button onClick={(e) => this.submitPost(e)} disabled={this.state.btnDisabled}> Submit </button>
                            <button onClick={(e) => this.cancel(e)} > Cancel </button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default MicroBloggerContainer