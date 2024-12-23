import './App.css';
import React, {Component} from 'react'
import NavBar from './components/NavBar.js'
import News from './components/News.js'
import About from './components/About.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  constructor() {
    super();
    this.defaultUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=72d9b9487e0841369cd70d6d7486bb97';
    this.state = {finalUrl: this.defaultUrl, header: 'Recents', path: '/'};
  }
  refresh = () => {
    this.setState({finalUrl: this.defaultUrl,
                  header: 'Recents',
                  path: '/'
    });
  }
  changeCategory = (category) => {
    this.setState({finalUrl : `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=72d9b9487e0841369cd70d6d7486bb97`,
                  header : `${category.toUpperCase()}`,
                  path: `/${category.toUpperCase()}`});
  }
  search = (topic) => {
    this.setState({finalUrl : `https://newsapi.org/v2/everything?q=${topic}&apiKey=72d9b9487e0841369cd70d6d7486bb97`,
                  header : `Everything about '${topic}'`,
                path: `/${topic}`});
  }
  render() {
    return (
      <Router>
        <NavBar refresh = {this.refresh} changeCategory = {this.changeCategory} search = {this.search} />
        <Routes>
          <Route path = {this.state.path} element = {<News state = {this.state} />}></Route>
          <Route path = '/About' element = {<About about = 'https://www.dropbox.com/scl/fi/5iaqe4wbohtiiayvln3ua/About.png?rlkey=urs39e3n3ib41y23pwnwekago&st=neftd5sx&dl=0' />}></Route>
        </Routes>
      </Router>
    );
  }
}
