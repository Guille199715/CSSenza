// 🌙 Toggle modo oscuro
const toggle = document.getElementById("modoToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("modo-claro");
  toggle.textContent = document.body.classList.contains("modo-claro") ? "🌞" : "🌙";
});

// ⏳ Ocultar loader después de 2 segundos
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("oculto");
  }, 2000); // 2000 milisegundos = 2 segundos
});

// 🎬 Scroll reveal en secciones clave con GSAP
gsap.utils.toArray(".animar").forEach((el, i) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.2,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
});

const menuToggle = document.getElementById("menuToggle");
const menuLista = document.getElementById("menuLista");

menuToggle.addEventListener("click", () => {
  menuLista.classList.toggle("activo");
});
document.querySelectorAll("#menuLista a").forEach((link) => {
  link.addEventListener("click", () => {
    menuLista.classList.remove("activo");
  });
});
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
  });
});
