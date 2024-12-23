import React, {Component} from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description, imgUrl, newsUrl} = this.props;
        return (
            <div className="card my-3" style={{width: '18rem'}}>
                <img src = {imgUrl ? imgUrl : 'icon.png'} className="card-img-top" alt="error" />
                <div className="card-body">
                    <h5 className="card-title">{title ? (title.slice(0, 50) + (title.length <= 50 ? '' : '...')) : ''}</h5>
                    <p className="card-text">{description ? (description.slice(0, 80) + (description.length <= 80 ? '' : '...')) : ''}</p>
                    <a href={newsUrl} target = '_blank' className="btn btn-primary">Read More</a>
                </div>
            </div>
        );
    }
}