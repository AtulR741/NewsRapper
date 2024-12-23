import React, {Component} from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {keyword: ''};
    }
    handleChange = (e) => {
        this.setState({keyword: e.target.value})
    }
    render() {
        let refresh = this.props.refresh;
        let changeCategory = this.props.changeCategory;
        let search = () => {
            let temp = this.state.keyword;
            this.setState({keyword: ''});
            return this.props.search(temp);
        }
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <img src = 'logo.gif' alt = '' style = {{width: '5vw', height : '8vh'}}></img>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" onClick={refresh} to='/'>Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" onClick={() => changeCategory('general')} to='/GENERAL'>General</Link></li>
                            <li><Link className="dropdown-item" onClick={() => changeCategory('business')} to='/BUSINESS'>Business</Link></li>
                            <li><Link className="dropdown-item" onClick={() => changeCategory('entertainment')} to='/ENTERTAINMENT' href='/'>Entertainment</Link></li>
                            <li><Link className="dropdown-item" onClick={() => changeCategory('sports')} to='/SPORTS'>Sports</Link></li>
                            <li><Link className="dropdown-item" onClick={() => changeCategory('health')} to='/HEALTH'>Health</Link></li>
                            <li><Link className="dropdown-item" onClick={() => changeCategory('science')} to='/SCIENCE'>Science</Link></li>
                            <li><Link className="dropdown-item" onClick={() => changeCategory('technology')} to='/TECHNOLOGY'>Technology</Link></li>
                        </ul>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to='/About'>About</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Celeb, Cricket..." aria-label="Search" value={this.state.keyword} onChange={this.handleChange}/>
                        <Link to={`/${this.state.keyword}`}>
                            <button className="btn btn-outline-warning" type="submit" onClick={search}>Search</button>
                        </Link>
                    </form>
                    </div>
                </div>
            </nav>
        );
    }
}