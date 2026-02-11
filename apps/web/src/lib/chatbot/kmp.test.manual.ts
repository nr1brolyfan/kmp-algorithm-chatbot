/**
 * Skrypt do manualnego testowania algorytmu KMP
 * Uruchom: bun run apps/web/src/lib/chatbot/kmp.test.manual.ts
 */

import { buildFailureTable, kmpSearch } from "./kmp";

console.log("🧪 TESTY MANUALNE ALGORYTMU KMP\n");

// Test 1: Podstawowe wyszukiwanie
console.log("Test 1: Podstawowe wyszukiwanie");
const test1 = kmpSearch("ABABDABACDABABCABAB", "ABABC");
console.log('kmpSearch("ABABDABACDABABCABAB", "ABABC")');
console.log(`Wynik: [${test1}]`);
console.log("Oczekiwany: [10]");
console.log(
	`Status: ${JSON.stringify(test1) === JSON.stringify([10]) ? "✅ PASS" : "❌ FAIL"}\n`
);

// Test 2: Wiele dopasowań
console.log("Test 2: Wiele dopasowań");
const test2 = kmpSearch("AAAA", "AA");
console.log('kmpSearch("AAAA", "AA")');
console.log(`Wynik: [${test2}]`);
console.log("Oczekiwany: [0, 1, 2]");
console.log(
	`Status: ${JSON.stringify(test2) === JSON.stringify([0, 1, 2]) ? "✅ PASS" : "❌ FAIL"}\n`
);

// Test 3: Brak dopasowania
console.log("Test 3: Brak dopasowania");
const test3 = kmpSearch("ABCDEF", "XYZ");
console.log('kmpSearch("ABCDEF", "XYZ")');
console.log(`Wynik: [${test3}]`);
console.log("Oczekiwany: []");
console.log(
	`Status: ${JSON.stringify(test3) === JSON.stringify([]) ? "✅ PASS" : "❌ FAIL"}\n`
);

// Test 4: Pusty pattern
console.log("Test 4: Pusty pattern");
const test4 = kmpSearch("ABC", "");
console.log('kmpSearch("ABC", "")');
console.log(`Wynik: [${test4}]`);
console.log("Oczekiwany: []");
console.log(
	`Status: ${JSON.stringify(test4) === JSON.stringify([]) ? "✅ PASS" : "❌ FAIL"}\n`
);

// Test 5: Pattern dłuższy niż text
console.log("Test 5: Pattern dłuższy niż text");
const test5 = kmpSearch("AB", "ABCDEF");
console.log('kmpSearch("AB", "ABCDEF")');
console.log(`Wynik: [${test5}]`);
console.log("Oczekiwany: []");
console.log(
	`Status: ${JSON.stringify(test5) === JSON.stringify([]) ? "✅ PASS" : "❌ FAIL"}\n`
);

// Test 6: Identyczne stringi
console.log("Test 6: Identyczne stringi");
const test6 = kmpSearch("ABC", "ABC");
console.log('kmpSearch("ABC", "ABC")');
console.log(`Wynik: [${test6}]`);
console.log("Oczekiwany: [0]");
console.log(
	`Status: ${JSON.stringify(test6) === JSON.stringify([0]) ? "✅ PASS" : "❌ FAIL"}\n`
);

// Test 7: Powtarzający się pattern
console.log("Test 7: Powtarzający się pattern");
const test7 = kmpSearch("ABABABAB", "ABAB");
console.log('kmpSearch("ABABABAB", "ABAB")');
console.log(`Wynik: [${test7}]`);
console.log("Oczekiwany: [0, 2, 4]");
console.log(
	`Status: ${JSON.stringify(test7) === JSON.stringify([0, 2, 4]) ? "✅ PASS" : "❌ FAIL"}\n`
);

// Test tablicy failure
console.log("Test tablicy failure:");
const failureTest = buildFailureTable("ABABC");
console.log('buildFailureTable("ABABC")');
console.log(`Wynik: [${failureTest}]`);
console.log("Oczekiwany: [0, 0, 1, 2, 0]");
console.log(
	`Status: ${JSON.stringify(failureTest) === JSON.stringify([0, 0, 1, 2, 0]) ? "✅ PASS" : "❌ FAIL"}\n`
);

// Podsumowanie
const allTests = [
	JSON.stringify(test1) === JSON.stringify([10]),
	JSON.stringify(test2) === JSON.stringify([0, 1, 2]),
	JSON.stringify(test3) === JSON.stringify([]),
	JSON.stringify(test4) === JSON.stringify([]),
	JSON.stringify(test5) === JSON.stringify([]),
	JSON.stringify(test6) === JSON.stringify([0]),
	JSON.stringify(test7) === JSON.stringify([0, 2, 4]),
	JSON.stringify(failureTest) === JSON.stringify([0, 0, 1, 2, 0]),
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
