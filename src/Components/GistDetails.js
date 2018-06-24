import React, { Component } from 'react';
import axios from 'axios';
import './GistDetails.css';

export default class GistDetails extends Component {

    constructor(props){
        super(props)
        this.state = {gist: []}
    }

    componentWillMount() {
        axios.get(`https://api.github.com/gists/${this.props.id}?client_id=87a39bc4869b746710ec&client_secret=acc5bac9506deb38c10c61e70e83c0eef7be7067`)
        .then((response) => {
            this.setState({gist: response.data});
            console.log(typeof this.state.gist.forks);
        })
        .catch(error => {
            console.log('Error fetching gist forks', error);
        });
    }

    render(){
        return (
            <div>
                {this.state.gist.files !== undefined &&
                <div className="gistDetails__files">
                    <h4>Gist files:</h4>
                    <div className="gistDetails__file">
                        {Object.keys(this.state.gist.files).map(fileName => {
                            return (
                                <div key={fileName}>
                                    <a target="_blank" href={this.state.gist.files[fileName].raw_url}>
                                        {fileName} <span
                                        className="gistDetails__tag">{this.state.gist.files[fileName].language}</span>
                                    </a>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                }


                {this.state.gist.forks !== undefined && this.state.gist.forks.length > 0 &&
                <div className="gistDetails__forks">
                    <h4>Last 3 forks:</h4>
                    {this.state.gist.forks.slice(-3).map(fork => {
                        return (
                            <div className="gistDetails__forker" key={fork.id}>
                                <a target="_blank" href={fork.user.url}>
                                    <img className="gistDetails__avatar" src={fork.user.avatar_url} alt={fork.user.login}/>
                                    {fork.user.login}
                                </a>
                            </div>
                        )
                    })}
                </div>
                }
                {this.state.gist.forks === undefined || this.state.gist.forks.length === 0 &&
                    <h4>Last 3 forks: 0</h4>
                }
            </div>
        )
    }
}