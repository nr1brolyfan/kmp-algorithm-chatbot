/**
 * Implementacja algorytmu Knutha-Morrisa-Pratta (KMP)
 * Służy do efektywnego wyszukiwania wzorca w tekście
 * Złożoność czasowa: O(n + m), gdzie n = długość tekstu, m = długość wzorca
 */

/**
 * Buduje tablicę częściowych dopasowań (failure table) dla algorytmu KMP
 *
 * Tablica failure zawiera dla każdej pozycji i długość najdłuższego
 * właściwego prefiksu wzorca[0..i], który jest jednocześnie sufiksem.
 *
 * @param pattern - Wzorzec do wyszukiwania
 * @returns Tablica częściowych dopasowań
 *
 * @example
 * buildFailureTable("ABABC") // [0, 0, 1, 2, 0]
 */
export function buildFailureTable(pattern: string): number[] {
	const m = pattern.length;

	// Obsługa pustego wzorca
	if (m === 0) {
		return [];
	}

	// Inicjalizacja tablicy wyzerowanymi wartościami
	const failure = new Array(m).fill(0);

	// j wskazuje długość aktualnego dopasowanego prefiksu
	let j = 0;

	// Iterujemy od pozycji 1 (pozycja 0 zawsze ma wartość 0)
	for (let i = 1; i < m; i++) {
		// Dopóki nie znajdziemy dopasowania lub nie dojdziemy do początku
		while (j > 0 && pattern[i] !== pattern[j]) {
			// Cofamy się używając wartości z tablicy failure
			j = failure[j - 1];
		}

		// Jeśli znaki się zgadzają, zwiększamy długość dopasowania
		if (pattern[i] === pattern[j]) {
			j++;
		}

		// Zapisujemy długość najdłuższego dopasowanego prefiksu
		failure[i] = j;
	}

	return failure;
}

/**
 * Wyszukuje wszystkie wystąpienia wzorca w tekście używając algorytmu KMP
 *
 * @param text - Tekst do przeszukania
 * @param pattern - Wzorzec do znalezienia
 * @returns Tablica pozycji (indeksów) gdzie znaleziono wzorzec
 *
 * @example
 * kmpSearch("ABABDABACDABABCABAB", "ABABC") // [10]
 * kmpSearch("AAAA", "AA") // [0, 1, 2]
 * kmpSearch("ABCDEF", "XYZ") // []
 */
export function kmpSearch(text: string, pattern: string): number[] {
	const n = text.length;
	const m = pattern.length;

	// Obsługa edge cases
	if (m === 0 || n === 0) {
		return [];
	}

	// Pattern dłuższy niż tekst - brak dopasowania możliwy
	if (m > n) {
		return [];
	}

	// Budujemy tablicę failure dla wzorca
	const failure = buildFailureTable(pattern);

	// Tablica przechowująca pozycje znalezionych dopasowań
	const matches: number[] = [];

	// j wskazuje aktualną pozycję we wzorcu
	let j = 0;

	// Iterujemy po tekście
	for (let i = 0; i < n; i++) {
		// Dopóki nie znajdziemy dopasowania lub nie dojdziemy do początku wzorca
		while (j > 0 && text[i] !== pattern[j]) {
			// Cofamy się używając tablicy failure
			j = failure[j - 1];
		}

		// Jeśli znaki się zgadzają, przesuwamy się we wzorcu
		if (text[i] === pattern[j]) {
			j++;
		}

		// Jeśli dopasowaliśmy cały wzorzec
		if (j === m) {
			// Zapisujemy pozycję początku dopasowania
			matches.push(i - m + 1);

			// Przesuwamy wzorzec dalej (szukamy kolejnych dopasowań)
			j = failure[j - 1];
		}
	}

	return matches;
}
