import { throttle } from 'lodash-es';
import { openSignUpModal } from '@/js/sign-up';

const burgerBtnRef = document.querySelector('.js-burger-btn');
const sidebarRef = document.querySelector('.js-app-sidebar');
const signUpBtnRef = sidebarRef.querySelector('.js-sidebar-sign-up-btn');

const sidebarStyles = getComputedStyle(sidebarRef);

const state = {
  isOpenedSidebar: false,
  isDesktop: false,
};

const openSidebar = () => {
  state.isOpenedSidebar = true;

  sidebarRef.classList.add(
    'app-sidebar__overlay--animation',
    'app-sidebar__overlay--is-visible',
  );

  sidebarRef.addEventListener('click', onClickOverlay);
  signUpBtnRef.addEventListener('click', openSignUpModal);
};

const closeSidebar = event => {
  event?.stopPropagation();

  state.isOpenedSidebar = false;

  const delay = Number.parseFloat(sidebarStyles.transitionDuration) * 1000;

  sidebarRef.classList.remove('app-sidebar__overlay--is-visible');

  sidebarRef.removeEventListener('click', onClickOverlay);

  setTimeout(() => {
    sidebarRef.classList.remove('app-sidebar__overlay--animation');
  }, delay);
};

const onClickBurgerBtn = event => {
  if (state.isOpenedSidebar) {
    closeSidebar(event);
    burgerBtnRef.setAttribute('aria-pressed', false);
  } else {
    openSidebar();
    burgerBtnRef.setAttribute('aria-pressed', true);
  }
};

const onClickOverlay = event => {
  if (event.target !== event.currentTarget || !state.isOpenedSidebar) return;

  closeSidebar(event);
  burgerBtnRef.setAttribute('aria-pressed', false);
};

const handleResize = () => {
  const isDesktop = window.innerWidth >= 868;

  if (state.isDesktop !== isDesktop) {
    closeSidebar();
    burgerBtnRef.setAttribute('aria-pressed', false);
  }

  state.isDesktop = isDesktop;
};

const handleResizeDebounced = throttle(handleResize, 300);
handleResize();
window.addEventListener('resize', handleResizeDebounced);
burgerBtnRef.addEventListener('click', onClickBurgerBtn);
