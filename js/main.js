/* Print212 — JS minimal (menu mobile + succès formulaire + année) */

(function () {
  const root = document.documentElement;
  const body = document.body;

  // Menu burger
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  function setNavOpen(open) {
    body.classList.toggle("nav-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    // Petite aide a11y : empêcher le scroll de fond sur mobile si menu ouvert
    if (open) {
      body.style.overflow = "hidden";
      root.style.overscrollBehavior = "contain";
    } else {
      body.style.overflow = "";
      root.style.overscrollBehavior = "";
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = !body.classList.contains("nav-open");
      setNavOpen(open);
    });

    // Ferme au clic sur un lien
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches && target.matches("a[href^='#']")) {
        setNavOpen(false);
      }
    });

    // Ferme avec Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNavOpen(false);
    });

    // Ferme si on repasse en desktop
    const mql = window.matchMedia("(min-width: 920px)");
    mql.addEventListener?.("change", () => setNavOpen(false));
  }

  // Année footer
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Message de succès Netlify (/?success=1#contact)
  const successBox = document.getElementById("form-success");
  try {
    const params = new URLSearchParams(window.location.search);
    if (successBox && params.get("success") === "1") {
      successBox.hidden = false;
    }
  } catch {
    // ignore
  }
})();

