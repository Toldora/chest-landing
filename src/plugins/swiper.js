import { register } from 'swiper/element/bundle';
register();

const swiperEl = document.querySelector('.js-chance-swiper');

const params = {
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 15,
  autoplay: false,
  speed: 1000,
  allowTouchMove: false,
  allowSlideNext: true,
  preventInteractionOnTransition: false,
  // autoplay: {
  //   delay: 500,
  //   waitForTransition: false,
  //   disableOnInteraction: false,
  // },
  slideActiveClass: 'chance-section__swiper-slide--chosen',
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

export const runFirstChestAnimation = () => {
  const { swiper } = swiperEl;
  if (!swiper) return;

  swiper.slideToLoop(0, 100);

  let counter = 0;

  const interval = setInterval(() => {
    if (counter > 20) {
      clearInterval(interval);
      return;
    }

    swiper.slideNext(200);
    // swiper.slideToLoop(swiper.realIndex + 1, 100);
    console.log('add');
    counter += 1;
  }, 200);
};

// setTimeout(() => {
//   runFirstChestAnimation();
// }, 1000);
