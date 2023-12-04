import '@/styles/index.scss';

import 'virtual:svg-icons-register';
import '@/plugins';

import '@/js/global-state';
import '@/js/modal';
import { setWheelLastStage } from '@/js/wheel';
import '@/js/sign-up';
import '@/js/sidebar';
import '@/js/terms-and-privacy';
import { openSignUpModal } from '@/js/sign-up';
import useViewportSizes from '@/js/use-viewport-sizes';
import { getFromLS } from '@/js/local-storage';

const signUpBtnRef = document.querySelector('.js-sign-up-btn');

useViewportSizes();

const isLastStage = getFromLS('isLastStage');

// if (isLastStage) {
//   setWheelLastStage();
//   openSignUpModal({ isBlocked: true });
// }

signUpBtnRef.addEventListener('click', openSignUpModal);
