import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

// Komponent animacji "bot pisze..."
export function TypingIndicator() {
	return (
		<div className="group fade-in-0 slide-in-from-bottom-2 mb-4 flex w-full animate-in gap-3 duration-300">
			{/* Awatar bota */}
			<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md ring-2 ring-blue-100">
				<Bot className="size-4 text-white" />
			</div>

			{/* Bąbelek z animacją */}
			<div className="relative max-w-[85%] rounded-2xl rounded-bl-md border border-border/50 bg-white px-4 py-3 shadow-md">
				<div className="flex items-center gap-2">
					<span className="text-gray-600 text-sm">Pisze</span>
					<div className="flex gap-1">
						{/* Trzy skaczące kropki */}
						<Dot delay="0s" />
						<Dot delay="0.15s" />
						<Dot delay="0.3s" />
					</div>
				</div>

				{/* Mały trójkącik (tail) */}
				<div className="absolute top-3 left-[-6px] size-0 border-8 border-transparent border-r-white" />
			</div>
		</div>
	);
}

// Pojedyncza animowana kropka - bounce animation
function Dot({ delay }: { delay: string }) {
	return (
		<span
			className={cn("size-2 animate-bounce rounded-full bg-blue-500")}
			style={{
				animationDelay: delay,
				animationDuration: "1s",
			}}
		/>
	);
}
