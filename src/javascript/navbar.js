// export function initializeNavbar() {
//   const links = document.querySelectorAll(".nav-item");
//   const toggler = document.querySelector(".navbar-toggler");
//   const offCanvas = document.getElementById("offCanvas");
//   const closeCanva = document.getElementById("closeBtn");
//   const overlay = document.getElementById("overlay");

//   links.forEach((link) => {
//     link.addEventListener("click", function () {
//       const navLink = link.querySelector(".nav-link");
//       links.forEach((item) => {
//         const itemNavLink = item.querySelector(".nav-link");
//         if (itemNavLink) {
//           itemNavLink.classList.remove("active");
//         }
//       });
//       navLink.classList.add("active");
//     });
//   });

//   function handleToggler() {
//     if (offCanvas && overlay) {
//       offCanvas.classList.add("open");
//       overlay.classList.add("show");
//     }
//   }

//   if (toggler) toggler.addEventListener("click", handleToggler);

//   function handleCloseBtn() {
//     offCanvas.classList.remove("open");
//     overlay.classList.remove("show");
//   }

//   if (closeCanva) closeCanva.addEventListener("click", handleCloseBtn);
//   if (overlay) overlay.addEventListener("click", handleCloseBtn);

//   // Nettoyage des listeners
//   return function cleanupNavbar() {
//     // No nav-link click listeners to clean up
//     if (toggler) toggler.removeEventListener("click", handleToggler);
//     if (closeCanva) closeCanva.removeEventListener("click", handleCloseBtn);
//     if (overlay) overlay.removeEventListener("click", handleCloseBtn);
//   };
// }
