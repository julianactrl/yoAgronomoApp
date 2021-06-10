import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {getNews} from '../../redux/actions/newsActions';

const News = (props) => {
    const [data, setData] = useState([])
    useEffect(async() => {
        await props.getNews();
        console.log(props)
        const apiCall = async () => {
            const res = await axios.get(`https://api.jornalia.net/api/v1/articles?apiKey=8f5940ae3f7b44dfa1e52380c040e406&search=campo+agroindustria+agronomia&providers=Clarin%2CPagina12%2CLaNacion%2CCronista%2CInfobae&categories=POLITICA%2CECONOMIA&startDate=2021-06-02&endDate=2021-06-09`)
            setData(res.data)
        }
        apiCall();
    },[])
    console.log(props)
    console.log(data)
    return (
        <div>
            <h3>News: </h3>
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