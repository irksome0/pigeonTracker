
import styles from "./page.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {

  return (
    <div className={styles.index_wrapper}>
      <h1 style={{textAlign: "center"}}>Hi there!</h1>
      <p className={styles.index_wrapper_p}>
            Welcome to PigeonTracker, the ultimate website for pigeon enthusiasts!<br />
            PigeonTracker is a platform where you can notate pigeons by numbers and connect with their parents as well!<br />
            We also provide saving all of your notations as a relative table in pdf format!
      </p>
      <a className={styles.button_auth} href={"/register"}><FaArrowRightLong style={{position:"relative",top:"2px"}}/>  Try it now</a>
    </div>
  );
}
