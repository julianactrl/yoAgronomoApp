import React, { useState, useEffect } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {getNews} from '../../redux/actions/newsActions';
import './News.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from 'axios'

const News = (props) => {
    // const [, set] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    // const dispatch = useDispatch()
    // const news = useSelector(state => state.newsReducer.news)
    var settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        className: "center",
        centerMode: true,
        centerPadding: "0"
      };
      const Add0 = (fecha) => {
          if(fecha.toString().length < 2){
              fecha = '0' + fecha;
              return fecha
          } else return fecha
      }
      var newDate = new Date()
      var endDate = '' + newDate.getFullYear() + '-' + (Add0(newDate.getMonth() + 1))  + '-' + Add0(newDate.getDate())
      var startDate = '' + newDate.getFullYear() + '-' + (Add0(newDate.getMonth() + 1))  + '-' + (Add0(newDate.getDate() - 7))
    useEffect(() => {
        const apicall = async() => {
            const res= await axios.get(`https://api.jornalia.net/api/v1/articles?apiKey=1d9780ccf33747c28202188431c63fb7&search=campo+agroindustria+agronomia+soja+exportacion&providers=Clarin%2CPagina12%2CLaNacion%2CCronista%2CDiarioPopular%2CTelam%2CTN%2CLaVozCB%2CTiempoArgentino&categories=POLITICA%2CECONOMIA&startDate=${startDate}&endDate=${endDate}`)
            setData(res.data)
            // await dispatch(getNews())
            if(props.news){
                setLoading(false)
            }
        }
        apicall()
    },[])
    console.log(startDate)
    console.log(endDate)
    // console.log(news)
    console.log(loading)
    return (
        <div className='newsContainer'>
            <h1>News</h1>
                {loading ? 
                <div className='containerLoading'>
                    <img src="https://media4.giphy.com/media/kHgUVJysYKJjzJf1XY/source.gif" alt="LoadingGif" className='loadingGif' /> 
                </div> 
                        :
                    <div className='containerDivArt'>
                        <Slider {...settings}>
                            {data.articles.map((a) => {
                                console.log(a.category)
                                return (
                                    <a href={a.sourceUrl} target='_blank' className='linkArt'>
                                        <div className='articlesContainer'>
                                            <h1 className='articleTitle'>{a.title}</h1>
                                            <img src={a.imageUrl} alt="Image not found" className='imgArticle'/> 
                                        </div>
                                    </a> 
                                )
                            })}
                        </Slider>
                    </div>
                }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        news: state.newsReducer.news
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getNews: () => {
            dispatch(getNews())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(News);
