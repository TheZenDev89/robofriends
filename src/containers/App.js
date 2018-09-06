import React, { Component } from 'react';
import './App.css';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';

class App extends Component {
    constructor () {
        super () //must use super() after constructor
        this.state = { //this.state is referring to the state of the app
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount () {
        fetch('https://jsonplaceholder.typicode.com/users') //fetch data from the API
            .then(response => response.json()) //convert fetch() data to json
            .then(users => this.setState({ robots: users })) //updating users with setState and convert to a JavaScript object to use
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render () {
        //this.state is referring to the state of the app
        //the line below is because we used this.state a lot in the lines that follow it
        const { robots, searchfield } = this.state; 
        const filteredRobots = robots.filter(robot => { 
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots = {filteredRobots}/>
                </Scroll>
            </div>
        );
    }
}

export default App;