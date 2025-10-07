import React from "react";
import "./Project.css";

import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import AnimatedCopy from "../../components/AnimatedCopy/AnimatedCopy";

import ReactLenis from "lenis/react";

import Transition from "../../components/Transition/Transition";

const Project_4 = () => {
  return (
    <ReactLenis root>
      <div className="page project">
        <section className="project-header">
          <AnimatedCopy
            delay={1}
            animateOnScroll={false}
            className="primary sm"
          >
            studio
          </AnimatedCopy>
          <AnimatedCopy tag="h2" delay={1}>
            Negative - film
          </AnimatedCopy>
        </section>

        <section className="project-link">
          <a
            href="https://negative-sand.vercel.app/"
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
              src="/work/work-4-1.webp"
              alt="Terrene Banner"
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


              We Shoot. We fracture. We reform.We are Negative.

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
              HTML - CSS - JS - GSAP
            </AnimatedCopy>
          </div>
        </section>

        <section className="project-images">
          <div className="project-images-container">
            <div className="project-img">
              <div className="project-img-wrapper">
                <ParallaxImage src="/work/work-4-2.webp" alt="Project screenshot 1" />
              </div>
            </div>

            <div className="project-img">
              <div className="project-img-wrapper">
                <ParallaxImage src="/work/work-4-3.webp" alt="Project screenshot 2" />
              </div>
            </div>

            <div className="project-img">
              <div className="project-img-wrapper">
                <ParallaxImage src="/work/work-4-4.webp" alt="Project screenshot 3" />
              </div>
            </div>
          </div>
        </section>

        {/* <section className="next-project">
          <AnimatedCopy tag="p" animateOnScroll={true} className="primary sm">
            04 - 04
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
            The end
          </AnimatedCopy>
        </section> */}
      </div>
    </ReactLenis>
  );
};

export default Transition(Project_4);