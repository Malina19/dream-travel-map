# 🗺️ Dream Travel Map

> Interaktywna aplikacja webowa do śledzenia Twoich podróży po świecie

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**🎓 Projekt Szkoleniowy** - To jest projekt edukacyjny stworzony w celu nauki i praktykowania nowoczesnych technologii webowych oraz prezentacji umiejętności w portfolio.


## 🌟 O Projekcie

Dream Travel Map to **osobista aplikacja do śledzenia podróży**, która pozwala użytkownikom wizualizować i zarządzać swoimi doświadczeniami podróżniczymi na interaktywnej mapie świata. Użytkownicy mogą oznaczać kraje, które odwiedzili, utrzymywać listę marzeń przyszłych destynacji oraz śledzić szczegółowe statystyki dotyczące swoich globalnych eksploracji.

### 🎯 Cele MVP

To Minimum Viable Product (MVP) skupia się na podstawowych funkcjonalnościach:
- ✅ Oznaczanie odwiedzonych krajów na interaktywnej mapie
- ✅ Prowadzenie listy odwiedzonych krajów z funkcją wyszukiwania
- ✅ Śledzenie statystyk podróży (kraje, kontynenty, % pokrycia świata)
- ✅ Lista życzeń przyszłych destynacji
- ✅ Trwałość danych dzięki localStorage

---

## ✨ Główne Funkcjonalności

### 🗺️ Interaktywna Mapa Świata
- **Kliknij aby dodać** - Kliknij dowolny kraj aby oznaczyć go jako odwiedzony
- **Zoom i przeciąganie** - Pełne przybliżanie i przesuwanie mapy
- **Podpowiedzi** - Najedź na kraj aby zobaczyć jego nazwę
- **Wizualny feedback** - Odwiedzone kraje podświetlone na niebiesko

### 📊 Statystyki Podróży
- **Odwiedzone Kraje** - Śledź ile z 195 krajów świata już odwiedziłeś
- **Kontynenty** - Zobacz które kontynenty zwiedzałeś (na 7)
- **Pokrycie Świata** - Wizualny pasek postępu pokazujący % zwiedzanego świata
- **Licznik Listy Życzeń** - Śledź swoje wymarzone destynacje

### 🔍 Inteligentne Wyszukiwanie
- **Filtrowanie w czasie rzeczywistym** - Przeszukuj swoje odwiedzone kraje
- **Podświetlone wyniki** - Pasujący tekst podświetlony na żółto
- **Bez rozróżniania wielkości liter** - Znajdź kraje niezależnie od pisowni
- **Licznik wyników** - Zobacz ile krajów pasuje do wyszukiwania

### ✅ Walidacja Formularzy
- **Zapobieganie duplikatom** - Nie można dodać tego samego kraju dwa razy
- **Tylko prawdziwe kraje** - Akceptowane są tylko nazwy rzeczywistych krajów
- **Normalizacja wielkości liter** - Automatyczne formatowanie nazw krajów
- **Przyjazne komunikaty błędów** - Przejrzyste komunikaty wyświetlane inline

### 💾 Trwałość Danych
- **Automatyczny zapis** - Wszystkie zmiany automatycznie zapisywane w przeglądarce
- **Bez konieczności logowania** - Działa offline, nie wymaga konta
- **Natychmiastowe przywracanie** - Dane zachowują się między sesjami przeglądarki

---

## 🛠️ Technologie

### Frontend
- **[React 18](https://reactjs.org/)** - Nowoczesna biblioteka UI
- **[Vite](https://vitejs.dev/)** - Szybkie narzędzie do budowania i serwer dev
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS oparty na klasach użytkowych
- **[react-simple-maps](https://www.react-simple-maps.io/)** - Interaktywne mapy SVG

### Dane i Stan
- **localStorage API** - Przechowywanie danych w przeglądarce
- **React Hooks** - useState, useEffect do zarządzania stanem

### Deployment
- **GitHub Pages** - Darmowy hosting
- **GitHub Actions** - Automatyczne wdrażanie

---

## 🚀 Jak Zacząć

### Wymagania
- Node.js 20.x lub wyższy
- npm lub yarn

### Instalacja

1. **Sklonuj repozytorium**
```bash
   git clone https://github.com/Malina19/dream-travel-map.git
   cd dream-travel-map
```

2. **Zainstaluj zależności**
```bash
   npm install
```

3. **Uruchom serwer deweloperski**
```bash
   npm run dev
```

4. **Otwórz w przeglądarce**
```
   http://localhost:5173
```

### Build Produkcyjny
```bash
npm run build
```

Pliki gotowe do produkcji znajdą się w folderze `dist/`.

---

## 📚 Czego Się Nauczyłem

Budowanie tego projektu pomogło mi przećwiczyć i nauczyć się:

### Podstawy React
- ✅ **Architektura komponentów** - Dzielenie UI na komponenty wielokrotnego użytku
- ✅ **Zarządzanie stanem** - Używanie hooków useState i useEffect
- ✅ **Przekazywanie props** - Komunikacja między komponentami
- ✅ **Obsługa zdarzeń** - onClick, onChange, onKeyPress

### Umiejętności JavaScript
- ✅ **Metody tablic** - map, filter, some, includes
- ✅ **Manipulacja stringami** - toLowerCase, split, join, trim
- ✅ **Logika warunkowa** - Złożone wzorce walidacji
- ✅ **localStorage API** - Zarządzanie pamięcią przeglądarki

### CSS i Stylowanie
- ✅ **Tailwind CSS** - Podejście utility-first do stylowania
- ✅ **Responsive design** - Układy przyjazne dla urządzeń mobilnych
- ✅ **Animacje** - Płynne przejścia i efekty hover
- ✅ **Gradienty** - Piękne schematy kolorów

### Narzędzia i Workflow
- ✅ **Vite** - Konfiguracja nowoczesnego narzędzia do budowania
- ✅ **Git** - Podstawy kontroli wersji
- ✅ **npm** - Zarządzanie pakietami
- ✅ **VS Code** - Profesjonalne użycie IDE

### Rozwiązywanie Problemów
- ✅ **Debugowanie** - Znajdowanie i naprawianie błędów
- ✅ **Walidacja formularzy** - Obsługa danych wejściowych użytkownika
- ✅ **Normalizacja danych** - Spójne formatowanie danych
- ✅ **Integracja bibliotek** - Praca z pakietami zewnętrznymi

---

## 🎯 Przyszłe Usprawnienia

Funkcjonalności planowane w przyszłych wersjach:

### Wersja 2.0
- [ ] Dodawanie miast w obrębie krajów
- [ ] Dodawanie dat wizyt dla każdego kraju
- [ ] Dodawanie zdjęć dla każdej destynacji
- [ ] Notatki i opisy podróży

### Wersja 3.0
- [ ] Uwierzytelnianie użytkowników (Firebase)
- [ ] Przechowywanie danych w chmurze
- [ ] Udostępnianie mapy podróży znajomym
- [ ] Eksport danych do PDF/CSV

### Wersja 4.0
- [ ] Wykresy statystyk podróży
- [ ] Osiągnięcia i odznaki
- [ ] Funkcje społecznościowe (porównywanie z znajomymi)
- [ ] Rekomendacje podróży na podstawie odwiedzonych krajów

---

## 📂 Struktura Projektu
```
dream-travel-map/
├── public/
├── src/
│   ├── App.jsx              # Główny komponent aplikacji
│   ├── WorldMap.jsx         # Komponent interaktywnej mapy
│   ├── countryData.js       # Dane krajów i funkcje pomocnicze
│   ├── main.jsx             # Punkt wejścia aplikacji
│   └── index.css            # Globalne style
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🤝 Współpraca

To jest osobisty projekt edukacyjny, ale feedback i sugestie są mile widziane!

1. Zforkuj projekt
2. Stwórz branch funkcjonalności (`git checkout -b feature/NowaFunkcja`)
3. Zatwierdź zmiany (`git commit -m 'Dodaj nową funkcję'`)
4. Wypchnij do brancha (`git push origin feature/NowaFunkcja`)
5. Otwórz Pull Request



## 👤 Autor

**Twoje Imię**

- GitHub: [@Malina19](https://github.com/Malina19)
- LinkedIn: [Dawid Malik](https://www.linkedin.com/in/dawid-m-016574254/)


---


---

<div align="center">

**⭐ Jeśli ten projekt był dla Ciebie pomocny, rozważ zostawienie gwiazdki!**

Stworzone z ❤️ i ☕ przez Dawida 

</div>