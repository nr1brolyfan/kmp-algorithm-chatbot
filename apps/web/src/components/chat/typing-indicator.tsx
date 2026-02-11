import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Komponent animacji "bot pisze..."
export function TypingIndicator() {
	return (
		<div className="mb-4 flex w-full justify-start">
			<Card className="max-w-[80%] rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 text-gray-900 shadow-sm">
				<div className="flex items-center gap-1">
					<span className="mr-2 text-gray-600 text-sm">Bot pisze</span>
					<div className="flex gap-1">
						{/* Trzy pulsujące kropki */}
						<Dot delay="0ms" />
						<Dot delay="150ms" />
						<Dot delay="300ms" />
					</div>
				</div>
			</Card>
		</div>
	);
}

// Pojedyncza animowana kropka
function Dot({ delay }: { delay: string }) {
	return (
		<span
			className={cn("h-2 w-2 rounded-full bg-gray-500", "animate-pulse")}
			style={{
				animationDelay: delay,
				animationDuration: "1.4s",
			}}
		/>
	);
}
