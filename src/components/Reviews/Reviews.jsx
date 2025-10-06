import reviews from "../../data/reviews";
import React, { useState, useEffect, useRef } from "react";
import "./Reviews.css";

import SplitType from "split-type";
import gsap from "gsap";

import { BiSolidQuoteLeft } from "react-icons/bi";

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);

  // refs to DOM nodes
  const copyRef = useRef(null);
  const authorRef = useRef(null);
  const sectionRef = useRef(null);

  const initialRenderRef = useRef(true);
  const animationInProgressRef = useRef(false);

  // initial split on mount (prepare the first text so we have .line .span ready)
  useEffect(() => {
    const copyEl = copyRef.current;
    const authorEl = authorRef.current;
    if (!copyEl || !authorEl) return;

    // create lines for initial text and wrap each line in a span
    try {
      new SplitType(copyEl, { types: "lines", lineClass: "line" });
      new SplitType(authorEl, { types: "lines", lineClass: "line" });
    } catch (e) {
      // ignore if SplitType fails
    }

    copyEl.querySelectorAll(".line").forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span>${content}</span>`;
    });

    authorEl.querySelectorAll(".line").forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span>${content}</span>`;
    });

    // ensure spans are visible (yPercent 0)
    const initialSpans = [
      ...copyEl.querySelectorAll(".line span"),
      ...authorEl.querySelectorAll(".line span"),
    ];
    gsap.set(initialSpans, { yPercent: 0 });
  }, []);

  // animate on activeReview change
  useEffect(() => {
    if (initialRenderRef.current) {
      // skip the first run (we already set initial split)
      initialRenderRef.current = false;
      // also make sure section background set for initial state
      if (sectionRef.current) {
        sectionRef.current.style.backgroundImage = `url(${reviews[activeReview].image})`;
      }
      return;
    }

    if (animationInProgressRef.current) return;
    animationInProgressRef.current = true;

    const copyEl = copyRef.current;
    const authorEl = authorRef.current;

    if (!copyEl || !authorEl) {
      animationInProgressRef.current = false;
      return;
    }

    // animate old spans up
    const oldSpans = [
      ...copyEl.querySelectorAll(".line span"),
      ...authorEl.querySelectorAll(".line span"),
    ];

    // If no old spans, directly set new text (fallback)
    if (oldSpans.length === 0) {
      // set background immediately
      if (sectionRef.current) {
        sectionRef.current.style.backgroundImage = `url(${reviews[activeReview].image})`;
      }

      copyEl.innerText = reviews[activeReview].copy;
      authorEl.innerText = `- ${reviews[activeReview].author}`;

      try {
        new SplitType(copyEl, { types: "lines", lineClass: "line" });
        new SplitType(authorEl, { types: "lines", lineClass: "line" });
      } catch (e) {}

      const newSpans = [];
      copyEl.querySelectorAll(".line").forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
        newSpans.push(line.querySelector("span"));
      });
      authorEl.querySelectorAll(".line").forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
        newSpans.push(line.querySelector("span"));
      });

      gsap.set(newSpans, { yPercent: 110 });
      gsap.to(newSpans, {
        yPercent: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power4.out",
        onComplete: () => {
          animationInProgressRef.current = false;
        },
      });

      return;
    }

    // Animate old text out
    gsap.to(oldSpans, {
      yPercent: -110,
      duration: 0.7,
      stagger: 0.04,
      ease: "power4.in",
      onComplete: () => {
        // After old animation finished, replace text and split new lines
        // also update background image
        if (sectionRef.current) {
          sectionRef.current.style.backgroundImage = `url(${reviews[activeReview].image})`;
        }

        copyEl.innerText = reviews[activeReview].copy;
        authorEl.innerText = `- ${reviews[activeReview].author}`;

        // apply SplitType to new content
        try {
          new SplitType(copyEl, { types: "lines", lineClass: "line" });
          new SplitType(authorEl, { types: "lines", lineClass: "line" });
        } catch (e) {}

        // wrap each new line into <span>
        const newSpans = [];
        copyEl.querySelectorAll(".line").forEach((line) => {
          const content = line.innerHTML;
          line.innerHTML = `<span>${content}</span>`;
          newSpans.push(line.querySelector("span"));
        });

        authorEl.querySelectorAll(".line").forEach((line) => {
          const content = line.innerHTML;
          line.innerHTML = `<span>${content}</span>`;
          newSpans.push(line.querySelector("span"));
        });

        // set starting position and animate in
        gsap.set(newSpans, { yPercent: 110 });
        gsap.to(newSpans, {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power4.out",
          onComplete: () => {
            animationInProgressRef.current = false;
          },
        });
      },
    });
  }, [activeReview]);

  const handleReviewClick = (index) => {
    if (index === activeReview || animationInProgressRef.current) return;
    setActiveReview(index);
  };

  return (
    <section
      className="reviews"
      ref={sectionRef}
      style={{
        backgroundImage: `url(${reviews[activeReview].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h3 id="quote-icon">
        <BiSolidQuoteLeft />
      </h3>

      <div className="review-item">
        <div className="review-content">
          <h4 id="review-copy" ref={copyRef}>
            {reviews[activeReview].copy}
          </h4>
          <h4 id="review-author" ref={authorRef}>
            - {reviews[activeReview].author}
          </h4>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className={`review-thumbnail ${
              index === activeReview ? "active" : ""
            }`}
            onClick={() => handleReviewClick(index)}
          >
            <img src={review.image} alt={`Review by ${review.author}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
