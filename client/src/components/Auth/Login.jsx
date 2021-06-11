import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import styles from '../LandingPage/styles.module.css'
import { login } from '../../redux/actions/userActions';


const Login = () => {

    const dispatch = useDispatch()   

    const [input,setInput] = useState({
        email:"",
        password: ""
    })

     function handleChange(e){
         console.log(e)
         setInput({
             ...input,
             [e.target.id]: e.target.value
         })
     }

     function handleSubmit(e){
         e.preventDefault();
         console.log(input)
         dispatch(login(input)) 
     }

    return (
        <div className={styles.container}>
            <form action="" onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label  className={styles.labels} htmlFor="email">Email</label>
                <input 
                className={styles.loginInput} 
                type="email" 
                id="email" 
                onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
                <label  className={styles.labels} htmlFor="password">Contraseña</label>
                <input 
                className={styles.loginInput} 
                type="password" 
                id="password" 
                onChange={handleChange} />
            </div>
            <div>
                <button 
                type= "submit"
                className={styles.loginBtn}>Login</button>
            </div>
            </form>
            
        </div>
    );
}

export default Login;
