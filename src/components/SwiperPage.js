import React from 'react'
import '../styles/SwiperPage.css'
import Page from '../components/Page'

export default class SwiperPage extends React.Component {

    render (props) {
        const pageStyle = {
            backgroundColor: this.props.bgColor
        }
        return (
            <div 
                className={`${this.props.pageName} SwiperPage`}
                style={pageStyle}>
                <Page 
                    pageName={this.props.pageName}
                />
            </div>
        )
    }
};
