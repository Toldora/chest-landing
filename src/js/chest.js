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
    timeout: 2500,
    eventFunction: swiper => {
      swiper.slidePrev(90);
    },
  },
  {
    timingFunction: 'linear',
    timeout: 1300,
    eventFunction: swiper => {
      swiper.slidePrev(140);
    },
  },
  {
    timingFunction: 'linear',
    timeout: 900,
    eventFunction: swiper => {
      swiper.slidePrev(200);
    },
  },
  {
    timingFunction: 'linear',
    timeout: 1800,
    eventFunction: swiper => {
      const { realIndex } = swiper;
      if (
        realIndex === FIRST_WINNER_SLIDE_INDEX ||
        realIndex === FIRST_WINNER_SLIDE_INDEX + TOTAL_SLIDES_QUANTITY
      ) {
        return;
      } else {
        swiper.slidePrev(250);
      }
    },
  },
];

const SECOND_ANIMATION_STEPS = [
  {
    timingFunction: 'linear',
    timeout: 2300,
    eventFunction: swiper => {
      swiper.slideNext(90);
    },
  },
  {
    timingFunction: 'linear',
    timeout: 1100,
    eventFunction: swiper => {
      swiper.slideNext(140);
    },
  },
  {
    timingFunction: 'linear',
    timeout: 1300,
    eventFunction: swiper => {
      swiper.slideNext(200);
    },
  },
  {
    timingFunction: 'linear',
    timeout: 1800,
    eventFunction: swiper => {
      const { realIndex } = swiper;
      if (
        realIndex === SECOND_WINNER_SLIDE_INDEX ||
        realIndex === SECOND_WINNER_SLIDE_INDEX + TOTAL_SLIDES_QUANTITY
      ) {
        return;
      } else {
        swiper.slideNext(250);
      }
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
    document.documentElement.style.setProperty(
      '--swiper-wrapper-transition-timing-function',
      'cubic-bezier(0.55, 0.06, 0.68, 0.19)',
    );

    swiper.slidePrev(500);
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
    document.documentElement.style.setProperty(
      '--swiper-wrapper-transition-timing-function',
      'cubic-bezier(0.55, 0.06, 0.68, 0.19)',
    );

    swiper.slideNext(500);
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

        setTimeout(() => {
          openSignUpModal({ isBlocked: true });
        }, 500);

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
