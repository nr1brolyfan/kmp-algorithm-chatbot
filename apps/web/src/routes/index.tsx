import { createFileRoute } from "@tanstack/react-router";
import { ChatContainer } from "@/components/chat/chat-container";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-8">
			{/* Dekoracyjne elementy tła */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				{/* Gradient orbs */}
				<div className="absolute -top-24 -right-24 size-96 rounded-full bg-blue-400/20 blur-3xl" />
				<div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-purple-400/20 blur-3xl" />
				<div className="absolute top-1/2 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/10 blur-3xl" />
			</div>

			{/* Zawartość */}
			<div className="container relative mx-auto px-4">
				{/* Nagłówek strony */}
				<header className="mb-6 text-center sm:mb-8">
					<div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 font-medium text-blue-700 text-sm">
						<span className="size-2 animate-pulse rounded-full bg-blue-500" />
						Projekt Zaliczeniowy • Algorytmy i Struktury Danych
					</div>
					<h1 className="mb-2 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text font-bold text-3xl text-transparent sm:text-5xl">
						Chatbot Obsługi Klienta
					</h1>
					<p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
						Inteligentny asystent wykorzystujący algorytm KMP do dopasowywania
						wzorców tekstowych
					</p>
				</header>

				{/* Główny kontener czatu - wycentrowany */}
				<div className="flex justify-center">
					<ChatContainer />
				</div>

				{/* Footer z informacjami */}
				<footer className="mt-6 text-center text-gray-500 text-sm sm:mt-8">
					<p>
						Implementacja algorytmu Knutha-Morrisa-Pratta (KMP) •{" "}
						<span className="font-medium text-gray-700">O(n+m)</span> złożoność
						czasowa
					</p>
				</footer>
			</div>
		</div>
	);
}
