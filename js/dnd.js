// dnd.js
// Wires drag events on cards and drop zones (column bodies)

(function () {
  const lists = [
    document.getElementById("todo"),
    document.getElementById("in-progress"),
    document.getElementById("done")
  ];

  function statusFromList(el) {
    if (el.id === "todo") return "todo";
    if (el.id === "in-progress") return "inprogress";
    if (el.id === "done") return "done";
    return "todo";
  }

  function onDragStart(e) {
    const id = e.target.dataset.id;
    if (!id) return;
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
    // style hint
    e.target.classList.add("dragging");
  }

  function onDragEnd(e) {
    e.target.classList.remove("dragging");
  }

  function onDragOver(e) {
    e.preventDefault(); // allow drop
    e.dataTransfer.dropEffect = "move";
    e.currentTarget.classList.add("drag-over");
  }

  function onDragLeave(e) {
    e.currentTarget.classList.remove("drag-over");
  }

  function onDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const targetList = e.currentTarget;
    const next = statusFromList(targetList);

    if (id && next) {
      window.State.move(id, next);
      window.Render.renderAll();
      attachCardDragEvents(); // re-bind drag handlers on new DOM nodes
    }
    targetList.classList.remove("drag-over");
  }

  function attachListDropEvents() {
    lists.forEach(list => {
      list.addEventListener("dragover", onDragOver);
      list.addEventListener("dragleave", onDragLeave);
      list.addEventListener("drop", onDrop);
    });
  }

  function attachCardDragEvents() {
    // Add drag handlers to current cards
    document.querySelectorAll(".card").forEach(card => {
      card.removeEventListener("dragstart", onDragStart);
      card.removeEventListener("dragend", onDragEnd);
      card.addEventListener("dragstart", onDragStart);
      card.addEventListener("dragend", onDragEnd);
    });
  }

  function initDnD() {
    attachListDropEvents();
    attachCardDragEvents();
  }

  window.DnD = { initDnD, attachCardDragEvents };
})();
