import handlebars from 'handlebars';
import template from '@/partials/sign-up-form.hbs?raw';
import { openModal } from '@/js/modal';
import { openLoginModal } from '@/js//login';
import { globalState } from '@/js/global-state';
import { AUTH_FIELD } from '@/const';

const modalContentRef = document.querySelector('.js-app-modal-content');
let formRef = null;

const state = {
  isValid: false,
  isTelAuthType: true,
  isSubmitLoading: false,
};

const validate = () => {
  const { email, submitBtn, agreeCheck } = formRef;
  if (!email || !agreeCheck || !submitBtn) return;

  const isValid = email.validity.valid && agreeCheck.checked;

  state.isValid = isValid;

  if (isValid) {
    submitBtn.classList.remove('app-button--disabled');
  } else {
    submitBtn.classList.add('app-button--disabled');
  }
};

function onChangeAuthType() {
  const isTel = this.value === AUTH_FIELD.tel;

  state.isTelAuthType = isTel;

  if (isTel) {
    formRef.classList.remove('sign-up-form__form--auth-with-email');
    formRef.classList.add('sign-up-form__form--auth-with-tel');

    formRef[AUTH_FIELD.tel].required = true;
    [formRef[AUTH_FIELD.email], formRef[AUTH_FIELD.password]].forEach(ref => {
      ref.required = false;
    });
  } else {
    formRef.classList.remove('sign-up-form__form--auth-with-tel');
    formRef.classList.add('sign-up-form__form--auth-with-email');
    formRef[AUTH_FIELD.tel].required = false;
    [formRef[AUTH_FIELD.email], formRef[AUTH_FIELD.password]].forEach(ref => {
      ref.required = true;
    });
  }

  validate();
}

const onInput = () => {
  validate();
};

const onChangeCheckbox = () => {
  validate();
};

const onSubmit = async event => {
  event.preventDefault();

  try {
    if (!state.isValid || state.isSubmitLoading) return;

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

export const openSignUpModal = ({ isBlocked } = {}) => {
  const markup = handlebars.compile(template)({
    chestStage: globalState.chestStage,
  });

  modalContentRef.innerHTML = '';
  modalContentRef.insertAdjacentHTML('beforeend', markup);

  formRef = document.forms.signUp;

  [...formRef[AUTH_FIELD.authType]].forEach(radioRef => {
    radioRef.addEventListener('change', onChangeAuthType);
  });
  [
    formRef[AUTH_FIELD.tel],
    formRef[AUTH_FIELD.email],
    formRef[AUTH_FIELD.password],
  ].forEach(ref => {
    ref.addEventListener('input', onInput);
  });
  formRef.agreeCheck.addEventListener('change', onChangeCheckbox);
  formRef.addEventListener('submit', onSubmit);

  const loginBtnRef = formRef.querySelector('.js-switch-to-login-btn');
  loginBtnRef.addEventListener('click', () => openLoginModal({ isBlocked }));

  openModal({ isBlocked });
};
