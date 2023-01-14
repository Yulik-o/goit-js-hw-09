import Notiflix from 'notiflix';

const formEl = document.querySelector('form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

let delay = Number(inputDelay.value);
let step = Number(inputStep.value);
let amount = Number(inputAmount.value);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
setTimeout(() => {
   if (shouldResolve) {
    resolve({ position, delay })
  } else 
  reject({ position, delay })
}, delay)
  })
return promise; 
}

for (let promiseId = 0; promiseId < amount; promiseId += 1) {
  createPromise(promiseId + 1, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  delay = delay + step
}
}