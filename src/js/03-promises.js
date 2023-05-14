import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  // Перевірка на від'ємні числа
  if (+refs.delayInput.value < 0 || +refs.stepInput.value < 0 || +refs.amountInput.value < 0) {
    Notify.warning("Please enter only positive numbers");
  } else if (+refs.amountInput.value === 0) {
    Notify.warning("Please enter a value greater than 0 in the amount field");
  } else {
    let delay = parseInt(refs.delayInput.value);
    let step = parseInt(refs.stepInput.value);
    let amount = parseInt(refs.amountInput.value);
    
    for (let i = 1; i <= amount; i++) {
      if(i === 1) {
        createPromise(i, delay).then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }).catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      } else {
        createPromise(i, delay + step * (i - 1)).then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }).catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      };
    };
  };
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}



