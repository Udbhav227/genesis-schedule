import { events, days, dayColors } from "./data.js";
import { activeDay, activeFilter } from "./state.js";

export function buildPanels() {
  const main = document.getElementById("main-content");
  main.innerHTML = "";

  days.forEach((day, di) => {
    const dn = di + 1;
    const panel = document.createElement("div");
    panel.className = "schedule-panel" + (dn === activeDay ? " active" : "");
    panel.id = `panel-day-${dn}`;

    const filtered = events.filter(
      (e) =>
        e.day === day &&
        (activeFilter === "all" || e.tags.includes(activeFilter)),
    );

    const byTime = {};
    filtered.forEach((ev) => {
      if (!byTime[ev.time]) byTime[ev.time] = [];
      byTime[ev.time].push(ev);
    });

    const timeline = document.createElement("div");
    timeline.className = "timeline";

    Object.entries(byTime).forEach(([time, evts]) => {
      const tg = document.createElement("div");
      tg.className = "time-group-header";
      tg.innerHTML = `<div class="time-stamp">${time}</div><div class="time-line"></div>`;
      timeline.appendChild(tg);

      const listContainer = document.createElement("div");
      listContainer.className = "list-container";

      evts.forEach((ev) => {
        const row = document.createElement("div");
        row.className = "event-row list-reveal";
        row.dataset.day = dn;

        const col = dayColors[dn];

        row.innerHTML = `
          <div class="row-main">
            <div class="row-name">${ev.name}</div>
            <div class="row-club">${ev.club}</div>
          </div>
          <div class="row-desc" title="${ev.desc}">${ev.desc}</div>
          <div class="row-loc">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${ev.loc}
          </div>
          <div class="row-action">
            <a href="#register" class="register-btn" style="color: ${col}; border-color: ${col};">
              Register
            </a>
          </div>
        `;

        // Interactive hover using the day's theme color
        row.addEventListener("mouseenter", () => {
          row.style.borderLeftColor = col;
          row.style.background = "var(--surface2)";
        });
        row.addEventListener("mouseleave", () => {
          row.style.borderLeftColor = "transparent";
          row.style.background = "var(--surface)";
        });

        listContainer.appendChild(row);
      });

      timeline.appendChild(listContainer);
    });

    if (filtered.length === 0) {
      timeline.innerHTML = `<div style="padding:60px 0; text-align:center; color:var(--muted); font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase;">No events match this filter</div>`;
    }

    panel.appendChild(timeline);
    main.appendChild(panel);
  });

  // Simple intersection observer for list reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          observer.unobserve(en.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".list-reveal").forEach((el, i) => {
    // Add a slight stagger to the row animations
    el.style.transitionDelay = `${(i % 10) * 30}ms`;
    observer.observe(el);
  });
}
