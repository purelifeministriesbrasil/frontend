/**
 * Scroll-reveal and count-up animation utilities.
 *
 * Usage (in any Astro component):
 *   import { initReveal } from "@/lib/reveal";
 *   // or via BaseLayout <script> tag (see below).
 *
 * Observed attributes:
 *   data-reveal             – fade-up (default)
 *   data-reveal="from-left" – slide from left
 *   data-reveal="from-right"– slide from right
 *   data-reveal="scale"     – scale in
 *   data-reveal-group       – container; all direct children receive
 *                             stagger transition-delays via CSS.
 *   data-count-up           – element whose textContent should count up
 *                             from 0 to its final numeric value.
 *   data-count-prefix       – prefix to prepend to count-up value (e.g. "+")
 *   data-count-suffix       – suffix to append to count-up value (e.g. " anos")
 */

/** Duration (ms) of a count-up animation. */
const COUNT_DURATION = 1800;

function countUp(el: HTMLElement): void {
  const raw = el.dataset["countUp"] ?? el.textContent ?? "0";
  const target = parseFloat(raw.replace(/[^0-9.]/g, ""));
  if (isNaN(target) || target === 0) return;

  const prefix = el.dataset["countPrefix"] ?? "";
  const suffix = el.dataset["countSuffix"] ?? "";
  const isInteger = Number.isInteger(target);
  const start = performance.now();

  const tick = (now: number) => {
    const elapsed = Math.min(now - start, COUNT_DURATION);
    const progress = elapsed / COUNT_DURATION;
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent =
      prefix +
      (isInteger ? Math.round(value).toLocaleString("pt-BR") : value.toFixed(1)) +
      suffix;

    if (elapsed < COUNT_DURATION) {
      requestAnimationFrame(tick);
    } else {
      el.textContent =
        prefix +
        (isInteger ? target.toLocaleString("pt-BR") : target.toFixed(1)) +
        suffix;
    }
  };

  requestAnimationFrame(tick);
}

export function initReveal(): void {
  // Collect all reveal targets
  const revealTargets = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]")
  );

  // Collect group containers — their children also become targets
  const groups = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal-group]")
  );
  const groupChildren: HTMLElement[] = [];
  for (const group of groups) {
    for (const child of Array.from(group.children) as HTMLElement[]) {
      // Mark each child so the CSS stagger delay applies
      if (!child.dataset["reveal"]) {
        child.dataset["reveal"] = "";
      }
      groupChildren.push(child);
    }
  }

  const allTargets = [...revealTargets, ...groupChildren];

  // Count-up targets
  const countTargets = Array.from(
    document.querySelectorAll<HTMLElement>("[data-count-up]")
  );

  if (!("IntersectionObserver" in window)) {
    // Fallback: reveal everything immediately
    for (const el of allTargets) el.classList.add("revealed");
    for (const el of countTargets) countUp(el);
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
  );

  const countObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          countUp(entry.target as HTMLElement);
          countObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.5 }
  );

  for (const el of allTargets) revealObserver.observe(el);
  for (const el of countTargets) countObserver.observe(el);
}
