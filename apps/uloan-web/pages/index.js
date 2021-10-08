import Head from 'next/head'
import Image from 'next/image'
import { Result } from 'postcss'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import styles from '../styles/Home.module.css'
import requests from "../utils/requests"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

    {/* Header */}
      <Header> 
        
      </Header>
    {/* Nav */}
    
      <Nav />
  
    {/* Results */}
     <Results />
    </div>
  )
  // export async function getServerSideProps(context) {
  //   const genre = context.query.genre;
  // }
}
