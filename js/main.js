// main.js
// Boot sequence: load state -> render -> wire events -> enable DnD

(function () {
  function init() {
    window.State.init();          // load from localStorage
    window.Render.renderAll();    // draw columns/cards
    window.Events.initEvents();   // form + buttons
    window.DnD.initDnD();         // drag-and-drop
  }

  // Run after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
