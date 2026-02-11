# Instrukcja testowania chatbota

## Testy automatyczne

### Uruchomienie testów integracyjnych

```bash
bun run test:chatbot
```

Testy sprawdzają:
- ✅ Wiadomość powitalną
- ✅ Rozpoznawanie powitan i pożegnań
- ✅ Pytania o zamówienia (algorytm KMP)
- ✅ Pytania o dostawę
- ✅ Obsługę nieznanych zapytań (odpowiedź domyślna)

## Testy manualne w przeglądarce

### 1. Uruchomienie aplikacji

```bash
bun run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3001`

### 2. Scenariusze testowe

#### Test 1: Wiadomość powitalna
- **Oczekiwany rezultat**: Po załadowaniu strony chatbot automatycznie wyświetla wiadomość powitalną
- **Co sprawdzić**: Czy wiadomość zawiera informacje o tym, w czym może pomóc

#### Test 2: Powitania
Wpisz jedną z fraz:
- "Cześć"
- "Witaj"
- "Dzień dobry"
- "Hej"

**Oczekiwany rezultat**: Bot odpowiada przyjaznym pozdrowieniem

#### Test 3: Pytania o zamówienia
Wpisz:
- "Gdzie jest moje zamówienie?"
- "Jak sprawdzić status zamówienia?"
- "Chcę anulować zamówienie"

**Oczekiwany rezultat**: Bot podaje informacje o śledzeniu/anulowaniu zamówień

#### Test 4: Pytania o dostawę
Wpisz:
- "Ile kosztuje dostawa?"
- "Jak długo trwa dostawa?"
- "Czy wysyłacie za granicę?"

**Oczekiwany rezultat**: Bot podaje szczegóły dotyczące kosztów i czasów dostawy

#### Test 5: Pytania o zwroty
Wpisz:
- "Jak mogę zwrócić produkt?"
- "Reklamacja towaru"

**Oczekiwany rezultat**: Bot wyjaśnia procedurę zwrotów/reklamacji

#### Test 6: Pytania o płatności
Wpisz:
- "Jakie metody płatności akceptujecie?"
- "Czy mogę płacić w ratach?"
- "Jak otrzymać fakturę?"

**Oczekiwany rezultat**: Bot podaje informacje o płatnościach

#### Test 7: Nieznane zapytania
Wpisz coś niezwiązanego:
- "xyz abc 123"
- "kdjfhgkjdfh"

**Oczekiwany rezultat**: Bot odpowiada komunikatem o niezrozumieniu i sugeruje tematy, w których może pomóc

#### Test 8: Pożegnania
Wpisz:
- "Do widzenia"
- "Pa"
- "Żegnaj"

**Oczekiwany rezultat**: Bot żegna się uprzejmie

### 3. Testy UI

#### Test typing indicator
1. Wyślij wiadomość
2. **Oczekiwany rezultat**: Pojawia się animacja "Bot pisze..." z pulsującymi kropkami (300-500ms)

#### Test auto-scroll
1. Wyślij kilka wiadomości, aż pojawi się scroll
2. **Oczekiwany rezultat**: Widok automatycznie przewija się do najnowszej wiadomości

#### Test walidacji inputu
1. Spróbuj wysłać pustą wiadomość (same spacje)
2. **Oczekiwany rezultat**: Przycisk "Wyślij" jest disabled, wiadomość nie zostaje wysłana

#### Test responsywności
1. Zmień szerokość okna przeglądarki
2. **Oczekiwany rezultat**: Chat dostosowuje się do rozmiaru ekranu
3. Sprawdź na urządzeniu mobilnym (lub w trybie mobile DevTools)

### 4. Testy algorytmu KMP

Chatbot używa algorytmu Knutha-Morrisa-Pratta do dopasowywania wzorców.

Przykłady testowe:
- "moje zamówienie" → znajdzie wzorzec "zamowienie" (po normalizacji)
- "KOSZT DOSTAWY?" → znajdzie wzorzec "koszt dostawy" (lowercase + usunięcie interpunkcji)
- "żółć ąę" → normalizacja polskich znaków do "zolc ae"

## Build i TypeScript

### Sprawdzenie błędów TypeScript
```bash
bunx tsc --noEmit --project apps/web/tsconfig.json
```

### Build produkcyjny
```bash
bun run build
```

### Linting i formatowanie
```bash
bun run check   # Sprawdzenie
bun run fix     # Automatyczne naprawy
```

## Wyniki testów

### Status: ✅ WSZYSTKIE TESTY PRZECHODZĄ

- ✅ TypeScript compilation: OK
- ✅ Production build: OK
- ✅ Linting (Ultracite/Biome): OK
- ✅ Integration tests: OK (6/6 passing)
- ✅ KMP algorithm: OK
- ✅ Pattern matching: OK
- ✅ Normalization: OK

## Zgłaszanie problemów

Jeśli znajdziesz błąd:
1. Sprawdź logi w konsoli przeglądarki (F12)
2. Sprawdź logi serwera w terminalu
3. Uruchom `bun run test:chatbot` aby sprawdzić testy
4. Sprawdź `bun run build` czy kod się kompiluje
