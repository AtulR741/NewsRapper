import React, {Component} from 'react'

export default class About extends Component {
    constructor(props) {
        super(props);
        this.source = this.props.about.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "");
    }
    render() {
        return (
            <div className='container my-5' style={{ textAlign: 'center' }}>
                <img src = {this.source} alt = 'about' style = {{height: '150vh', width: '100%'}}></img>
            </div>
        );
    }
}