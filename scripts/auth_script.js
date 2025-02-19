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

loginButton.addEventListener('click', function() {
    const advertiserId = advertiserIdInput.value;
    const advertiserName = advertiserNameInput.value;

    if (advertiserId && advertiserName) {
        const data = {
            advertiserId: advertiserId,
            advertiserName: advertiserName
        };

        console.log("Отправка данных в Telegram:", data);
        try {
            Telegram.WebApp.sendData(JSON.stringify(data));
            Telegram.WebApp.close();
        } catch (e) {
            console.error("Ошибка отправки данных в WebApp:", e);
        }
    }
});
