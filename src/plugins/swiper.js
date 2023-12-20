import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const params = {
  modules: [Navigation, Pagination],
  initialSlide: 8,
  loop: true,
  loopPreventsSliding: false,
  spaceBetween: 15,
  autoplay: false,
  speed: 500,
  breakpoints: {
    1: {
      slidesPerView: 2,
      centeredSlides: false,
      allowTouchMove: true,
      grabCursor: true,
    },
    540: {
      slidesPerView: 3,
      centeredSlides: true,
      allowTouchMove: true,
      grabCursor: true,
    },
    700: {
      slidesPerView: 'auto',
      centeredSlides: true,
      allowTouchMove: true,
      grabCursor: true,
    },
    868: {
      slidesPerView: 'auto',
      centeredSlides: true,
      allowTouchMove: false,
      grabCursor: false,
    },
  },
  preventInteractionOnTransition: false,
  slideActiveClass: 'chance-section__swiper-slide--chosen',
  navigation: {
    nextEl: '.chance-section__swiper-btn--next',
    prevEl: '.chance-section__swiper-btn--prev',
  },
  pagination: {
    el: '.chance-section__pagination',
    dynamicBullets: true,
    dynamicMainBullets: 7,
    renderBullet: (_, className) => {
      return `<span class="${className} chance-section__pagination-bullet"></span>`;
    },
  },
  a11y: {
    slideRole: 'listitem',
    containerRoleDescriptionMessage: 'Lista de possíveis bônus',
    itemRoleDescriptionMessage: 'Possível bônus',
  },
};

new Swiper('.js-chance-swiper', params);
