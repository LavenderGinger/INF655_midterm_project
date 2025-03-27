import React from 'react';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Someone",
            profession: "Developer",
            luckyNumber: this.generateLuckyNumber()
        };
    }

    generateLuckyNumber = () => {
        return Math.floor(Math.random() * 100) + 1;
    }

    updateLuckyNumber = () => {
        this.setState({
            luckyNumber: this.generateLuckyNumber()
        });
    }

    render() {
        return (
            <div>
                <h2>Name: {this.state.name}</h2>
                <h2>Profession: {this.state.profession}</h2>
                <h2>Your lucky number is: {this.state.luckyNumber}</h2>
                <button onClick={this.updateLuckyNumber}>Generate New Lucky Number</button>
            </div>
        );
    }
}

export default UserInfo;