const navToggle = document.querySelector(".hamburger")
const navWrapper = document.querySelector(".header-nav")
const logoDark = document.querySelector(".dark")
const logoLight = document.querySelector(".light")
const header = document.querySelector(".navigation-responsive")

navToggle.addEventListener("click", function () {
    if (navWrapper.classList.contains("active")) {
        this.setAttribute("aria-expanded", "false");
        this.setAttribute("aria-label", "menu");
        navWrapper.classList.remove("active");
        navToggle.classList.remove("is-active")
        logoDark.classList.remove("logo-disable")
        logoLight.classList.add("logo-disable")
        header.classList.remove('nav-active')
    } else {
        navWrapper.classList.add("active");
        navToggle.classList.add("is-active")
        logoDark.classList.add("logo-disable")
        header.classList.add('nav-active')
        logoLight.classList.remove("logo-disable")
        this.setAttribute("aria-label", "close menu");
        this.setAttribute("aria-expanded", "true");
    }
});