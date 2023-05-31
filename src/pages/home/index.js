import React from 'react';
import '../App.css';
import Intro from '../../components/intro';
import Content from '../../components/content';
import { Footer, Header } from '../../components';

const Home = () => {
  return (
    <>
      <Header/>
      <Intro />
      <Content />
      <Footer/>
      </>
  )
}

export default Home;