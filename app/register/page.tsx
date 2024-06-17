"use client";

import styles from "@/components/styles/Authentication.module.css"
import Image  from "next/image"
import activeIcon from "@/public/active-button.svg"
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaRegCircle } from "react-icons/fa";

export default function RegisterPage(){
    const [error, setError] = useState("")
    const router = useRouter();
    const [captchaCode, setCaptchaCode] = useState();
    const recaptchaRef = useRef<any>()

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }
    const checkPassword = (password: string) => {
        if(password.length <= 8 || !/\d/.test(password)){
            return false;
        }
        return true;
    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // Additional check whether captcha is confirmed
        if(!captchaCode){
            setError("You have to confirm ReCAPTCHA!");
            return;
        }
        const nickname = event.target[0].value || "User";
        const email = event.target[1].value;
        const password = event.target[2].value;
        const confirmPassword = event.target[3].value
        if(!email || !password){
            setError("All fields must be filled");
            return;
        }
        if(password !== confirmPassword){
            setError("Passwords are not the same!");
            return;
        }
        if(!checkPassword(password)){
            setError("Password is not valid");
            return;
        }
        if(!isValidEmail(email)){
            setError("Email is not valid")
            return;
        }
        // Should rewrite the next code
        // ! MAKE AN UTIL FUNCTION FOR REGISTRATION !
        try{
            const res = await fetch("http://127.0.0.1:3001/api/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: nickname,
                    email,
                    password,
                })
            });
            if(res.status === 400){
                setError("This email is already registered")
            }
            if(res.status === 200){
                setError("");
                router.push("/login");
            }
        }catch(error){
            setError("Error, try again")
            console.log(error)
        }
        recaptchaRef.current.reset();
        setCaptchaCode(undefined);
    };
    const onReCAPTCHAChange = (captchaCode: any) => {
        if(!captchaCode) {
            return;
        }
        const recaptchaValue = recaptchaRef.current.getValue()
        setCaptchaCode(recaptchaValue)
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
                <input type="password" className={styles.input_field} id="password" aria-required="true" placeholder="Password"/>
            </div>
            <div className={styles.input_wrapper}>
                <label>Confirm password:</label>
                <input type="password" className={styles.input_field} aria-required="true" placeholder="Confirm Password" />
            </div>
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={onReCAPTCHAChange}
            />
            <button type="submit" className={styles.button_auth}><FaRegCircle style={{fontSize: "1rem", position:"relative",top:"1px"}}/>  Register</button>
            <p style={{color:"red"}}>{error && error}</p>
             <p>
                Already have an account?
                <Link href={"/login"} className={styles.link}>Log in</Link>
             </p>
        </form>
        </div>
    )
}
