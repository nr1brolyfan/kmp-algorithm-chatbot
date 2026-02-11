/**
 * Moduł normalizacji tekstu wejściowego
 * Przygotowuje tekst do dopasowywania wzorców
 */

/**
 * Normalizuje tekst wejściowy do ustandaryzowanej formy
 *
 * Wykonuje następujące operacje:
 * - Konwersja na małe litery
 * - Usunięcie znaków interpunkcyjnych
 * - Zamiana polskich znaków diakrytycznych na ASCII
 * - Normalizacja białych znaków (wielokrotne spacje -> jedna)
 * - Usunięcie białych znaków z początku i końca
 *
 * @param text - Tekst do znormalizowania
 * @returns Znormalizowany tekst
 *
 * @example
 * normalize("Gdzie jest MOJE zamówienie?!") // "gdzie jest moje zamowienie"
 * normalize("ŻÓŁĆ ĄĘ") // "zolc ae"
 */
export function normalize(text: string): string {
	// Konwersja na małe litery
	let normalized = text.toLowerCase();

	// Zamiana polskich znaków diakrytycznych na odpowiedniki ASCII
	const diacriticMap: Record<string, string> = {
		ą: "a",
		ć: "c",
		ę: "e",
		ł: "l",
		ń: "n",
		ó: "o",
		ś: "s",
		ź: "z",
		ż: "z",
	};

	// Zastąpienie każdego polskiego znaku jego odpowiednikiem ASCII
	for (const [diacritic, ascii] of Object.entries(diacriticMap)) {
		normalized = normalized.replaceAll(diacritic, ascii);
	}

	// Usunięcie wszystkich znaków interpunkcyjnych i specjalnych
	// Zachowujemy tylko litery (a-z) i białe znaki
	normalized = normalized.replace(/[^a-z\s]/g, "");

	// Normalizacja białych znaków: wielokrotne spacje -> jedna spacja
	normalized = normalized.replace(/\s+/g, " ");

	// Usunięcie białych znaków z początku i końca (trim)
	normalized = normalized.trim();

	return normalized;
}
