import styles from "./styles/Authentication.module.css";
import Image  from "next/image"
import activeIcon from "@/public/active-button.svg"
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import User from "@/app/models/User"
import {connect} from "@/app/utils/db"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const {nickname, email, password} = await request.json();

    await connect();

    const existingUser = await User.findOne({email});

    if(existingUser){
        return new NextResponse(
            "Email is already used",
            {status: 400},
        );
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        nickname: nickname,
        email: email,
        password: hashedPassword,
    })

    try{
        await newUser.save();
        return new NextResponse(
            "User has been created!",
            {status: 200},
        );
    }catch(error: any){
        return new NextResponse(error, {
            status: 500,
        });
    }
}

export const Register = () => {
    const [user, setUser] = useState({});
    const [captchaCode, setCaptchaCode] = useState();

    const recaptchaRef = useRef()

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(event)
        if(!captchaCode){
            alert("You have to confirm ReCAPTCHA!");
            return;
        }
        if(event.target[2].value != event.target[3].value){
            alert("Passwords are not the same!");
            return;
        }
        const nickname = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        alert(nickname + email + password)
        recaptchaRef.current.reset();
        setCaptchaCode(undefined);
    };
    const onReCAPTCHAChange = (captchaCode: any) => {
    if(!captchaCode) {
        return;
    }
    const recaptchaValue = recaptchaRef.current.getValue()
    setCaptchaCode(recaptchaValue)
    alert(recaptchaValue)
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
