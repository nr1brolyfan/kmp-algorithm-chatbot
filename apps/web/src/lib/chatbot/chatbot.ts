/**
 * Główny moduł chatbota - orkiestracja przetwarzania wiadomości
 * Łączy normalizację, dopasowywanie i generowanie odpowiedzi
 */

import { DEFAULT_RESPONSE } from "./knowledge-base";
import { findBestMatch } from "./matcher";

/**
 * Wybiera losową odpowiedź z dostępnej tablicy
 *
 * @param responses - Tablica możliwych odpowiedzi
 * @returns Losowo wybrana odpowiedź
 *
 * @example
 * getRandomResponse(["Odpowiedź 1", "Odpowiedź 2", "Odpowiedź 3"])
 * // Zwróci jedną z trzech odpowiedzi
 */
export function getRandomResponse(responses: string[]): string {
	// Jeśli tablica jest pusta, zwróć pustą string (nie powinno się zdarzyć w praktyce)
	if (responses.length === 0) {
		return "";
	}

	// Losuj indeks z zakresu 0 do length-1
	const randomIndex = Math.floor(Math.random() * responses.length);

	// Zwróć odpowiedź na wylosowanym indeksie
	return responses[randomIndex];
}

/**
 * Przetwarza wiadomość użytkownika i zwraca odpowiedź bota
 *
 * Proces przetwarzania:
 * 1. Znormalizuj input użytkownika (wykonywane wewnątrz findBestMatch)
 * 2. Znajdź najlepsze dopasowanie wzorca z bazy wiedzy
 * 3. Jeśli brak dopasowania -> zwróć odpowiedź domyślną
 * 4. Jeśli znaleziono dopasowanie -> wybierz losową odpowiedź z dostępnych
 *
 * @param userInput - Oryginalny tekst wiadomości użytkownika
 * @returns Odpowiedź bota
 *
 * @example
 * processMessage("Gdzie jest moje zamówienie?")
 * // "Status zamówienia możesz sprawdzić w zakładce 'Moje zamówienia' po zalogowaniu..."
 *
 * processMessage("xyz abc 123")
 * // "Przepraszam, nie do końca rozumiem..."
 */
export function processMessage(userInput: string): string {
	// Znajdź najlepsze dopasowanie wzorca
	// (funkcja findBestMatch wewnętrznie normalizuje tekst)
	const match = findBestMatch(userInput);

	// Jeśli nie znaleziono dopasowania, zwróć odpowiedź domyślną
	if (!match) {
		return DEFAULT_RESPONSE;
	}

	// Wybierz losową odpowiedź z dostępnych w dopasowanym wzorcu
	const response = getRandomResponse(match.pattern.responses);

	return response;
}
