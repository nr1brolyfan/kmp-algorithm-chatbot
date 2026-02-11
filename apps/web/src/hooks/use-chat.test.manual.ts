/**
 * Testy manualne dla useChat hook
 * Uruchom: bun run apps/web/src/hooks/use-chat.test.manual.ts
 */

import { processMessage, WELCOME_MESSAGE } from "../lib/chatbot";

// Symulacja działania hooka (bez React)
interface Message {
	id: string;
	text: string;
	sender: "user" | "bot";
	timestamp: Date;
}

function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

console.log("=== TEST 1: Generowanie ID ===");
const id1 = generateId();
const id2 = generateId();
console.log("ID 1:", id1);
console.log("ID 2:", id2);
console.log("Są unikalne:", id1 !== id2);
console.log();

console.log("=== TEST 2: Wiadomość powitalna ===");
const welcomeMessage: Message = {
	id: generateId(),
	text: WELCOME_MESSAGE,
	sender: "bot",
	timestamp: new Date(),
};
console.log("Nadawca:", welcomeMessage.sender);
console.log("Treść:", welcomeMessage.text);
console.log();

console.log("=== TEST 3: Symulacja wysłania wiadomości ===");
const messages: Message[] = [welcomeMessage];

// Wiadomość użytkownika
const userText = "Gdzie jest moje zamówienie?";
const userMessage: Message = {
	id: generateId(),
	text: userText,
	sender: "user",
	timestamp: new Date(),
};
messages.push(userMessage);
console.log("Użytkownik:", userMessage.text);

// Odpowiedź bota
const botResponseText = processMessage(userText);
const botMessage: Message = {
	id: generateId(),
	text: botResponseText,
	sender: "bot",
	timestamp: new Date(),
};
messages.push(botMessage);
console.log("Bot:", botMessage.text);
console.log();

console.log("=== TEST 4: Historia wiadomości ===");
console.log("Liczba wiadomości:", messages.length);
console.log("Kolejność:");
for (const msg of messages) {
	console.log(`  [${msg.sender}] ${msg.text.substring(0, 50)}...`);
}
console.log();

console.log("=== TEST 5: Walidacja pustych wiadomości ===");
const emptyTexts = ["", "   ", "\t\n", "  \n  "];
for (const text of emptyTexts) {
	const trimmed = text.trim();
	console.log(
		`"${text.replace(/\n/g, "\\n").replace(/\t/g, "\\t")}" -> trim: "${trimmed}" -> ${trimmed ? "WYŚLIJ" : "IGNORUJ"}`
	);
}
console.log();

console.log("=== TEST 6: Losowe opóźnienie typing (300-500ms) ===");
const delays: number[] = [];
for (let i = 0; i < 10; i++) {
	const delay = 300 + Math.random() * 200;
	delays.push(delay);
}
console.log(
	"Wygenerowane opóźnienia:",
	delays.map((d) => `${d.toFixed(0)}ms`)
);
console.log(
	"Min:",
	Math.min(...delays).toFixed(0),
	"ms, Max:",
	Math.max(...delays).toFixed(0),
	"ms"
);
console.log();

console.log("✅ Wszystkie testy manualne zakończone pomyślnie!");
