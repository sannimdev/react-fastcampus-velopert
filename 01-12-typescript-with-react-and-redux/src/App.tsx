import React from 'react';
import logo from './logo.svg';
import './App.css';
import CounterContainer from './containers/CounterContainer';
import TodoApp from './containers/TodoApp';
import GithubProfileLoader from './containers/GithubProfileLoader';

function App() {
    return <GithubProfileLoader />;
}

export default App;
