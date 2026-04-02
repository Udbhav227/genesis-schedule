export function initCursor() {
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");

  if (!cursor || !ring) return;

  let cx = -100,
    cy = -100,
    rx = -100,
    ry = -100;

  document.addEventListener("mousemove", (e) => {
    cx = e.clientX;
    cy = e.clientY;
  });

  function loop() {
    rx += (cx - rx) * 0.12;
    ry += (cy - ry) * 0.12;

    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";

    ring.style.left = rx + "px";
    ring.style.top = ry + "px";

    requestAnimationFrame(loop);
  }

  loop();

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("button, a")) {
      cursor.style.width = "18px";
      cursor.style.height = "18px";
      ring.style.width = "52px";
      ring.style.height = "52px";
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("button, a")) {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
      ring.style.width = "36px";
      ring.style.height = "36px";
    }
  });
}
