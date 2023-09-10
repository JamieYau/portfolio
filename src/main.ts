import "./style.css";

function setHomePageHeight() {
  const header = document.querySelector("header") as HTMLHeadElement;
  const headerHeight = header.offsetHeight;
  const windowHeight = window.innerHeight;
  const homePage = document.querySelector("#home") as HTMLElement;
  homePage.style.minHeight = windowHeight - headerHeight + "px";
}

function smoothScrollToTarget(targetHref: string) {
  const header = document.querySelector("header") as HTMLHeadElement;
  const headerHeight = header.offsetHeight;

  const target = document.querySelector(targetHref);

  if (target) {
    const targetPosition = target.getBoundingClientRect().top - headerHeight;

    window.scrollTo({
      top: targetPosition + window.scrollY,
      behavior: "smooth",
    });
  }
}

// Call setHomePageHeight when the page loads
window.addEventListener("load", setHomePageHeight);

// Offset the anchor links to account for the header
const anchorLinks = document.querySelectorAll("a[href^='#']");
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
