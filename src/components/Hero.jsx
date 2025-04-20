import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import SplitType from "split-type";

gsap.registerPlugin(Flip);

const images = [
  "/images/pic6.png",
  "/images/pic5.png",
  "/images/pic7.png",
  "/images/pic2.png",
  "/images/pic4.png",
  "/images/pic3.png",
  "/images/pic1.png",
];

const Hero = () => {
  const containerRef = useRef(null);
  const stackedRef = useRef(null);
  const textRef = useRef(null);
  const sloganLetters = useRef([]);

  useEffect(() => {
    const images = containerRef.current.querySelectorAll(".fly-img");

    gsap.set(textRef.current, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.5 });

    images.forEach((img, index) => {
      const total = images.length;
      const spread = 20;
      const angleSpread = 5;

      const offsetX = (index - total / 2) * spread;
      const offsetY = Math.abs(index - total / 2) * 3;
      const rotation = (index - total / 2) * angleSpread;

      tl.fromTo(
        img,
        {
          scale: 0,
          opacity: 0,
          x: offsetX * 3,
          y: offsetY * 3,
          rotation: rotation * 2,
        },
        {
          scale: 1,
          opacity: 1,
          x: offsetX,
          y: offsetY,
          rotation: rotation,
          duration: 1.5,
          ease: "power3.out",
          onComplete: index === images.length - 1 ? animateText : null,
        },
        index * 0.15
      );
    });

    function animateText() {
      const split = new SplitType(textRef.current, { types: "chars" });
      gsap.set(textRef.current, { opacity: 1 });
      gsap.set(split.chars, {
        opacity: 0,
        y: 30,
        scale: 0.8,
        rotateY: 90,
        transformOrigin: "center",
      });

      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        ease: "back.out(1.7)",
        duration: 1.2,
        stagger: {
          each: 0.05,
          from: "center",
        },
      });
    }

    sloganLetters.current.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          y: -200,
          opacity: 0,
          rotate: 360,
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          ease: "bounce.out",
          duration: 1.2,
          delay: index * 0.1,
        }
      );
    });
  }, []);

  const slogan = "CRAFT YOUR BRAND WITH";

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden flex items-center justify-center flex-col">
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            className="fly-img w-48 h-96 absolute rounded-lg shadow-lg object-cover rotate-8 lg:w-62 lg:h-132"
            alt={`img-${idx}`}
          />
        ))}
      </div>

      <div className="flex gap-1 text-2xl md:text-3xl text-[#D4AF37] font-bold lg:text-5xl ">
        {slogan.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => (sloganLetters.current[i] = el)}
            className="inline-block drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]"
          >
            {char}
          </span>
        ))}
      </div>

      <div
        ref={stackedRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      />

      <div>
        <h1
          ref={textRef}
          className="text-8xl font-bold z-20 text-center leading-snug drop-shadow-[2px_2px_2px_rgba(255,255,255,0.5)] md:text-9xl lg:text-[200px]"
        >
          AMHAZ
        </h1>
      </div>
    </div>
  );
};
export default Hero;
