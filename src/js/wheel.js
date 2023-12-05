import { globalState } from '@/js/global-state';
// import { setToLS } from '@/js/local-storage';
// import { openSignUpModal } from '@/js/sign-up';

const wheelRef = document.querySelector('.js-wheel');
const chestSectionRef = document.querySelector('.js-chest-section');
const bonusTriesRef = document.querySelector('.js-bonus-tries');
const bodyRef = document.body;
const wheelMainPartRef = wheelRef.querySelector('.js-wheel-main-part');
const wheelMainPartStyles = getComputedStyle(wheelMainPartRef);

const state = {
  isSpinning: false,
};

const onClickWheel = () => {
  if (state.isSpinning) return;

  state.isSpinning = true;

  switch (globalState.wheelStage) {
    case 1:
      wheelRef.classList.add('wheel--spinning-1');
      break;

    case 2:
      wheelRef.classList.add('wheel--spinning-2');
      break;

    default:
      break;
  }

  const delay = Number.parseFloat(wheelMainPartStyles.animationDuration) * 1000;

  setTimeout(() => {
    switch (globalState.wheelStage) {
      case 1:
        bodyRef.classList.add('wheel-stage-2');
        bodyRef.classList.remove('wheel-stage-1');
        wheelRef.classList.remove('wheel--spinning-1');
        chestSectionRef.classList.add('chest-section--visible-first-bonus');
        bonusTriesRef.textContent = '1';
        globalState.wheelStage += 1;

        break;

      case 2:
        bodyRef.classList.add('wheel-stage-3');
        bodyRef.classList.remove('wheel-stage-2');
        wheelRef.classList.remove('wheel--spinning-2');
        chestSectionRef.classList.add('chest-section--visible-second-bonus');
        bonusTriesRef.textContent = '0';
        globalState.wheelStage += 1;

        // setToLS('isLastStage', globalState.isLastStage);
        // openSignUpModal({ isBlocked: true });

        break;

      default:
        break;
    }

    state.isSpinning = false;
  }, delay);
};

export const setWheelLastStage = () => {
  bodyRef.classList.add('wheel-stage-3');
  bodyRef.classList.remove('wheel-stage-1');
  chestSectionRef.classList.add(
    'chest-section--visible-first-bonus',
    'chest-section--visible-second-bonus',
  );
  bonusTriesRef.textContent = '0';
  globalState.wheelStage = 3;
};

wheelRef.addEventListener('click', onClickWheel);
