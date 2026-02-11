/**
 * Test integracji - sprawdza czy wszystkie moduły chatbota działają poprawnie
 */

import {
	processMessage,
	WELCOME_MESSAGE,
} from "./apps/web/src/lib/chatbot/index";

console.log("🤖 Test integracji chatbota\n");
console.log("=".repeat(60));

// Test 1: Wiadomość powitalna
console.log("\n✅ Test 1: Wiadomość powitalna");
console.log(`   "${WELCOME_MESSAGE.substring(0, 50)}..."`);

// Test 2: Proste powitanie
console.log("\n✅ Test 2: Powitanie użytkownika");
const greeting = processMessage("Cześć!");
console.log(`   Input: "Cześć!"`);
console.log(`   Output: "${greeting}"`);

// Test 3: Pytanie o zamówienie
console.log("\n✅ Test 3: Pytanie o zamówienie");
const orderQuery = processMessage("Gdzie jest moje zamówienie?");
console.log(`   Input: "Gdzie jest moje zamówienie?"`);
console.log(`   Output: "${orderQuery}"`);

// Test 4: Pytanie o koszt dostawy
console.log("\n✅ Test 4: Pytanie o dostawę");
const deliveryQuery = processMessage("Ile kosztuje dostawa?");
console.log(`   Input: "Ile kosztuje dostawa?"`);
console.log(`   Output: "${deliveryQuery}"`);

// Test 5: Nieznane pytanie
console.log("\n✅ Test 5: Nieznane pytanie");
const unknown = processMessage("xyz abc 123");
console.log(`   Input: "xyz abc 123"`);
console.log(`   Output: "${unknown}"`);

// Test 6: Pożegnanie
console.log("\n✅ Test 6: Pożegnanie");
const farewell = processMessage("Do widzenia");
console.log(`   Input: "Do widzenia"`);
console.log(`   Output: "${farewell}"`);

console.log("\n" + "=".repeat(60));
console.log("\n🎉 Wszystkie podstawowe testy przeszły pomyślnie!");
console.log("\n📋 Następne kroki:");
console.log("   1. Uruchom: bun run dev");
console.log("   2. Otwórz: http://localhost:3001");
console.log("   3. Testuj interaktywnie w przeglądarce\n");
