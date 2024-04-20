import styles from "./styles/Authentication.module.css";
import Image  from "next/image"
import activeIcon from "@/public/active-button.svg"
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";

export const Register = () => {
    const [user, setUser] = useState({});

    const recaptchaRef = useRef()

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Execute the reCAPTCHA when the form is submitted
    };
    const onReCAPTCHAChange = (captchaCode: any) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if(!captchaCode) {
        return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the 
    // alert
    alert(`Hey`);
    const recaptchaValue = recaptchaRef.current.getValue()

    alert(recaptchaValue)
    // Reset the reCAPTCHA so that it can be executed again if user 
    // submits another email.
    recaptchaRef.current.reset();
    }
    return(
        <div className={styles.authentication_wrapper}>
            <h1 style={{textAlign: "center"}}>Sign up</h1>
            <form id="registerForm" onSubmit={handleSubmit} method="post">
            <div className={styles.input_wrapper}>
                <label htmlFor="username">Username:</label>
                <input className={styles.input_field} id="username" aria-required="true" placeholder="Name"/>
            </div>
            <div className={styles.input_wrapper}>
                <label htmlFor="email">E-mail:</label>
                <input className={styles.input_field} id="email" aria-required="true" placeholder="mailadress@e-mail.com" />
            </div>
            <div className={styles.input_wrapper}>
                <label htmlFor="password">Password:</label>
                <input className={styles.input_field} id="password" aria-required="true" placeholder="Password"/>
            </div>
            <div className={styles.input_wrapper}>
                <label>Confirm password:</label>
                <input className={styles.input_field} aria-required="true" placeholder="Confirm Password" />
            </div>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHAChange}
            />
            <button type="submit" className={styles.button_auth}><Image src={activeIcon} className={styles.button_part_4} alt="icon"/>Register</button>
             <p>
                Already have an account?
                <a href={"/login"} className={styles.link}>Log in</a>
             </p>
        </form>
        </div>
    )
}
