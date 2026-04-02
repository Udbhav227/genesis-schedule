import { buildPanels } from "./ui.js";
import { initTabs, initFilters } from "./events.js";
import { initCursor } from "./cursor.js";

function init() {
  initCursor();
  initTabs();
  initFilters();
  buildPanels();
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("warning-modal");
  const closeBtn = document.getElementById("close-modal");

  const focusableElementsString =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusableElements = modal.querySelectorAll(focusableElementsString);
  const firstTabStop = focusableElements[0];
  const lastTabStop = focusableElements[focusableElements.length - 1];

  function openModal() {
    modal.classList.add("show");
    document.body.classList.add("no-scroll");

    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  setTimeout(openModal, 100);

  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      return;
    }

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }
      }
      else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  });
});

window.addEventListener("DOMContentLoaded", init);
