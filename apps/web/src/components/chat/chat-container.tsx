import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChat } from "@/hooks/use-chat";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";

// Główny kontener czatu - łączy wszystkie komponenty
export function ChatContainer() {
	const { messages, isTyping, sendMessage } = useChat();

	return (
		<Card className="mx-auto flex h-[600px] w-full max-w-3xl flex-col shadow-lg">
			{/* Nagłówek czatu */}
			<CardHeader className="border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
				<CardTitle className="font-semibold text-xl">
					Asystent Sklepu Internetowego
				</CardTitle>
				<p className="mt-1 text-blue-100 text-sm">
					Pomoc w zakupach, zamówieniach i dostawach
				</p>
			</CardHeader>

			{/* Treść karty - lista wiadomości */}
			<CardContent className="flex flex-1 flex-col overflow-hidden p-0">
				<ChatMessages isTyping={isTyping} messages={messages} />
				<ChatInput disabled={isTyping} onSendMessage={sendMessage} />
			</CardContent>
		</Card>
	);
}
