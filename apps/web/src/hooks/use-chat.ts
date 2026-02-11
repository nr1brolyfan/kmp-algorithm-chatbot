/**
 * React hook do zarządzania stanem czatu
 * Obsługuje wysyłanie wiadomości, historię czatu i typing indicator
 */

import { useEffect, useState } from "react";
import type { Message } from "../lib/chatbot";
import { processMessage, WELCOME_MESSAGE } from "../lib/chatbot";

/**
 * Generuje unikalny identyfikator dla wiadomości
 * Używa timestamp + losowy suffix dla gwarancji unikalności
 *
 * @returns Unikalny string ID
 */
function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Hook zarządzający stanem czatu
 *
 * Funkcjonalności:
 * - Automatyczna wiadomość powitalna przy inicjalizacji
 * - Wysyłanie wiadomości użytkownika
 * - Automatyczna odpowiedź bota z opóźnieniem (typing indicator)
 * - Historia wszystkich wiadomości
 *
 * @returns Obiekt z messages, isTyping i funkcją sendMessage
 *
 * @example
 * const { messages, isTyping, sendMessage } = useChat();
 *
 * // Wyślij wiadomość
 * sendMessage("Gdzie jest moje zamówienie?");
 *
 * // Wyświetl historię
 * messages.map(msg => <div>{msg.text}</div>)
 */
export function useChat() {
	// Stan przechowujący historię wiadomości
	const [messages, setMessages] = useState<Message[]>([]);

	// Stan wskazujący czy bot "pisze" odpowiedź
	const [isTyping, setIsTyping] = useState(false);

	// Inicjalizacja z wiadomością powitalną (tylko raz przy montowaniu)
	useEffect(() => {
		const welcomeMessage: Message = {
			id: generateId(),
			text: WELCOME_MESSAGE,
			sender: "bot",
			timestamp: new Date(),
		};

		setMessages([welcomeMessage]);
	}, []); // Pusta tablica zależności = uruchom tylko przy montowaniu

	/**
	 * Wysyła wiadomość użytkownika i generuje odpowiedź bota
	 *
	 * Proces:
	 * 1. Dodaje wiadomość użytkownika do historii
	 * 2. Ustawia isTyping = true (pokazuje "bot pisze...")
	 * 3. Po 300-500ms generuje odpowiedź bota
	 * 4. Dodaje odpowiedź bota do historii
	 * 5. Ustawia isTyping = false
	 *
	 * @param text - Treść wiadomości użytkownika
	 */
	const sendMessage = (text: string) => {
		// Walidacja - nie wysyłaj pustych wiadomości
		const trimmedText = text.trim();
		if (!trimmedText) {
			return;
		}

		// Dodaj wiadomość użytkownika
		const userMessage: Message = {
			id: generateId(),
			text: trimmedText,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);

		// Pokaż typing indicator
		setIsTyping(true);

		// Symuluj opóźnienie odpowiedzi (300-500ms dla naturalności)
		const typingDelay = 300 + Math.random() * 200; // 300-500ms

		setTimeout(() => {
			// Wygeneruj odpowiedź bota
			const botResponseText = processMessage(trimmedText);

			const botMessage: Message = {
				id: generateId(),
				text: botResponseText,
				sender: "bot",
				timestamp: new Date(),
			};

			// Dodaj odpowiedź bota i wyłącz typing indicator
			setMessages((prev) => [...prev, botMessage]);
			setIsTyping(false);
		}, typingDelay);
	};

	return {
		messages,
		isTyping,
		sendMessage,
	};
}
