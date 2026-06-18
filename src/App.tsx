import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Trophy,
  ListChecks,
  AlertCircle,
  Heart,
  Sparkles,
} from 'lucide-react';

type Category = 'Wszystkie' | 'PRINCE2' | 'PMI' | 'PRINCE2 cz. 2';
type Mode = 'nauka' | 'egzamin';

interface Question {
  id: string;
  category: Category;
  text: string;
  options: string[];
  correctAnswer: string;
}

const questionsDatabase: Question[] = [
  // --- PRINCE2 ZESTAW 1 ---
  {
    id: 'pr-1', category: 'PRINCE2',
    text: 'Co służy do uruchomienia procesu Przygotowanie Projektu?',
    options: ['Klienci', 'Ludzie', 'Korzyści', 'Procesy'],
    correctAnswer: 'Korzyści'
  },
  {
    id: 'pr-2', category: 'PRINCE2',
    text: 'Która rola ma obowiązek stworzenia Planu Zespołu w procesie Zarządzanie Dostarczaniem Produktów?',
    options: ['Kierownik Projektu', 'Kierownik Zespołu', 'Wsparcie Projektu', 'Główny Użytkownik'],
    correctAnswer: 'Kierownik Zespołu'
  },
  {
    id: 'pr-3', category: 'PRINCE2',
    text: 'Co jest przeznaczeniem Założeń Projektu?',
    options: ['Określają jak i kiedy może zostać zmierzone osiągnięcie korzyści z projektu', 'Określają doświadczenia z wcześniejszych projektów oraz jak mogę one wpłynąć na dany projekt', 'Określają techniki i standardy jakości, które będą stosowane dla osiągnięcia wymaganych poziomów jakości', 'Zapewniają informacje wystarczające do podjęcia decyzji o zainicjowaniu projektu'],
    correctAnswer: 'Zapewniają informacje wystarczające do podjęcia decyzji o zainicjowaniu projektu'
  },
  {
    id: 'pr-4', category: 'PRINCE2',
    text: 'Co jest cechą charakterystyczną projektu?',
    options: ['Niskie ryzyko', 'Unikanie napięć pomiędzy organizacjami', 'Zwykła działalność biznesowa', 'Wielofunkcyjność'],
    correctAnswer: 'Wielofunkcyjność'
  },
  {
    id: 'pr-5', category: 'PRINCE2',
    text: 'W którym procesie są określone techniki i standardy zarządzania ryzykiem w projekcie?',
    options: ['Przygotowanie Projektu', 'Zarządzanie Strategiczne Projektem', 'Inicjowanie Projektu', 'Zarządzanie Dostarczaniem Produktów'],
    correctAnswer: 'Zarządzanie Dostarczaniem Produktów'
  },
  {
    id: 'pr-6', category: 'PRINCE2',
    text: 'Który plan jest obowiązkowy?',
    options: ['Plan Zespołu', 'Plan Nadzwyczajny', 'Plan Projektu', 'Plan Programu'],
    correctAnswer: 'Plan Projektu'
  },
  {
    id: 'pr-7', category: 'PRINCE2',
    text: 'Które środowisko przyjęto w PRINCE2 za podstawę?',
    options: ['Techniki Informatyczne', 'Klient/dostawca', 'Zaopatrzenie', 'Program'],
    correctAnswer: 'Klient/dostawca'
  },
  {
    id: 'pr-8', category: 'PRINCE2',
    text: 'Który obowiązek należy do obowiązków Kierownika Projektu?',
    options: ['Powierzenie Obsłudze Zmian obowiązków dotyczących zmian', 'Udokumentowanie Strategii Zarządzania Komunikacją', 'Zatwierdzanie tolerancji etapów', 'Zatwierdzanie jakościowych oczekiwań Klienta'],
    correctAnswer: 'Udokumentowanie Strategii Zarządzania Komunikacją'
  },
  {
    id: 'pr-9', category: 'PRINCE2',
    text: 'Co NIE jest identyfikowane podczas tworzenia struktury podziału produktów?',
    options: ['Produkty, które mają zostać wytworzone przez własne zasoby', 'Produkty, które mają zostać zmodyfikowane', 'Zasoby potrzebne do wytworzenia produktów', 'Produkty, które mają zostać wytworzone przez dostawców zewnętrznych'],
    correctAnswer: 'Zasoby potrzebne do wytworzenia produktów'
  },
  {
    id: 'pr-10', category: 'PRINCE2',
    text: 'Które z następujących ról może także pełnić Kierownik Projektu? (1. Obsługa Zmian, 2. Nadzór Projektu, 3. Wparcie Projektu, 4. Kierownik Zespołu)',
    options: ['1, 2, 3', '1, 2, 4', '1, 3, 4', '2, 3, 4'],
    correctAnswer: '1, 3, 4'
  },
  {
    id: 'pr-11', category: 'PRINCE2',
    text: 'Która zasada PRINCE2 popiera planowanie tylko do poziomu szczegółowości, który jest przewidywalny i możliwy do zarządzania?',
    options: ['Ciągła zasadność biznesowa', 'Zarządzanie z wykorzystaniem tolerancji', 'Koncentracja na produktach', 'Zarządzanie etapowe'],
    correctAnswer: 'Zarządzanie etapowe'
  },
  {
    id: 'pr-12', category: 'PRINCE2',
    text: 'Która rola jest częścią zespołu zarządzania projektem?',
    options: ['Kierownictwo organizacji lub programu', 'Nadzór jakości', 'Interesariusz', 'Nadzór ze strony biznesu'],
    correctAnswer: 'Nadzór ze strony biznesu'
  },
  {
    id: 'pr-13', category: 'PRINCE2',
    text: 'Co jest definicją prawdopodobieństwa ryzyka?',
    options: ['Skala ryzyka, gdyby się ono zmaterializowało', 'Prawdopodobny wpływ na realizację celów projektu', 'Prawdopodobny przedział czasu, kiedy ryzyko może się zmaterializować', 'Miara możliwości zmaterializowania się ryzyka'],
    correctAnswer: 'Miara możliwości zmaterializowania się ryzyka'
  },
  {
    id: 'pr-14', category: 'PRINCE2',
    text: 'W którym planie powinny zostać zaplanowane działania związane z zamykaniem projektu?',
    options: ['W planie Etapu zamykania', 'W Planie Etapu dla ostatniego etapu zarządczego', 'W Planie Etapu Inicjowania', 'W Planie Zespołu'],
    correctAnswer: 'W Planie Etapu dla ostatniego etapu zarządczego'
  },
  {
    id: 'pr-15', category: 'PRINCE2',
    text: 'Kiedy Kierownik Zespołu powinien sporządzić Raport z Punktu Kontrolnego?',
    options: ['Kiedy negocjowana jest Grupa Zadań', 'Z częstotliwością uzgodnioną w Grupie Zadań', 'Po zakończeniu działań sprawdzających jakość każdego produktu', 'Kiedy przegląda postępy etapu'],
    correctAnswer: 'Z częstotliwością uzgodnioną w Grupie Zadań'
  },
  {
    id: 'pr-16', category: 'PRINCE2',
    text: 'Co jest obowiązkiem reprezentanta biznesu w Komitecie Sterującym?',
    options: ['Ustanowienie poziomów tolerancji dla projektu', 'Zagwarantowanie, że projekt przedstawia wartość uzasadniającą poniesione nakłady', 'Potwierdzenie, że projekt dostarczy wymagane funkcjonalności', 'Sprawdzenie, czy produkty projektu osiągnęły wymagane poziomy jakości'],
    correctAnswer: 'Zagwarantowanie, że projekt przedstawia wartość uzasadniającą poniesione nakłady'
  },
  {
    id: 'pr-17', category: 'PRINCE2',
    text: 'Które stwierdzenie dotyczące wyników, rezultatów i korzyści jest prawidłowe?',
    options: ['Wszystkie wyniki dają namacalne korzyści', 'Rezultaty są długoterminowymi wynikami korzyści', 'Wyniki są zmianami sposobu używania produktów projektu', 'Korzyścią jest mierzalna poprawa osiągnięta dzięki rezultatowi'],
    correctAnswer: 'Korzyścią jest mierzalna poprawa osiągnięta dzięki rezultatowi'
  },
  {
    id: 'pr-18', category: 'PRINCE2',
    text: 'Co NIE jest zintegrowanym elementem PRINCE2?',
    options: ['Pryncypia (zasady)', 'Techniki', 'Tematy', 'Dostosowanie PRINCE2 do środowiska projektu'],
    correctAnswer: 'Techniki'
  },
  {
    id: 'pr-19', category: 'PRINCE2',
    text: 'Do czego jest przeznaczony Dziennik Projektu?',
    options: ['Do zapisania produktów i działań zaplanowanych do wykonania w trakcie etapu', 'Do zapisywania nieformalnych zagadnień', 'Do rejestrowania i śledzenia statusu wszystkich produktów wytwarzanych w trakcie etapu', 'Do dostarczenia Komitetowi Sterującemu uaktualnień o postępach etapu'],
    correctAnswer: 'Do zapisywania nieformalnych zagadnień'
  },
  {
    id: 'pr-20', category: 'PRINCE2',
    text: 'Co ma miejsce w procesie Zarządzanie Końcem Etapu?',
    options: ['Okresowy przegląd postępów prac w odniesieniu do Planu Etapu', 'Uzyskanie zatwierdzenia dla wszystkich ukończonych produktów', 'Przekazanie na wyższy szczebel Raportów o Zagadnieniach sporządzonych w trakcie bieżącego etapu', 'Przegląd zasadności biznesowej projektu'],
    correctAnswer: 'Przegląd zasadności biznesowej projektu'
  },

  // --- PRINCE2 ZESTAW 2 ---
  {
    id: 'pr2-1', category: 'PRINCE2 cz. 2',
    text: 'Który proces jest uruchamiany wnioskiem Kierownika Projektu o zainicjowanie projektu?',
    options: ['Zarządzanie Końcem Etapu', 'Zarządzanie Strategiczne Projektem', 'Przygotowanie Projektu', 'Inicjowanie Projektu'],
    correctAnswer: 'Zarządzanie Strategiczne Projektem'
  },
  {
    id: 'pr2-2', category: 'PRINCE2 cz. 2',
    text: 'Który produkt stanowi „kontrakt" pomiędzy Kierownikiem Projektu a Komitetem Sterującym dotyczący projektu?',
    options: ['Opis Produktu Projektu', 'Dokumentacja Inicjowania Projektu', 'Plan Projektu', 'Założenia Projektu'],
    correctAnswer: 'Dokumentacja Inicjowania Projektu'
  },
  {
    id: 'pr2-3', category: 'PRINCE2 cz. 2',
    text: 'Która rola jest odpowiedzialna za zezwolenie na wykonanie i monitorowanie prac?',
    options: ['Wsparcie Projektu', 'Nadzór Projektu', 'Kierownik Zespołu', 'Kierownik Projektu'],
    correctAnswer: 'Kierownik Projektu'
  },
  {
    id: 'pr2-4', category: 'PRINCE2 cz. 2',
    text: 'Jeśli produkt będący obiektem odniesienia wymaga modyfikacji, należy zastosować procedurę...',
    options: ['sterowania zagadnieniami i zmianami', 'kontroli jakości', 'zarządzania ryzykiem', 'postępowania w sytuacjach nadzwyczajnych'],
    correctAnswer: 'sterowania zagadnieniami i zmianami'
  },
  {
    id: 'pr2-5', category: 'PRINCE2 cz. 2',
    text: 'Który temat zapewnia, że projekt jest korzystny, wykonalny i potrzebny?',
    options: ['Ryzyko', 'Organizacja', 'Postępy', 'Uzasadnienie Biznesowe'],
    correctAnswer: 'Uzasadnienie Biznesowe'
  },
  {
    id: 'pr2-6', category: 'PRINCE2 cz. 2',
    text: 'Przeznaczeniem którego tematu jest ustanowienie mechanizmu monitorowania i porównywania faktycznych osiągnięć z planowanymi?',
    options: ['Zmiana', 'Postępy', 'Jakość', 'Uzasadnienie Biznesowe'],
    correctAnswer: 'Postępy'
  },
  {
    id: 'pr2-7', category: 'PRINCE2 cz. 2',
    text: 'Co jest przeznaczeniem Założeń Projektu?',
    options: ['Opisanie potrzeb informacyjnych interesariuszy', 'Opisanie zarządzania konfiguracją', 'Opisanie wymagań Komitetu Sterującego dotyczących raportowania', 'Opisanie uzgodnionego stanu, od którego można rozpocząć projekt'],
    correctAnswer: 'Opisanie uzgodnionego stanu, od którego można rozpocząć projekt'
  },
  {
    id: 'pr2-8', category: 'PRINCE2 cz. 2',
    text: 'Która z wymienionych cech NIE jest cechą projektu?',
    options: ['Ma czas trwania, który zwykle obejmuje okres dostarczenia oczekiwanych rezultatów i realizację wszystkich oczekiwanych korzyści', 'Organizacja tymczasowa powołana w celu wdrożenia produktów biznesowych', 'Ma większy poziom ryzyka niż zwykła działalność biznesowa', 'Angażuje osoby o różnych umiejętnościach'],
    correctAnswer: 'Ma czas trwania, który zwykle obejmuje okres dostarczenia oczekiwanych rezultatów i realizację wszystkich oczekiwanych korzyści'
  },
  {
    id: 'pr2-9', category: 'PRINCE2 cz. 2',
    text: 'Co jest przeznaczeniem procesu Zarządzanie Dostarczaniem Produktów?',
    options: ['Koncentruje się na dostarczaniu korzyści', 'Śledzi postępy etapu', 'Zapewnia połączenie pomiędzy Kierownikiem Projektu i Komitetem Sterującym', 'Zarządza powiązaniami pomiędzy Kierownikiem Projektu a Kierownikiem Zespołu'],
    correctAnswer: 'Zarządza powiązaniami pomiędzy Kierownikiem Projektu a Kierownikiem Zespołu'
  },
  {
    id: 'pr2-10', category: 'PRINCE2 cz. 2',
    text: 'Co jest jednym z czterech elementów zintegrowanych w PRINCE2?',
    options: ['Jakość', 'Opisy produktów', 'Procesy', 'Opisy ról'],
    correctAnswer: 'Procesy'
  },
  {
    id: 'pr2-11', category: 'PRINCE2 cz. 2',
    text: 'Przeznaczeniem procesu Zarządzanie Końcem Etapu jest dostarczenie informacji wystarczających do zaakceptowania...',
    options: ['Grup Zadań', 'Planu Etapu', 'Założeń Projektu', 'Raportu Nadzwyczajnego'],
    correctAnswer: 'Planu Etapu'
  },
  {
    id: 'pr2-12', category: 'PRINCE2 cz. 2',
    text: 'Co NIE jest przeznaczeniem Raportu Końcowego Projektu?',
    options: ['Porównanie osiągnięć projektu z tym, co uzgodniono', 'Zapisanie informacji pomocnych w przyszłych projektach', 'Zaproponowanie Komitetowi Sterującemu realizacji następnego etapu', 'Przekazanie informacji o utrzymujących się ryzykach'],
    correctAnswer: 'Zaproponowanie Komitetowi Sterującemu realizacji następnego etapu'
  },
  {
    id: 'pr2-13', category: 'PRINCE2 cz. 2',
    text: 'Co jest zalecane jako możliwy typ reakcji na ryzyko dla szansy?',
    options: ['Odrzucenie', 'Redukowanie', 'Przeniesienie', 'Plan rezerwowy'],
    correctAnswer: 'Odrzucenie'
  },
  {
    id: 'pr2-14', category: 'PRINCE2 cz. 2',
    text: 'Co jest celem procesu Przygotowanie Projektu?',
    options: ['Uzyskanie akceptacji dla Planu Projektu', 'Zapewnienie, że Kierownicy Zespołów rozumieją obowiązki', 'Potwierdzenie, że nie są znane ograniczenia uniemożliwiające realizację projektu', 'Przygotowanie Dokumentacji Inicjowania Projektu'],
    correctAnswer: 'Potwierdzenie, że nie są znane ograniczenia uniemożliwiające realizację projektu'
  },
  {
    id: 'pr2-15', category: 'PRINCE2 cz. 2',
    text: 'Który proces jest wykorzystywany do komunikacji z kierownictwem organizacji lub programu?',
    options: ['Zarządzanie Dostarczaniem Produktów', 'Zarządzanie Strategiczne Projektem', 'Sterowanie Etapem', 'Zarządzanie Końcem Etapu'],
    correctAnswer: 'Zarządzanie Strategiczne Projektem'
  },
  {
    id: 'pr2-16', category: 'PRINCE2 cz. 2',
    text: 'Który temat zapewnia informacje o tym, co jest potrzebne, jak to zostanie osiągnięe i przez kogo?',
    options: ['Organizacja', 'Plany', 'Jakość', 'Uzasadnienie Biznesowe'],
    correctAnswer: 'Plany'
  },
  {
    id: 'pr2-17', category: 'PRINCE2 cz. 2',
    text: 'Co jest celem procesu Zamykanie Projektu?',
    options: ['Zweryfikowanie, czy wszystkie produkty projektu zostały zaakceptowane przez użytkowników', 'Zapewnienie, że wszystkie korzyści zostały osiągnięte', 'Przygotowanie do ostatniego etapu projektu', 'Wychwycenie oczekiwań jakościowych klienta'],
    correctAnswer: 'Zweryfikowanie, czy wszystkie produkty projektu zostały zaakceptowane przez użytkowników'
  },
  {
    id: 'pr2-18', category: 'PRINCE2 cz. 2',
    text: 'Przeznaczeniem procesu ... jest stworzenie solidnych podstaw dla projektu.',
    options: ['Przygotowanie Projektu', 'Zarządzanie Końcem Etapu', 'Zarządzanie Strategiczne Projektem', 'Inicjowanie Projektu'],
    correctAnswer: 'Inicjowanie Projektu'
  },
  {
    id: 'pr2-19', category: 'PRINCE2 cz. 2',
    text: 'Co jest jednym z sześciu aspektów efektywności projektu?',
    options: ['Łatwość użycia', 'Dokładność', 'Niezawodność', 'Zakres'],
    correctAnswer: 'Zakres'
  },
  {
    id: 'pr2-20', category: 'PRINCE2 cz. 2',
    text: 'Która rola może zezwolić na przedwczesne zamknięcie projektu?',
    options: ['Komitet Sterujący', 'Wsparcie Projektu', 'Nadzór Projektu', 'Kierownik Projektu'],
    correctAnswer: 'Komitet Sterujący'
  },
  {
    id: 'pr2-21', category: 'PRINCE2 cz. 2',
    text: 'Którą korzyść daje zasada „zarządzania z wykorzystaniem tolerancji"?',
    options: ['Zapewnia wspólny język', 'Daje jasność co projekt dostarczy', 'Efektywne i ekonomiczne wykorzystanie czasu kadry kierowniczej', 'Promuje spójność prac w projekcie oraz mobilność personelu'],
    correctAnswer: 'Efektywne i ekonomiczne wykorzystanie czasu kadry kierowniczej'
  },

  // --- PMI ---
  {
    id: 'pmi-1', category: 'PMI',
    text: 'W projekcie budowlanym występuje przekroczenie harmonogramu, przekroczenie kosztów, a klient jest niezadowolony z postępu w konkretnym zakresie. Co powinien zrobić kierownik projektu w pierwszej kolejności?',
    options: ['Przejrzeć zakres i cele projektu.', 'Egzekwować klauzule kontraktu wobec dostawcy.', 'Podejmować działania, aby zmniejszyć przekroczenie kosztów.', 'Pracować z klientem nad korektą zakresu.'],
    correctAnswer: 'Przejrzeć zakres i cele projektu.'
  },
  {
    id: 'pmi-2', category: 'PMI',
    text: 'Kluczowym elementem karty projektu jest:',
    options: ['Matryca logiczna projektu', 'Harmonogram Gantta', 'Uzasadnienie projektu', 'Drzewo problemów'],
    correctAnswer: 'Uzasadnienie projektu'
  },
  {
    id: 'pmi-3', category: 'PMI',
    text: 'Matryca MoSCoW:',
    options: ['To inaczej diagram macierzowy', 'Może pomóc w ustaleniu priorytetów przedsięwzięcia', 'Pomaga przeanalizować sytuację w fazie przygotowania projektu, ustanowić logiczną hierarchię celów...', 'To krótka informacja na temat tego, czego nauczył się zespół podczas projektu'],
    correctAnswer: 'Może pomóc w ustaleniu priorytetów przedsięwzięcia'
  },
  {
    id: 'pmi-4', category: 'PMI',
    text: 'Celem projektu jest zbadanie wykonalności budowy obiektu z technicznego, ekonomicznego i społecznego punktu widzenia. Karta projektu została zatwierdzona. Który z poniższych procesów należy wykonać w następnej kolejności?',
    options: ['Opracowanie planu zarządzania projektem', 'Identyfikacja ryzyka', 'Opracowanie karty projektu', 'Identyfikacja zainteresowanych stron'],
    correctAnswer: 'Identyfikacja zainteresowanych stron'
  },
  {
    id: 'pmi-5', category: 'PMI',
    text: 'Sponsor projektu ma dużą władzę w zakresie decyzji dotyczących projektu, ale nie interesuje go Twój projekt. Aby go ukończyć, potrzebujesz ciągłego wsparcia. Jaką strategię należy zastosować?',
    options: ['Zadbaj o satysfakcję sponsora', 'Ściśle zarządzaj sponsorem', 'Monitoruj działania sponsora', 'Informuj sponsora'],
    correctAnswer: 'Zadbaj o satysfakcję sponsora'
  },
  {
    id: 'pmi-6', category: 'PMI',
    text: 'Firma otrzymała kontrakt obejmujący premię w wysokości 10%, jeśli projekt zostanie ukończony dwa miesiące wcześniej. Co należy zrobić?',
    options: ['Zmniejszyć zakres projektu', 'Podnieść poziom dostępnych zasobów', 'Zmienić harmonogram', 'Wykupić ubezpieczenie'],
    correctAnswer: 'Zmienić harmonogram'
  },
  {
    id: 'pmi-7', category: 'PMI',
    text: 'Projekt dobiega końca, gdy kierownik projektu otrzymuje zatwierdzoną prośbę o wprowadzenie zmian w celu wymiany wadliwego urządzenia. Co powinien zrobić kierownik projektu?',
    options: ['Zapisać problem w dzienniku', 'Spotkać się z kontrolą zmian', 'Zlecić naprawę uszkodzonego urządzenia', 'Wymienić wadliwe urządzenie'],
    correctAnswer: 'Wymienić wadliwe urządzenie'
  },
  {
    id: 'pmi-8', category: 'PMI',
    text: 'Które z poniższych działań będzie najmniej przydatne przy tworzeniu systemu zarządzania wiedzą w projekcie?',
    options: ['Przeglądanie rejestru zdobytych doświadczeń', 'Monitorowanie zaangażowania interesariuszy', 'Badanie struktury podziału zasobów', 'Studiowanie zadań zespołu projektowego'],
    correctAnswer: 'Badanie struktury podziału zasobów'
  },
  {
    id: 'pmi-9', category: 'PMI',
    text: 'Wynikiem procesu Kierowanie i zarządzanie realizacją projektu jest:',
    options: ['Dostarczany produkt', 'Struktura podziału pracy', 'Karta projektu', 'Harmonogram projektu'],
    correctAnswer: 'Dostarczany produkt'
  },
  {
    id: 'pmi-10', category: 'PMI',
    text: 'Oceny prawdopodobieństwa ryzyka dokonuje się w procesie:',
    options: ['Planowanie reakcji na ryzyko', 'Planowanie zarządzania ryzykiem', 'Analiza jakościowa ryzyka', 'Analiza ilościowa ryzyka'],
    correctAnswer: 'Analiza jakościowa ryzyka'
  },
  {
    id: 'pmi-11', category: 'PMI',
    text: 'Który proces obejmuje podział projektu i przewidzianych prac na mniejsze, łatwiejsze do zarządzania części?',
    options: ['Opracowanie harmonogramu', 'Sporządzenie WBS', 'Określenie zakresu', 'Oszacowanie niezbędnych zasobów'],
    correctAnswer: 'Sporządzenie WBS'
  },
  {
    id: 'pmi-12', category: 'PMI',
    text: 'Jesteś kierownikiem projektu, który nigdy wcześniej nie zarządzał projektem. W tej sytuacji podczas planowania NAJLEPIEJ byłoby polegać na:',
    options: ['Twojej intuicji i wiedzy', 'Analizie interesariuszy', 'Informacjach historycznych', 'Planie zarządzania konfiguracją'],
    correctAnswer: 'Informacjach historycznych'
  }
];

const correctOliwkaMessages = [
  "Cudownie! Jesteś po prostu niesamowita, skarbie! 💖🐾",
  "Idealnie, Oliwko! Moja mądra główka! 🌸✨",
  "Brawo! Idziesz jak burza, ślicznotko! 🐱💕",
  "Oczywiście, że poprawnie! Jesteś genialna! ⭐😻",
  "Wiedziałem, że sobie poradzisz! Ślicznie! 🧁✨",
  "Po prostu profesjonalistka! Duma rozpiera! 🥰💖"
];

const incorrectOliwkaMessages = [
  "Nic się nie stało, Oliwko! Uczysz się i jesteś coraz lepsza! 💕🐱",
  "Główka do góry! Następnym razem na pewno się uda, wierzę w Ciebie! 🌸✨",
  "Ojej, było tak blisko! Ale i tak świetnie Ci idzie, kochanie! 🥰🐾",
  "Każdy mały błąd to krok do zdania egzaminu! Jesteś super dzielna! 💖🧁",
  "Nie martw się, skarbie! Ten temat jest trudny, ale dajesz radę! 🧸⭐",
  "Wysyłam przytulasa! Następne pytanie rozgromisz! 🐱💕"
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const CuteKitten: React.FC<{ mood: 'happy' | 'sad' | 'neutral' }> = ({ mood }) => {
  return (
    <div className="flex flex-col items-center my-4 animate-bounce">
      <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md">
        {/* Uszka */}
        <polygon points="20,40 8,12 38,28" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
        <polygon points="80,40 92,12 62,28" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
        <polygon points="23,35 14,17 35,26" fill="#f472b6" />
        <polygon points="77,35 86,17 65,26" fill="#f472b6" />
        
        {/* Głowa kotka */}
        <circle cx="50" cy="50" r="35" fill="#fff5f5" stroke="#f472b6" strokeWidth="2.5" />
        
        {/* Oczęta */}
        {mood === 'happy' ? (
          <>
            <path d="M 28 48 Q 35 40 42 48" fill="none" stroke="#db2777" strokeWidth="3" strokeLinecap="round" />
            <path d="M 58 48 Q 65 40 72 48" fill="none" stroke="#db2777" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : mood === 'sad' ? (
          <>
            <circle cx="35" cy="48" r="5" fill="#1e293b" />
            <circle cx="65" cy="48" r="5" fill="#1e293b" />
            <circle cx="37" cy="46" r="1.5" fill="white" />
            <circle cx="67" cy="46" r="1.5" fill="white" />
            <path d="M 35 55 Q 35 60 33 62" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <path d="M 65 55 Q 65 60 63 62" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="35" cy="48" r="6" fill="#1e293b" />
            <circle cx="65" cy="48" r="6" fill="#1e293b" />
            <circle cx="33" cy="44" r="2" fill="white" />
            <circle cx="63" cy="44" r="2" fill="white" />
            <circle cx="37" cy="50" r="1" fill="white" />
            <circle cx="67" cy="50" r="1" fill="white" />
          </>
        )}

        {/* Policzki (Rumieńce) */}
        <circle cx="23" cy="57" r="5" fill="#f472b6" opacity="0.6" />
        <circle cx="77" cy="57" r="5" fill="#f472b6" opacity="0.6" />

        {/* Nosek i Pyszczek */}
        <polygon points="48,53 52,53 50,55" fill="#db2777" />
        <path d="M 45 57 Q 50 61 50 57 Q 50 61 55 57" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />

        {/* Wąsiki */}
        <line x1="16" y1="53" x2="4" y2="51" stroke="#f472b6" strokeWidth="1.5" />
        <line x1="16" y1="59" x2="3" y2="59" stroke="#f472b6" strokeWidth="1.5" />
        <line x1="84" y1="53" x2="96" y2="51" stroke="#f472b6" strokeWidth="1.5" />
        <line x1="84" y1="59" x2="97" y2="59" stroke="#f472b6" strokeWidth="1.5" />
      </svg>
      <span className="text-xs bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-bold mt-1 shadow-sm border border-rose-200">
        {mood === 'happy' ? 'Meow! Jejj! 🎉' : mood === 'sad' ? 'Miau... Przytulam! 💕' : 'Miau? Powodzenia!🐾'}
      </span>
    </div>
  );
};

export default function App() {
  const [appState, setAppState] = useState<'home' | 'quiz' | 'results'>('home');
  const [category, setCategory] = useState<Category>('Wszystkie');
  const [mode, setMode] = useState<Mode>('nauka');
  
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnswered, setIsAnswered] = useState(false);

  const [isOliwkaMode, setIsOliwkaMode] = useState<boolean>(false);
  const [randomFeedbackIndex, setRandomFeedbackIndex] = useState(0);

  useEffect(() => {
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    tailwindScript.id = 'dynamic-tailwind-cdn';
    document.head.appendChild(tailwindScript);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Quicksand:wght@400;600;700&display=swap';
    fontLink.id = 'dynamic-font-inter';
    document.head.appendChild(fontLink);

    const styleOverride = document.createElement('style');
    styleOverride.id = 'dynamic-font-override';
    styleOverride.innerHTML = `
      body {
        font-family: 'Inter', 'Quicksand', sans-serif !important;
      }
    `;
    document.head.appendChild(styleOverride);

    return () => {
      document.getElementById('dynamic-tailwind-cdn')?.remove();
      document.getElementById('dynamic-font-inter')?.remove();
      document.getElementById('dynamic-font-override')?.remove();
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('eduquiz_progress_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.appState && parsed.appState !== 'home') {
          setAppState(parsed.appState);
          setCategory(parsed.category);
          setMode(parsed.mode);
          setActiveQuestions(parsed.activeQuestions);
          setCurrentQuestionIndex(parsed.currentQuestionIndex);
          setShuffledOptions(parsed.shuffledOptions);
          setAnswers(parsed.answers);
          setIsAnswered(parsed.isAnswered);
          setIsOliwkaMode(!!parsed.isOliwkaMode);
        } else {
          setIsOliwkaMode(!!parsed.isOliwkaMode);
        }
      } catch (e) {
        console.error("Błąd wczytywania stanu z Local Storage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('eduquiz_progress_v2', JSON.stringify({
      appState, category, mode, activeQuestions, currentQuestionIndex, shuffledOptions, answers, isAnswered, isOliwkaMode
    }));
  }, [appState, category, mode, activeQuestions, currentQuestionIndex, shuffledOptions, answers, isAnswered, isOliwkaMode]);

  const startQuiz = () => {
    let filtered = questionsDatabase;
    if (category !== 'Wszystkie') {
      filtered = questionsDatabase.filter(q => q.category === category);
    }
    const shuffledQuestions = shuffleArray(filtered);
    
    setActiveQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsAnswered(false);
    setShuffledOptions(shuffleArray(shuffledQuestions[0].options));
    setAppState('quiz');
  };

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
    setIsAnswered(true);
    setRandomFeedbackIndex(Math.floor(Math.random() * 6));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setShuffledOptions(shuffleArray(activeQuestions[nextIndex].options));
      setIsAnswered(false);
    } else {
      setAppState('results');
    }
  };

  const restartQuiz = () => {
    setAppState('home');
  };

  const calculateScore = () => {
    let correct = 0;
    activeQuestions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const getGrade = (percentage: number) => {
    if (isOliwkaMode) {
      if (percentage >= 90) return { text: 'Cudownie! Jesteś mistrzem PM! 🏆💖', color: 'text-rose-600' };
      if (percentage >= 75) return { text: 'Znakomicie, Oliwko! Bardzo wysoki wynik! ✨🌸', color: 'text-pink-600' };
      if (percentage >= 60) return { text: 'Super! Poradzisz sobie bez problemu! ⭐🐾', color: 'text-rose-500' };
      if (percentage >= 50) return { text: 'Dobrze! Jeszcze chwila nauki i będzie perfekcja! 💕🧁', color: 'text-amber-500' };
      return { text: 'Nie martw się, skarbie! Ćwiczenie czyni mistrza! 🥰🩹', color: 'text-rose-400' };
    }
    if (percentage >= 90) return { text: 'Celujący', color: 'text-emerald-600' };
    if (percentage >= 75) return { text: 'Bardzo dobry', color: 'text-blue-600' };
    if (percentage >= 60) return { text: 'Dobry', color: 'text-indigo-600' };
    if (percentage >= 50) return { text: 'Dostateczny', color: 'text-amber-500' };
    return { text: 'Niedostateczny', color: 'text-rose-600' };
  };

  const bgClass = isOliwkaMode ? 'bg-rose-50' : 'bg-slate-50';
  const headerBgClass = isOliwkaMode ? 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300' : 'bg-indigo-600';

  // --- EKRAN GŁÓWNY ---
  if (appState === 'home') {
    return (
      <div className={`min-h-screen ${bgClass} flex items-center justify-center p-4 sm:p-6 transition-all duration-300 font-sans`}>
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
          
          <div className="flex border-b border-slate-100 bg-slate-50">
            <button 
              onClick={() => setIsOliwkaMode(false)}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors ${
                !isOliwkaMode ? 'bg-white text-indigo-600 border-t-4 border-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Klasyczny Quiz
            </button>
            <button 
              onClick={() => setIsOliwkaMode(true)}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors ${
                isOliwkaMode ? 'bg-rose-50/50 text-pink-600 border-t-4 border-pink-500' : 'text-slate-400 hover:text-rose-500'
              }`}
            >
              <Heart className="w-4 h-4 text-pink-500 animate-pulse" /> Strefa Oliwki 🌸
            </button>
          </div>

          <div className={`${headerBgClass} p-8 text-center text-white relative overflow-hidden transition-all duration-500`}>
            {isOliwkaMode && (
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <span className="absolute top-2 left-6 text-xl animate-ping">🌸</span>
                <span className="absolute top-10 right-8 text-2xl animate-bounce">💖</span>
                <span className="absolute bottom-4 left-10 text-lg animate-pulse">🐾</span>
                <span className="absolute bottom-8 right-6 text-xl animate-ping">✨</span>
              </div>
            )}
            
            {isOliwkaMode ? (
              <>
                <div className="relative inline-block">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-white fill-pink-100 animate-pulse" />
                  <span className="absolute -top-1 -right-1 text-2xl">🐱</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">Świat Projektów Oliwki</h1>
                <p className="text-pink-100 mt-2 font-semibold">Nauka PRINCE2 & PMI z miłością! 🌸</p>
              </>
            ) : (
              <>
                <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-90" />
                <h1 className="text-3xl font-extrabold tracking-tight">EduQuiz PM</h1>
                <p className="text-indigo-200 mt-2 font-medium">Baza pytań PRINCE2 & PMI</p>
              </>
            )}
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Kategoria Pytań</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Wszystkie', 'PRINCE2', 'PRINCE2 cz. 2', 'PMI'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`py-3 px-1 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      category === cat 
                        ? isOliwkaMode 
                          ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md shadow-pink-200 scale-105'
                          : 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Tryb Rozwiązywania</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMode('nauka')}
                  className={`py-4 flex flex-col items-center justify-center rounded-xl transition-all ${
                    mode === 'nauka' 
                      ? isOliwkaMode
                        ? 'bg-pink-400 text-white shadow-md shadow-pink-100 scale-105 ring-2 ring-pink-400 ring-offset-2'
                        : 'bg-emerald-500 text-white shadow-md shadow-emerald-200 scale-105 ring-2 ring-emerald-500 ring-offset-2' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <BookOpen className="w-6 h-6 mb-2" />
                  <span className="font-semibold text-sm">Nauka</span>
                  <span className="text-[10px] opacity-80 mt-1">Szybka odpowiedź</span>
                </button>
                <button
                  onClick={() => setMode('egzamin')}
                  className={`py-4 flex flex-col items-center justify-center rounded-xl transition-all ${
                    mode === 'egzamin' 
                      ? isOliwkaMode
                        ? 'bg-rose-400 text-white shadow-md shadow-rose-100 scale-105 ring-2 ring-rose-400 ring-offset-2'
                        : 'bg-rose-500 text-white shadow-md shadow-rose-200 scale-105 ring-2 ring-rose-500 ring-offset-2' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Clock className="w-6 h-6 mb-2" />
                  <span className="font-semibold text-sm">Egzamin</span>
                  <span className="text-[10px] opacity-80 mt-1">Wyniki na końcu</span>
                </button>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                isOliwkaMode 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-pink-200 hover:opacity-95' 
                  : 'bg-slate-900 hover:bg-slate-800 shadow-slate-300'
              }`}
            >
              {isOliwkaMode ? (
                <>Zaczynamy, kochanie! 💖 <Heart className="w-5 h-5 fill-white" /></>
              ) : (
                <>Rozpocznij <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- EKRAN WYNIKÓW ---
  if (appState === 'results') {
    const score = calculateScore();
    const total = activeQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const wrong = total - score;
    const grade = getGrade(percentage);

    return (
      <div className={`min-h-screen ${bgClass} flex items-center justify-center py-12 px-4 sm:px-6 transition-colors duration-300 font-sans`}>
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100 mb-6 relative overflow-hidden">
            
            {isOliwkaMode && (
              <div className="absolute top-2 right-2 text-3xl animate-bounce">
                🌸😻🌺
              </div>
            )}

            <Trophy className={`w-16 h-16 mx-auto mb-4 ${isOliwkaMode ? 'text-pink-500 animate-pulse' : 'text-yellow-500'}`} />
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
              {isOliwkaMode ? 'Wyniki dla mojej Oliwki! 💖' : 'Podsumowanie Testu'}
            </h2>
            <p className="text-slate-500 mb-8 font-medium">Kategoria: {category} • Tryb: {mode === 'nauka' ? 'Nauka' : 'Egzamin'}</p>
            
            <div className="flex justify-center mb-8">
              <div className={`relative w-48 h-48 flex flex-col items-center justify-center rounded-full border-[12px] shadow-inner ${
                isOliwkaMode ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-indigo-100'
              }`}>
                <span className={`text-5xl font-black ${isOliwkaMode ? 'text-pink-500' : 'text-indigo-600'}`}>{percentage}%</span>
                <span className="text-sm font-bold text-slate-400 mt-1">{score} / {total} pkt</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className={`rounded-2xl p-4 border flex flex-col items-center ${
                isOliwkaMode ? 'bg-rose-50 border-pink-100' : 'bg-emerald-50 border-emerald-100'
              }`}>
                <CheckCircle2 className={`w-8 h-8 mb-2 ${isOliwkaMode ? 'text-pink-400' : 'text-emerald-500'}`} />
                <p className={`text-xs font-bold uppercase tracking-widest ${isOliwkaMode ? 'text-pink-600' : 'text-emerald-700'}`}>Poprawne</p>
                <p className={`text-3xl font-black mt-1 ${isOliwkaMode ? 'text-pink-500' : 'text-emerald-600'}`}>{score}</p>
              </div>
              <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100 flex flex-col items-center">
                <XCircle className="w-8 h-8 text-rose-500 mb-2" />
                <p className="text-rose-700 text-xs font-bold uppercase tracking-widest">Błędne</p>
                <p className="text-3xl font-black text-rose-600 mt-1">{wrong}</p>
              </div>
            </div>

            {isOliwkaMode && <CuteKitten mood={percentage >= 60 ? 'happy' : 'sad'} />}

            <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Ocena Końcowa</p>
              <p className={`text-2xl sm:text-3xl font-extrabold ${grade.color}`}>{grade.text}</p>
            </div>

            <button
              onClick={restartQuiz}
              className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                isOliwkaMode 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-pink-100' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
              }`}
            >
              <RotateCcw className="w-5 h-5" /> Rozwiąż ponownie
            </button>
          </div>

          {/* Analiza Błędów w trybie Egzaminu */}
          {mode === 'egzamin' && (
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ListChecks className={`w-6 h-6 ${isOliwkaMode ? 'text-pink-400' : 'text-indigo-500'}`} /> 
                Przegląd odpowiedzi
              </h3>
              <div className="space-y-6">
                {activeQuestions.map((q, idx) => {
                  const userAnswer = answers[idx];
                  const isCorrect = userAnswer === q.correctAnswer;
                  
                  return (
                    <div key={idx} className={`p-4 rounded-xl border-l-4 ${isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                      <p className="text-slate-800 font-semibold mb-3 text-sm">{idx + 1}. {q.text}</p>
                      
                      <div className="text-sm mb-2">
                        <span className="font-bold text-slate-600 block mb-1">Twoja odpowiedź:</span>
                        <div className={`flex items-start gap-2 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {isCorrect ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
                          <span className="font-medium">{userAnswer || 'Brak odpowiedzi'}</span>
                        </div>
                      </div>

                      {!isCorrect && (
                        <div className="text-sm mt-3 pt-3 border-t border-rose-100">
                          <span className="font-bold text-slate-600 block mb-1">Poprawna odpowiedź:</span>
                          <div className="flex items-start gap-2 text-emerald-700">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <span className="font-medium">{q.correctAnswer}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- EKRAN QUIZU ---
  const currentQ = activeQuestions[currentQuestionIndex];
  const progress = Math.round(((currentQuestionIndex) / activeQuestions.length) * 100);
  const currentAnswer = answers[currentQuestionIndex];
  const isCorrect = currentAnswer === currentQ.correctAnswer;
  
  const showFeedback = mode === 'nauka' && isAnswered;

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col font-sans transition-colors duration-300`}>
      {/* Pasek nawigacji górnej */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 font-bold text-xs rounded-full uppercase tracking-wider ${
              isOliwkaMode ? 'bg-pink-100 text-pink-600' : 'bg-indigo-100 text-indigo-700'
            }`}>
              {currentQ.category}
            </span>
            <span className="text-sm font-bold text-slate-500">
              Pytanie {currentQuestionIndex + 1} / {activeQuestions.length}
            </span>
          </div>
          <button 
            onClick={restartQuiz}
            className="text-slate-400 hover:text-slate-700 transition-colors"
            title="Przerwij test"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        
        {/* Pasek postępu */}
        <div className="max-w-3xl mx-auto mt-4 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${isOliwkaMode ? 'bg-pink-400' : 'bg-indigo-600'}`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 py-8 flex flex-col">
        {/* Karta pytania */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-6 relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-2 h-full ${isOliwkaMode ? 'bg-pink-400' : 'bg-indigo-500'}`} />
          <h2 className="text-xl sm:text-2xl text-slate-800 font-bold mb-8 leading-relaxed">
            {currentQ.text}
          </h2>

          <div className="space-y-3">
            {shuffledOptions.map((option, idx) => {
              let btnClass = "w-full text-left p-5 rounded-2xl border-2 transition-all font-medium flex items-center justify-between group ";
              
              if (isAnswered) {
                if (showFeedback) {
                  if (option === currentQ.correctAnswer) {
                    btnClass += isOliwkaMode 
                      ? "bg-rose-50/50 border-pink-400 text-pink-700 shadow-sm"
                      : "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm";
                  } else if (option === currentAnswer) {
                    btnClass += "bg-rose-50 border-rose-500 text-rose-800 shadow-sm";
                  } else {
                    btnClass += "bg-white border-slate-100 text-slate-400 opacity-50 cursor-not-allowed";
                  }
                } else {
                  if (option === currentAnswer) {
                    btnClass += isOliwkaMode 
                      ? "bg-pink-50 border-pink-400 text-pink-700 shadow-sm"
                      : "bg-indigo-50 border-indigo-500 text-indigo-800 shadow-sm";
                  } else {
                    btnClass += "bg-white border-slate-100 text-slate-400 opacity-60 cursor-not-allowed";
                  }
                }
              } else {
                btnClass += isOliwkaMode
                  ? "bg-white border-slate-200 text-slate-700 hover:border-pink-300 hover:bg-rose-50/30 cursor-pointer"
                  : "bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer";
              }

              const letter = String.fromCharCode(65 + idx);

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={btnClass}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold shrink-0 ${
                      isAnswered && showFeedback && option === currentQ.correctAnswer ? isOliwkaMode ? 'bg-pink-200 text-pink-700' : 'bg-emerald-200 text-emerald-800' :
                      isAnswered && showFeedback && option === currentAnswer ? 'bg-rose-200 text-rose-800' :
                      isAnswered && !showFeedback && option === currentAnswer ? isOliwkaMode ? 'bg-pink-200 text-pink-700' : 'bg-indigo-200 text-indigo-800' :
                      'bg-slate-100 text-slate-500 group-hover:bg-pink-100 group-hover:text-pink-600'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm sm:text-base">{option}</span>
                  </div>
                  
                  {showFeedback && option === currentQ.correctAnswer && (
                    isOliwkaMode 
                      ? <Heart className="w-6 h-6 text-pink-500 fill-pink-500 shrink-0" />
                      : <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  )}
                  {showFeedback && option === currentAnswer && option !== currentQ.correctAnswer && <XCircle className="w-6 h-6 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel dolny */}
        <div className={`mt-auto ${isAnswered ? 'pb-28 md:pb-0' : ''}`}>

          {showFeedback && (
            <div className={`p-5 rounded-3xl font-bold flex flex-col sm:flex-row items-center gap-4 mb-4 shadow-sm border ${
              isCorrect 
                ? isOliwkaMode 
                  ? 'bg-rose-50 border-pink-200 text-pink-800'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              
              {isOliwkaMode ? (
                <>
                  <CuteKitten mood={isCorrect ? 'happy' : 'sad'} />
                  <div className="text-center sm:text-left flex-1">
                    <span className="text-lg block">
                      {isCorrect 
                        ? correctOliwkaMessages[randomFeedbackIndex] 
                        : incorrectOliwkaMessages[randomFeedbackIndex]}
                    </span>
                    {!isCorrect && (
                      <span className="text-xs text-rose-500 block mt-1">
                        Poprawna to: <strong>{currentQ.correctAnswer}</strong> 🌸
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {isCorrect 
                    ? <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" /> 
                    : <AlertCircle className="w-8 h-8 text-rose-500 shrink-0" />
                  }
                  <span className="text-lg">
                    {isCorrect 
                      ? 'Świetnie! Poprawna odpowiedź.' 
                      : `Błędna odpowiedź. Poprawna to: ${currentQ.correctAnswer}`}
                  </span>
                </>
              )}
            </div>
          )}

          {mode === 'egzamin' && isAnswered && (
            <div className="p-4 rounded-2xl font-medium flex items-center justify-center gap-2 mb-4 bg-slate-100 text-slate-600 border border-slate-200">
              {isOliwkaMode ? (
                <>
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                  Zapisałem Twoją odpowiedź, Oliwko. Lećmy dalej!
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  Odpowiedź zapisana. Przejdź dalej.
                </>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Sticky mobile button */}
      {isAnswered && (
        <div className="fixed bottom-0 left-0 right-0 md:static bg-white border-t border-slate-200 p-4 md:p-0 shadow-lg md:shadow-none z-20">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={nextQuestion}
              className={`w-full py-5 text-white rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                isOliwkaMode 
                  ? 'bg-gradient-to-r from-rose-400 to-pink-500 shadow-pink-100'
                  : 'bg-slate-900 hover:bg-slate-800 shadow-slate-300'
              }`}
            >
              {currentQuestionIndex < activeQuestions.length - 1 ? (
                isOliwkaMode ? (
                  <><ArrowRight className="w-5 h-5" /> Kolejne pytanko 🌸</>
                ) : (
                  <><ArrowRight className="w-5 h-5" /> Następne pytanie</>
                )
              ) : isOliwkaMode ? (
                <><Sparkles className="w-5 h-5" /> Sprawdźmy wynik, kochanie! 🏆</>
              ) : (
                <><Trophy className="w-5 h-5" /> Zakończ i sprawdź wynik</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}