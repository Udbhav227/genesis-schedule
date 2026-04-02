import { buildPanels } from "./ui.js";
import { initTabs, initFilters } from "./events.js";
import { initCursor } from "./cursor.js";

function init() {
  initCursor();
  initTabs();
  initFilters();
  buildPanels();
}

window.addEventListener("DOMContentLoaded", init);
