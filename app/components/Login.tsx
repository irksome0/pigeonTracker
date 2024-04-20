import Image from "next/image"
import styles from "./styles/Authentication.module.css"
import activeIcon from "@/public/active-button.svg"
export const Login = () => {
    return(
        <div className={styles.authentication_wrapper}>
            <h1 style={{textAlign: "center"}}>Sign in</h1>
            <form id="account" method="post">
                <div className={styles.input_wrapper}>
                    <label htmlFor="email" className={styles.label}>E-mail:</label>
                    <input id="email" className={styles.input_field} aria-required="true" placeholder="mailadress@e-mail.com" />
                </div>
                <div className={styles.input_wrapper}>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input id="password" className={styles.input_field} aria-required="true" placeholder="Password_123!#$%"/>
                </div>
            <button id="login-submit" type="submit" className={styles.button_auth}><Image src={activeIcon} className={styles.button_part_4} alt="icon"/>Log in</button>
                 <p>
                     Don&apos;t have an account?
                     <a href={"/register"} className={styles.link}>Sign up</a>
                 </p>
            </form>
        </div>
    )
}