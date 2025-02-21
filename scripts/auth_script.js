const loginButton = document.getElementById('loginButton');
const advertiserIdInput = document.getElementById('advertiserId');
const advertiserNameInput = document.getElementById('advertiserName');

const checkFields = () => {
    if (advertiserIdInput.value && advertiserNameInput.value) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
};

advertiserIdInput.addEventListener('input', checkFields);
advertiserNameInput.addEventListener('input', checkFields);

advertiserIdInput.setAttribute("enterkeyhint", "done");
advertiserIdInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        advertiserIdInput.blur();
    }
});

advertiserNameInput.setAttribute("enterkeyhint", "done");
advertiserNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        advertiserNameInput.blur();
    }
});

loginButton.addEventListener('click', function() {
    const advertiserId = advertiserIdInput.value;
    const advertiserName = advertiserNameInput.value;

    if (advertiserId && advertiserName) {
        const data = {
            advertiserId: advertiserId,
            advertiserName: advertiserName
        };
        
        Telegram.WebApp.sendData(JSON.stringify(data));
        Telegram.WebApp.close();
    }
});
