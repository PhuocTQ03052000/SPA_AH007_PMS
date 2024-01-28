import React, { Component, useState } from 'react';
import config from "../../config.json";

const { SERVER_API } = config;
export class HeartRate extends Component {
    constructor(){
        super();
        this.state = {
            user: [],
            isLoading: true
        };
    }

    getUserHearRate = async () => {
        const response = await fetch(`${SERVER_API}/users/1`);
        if(response.ok){
            const user = await response.json();
            this.setState({
                user: user,
                isLoading: false,
            });
        }
    };

    componentDidMount = () => {
        this.getUserHearRate();
    };

    render(){
        const { user, isLoading } = this.state;
        return (
            <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div key={user.id}>{user.heart}</div>
                )}
            </div>
            );
    }
}

export default HeartRate;