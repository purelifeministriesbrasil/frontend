/**
 * Pure Life Ministries Brasil - Accessible Vanilla Mobile Navigation
 * Uses HTML5 <dialog> modal with native focus trap, Escape key, and focus return.
 * JS transfer budget <= 1.5 KB.
 */
export function initMobileNav() {
  const openButton = document.getElementById("mobile-menu-trigger") as HTMLButtonElement | null;
  const dialog = document.getElementById("mobile-menu-dialog") as HTMLDialogElement | null;
  const closeButton = document.getElementById("mobile-menu-close") as HTMLButtonElement | null;

  if (!openButton || !dialog) return;

  function openMenu() {
    dialog?.showModal();
    openButton?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    dialog?.close();
    openButton?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    openButton?.focus();
  }

  openButton.addEventListener("click", openMenu);
  closeButton?.addEventListener("click", closeMenu);

  dialog.addEventListener("close", () => {
    openButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });

  // Close when clicking outside dialog contents (on backdrop)
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      closeMenu();
    }
  });

  // Close when clicking any nav link inside dialog
  const links = dialog.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

// Auto-run if script is directly loaded in browser
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNav);
  } else {
    initMobileNav();
  }
}
