import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
// import { Link } from 'react-router-dom';
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
    const [actTopBar] = useState(false);
    const REACT_APP_NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY

    // const dispatch = useDispatch()
    // const news = useSelector(state => state.newsReducer.news)
    var settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        className: "center",
        centerMode: true,
        centerPadding: "0",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />

      };
      const Add0 = (fecha) => {
          if(fecha.toString().length < 2){
              fecha = '0' + fecha;
              return fecha
          } else return fecha
      }
      const sumarDias = (fecha, dias) => {
          if (dias) {
              fecha.setDate(fecha.getDate() + dias);
              return fecha;
          } else return fecha;
      }
      var newDate = new Date()
    //   var hola = sumarDias(newDate, -7)
      var endDate = sumarDias(newDate).toJSON().split('T');
      var startDate = sumarDias(newDate, -7).toJSON().split('T');
      
    useEffect(() => {
        const apicall = async() => {
            const res= await axios.get(`https://api.jornalia.net/api/v1/articles?apiKey=${REACT_APP_NEWS_API_KEY}&search=campo+agroindustria+agronomia+soja+exportacion&providers=Clarin%2CPagina12%2CLaNacion%2CCronista%2CDiarioPopular%2CTelam%2CTN%2CLaVozCB&categories=POLITICA%2CECONOMIA&startDate=${startDate[0]}&endDate=${endDate[0]}`)
            setData(res.data)
            console.log(data)
            // await dispatch(getNews())
            // console.log(data)
            if(props.news){
                setLoading(false)
            }
        }
        console.log(startDate[0])
        console.log(endDate[0])
        apicall()
    },[])
    // console.log(startDate)
    // console.log(endDate)
    // console.log(news)
    // console.log(loading)

    function SampleNextArrow(props) {
        const { style, onClick } = props;
        return (
          <div
            className='nextBtn'
            style={style}
            onClick={onClick}
          />
        );
      }
      function SamplePrevArrow(props) {
        const { style, onClick } = props;
        return (
          <div
          className='prevBtn'
            style={style}
            onClick={onClick}
          />
        );
      }
    return (
        <div className={actTopBar?'newsContainerAct':'newsContainer'}>
            <div className={actTopBar?'subContainer':'subContainerAct'}>
                {loading ? 
                <div className='containerLoading'>
                    <img src="https://media4.giphy.com/media/kHgUVJysYKJjzJf1XY/source.gif" alt="LoadingGif" className='loadingGif' /> 
                </div> 
                        :
                        <div className='carruselCont'>
                    <div className='containerDivArt'>
                        <Slider {...settings} className='slider'>
                            {data.articles.map((a) => {
                                // console.log(a.category)
                                return (
                                    <div className='cardNew'>
                                        <a href={a.sourceUrl} target='_blank' className='linkArt'>
                                            <div className='articlesContainer'>
                                                <div>
                                                    <h1 className='articleTitle'>{a.title}</h1>
                                                </div>
                                                <img src={a.imageUrl} alt="Image not found" className='imgArticle'/> 
                                            </div>
                                        </a> 
                                    </div>

                                )
                            })}
                        </Slider>
                    </div>
                    </div>
                }
            </div>
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
