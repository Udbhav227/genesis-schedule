import { setActiveDay, setActiveFilter, setActiveClub } from "./state.js";
import { buildPanels } from "./ui.js";

export function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
      setActiveDay(parseInt(btn.dataset.day));

      buildPanels();
    });
  });
}

export function initFilters() {
  const liveBtn = document.getElementById("live-filter-btn");
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      if (chip !== liveBtn) {
        setShowOnlyLive(false);
        liveBtn.classList.remove("active");
      }

      document
        .querySelectorAll(".chip")
        .forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      if (chip === liveBtn) {
        setShowOnlyLive(true);
      } else {
        setActiveFilter(chip.dataset.filter);
      }

      buildPanels();
    });
  });

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document
        .querySelectorAll(".chip")
        .forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      setActiveFilter(chip.dataset.filter);
      buildPanels();
    });
  });

  const clubSelect = document.getElementById("club-select");
  if (clubSelect) {
    clubSelect.addEventListener("change", (e) => {
      setActiveClub(e.target.value);
      buildPanels();
    });
  }
}
