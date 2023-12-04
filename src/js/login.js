import handlebars from 'handlebars';
import { openModal } from '@/js/modal';
import { openSignUpModal } from '@/js/sign-up';
import template from '@/partials/login-form.html?raw';
import { AUTH_FIELD } from '@/const';

const modalContentRef = document.querySelector('.js-app-modal-content');
let formRef = null;

const state = {
  isTelAuthType: true,
  isSubmitLoading: false,
};

function onChangeAuthType() {
  const isTel = this.value === AUTH_FIELD.tel;

  state.isTelAuthType = isTel;

  if (isTel) {
    formRef.classList.remove('login-form__form--auth-with-email');
    formRef.classList.add('login-form__form--auth-with-tel');
  } else {
    formRef.classList.remove('login-form__form--auth-with-tel');
    formRef.classList.add('login-form__form--auth-with-email');
  }
}

const onSubmit = async event => {
  event.preventDefault();

  try {
    if (state.isSubmitLoading) return;

    console.log('SUBMIT');

    state.isSubmitLoading = true;
    formRef.fieldset.disabled = true;
    formRef.submitBtn.textContent = 'Carregando...';

    formRef.style.minHeight = `${formRef.clientHeight}px`;

    const body = JSON.stringify({});

    // const response = await fetch(
    //   'https://idyllic-eclair-f22d90.netlify.app/api/sign-up',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body,
    //   },
    // );
    // const data = await response.json();
    // if (response.ok) {
    //   formRef.innerHTML = `<h2 class="sign-up__title">Junte-se a nós</h2>
    //   <div>Sucesso! Entraremos em contato em breve.</div>`;
    // } else {
    //   const errorRef = formRef.querySelector('.js-email-error');
    //   errorRef.textContent = data.messagePt || data.message;
    //   errorRef.classList.add('sign-up__email-error--visible');
    // }
  } catch (error) {
    formRef.innerHTML = JSON.stringify(error, null, 2);
  } finally {
    state.isSubmitLoading = false;
    if (formRef.fieldset) {
      formRef.fieldset.disabled = false;
    }
    if (formRef.submitBtn) {
      formRef.submitBtn.textContent = 'Inscrever-se';
    }
  }
};

export const openLoginModal = ({ isBlocked } = {}) => {
  const markup = handlebars.compile(template)();

  modalContentRef.innerHTML = '';
  modalContentRef.insertAdjacentHTML('beforeend', markup);

  formRef = document.forms.login;

  [...formRef[AUTH_FIELD.authType]].forEach(radioRef => {
    radioRef.addEventListener('change', onChangeAuthType);
  });
  formRef.addEventListener('submit', onSubmit);

  const signUpBtnRef = formRef.querySelector('.js-switch-to-sign-up-btn');
  signUpBtnRef.addEventListener('click', () => openSignUpModal({ isBlocked }));

  openModal({ isBlocked });
};
