import { useEffect } from 'react';
import styles from './styles.module.css'
import add from '../../assets/añadir.png';

import LoteCardCreate from './LoteCardCreate';




//Recibe todos los lotes el componente LoteCard y Slider con su settings 
export function renderizarLotes(allLotes,LoteCard, Slider, settings) {
    return (
        <Slider {...settings}>
                    {
                        allLotes.map((lote, index) => {
                           if(index % 3 == 0 && index != 0) {
                                return (
                                    <div className={styles.contenedorData}>
                                        <div className={styles.contenedorCards}>
                                            <LoteCard lote={allLotes[index]} />
                                            {allLotes[index + 1] && <LoteCard lote={allLotes[index + 1]}/>}
                                            {allLotes[index + 2] && <LoteCard lote={allLotes[index + 2]}/>}
                                            {allLotes[index + 3] && <LoteCard lote={allLotes[index + 3]}/>} 
                                        </div>
                                    </div>
                                    )
                           }else if(index == 0){
                               return (
                                <div className={styles.contenedorData}>
                                    <div className={styles.contenedorCards}>
                                        <LoteCardCreate />
                                        <LoteCard lote={allLotes[index]} />
                                        {allLotes[index + 1] && <LoteCard lote={allLotes[index + 1]}/>}
                                        {allLotes[index + 2] && <LoteCard lote={allLotes[index + 2]}/>} 
                                    </div>                            
                                </div>
                                )
                           }
                        })
                    }

                        {!allLotes[0] && <div className={styles.contenedorData}>
                        <div className={styles.contenedorCards}>
                            <LoteCardCreate />
                        </div>                            
                        </div>}
                </Slider>

    )

}
export function renderizarLotesCelular(allLotes,LoteCard, Slider, settings) {
    return (
        <Slider {...settings} className={styles.sliderCelular}>
            <div  className={styles.divContAdd}>
               <LoteCardCreate/> 
            </div>
            
            {
                allLotes.map((lote, index) => {
                    return (
                        <div className={styles.contenedorCardsCelular}>
                            <LoteCard lote={lote} />
                        </div>
                    )
                })
            }
        </Slider>
    )
}