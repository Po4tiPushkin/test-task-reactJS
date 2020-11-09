import React, { Component } from 'react'
import './Posts.css'

export default class Posts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            comments: [],
            postID: 1
        }
        this.previousPost = this.previousPost.bind(this);
        this.nextPost = this.nextPost.bind(this);
        this.getComments = this.getComments.bind(this);
    }

    previousPost() {
        if (this.state.postID > 1) { 
            this.setState(state => ({
                postID: state.postID - 1
            }));
        };
    };

    nextPost() {
        if (this.state.postID < this.state.items.length) {
            this.setState(state => ({
                postID: state.postID + 1
            })); 
        }; 
    };

    componentDidMount () {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
	    .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: true
                });
        });
        this.getComments(1);
    };

    componentDidUpdate() {
        this.getComments(this.state.postID);
    }


    getComments(postID) {
        fetch('https://jsonplaceholder.typicode.com/posts/' + postID.toString() + '/comments')
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    comments: result
                });
            }
        );
    };

    

    render() {
        const postID = this.state.postID;
        const item = this.state.items[postID-1];
        const comments = this.state.comments;
        if (this.state.error){
            return <p> Error {this.state.error.message} </p>
        } else if (!this.state.isLoaded) {
            return <p> Loading... </p>
        } else {
            return (
                <>
                    <div className="header">
                        <button className="previous" onClick={this.previousPost}>Прошлый пост</button> 
                        <h1 className="title">Пост №{postID}</h1>
                        <button className="next" onClick={this.nextPost}> Следующий пост</button>         
                    </div>
                    <div className="post">
                        <h2 className="post__title">
                            {item.title}
                        </h2>
                        <p className="post__body">
                            {item.body}
                        </p>
                    </div>
                    <div className="comments">
                        <h2 className="comments__header">
                            Комментарии:
                        </h2>
                        <ul className="comments__list">
                            {
                                comments.map(comment => (
                                    <li className="comments__item" key={comment.id}>
                                        <h3 className="comments__name">Имя: <span>{comment.name}</span></h3>
                                        <h3 className="comments__email">Эмайл: <span>{comment.email}</span></h3>
                                        <p className="comments__body">{comment.body}</p>
                                    </li>
                                ))
                            }                       
                        </ul>
                    </div>
                </>
            )
        }
    }
}
