"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const objectRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);
  const boxesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const object = objectRef.current;
    const trail = trailRef.current;
    const letters = lettersRef.current;
    const boxes = boxesRef.current;

    // Intro Animation
    gsap.from(letters, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 1,
      ease: "power3.out"
    });

    gsap.set(boxes, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Moving Object
    tl.to(object, {
      x: window.innerWidth - 150,
      ease: "none",
      duration: 10
    }, 0);

    // Trail Grow
    tl.to(trail, {
      width: "100%",
      ease: "none",
      duration: 10
    }, 0);

    // Stats Animation
    boxes.forEach((box, i) => {
      tl.to(box, {
        opacity: 1,
        y: 0,
        duration: 1
      }, 3 + i * 1.5);
    });

  }, []);

  const text = "WELCOME ITZFIZZ";

  return (
    <section ref={sectionRef} className="h-[500vh] bg-neutral-900 text-white relative">
      <div className="sticky top-0 h-screen flex items-center justify-center bg-neutral-200 overflow-hidden">

        {/* Road */}
        <div className="relative w-full h-52 bg-black overflow-hidden">

          {/* Green Trail */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 h-full bg-green-400 w-0"
          />

          {/* Letter Headline */}
          <div className="absolute top-1/2 -translate-y-1/2 left-5 flex text-6xl font-black tracking-widest text-black z-10">
            {text.split("").map((letter, index) => (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>

          {/* Moving Object (Modern Block Instead of Car) */}
          <div
            ref={objectRef}
            className="absolute top-0 left-0 h-52 w-36 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl shadow-2xl"
          />
        </div>
{/* Stat Boxes */}
<div
  ref={(el) => (boxesRef.current[0] = el)}
  className="absolute top-[8%] left-[44%] bg-yellow-300 text-black p-6 rounded-xl"
>
  <h2 className="text-4xl font-bold">95%</h2>
  <p>Client satisfaction rate</p>
</div>

<div
  ref={(el) => (boxesRef.current[1] = el)}
  className="absolute bottom-[8%] left-[44%] bg-sky-400 text-black p-6 rounded-xl"
>
  <h2 className="text-4xl font-bold">120+</h2>
  <p>Projects successfully delivered</p>
</div>

<div
  ref={(el) => (boxesRef.current[2] = el)}
  className="absolute top-[8%] right-[4%] bg-neutral-700 p-6 rounded-xl"
>
  <h2 className="text-4xl font-bold">50+</h2>
  <p>Active team members</p>
</div>

<div
  ref={(el) => (boxesRef.current[3] = el)}
  className="absolute bottom-[8%] right-[4%] bg-orange-500 text-black p-6 rounded-xl"
>
  <h2 className="text-4xl font-bold">2x</h2>
  <p>Growth in digital reach</p>
</div>
       

      </div>
    </section>
  );
}