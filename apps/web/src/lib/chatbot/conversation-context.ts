/**
 * Zarządzanie kontekstem konwersacji
 * Przechowuje stan rozmowy, zebrane dane i oczekiwania na odpowiedzi
 */

import type { Category, ConversationContext } from "./types";

// Inicjalizacja pustego kontekstu
export function createEmptyContext(): ConversationContext {
	return {
		collectedData: {},
		messageCount: 0,
	};
}

// Aktualizacja kontekstu po nowej wiadomości
export function updateContext(
	context: ConversationContext,
	category?: Category,
	awaitingResponse?: string
): ConversationContext {
	return {
		...context,
		lastCategory: category ?? context.lastCategory,
		awaitingResponse,
		messageCount: context.messageCount + 1,
	};
}

// Zapisanie zebranego podatku w kontekście
export function saveCollectedData(
	context: ConversationContext,
	key: string,
	value: string
): ConversationContext {
	return {
		...context,
		collectedData: {
			...context.collectedData,
			[key]: value,
		},
	};
}

// Sprawdzenie czy bot oczekuje na konkretną odpowiedź
export function isAwaitingResponse(context: ConversationContext): boolean {
	return context.awaitingResponse !== undefined;
}

// Pobranie oczekiwanej odpowiedzi
export function getAwaitedResponse(
	context: ConversationContext
): string | undefined {
	return context.awaitingResponse;
}

// Wyczyść oczekiwanie na odpowiedź
export function clearAwaitedResponse(
	context: ConversationContext
): ConversationContext {
	return {
		...context,
		awaitingResponse: undefined,
	};
}

// Sprawdzenie czy mamy zebrane dane
export function hasCollectedData(
	context: ConversationContext,
	key: string
): boolean {
	return key in context.collectedData;
}

// Pobranie zebranego podatku
export function getCollectedData(
	context: ConversationContext,
	key: string
): string | undefined {
	return context.collectedData[key];
}
