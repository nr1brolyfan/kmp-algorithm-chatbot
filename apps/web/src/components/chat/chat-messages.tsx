import { useEffect, useRef } from "react";
import type { Message } from "@/lib/chatbot/types";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";

interface ChatMessagesProps {
	messages: Message[];
	isTyping: boolean;
}

// Komponent scrollowalnej listy wiadomości
export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const messagesLengthRef = useRef(messages.length);
	const isTypingRef = useRef(isTyping);

	// Auto-scroll do najnowszej wiadomości po dodaniu nowej lub zmianie stanu typing
	useEffect(() => {
		if (
			messages.length !== messagesLengthRef.current ||
			isTyping !== isTypingRef.current
		) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
			messagesLengthRef.current = messages.length;
			isTypingRef.current = isTyping;
		}
	});

	return (
		<div className="flex-1 space-y-2 overflow-y-auto bg-gray-50 p-4">
			{/* Lista wiadomości */}
			{messages.map((message) => (
				<ChatMessage key={message.id} message={message} />
			))}

			{/* Wskaźnik "bot pisze..." */}
			{isTyping && <TypingIndicator />}

			{/* Invisible element do auto-scroll */}
			<div ref={messagesEndRef} />
		</div>
	);
}
