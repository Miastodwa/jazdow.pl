# ARCHITEKTURA — jazdow.pl (Sesja 3, propozycja)

> **Status: PROPOZYCJA DO AKCEPTACJI. Nie wdrożono żadnej zmiany.** Sesja 3 nie zmieniła ani jednego pliku treści, URL-a ani konfiguracji. Wdrożenie należy do sesji 4 — po zatwierdzeniu tego dokumentu.
>
> Data: 2026-07-30. Podstawa: `master` @ `4784c5b`, 49 plików Markdown, produkcja `https://jazdow.pl`.
>
> **⚠️ Brak danych o ruchu — Google Search Console nie jest zainstalowane na tej stronie** (potwierdzone przez właściciela serwisu). Nie chodzi o brak dostępu: takie dane po prostu nie istnieją i nie powstaną, dopóki serwis nie zostanie zweryfikowany w GSC. **Wszystkie rekomendacje w §3 (podział/scalanie stron) opierają się wyłącznie na strukturze treści i architekturze informacji, nie na tym, czego ludzie faktycznie szukają.** Trzy rekomendacje oznaczone 🔍 pozostaną nieweryfikowalne do czasu zebrania danych. Patrz **§0 / A6** — to samo w sobie jest znaleziskiem.

---

## 0. Pięć rzeczy, które trzeba wiedzieć przed czytaniem reszty

Podczas rozpoznania wyszły cztery problemy poważniejsze niż jakikolwiek podział strony. Wymieniam je na początku, bo zmieniają priorytety całej sesji 4.

| # | Znalezisko | Skala | Dowód |
|---|---|---|---|
| ~~**A1**~~ | ❌ **ZNALEZISKO BŁĘDNE — WYCOFANE 2026-07-30.** Twierdziłem, że wszystkie 16 linków do domków na mapie daje 404. **To nieprawda: mapa działa poprawnie.** Komponent `oj-map.vue` **nie używa pola `link:`** z frontmattera (0 odwołań) — adres buduje z `house.address`: `$localePath + dir[$lang] + address.replace('/','-') + '/'` → `/domki/3-6/`. Zweryfikowane na produkcji: klik w domek 3-6 na `/mapa/` przenosi do `/domki/3-6/` (200, właściwa treść). Wyciągnąłem wniosek z samego frontmattera i potwierdziłem, że `/3-6/` daje 404 — co jest prawdą, ale ten adres nigdy nie był używany. **Realny problem opisuje A5.** | — | korekta: `oj-map.vue:168`; test na produkcji |
| **A2** | **10 plików jest niewidocznych w CMS** — redaktor fizycznie nie może ich edytować. W tym `dialog.md`, czyli **pierwsza pozycja menu**, i `wspolpraca.md`. Przyczyna: kolekcja „PL Pages" ma `filter: {field: generic, value: true}`, a te pliki nie mają `generic: true`; dodatkowo `projekty/` i `baza-wiedzy/` leżą poza wszystkimi kolekcjami. | 10 z 49 plików | `www/.vuepress/public/admin/config.yml:83` + brak `generic` we frontmatterze |
| **A3** | **9 z 10 angielskich stron domków to kopie polskich, bajt w bajt** — nieprzetłumaczone. Dla Google to duplicate content, dla czytelnika EN — polski tekst pod angielskim adresem. | 9 z 10 stron EN | `diff www/domki/3-6.md www/en/houses/3-6.md` → identyczne (także 3-8, 3-9, 5a-1, 7-14, 10-8) |
| **A4** | **Nawigacja nie odzwierciedla serwisu.** `mapa`, `wydarzenia`, `opp`, `archiwum`, `archiwum-dolacz`, `festiwal`, `plakaty`, 19 domków — nie ma ich w menu ani stopce. `pytania`, `historia`, `współzarządzanie` są **wyłącznie** na kafelkach strony głównej: kto trafi z Google na podstronę, nie dotrze do nich nigdy. | 9 pozycji poza nawigacją globalną | graf linków (§3.0) |
| **A5** 🔴 | **TO JEST PRAWDZIWY BŁĄD (po wycofaniu A1).** Wszystkie 16 domków na mapie jest klikalnych, ale **7 nie ma strony i kończy się na 404**: `3-5`, `3-18`, `5a-4`, `7-30`, `8-1`, `10-2`, `10-5`. Czyli **działało 9 z 16 kliknięć w mapę**. ✅ **Naprawione w sesji 4 (PR #201)** — 6 stron-szablonów + usunięcie wpisu 7/30; obecnie 15 klikalnych domków, 15 ma stronę. | 7 z 16 | `curl` → `/domki/3-5/` = 404, `/domki/3-6/` = 200 |
| **A6** | **Serwis nie jest zweryfikowany w Google Search Console.** Nie ma żadnych danych o zapytaniach, indeksacji ani błędach crawlowania — i nie da się sprawdzić, czy Google poprawnie odczytuje `sitemap.xml`, `canonical`, `hreflang` i dane strukturalne dodane w sesji 2. Każda decyzja o treści i SEO jest podejmowana na ślepo. | cały serwis | potwierdzone przez właściciela |

**Wniosek dla sesji 4:** naprawa A5 (6 stron-szablonów — ✅ zrobione, PR #201) i A2 (dopisanie `generic: true` + poszerzenie kolekcji CMS) daje nieporównanie więcej niż jakikolwiek podział treści. Proponuję zrobić je **przed** restrukturyzacją. Równolegle — A6, bo **dane zbierają się dopiero od momentu weryfikacji**, więc każdy tydzień zwłoki to bezpowrotnie utracone dane porównawcze do zmian z sesji 2.

### Jak domknąć A6 (kilkanaście minut, bez zmian w kodzie)

1. Wejść na [search.google.com/search-console](https://search.google.com/search-console) i dodać zasób typu **Domena** (`jazdow.pl`) — obejmie apex, `www` i wszystkie podścieżki naraz.
2. Zweryfikować **rekordem TXT w DNS** — to metoda odporna na zmianę hostingu, więc przetrwa ewentualne przejście z Netlify na Cloudflare (sesja 7). Alternatywa (`<meta>` w `head`) wymagałaby zmiany w kodzie i psuła się przy migracji.
3. Zgłosić sitemapę: `https://jazdow.pl/sitemap.xml` (już istnieje i jest poprawna — 50 adresów).
4. Sprawdzić w raporcie **Strony**, czy nie ma niespodzianek — szczególnie czy strony domków są zaindeksowane (7 z nich do niedawna dawało 404 — A5).
5. Po ~4 tygodniach wrócić do rekomendacji 🔍 z §3 i zweryfikować je danymi.

> Warto też rozważyć **Bing Webmaster Tools** (import jednym kliknięciem z GSC) — dla organizacji pozarządowej to darmowe, dodatkowe źródło danych o zapytaniach.

---

## 1. Struktura plików

### 1.1. Klasyfikacja treści

| Typ | Strony | Cechy | Kto edytuje |
|---|---|---|---|
| **Wizytówkowe** (stałe) | `co-robimy`, `pytania`, `historia`, `deklaracja`, `obywatelstwo`, `partnerstwo`, `wspolzarzadzanie`, `wspolpraca` | rzadko się zmieniają, czytane sekwencyjnie, główny cel SEO | redaktor |
| **Dokumenty formalne** | `statut`, `regulamin`, `regulamin-darowizn`, `polityka-prywatnosci`, `sprawozdania` | zmiana = decyzja formalna, wymagają wersjonowania, miejsce w stopce | zarząd |
| **Cykliczne / czasowe** | `plakaty` (28 szt.), `wydarzenia`, `dialog` (listy otwarte), `festiwal`, `opp` (1,5% — sezonowe) | własny rytm aktualizacji (miesiąc / kampania / rok), szybko się dezaktualizują | redaktor, często |
| **Transakcyjne** | `wesprzyj`, `obywatelstwo`, `opp`, organizacja wydarzeń (dziś w `wspolpraca`) | jest konkretne działanie do wykonania, liczy się konwersja | redaktor |
| **Katalog** | 19 stron domków + `mapa` | dane strukturalne (adres, e-mail, osoba, zdjęcia), powtarzalny szablon | redaktor / gospodarze domków |
| **Baza wiedzy** (sesja 5) | `baza-wiedzy/` (1 plik), `wiedza/*.pdf` (4), `dokumenty/` (3), `dyplomacja/` (7) | materiały źródłowe, archiwalne, PDF-y | rzadko |

### 1.2. Docelowa struktura katalogów — wybór

**Fakt, który przesądza sprawę: 47 z 49 plików ma `permalink` we frontmatterze, więc URL jest przypięty do pliku, a nie do jego położenia.** Możemy przenieść pliki, gdzie chcemy, **bez zmiany ani jednego adresu**. Wyjątek: `www/README.md` i `www/en/README.md` (strony główne) — mapują się przez katalog i muszą albo zostać, albo dostać jawny `permalink`.

**Porównanie:**

| Kryterium | Najpierw język (`www/pl/`, `www/en/`) | Najpierw typ (`www/strony/`, `www/domki/`…) |
|---|---|---|
| Redaktor znajdzie plik w 10 s? | ✅ Tak. Pierwsze pytanie redaktora to zawsze „polska czy angielska?" — bo to on decyduje, którą wersję redaguje. | ⚠️ Częściowo. Wymaga najpierw sklasyfikowania treści („czy regulamin to «dokument» czy «strona»?"), co jest niejednoznaczne. |
| Netlify CMS to obsłuży? | ✅ Wzorcowo. Kolekcja = katalog. **Znika potrzeba `filter: generic`**, czyli znika przyczyna A2. | ⚠️ Tak, ale kolekcje PL i EN mieszałyby się w jednym folderze — potrzebny filtr po języku, czyli ten sam problem co dziś. |
| Zgodność z dzisiejszym stanem | ✅ EN już jest w `www/en/`. Zmiana dotyczy głównie PL. | ❌ Wymaga przebudowy obu gałęzi. |
| Skalowanie na 3. język | ✅ Dodajesz katalog. | ❌ Każdy typ trzeba rozbudować o język. |

> ### ✅ Rekomendacja: **najpierw język, potem typ.**
> Decyduje argument CMS-owy: układ językowy pozwala usunąć `filter: {field: generic}`, który **jest bezpośrednią przyczyną A2** — dziesięciu stron, których redaktor nie może dotknąć. Struktura typowa tego nie naprawia; odtwarza ten sam problem na innej osi.

### 1.3. Drzewo katalogów — PRZED i PO

**PRZED** (stan faktyczny):

```
www/
├── README.md                    → /            (Home; brak permalink)
├── co-robimy.md                 → /co-robimy/
├── deklaracja.md  dialog.md  historia.md  mapa.md  obywatelstwo.md
├── opp.md  partnerstwo.md  polityka-prywatnosci.md  pytania.md
├── regulamin.md  regulamin-darowizn.md  sprawozdania.md  statut.md
├── wesprzyj.md  wspolpraca.md  wydarzenia.md          ← 18 plików luzem w korzeniu
├── domki/            (9 stron)  → /domki/3-6/ …
├── projekty/         (4 pliki)  → /wspolzarzadzanie/, /archiwum/, /archiwum-dolacz/, /festiwal/
│                                  ⚠️ nazwa katalogu NIE odpowiada URL-om; poza kolekcjami CMS
├── baza-wiedzy/      (1 plik)   → /2017-mieszkania2030…/   ⚠️ poza kolekcjami CMS
├── en/
│   ├── README.md                → /en/
│   ├── co-management.md  events.md  history.md  map.md  partnership.md  privacy-policy.md
│   └── houses/       (10 stron) → /en/houses/3-6/   ⚠️ 9 z 10 to kopie PL
└── .vuepress/
    ├── public/       images/ (45) plakaty/ (63) dokumenty/ (3) dyplomacja/ (7)
    │                 sprawozdania/ (24) wiedza/ (4) fonts/ admin/
    └── theme/assets/ ui/ (72 pliki)
```

**PO** (propozycja — URL-e bez zmian, pliki poukładane):

```
www/
├── pl/
│   ├── README.md                → /             (permalink: / — WYMAGA TESTU, patrz §1.7)
│   ├── strony/                  strony wizytówkowe
│   │   ├── co-robimy.md  pytania.md  historia.md  deklaracja.md
│   │   ├── obywatelstwo.md  partnerstwo.md  wspolzarzadzanie.md
│   │   └── wspolpraca.md  (+ nowe z podziału, §3)
│   ├── dokumenty/               formalne — zmiana wymaga decyzji zarządu
│   │   ├── statut.md  regulamin.md  regulamin-darowizn.md
│   │   └── polityka-prywatnosci.md  sprawozdania.md
│   ├── aktualnosci/             treści o własnym cyklu życia
│   │   ├── dialog.md  wydarzenia.md  plakaty.md (nowa, §3)
│   │   ├── festiwal.md  archiwum.md  archiwum-dolacz.md
│   │   └── opp.md
│   ├── wsparcie/
│   │   └── wesprzyj.md
│   ├── domki/                   katalog (9 → docelowo 16, §3)
│   │   ├── mapa.md
│   │   └── 3-6.md  3-8.md  …
│   └── baza-wiedzy/             (sesja 5)
│       └── 2017-mieszkania2030-silne-wspierajace-sie-spolecznosci.md
├── en/                          lustrzana struktura, tylko realnie przetłumaczone
│   ├── README.md                → /en/
│   ├── strony/    co-management.md  history.md  partnership.md
│   ├── dokumenty/ privacy-policy.md
│   ├── aktualnosci/ events.md
│   └── domki/     map.md  (+ tylko przetłumaczone domki — patrz A3)
└── .vuepress/                   bez zmian
```

> **Uwaga o kosztach:** to ~45 przeniesień plików. Zysk jest realny (CMS, orientacja redaktora), ale **cała wartość zależy od tego, czy `permalink` faktycznie utrzyma wszystkie URL-e** — to trzeba potwierdzić buildem na jednym pliku pilotażowym, zanim ruszymy resztę (§1.7).

### 1.4. Konwencja nazewnictwa

**Zasady:** kebab-case · bez polskich znaków · bez spacji i podkreśleń · bez wielkich liter · nazwa pliku = slug (bez daty w nazwie, chyba że data jest częścią tożsamości dokumentu) · `nazwa.md` zamiast `nazwa/index.md` (VuePress i tak generuje katalog; `index.md` dodaje poziom bez korzyści) · jedyny wyjątek: `README.md` dla strony głównej locale (wymóg VuePress).

**Niespójności do naprawy (6 plików):**

| Dziś | Propozycja | Problem |
|---|---|---|
| `baza-wiedzy/2017_Mieszkania2030-silne_wspierajace_sie_spolecznosci.md` | `baza-wiedzy/2017-mieszkania2030-silne-wspierajace-sie-spolecznosci.md` | podkreślenia + wielkie litery + mieszany separator |
| `projekty/2017_wspolzarzadzanie.md` | `strony/wspolzarzadzanie.md` | podkreślenie; nazwa nie odpowiada URL-owi (`/wspolzarzadzanie/`) |
| `projekty/2025_saoj.md` | `aktualnosci/archiwum.md` | skrót „saoj" nieczytelny; URL to `/archiwum/` |
| `projekty/2025_saoj-dolacz.md` | `aktualnosci/archiwum-dolacz.md` | j.w. |
| `projekty/festiwal.md` | `aktualnosci/festiwal.md` | katalog `projekty/` nie odpowiada żadnemu URL-owi |
| `en/map.md` → `permalink: map/` | `permalink: map` | **jedyny permalink z końcowym slashem** — niespójny z pozostałymi 46 |

### 1.5. Ujednolicony frontmatter — walidacja stanu

Zwalidowałem wszystkie 49 plików względem schematu z briefu:

| Pole | Pokrycie dziś | Uwaga |
|---|---|---|
| `title` | 47/49 (96%) | brak w 2 plikach README (tytuł z `config.js`) |
| `permalink` | 47/49 (96%) | j.w. — i to jest ryzyko przy przenoszeniu (§1.3) |
| `layout` | 25/49 (51%) | reszta korzysta z domyślnego `Layout` |
| `tldr` | 17/49 (35%) | dziś pełni rolę lead-u **i** źródła `description` (plugin `oj-seo` z sesji 2) |
| `generic` | 16/49 (33%) | flaga wyłącznie na potrzeby filtra CMS — **przyczyna A2** |
| **`description`** | **0/49** | **brak całkowity** — dziś generowany automatycznie z `tldr`/`intro`/tytułu |
| **`lang`** | 3/49 (6%) | dziś wyprowadzany z URL-a przez locales |
| **`ogImage`** | **0/49** | **brak całkowity** — wszystkie strony dzielą jeden obrazek OG (`banner.jpg`) |
| **`updated`** | **0/49** | **brak całkowity** — nie da się pokazać „ostatnia aktualizacja" ani posortować archiwum |
| **`translationKey`** | **0/49** | **brak całkowity** — nie ma czym powiązać PL↔EN, co **blokuje `hreflang`** (dług z sesji 2) |

**Proponowany schemat docelowy:**

```yaml
---
title: Co robimy?                      # wymagane — H1/tytuł zakładki
description: Oprowadzania, Czytelnia   # wymagane — meta description, 120–160 zn.
permalink: co-robimy                   # wymagane — bez skrajnych slashy
translationKey: co-robimy              # wymagane — ten sam po obu stronach PL/EN → hreflang
lang: pl                               # opcjonalne — dziś z locales; jawnie tylko przy wyjątkach
ogImage: /images/co-robimy-og.jpg      # opcjonalne — brak = domyślny banner
updated: 2026-07-28                    # zalecane — data ostatniej istotnej zmiany
layout: Layout                         # opcjonalne
tldr: …                                # opcjonalne — lead widoczny na stronie
---
```

Uwagi wdrożeniowe: (1) `description` i `tldr` to **różne rzeczy** — pierwsze dla wyszukiwarki, drugie dla czytelnika; dziś są sklejone. (2) `generic` znika razem z filtrem CMS (§1.7). (3) `translationKey` to najmniejsza możliwa zmiana odblokowująca `hreflang` — wystarczy jedno pole po obu stronach.

### 1.6. Assety

**Dziś trzy równoległe miejsca + cztery magazyny PDF-ów:**

| Lokalizacja | Zawartość | Rozmiar | Adres |
|---|---|---|---|
| `public/images/` | zdjęcia treści (45 plików, w tym `houses/`) | 43 MB | `/images/…` — stabilny |
| `public/plakaty/` | plakaty miesięczne (63 pliki: 34 PNG + 29 JPG) | 38 MB | `/plakaty/…` — stabilny |
| `theme/assets/ui/` | grafika interfejsu (72 pliki: logo, tła, ikony, litery) | 1,7 MB | `/assets/img/…` — **z hashem, zmienny** |
| `public/dokumenty/`, `dyplomacja/`, `sprawozdania/`, `wiedza/` | PDF-y (3 / 7 / 24 / 4) | ~154 MB | stabilny |

**Propozycja — utrzymać rozdział, ale nazwać go wprost:**

- `public/images/` — **obrazy treści**, wstawiane przez redaktora, adres musi być stabilny (to samo, co `media_folder` w CMS). Podkatalog per obszar: `images/domki/`, `images/historia/`, `images/oprowadzania/`.
- `theme/assets/ui/` — **wyłącznie grafika motywu**, przetwarzana przez build. Redaktor nigdy tu nie zagląda.
- `public/plakaty/`, `public/sprawozdania/`, `public/dyplomacja/`, `public/dokumenty/`, `public/wiedza/` — **magazyny plików o stabilnych adresach**, linkowane z treści i z zewnątrz.

**Reguła rozstrzygająca:** jeśli na zasób może wskazywać link z zewnątrz (mail, Facebook, pismo urzędowe) → `public/`. Jeśli to element wyglądu strony → `theme/assets/`.

**Nazewnictwo assetów:** kebab-case, bez diakrytyków, prefiks kontekstowy (`historia-1945-domki.jpg`, nie `dsc04022-large.jpeg`). Dziś 8 plików ma nazwy aparatu (`dsc_0426-large.jpeg`) i 2 nazwy z Facebooka (`285584595_395353005972068_…jpg`) — nieczytelne dla redaktora.

**Do posprzątania — 12 MB nieużywanych obrazów** (0 odwołań w `.md/.json/.vue/.js/.styl/.html`):

`cover-1.jpg` (3,0 MB) · `history-4.jpg` (3,8 MB) · `cover-2.jpg` (2,9 MB) · `285584595_…jpg` (492 K) · `archiwum-1.jpg` (484 K) · `arch-duo@2x.png` (468 K) · `arch-mono@2x.png` (460 K) · `350925555_…jpg` (396 K) · `banner-s.jpg` (252 K) · `opp-home.png` (128 K) · `arch-duo.png` (120 K) · `arch-mono.png` (116 K)

> ⚠️ `banner.jpg` **jest używany** — to domyślny obrazek Open Graph ustawiony w sesji 2 (`config.js:35`). Nie usuwać.

### 1.7. Konfiguracja CMS dla proponowanej struktury

Dzisiejszy problem (A2) w jednym zdaniu: kolekcja PL wskazuje `folder: www/` — czyli **cały korzeń serwisu** — więc trzeba ją było zawęzić `filter: {field: generic, value: true}`, a każdy plik bez tej flagi wypadł z panelu.

Po przejściu na układ językowy filtr znika, bo katalog sam w sobie jest już zawężeniem:

```yaml
collections:
  - { label: "PL — Strony",      name: pl_strony,      folder: www/pl/strony,      create: true, … }
  - { label: "PL — Dokumenty",   name: pl_dokumenty,   folder: www/pl/dokumenty,   create: false, … }
  - { label: "PL — Aktualności", name: pl_aktualnosci, folder: www/pl/aktualnosci, create: true, … }
  - { label: "PL — Domki",       name: pl_domki,       folder: www/pl/domki,       create: true, … }
  - { label: "EN — Pages",       name: en_strony,      folder: www/en/strony,      create: true, … }
  # …bez filter: generic w żadnej z nich
```

**Efekt: 49/49 plików widocznych w panelu zamiast 39/49.** Dodatkowo `create: false` na dokumentach formalnych zapobiega przypadkowemu tworzeniu „statutu 2".

**Minimalna alternatywa, jeśli odrzucisz restrukturyzację:** dopisać `generic: true` do 5 plików (`dialog`, `wspolpraca`, `statut`, `regulamin-darowizn`, `opp`) i dodać dwie kolekcje na `www/projekty` i `www/baza-wiedzy`. Naprawia A2 bez przenoszenia czegokolwiek — ale zostawia `filter` jako pułapkę na przyszłość (każda nowa strona bez flagi znowu zniknie).

> **⚠️ Warunek konieczny przed jakąkolwiek restrukturyzacją:** przenieść **jeden** plik pilotażowo (proponuję `projekty/festiwal.md` → `pl/aktualnosci/festiwal.md`), zbudować i sprawdzić, że `/festiwal/` nadal odpowiada 200. Dopiero potem reszta. Osobno przetestować `www/README.md` → `www/pl/README.md` z `permalink: /`, bo to jedyny przypadek, gdzie URL nie jest przypięty frontmatterem.

---

## 2. Mapa serwisu — PRZED i PO

### 2.1. PRZED (stan faktyczny, z zaznaczeniem osiągalności)

```
/                                    ● strona główna
│
├─ MENU GŁÓWNE (widoczne na każdej stronie)
│   ├─ /dialog/                      ● list otwarty (3 586 słów, treść kampanijna, 3 nagłówki)
│   ├─ /co-robimy/                   ● + 28 plakatów wklejonych w treść
│   ├─ /deklaracja/                  ●
│   ├─ /obywatelstwo/                ●
│   ├─ /wspolpraca/                  ● miesza 4 grupy odbiorców
│   └─ /wesprzyj/                    ● duplikuje /opp/ i /obywatelstwo/
│
├─ STOPKA (widoczna na każdej stronie)
│   ├─ /partnerstwo  /statut  /regulamin  /sprawozdania
│   ├─ /regulamin-darowizn  /polityka-prywatnosci
│   └─ ⚠️ wszystkie 6 bez końcowego slasha → każdy klik = zbędne przekierowanie 301
│
├─ TYLKO Z KAFELKÓW STRONY GŁÓWNEJ  ⚠️ niedostępne z podstron
│   ├─ /pytania/                     ○ 1 958 słów, 20 pytań
│   ├─ /historia/                    ○
│   └─ /wspolzarzadzanie/            ○
│
└─ POZA NAWIGACJĄ  ✗ dostępne tylko przez wyszukiwarkę albo bezpośredni link
    ├─ /mapa/                        ✗ ← a to jest brama do całego katalogu domków
    │   └─ 16 klikalnych domków      ⚠️ 7 z nich → 404 (A5); mapa sama działa poprawnie
    ├─ /domki/3-6/ …  (9 stron)      ✗ osierocone
    ├─ /wydarzenia/                  ✗
    ├─ /opp/                         ✗ (1,5% podatku — treść sezonowa)
    ├─ /archiwum/  /archiwum-dolacz/ ✗
    ├─ /festiwal/                    ✗
    ├─ /plakaty/*.png  (34 pliki)    ✗ brak strony-archiwum
    └─ /2017-mieszkania2030…/        ✗ (baza wiedzy)

/en/                                 ● strona główna EN
    ├─ MENU EN: /en/events/  /en/map/  /en/history/  /en/co-management/  /en/partnership/
    ├─ STOPKA EN: /en/privacy-policy
    └─ /en/houses/… (10 stron)       ✗ osierocone + 9 z 10 to nieprzetłumaczone kopie PL (A3)

● w nawigacji globalnej   ○ tylko ze strony głównej   ✗ poza nawigacją
```

### 2.2. PO (propozycja)

```
/
├─ Osiedle                            ▾ „chcę zobaczyć, przyjść, dowiedzieć się co to jest"
│   ├─ /mapa/                         mapa + wejście do katalogu domków
│   │   └─ /domki/3-6/ …              ✅ komplet stron (A5 naprawione, PR #201)
│   ├─ /historia/
│   └─ /pytania/                      ✅ wchodzi do nawigacji globalnej
│
├─ Co robimy                          ▾ „co się tu dzieje"
│   ├─ /co-robimy/                    programy stałe (oprowadzania, Czytelnia)
│   ├─ /plakaty/                      ✅ NOWA — archiwum plakatów wyjęte z /co-robimy/
│   ├─ /wydarzenia/                   ✅ wchodzi do nawigacji
│   ├─ /archiwum/                     Społeczne Archiwum Osiedla Jazdów
│   └─ /festiwal/
│
├─ Wspólnota                          ▾ „kim jesteście, jak to działa"
│   ├─ /deklaracja/
│   ├─ /obywatelstwo/
│   ├─ /wspolzarzadzanie/             ✅ wchodzi do nawigacji globalnej
│   └─ /partnerstwo/                  + sieci i koalicje (przeniesione z /wspolpraca/)
│
├─ Współpraca                         ▾ „chcę coś zrobić razem z wami"
│   ├─ /wspolpraca/                   strona nadrzędna z własną treścią (wartości, oferta)
│   └─ /wspolpraca/wydarzenia/        ✅ NOWA — organizacja wydarzeń (własny e-mail, zasady)
│
├─ /wesprzyj/                         (bez podmenu) „chcę pomóc"
│   └─ linki kontekstowe → /opp/ (1,5%), /obywatelstwo/, /sprawozdania/
│
├─ [Baza wiedzy]                      ▾ zarezerwowane na sesję 5
│
└─ english / polski

PASEK AKTUALNOŚCI (nad menu, nie w menu):
   → /dialog/  „List otwarty"        ⏱ mechanizm czasowy, znika wg reguły z §4.2

STOPKA (dokumenty formalne, bez zmian w składzie):
   /partnerstwo/  /statut/  /regulamin/  /sprawozdania/
   /regulamin-darowizn/  /polityka-prywatnosci/     ✅ wszystkie ze slashem (bez 301)
```

---

## 3. Przebudowa treści — audyt i zalecenia

### 3.0. Metoda

Stosuję kryteria z briefu. Dzielę tylko wtedy, gdy zachodzi ≥1 warunek: **odrębne intencje** · **osobno linkowany z zewnątrz** · **własny cykl życia** · **da się napisać odrębny tytuł + opis + meta description** (test rozstrzygający). Nie dzielę treści czytanej sekwencyjnie ani wtedy, gdy strona nadrzędna zostałaby samą listą linków. Sama długość nie jest powodem.

**„Zostaw" pojawia się w 20 z 27 pozycji.** To celowe: większość tego serwisu jest w porządku, a prawdziwe problemy leżą w nawigacji i linkach (§0), nie w podziale stron.

### 3.1. Tabela zaleceń — strony polskie

| Strona | Słów / nagł. | Odbiorcy | Intencje | Rekomendacja | Uzasadnienie | Struktura po zmianie |
|---|---|---|---|---|---|---|
| `/` (README) | 103 | wszyscy | orientacja | **Zostaw** | Kafelki działają; problem to nawigacja globalna (§4), nie ta strona | bez zmian; `<h1>` → §5 |
| `/co-robimy/` | 543 / 11 | zwiedzający, sąsiedzi | „co się tu dzieje" | **Podziel** | 28 plakatów = **własny cykl życia** (miesięczny) i osobno linkowane; do tego ręczny spis treści miesza kotwice z linkami wychodzącymi | `/co-robimy/` (oprowadzania + Czytelnia, spis treści usunięty) + **`/plakaty/`** (archiwum) |
| `/wspolpraca/` | 590 / 8 | 🔴 **4 różne grupy**: organizatorzy, firmy, szkoły, koalicje | 4 odrębne | **Podziel + przenieś** 🔍 | Organizacja wydarzeń ma **własny e-mail** (`wydarzenia@`), własne zasady i regułę odmowy — to odrębna intencja transakcyjna. Koalicje to nie oferta dla czytelnika, tylko informacja o nas → należą do `/partnerstwo/`. Błąd hierarchii: koalicje są dziś H3 **pod** „programami edukacyjnymi" | `/wspolpraca/` (wartości + oferta dla firm i szkół) + **`/wspolpraca/wydarzenia/`**; koalicje → `/partnerstwo/` |
| `/wesprzyj/` | 371 / 11 | darczyńcy, wolontariusze | wsparcie | **Przepisz (nie dziel)** | Jedna intencja („chcę pomóc") — dzielenie pogorszyłoby. Ale: **duplikat nagłówka** „Patronite" (w. 9 i 58), powiela `/opp/` (1,5%) i `/obywatelstwo/`, a „Bądź na bieżąco" to nie wsparcie | jedna strona; duplikaty → linki do `/opp/` i `/obywatelstwo/` |
| `/pytania/` | 1 958 / 20 | pierwszy raz na Jazdowie | poznawcza | **Zostaw** | Wzorcowy FAQ czytany sekwencyjnie/wyszukiwaniem. Podział na 20 stron byłby szkodliwy | + spis kotwic na górze; do menu (§4) |
| `/dialog/` | 3 586 / 3 | media, władze, sympatycy | kampania | **Zostaw treść, przepisz strukturę** | Treść kampanijna, czytana sekwencyjnie → nie dzielić. Ale 3 586 słów na 3 nagłówkach to ściana tekstu; 2 z 3 H2 to tylko linki do PDF | + śródtytuły H2/H3; z menu → pasek aktualności (§4.2) |
| `/sprawozdania/` | 124 / 32 | darczyńcy, urzędy, OPP | weryfikacja | **Przepisz** | 124 słowa i **32 nagłówki** — każdy PDF jest H3. To lista, nie hierarchia. Szkodzi czytnikom ekranu i konspektowi | H2 = rok, pod nim **lista** linków (nie H3) |
| `/mapa/` | 9 | zwiedzający | „gdzie co jest" | **✅ Naprawione (A5)** | Mapa działała poprawnie; brakowało 7 stron docelowych. PR #201: 6 szablonów + usunięcie wpisu 7/30 | 15 klikalnych domków, 15 ma stronę |
| `/domki/*` (9→15) | 145–283 | zwiedzający | katalog | **Zostaw** | Treść w porządku. Osierocenie dotyczy nawigacji globalnej (A4), nie mapy. `3-20` ma **0 słów** — uzupełnić albo wyłączyć (R13) | +6 szablonów z PR #201 |
| — 7 brakujących domków | — | — | — | **Uzupełnij lub odlinkuj** (A5) | `10-2`, `10-5`, `3-18`, `3-5`, `5a-4`, `7-30`, `8-1` linkowane z mapy, nie mają stron | decyzja: dopisać strony albo usunąć `link:` |
| `/partnerstwo/` | 154 / 0 | instytucje, partnerzy | „kim jesteście" | **Scal (przyjmij treść)** | Bardzo krótka, w stopce. Naturalny dom dla koalicji z `/wspolpraca/` (Sieć Lokalnych Gospodarzy, Okrągły Stół, Miasto Wspólna Sprawa, MAL, re:Kreators) | rozbudowana o sekcję „Sieci i koalicje" |
| `/opp/` | 144 / 0 | podatnicy | 1,5% | **Zostaw** 🔍 | Krótka, ale to osobna intencja **sezonowa** i osobno linkowana (kampanie, PIT). Scalenie z `/wesprzyj/` odebrałoby jej samodzielny adres | + `updated`; usunąć duplikat z `/wesprzyj/` |
| `/wydarzenia/` | 45 | zwiedzający | „co dziś" | **Zostaw + podłącz** | Osierocona; sensowna dopiero w nawigacji | do menu (§4) |
| `/historia/` | 15 (+ oś czasu) | wszyscy | poznawcza | **Zostaw** | Treść w `frontmatter.history`; czytana sekwencyjnie — nie dzielić | do menu (§4) |
| `/wspolzarzadzanie/` | 784 / 7 | miasta, badacze, NGO | poznawcza | **Zostaw** | Spójny wywód; dobra struktura H2 | do menu (§4) |
| `/deklaracja/` | 226 / 1 | wszyscy | tożsamość | **Zostaw** | Manifest — dzielenie bez sensu | bez zmian |
| `/obywatelstwo/` | 227 / 1 | sympatycy | transakcja | **Zostaw** | Krótka i skuteczna, CTA na zewnętrzny formularz | bez zmian |
| `/statut/` | 266 / 6 | urzędy, darczyńcy | formalna | **Zostaw** | Dokument formalny | + `generic: true` (A2) |
| `/regulamin/` | 661 / 8 | goście, organizatorzy | formalna | **Zostaw** | Dobra struktura tematyczna | bez zmian |
| `/regulamin-darowizn/` | 493 / 4 | darczyńcy | formalna | **Zostaw** | Dokument prawny (§§) | + `generic: true` (A2) |
| `/polityka-prywatnosci/` | 566 / 0 | wszyscy | formalna | **Zostaw** | — | uściślić zapis o cookies (U04 z audytu) |
| `/archiwum/` | 1 445 / 17 | badacze, sąsiedzi | projekt | **Zostaw + podłącz** | Bogata, dobrze ustrukturyzowana; tylko osierocona | do menu (§4) |
| `/archiwum-dolacz/` | 347 | wolontariusze | transakcja | **Zostaw** | Odrębne wezwanie do działania przy `/archiwum/` | link z `/archiwum/` |
| `/festiwal/` | 1 537 / 0 | zwiedzający | wydarzenie | **Zostaw + przepisz** | Osierocona, 1 537 słów **bez ani jednego nagłówka** | + śródtytuły; do menu |
| `/2017-mieszkania2030…/` | 2 334 / 3 | badacze | materiał źródłowy | **Zostaw** | Materiał do bazy wiedzy — sesja 5 | → `baza-wiedzy/` |

### 3.2. Tabela zaleceń — strony angielskie

| Strona | Słów | Rekomendacja | Uzasadnienie |
|---|---|---|---|
| `/en/` | 130 | **Zostaw** | — |
| `/en/co-management/` | 721 | **Zostaw** | Realne tłumaczenie, dobra treść |
| `/en/partnership/` | 101 | **Zostaw** | — |
| `/en/privacy-policy/` | 390 | **Zostaw** | — |
| `/en/history/` | 14 (+ oś) | **Zostaw** | — |
| `/en/map/` | 9 | **Napraw permalink** | Jedyny `permalink: map/` ze slashem |
| `/en/events/` | 45 | **Zostaw** | — |
| `/en/houses/*` (10) | 0–283 | 🔴 **Przetłumacz albo usuń** (A3) | **9 z 10 to kopie PL bajt w bajt.** Dla czytelnika EN to polski tekst; dla Google — duplikat. `10-6` istnieje tylko po angielsku (brak odpowiednika PL) |

**Decyzja do podjęcia (A3):** (a) przetłumaczyć 9 stron — najlepiej, ale to praca redakcyjna; (b) usunąć `/en/houses/` i kierować z EN na `/domki/` z adnotacją „opisy dostępne po polsku" — uczciwe wobec czytelnika i czyste dla SEO; (c) zostawić — nie polecam. **Rekomendacja: (b) teraz, (a) docelowo.**

### 3.3. Duplikaty i strony osierocone — zestawienie

**Duplikaty treści:**

| Co | Gdzie | Propozycja |
|---|---|---|
| Sekcja „Patronite — stały patronat" | `wesprzyj.md` w. 9 **i** w. 58 (ten sam nagłówek H3 dwa razy) | zostawić jedną |
| 1,5% podatku | `wesprzyj.md` (`### 1,5 % podatku`) **i** cała strona `/opp/` | `/opp/` = źródło, `/wesprzyj/` linkuje |
| Obywatelstwo | `wesprzyj.md` (`## Złóż wniosek…`) **i** `/obywatelstwo/` | `/obywatelstwo/` = źródło, `/wesprzyj/` linkuje |
| Opisy domków | `domki/*` **i** `en/houses/*` (9 par identycznych) | patrz A3 |
| Plakat sierpniowy | `co-robimy.md` (2×: miniatura i pełny) + `Home.vue` (`aktualny_plakat.png`) + `plakaty/2026_08.png` | jedno źródło (`/plakaty/`) |

**Osierocone (0 linków przychodzących):** `/wydarzenia/`, `/festiwal/`, `/archiwum-dolacz/`, 9× `/domki/*`, 10× `/en/houses/*`. Dodatkowo poza nawigacją globalną: `/mapa/`, `/opp/`, `/archiwum/`, `/2017-mieszkania2030…/`, a `/pytania/`, `/historia/`, `/wspolzarzadzanie/` — tylko z kafelków strony głównej.

### 3.4. Archiwum plakatów — opcje (do decyzji, nie decyduję)

Stan: **34 PNG (38 MB) + 29 miniatur JPG (0,8 MB)**, od `2022_10` do `2026_08`; 28 wklejonych w `co-robimy.md`; dwa najnowsze wyświetlane jako **pełne PNG** (~700 KB każdy), reszta jako miniatury — niespójnie.

| Opcja | Na czym polega | Zysk | Koszt / ryzyko |
|---|---|---|---|
| **A. Pełne archiwum** | osobna strona `/plakaty/` ze wszystkimi, miniatury + link do pełnego | ciągłość, materiał historyczny, odciąża `/co-robimy/` | 38 MB zostaje w repo |
| **B. Archiwum + konwersja** ⭐ | jak A, ale PNG → WebP/JPEG i wszędzie miniatury | ~38 MB → ~4 MB, nic nie ginie | jednorazowa konwersja (narzędzia) |
| **C. Rok bieżący + archiwum zbiorcze** | `/plakaty/` = 12 ostatnich; starsze na `/plakaty/archiwum/` | lekka strona główna sekcji | dwa miejsca do utrzymania |
| **D. Tylko bieżący** | zostaje aktualny plakat, reszta usunięta | najlżej | **bezpowrotna utrata materiału** — nie polecam dla organizacji z archiwum społecznym |

**Sugerowany domyślny wybór: B** — organizacja, która prowadzi Społeczne Archiwum Osiedla Jazdów, nie powinna kasować własnej kroniki wydarzeń; kompresja rozwiązuje problem wagi bez utraty czegokolwiek. **Decyzja należy do Ciebie.**

---

## 4. Nawigacja główna

### 4.1. Które strony w menu i dlaczego

Menu ma dziś 6 pozycji + przełącznik języka, a serwis liczy ~27 stron PL. Braki (A4) są poważniejsze niż nadmiar. Proponuję **menu dwupoziomowe: 5 pozycji nadrzędnych z rozwinięciami**, uporządkowane wg tego, **po co ludzie przychodzą**, nie wg struktury organizacji.

| Pozycja | Rozwinięcie | Intencja odwiedzającego |
|---|---|---|
| **Osiedle** | Mapa i domki · Historia · Pytania | „co to jest, chcę przyjść i zobaczyć" |
| **Co robimy** | Programy (oprowadzania, Czytelnia) · Wydarzenia · Plakaty · Archiwum społeczne · Festiwal | „co się tu dzieje" |
| **Wspólnota** | Deklaracja wolności · Obywatelstwo · Współzarządzanie · Partnerstwo | „kim jesteście, jak to działa" |
| **Współpraca** | Zorganizuj wydarzenie · Firmy (CSR/ESG) · Szkoły i warsztaty | „chcę coś z wami zrobić" |
| **Wesprzyj** | — (bez rozwinięcia) | „chcę pomóc" |
| *english / polski* | — | — |

Zmiany względem dziś: **do nawigacji globalnej wchodzą** `pytania`, `historia`, `wspolzarzadzanie` (dziś tylko kafelki) oraz `mapa`, `wydarzenia`, `archiwum`, `festiwal`, `plakaty`, `domki` (dziś poza nawigacją). **Z menu wychodzi** `dialog` → do paska aktualności (§4.2).

> **Uwaga:** dwa poziomy to więcej kodu i więcej do obsłużenia klawiaturą niż dziś. Jeśli wolisz uniknąć tej złożoności, alternatywa płaska: **Osiedle · Co robimy · Wspólnota · Współpraca · Wesprzyj**, gdzie każda nadrzędna jest **realną stroną-rozdrożem z własną treścią** i linkami w treści. Mniej kodu, ale o jedno kliknięcie dalej do stron drugiego poziomu.

### 4.2. Mechanizm treści czasowych

„List otwarty" zajmuje dziś **pierwszą pozycję menu**. To treść związana z konkretną sytuacją z 2026 r. Bez reguły menu będzie puchło z każdą kampanią.

**Propozycja — pasek aktualności nad menu** (nie w menu):
- jedna pozycja naraz, sterowana z `themeConfig.json`: `{ active: true, label, href, until: "2026-12-31" }`;
- **reguła wygaszania:** znika automatycznie po dacie `until`, a bezwzględnie po **6 miesiącach** od publikacji albo gdy sprawa zostaje zamknięta;
- po wygaszeniu treść **nie znika** — zostaje pod swoim adresem i wchodzi do „Co robimy → Archiwum" (ciągłość linków, zero 404);
- do zamknięcia z redakcją: czy pasek ma być zamykalny przez czytelnika (cookie) — polecam tak, żeby nie irytował stałych bywalców.

### 4.3. Miejsce na bazę wiedzy (sesja 5)

Menu wytrzyma **jedną** dodatkową pozycję nadrzędną — ale nie więcej. Dwie możliwości: (a) osobna pozycja **Baza wiedzy** obok „Wesprzyj" (najczytelniej, jeśli kolekcja urośnie powyżej ~10 materiałów); (b) rozwinięcie pod **Osiedle** (jeśli zostanie kilka pozycji). Rekomendacja: zacząć od (b), przejść na (a) przy rozroście. Kandydaci do kolekcji już są: `2017-mieszkania2030…`, 4 PDF-y z `wiedza/`, 7 z `dyplomacja/`, 3 z `dokumenty/`.

### 4.4. Dokumenty formalne w stopce — kompletność i działanie

Sprawdziłem wszystkie 6 linków: **wszystkie odpowiadają 200** — ale **każdy przez przekierowanie 301**, bo brakuje końcowego slasha (`/statut` → `/statut/`). Do naprawy w `themeConfig.json` (§5 tabeli URL).

Kompletność: lista jest sensowna. Do rozważenia dołożenie **`/opp/`** (status OPP i 1,5% to informacja formalna, dziś strona jest całkowicie poza nawigacją) oraz — jeśli powstanie — **deklaracji dostępności**. Stopka EN ma tylko `Privacy Policy`; warto dołożyć `Partnership`.

### 4.5. Mobile

Dzisiejsze menu mobilne to pełnoekranowa nakładka od `top 6.5rem` — pomieści rozbudowaną nawigację, ale wymaga uwagi przy dwóch poziomach:
- pozycje nadrzędne jako `<button aria-expanded>` rozwijające podlisty (klawiatura + czytnik ekranu; wzorzec z sesji 2, PR #187, już jest w menu głównym);
- cel dotykowy **≥44 px** wysokości na pozycję (dziś `padding 1em`);
- kolejność w zasięgu kciuka: najczęstsze intencje (**Osiedle**, **Co robimy**) na górze, przełącznik języka na dole;
- przy 5 pozycjach × ~4 podpozycje lista może przekroczyć wysokość ekranu — konieczne przewijanie **wewnątrz** nakładki (`overflow-y: auto`) i zablokowanie przewijania tła (dziś realizowane przez `body.menu-on`);
- domyślnie podlisty **zwinięte** — inaczej na 375 px zobaczymy same nagłówki.

### 4.6. Linkowanie kontekstowe

Dobra nawigacja to nie tylko menu. Propozycje powiązań (dziś nie istnieją):

| Z | Do | Po co |
|---|---|---|
| `/co-robimy/` | `/baza-wiedzy/`, `/archiwum/` | pogłębienie tematu |
| `/historia/` | `/archiwum/`, `wiedza/*.pdf` | materiały źródłowe |
| `/wesprzyj/` | `/sprawozdania/`, `/opp/`, `/regulamin-darowizn/` | wiarygodność przed darowizną |
| `/mapa/` | `/domki/*` | działa już przez mapę; warto dodać też listę tekstową domków (dostępność, SEO) |
| `/domki/*` | `/mapa/`, sąsiednie domki | powrót i eksploracja |
| `/pytania/` | `/wspolpraca/`, `/obywatelstwo/`, `/wesprzyj/` | FAQ jako rozdroże |
| `/dialog/` | `/historia/`, `/wspolzarzadzanie/` | kontekst sporu |
| `/festiwal/`, `/archiwum/` | `/wesprzyj/` | zamknięcie ścieżki |

---

## 5. URL-e i przekierowania

### 5.1. Forma kanoniczna

**Decyzja: adres kanoniczny ZAWSZE z końcowym slashem** (`/statut/`).

Uzasadnienie: (1) tak już działa produkcja — Netlify sam przekierowuje `301 /statut → /statut/`; (2) tak generuje VuePress; (3) tak jest w menu głównym (6/6). Niespójna jest wyłącznie stopka (**0/6 ze slashem**), przez co każde kliknięcie w stopce kosztuje zbędny przeskok. Naprawa to edycja `themeConfig.json`, bez ruszania adresów.

Pozostałe zasady: bez polskich znaków i wielkich liter (dziś spełnione); slugi EN po angielsku, nie kalki (dziś spełnione: `co-management`, `partnership`); **struktura pozostaje płaska** — jedyne uzasadnione zagnieżdżenia to istniejące `/domki/*` i `/en/*` (realne kolekcje) oraz proponowane `/wspolpraca/wydarzenia/`. Głębsze zagnieżdżanie łamałoby linki bez zysku.

### 5.2. Pełna tabela mapowania URL-i

Legenda typu: **=** bez zmian · **301** przekierowanie stałe · **NOWY** nowy adres · **NAPRAWA** błędny link w źródle (nie przekierowanie — te adresy nigdy nie działały)

| Stary URL | Nowy URL | Powód | Typ |
|---|---|---|---|
| `/` | `/` | — | **=** |
| `/co-robimy/` | `/co-robimy/` | zostaje (treść odchudzona o plakaty) | **=** |
| — | `/plakaty/` | wydzielone archiwum plakatów (§3.4) | **NOWY** |
| `/pytania/` | `/pytania/` | — | **=** |
| `/historia/` | `/historia/` | — | **=** |
| `/deklaracja/` | `/deklaracja/` | — | **=** |
| `/obywatelstwo/` | `/obywatelstwo/` | — | **=** |
| `/wspolzarzadzanie/` | `/wspolzarzadzanie/` | — | **=** |
| `/wspolpraca/` | `/wspolpraca/` | zostaje jako strona nadrzędna | **=** |
| — | `/wspolpraca/wydarzenia/` | wydzielona organizacja wydarzeń (§3.1) | **NOWY** |
| `/wesprzyj/` | `/wesprzyj/` | — | **=** |
| `/opp/` | `/opp/` | — | **=** |
| `/dialog/` | `/dialog/` | — | **=** |
| `/wydarzenia/` | `/wydarzenia/` | — | **=** |
| `/festiwal/` | `/festiwal/` | — | **=** |
| `/archiwum/` | `/archiwum/` | — | **=** |
| `/archiwum-dolacz/` | `/archiwum-dolacz/` | — | **=** |
| `/mapa/` | `/mapa/` | — | **=** |
| `/partnerstwo/` | `/partnerstwo/` | treść rozbudowana o koalicje | **=** |
| `/statut/` | `/statut/` | — | **=** |
| `/regulamin/` | `/regulamin/` | — | **=** |
| `/regulamin-darowizn/` | `/regulamin-darowizn/` | — | **=** |
| `/sprawozdania/` | `/sprawozdania/` | — | **=** |
| `/polityka-prywatnosci/` | `/polityka-prywatnosci/` | — | **=** |
| `/2017-mieszkania2030-silne-wspierajace-sie-spolecznosci/` | bez zmian | długi, ale działa i jest zaindeksowany | **=** |
| `/domki/3-6/` … (9 stron) | bez zmian | — | **=** |
| ~~`/3-5/`, `/3-6/` … (16 adresów bez prefiksu)~~ | — | ❌ **WYCOFANE wraz z A1.** Te adresy nigdy nie były używane przez mapę, więc nie ma czego przekierowywać. Przekierowania **niepotrzebne** | **anulowane** |
| `/en/` … `/en/privacy-policy/` | bez zmian | — | **=** |
| `/en/houses/*` (10) | do decyzji (A3) | jeśli usuwamy → 301 na `/domki/<numer>/` | **= lub 301** |
| `/wesparcie` | `/wesprzyj/` | istniejące przekierowanie | **301** (jest) |
| `/pl/pomoc` | `/wesprzyj/` | istniejące przekierowanie | **301** (jest) |
| `/sprawozdania/2024_*.pdf`, `/sprawozdania/2025_*.pdf` | `/sprawozdania/` | istniejące (4 wpisy) | **301** (jest) |
| `<dowolny>` bez slasha | `<dowolny>/` | forma kanoniczna | **301** (Netlify robi to sam) |
| `www.jazdow.pl/*` | `jazdow.pl/*` | apex | **301** (działa) |

**Podsumowanie: 0 zmian istniejących adresów.** Cała tabela to 2 nowe adresy, 16 napraw martwych linków i potwierdzenie reszty. To celowe — sesja 3 nie ma powodu przenosić działających, zaindeksowanych stron.

### 5.3. Przekierowania — oba formaty

Nowe wpisy do dopisania (16 domków). Bez łańcuchów: każdy stary adres trafia **od razu** do adresu kanonicznego ze slashem.

**`www/.vuepress/public/_redirects`** (działa na Netlify **i** Cloudflare Pages — plik jeszcze nie istnieje, do utworzenia):

```
# (Blok domków WYCOFANY — patrz korekta A1 w §0. Adresy bez prefiksu nigdy nie działały
#  i nie były używane, więc przekierowania są zbędne. Zostawiam przykład składni.)

# Istniejące (przenieść z netlify.toml dla przenośności)
/wesparcie   /wesprzyj/   301!
/pl/pomoc    /wesprzyj/   301!
```

**`netlify.toml`** — ten sam zestaw w składni TOML (przykład jednego wpisu; pozostałe analogicznie):

```toml
[[redirects]]
  from = "/3-6"
  to = "/domki/3-6/"
  status = 301
  force = true
```

> **Uwaga:** dla 7 domków bez stron (A5) przekierowanie prowadzi do 404 dopóki strony nie powstaną. Dlatego **najpierw decyzja z A5**, potem wdrożenie tych 7 wpisów.

**Strona 404:** dziś istnieje (`/nieistniejaca` → 404), ale **nie zawiera nawigacji** — czytelnik trafia w ślepy zaułek. Do zrobienia w sesji 4: własny `404.md` z menu, wyszukiwarką lub listą najważniejszych działów.

### 5.4. Skrypt testowy

Do uruchomienia po wdrożeniu (sesja 4). Sprawdza każdy wpis z tabeli §5.2 — **oczekuje jednego skoku**, wykrywa łańcuchy i 404:

```bash
#!/usr/bin/env bash
# scripts/test-redirects.sh — weryfikacja tabeli URL z ARCHITEKTURA.md §5.2
BASE="${1:-https://jazdow.pl}"
fail=0

# adres | oczekiwany kod | oczekiwany cel (puste = bez przekierowania)
CASES=(
  "/|200|"
  "/co-robimy/|200|"
  "/plakaty/|200|"
  "/pytania/|200|"
  "/mapa/|200|"
  "/domki/3-6/|200|"
  "/wspolpraca/|200|"
  "/wspolpraca/wydarzenia/|200|"
  "/statut/|200|"
  "/sprawozdania/|200|"
  "/en/|200|"
  "/3-6|301|$BASE/domki/3-6/"
  "/3-8|301|$BASE/domki/3-8/"
  "/10-8|301|$BASE/domki/10-8/"
  "/statut|301|$BASE/statut/"
  "/wesparcie|301|$BASE/wesprzyj/"
)

for c in "${CASES[@]}"; do
  IFS='|' read -r path want_code want_loc <<< "$c"
  read -r code loc < <(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" --max-time 15 "$BASE$path")
  if [ "$code" != "$want_code" ]; then
    echo "✗ $path — kod $code, oczekiwano $want_code"; fail=1; continue
  fi
  if [ -n "$want_loc" ] && [ "$loc" != "$want_loc" ]; then
    echo "✗ $path — cel $loc, oczekiwano $want_loc"; fail=1; continue
  fi
  # wykryj łańcuch: cel przekierowania musi odpowiedzieć 200 bez kolejnego skoku
  if [ -n "$want_loc" ]; then
    next=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$loc")
    [ "$next" != "200" ] && { echo "✗ $path — ŁAŃCUCH: cel zwraca $next"; fail=1; continue; }
  fi
  echo "✓ $path → ${want_code}${want_loc:+ → $want_loc}"
done
exit $fail
```

---

## 6. Sugestie redakcyjne (propozycje — bez zmiany treści merytorycznej)

Do akceptacji pozycja po pozycji. **Nie zmieniam sensu żadnego zdania** — proponuję skróty nagłówków, lead i śródtytuły.

| # | Gdzie | Dziś | Propozycja | Powód |
|---|---|---|---|---|
| R1 | `/` (`README.md:3`) | `<h1>` = całe zdanie: „Wolny Jazdów to społeczność warszawskiego osiedla drewnianych domków fińskich, prowadząca ogólnodostępne działania społeczne, kulturalne, edukacyjne, artystyczne." | `<h1>`: **„Wolny Jazdów"**; zdanie zostaje jako lead pod nagłówkiem | Nagłówek to etykieta, nie streszczenie. *(Sesja 2 rozwiązała to technicznie — `<h1>` ukryty + lead jako `<p>`; tu chodzi o warstwę redakcyjną.)* |
| R2 | `/co-robimy/` w. 10–17 | Ręczny spis treści: H2 „Lista wydarzeń na Facebooku" + 7 × H3, gdzie 4 pozycje prowadzą **poza stronę** | Rozdzielić: spis kotwic **tylko** do sekcji na tej stronie; linki wychodzące jako osobny blok „Zobacz też" | Spis treści, który wyprowadza ze strony, myli; pozycje 3–6 nie są sekcjami |
| R3 | `/co-robimy/` | Nagłówek „Co robimy?" ze znakiem zapytania | „Co robimy" albo „Nasze programy" | Pytanie w tytule nie wnosi treści; „programy" lepiej opisuje zawartość |
| R4 | `/wspolpraca/` w. 54–91 | Koalicje (Sieć Lokalnych Gospodarzy, Okrągły Stół, Miasto Wspólna Sprawa, MAL, re:Kreators) jako **H3 pod** „programami edukacyjnymi" | Przenieść do `/partnerstwo/` jako H2 „Sieci i koalicje, w których działamy" | Błąd hierarchii — to nie są programy edukacyjne; i to informacja o nas, nie oferta |
| R5 | `/wspolpraca/` w. 12 | H2: „Współorganizacja wydarzeń w zabytkowym domku fińskim lub ogrodzie." (z kropką) | Tytuł nowej strony: **„Zorganizuj wydarzenie na Jazdowie"** | Nagłówki bez kropek; forma czasownikowa mówi, co można zrobić |
| R6 | `/wesprzyj/` | Nagłówek „Patronite.pl/jazdow - stały patronat" **dwa razy** (w. 9 i 58) | Zostawić jedno wystąpienie | Duplikat |
| R7 | `/wesprzyj/` w. 15 | „Bądź na bieżąco" wewnątrz strony o wspieraniu | Przenieść niżej albo do stopki | To nie jest forma wsparcia — myli w ścieżce darowizny |
| R8 | `/sprawozdania/` | 24 × H3 na linki do PDF-ów | H2 = rok, pod nim zwykła lista `-` | 124 słowa na 32 nagłówkach; konspekt strony jest nieczytelny dla czytników ekranu |
| R9 | `/dialog/` | 3 586 słów na 3 nagłówkach; 2 z nich to same linki do PDF | Dodać śródtytuły H2 dzielące wywód; nagłówki-linki zamienić na tekst + link w treści | Ściana tekstu; brak konspektu |
| R10 | `/festiwal/` | 1 537 słów, **zero nagłówków** | Dodać H2 (program / miejsce / dojazd / partnerzy — wg faktycznej treści) | j.w. |
| R11 | Wiele stron | Długie, bezosobowe zdania organizacyjne, np. „Tworzymy partnerstwa z firmami, którym bliskie są wartości związane ze zrównoważonym rozwojem, lokalnością, dobrostanem i odpowiedzialnością społeczną i przyrodniczą." | Podzielić na 2 zdania, formy osobowe („Szukamy firm, które…") | Czytelność; to sugestia stylistyczna — do decyzji redakcji |
| R12 | `/pytania/` | 20 pytań bez spisu na górze | Dodać spis kotwic | Ułatwia skanowanie i linkowanie do konkretnej odpowiedzi |
| R13 | `domki/3-20.md` | **0 słów** (sama nazwa: „Ambsada Muzyki Tradycyjnej”) | Uzupełnić opis **albo** wyłączyć z linkowania; poprawić literówkę „Ambsada" → „Ambasada" | Pusta strona w katalogu; literówka w tytule |
| R14 | `/co-robimy/` w. 71, 73 | Plakaty 2026_08 i 2026_07 wyświetlane jako **pełne PNG** (~700 KB), reszta jako miniatury | Ujednolicić — wszędzie miniatura + link do pełnego | Niespójność i zbędny transfer |

---

## 7. Czego ten dokument nie rozstrzyga

> ### ✅ AKTUALIZACJA — decyzje podjęte 2026-07-30 (po sesji)
>
> Wszystkie poniższe punkty zostały rozstrzygnięte przez właściciela serwisu:
>
> | # | Pytanie | **Decyzja** |
> |---|---|---|
> | 1 | Dane z Search Console | **GSC zainstalowane** po sesji. Rekomendacje 🔍 czekają na ~2–4 tyg. danych. |
> | 2 | 7 domków bez stron (A5) | **`7-30` — usunąć link z mapy.** Dla `10-2`, `10-5`, `3-18`, `3-5`, `5a-4`, `8-1` — **utworzyć puste pliki-szablony** do późniejszego uzupełnienia treścią. |
> | 3 | Angielskie domki (A3) | **Przetłumaczyć.** Wersje robocze przygotowuje Claude, publikacja **wyłącznie po przejrzeniu i akceptacji** — to opisy cudzych organizacji. |
> | 4 | Archiwum plakatów | **Rok bieżący + archiwum zbiorcze, BEZ konwersji formatu** (wariant C z §3.4). Pliki pozostają w PNG — świadoma decyzja, waga nie jest tu problemem. |
> | 5 | Menu | **Dwupoziomowe** (5 pozycji nadrzędnych z rozwinięciami, §4.1). |
> | 6 | Restrukturyzacja katalogów | **Pełna** — `www/pl/`, `www/en/` (§1.3). **Warunek: test pilotażowy z §1.7 przed przeniesieniem reszty.** |
>
> **Dokument jako całość nie jest jeszcze zaakceptowany** (PR #200 pozostaje otwarty do przeglądu). Powyższe decyzje kierunkowe są wiążące; reszta dokumentu czeka na uwagi.

Świadome luki — wymagają Twojej decyzji albo danych:

1. **Search Console nie jest zainstalowane** (A6) — rekomendacje 🔍 (`/wspolpraca/`, `/opp/`, kolejność menu) opierają się na strukturze, nie na zachowaniu użytkowników. Strona, której nikt nie znajduje, może potrzebować lepszego tytułu, a nie podziału. **Te trzy pozycje pozostaną nierozstrzygnięte, dopóki nie zbierze się kilka tygodni danych** — instrukcja w §0/A6. Jeśli nie chcesz czekać, można wdrożyć je na podstawie samej struktury i przyjąć ryzyko, że część pracy okaże się niepotrzebna.
2. **A5 — 7 domków bez stron**: dopisać strony czy usunąć linki z mapy? To decyzja treściowa (czy te domki nadal działają?).
3. **A3 — angielskie domki**: przetłumaczyć (praca redakcyjna) czy usunąć i przekierować?
4. **Archiwum plakatów** — 4 opcje w §3.4, decyzja należy do Ciebie.
5. **Menu: dwa poziomy czy płaskie** (§4.1) — kompromis między kompletnością a złożonością kodu.
6. **Restrukturyzacja katalogów** — duża zmiana mechaniczna; wartość zależy od potwierdzenia, że `permalink` utrzyma URL-e (test pilotażowy, §1.7). Jeśli uznasz ją za zbyt ryzykowną, minimalna alternatywa naprawiająca A2 jest w §1.7.

---

## 8. Proponowana kolejność wdrożenia (sesja 4)

Od najwyższego stosunku wartości do ryzyka:

| Etap | Co | Ryzyko | Zależności |
|---|---|---|---|
| **0** | **A6** — weryfikacja serwisu w Search Console + zgłoszenie sitemapy (§0/A6) | zerowe (bez zmian w kodzie) | **zrobić jak najszybciej** — dane liczą się dopiero od weryfikacji |
| **1** | ✅ **A5** — 6 stron-szablonów domków + usunięcie wpisu 7/30 (PR #201) | znikome | **zrobione** |
| **2** | **A2** — udostępnienie 10 plików w CMS (`generic: true` + kolekcje) | znikome | — |
| **3** | Stopka: końcowy slash w 6 linkach (koniec zbędnych 301) | znikome | — |
| **4** | Redakcja: R6, R8, R13, R14 (duplikaty, nagłówki, literówka) | niskie | akceptacja §6 |
| **5** | Nowa nawigacja (§4) + pasek aktualności | średnie | decyzja: 2 poziomy czy płasko |
| **6** | Wydzielenie `/plakaty/` z `/co-robimy/` | średnie | decyzja z §3.4 |
| **7** | Podział `/wspolpraca/` + przeniesienie koalicji do `/partnerstwo/` | średnie | 🔍 wymaga danych z etapu 0 (~4 tyg.) **albo** świadomej decyzji bez nich |
| **8** | `translationKey` + `hreflang` (dług z sesji 2) | średnie | decyzja A3 |
| **9** | Restrukturyzacja katalogów + przebudowa CMS | **wysokie** | test pilotażowy §1.7 |
| **10** | Sprzątanie assetów (12 MB) i archiwum plakatów | niskie | decyzja z §3.4 |

---

*Koniec ARCHITEKTURA.md — dokument jest propozycją. Sesja 3 nie zmieniła żadnego pliku treści, adresu ani konfiguracji. Czekam na akceptację przed sesją 4.*
