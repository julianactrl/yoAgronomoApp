import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {getNews} from '../../redux/actions/newsActions';
import './News.css';

const News = (props) => {
    // const [, set] = useState(initialState)
    useEffect(async() => {
        await props.getNews();
        console.log(props)
    },[])
    console.log(props)
    return (
        <div>
            <h3>News</h3>
            <div className='articulo'>
                {props.news.articles && props.news.articles.map((a) => {
                    return(
                        <h1>
                            {a.title}
                        </h1>
                    )
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        news: state.newsReducer.news
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getNews: () => dispatch(getNews())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)