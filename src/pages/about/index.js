import React from "react";
import { Footer, Header } from "../../components";
import './about.css'


const About = () => {



    return (

        <div >
            <Header />
            <div className="about-co">
                <div className="about-wrapper">
                    <p className="about-title">Hallo, I'm Haris. A student from Indonesia.</p>
                    <p  className="about-dsc">I learned how to code from the Internet. Focusing on MERN-Stack (MongoDB, Express, React, Node). I love film, music, and anime. </p>
                    <p className="email-title">email:</p>
                    <p className="email-dsc">muhharris04@gamil.com</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About