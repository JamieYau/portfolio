import "./style.css";

function setSectionHeight(sections: HTMLElement[]) {
  const header = document.querySelector("header") as HTMLHeadElement;
  const headerHeight = header.offsetHeight;
  const windowHeight = window.innerHeight;
  let footerHeight = 0;
  for (let section of sections) {
    if (section.id === "contact") {
      const footer = document.querySelector("footer") as HTMLElement;
      footerHeight = footer.offsetHeight;
    }
    section.style.minHeight = windowHeight - headerHeight - footerHeight + "px";
  }
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
    const sectionTop = section.offsetTop - headerHeight; // Adjust for header height

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
  const homePage = document.querySelector("#home") as HTMLElement;
  const contact = document.querySelector("#contact") as HTMLElement;
  setSectionHeight([homePage, contact]);
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
