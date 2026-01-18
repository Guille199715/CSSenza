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
  menuToggle.classList.add("activo");
  body.style.overflow = "hidden";
}

function cerrarMenu() {
  body.classList.remove("menu-abierto");
  menuDrawer.classList.remove("activo");
  menuOverlay.classList.remove("activo");
  menuToggle.classList.remove("activo");
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
   ACTUALIZAR ICONO MODO
================================ */
function actualizarIconoModo() {
  const icono = body.classList.contains("modo-claro") ? "🌞" : "🌙";
  if (modoToggle) modoToggle.textContent = icono;
  if (modoToggleMobile) modoToggleMobile.textContent = icono;
}
actualizarIconoModo();

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

/* ================================
   FORMULARIO AUTOMATIZACIÓN
================================ */
const formAutomatizacion = document.getElementById("formAutomatizacion");
const formMsg = document.getElementById("formMsg");

if (formAutomatizacion) {
  formAutomatizacion.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const tipo = document.getElementById("tipoProceso").value;
    const volumen = document.getElementById("volumen").value.trim();
    const detalle = document.getElementById("detalle").value.trim();

    if (!nombre || !email || !tipo || !volumen || !detalle) {
      formMsg.textContent = "Completa todos los campos por favor.";
      formMsg.style.color = "var(--accent)";
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/enviar-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          tipoProceso: tipo,
          volumen,
          detalle,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        formMsg.textContent = "Correo enviado correctamente.";
        formMsg.style.color = "var(--accent)";
        formAutomatizacion.reset();
      } else {
        formMsg.textContent = "Error al enviar. Intenta de nuevo.";
        formMsg.style.color = "red";
      }
    } catch (error) {
      formMsg.textContent = "Error de conexión con el servidor.";
      formMsg.style.color = "red";
    }
  });
}
