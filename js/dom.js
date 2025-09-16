// dom.js
(function () {
  function qs(selector, scope = document) {
    return scope.querySelector(selector);
  }

  function qsa(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
  }

  function createEl(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.startsWith("data-")) el.setAttribute(k, v);
      else el.setAttribute(k, v);
    }
    for (const child of children) {
      if (child == null) continue;
      el.append(child.nodeType ? child : document.createTextNode(child));
    }
    return el;
  }

  // expose globally
  window.dom = { qs, qsa, createEl };
})();
