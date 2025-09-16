// events.js
// Handles user interactions (form submit) and triggers State + Render

(function () {
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const addBtn = document.getElementById("add-task-btn");

  function onAddTask() {
    const title = (titleInput.value || "").trim();
    const description = (descInput.value || "").trim();

    if (!title) {
      titleInput.focus();
      titleInput.classList.add("invalid");
      setTimeout(() => titleInput.classList.remove("invalid"), 600);
      return;
    }

    window.State.add({ title, description });
    window.Render.renderAll();
    window.DnD.attachCardDragEvents(); // new cards need drag handlers

    // reset form
    titleInput.value = "";
    descInput.value = "";
    titleInput.focus();
  }

  function initEvents() {
    addBtn.addEventListener("click", onAddTask);
    // Enter key on title also adds
    titleInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") onAddTask();
    });
    descInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") onAddTask();
    });
  }

  window.Events = { initEvents };
})();
