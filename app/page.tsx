
import Image from "next/image";
import styles from "./page.module.css";
import tryIcon from "../public/try-button-element.svg"

export default function Home() {

  return (
    <div className={styles.index_wrapper}>
      <h1 style={{textAlign: "center"}}>Hi there!</h1>
      <p className={styles.index_wrapper_p}>
            Welcome to PigeonTracker, the ultimate website for pigeon enthusiasts!<br />
            PigeonTracker is a platform where you can notate pigeons by numbers and connect with their parents as well!<br />
            We also provide saving all of your notations as a relative table in pdf format!
      </p>
      <a className={styles.button_auth} href={"/register"}><Image src={tryIcon} className={styles.button_part_3} alt="icon"/>Try it now</a>
    </div>
  );
}
