import { createFileRoute } from "@tanstack/react-router";
import { ChatContainer } from "@/components/chat/chat-container";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
			<div className="container mx-auto px-4">
				{/* Nagłówek strony */}
				<header className="mb-8 text-center">
					<h1 className="mb-2 font-bold text-4xl text-gray-900">
						Chatbot Obsługi Klienta
					</h1>
					<p className="text-gray-600 text-lg">
						Sklep Internetowy - Asystent AI
					</p>
				</header>

				{/* Główny kontener czatu - wycentrowany */}
				<div className="flex justify-center">
					<ChatContainer />
				</div>
			</div>
		</div>
	);
}
