export function sliderController (verify, id){
    return(
        <div className={styles.slider}>
            <div className={styles.contenedorHeader}>
                <input onChange={(e)=>{e.target.value.length<=15&&setEdit(e.target.value)}} className={auxState?styles.inputName:styles.none} type="text" value={edit}/>
                <button className={auxState?styles.inputNameBtn:styles.none} type='submit' onClick={handleEdit}>Editar</button>
                <h1 className={!auxState?styles.name:styles.none}>{edit}</h1> 
                <div className={styles.contLogoDelEdit}>
                    <img onClick={deleteLote} src={logoDelete} alt="" className={styles.deleteLogo}/>
                    <img onClick={()=>{setAuxState(true)}}src={logoEdit} alt="" className={styles.editLogo} />
                </div> 
            </div>
            <Slider className={?null:styles.none} {...settings} >
                <img
                    src={`${REACT_APP_API}/lote/image/${id}`}
                    alt="https://i.stack.imgur.com/y9DpT.jpg"
                    className={styles.img}
                />
                <img className={styles.imgLogo} src={grass} alt="" />
            </Slider>
            <Slider  className={image!==''?null:styles.none} {...settings} >
                <img
                    src={`${REACT_APP_API}/lote/imagen/${lote.imagen}`}
                    alt="https://i.stack.imgur.com/y9DpT.jpg"
                    className={styles.img}
                />
                <img className={styles.imgLogo} src={grass} alt="" />
            </Slider>
        </div>
    )
}