import leaf from '../../../assets/logo.png'
import style from '../styles.module.css'

export const Header = (props) => {
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <img src={leaf} alt="not found" className='leaf' />
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>

                <a
                  href='/index'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Comenzar 
                </a>{' '}
                <br/>
                <a
                  
                  href='#about'
                  
                >
                  <img className='arrowAdded' alt="not found" src='https://www.vivesmart.com/wp-content/uploads/2019/03/white-down-arrow-png-2.png'/>
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
