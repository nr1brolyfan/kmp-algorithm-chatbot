import { Loader2, SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatInputProps {
	onSendMessage: (text: string) => void;
	disabled?: boolean;
}

// Przykładowe pytania do rotacji w placeholderze
const EXAMPLE_QUESTIONS = [
	"Gdzie jest moje zamówienie?",
	"Ile kosztuje dostawa?",
	"Jak zwrócić produkt?",
	"Jakie metody płatności akceptujecie?",
	"Jak wybrać rozmiar?",
	"Jak długo trwa dostawa?",
	"Chcę anulować zamówienie",
	"Czy mogę płacić ratami?",
	"Czy produkt jest dostępny?",
	"Chcę złożyć reklamację",
];

// Komponent pola wpisywania wiadomości
export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
	const [inputValue, setInputValue] = useState("");
	const [placeholderIndex, setPlaceholderIndex] = useState(0);

	// Rotacja placeholdera co 3 sekundy
	useEffect(() => {
		const interval = setInterval(() => {
			setPlaceholderIndex((prev) => (prev + 1) % EXAMPLE_QUESTIONS.length);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	// Obsługa wysyłania wiadomości
	const handleSend = () => {
		const trimmedValue = inputValue.trim();

		// Walidacja - nie wysyłaj pustych wiadomości
		if (trimmedValue.length === 0) {
			return;
		}

		onSendMessage(trimmedValue);
		setInputValue(""); // Wyczyść pole po wysłaniu
	};

	// Obsługa klawisza Enter
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const canSend = !disabled && inputValue.trim().length > 0;

	return (
		<div className="bg-gradient-to-b from-white to-gray-50 p-4">
			<div className="flex gap-2">
				{/* Input z lepszym stylingiem */}
				<div className="relative flex-1">
					<Input
						aria-label="Pole tekstowe wiadomości"
						className={cn(
							"h-11 rounded-xl border-2 bg-white pr-4 pl-4 text-gray-900 shadow-sm transition-all duration-200",
							"placeholder:text-gray-400",
							"focus-visible:border-blue-500 focus-visible:shadow-blue-100 focus-visible:shadow-md",
							disabled && "cursor-not-allowed opacity-50"
						)}
						disabled={disabled}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder={
							disabled
								? "Czekam na odpowiedź..."
								: EXAMPLE_QUESTIONS[placeholderIndex]
						}
						value={inputValue}
					/>

					{/* Licznik znaków (opcjonalnie, gdy > 100 znaków) */}
					{inputValue.length > 100 && (
						<span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 text-xs">
							{inputValue.length}
						</span>
					)}
				</div>

				{/* Przycisk wysyłania */}
				<Button
					aria-label="Wyślij wiadomość"
					className={cn(
						"size-11 shrink-0 rounded-xl shadow-md transition-all duration-200",
						canSend &&
							"bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-200 hover:shadow-lg"
					)}
					disabled={!canSend}
					onClick={handleSend}
					size="icon"
				>
					{disabled ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						<SendHorizontal className="size-4" />
					)}
				</Button>
			</div>

			{/* Podpowiedź - hint */}
			<p className="mt-2 text-center text-gray-500 text-xs">
				Naciśnij{" "}
				<kbd className="rounded bg-gray-200 px-1.5 py-0.5 font-mono">Enter</kbd>{" "}
				aby wysłać
			</p>
		</div>
	);
}
