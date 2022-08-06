import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import IconUpload from "./front";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <IconUpload/>
    </div>
  )
}

export default Home
