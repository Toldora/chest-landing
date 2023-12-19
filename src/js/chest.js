import { globalState } from '@/js/global-state';
import { setToLS } from '@/js/local-storage';
import { openSignUpModal } from '@/js/sign-up';

const chestSectionRef = document.querySelector('.js-chest-section');
const chestRef = chestSectionRef.querySelector('.js-main-chest');
const openChestBtnRef = chestSectionRef.querySelector('.js-open-chest-btn');
const bonusTriesRef = chestSectionRef.querySelector('.js-bonus-tries');
const swiper = document.querySelector('.js-chance-swiper').swiper;
const bodyRef = document.body;

const state = {
  isOpening: false,
  animationStep: 0,
  prevProgressLoop: 0,
};

const TOTAL_SLIDES_QUANTITY = 7;
const FIRST_WINNER_SLIDE_INDEX = 3;
const SECOND_WINNER_SLIDE_INDEX = 1;

const FIRST_ANIMATION_STEPS = [
  {
    timingFunction: 'linear',
    timeout: 3000,
    eventFunction: swiper => {
      swiper.slidePrev(60);
    },
  },
  {
    timingFunction: 'linear',
    timeout: 1500,
    eventFunction: swiper => {
      swiper.slidePrev(120);
    },
  },
  {
    slideIndex: FIRST_WINNER_SLIDE_INDEX,
    timingFunction: 'cubic-bezier(0.04, 0.25, 0, 1.74)',
    timeout: 2000,
    eventFunction: swiper => {
      const { progressLoop, slides } = swiper;
      const index =
        progressLoop > 0.5
          ? FIRST_WINNER_SLIDE_INDEX
          : FIRST_WINNER_SLIDE_INDEX + TOTAL_SLIDES_QUANTITY;

      swiper.slideToLoop(index, 2000);

      setTimeout(() => {
        const winnerSlide = slides[index];
        winnerSlide.classList.add(
          'chance-section__swiper-slide--chosen',
          'chance-section__swiper-slide--chosen-1',
        );
      }, 2000);
    },
  },
];

const SECOND_ANIMATION_STEPS = [
  {
    timingFunction: 'linear',
    timeout: 2800,
    speed: 60,
    eventFunction: swiper => {
      swiper.slideNext(60);
    },
  },
  {
    timingFunction: 'linear',
    timeout: 1000,
    speed: 120,
    eventFunction: swiper => {
      swiper.slideNext(120);
    },
  },
  {
    slideIndex: SECOND_WINNER_SLIDE_INDEX + 1,
    timingFunction: 'cubic-bezier(0.04, 0.25, 0, 1.74)',
    timeout: 2000,
    eventFunction: swiper => {
      const { progressLoop } = swiper;
      state.prevProgressLoop = progressLoop;
      const index =
        progressLoop > 0.5
          ? SECOND_WINNER_SLIDE_INDEX - 1
          : SECOND_WINNER_SLIDE_INDEX - 1 + TOTAL_SLIDES_QUANTITY;

      swiper.slideToLoop(index, 2000);
    },
  },
  {
    slideIndex: SECOND_WINNER_SLIDE_INDEX,
    timingFunction: 'ease',
    timeout: 700,
    eventFunction: swiper => {
      const { slides } = swiper;
      const index =
        state.prevProgressLoop > 0.5
          ? SECOND_WINNER_SLIDE_INDEX
          : SECOND_WINNER_SLIDE_INDEX + TOTAL_SLIDES_QUANTITY;

      swiper.slideToLoop(index, 700);

      setTimeout(() => {
        const winnerSlide = slides[index];
        winnerSlide.classList.add(
          'chance-section__swiper-slide--chosen',
          'chance-section__swiper-slide--chosen-2',
        );
      }, 700);
    },
  },
];

const resetSwiperTransitionFunction = () => {
  document.documentElement.style.setProperty(
    '--swiper-wrapper-transition-timing-function',
    'initial',
  );
};

const runFirstChestAnimation = () => {
  if (!swiper) return;

  const step = FIRST_ANIMATION_STEPS[state.animationStep];

  if (!step) {
    state.animationStep = 0;
    return;
  }

  swiper.on('slideChangeTransitionEnd', step.eventFunction);

  if (!state.animationStep) {
    resetSwiperTransitionFunction();

    swiper.slidePrev(800);
  }

  document.documentElement.style.setProperty(
    '--swiper-wrapper-transition-timing-function',
    step.timingFunction,
  );

  setTimeout(() => {
    swiper.off('slideChangeTransitionEnd', step.eventFunction);
    state.animationStep += 1;
    resetSwiperTransitionFunction();

    runFirstChestAnimation();
  }, step.timeout);
};

const runSecondChestAnimation = () => {
  if (!swiper) return;

  const step = SECOND_ANIMATION_STEPS[state.animationStep];

  if (!step) {
    state.animationStep = 0;
    return;
  }

  swiper.on('slideChangeTransitionEnd', step.eventFunction);

  if (!state.animationStep) {
    resetSwiperTransitionFunction();

    swiper.slideNext(800);
  }

  document.documentElement.style.setProperty(
    '--swiper-wrapper-transition-timing-function',
    step.timingFunction,
  );

  setTimeout(() => {
    swiper.off('slideChangeTransitionEnd', step.eventFunction);
    state.animationStep += 1;
    resetSwiperTransitionFunction();

    runSecondChestAnimation();
  }, step.timeout);
};

const onClickChest = () => {
  if (state.isOpening || globalState.isLastStage) return;

  state.isOpening = true;
  bodyRef.classList.add('is-chest-animating');

  switch (globalState.chestStage) {
    case 1:
      runFirstChestAnimation();
      break;

    case 2:
      runSecondChestAnimation();
      break;

    default:
      break;
  }

  setTimeout(() => {
    switch (globalState.chestStage) {
      case 1:
        bodyRef.classList.add('chest-stage-2');
        bodyRef.classList.remove('chest-stage-1');
        chestSectionRef.classList.add('chest-section--visible-first-bonus');
        bonusTriesRef.textContent = '1';
        globalState.chestStage += 1;

        break;

      case 2:
        bodyRef.classList.add('chest-stage-3');
        bodyRef.classList.remove('chest-stage-2');
        chestSectionRef.classList.add('chest-section--visible-second-bonus');
        bonusTriesRef.textContent = '0';
        globalState.chestStage += 1;

        setToLS('isLastStage', globalState.isLastStage);
        openSignUpModal({ isBlocked: true });

        break;

      default:
        break;
    }

    bodyRef.classList.remove('is-chest-animating');
    state.isOpening = false;
  }, 6500);
};

export const setChestLastStage = () => {
  bodyRef.classList.add('chest-stage-3');
  bodyRef.classList.remove('chest-stage-1');
  chestSectionRef.classList.add(
    'chest-section--visible-first-bonus',
    'chest-section--visible-second-bonus',
  );
  bonusTriesRef.textContent = '0';
  globalState.chestStage = 3;
};

chestRef.addEventListener('click', onClickChest);
openChestBtnRef.addEventListener('click', onClickChest);
