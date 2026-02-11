import { Card } from "@/components/ui/card";
import type { Message } from "@/lib/chatbot/types";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
	message: Message;
}

// Komponent pojedynczej wiadomości w czacie
export function ChatMessage({ message }: ChatMessageProps) {
	const isUser = message.sender === "user";

	return (
		<div
			className={cn(
				"mb-4 flex w-full",
				isUser ? "justify-end" : "justify-start"
			)}
		>
			<Card
				className={cn(
					"max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
					isUser
						? "rounded-br-sm bg-blue-600 text-white" // User: niebieski, prawa strona
						: "rounded-bl-sm bg-gray-100 text-gray-900" // Bot: szary, lewa strona
				)}
			>
				<p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
					{message.text}
				</p>

				{/* Timestamp - opcjonalnie, w subtelnym kolorze */}
				<time
					className={cn(
						"mt-1.5 block text-xs",
						isUser ? "text-blue-100" : "text-gray-500"
					)}
				>
					{message.timestamp.toLocaleTimeString("pl-PL", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</time>
			</Card>
		</div>
	);
}
