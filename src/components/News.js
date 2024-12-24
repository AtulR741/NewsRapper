import React, { Component } from "react"
import NewsItem from "./NewsItem.js"
import Spinner from "./Spinner.js";

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 0,
            pageSize: 8,
            totalArticles: 0,
            category: 'default',
            loading: true
        };
    }

    async componentDidMount() {
        let url = `${this.props.state.finalUrl}&page=1&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({articles : parseData.articles, page : 1, totalArticles : parseData.totalResults, loading : false});
    }

    handleNext = async () => {
        let url = `${this.props.state.finalUrl}&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({articles : parseData.articles, page : this.state.page + 1, totalArticles : parseData.totalResults, loading : false});
    }

    handlePrev = async () => {
        let url = `${this.props.state.finalUrl}&page=${this.state.page - 1}&pageSize=${this.state.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({articles : parseData.articles, page : this.state.page - 1, totalArticles : parseData.totalResults, loading : false});
    }

    render() {
        return (
            this.state.loading ? <Spinner /> :
            this.state.totalArticles ?
            <div className="container">
                <h1 className="my-5" style={{ textAlign: 'center' }}>{this.props.state.header}</h1>
                <div className="container my-3">
                    <div className='row my-3'>
                        {this.state.articles.map((element) => {
                            return (
                                <div key = {element.url} className="col">
                                    <NewsItem title = {element.title} description = {element.description} imgUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} time = {element.publishedAt} source = {element.source.name} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mx-3 my-3" onClick={this.handlePrev}>&larr; Prev</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalArticles/this.state.pageSize)} type="button" className="btn btn-dark mx-3 my-3" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
            :
            <h1 className="my-5" style={{ textAlign: 'center' }}>Nothing to show</h1>
        );
    }
}