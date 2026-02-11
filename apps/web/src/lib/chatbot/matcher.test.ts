/**
 * Testy manualne dla modułu matcher
 * Uruchom w konsoli przeglądarki lub Node.js
 */

import { PATTERNS } from "./knowledge-base";
import { calculateScore, findBestMatch, findMatches } from "./matcher";
import type { Pattern } from "./types";

// Test 1: calculateScore - podstawowy przykład
console.log("=== TEST 1: calculateScore ===");
const testPattern: Pattern = {
	id: "test-pattern",
	keywords: ["zamowienie", "status"],
	responses: ["Test response"],
	priority: 2,
	category: "orders",
};

const matchedKeywords = ["zamowienie", "status"];
const score = calculateScore(testPattern, matchedKeywords);
console.log("Pattern:", testPattern.id);
console.log("Matched keywords:", matchedKeywords);
console.log("Obliczony score:", score);
// Oczekiwany wynik:
// - "zamowienie" (10 znaków): 10 + (10-3) = 17
// - "status" (6 znaków): 10 + (6-3) = 13
// - priority: 2 * 5 = 10
// - SUMA: 17 + 13 + 10 = 40
console.log("Oczekiwany score: 40");
console.log("Test PASSED:", score === 40 ? "✓" : "✗");
console.log("");

// Test 2: findMatches - znajdowanie dopasowań
console.log("=== TEST 2: findMatches ===");
const normalizedText = "gdzie jest moje zamowienie";
const matches = findMatches(normalizedText, PATTERNS);
console.log("Input:", normalizedText);
console.log("Znaleziono dopasowań:", matches.length);
console.log("Pierwsze 3 dopasowania:");
for (let i = 0; i < Math.min(3, matches.length); i++) {
	const match = matches[i];
	console.log(
		`  ${i + 1}. Pattern: ${match.pattern.id}, Score: ${match.score}, Keywords: ${match.matchedKeywords.join(", ")}`
	);
}
console.log("Test PASSED:", matches.length > 0 ? "✓" : "✗");
console.log("");

// Test 3: findBestMatch - dokładne dopasowanie
console.log("=== TEST 3: findBestMatch - dokładne dopasowanie ===");
const input1 = "Gdzie jest moje zamówienie?";
const bestMatch1 = findBestMatch(input1);
console.log("Input:", input1);
console.log(
	"Najlepsze dopasowanie:",
	bestMatch1 ? bestMatch1.pattern.id : "null"
);
console.log("Score:", bestMatch1 ? bestMatch1.score : "N/A");
console.log("Kategoria:", bestMatch1 ? bestMatch1.pattern.category : "N/A");
console.log(
	"Test PASSED:",
	bestMatch1?.pattern.category === "orders" ? "✓" : "✗"
);
console.log("");

// Test 4: findBestMatch - brak dopasowania
console.log("=== TEST 4: findBestMatch - brak dopasowania ===");
const input2 = "xyz abc 123 qwerty";
const bestMatch2 = findBestMatch(input2);
console.log("Input:", input2);
console.log("Najlepsze dopasowanie:", bestMatch2 || "null");
console.log("Test PASSED:", bestMatch2 === null ? "✓" : "✗");
console.log("");

// Test 5: findBestMatch - wielokrotne dopasowania
console.log("=== TEST 5: findBestMatch - wielokrotne dopasowania ===");
const input3 = "zwrot zamowienia";
const bestMatch3 = findBestMatch(input3);
console.log("Input:", input3);
console.log(
	"Najlepsze dopasowanie:",
	bestMatch3 ? bestMatch3.pattern.id : "null"
);
console.log("Score:", bestMatch3 ? bestMatch3.score : "N/A");
console.log(
	"Matched keywords:",
	bestMatch3?.matchedKeywords.join(", ") || "N/A"
);
console.log("Test PASSED:", bestMatch3 !== null ? "✓" : "✗");
console.log("");

// Test 6: findBestMatch - powitanie
console.log("=== TEST 6: findBestMatch - powitanie ===");
const input4 = "Cześć! Witaj!";
const bestMatch4 = findBestMatch(input4);
console.log("Input:", input4);
console.log(
	"Najlepsze dopasowanie:",
	bestMatch4 ? bestMatch4.pattern.id : "null"
);
console.log("Kategoria:", bestMatch4 ? bestMatch4.pattern.category : "N/A");
console.log(
	"Test PASSED:",
	bestMatch4?.pattern.category === "greeting" ? "✓" : "✗"
);
console.log("");

console.log("=== WSZYSTKIE TESTY ZAKOŃCZONE ===");
