// render.js
// Responsible only for building/updating the DOM from State

(function () {
  const COLS = {
    todo: document.getElementById("todo"),
    inprogress: document.getElementById("in-progress"),
    done: document.getElementById("done")
  };

  function cardEl(task) {
    const card = window.dom.createEl("article", { class: "card", draggable: "true" });
    card.dataset.id = task.id;

    const title = window.dom.createEl("h3", { text: task.title });
    const desc = task.description
      ? window.dom.createEl("p", { text: task.description })
      : null;

    card.appendChild(title);
    if (desc) card.appendChild(desc);

    return card;
  }

  function clearCol(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function renderColumn(status) {
    const container = COLS[status];
    clearCol(container);
    window.State.listBy(status).forEach(task => container.appendChild(cardEl(task)));
  }

  function renderAll() {
    renderColumn("todo");
    renderColumn("inprogress");
    renderColumn("done");
  }

  window.Render = { renderAll, renderColumn };
})();
