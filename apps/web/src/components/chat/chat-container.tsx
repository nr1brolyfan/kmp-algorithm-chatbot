import { Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useChat } from "@/hooks/use-chat";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";

// Główny kontener czatu - łączy wszystkie komponenty
export function ChatContainer() {
	const { messages, isTyping, sendMessage } = useChat();

	return (
		<Card className="mx-auto flex h-[90vh] max-h-[800px] w-full max-w-4xl flex-col gap-0 overflow-hidden rounded-2xl border-0 bg-transparent p-0 shadow-2xl ring-0 backdrop-blur-sm transition-all duration-300 hover:shadow-3xl sm:h-[600px]">
			{/* Nagłówek czatu - nowoczesny gradient */}
			<CardHeader className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 px-4 py-4 text-white sm:px-6">
				{/* Dekoracyjne tło */}
				<div className="absolute inset-0 bg-grid-white/10" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

				{/* Zawartość nagłówka */}
				<div className="relative flex items-center gap-3">
					{/* Ikona bota z animacją */}
					<div className="flex size-12 items-center justify-center rounded-full bg-white/20 shadow-lg ring-2 ring-white/30 backdrop-blur-md transition-transform hover:scale-110">
						<Bot className="size-6 text-white" />
					</div>

					{/* Tytuł i opis */}
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<h2 className="font-bold text-lg sm:text-xl">Asystent Sklepu</h2>
							<Sparkles className="size-4 animate-pulse text-yellow-300" />
						</div>
						<p className="mt-0.5 text-blue-100 text-xs sm:text-sm">
							Pomoc 24/7 • Zamówienia • Dostawa • Zwroty
						</p>
					</div>

					{/* Status badge */}
					<div className="hidden items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 ring-1 ring-green-400/30 backdrop-blur-sm sm:flex">
						<span className="size-2 animate-pulse rounded-full bg-green-400 shadow-green-400/50 shadow-lg" />
						<span className="font-medium text-green-100 text-xs">Online</span>
					</div>
				</div>
			</CardHeader>

			{/* Treść karty - lista wiadomości */}
			<CardContent className="flex flex-1 flex-col overflow-hidden p-0">
				<ChatMessages isTyping={isTyping} messages={messages} />
				<ChatInput disabled={isTyping} onSendMessage={sendMessage} />
			</CardContent>
		</Card>
	);
}
