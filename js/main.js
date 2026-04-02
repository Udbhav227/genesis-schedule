import { buildPanels } from "./ui.js";
import { initTabs, initFilters } from "./events.js";

function init() {
  initTabs();
  initFilters();
  buildPanels();
}

init();
