/**
 * Baza wiedzy chatbota - wzorce i odpowiedzi
 * Zawiera wszystkie znane wzorce pytań i odpowiedzi dla różnych kategorii
 */

import type { Pattern } from "./types";

// Wiadomość powitalna wyświetlana automatycznie przy starcie
export const WELCOME_MESSAGE =
	"Cześć! Jestem asystentem sklepu internetowego. Mogę pomóc Ci z pytaniami dotyczącymi zamówień, dostawy, zwrotów i płatności. W czym mogę Ci pomóc?";

// Odpowiedź domyślna gdy bot nie rozpoznaje pytania
export const DEFAULT_RESPONSE =
	"Przepraszam, nie do końca rozumiem. Czy możesz sformułować pytanie inaczej? Mogę pomóc z: zamówieniami, dostawą, zwrotami, płatnościami.";

// Baza wzorców (keywords są znormalizowane: lowercase, bez diakrytyków, z odmianami)
export const PATTERNS: Pattern[] = [
	// === POWITANIA ===
	{
		id: "greeting-1",
		keywords: [
			"czesc",
			"witaj",
			"hej",
			"dzien dobry",
			"siema",
			"witam",
			"hello",
			"hi",
		],
		responses: ["Witaj! Jestem asystentem sklepu. W czym mogę Ci pomóc?"],
		priority: 1,
		category: "greeting",
	},

	// === POŻEGNANIA ===
	{
		id: "farewell-1",
		keywords: [
			"do widzenia",
			"pa",
			"zegnaj",
			"nara",
			"do zobaczenia",
			"bye",
			"dziekuje",
		],
		responses: [
			"Do widzenia! Zapraszam ponownie.",
			"Miło było Ci pomóc. Do zobaczenia!",
		],
		priority: 1,
		category: "farewell",
	},

	// === ZAMÓWIENIA - Status ===
	{
		id: "order-status",
		keywords: [
			"zamowienie",
			"zamowienia",
			"zamowieniu",
			"status",
			"gdzie",
			"sledzenie",
			"sledzic",
			"sprawdzic",
		],
		responses: [
			"Status zamówienia możesz sprawdzić w zakładce 'Moje zamówienia' po zalogowaniu. Czy masz numer zamówienia?",
		],
		priority: 2,
		category: "orders",
		followUp: {
			question:
				"Podaj proszę numer zamówienia (format: 12345), a sprawdzę jego status dla Ciebie.",
			expectedKeywords: ["numer", "nr", "zamowienie", "nie", "tak"],
			context: "order-number",
		},
	},

	// === ZAMÓWIENIA - Składanie ===
	{
		id: "order-place",
		keywords: [
			"zlozyc zamowienie",
			"jak zamowic",
			"jak kupic",
			"kupno",
			"zakup",
			"zamawiac",
		],
		responses: [
			"Aby złożyć zamówienie, dodaj produkty do koszyka i przejdź do kasy. Możesz zamówić jako gość lub po zalogowaniu.",
			"Proces składania zamówienia jest prosty: wybierz produkty, dodaj do koszyka, przejdź do kasy i finalizuj zakup. Nie musisz mieć konta!",
		],
		priority: 2,
		category: "orders",
	},

	// === ZAMÓWIENIA - Anulowanie ===
	{
		id: "order-cancel",
		keywords: [
			"anulowac",
			"anulacja",
			"anuluj",
			"rezygnacja",
			"odwolac",
			"wycofac",
		],
		responses: [
			"Zamówienie można anulować do momentu wysyłki. Czy mogę prosić o numer zamówienia, które chcesz anulować?",
		],
		priority: 2,
		category: "orders",
		followUp: {
			question:
				"Podaj numer zamówienia do anulowania. Sprawdzę, czy możemy je jeszcze wycofać.",
			expectedKeywords: ["numer", "nr", "nie", "rezygnuje"],
			context: "cancel-order-number",
		},
	},

	// === DOSTAWA - Koszt ===
	{
		id: "delivery-cost",
		keywords: [
			"koszt dostawy",
			"ile kosztuje dostawa",
			"cena wysylki",
			"oplata",
			"platnosc za dostawe",
		],
		responses: [
			"Koszt dostawy: kurier 15 zł, paczkomat 12 zł, darmowa dostawa od 200 zł. Którą opcję Cię interesuje?",
		],
		priority: 2,
		category: "delivery",
		followUp: {
			question:
				"Chcesz dowiedzieć się więcej o dostawie kurierskiej czy paczkomatami?",
			expectedKeywords: ["kurier", "paczkomat", "inpost", "darmowa", "nie"],
			context: "delivery-method-interest",
		},
	},

	// === DOSTAWA - Czas ===
	{
		id: "delivery-time",
		keywords: [
			"czas dostawy",
			"jak dlugo",
			"kiedy dotrze",
			"termin",
			"ile czasu",
			"dni",
		],
		responses: [
			"Standardowa dostawa trwa 2-3 dni robocze. Ekspresowa dostawa następnego dnia kosztuje 25 zł.",
			"Zamówienia są realizowane w ciągu 2-3 dni roboczych. Oferujemy również dostawę ekspresową (następny dzień) za 25 zł.",
		],
		priority: 2,
		category: "delivery",
	},

	// === DOSTAWA - Zagraniczna ===
	{
		id: "delivery-international",
		keywords: [
			"dostawa zagraniczna",
			"za granice",
			"miedzynarodowa",
			"europa",
			"zagranica",
		],
		responses: [
			"Realizujemy wysyłki do krajów UE. Koszt i czas zależą od kraju - sprawdź szczegóły w regulaminie.",
			"Wysyłamy zamówienia do wszystkich krajów Unii Europejskiej. Szczegóły dotyczące kosztów i terminów znajdziesz w naszym regulaminie.",
		],
		priority: 1,
		category: "delivery",
	},

	// === ZWROTY - Ogólne ===
	{
		id: "returns-general",
		keywords: ["zwrot", "zwrotu", "zwrocic", "oddac", "zwracam", "odeslic"],
		responses: [
			"Masz 14 dni na zwrot towaru bez podania przyczyny. Wypełnij formularz zwrotu w zakładce 'Moje zamówienia'.",
			"Prawo do zwrotu przysługuje w ciągu 14 dni od otrzymania przesyłki. Formularz zwrotu dostępny jest w Twoim panelu klienta.",
		],
		priority: 2,
		category: "returns",
	},

	// === ZWROTY - Reklamacja ===
	{
		id: "returns-complaint",
		keywords: [
			"reklamacja",
			"reklamacje",
			"uszkodzony",
			"wadliwy",
			"zepsuty",
			"zniszczony",
			"niezgodny",
		],
		responses: [
			"Przykro mi słyszeć o problemie z produktem. Aby złożyć reklamację, potrzebuję kilku informacji. Jaki jest problem z produktem?",
		],
		priority: 2,
		category: "returns",
		followUp: {
			question:
				"Opisz proszę co jest nie tak z produktem - to pomoże nam szybciej rozpatrzyć reklamację.",
			expectedKeywords: [
				"uszkodzony",
				"zepsuty",
				"dziala",
				"nie",
				"zle",
				"reklamuje",
			],
			context: "complaint-details",
		},
	},

	// === PŁATNOŚCI - Metody ===
	{
		id: "payments-methods",
		keywords: [
			"metody platnosci",
			"jak zaplacic",
			"formy platnosci",
			"platnosc",
			"opcje platnosci",
		],
		responses: [
			"Akceptujemy: karty płatnicze, BLIK, przelewy online, płatność przy odbiorze (+ 5 zł).",
			"Możesz zapłacić kartą, BLIKiem, przelewem online lub przy odbiorze (dodatkowa opłata 5 zł).",
		],
		priority: 2,
		category: "payments",
	},

	// === PŁATNOŚCI - Faktura ===
	{
		id: "payments-invoice",
		keywords: ["faktura", "vat", "fakture", "fakturze", "faktur"],
		responses: [
			"Fakturę VAT możesz pobrać w zakładce 'Moje zamówienia' lub otrzymasz ją mailem.",
			"Faktura VAT jest dostępna w panelu klienta oraz zostanie wysłana na Twój adres email po realizacji zamówienia.",
		],
		priority: 2,
		category: "payments",
	},

	// === PŁATNOŚCI - Raty ===
	{
		id: "payments-installments",
		keywords: [
			"raty",
			"ratalna",
			"ratalnie",
			"rozlozyc",
			"na raty",
			"ratalnych",
		],
		responses: [
			"Oferujemy raty 0% przy zakupach powyżej 300 zł. Wybierz tę opcję przy finalizacji zamówienia.",
			"Zakupy powyżej 300 zł można rozłożyć na raty 0%. Opcja dostępna podczas składania zamówienia.",
		],
		priority: 2,
		category: "payments",
	},

	// === PRODUKTY - Dostępność ===
	{
		id: "products-availability",
		keywords: [
			"dostepnosc",
			"czy jest",
			"w magazynie",
			"dostepny",
			"niedostepny",
			"brak",
		],
		responses: [
			"Dostępność produktów wyświetlana jest na stronie produktu. Możesz też zapisać się na powiadomienie.",
			"Aktualny stan magazynowy widoczny jest przy każdym produkcie. Jeśli coś jest niedostępne, możesz zapisać się na alert.",
		],
		priority: 1,
		category: "products",
	},

	// === PRODUKTY - Rozmiary ===
	{
		id: "products-sizes",
		keywords: [
			"rozmiar",
			"rozmiarowka",
			"tabela rozmiarow",
			"jaki rozmiar",
			"rozmiary",
			"wymiary",
		],
		responses: [
			"Chętnie pomogę dobrać rozmiar! Jaki produkt Cię interesuje i jaki zwykle nosisz rozmiar?",
		],
		priority: 1,
		category: "products",
		followUp: {
			question:
				"Powiedz mi jaki produkt Cię interesuje, a pomogę wybrać odpowiedni rozmiar.",
			expectedKeywords: [
				"buty",
				"ubranie",
				"spodnie",
				"koszulka",
				"rozmiar",
				"m",
				"l",
				"xl",
				"nie",
			],
			context: "size-help",
		},
	},

	// === OGÓLNE - Kontakt ===
	{
		id: "general-contact",
		keywords: [
			"kontakt",
			"numer",
			"telefon",
			"email",
			"infolinia",
			"jak sie skontaktowac",
		],
		responses: [
			"Możesz skontaktować się z nami przez formularz kontaktowy, email: kontakt@sklep.pl lub telefon: 123-456-789.",
			"Jesteśmy dostępni przez email (kontakt@sklep.pl), telefon (123-456-789) lub formularz kontaktowy na stronie.",
		],
		priority: 1,
		category: "general",
	},

	// === OGÓLNE - Godziny otwarcia ===
	{
		id: "general-hours",
		keywords: ["godziny", "otwarcia", "czynne", "kiedy", "otwarte"],
		responses: [
			"Sklep internetowy jest dostępny 24/7. Infolinia działa pon-pt 9:00-17:00.",
			"Zamówienia online można składać o każdej porze. Nasz zespół obsługi pracuje w dni robocze od 9:00 do 17:00.",
		],
		priority: 1,
		category: "general",
	},
];

// === WZORCE ODPOWIEDZI NA FOLLOW-UP ===

// Odpowiedzi na podanie numeru zamówienia
export const ORDER_NUMBER_RESPONSES = [
	"Sprawdzam zamówienie {number}... Status: W trakcie realizacji. Paczka zostanie wysłana w ciągu 24h!",
	"Znalazłem zamówienie {number}! Obecnie jest pakowane i wkrótce zostanie wysłane kurierem.",
	"Zamówienie {number} jest już w drodze! Możesz śledzić paczkę pod numerem śledzenia, który dostałeś mailem.",
];

// Odpowiedzi na podanie szczegółów reklamacji
export const COMPLAINT_DETAILS_RESPONSES = [
	"Rozumiem problem. Dziękuję za opis. Wypełnij proszę formularz reklamacyjny w panelu klienta i dołącz zdjęcia. Odpowiemy w ciągu 14 dni.",
	"Przykro mi z tego powodu. Na podstawie opisu przygotuję dla Ciebie formularz reklamacyjny. Pamiętaj o dołączeniu zdjęć produktu.",
];

// Odpowiedzi na pytanie o metodę dostawy
export const DELIVERY_METHOD_RESPONSES: Record<string, string[]> = {
	kurier: [
		"Dostawa kurierem kosztuje 15 zł i trwa 2-3 dni robocze. Możesz wybrać ekspres (24h) za 25 zł. Chcesz więcej szczegółów?",
	],
	paczkomat: [
		"Paczkomaty InPost to 12 zł, dostawa w ciągu 2-3 dni. Możesz odebrać przesyłkę 24/7 w dowolnym momencie. Wygodne!",
	],
	darmowa: [
		"Przy zamówieniach od 200 zł dostawa jest całkowicie darmowa, niezależnie od metody! Dodaj coś jeszcze do koszyka? 😊",
	],
};

// Odpowiedzi na pomoc z rozmiarem
export const SIZE_HELP_RESPONSES = [
	"Super! Jeśli zazwyczaj nosisz {size}, to polecam wybrać ten sam rozmiar. Nasze produkty są zgodne ze standardem EU.",
	"W przypadku tego produktu polecam sprawdzić tabelę rozmiarów na stronie - znajdziesz tam dokładne wymiary. Mogę pomóc z konkretnymi pytaniami!",
];

// Odpowiedzi gdy użytkownik rezygnuje z follow-up
export const NO_THANKS_RESPONSES = [
	"W porządku! Jeśli będziesz mieć jeszcze jakieś pytania, jestem tutaj. 😊",
	"Rozumiem. W razie potrzeby chętnie pomogę!",
	"Dobrze, daj znać gdybyś potrzebował pomocy z czymś innym.",
];
