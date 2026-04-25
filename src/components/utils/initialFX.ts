import gsap from "gsap";
import { smoother } from "../Navbar";

// ✅ STRONG guard (runs only once)
let initialized = false;

// ✅ CLEAN SplitText (NO duplication)
function createSplitText(
  element: Element | string,
  options: { type: string; linesClass?: string }
) {
  const el =
    typeof element === "string"
      ? document.querySelector(element)
      : element;

  if (!el) return { chars: [], lines: [], revert: () => {} };

  // ✅ ALWAYS reset DOM before splitting
  const originalText =
    el.getAttribute("data-original-text") || el.textContent || "";

  el.setAttribute("data-original-text", originalText);
  el.innerHTML = originalText;

  const results = {
    chars: [] as HTMLElement[],
    lines: [] as HTMLElement[],
    revert: () => {
      el.textContent = originalText;
    },
  };

  // ✅ CHAR SPLIT
  if (options.type.includes("chars")) {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";

    originalText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      wrapper.appendChild(span);
      results.chars.push(span);
    });

    el.innerHTML = "";
    el.appendChild(wrapper);
  }

  // ✅ LINE SPLIT (optional)
  if (options.type.includes("lines")) {
    const lineWrapper = document.createElement("div");

    originalText.split("\n").forEach((line) => {
      const div = document.createElement("div");
      div.textContent = line;
      if (options.linesClass) div.classList.add(options.linesClass);
      lineWrapper.appendChild(div);
      results.lines.push(div);
    });

    el.appendChild(lineWrapper);
  }

  return results;
}

type SplitTextResult = ReturnType<typeof createSplitText>;

export function initialFX() {
  // ✅ HARD STOP if already run
  if (initialized) return;
  initialized = true;

  document.body.style.overflowY = "auto";
  smoother.paused(false);

  const main = document.querySelector("main");
  if (main) main.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // ✅ INTRO TEXT ANIMATION
  const landingElements = [
    ".landing-info h3",
    ".landing-intro h2",
    ".landing-intro h1",
  ];

  let allChars: HTMLElement[] = [];

  landingElements.forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) {
      const split = createSplitText(el, {
        type: "chars",
      });
      allChars = allChars.concat(split.chars);
    }
  });

  gsap.fromTo(
    allChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // ✅ HEADER FADE
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // ✅ LOOP TEXT (Developer ↔ Engineer)
  const text1 = createSplitText(".landing-h2-1", { type: "chars" });
  const text2 = createSplitText(".landing-h2-2", { type: "chars" });

  LoopText(text1, text2);
}

// ✅ CLEAN LOOP (no duplication)
function LoopText(Text1: SplitTextResult, Text2: SplitTextResult) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.1,
    }
  )
    .to(Text2.chars, {
      y: -80,
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.1,
      delay: 2,
    })
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        y: 0,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
      }
    )
    .to(Text1.chars, {
      y: -80,
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.1,
      delay: 2,
    });
}