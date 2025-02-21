document.addEventListener("DOMContentLoaded", function () {
    Telegram.WebApp.expand();

    const form = document.getElementById("adForm");

    form.querySelectorAll('input[type="text"], input[type="number"]').forEach((inputEl) => {
        inputEl.setAttribute("enterkeyhint", "done");
        inputEl.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                inputEl.blur();
            }
        });
    });
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            impressions_limit: parseInt(document.getElementById("impressions_limit").value) || null,
            clicks_limit: parseInt(document.getElementById("clicks_limit").value) || null,
            cost_per_impression: parseFloat(document.getElementById("cost_per_impression").value) || null,
            cost_per_click: parseFloat(document.getElementById("cost_per_click").value) || null,
            ad_title: document.getElementById("ad_title").value || null,
            ad_text: document.getElementById("ad_text").value || null,
            start_date: parseInt(document.getElementById("start_date").value) || null,
            end_date: parseInt(document.getElementById("end_date").value) || null,
            targeting: {
                gender: document.getElementById("gender").value || null,
                age_from: parseInt(document.getElementById("age_from").value) || null,
                age_to: parseInt(document.getElementById("age_to").value) || null,
                location: document.getElementById("location").value || null,
            }
        };

        Telegram.WebApp.sendData(JSON.stringify(formData));
        Telegram.WebApp.close()
    });
});
