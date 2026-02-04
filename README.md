# SentryBox — Secure PWA Vault 🛡️

**SentryBox** to progresywna aplikacja internetowa (PWA) służąca do bezpiecznego przechowywania notatek tekstowych oraz dowodów w formie zdjęć. Projekt demonstruje wykorzystanie nowoczesnych technologii webowych w celu stworzenia doświadczenia użytkownika zbliżonego do natywnych aplikacji mobilnych.

## 🚀 Kluczowe funkcje (zrealizowane kryteria):
* **Offline First**: Dzięki zastosowaniu Service Workera aplikacja działa bez dostępu do Internetu.
* **Native APIs**: Wykorzystanie kamery do robienia zdjęć, geolokalizacji (GPS) oraz powiadomień systemowych (Notifications).
* **Data Management**: Pełny cykl zarządzania danymi (Create, Read, Delete) z wykorzystaniem LocalStorage.
* **PWA**: Możliwość instalacji aplikacji na ekranie głównym smartfona.

## 📂 Struktura projektu:
* `index.html` — Główna struktura aplikacji. Zrealizowana jako SPA (Single Page Application), gdzie widoki przełączane są dynamicznie bez odświeżania strony.
* `style.css` — Stylizacja w klimacie "Security Terminal". Odpowiada za responsywność interfejsu (RWD) na urządzeniach mobilnych.
* `app.js` — Logika aplikacji. Zawiera funkcje obsługi bazy danych przeglądarki, przetwarzanie zdjęć przez `FileReader` oraz dostęp do sensorów (GPS, powiadomienia).
* `sw.js` (Service Worker) — Zarządza buforowaniem (cache) plików, umożliwiając pracę w trybie offline.
* `manifest.json` — Plik konfiguracyjny PWA, pozwalający systemowi rozpoznać witrynę jako aplikację (ikona, nazwa, kolor motywu).

## 🛠️ Jak uruchomić i testować:
1.  **Na komputerze**: Otwórz link przez GitHub Pages. Aby sprawdzić status PWA, użyj narzędzia `Lighthouse` (F12 w Chrome) -> `Analyze page load`.
2.  **Na smartfonie**: Otwórz link w Chrome (Android) lub Safari (iOS). Wybierz opcję „Dodaj do ekranu głównego”.
3.  **Tryb Offline**: Po zainstalowaniu włącz „Tryb samolotowy” i uruchom aplikację — będzie działać poprawnie dzięki zapisanym danym w pamięci podręcznej.

## 📝 Wyjaśnienie logiki (na potrzeby obrony projektu):
* **Przechowywanie danych**: Dane są zapisywane w `localStorage` w formacie JSON. Zdjęcia są konwertowane do formatu `Base64`, co pozwala na ich przechowywanie bezpośrednio w pamięci przeglądarki.
* **Prywatność**: Aplikacja działa wyłącznie po stronie klienta (Client-side). Dane nigdy nie opuszczają urządzenia użytkownika i nie są wysyłane na żaden serwer zewnętrzny.
