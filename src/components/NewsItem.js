import React, {Component} from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description, imgUrl, newsUrl, author, time, source} = this.props;
        let curr = new Date(), date = new Date(time);
        let diff = (curr - date)/60000, showTime, isNew = true;
        if(diff < 1)
            showTime = 'Just Now';
        else if(diff < 60)
            showTime = `${Math.floor(diff)} min ago`;
        else if(diff/60 < 24)
            showTime = `${Math.floor(diff/60)} hr ago`;
        else if(diff/(60*24) < 7) {
            showTime = `${Math.floor(diff/(60*24))}d ago`;
            isNew = false;
        }
        else {
            showTime = date.toGMTString();
            isNew = false;
        }
        return (
            <div className="card my-3" style={{height : '32rem', width: '18rem'}}>
                 <span className="position-absolute top-0 translate-middle badge rounded-pill" style={{zIndex: 10, backgroundColor: 'rgb(243, 203, 8)', left: '80%'}}>{source}</span>
                <img src = {imgUrl ? imgUrl : 'icon.png'} className="card-img-top" alt="error" />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title ? (title.slice(0, 100) + (title.length <= 100 ? '' : '...')) : ''}</h5>
                    <p className="card-text">{description ? (description.slice(0, 80) + (description.length <= 80 ? '' : '...')) : ''}</p>
                    <div className='mt-auto'>
                        <a href={newsUrl} target = '_blank' className="btn btn-warning">Read More</a>
                        <p className="card-text"><small className="text-body-secondary"><b>Author</b> : <i>{author}<br />{showTime}   </i></small>{isNew && <span className="badge rounded-pill text-bg-dark">New</span>}</p>
                    </div>
                </div>
            </div>
        );
    }
}