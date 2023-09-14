import "./style.css";

function setHomePageHeight() {
  const header = document.querySelector("header") as HTMLHeadElement;
  const headerHeight = header.offsetHeight;
  const windowHeight = window.innerHeight;
  const homePage = document.querySelector("#home") as HTMLElement;
  homePage.style.minHeight = windowHeight - headerHeight + "px";
}

// function that changes the active link in the header
function setActiveLink() {
  const sections = document.querySelectorAll(
    "section"
  ) as NodeListOf<HTMLElement>;
  const header = document.querySelector("header") as HTMLHeadElement;
  const headerHeight = header.offsetHeight;
  let currentSection: HTMLElement | null = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 1; // Adjust for header height

    if (window.scrollY >= sectionTop) {
      currentSection = section;
    }
  });

  if (currentSection) {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    const correspondingNavItem = document.querySelector(
      `.nav-item:has([href="#${(currentSection as HTMLElement).id}"])`
    );

    if (correspondingNavItem) {
      correspondingNavItem.classList.add("active");
    }
  }
}

function setScrollPadding() {
  const header = document.querySelector("header") as HTMLHeadElement;
  const headerHeight = header.offsetHeight;
  const html = document.querySelector("html") as HTMLElement;
  html.style.scrollPaddingTop = headerHeight + "px";
}

function smoothScrollToTarget(targetHref: string) {
  const header = document.querySelector("header") as HTMLHeadElement;
  const headerHeight = header.offsetHeight;

  const target = document.querySelector(targetHref);

  if (target) {
    const targetPosition = target.getBoundingClientRect().top - headerHeight;
    window.scrollTo({
      top: targetPosition + window.scrollY,
    });
  }
}

// Call setHomePageHeight when the page loads
window.addEventListener("load", () => {
  setHomePageHeight();
  setActiveLink();
  setScrollPadding();
});

// Offset the anchor links to account for the header
const anchorLinks = document.querySelectorAll(
  "a[href^='#']"
) as NodeListOf<HTMLLinkElement>;
anchorLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Cast e.target to HTMLAnchorElement
    const targetHref = (e.target as HTMLAnchorElement).getAttribute("href");

    if (targetHref) {
      smoothScrollToTarget(targetHref);
    }
  });
});

document.addEventListener("scroll", () => {
  setActiveLink();
});
