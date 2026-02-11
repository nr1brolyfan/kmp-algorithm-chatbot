import { Bot, User } from "lucide-react";
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
				"group fade-in-0 slide-in-from-bottom-4 mb-4 flex w-full animate-in gap-3 duration-500",
				isUser ? "justify-end" : "justify-start"
			)}
		>
			{/* Awatar bota - po lewej */}
			{!isUser && (
				<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md ring-2 ring-blue-100 transition-transform group-hover:scale-110">
					<Bot className="size-4 text-white" />
				</div>
			)}

			{/* Bąbelek wiadomości */}
			<div
				className={cn(
					"relative max-w-[85%] rounded-2xl px-4 py-3 shadow-md transition-all duration-200 sm:max-w-[75%]",
					isUser
						? "rounded-br-md bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-blue-200/50 hover:shadow-lg"
						: "rounded-bl-md border border-border/50 bg-white text-gray-900 shadow-gray-200/50 hover:shadow-lg"
				)}
			>
				{/* Treść wiadomości */}
				<p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
					{message.text}
				</p>

				{/* Timestamp */}
				<time
					className={cn(
						"mt-1.5 block text-xs opacity-70",
						isUser ? "text-blue-50" : "text-gray-500"
					)}
				>
					{message.timestamp.toLocaleTimeString("pl-PL", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</time>

				{/* Mały trójkącik (tail) */}
				<div
					className={cn(
						"absolute top-3 size-0 border-8 border-transparent",
						isUser
							? "right-[-6px] border-l-blue-700"
							: "left-[-6px] border-r-white"
					)}
				/>
			</div>

			{/* Awatar użytkownika - po prawej */}
			{isUser && (
				<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-md ring-2 ring-gray-200 transition-transform group-hover:scale-110">
					<User className="size-4 text-white" />
				</div>
			)}
		</div>
	);
}
