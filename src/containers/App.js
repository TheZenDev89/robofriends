import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    constructor () {
        super () //must use super() after constructor
        this.state = { //this.state is referring to the state of the app
            robots: [],
        }
    }

    componentDidMount () {
        fetch('https://jsonplaceholder.typicode.com/users') //fetch data from the API
            .then(response => response.json()) //convert fetch() data to json
            .then(users => this.setState({ robots: users })) //updating users with setState and convert to a JavaScript object to use
    }

    render () {
        //this.state is referring to the state of the app
        //the line below is because we used this.state a lot in the lines that follow it
        const { robots } = this.state; 
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => { 
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots = {filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);