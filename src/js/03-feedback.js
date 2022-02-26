var throttle = require('lodash.throttle')

const LOCAL_STORAGE_KEY = "feedback-form-state";

const feedbackForm = document.querySelector(".feedback-form");

// lets add event listener and set local key
feedbackForm.addEventListener('input', throttle(e => {
    const inputText = { email: `${feedbackForm["email"].value}`, message: `${feedbackForm["message"].value}` };
    const localStorageText = JSON.stringify(inputText);

     localStorage.setItem(LOCAL_STORAGE_KEY, localStorageText);
}, 500)
);


const localSavedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

// resolves sudden reload problem
if (localSavedData !== null) {
    feedbackForm["email"].value = localSavedData.email;
    feedbackForm["message"].value = localSavedData.message;
}

// clears local storage after submit form and resets form
feedbackForm.addEventListener('submit', (data => {
    data.preventDefault();
    feedbackForm.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
})
)





