import React, { Component } from 'react';
import axios from 'axios';
import './Gists.css';
import GistDetails from './GistDetails';

export default class Gists extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: '',
            gists: {},
            isLoading: true
        };
    }

    componentWillMount() {
        Promise.all([
            axios.get(`https://api.github.com/users/${this.props.query}?client_id=87a39bc4869b746710ec&client_secret=acc5bac9506deb38c10c61e70e83c0eef7be7067`),
            axios.get(`https://api.github.com/users/${this.props.query}/gists?per_page=100&client_id=87a39bc4869b746710ec&client_secret=acc5bac9506deb38c10c61e70e83c0eef7be7067`)
        ])
            .then(([userResponse, gistsResponse]) => {
                this.setState({user: userResponse.data, gists: gistsResponse.data, isLoading: false});
            })
            .catch(error => {
                console.log('Error fetching user gists', error);
            });
    }

    render(){
        return (
            <div className="gists">
                {this.state.user.type !== undefined &&
                <div>
                    <div className="gists__user">
                        <h2>{this.state.user.name} Gists</h2>
                        <a href={this.state.user.html_url} target="_blank">
                            <img className="gists__avatar" src={this.state.user.avatar_url} />
                        </a>
                    </div>
                    <div>
                        {this.state.gists &&
                        this.state.gists.map(gist => {
                            return (
                                <div key={gist.id}>
                                    <h3>
                                        <a href={this.state.user.html_url}>
                                            {this.state.user.name}
                                        </a>
                                        &nbsp;/&nbsp;
                                        <a href={gist.url}>
                                            {gist.id}
                                        </a>
                                    </h3>
                                    <GistDetails id={gist.id} />
                                    <hr/>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                }

                {this.state.isLoading &&
                    <div className="loader">Loading user's gists ...</div>
                }
            </div>
        )
    }
}