// 1. НАВІГАЦІЯ
function showView(viewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(v => v.style.display = 'none');
    document.getElementById(viewId).style.display = 'block';
}

// 2. ЗБЕРЕЖЕННЯ (CREATE)
function saveSecret() {
    const input = document.getElementById('secret-input');
    const fileInput = document.getElementById('camera-input');

    if (!input.value) {
        alert("Enter some text!");
        return;
    }

    const saveToStorage = (photoBase64 = "") => {
        const secrets = JSON.parse(localStorage.getItem('sentry_data') || "[]");
        const newRecord = {
            id: Date.now(),
            text: input.value,
            photo: photoBase64
        };
        secrets.push(newRecord);
        localStorage.setItem('sentry_data', JSON.stringify(secrets));

        input.value = "";
        fileInput.value = ""; // очищуємо вибір файлу
        renderVault();
        showView('view-vault');
    };

    // Обробка фото через FileReader
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => saveToStorage(e.target.result);
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        saveToStorage();
    }
}

// 3. ВІДОБРАЖЕННЯ СПИСКУ (READ)
function renderVault() {
    const list = document.getElementById('vault-list');
    const secrets = JSON.parse(localStorage.getItem('sentry_data') || "[]");

    if (secrets.length === 0) {
        list.innerHTML = "<p>No secrets in vault.</p>";
        return;
    }

    list.innerHTML = "";
    secrets.forEach(item => {
        const card = document.createElement('div');
        card.className = 'secret-card';

        let photoHtml = item.photo ? `<img src="${item.photo}">` : `<div style="width:60px"></div>`;

        card.innerHTML = `
            ${photoHtml}
            <div class="secret-text">${item.text}</div>
            <button class="del-btn" onclick="deleteSecret(${item.id})">DEL</button>
        `;
        list.appendChild(card);
    });
}

// 4. ВИДАЛЕННЯ (DELETE)
function deleteSecret(id) {
    if (confirm("Delete this record?")) {
        let secrets = JSON.parse(localStorage.getItem('sentry_data') || "[]");
        secrets = secrets.filter(s => s.id !== id);
        localStorage.setItem('sentry_data', JSON.stringify(secrets));
        renderVault();
    }
}

// 5. NATIVE APIS
function getGPS() {
    const display = document.getElementById('geo-display');
    display.innerText = "Locating...";
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            display.innerText = `LAT: ${pos.coords.latitude.toFixed(4)} | LON: ${pos.coords.longitude.toFixed(4)}`;
        },
        () => { display.innerText = "GPS Access Denied"; }
    );
}

function askNotify() {
    Notification.requestPermission().then(perm => {
        if (perm === "granted") new Notification("SentryBox: Security Shield Active");
    });
}

function wipeData() {
    if (confirm("THIS WILL WIPE EVERYTHING! Proceed?")) {
        localStorage.clear();
        renderVault();
    }
}

// ПРИ ЗАПУСКУ
window.onload = () => {
    renderVault();
    showView('view-vault');
};

// SERVICE WORKER
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}