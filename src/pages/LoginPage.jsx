import {useRef, useState, useEffect} from "react";
import styles from "../styles/LoginPage.module.css";

function LoginPage() {
    const userRef = useRef()
    const errorRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, []);

    useEffect(() => {
        setErrorMessage('')
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Form submitted')
        setEmail('')
        setPassword('')
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <p ref={errorRef} aria-live="assertive">{errorMessage}</p>
            <h1 className={styles.formTitle}>Tizimga kirish</h1>
            <br/>
            <div>
                <label htmlFor="email">E-mail manzil:</label>
                <input type="email"
                       id="email"
                       ref={userRef}
                       autoComplete="off"
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       required
                />
            </div>
            <div>
                <label htmlFor="password">Parol:</label>
                <input
                    type="password"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </div>
            <br/>
            <button className="p-4 border border-white rounded-[0.4rem]">Kirish</button>
        </form>
    )
}

export default LoginPage