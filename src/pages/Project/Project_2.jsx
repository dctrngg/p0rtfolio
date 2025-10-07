import React from "react";
import "./Project.css";

import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";

import ReactLenis from "lenis/react";

import Transition from "../../components/Transition/Transition";

const Project_2 = () => {
  return (
    <ReactLenis root>
      <div className="page project">
        <section className="project-header">
          <AnimatedCopy
            delay={1}
            animateOnScroll={false}
            className="primary sm"
          >
            concert ticket sales website
          </AnimatedCopy>
          <AnimatedCopy tag="h2" delay={1}>
            HUNG VUONG CONCERT: UNFOLD
          </AnimatedCopy>
        </section>
        
        <section className="project-link">
          <a
            href="https://hungvuongconcert.com/"
            className="project-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        </section>

        <section className="project-banner-img">
          <div className="project-banner-img-wrapper">
            <ParallaxImage 
              src="/work/work-2.webp" 
              alt="Hung Vuong Concert Banner"
              // Thêm props để giảm parallax effect nếu component hỗ trợ
              speed={0.5}
              scale={1.1}
            />
          </div>
        </section>

        <section className="project-details">
          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Overview
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              A modern online ticketing platform for music events, Hung Vuong Concert: Unfold, offers a seamless booking experience and an engaging, interactive interface.

            </AnimatedCopy>
          </div>

          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Year
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              2024
            </AnimatedCopy>
          </div>

          <div className="details">
            <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
              Category
            </AnimatedCopy>
            <AnimatedCopy tag="h4" animateOnScroll={true}>
              HTML - CSS - JS
            </AnimatedCopy>
          </div>
        </section>

        <section className="project-images">
          <div className="project-images-container">
            <div className="project-img">
              <div className="project-img-wrapper">
                <ParallaxImage src="/project/1/1.webp" alt="" />
              </div>
            </div>

            <div className="project-img">
              <div className="project-img-wrapper">
                <ParallaxImage src="/project/1/2.webp" alt="" />
              </div>
            </div>

            <div className="project-img">
              <div className="project-img-wrapper">
                <ParallaxImage src="/project/1/3.webp" alt="" />
              </div>
            </div>

            

            
          </div>
        </section>

        <section className="next-project">
          <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
            03 - 05
          </AnimatedCopy>
          <AnimatedCopy tag="h3" animateOnScroll={true}>
            Next
          </AnimatedCopy>

          <div className="next-project-img">
            <div className="next-project-img-wrapper">
              <ParallaxImage 
                src="/work/work-2.jpg" 
                alt="Market Pulse Project"
                speed={0.3}
                scale={1.05}
              />
            </div>
          </div>

          <AnimatedCopy tag="h4" animateOnScroll={true}>
            Market Pulse
          </AnimatedCopy>
        </section>
        
      </div>
    </ReactLenis>
  );
};

export default Transition(Project_2);