import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const onFormSubmitData = {};
  const data = new FormData(event.currentTarget);
  data.forEach((value, name) => {
    onFormSubmitData[name.trim()] = value.trim();
  });
  let amount = Number(onFormSubmitData.amount);
  let delay = Number(onFormSubmitData.delay);
  let step = Number(onFormSubmitData.step);

  if (amount < 0 || delay < 0 || step < 0) {
    Notiflix.Notify.warning("Значення не можуть бути від'ємними.");
    return;
  }

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
