import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    number: "01",
    name: "Workout Master",
    category: "Full-Stack · AI · Fitness",
    tools: "Next.js, React, Tailwind, Node.js, Firebase, MongoDB",
  },
  {
    number: "02",
    name: "Sellene",
    category: "Full-Stack · Web3 · Marketplace",
    tools: "React, Vite, Node.js, Express.js, MongoDB, Web3, AI Pricing",
  },
  {
    number: "03",
    name: "StreamX",
    category: "Full-Stack · Streaming · Cloud",
    tools: "React, Vite, TypeScript, Firebase, Python, Vercel",
  },
  {
    number: "04",
    name: "Eye Blink Fatigue Detector",
    category: "AI · Computer Vision · Safety",
    tools: "Python, OpenCV, Jupyter Notebook",
  },
  {
    number: "05",
    name: "Smart Resource Scheduler",
    category: "AI · Optimization · Scheduling",
    tools: "Python, Jupyter Notebook",
  },
  {
    number: "06",
    name: "Library Management System",
    category: "Full-Stack · Web App · Backend",
    tools: "Django, MySQL, JavaScript, Python, CSS",
  },
];

const Work = () => {
  useGSAP(() => {
    function getTranslateX(): number {
      const boxes = document.getElementsByClassName("work-box");
      if (!boxes.length) return 0;

      const box = boxes[0] as HTMLElement;
      const containerRect = document
        .querySelector(".work-container")!
        .getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      const parentWidth = box.parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(box).padding) / 2;

      return (
        boxRect.width * boxes.length -
        (containerRect.left + parentWidth) +
        padding
      );
    }

    ScrollTrigger.refresh();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX()}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
      invalidateOnRefresh: true,
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.number}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;