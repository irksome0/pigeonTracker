"use client";

import Image from "next/image";
import styles from "@/components/styles/Authentication.module.css";
import activeIcon from "@/public/active-button.svg";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function Login(){
    const recaptchaRef = useRef();
    const router = useRouter();
    const [captchaCode, setCaptchaCode] = useState();
    const [error, setError] = useState("");
    const session = useSession();

    useEffect(()=>{
        if(session?.status === "authenticated"){
            router.replace("/menu");
        }
    }, [session, router])

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if(!captchaCode){
            setError("You have to confirm ReCAPTCHA!");
            return;
        }
        const email = event.target[0].value;
        const password = event.target[1].value;
        if(!email || !password){
            setError("All fields must be filled");
            return;
        }
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        })
        if(res?.error) {
            setError("Invalid email or password")
            if(res?.url){
                router.replace("/menu");
            }
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
            <h1 style={{textAlign: "center"}}>Sign in</h1>
            <form id="account" onSubmit={handleSubmit}>
                <div className={styles.input_wrapper}>
                    <label htmlFor="email" className={styles.label}>E-mail:</label>
                    <input id="email" className={styles.input_field} aria-required="true" placeholder="mailadress@e-mail.com" />
                </div>
                <div className={styles.input_wrapper}>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input id="password" type="password" className={styles.input_field} aria-required="true" placeholder="Password_123!#$%"/>
                </div>
                <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHAChange}
            />
                <button id="login-submit" type="submit" className={styles.button_auth}><Image src={activeIcon} className={styles.button_part_4} alt="icon"/>Log in</button>
                <p style={{color:"red"}}>{error && error}</p>
                 <p>
                     Don&apos;t have an account?
                     <Link href={"/register"} className={styles.link}>Sign up</Link>
                 </p>
            </form>
        </div>
    )
}