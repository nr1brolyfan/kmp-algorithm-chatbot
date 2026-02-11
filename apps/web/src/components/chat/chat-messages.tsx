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
		<div className="relative flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4 sm:p-6">
			{/* Dekoracyjny pattern w tle */}
			<div className="pointer-events-none absolute inset-0 bg-grid-gray-100/50 opacity-30" />

			{/* Lista wiadomości */}
			<div className="relative space-y-2">
				{messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))}

				{/* Wskaźnik "bot pisze..." */}
				{isTyping && <TypingIndicator />}

				{/* Invisible element do auto-scroll */}
				<div ref={messagesEndRef} />
			</div>
		</div>
	);
}
