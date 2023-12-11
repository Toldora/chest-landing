import '@/styles/index.scss';

import 'virtual:svg-icons-register';
import '@/plugins';

import '@/js/global-state';
import '@/js/modal';
import '@/js/chest';
import { openSignUpModal } from '@/js/sign-up';
import '@/js/sidebar';
// import '@/js/terms-and-privacy';
import useViewportSizes from '@/js/use-viewport-sizes';
import { getFromLS, setToLS } from '@/js/local-storage';

const signUpBtnRef = document.querySelector('.js-sign-up-btn');

const titleRef = document.querySelector('h1');

const fromLS = getFromLS('myDate');

if (fromLS?.myDate) {
  titleRef.textContent = fromLS.myDate;
} else {
  setToLS('myDate', { myDate: new Date().toTimeString() });
}

useViewportSizes();

// const isLastStage = getFromLS('isLastStage');

// // if (isLastStage) {
// //   setWheelLastStage();
// //   openSignUpModal({ isBlocked: true });
// // }

signUpBtnRef.addEventListener('click', openSignUpModal);
