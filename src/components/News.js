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
            totalArticles: 0,
        };
    }

    fetchArticles = async () => {
        console.log(this.state.page);
        const url = `${this.props.state.finalUrl}&page=${this.state.page}`;
        const data = await fetch(url);
        const parseData = await data.json();
        this.setState((prevState) => ({
            articles: prevState.articles.concat(parseData.articles),
            totalArticles: parseData.totalResults
        }));
    };
    
    request = () => {
        let temp = this.state.page;
        this.setState({page: temp + 1});
    }
    
    componentDidMount() {
        this.request();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            await this.fetchArticles();
        }
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
                                    <div key={index} className="col">
                                        <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} source={element.source.name} />
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