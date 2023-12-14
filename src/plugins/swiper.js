import { register } from 'swiper/element/bundle';
register();

const swiperEl = document.querySelector('.js-chance-swiper');

const params = {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 15,
  autoplay: false,
  speed: 1000,
  allowTouchMove: false,
  a11y: {
    slideRole: 'listitem',
    containerRoleDescriptionMessage: 'Lista de possíveis bônus',
    itemRoleDescriptionMessage: 'Possível bônus',
  },
};

Object.assign(swiperEl, params);

swiperEl.initialize();

const nextBtnRef = document.querySelector('.chance-section__swiper-btn--next');
const prevBtnRef = document.querySelector('.chance-section__swiper-btn--prev');

nextBtnRef.addEventListener('click', () => {
  swiperEl.swiper.slideNext();
});

prevBtnRef.addEventListener('click', () => {
  swiperEl.swiper.slidePrev();
});
