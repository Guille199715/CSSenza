/* ================================
   ELEMENTOS
================================ */
const body = document.body;

// Drawer menu
const menuToggle = document.getElementById("menuToggle");
const menuDrawer = document.getElementById("menuDrawer");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");

// Modo oscuro
const modoToggle = document.getElementById("modoToggle");
const modoToggleMobile = document.getElementById("modoToggleMobile");

// Botón arriba
const btnTop = document.getElementById("btnTop");

// Loader
const loader = document.getElementById("loader");

/* ================================
   MENU DRAWER
================================ */
function abrirMenu() {
  body.classList.add("menu-abierto");
  menuDrawer.classList.add("activo");
  menuOverlay.classList.add("activo");
  body.style.overflow = "hidden";
}

function cerrarMenu() {
  body.classList.remove("menu-abierto");
  menuDrawer.classList.remove("activo");
  menuOverlay.classList.remove("activo");
  body.style.overflow = "";
}

menuToggle.addEventListener("click", abrirMenu);
menuClose.addEventListener("click", cerrarMenu);
menuOverlay.addEventListener("click", cerrarMenu);

document.querySelectorAll(".menu-drawer a").forEach(link => {
  link.addEventListener("click", cerrarMenu);
});

/* ================================
   MODO OSCURO
================================ */
function toggleModo() {
  body.classList.toggle("modo-claro");
  actualizarIconoModo();
}

if (modoToggle) modoToggle.addEventListener("click", toggleModo);
if (modoToggleMobile) modoToggleMobile.addEventListener("click", toggleModo);

/* ================================
   LOADER
================================ */
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("oculto");
  }, 2000);
});

/* ================================
   BOTÓN ARRIBA
================================ */
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    btnTop.classList.add("visible");
  } else {
    btnTop.classList.remove("visible");
  }

  const progress = document.getElementById("scroll-progress");
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / height) * 100}%`;
});

btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ================================
   GSAP SCROLL REVEAL
================================ */
gsap.utils.toArray(".animar").forEach((el, i) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
});
function actualizarIconoModo() {
  const icono = body.classList.contains("modo-claro") ? "🌞" : "🌙";
  if (modoToggle) modoToggle.textContent = icono;
  if (modoToggleMobile) modoToggleMobile.textContent = icono;
}
actualizarIconoModo();
