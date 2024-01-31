import React, { useEffect } from "react";
import "../assets/styles/home.scss";
import Parallax from "parallax-js";
import $ from "jquery";

const Home = () => {
  useEffect(() => {
    // Initialize Parallax on component mount
    const scene = document.getElementById("scene");
    const parallax = new Parallax(scene);

    // Remember to clean up Parallax on component unmount to avoid memory leaks
    return () => {
      parallax.destroy();
    };
  }, []);
  return (
    <div className="home">
      <section className="wrapper">
        <div className="container">
          <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2"></div>

            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <p className="p404" data-depth="0.50">
              Oops
            </p>
            <p className="p404" data-depth="0.10">
              Oops
            </p>
          </div>

          <div className="text">
            <article>
              <p>
                Uh oh! Looks like your table number got lost. <br />
                Can you please scan the QR Code again
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
