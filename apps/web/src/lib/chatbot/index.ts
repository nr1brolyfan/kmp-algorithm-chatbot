/**
 * Publiczne API modułu chatbot
 * Eksportuje wszystkie funkcje i typy potrzebne do integracji chatbota
 */

// === Główna funkcja chatbota ===

// biome-ignore lint/performance/noBarrelFile: W/e
export { processMessage } from "./chatbot";
// === Kontekst konwersacji ===
export { createEmptyContext } from "./conversation-context";
// === Algorytmy (do celów debugowania/testowania) ===
export { buildFailureTable, kmpSearch } from "./kmp";
// === Wiadomości systemowe ===
export { DEFAULT_RESPONSE, WELCOME_MESSAGE } from "./knowledge-base";
export { findBestMatch } from "./matcher";
export { normalize } from "./normalizer";
// === Typy TypeScript ===
export type {
	Category,
	ConversationContext,
	MatchResult,
	Message,
	Pattern,
	Sender,
} from "./types";
