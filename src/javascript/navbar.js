export function initializeNavbar() {
  const links = document.querySelectorAll(".nav-item");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      const navLink = link.querySelector(".nav-link");
      links.forEach((item) => {
        const itemNavLink = item.querySelector(".nav-link");
        if (itemNavLink) {
          itemNavLink.classList.remove("active");
        }
      });
      navLink.classList.add("active");
    });
  });
}
