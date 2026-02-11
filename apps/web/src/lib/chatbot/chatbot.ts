/**
 * Główny moduł chatbota - orkiestracja przetwarzania wiadomości
 * Łączy normalizację, dopasowywanie i generowanie odpowiedzi
 */

import { DEFAULT_RESPONSE } from "./knowledge-base";
import { findBestMatch, handleFollowUpResponse } from "./matcher";
import type { ConversationContext } from "./types";

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
 * Wynik przetwarzania wiadomości
 */
export interface ProcessResult {
	response: string; // Odpowiedź bota
	updatedContext: ConversationContext; // Zaktualizowany kontekst
}

/**
 * Przetwarza wiadomość użytkownika z uwzględnieniem kontekstu konwersacji
 *
 * Proces przetwarzania:
 * 1. Sprawdź czy bot oczekuje na odpowiedź follow-up
 * 2. Jeśli tak, obsłuż odpowiedź i wyczyść kontekst
 * 3. Jeśli nie, znajdź najlepsze dopasowanie wzorca
 * 4. Jeśli wzorzec ma follow-up, ustaw oczekiwanie w kontekście
 * 5. Zwróć odpowiedź i zaktualizowany kontekst
 *
 * @param userInput - Oryginalny tekst wiadomości użytkownika
 * @param context - Obecny kontekst konwersacji
 * @returns Obiekt z odpowiedzią i zaktualizowanym kontekstem
 */
export function processMessage(
	userInput: string,
	context: ConversationContext
): ProcessResult {
	// Sprawdź czy bot oczekuje na odpowiedź follow-up
	if (context.awaitingResponse) {
		const followUpResponse = handleFollowUpResponse(userInput, context);

		if (followUpResponse) {
			// Wyczyść oczekiwanie na odpowiedź
			const updatedContext: ConversationContext = {
				...context,
				awaitingResponse: undefined,
				messageCount: context.messageCount + 1,
			};

			return {
				response: followUpResponse,
				updatedContext,
			};
		}
	}

	// Znajdź najlepsze dopasowanie wzorca
	const match = findBestMatch(userInput);

	// Jeśli nie znaleziono dopasowania, zwróć odpowiedź domyślną
	if (!match) {
		return {
			response: DEFAULT_RESPONSE,
			updatedContext: {
				...context,
				messageCount: context.messageCount + 1,
			},
		};
	}

	// Wybierz losową odpowiedź z dostępnych w dopasowanym wzorcu
	const response = getRandomResponse(match.pattern.responses);

	// Zaktualizuj kontekst
	let updatedContext: ConversationContext = {
		...context,
		lastCategory: match.pattern.category,
		messageCount: context.messageCount + 1,
	};

	// Jeśli wzorzec ma follow-up, ustaw oczekiwanie
	if (match.pattern.followUp) {
		updatedContext = {
			...updatedContext,
			awaitingResponse: match.pattern.followUp.context,
		};
	}

	return {
		response,
		updatedContext,
	};
}
