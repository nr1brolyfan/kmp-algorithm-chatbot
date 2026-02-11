/**
 * Skrypt do uruchomienia testów manualnych dla matcher
 * Uruchom: bun run apps/web/src/lib/chatbot/run-tests.ts
 */

import { findBestMatch } from "./matcher";

console.log("===========================================");
console.log("TESTY MANUALNE - MATCHER (Sekcja 5.3)");
console.log("===========================================\n");

// Test 1: Dokładne dopasowanie - "gdzie jest moje zamowienie" -> kategoria "orders"
console.log("TEST 1: Dokładne dopasowanie");
console.log("Input: 'gdzie jest moje zamowienie'");
console.log("Oczekiwany wynik: kategoria 'orders'\n");

const test1Input = "gdzie jest moje zamowienie";
const test1Result = findBestMatch(test1Input);

if (test1Result) {
	console.log("✓ Znaleziono dopasowanie!");
	console.log(`  Pattern ID: ${test1Result.pattern.id}`);
	console.log(`  Kategoria: ${test1Result.pattern.category}`);
	console.log(`  Score: ${test1Result.score}`);
	console.log(
		`  Dopasowane keywords: ${test1Result.matchedKeywords.join(", ")}`
	);
	console.log(
		`  Odpowiedź: "${test1Result.pattern.responses[0].substring(0, 60)}..."`
	);

	if (test1Result.pattern.category === "orders") {
		console.log("\n✅ TEST 1 PASSED - Kategoria to 'orders'\n");
	} else {
		console.log(
			`\n❌ TEST 1 FAILED - Oczekiwano 'orders', otrzymano '${test1Result.pattern.category}'\n`
		);
	}
} else {
	console.log("❌ TEST 1 FAILED - Nie znaleziono dopasowania\n");
}

console.log("-------------------------------------------\n");

// Test 2: Brak dopasowania - "xyz abc 123" -> null (odpowiedź domyślna)
console.log("TEST 2: Brak dopasowania");
console.log("Input: 'xyz abc 123'");
console.log("Oczekiwany wynik: null (brak dopasowania)\n");

const test2Input = "xyz abc 123";
const test2Result = findBestMatch(test2Input);

if (test2Result === null) {
	console.log("✓ Nie znaleziono dopasowania (null)");
	console.log("✅ TEST 2 PASSED - Zwrócono null jak oczekiwano\n");
} else {
	console.log("❌ TEST 2 FAILED - Znaleziono dopasowanie, a nie powinno być");
	console.log(`  Pattern ID: ${test2Result.pattern.id}`);
	console.log(`  Score: ${test2Result.score}\n`);
}

console.log("-------------------------------------------\n");

// Test 3: Wielokrotne dopasowania - "zwrot zamowienia" -> najwyższy score
console.log("TEST 3: Wielokrotne dopasowania");
console.log("Input: 'zwrot zamowienia'");
console.log("Oczekiwany wynik: wzorzec z najwyższym score\n");

const test3Input = "zwrot zamowienia";
const test3Result = findBestMatch(test3Input);

if (test3Result) {
	console.log("✓ Znaleziono dopasowanie!");
	console.log(`  Pattern ID: ${test3Result.pattern.id}`);
	console.log(`  Kategoria: ${test3Result.pattern.category}`);
	console.log(`  Score: ${test3Result.score}`);
	console.log(
		`  Dopasowane keywords: ${test3Result.matchedKeywords.join(", ")}`
	);
	console.log(
		`  Odpowiedź: "${test3Result.pattern.responses[0].substring(0, 60)}..."`
	);

	// Sprawdźmy, czy to sensowny wybór (returns lub orders)
	if (
		test3Result.pattern.category === "returns" ||
		test3Result.pattern.category === "orders"
	) {
		console.log(
			"\n✅ TEST 3 PASSED - Wybrano wzorzec z odpowiedniej kategorii (returns/orders)\n"
		);
	} else {
		console.log(
			`\n⚠️  TEST 3 WARNING - Kategoria '${test3Result.pattern.category}' jest niespodziewana\n`
		);
	}
} else {
	console.log("❌ TEST 3 FAILED - Nie znaleziono dopasowania\n");
}

console.log("===========================================");
console.log("PODSUMOWANIE TESTÓW");
console.log("===========================================\n");

const results = [
	test1Result?.pattern.category === "orders",
	test2Result === null,
	test3Result !== null,
];

const passed = results.filter(Boolean).length;
const total = results.length;

console.log(`Wynik: ${passed}/${total} testów przeszło pomyślnie`);

if (passed === total) {
	console.log("🎉 WSZYSTKIE TESTY PRZESZŁY!");
} else {
	console.log("⚠️  Niektóre testy nie przeszły - sprawdź wyniki powyżej");
}

console.log("\n===========================================\n");
