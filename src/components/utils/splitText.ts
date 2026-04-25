import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Track if setSplitText has already run
let hasSetSplitTextRun = false;

// Custom SplitText replacement using native JS
function splitText(element: Element, types: string) {
  // Check if already split
  const existingOriginal = element.getAttribute("data-original-text");
  if (existingOriginal) {
    // Already split, return existing spans
    const wrapper = element.querySelector("span[data-split]");
    if (wrapper) {
      return {
        words: Array.from(wrapper.children) as HTMLElement[],
        chars: Array.from(wrapper.children) as HTMLElement[],
        lines: Array.from(wrapper.children) as HTMLElement[],
        revert: () => {
          element.textContent = existingOriginal;
          element.removeAttribute("data-original-text");
        }
      };
    }
  }
  
  const text = element.textContent || "";
  element.setAttribute("data-original-text", text);
  element.innerHTML = "";
  
  const wrapper = document.createElement("span");
  wrapper.setAttribute("data-split", "true");
  wrapper.style.display = "inline-block";
  
  if (types === "lines,words" || types === "chars,lines") {
    const words = text.split(" ");
    words.forEach((word, i) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "pre";
      wordSpan.textContent = word + (i < words.length - 1 ? " " : "");
      wrapper.appendChild(wordSpan);
    });
  }
  
  if (types === "chars,lines" || types === "chars") {
    wrapper.innerHTML = "";
    text.split("").forEach(char => {
      const charSpan = document.createElement("span");
      charSpan.style.display = "inline-block";
      charSpan.textContent = char;
      wrapper.appendChild(charSpan);
    });
  }
  
  element.appendChild(wrapper);
  
  return {
    words: Array.from(wrapper.children) as HTMLElement[],
    chars: Array.from(wrapper.children) as HTMLElement[],
    lines: Array.from(wrapper.children) as HTMLElement[],
    revert: () => {
      element.textContent = text;
      element.removeAttribute("data-original-text");
    }
  };
}

// Type for split text result
type SplitTextResult = ReturnType<typeof splitText>;

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitTextResult;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  // Prevent running twice
  if (hasSetSplitTextRun) return;
  hasSetSplitTextRun = true;
  
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = splitText(para, "lines,words");

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = splitText(title, "chars,lines");
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
