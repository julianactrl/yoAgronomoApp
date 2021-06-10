import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {getNews} from '../../redux/actions/newsActions';

const News = (props) => {
    // const [, set] = useState(initialState)
    useEffect(async() => {
        await props.getNews();
        console.log(props)
    },[])
    console.log(props)
    return (
        <div>
            <h3>News: NOTICIA 1 </h3>
            <h3>Noticia 2</h3>
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