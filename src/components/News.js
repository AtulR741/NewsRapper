import React, { Component } from "react"
import NewsItem from "./NewsItem.js"
import Spinner from "./Spinner.js";
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 0,
            pageSize: 8,
            totalArticles: 0,
        };
    }

    request = async () => {
        this.setState({page: this.state.page + 1});
        let url = `${this.props.state.finalUrl}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({articles: this.state.articles.concat(parseData.articles), totalArticles: parseData.totalResults});
    }

    componentDidMount() {
        this.request();
    }

    render() {
        return (
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.request}
                hasMore={this.state.articles.length < this.state.totalArticles}
                loader={<Spinner />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    <b>No more results :P</b>
                    </p>
                }>
                <div className="container">
                    <h1 className="my-5" style={{ textAlign: 'center' }}>{this.props.state.header}</h1>
                    <div className="container my-3">
                        <div className='row my-3'>
                            {this.state.articles.map((element, index) => {
                                return (
                                    <div key = {index} className="col">
                                        <NewsItem title = {element.title} description = {element.description} imgUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} time = {element.publishedAt} source = {element.source.name} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </InfiniteScroll>
        );
    }
}