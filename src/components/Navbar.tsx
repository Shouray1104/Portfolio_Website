import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Simple smooth scroll using native CSS + ScrollTrigger
export let smoother: { scrollTop: (val: number) => void; paused: (_val: boolean) => void; scrollTo: (target: string | null, smooth: boolean, pos: string) => void };

const Navbar = () => {
  useEffect(() => {
    // Use native smooth scrolling with ScrollTrigger
    smoother = {
      scrollTop: (val: number) => window.scrollTo({ top: val, behavior: "smooth" }),
      paused: (_val: boolean) => {},
      scrollTo: (target: string | null, smooth: boolean, pos: string) => {
        if (!target) return;
        const elem = document.querySelector(target);
        if (elem) elem.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: pos as ScrollLogicalPosition });
      }
    };

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      // Native scroll - no refresh needed
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Shouray Soni
        </a>
        <a
          href="mailto:shouraysoni2004@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          shouraysoni2004@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
