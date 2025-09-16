// state.js
// In-memory store of tasks. Each task: { id, title, description, status }

(function () {
  const uid = () => Math.random().toString(36).slice(2, 10);

  const State = {
    tasks: [],

    init() {
      // load from localStorage using storage.loadTasks()
      const loaded = window.storage.loadTasks();
      // We store as flat array for easier DnD between columns
      // If your loadTasks returns {todo:[], inprogress:[], done:[]}, flatten here:
      if (Array.isArray(loaded)) {
        State.tasks = loaded;
      } else {
        const flat = [];
        (loaded.todo || []).forEach(t => flat.push({ ...t, status: "todo" }));
        (loaded.inprogress || []).forEach(t => flat.push({ ...t, status: "inprogress" }));
        (loaded.done || []).forEach(t => flat.push({ ...t, status: "done" }));
        State.tasks = flat;
      }
    },

    save() {
      // Persist as a flat array
      window.storage.saveTasks(State.tasks);
    },

    listBy(status) {
      return State.tasks.filter(t => t.status === status);
    },

    add({ title, description }) {
      const task = {
        id: uid(),
        title: title.trim(),
        description: (description || "").trim(),
        status: "todo"
      };
      State.tasks.push(task);
      State.save();
      return task;
    },

    move(id, nextStatus) {
      const t = State.tasks.find(x => x.id === id);
      if (!t) return;
      t.status = nextStatus;
      State.save();
    }
  };

  window.State = State;
})();
