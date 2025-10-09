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

  // 🔹 Initialize first review text + animation
  useEffect(() => {
    const copyEl = copyRef.current;
    const authorEl = authorRef.current;
    if (!copyEl || !authorEl) return;

    // Set initial text content
    copyEl.innerText = reviews[0].copy;
    authorEl.innerText = `- ${reviews[0].author}`;

    // Split text into lines
    try {
      new SplitType(copyEl, { types: "lines", lineClass: "line" });
      new SplitType(authorEl, { types: "lines", lineClass: "line" });
    } catch (e) {
      console.warn("SplitType init error", e);
    }

    // Wrap each line with span
    copyEl.querySelectorAll(".line").forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span>${content}</span>`;
    });
    authorEl.querySelectorAll(".line").forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span>${content}</span>`;
    });

    const initialSpans = [
      ...copyEl.querySelectorAll(".line span"),
      ...authorEl.querySelectorAll(".line span"),
    ];

    gsap.set(initialSpans, { yPercent: 0 });

    // Set background for first review
    if (sectionRef.current) {
      sectionRef.current.style.backgroundImage = `url(${reviews[0].image})`;
    }
  }, []);

  // 🔹 Animate text + background when review changes
  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
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

    const oldSpans = [
      ...copyEl.querySelectorAll(".line span"),
      ...authorEl.querySelectorAll(".line span"),
    ];

    // Animate old text out
    gsap.to(oldSpans, {
      yPercent: -110,
      duration: 0.6,
      stagger: 0.04,
      ease: "power4.in",
      onComplete: () => {
        // Update background
        if (sectionRef.current) {
          sectionRef.current.style.backgroundImage = `url(${reviews[activeReview].image})`;
        }

        // Reset previous split markup
        copyEl.querySelectorAll(".line").forEach((line) =>
          line.replaceWith(...line.childNodes)
        );
        authorEl.querySelectorAll(".line").forEach((line) =>
          line.replaceWith(...line.childNodes)
        );

        // Set new text
        copyEl.innerText = reviews[activeReview].copy;
        authorEl.innerText = `- ${reviews[activeReview].author}`;

        // Split new lines
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

        // Animate new text in
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

  // 🔹 Handle review thumbnail click
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
          <h4 id="review-copy" ref={copyRef}></h4>
          <h4 id="review-author" ref={authorRef}></h4>
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
            <img src={review.image} alt={`Review ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
