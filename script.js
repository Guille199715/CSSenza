const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuOverlay = document.querySelector("[data-menu-overlay]");
const themeButtons = document.querySelectorAll("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");
const backTop = document.querySelector("[data-back-top]");
const progress = document.getElementById("scrollProgress");
const revealItems = document.querySelectorAll(".reveal");
const optionButtons = document.querySelectorAll("[data-option-target]");
const optionPanels = document.querySelectorAll("[data-option-panel]");
const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
const pageSections = document.querySelectorAll("main > section");
const timeline = document.querySelector(".timeline");
const processSteps = document.querySelectorAll(".timeline .step");
const faqItems = document.querySelectorAll(".faq-item");
const magneticItems = document.querySelectorAll(".btn, .header-cta, .icon-button, .project-card a, .contact-link, .back-top");

const savedTheme = localStorage.getItem("cssenza-theme");
if (savedTheme === "light") {
  body.classList.add("modo-claro");
}

function updateThemeIcon() {
  const isLight = body.classList.contains("modo-claro");
  if (themeIcon) themeIcon.textContent = isLight ? "☀" : "☾";
}

function toggleTheme() {
  body.classList.toggle("modo-claro");
  localStorage.setItem("cssenza-theme", body.classList.contains("modo-claro") ? "light" : "dark");
  updateThemeIcon();
}

function openMenu() {
  body.classList.add("menu-open");
  mobileMenu.classList.add("active");
  menuOverlay.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  body.classList.remove("menu-open");
  mobileMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}

function updateScrollState() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const current = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

  progress.style.width = `${current}%`;
  header.classList.toggle("scrolled", window.scrollY > 24);
  backTop.classList.toggle("visible", window.scrollY > 480);
  updateActiveNav();
  updateProcessLine();
}

function updateActiveNav() {
  let activeId = "inicio";

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);

    if (target && window.scrollY >= target.offsetTop - 180) {
      activeId = targetId;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
}

function updateProcessLine() {
  if (!timeline) return;

  const rect = timeline.getBoundingClientRect();
  const raw = (window.innerHeight * 0.72 - rect.top) / Math.max(rect.height, 1);
  const amount = Math.min(Math.max(raw, 0), 1);
  const litCount = Math.ceil(amount * processSteps.length);

  timeline.style.setProperty("--process-progress", `${amount * 100}%`);
  processSteps.forEach((step, index) => {
    step.classList.toggle("process-lit", index < litCount);
  });
}

function selectOption(option) {
  optionButtons.forEach((button) => {
    const isActive = button.dataset.optionTarget === option;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  optionPanels.forEach((panel) => {
    const isActive = panel.dataset.optionPanel === option;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);

    if (isActive) {
      requestAnimationFrame(() => panel.classList.add("visible"));
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("section-active", entry.isIntersecting);
    });
  },
  { rootMargin: "-28% 0px -55% 0px", threshold: 0 }
);

document.querySelectorAll(".section-heading.reveal, .hero-inner.reveal, .contact-copy.reveal").forEach((item) => {
  item.classList.add("reveal-soft");
});

document.querySelectorAll(".impact-strip, .service-grid, .audience-grid, .detail-grid, .project-grid, .timeline, .faq-list, .contact-actions").forEach((group) => {
  group.querySelectorAll(".reveal").forEach((item, index) => {
    item.classList.add(index % 2 === 0 ? "reveal-from-left" : "reveal-from-right");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 90, 270)}ms`);
  });
});

revealItems.forEach((item) => revealObserver.observe(item));
pageSections.forEach((section) => sectionObserver.observe(section));
optionButtons.forEach((button) => {
  button.addEventListener("click", () => selectOption(button.dataset.optionTarget));
});

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  magneticItems.forEach((item) => {
    item.classList.add("magnetic");

    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;

      item.style.setProperty("--magnet-x", `${x.toFixed(2)}px`);
      item.style.setProperty("--magnet-y", `${y.toFixed(2)}px`);
    });

    item.addEventListener("pointerleave", () => {
      item.style.setProperty("--magnet-x", "0px");
      item.style.setProperty("--magnet-y", "0px");
    });
  });
}

themeButtons.forEach((button) => button.addEventListener("click", toggleTheme));
menuToggle.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
    closeMenu();
  }
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);

updateThemeIcon();
updateScrollState();
