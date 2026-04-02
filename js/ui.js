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

    let cardIndex = 0;
    Object.entries(byTime).forEach(([time, evts]) => {
      const tg = document.createElement("div");
      tg.className = "time-group-header";
      tg.innerHTML = `<div class="time-stamp">${time}</div><div class="time-line"></div>`;
      timeline.appendChild(tg);

      const grid = document.createElement("div");
      grid.className = "cards-grid";

      evts.forEach((ev, i) => {
        cardIndex++;
        const card = document.createElement("div");
        card.className =
          "event-card card-reveal" +
          (i === 0 && cardIndex === 1 ? " featured" : "");
        card.dataset.day = dn;
        card.dataset.tags = ev.tags.join(",");

        const col = dayColors[dn];

        if (i === 0 && cardIndex === 1) {
          card.innerHTML = `
            <div>
              <div class="card-top">
                <span class="club-tag">${ev.club}</span>
              </div>
              <div class="event-name">${ev.name}</div>
              <div class="event-desc">${ev.desc}</div>
              <div class="card-footer">
                <a href="#register" class="register-link" style="color:${col}">
                  Register
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </a>
              </div>
            </div>
            <div class="featured-right">
              <div class="location-tag" style="justify-content:flex-end">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${ev.loc}
              </div>
            </div>
            <div class="card-number">${String(cardIndex).padStart(2, "0")}</div>`;
        } else {
          card.innerHTML = `
            <div class="card-top">
              <span class="club-tag">${ev.club}</span>
              <span class="location-tag">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${ev.loc}
              </span>
            </div>
            <div class="event-name">${ev.name}</div>
            <div class="event-desc">${ev.desc}</div>
            <div class="card-footer">
              <a href="#register" class="register-link">
                Register
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>
            </div>
            <div class="card-number">${String(cardIndex).padStart(2, "0")}</div>`;
        }

        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          const y = ((e.clientY - r.top) / r.height) * 100;
          card.style.setProperty("--mx", x + "%");
          card.style.setProperty("--my", y + "%");
        });

        grid.appendChild(card);
      });

      timeline.appendChild(grid);
    });

    if (filtered.length === 0) {
      timeline.innerHTML = `<div style="padding:60px 0; text-align:center; color:var(--muted); font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase;">No events match this filter</div>`;
    }

    panel.appendChild(timeline);
    main.appendChild(panel);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const el = en.target;
          const delay = parseInt(el.dataset.delay || 0);
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.08 },
  );

  document.querySelectorAll(".card-reveal").forEach((el, i) => {
    el.dataset.delay = (i % 6) * 60;
    observer.observe(el);
  });
}
