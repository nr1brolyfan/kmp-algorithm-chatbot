/**
 * Skrypt do manualnego testowania funkcji normalizacji tekstu
 * Uruchom: bun run apps/web/src/lib/chatbot/normalizer.test.manual.ts
 */

import { normalize } from "./normalizer";

console.log("🧪 TESTY MANUALNE NORMALIZER\n");

// Test 1: Lowercase
console.log("Test 1: Konwersja na małe litery");
const test1 = normalize("HELLO World");
console.log('normalize("HELLO World")');
console.log(`Wynik: "${test1}"`);
console.log('Oczekiwany: "hello world"');
console.log(`Status: ${test1 === "hello world" ? "✅ PASS" : "❌ FAIL"}\n`);

// Test 2: Polskie znaki
console.log("Test 2: Zamiana polskich znaków diakrytycznych");
const test2 = normalize("żółć ąę");
console.log('normalize("żółć ąę")');
console.log(`Wynik: "${test2}"`);
console.log('Oczekiwany: "zolc ae"');
console.log(`Status: ${test2 === "zolc ae" ? "✅ PASS" : "❌ FAIL"}\n`);

// Test 3: Interpunkcja
console.log("Test 3: Usunięcie znaków interpunkcyjnych");
const test3 = normalize("Hej! Jak się masz?");
console.log('normalize("Hej! Jak się masz?")');
console.log(`Wynik: "${test3}"`);
console.log('Oczekiwany: "hej jak sie masz"');
console.log(
	`Status: ${test3 === "hej jak sie masz" ? "✅ PASS" : "❌ FAIL"}\n`
);

// Test 4: Wielokrotne spacje
console.log("Test 4: Normalizacja wielokrotnych spacji");
const test4 = normalize("to   jest   test");
console.log('normalize("to   jest   test")');
console.log(`Wynik: "${test4}"`);
console.log('Oczekiwany: "to jest test"');
console.log(`Status: ${test4 === "to jest test" ? "✅ PASS" : "❌ FAIL"}\n`);

// Test 5: Kombinacja wszystkich przypadków
console.log("Test 5: Kombinacja wszystkich operacji normalizacji");
const test5 = normalize("  ŻÓŁĆ!  Jak się MASZ?  ");
console.log('normalize("  ŻÓŁĆ!  Jak się MASZ?  ")');
console.log(`Wynik: "${test5}"`);
console.log('Oczekiwany: "zolc jak sie masz"');
console.log(
	`Status: ${test5 === "zolc jak sie masz" ? "✅ PASS" : "❌ FAIL"}\n`
);

// Test dodatkowy: Wszystkie polskie znaki
console.log("Test dodatkowy: Wszystkie polskie znaki diakrytyczne");
const testExtra = normalize("ĄĆĘŁŃÓŚŹŻ ąćęłńóśźż");
console.log('normalize("ĄĆĘŁŃÓŚŹŻ ąćęłńóśźż")');
console.log(`Wynik: "${testExtra}"`);
console.log('Oczekiwany: "acelnoszz acelnoszz"');
console.log(
	`Status: ${testExtra === "acelnoszz acelnoszz" ? "✅ PASS" : "❌ FAIL"}\n`
);

// Test praktyczny: Przykładowe pytanie klienta
console.log("Test praktyczny: Rzeczywiste pytanie klienta");
const testPractical = normalize("Gdzie jest moje zamówienie???");
console.log('normalize("Gdzie jest moje zamówienie???")');
console.log(`Wynik: "${testPractical}"`);
console.log('Oczekiwany: "gdzie jest moje zamowienie"');
console.log(
	`Status: ${testPractical === "gdzie jest moje zamowienie" ? "✅ PASS" : "❌ FAIL"}\n`
);

// Podsumowanie
const allTests = [
	test1 === "hello world",
	test2 === "zolc ae",
	test3 === "hej jak sie masz",
	test4 === "to jest test",
	test5 === "zolc jak sie masz",
	testExtra === "acelnoszz acelnoszz",
	testPractical === "gdzie jest moje zamowienie",
];

const passedTests = allTests.filter((result) => result).length;
const totalTests = allTests.length;

console.log("═══════════════════════════════════════");
console.log(
	`PODSUMOWANIE: ${passedTests}/${totalTests} testów zakończonych sukcesem`
);
console.log("═══════════════════════════════════════");

if (passedTests === totalTests) {
	console.log("🎉 Wszystkie testy przeszły!");
} else {
	console.log("⚠️  Niektóre testy nie powiodły się");
}
