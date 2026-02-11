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
			"Status zamówienia możesz sprawdzić w zakładce 'Moje zamówienia' po zalogowaniu. Potrzebujesz numeru zamówienia?",
			"Aby sprawdzić status zamówienia, zaloguj się i przejdź do sekcji 'Moje zamówienia'. Tam znajdziesz aktualne informacje o przesyłce.",
		],
		priority: 2,
		category: "orders",
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
			"Zamówienie można anulować do momentu wysyłki. Skontaktuj się z nami przez formularz lub zadzwoń na infolinię.",
			"Jeśli zamówienie nie zostało jeszcze wysłane, możemy je anulować. Napisz do nas lub zadzwoń na infolinię jak najszybciej.",
		],
		priority: 2,
		category: "orders",
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
			"Koszt dostawy: kurier 15 zł, paczkomat 12 zł, darmowa dostawa od 200 zł.",
			"Oferujemy dostawę kurierem za 15 zł, do paczkomatu za 12 zł. Przy zamówieniach powyżej 200 zł dostawa jest darmowa!",
		],
		priority: 2,
		category: "delivery",
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
			"Aby złożyć reklamację, wypełnij formularz reklamacyjny i dołącz zdjęcia produktu. Rozpatrzymy ją w ciągu 14 dni.",
			"Reklamację można zgłosić przez formularz online. Pamiętaj o dołączeniu zdjęć oraz opisu problemu. Odpowiemy w ciągu 14 dni.",
		],
		priority: 2,
		category: "returns",
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
			"Tabelę rozmiarów znajdziesz na stronie każdego produktu. Jeśli masz wątpliwości, napisz - pomożemy!",
			"Każdy produkt ma szczegółową tabelę rozmiarów. W razie pytań chętnie doradzimy odpowiedni rozmiar.",
		],
		priority: 1,
		category: "products",
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
