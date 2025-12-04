"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/client/main.ts
  var require_main = __commonJS({
    "src/client/main.ts"() {
      console.log("Hello from frontend TypeScript!");
      var el = document.getElementById("app");
      if (el) {
        el.textContent = "Hello from Frontend TypeScript + esbuild!";
      }
      async function fetchMessage() {
        try {
          const res = await fetch("/api/hello");
          if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
          }
          const data = await res.json();
          console.log("Backend says:", data.message);
        } catch (err) {
          console.error("Error fetching message:", err);
        }
      }
      fetchMessage();
    }
  });
  require_main();
})();
//# sourceMappingURL=main.js.map
