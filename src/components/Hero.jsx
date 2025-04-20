import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const sloganLetters = useRef([]);
  const textLetters = useRef([]);

  useEffect(() => {
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

    textLetters.current.forEach((element, index) => {
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
          delay: index * 0.5,
        }
      );
    });
  }, []);
  const slogan = "CRAFT YOUR BRAND WITH";
  const text = "AMHAZ";

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-black text-white text-6xl font-extrabold">
      <div className="flex gap-1 text-2xl md:text-3xl text-[#D4AF37]">
        {slogan.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => (sloganLetters.current[i] = el)}
            className="inline-block drop-shadow-[2px_2px_2px_rgba(255,255,255,0.5)]"
          >
            {char}
          </span>
        ))}
      </div>
      <div className="flex gap-2 md:text-8xl">
        {text.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => (textLetters.current[i] = el)}
            className="inline-block drop-shadow-[2px_2px_2px_rgba(255,255,255,0.5)]"
          >
            {char}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
