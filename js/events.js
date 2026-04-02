import { setActiveDay, setActiveFilter } from './state.js';
import { buildPanels } from './ui.js';

export function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

      btn.classList.add('active');
      setActiveDay(parseInt(btn.dataset.day));

      buildPanels();
    });
  });
}

export function initFilters() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));

      chip.classList.add('active');
      setActiveFilter(chip.dataset.filter);

      buildPanels();
    });
  });
}