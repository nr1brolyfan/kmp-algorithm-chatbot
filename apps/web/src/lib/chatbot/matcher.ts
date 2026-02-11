/**
 * Moduł dopasowywania wzorców i obliczania scoringu
 * Wykorzystuje algorytm KMP do wyszukiwania słów kluczowych w znormalizowanym tekście
 */

import { kmpSearch } from "./kmp";
import { PATTERNS } from "./knowledge-base";
import { normalize } from "./normalizer";
import type { MatchResult, Pattern } from "./types";

/**
 * Oblicza score dopasowania na podstawie dopasowanych słów kluczowych i priorytetu wzorca
 *
 * Wzór: score = sum(wagi_keywords) + (priority * waga_priority)
 * gdzie:
 * - waga_keyword = 10 + (długość_keyword - 3)  // bonus za dłuższe słowa
 * - waga_priority = 5
 *
 * @param pattern - Wzorzec z bazy wiedzy
 * @param matchedKeywords - Lista dopasowanych słów kluczowych
 * @returns Obliczony score
 *
 * @example
 * // Pattern z keywords: ["zamowienie", "status"] i priority: 2
 * // Dopasowane: ["zamowienie", "status"]
 * // waga "zamowienie" = 10 + (10-3) = 17
 * // waga "status" = 10 + (6-3) = 13
 * // score = 17 + 13 + (2 * 5) = 40
 */
export function calculateScore(
	pattern: Pattern,
	matchedKeywords: string[]
): number {
	// Stała waga dla priorytetu
	const PRIORITY_WEIGHT = 5;

	// Stała bazowa waga dla każdego słowa kluczowego
	const BASE_KEYWORD_WEIGHT = 10;

	// Obliczamy sumę wag wszystkich dopasowanych keywords
	const keywordsScore = matchedKeywords.reduce((sum, keyword) => {
		// Bonus za długość: dłuższe słowa są bardziej specyficzne
		const lengthBonus = Math.max(0, keyword.length - 3);
		const keywordWeight = BASE_KEYWORD_WEIGHT + lengthBonus;
		return sum + keywordWeight;
	}, 0);

	// Dodajemy wagę priorytetu
	const priorityScore = pattern.priority * PRIORITY_WEIGHT;

	// Łączny score
	return keywordsScore + priorityScore;
}

/**
 * Znajduje wszystkie dopasowania dla wzorców w znormalizowanym tekście
 *
 * Dla każdego wzorca:
 * 1. Sprawdza każdy keyword używając algorytmu KMP
 * 2. Zbiera dopasowane keywords
 * 3. Oblicza score dla wzorca
 *
 * @param normalizedText - Znormalizowany tekst użytkownika
 * @param patterns - Tablica wzorców do sprawdzenia
 * @returns Tablica wyników dopasowania (tylko wzorce z score > 0)
 *
 * @example
 * findMatches("gdzie jest moje zamowienie", PATTERNS)
 * // Zwróci tablicę MatchResult z dopasowanymi wzorcami
 */
export function findMatches(
	normalizedText: string,
	patterns: Pattern[]
): MatchResult[] {
	const results: MatchResult[] = [];

	// Sprawdzamy każdy wzorzec
	for (const pattern of patterns) {
		const matchedKeywords: string[] = [];

		// Sprawdzamy każdy keyword z wzorca
		for (const keyword of pattern.keywords) {
			// Używamy algorytmu KMP do wyszukania keyword w tekście
			const matches = kmpSearch(normalizedText, keyword);

			// Jeśli znaleziono keyword, dodajemy go do listy dopasowań
			if (matches.length > 0) {
				matchedKeywords.push(keyword);
			}
		}

		// Jeśli znaleźliśmy jakieś dopasowania, obliczamy score
		if (matchedKeywords.length > 0) {
			const score = calculateScore(pattern, matchedKeywords);

			results.push({
				pattern,
				score,
				matchedKeywords,
			});
		}
	}

	return results;
}

/**
 * Znajduje najlepsze dopasowanie dla tekstu użytkownika
 *
 * Proces:
 * 1. Normalizacja tekstu
 * 2. Wyszukanie wszystkich dopasowań
 * 3. Sortowanie po score malejąco
 * 4. Przy równym score - wybór wzorca z wyższym priority
 * 5. Zwrócenie najlepszego dopasowania
 *
 * @param text - Oryginalny tekst użytkownika (nieznormalizowany)
 * @returns Najlepsze dopasowanie lub null jeśli brak dopasowań
 *
 * @example
 * findBestMatch("Gdzie jest moje zamówienie?")
 * // Zwróci MatchResult z wzorcem "order-status"
 *
 * findBestMatch("xyz abc 123")
 * // Zwróci null (brak dopasowań)
 */
export function findBestMatch(text: string): MatchResult | null {
	// Normalizacja tekstu wejściowego
	const normalizedText = normalize(text);

	// Znajdź wszystkie dopasowania
	const matches = findMatches(normalizedText, PATTERNS);

	// Jeśli brak dopasowań, zwróć null
	if (matches.length === 0) {
		return null;
	}

	// Sortuj wyniki po score malejąco
	// Przy równym score - wybierz wzorzec z wyższym priority
	matches.sort((a, b) => {
		if (a.score === b.score) {
			// Przy równym score sprawdź priority
			return b.pattern.priority - a.pattern.priority;
		}
		return b.score - a.score;
	});

	// Zwróć najlepsze dopasowanie (pierwszy element po sortowaniu)
	return matches[0];
}
