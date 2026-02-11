/**
 * Typy i interfejsy dla chatbota obsługi klienta
 */

// Typ nadawcy wiadomości
export type Sender = "user" | "bot";

// Kategorie tematyczne wzorców
export type Category =
	| "greeting" // Powitania
	| "farewell" // Pożegnania
	| "orders" // Zamówienia
	| "delivery" // Dostawa
	| "returns" // Zwroty
	| "payments" // Płatności
	| "products" // Produkty
	| "general"; // Ogólne

// Interfejs wzorca z bazy wiedzy
export interface Pattern {
	id: string; // Unikalny identyfikator wzorca
	keywords: string[]; // Słowa kluczowe (znormalizowane: lowercase, bez diakrytyków)
	responses: string[]; // Możliwe odpowiedzi (losowy wybór)
	priority: number; // Priorytet wzorca (1-3, wyższy = ważniejszy)
	category: Category; // Kategoria tematyczna
}

// Interfejs wiadomości w czacie
export interface Message {
	id: string; // Unikalny identyfikator wiadomości
	text: string; // Treść wiadomości
	sender: Sender; // Nadawca (user lub bot)
	timestamp: Date; // Czas wysłania wiadomości
}

// Wynik dopasowania wzorca
export interface MatchResult {
	pattern: Pattern; // Dopasowany wzorzec
	score: number; // Wyliczony score dopasowania
	matchedKeywords: string[]; // Lista dopasowanych słów kluczowych
}
