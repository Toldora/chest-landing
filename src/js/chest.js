import { globalState } from '@/js/global-state';
import { runFirstChestAnimation } from '@/plugins/swiper';
// import { setToLS } from '@/js/local-storage';
// import { openSignUpModal } from '@/js/sign-up';

const chestSectionRef = document.querySelector('.js-chest-section');
const chestRef = chestSectionRef.querySelector('.js-main-chest');
const openChestBtnRef = chestSectionRef.querySelector('.js-open-chest-btn');
const bonusTriesRef = chestSectionRef.querySelector('.js-bonus-tries');
const bodyRef = document.body;

const state = {
  isOpening: false,
};

const onClickChest = () => {
  if (state.isOpening) return;

  state.isOpening = true;

  // switch (globalState.chestStage) {
  //   case 1:
  //     wheelRef.classList.add('wheel--spinning-1');
  //     break;

  //   case 2:
  //     wheelRef.classList.add('wheel--spinning-2');
  //     break;

  //   default:
  //     break;
  // }

  // const delay =
  // Number.parseFloat(wheelMainPartStyles.animationDuration) * 1000;

  setTimeout(() => {
    switch (globalState.chestStage) {
      case 1:
        bodyRef.classList.add('chest-stage-2');
        bodyRef.classList.remove('chest-stage-1');
        // chestRef.classList.remove('wheel--spinning-1');
        chestSectionRef.classList.add('chest-section--visible-first-bonus');
        bonusTriesRef.textContent = '1';
        globalState.chestStage += 1;

        break;

      case 2:
        bodyRef.classList.add('chest-stage-3');
        bodyRef.classList.remove('chest-stage-2');
        // chestRef.classList.remove('wheel--spinning-2');
        chestSectionRef.classList.add('chest-section--visible-second-bonus');
        bonusTriesRef.textContent = '0';
        globalState.chestStage += 1;

        // setToLS('isLastStage', globalState.isLastStage);
        // openSignUpModal({ isBlocked: true });

        break;

      default:
        break;
    }

    state.isOpening = false;
  }, 1000);
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

chestRef.addEventListener('click', runFirstChestAnimation);
openChestBtnRef.addEventListener('click', runFirstChestAnimation);
// chestRef.addEventListener('click', onClickChest);
// openChestBtnRef.addEventListener('click', onClickChest);
