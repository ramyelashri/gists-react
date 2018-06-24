import React, { Component } from 'react';
import axios from 'axios';

class GistCard extends Component {

    constructor(props){
        super(props)
        this.state = {forks: []}
    }

    getForks = (id) => {
        Promise.all([
            axios.get(`https://api.github.com/gists/${id}`)
        ])
            .then((response) => {
                this.setState({forks: response.data});
            })
            .catch(error => {
                console.log('Error fetching gist forks', error);
            });
    };

    render(){
        return (
            <div>
                { this.props.user.type !== undefined &&
                <div className="user-info">
                    <div className="left-column">
                        <a href={this.props.user.html_url} target="_blank">
                            <img className="user-avatar"
                                 src={this.props.user.avatar_url}
                                 alt={`${this.props.user.name}'`}
                            />
                        </a>
                        <p className="user-name">
                            <a href={this.props.user.html_url} target="_blank">{this.props.user.name}</a>
                        </p>
                    </div>
                    {this.props.gists &&
                    this.props.gists.map(gist => {
                        return (
                            <li key={gist.id}>
                                <div>
                                    "url": {gist.url}
                                </div>
                                <div>
                                    "forks_url": <a href={gist.forks_url} target="_blank">{gist.forks_url}</a>
                                </div>,
                                <div>
                                    "commits_url": {gist.commits_url}
                                </div>
                                <div>
                                    "description": {gist.description},
                                </div>
                                <div>
                                    "comments_url": {gist.comments_url}
                                </div>
                                <div>
                                    "git_pull_url": {gist.git_pull_url}
                                </div>
                                <div>
                                    "created_at": {gist.created_at}
                                </div>
                                <div>
                                    "updated_at": {gist.updated_at}
                                </div>
                                <div>
                                    forks: <a href="#" onClick={this.getForks}>Show forms ..</a>
                                </div>
                                {this.state.forks.length &&
                                <div>
                                    {gist.forks.slice(-3).forEach((fork, index, forks) => {
                                        {fork.user.login}
                                        {index === forks.length - 1 ? ', ' : ''}
                                    })}
                                </div>
                                }
                                {!this.state.length &&
                                <div>
                                    forked by: no forks found
                                </div>
                                }
                            </li>
                        )
                    })
                    }

                </div>
                }
            </div>
        )
    }
}



export default GistCard;