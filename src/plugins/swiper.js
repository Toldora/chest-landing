import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const params = {
  modules: [Navigation, Pagination],
  initialSlide: 8,
  loop: true,
  loopPreventsSliding: false,
  centeredSlides: false,
  allowTouchMove: true,
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: 15,
  autoplay: false,
  speed: 500,
  breakpoints: {
    540: {
      slidesPerView: 3,
      centeredSlides: true,
    },
    700: {
      slidesPerView: 'auto',
      centeredSlides: true,
    },
    868: {
      slidesPerView: 'auto',
      centeredSlides: true,
      allowTouchMove: false,
      grabCursor: false,
    },
  },
  preventInteractionOnTransition: false,
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
