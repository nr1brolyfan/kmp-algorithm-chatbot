import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
	onSendMessage: (text: string) => void;
	disabled?: boolean;
}

// Komponent pola wpisywania wiadomości
export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
	const [inputValue, setInputValue] = useState("");

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

	return (
		<div className="flex gap-2 border-t bg-white p-4">
			<Input
				aria-label="Pole tekstowe wiadomości"
				className="flex-1"
				disabled={disabled}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Wpisz swoją wiadomość..."
				value={inputValue}
			/>
			<Button
				aria-label="Wyślij wiadomość"
				disabled={disabled || inputValue.trim().length === 0}
				onClick={handleSend}
				size="icon"
			>
				<SendHorizontal className="h-4 w-4" />
			</Button>
		</div>
	);
}
