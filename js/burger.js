const burger = document.querySelector('#burger');
const burgerClose = document.querySelector('#burger-close');
const menu = document.querySelector('.nav__list');
const links = [...document.querySelectorAll('.nav__link')];

let closeMenu = () => {
  menu.classList.remove('nav__list_open');

  if (menu.classList.contains('nav__list_open')) {
    disableScroll();
  } else {
    enableScroll();
  }
}

let openMenu = () => {
  menu.classList.add('nav__list_open');

  if (menu.classList.contains('nav__list_open')) {
    disableScroll();
  } else {
    enableScroll();
  }
}

function disableScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.userSelect = "none";
}

function enableScroll() {
  document.body.style.overflow = "auto";
  document.body.style.userSelect = "auto";
}

burger.addEventListener('click', openMenu);

burgerClose.addEventListener('click', closeMenu);

links.forEach((el) => el.addEventListener('click', closeMenu));
