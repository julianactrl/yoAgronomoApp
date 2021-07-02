import sele from './sele.jpeg'


export const Team = (props) => {
  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Equipo de trabajo</h2>
          <p>
            Trabajamos en esta web un grupo de nueve personas tanto en la parte del front como el back end.
          </p>
        </div>
        <div id='row'>
         <img src={sele}></img>
        </div>
      </div>
    </div>
  )
}
