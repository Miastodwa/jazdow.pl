# AUDIT — jazdow.pl (Sesja 1)

> **Aktualizacja Sesja 2 (2026-07-30):** dodano kolumnę „status" przy znaleziskach i metryki „po" — patrz **§7 Status realizacji (Sesja 2)** na końcu dokumentu. Sekcje 1–6 to oryginalny audyt (stan „przed").

> Audyt bez zmian w kodzie. Data: 2026-07-30. Gałąź: `master` @ `fe2761d`.
> Zakres: kod repozytorium, build lokalny (`yarn build`) oraz produkcja `https://jazdow.pl`.
> Narzędzia automatyczne (Lighthouse, axe/pa11y, unlighthouse) **nie były instalowane** — patrz sekcja „Metryki". Ocena dostępności i wydajności została wykonana ręcznie na podstawie kodu, zbudowanego `dist/` i odpowiedzi produkcji. Stan repozytorium na GitHubie (PR-y, issues, alerty) **nie był pobrany przez `gh`** — CLI nie jest zalogowane; użyto lokalnego `git`.

---

## 1. Streszczenie dla osób nietechnicznych

Strona działa, buduje się bez błędów (ok. 6 sekund) i jest w całości po stronie serwera generowana jako zwykłe pliki HTML — to dobra, trwała technologia dla organizacji. Treść jest bogata i aktualna (plakaty z sierpnia 2026, listy otwarte z 2026 roku), a redaktorzy mogą ją edytować przez panel CMS.

Największy ukryty problem to **waga**: strona wysyła do internetu ok. **385 MB** plików, z czego prawie połowa to **czcionki w starym, nieużywanym formacie** (pojedyncze pliki po 8–11 MB, których żadna przeglądarka nawet nie pobiera) oraz **cztery duże PDF-y** (jeden ma 96 MB). To nie spowalnia bezpośrednio zwykłego wejścia na stronę, ale rozdmuchuje repozytorium, wydłuża wdrożenia i utrudni ewentualną przeprowadzkę na inny hosting.

Drugi obszar to **dostępność dla osób z niepełnosprawnościami**. Ikony social media w stopce to dla czytnika ekranu pojedyncze litery („b", „d", „o", „p", „x") — czyli bełkot. Menu na telefonie otwiera się tylko myszką, nie da się go obsłużyć klawiaturą. Zielony kolor linków ma zbyt słaby kontrast na białym tle. Plakat na stronie głównej niesie informacje o wydarzeniach, ale wyłącznie jako obrazek — osoba niewidoma nie dowie się z niego niczego.

Trzeci obszar to **jak strona wygląda, gdy ktoś udostępnia link** (np. na Facebooku). Brakuje tzw. Open Graph — udostępniony link nie ma ładnego obrazka ani opisu, a opis strony jest wszędzie taki sam („Partnerstwo Wolny Jazdów"). Dla organizacji, która żyje z rozpoznawalności i darowizn, to realna strata.

Są też dwie **„miny" na przyszłość**: logowanie redaktorów do CMS jest wpięte w usługę Netlify (zejście z Netlily odetnie im dostęp), a stary silnik strony wymaga specjalnej flagi zgodności, która zablokuje aktualizację środowiska. Żadna z tych rzeczy nie boli dziś, ale trzeba je świadomie zaplanować, zanim ktoś zacznie migrację. Wersja angielska pokrywa ok. jednej trzeciej treści polskiej — brakuje m.in. tłumaczenia listu otwartego i strony „jak wspierać".

Podsumowując: strona jest zdrowa i utrzymywalna, nic nie jest zepsute dla przeciętnego użytkownika, ale jest kilka konkretnych, tanich poprawek dostępności i SEO oraz duże sprzątanie zasobów, które warto zrobić w następnych sesjach.

---

## 2. Tabela znalezisk

Legenda wpływu: 🔴 wysoki · 🟠 średni · 🟢 niski. Trudność: S (mała) / M (średnia) / L (duża).

### Dostępność (WCAG 2.2 AA)

| ID | Obszar | Opis | Dowód | Wpływ | Trud. | Rekomendacja |
|----|--------|------|-------|:---:|:---:|--------------|
| A01 | A11y | Ikony social w stopce to litery fontu ikonowego jako tekst linku (`b/d/o/p/x`); czytnik ekranu czyta literę. Jedynie `title` (tooltip) niesie nazwę. | `theme/components/oj-footer.vue:13,22` | 🔴 | S | Dodać `aria-label`/tekst `.sr-only` z nazwą serwisu i `aria-hidden` na glifie. |
| A02 | Kontrast | `$oj-green-free #6ba568` na bieli ≈ **2.9:1** — poniżej AA (4.5:1 tekst, 3:1 duży/UI). Kolor linków, hover menu, tytułów i ikon stopki. | `styles/imports/variables.styl:13`; `typography.styl:112` | 🔴 | M | Przyciemnić zieleń dla tekstu/linków (cel ≥4.5:1) lub użyć fioletu `$oj-violet` (≈9.4:1). |
| A03 | Klawiatura | Hamburger to `<a class="icon">` bez `href` → nie fokusowalny, nie działa z klawiatury; brak `aria-expanded`/`aria-controls`, brak pułapki focusu; menu wyłącznie JS. | `theme/components/oj-menu.vue:3,35` | 🔴 | M | Zmienić na `<button>` z `aria-expanded`, obsłużyć Esc/focus trap; rozważyć wariant `<details>` bez JS. |
| A04 | Alt | Zdjęcia paralaksy intro nie mają atrybutu `alt` w ogóle. | `theme/components/oj-intro.vue:6` | 🟠 | S | Dodać sensowny `alt` (lub `alt=""` jeśli czysto dekoracyjne). |
| A05 | Alt/treść | Plakat na home niesie harmonogram wydarzeń jako obraz; `alt="Aktualny plakat zbiorczy"` nie przekazuje treści. | `theme/layouts/Home.vue:9` | 🟠 | M | Udostępnić wydarzenia jako tekst (patrz U03) lub opisowy `alt`/link do wersji tekstowej. |
| A06 | Nagłówki | `<h1>` strony głównej to całe zdanie-lead (`frontmatter.intro`), nie zwięzły nagłówek. | `www/README.md:3`; `oj-intro.vue:8` | 🟢 | S | Krótki `<h1>` (np. „Wolny Jazdów"), zdanie-lead jako `<p>` lead. |
| A07 | Landmarki | Brak skip-linku; stopka i menu to `<div>` (`#oj-footer`, `.oj-menu`), nie `<header>`/`<footer>`. `<nav>`/`<main>` są. | `oj-footer.vue:2`; `oj-menu.vue:2` | 🟠 | S | Dodać „przejdź do treści", opakować w `<header>`/`<footer>`. |
| A08 | Ruch | Brak `prefers-reduced-motion`; paralaksa (scroll→transform) i animacje `slideInLeft` działają zawsze. | `oj-intro.vue:32-44`; `styles/imports/animations.styl` | 🟠 | S | Wyłączać animacje/paralaksę w `@media (prefers-reduced-motion: reduce)`. |
| A09 | Focus | Brak jawnego stylu `:focus-visible`; widoczność opiera się na zieleni hover o niskim kontraście (A02). | `theme/styles/*` | 🟠 | S | Dodać wyraźny pierścień focusu o kontraście ≥3:1. |
| A10 | Cele dotyk. | Ikony stopki i linki menu bez gwarantowanego celu 24×24 CSS px (glif 2rem, ale bez paddingu klikalnego). | `oj-footer.vue:105-110` | 🟢 | S | Zapewnić min. 24×24 px obszar klikalny. |

### Wydajność

| ID | Obszar | Opis | Dowód | Wpływ | Trud. | Rekomendacja |
|----|--------|------|-------|:---:|:---:|--------------|
| P01 | Fonty | `@font-face` ładuje `woff/ttf/eot`, **nie `woff2`** — mimo że pliki `woff2` są na dysku. Brak `font-display` → FOIT. | `styles/imports/mixins.styl:7`; `typography.styl` | 🟠 | M | Dodać `woff2` jako pierwsze źródło, `font-display: swap`, usunąć `eot`. |
| P02 | Fonty | 4 wagi Lemura ładowane; render używa 400/700 (Light/Medium prawdopodobnie zbędne na większości stron). | `typography.styl:2-3` vs użycie | 🟢 | S | Ograniczyć do realnie używanych wag; rozważyć subset PL. |
| P03 | JS | **71 linków `prefetch`** / 74 chunki JS pobierane w tle na każdej stronie (~740 KB). | `dist/index.html` (71× `rel=prefetch`) | 🟠 | S | Wyłączyć/ograniczyć `shouldPrefetch` w konfiguracji. |
| P04 | Obrazy | Okładki kart nieoptymalne (`cover-history.jpg` 400 KB, `cover-model.jpg` 250 KB); brak `width`/`height` (CLS), `loading="lazy"`, `srcset`. | `theme/layouts/Home.vue`; `theme/components/oj-card.vue` | 🟠 | M | Kompresja + WebP/AVIF, wymiary, lazy, `srcset`. |
| P05 | Obrazy | Plakaty: 34 pliki PNG = 38 MB (0.6–3.8 MB/szt.). Home osadza pełny `aktualny_plakat.png` (1890×870, 105 KB) bez wymiarów; miniatury `*-small.jpg` istnieją, ale nie są używane w `srcset`. | `public/plakaty/`; `Home.vue:9` | 🟠 | M | PNG→WebP/JPEG, `width/height`, użyć miniatur w `srcset`. |
| P06 | 3rd-party | `netlify-identity-widget.js` ładowany na **każdej** stronie dla wszystkich odwiedzających (nie tylko `/admin`). | `www/.vuepress/config.js:20`; `dist/index.html` | 🟠 | M | Wczytywać widget tylko na `/admin/` (i na home tylko przy realnej potrzebie logowania). |

### SEO i metadane

| ID | Obszar | Opis | Dowód | Wpływ | Trud. | Rekomendacja |
|----|--------|------|-------|:---:|:---:|--------------|
| S01 | Meta | Identyczny `meta description` na wszystkich stronach PL: „Partnerstwo Wolny Jazdów". `<title>` per-strona jest OK. | `dist/*/index.html` (co-robimy, dialog…) | 🟠 | M | Unikalny opis per strona (z `frontmatter.tldr`). |
| S02 | Social | Brak Open Graph, Twitter Card i `og:image` — słabe podglądy udostępnianych linków (istotne dla NGO). | `dist/index.html` (0× `og:`) | 🔴 | M | Dodać OG/Twitter + domyślny `og:image` (per strona z okładki). |
| S03 | Ujawnienie | `meta generator = VuePress 1.9.10` ujawnia wersję silnika. | `dist/index.html`; prod | 🟢 | S | Usunąć/nadpisać `generator`. |
| S04 | i18n/kanon | Brak `hreflang`+`x-default` między PL/EN i brak `<link rel=canonical>`. | `dist/*/index.html` | 🟠 | M | Dodać `hreflang` i kanoniczne URL-e. |
| S05 | Ikony/PWA | Tylko `favicon.ico`; brak `apple-touch-icon`, `manifest.webmanifest`, `theme-color`. | `config.js:18`; `dist/index.html` | 🟢 | S | Dodać komplet ikon + manifest + `theme-color`. |
| S06 | Dane strukt. | Brak JSON-LD `Organization`/`NGO` (KRS/NIP/adres są w themeConfig). | `dist/index.html` | 🟢 | M | Dodać JSON-LD `NGO` z danymi z `themeConfig.json`. |
| S07 | ✅ Pozytyw | `sitemap.xml` (50 URL) i `robots.txt` obecne i poprawne. | `dist/sitemap.xml`, `robots.txt` | 🟢 | — | Utrzymać. |

### Design i UX

| ID | Obszar | Opis | Dowód | Wpływ | Trud. | Rekomendacja |
|----|--------|------|-------|:---:|:---:|--------------|
| U01 | Czytelność | `html` skaluje `font-size` w dół do **0.7×** poniżej 600 px (root ≈11 px) → mały tekst na telefonie, gorsze zoomowanie. | `typography.styl:32-41` | 🟠 | M | Złagodzić skalowanie; nie schodzić poniżej ~16 px efektywnie. |
| U02 | Tokeny | Brak tokenów skali typograf./odstępów — rozmiary (`1rem`,`1.2rem`,`2rem`…) rozsypane po komponentach. Kilka nieużywanych kolorów (`$oj-ck`,`$oj-red`,`$oj-pink`,`$oj-yellow`,`$oj-dim`). ✅ `#6ba568` jest zmienną. | `variables.styl`; komponenty | 🟢 | M | Wprowadzić tokeny skali/odstępów; usunąć martwe zmienne. |
| U03 | Treść | Kalendarz wydarzeń w całości wyprowadzony na Facebooka (`oj-events-mini` = placeholder + link). Zamyka treść przed osobami bez konta FB. | `oj-events-mini.vue`; `README.md:25-28` | 🟠 | L | Udostępnić listę wydarzeń natywnie (feed/ICS) obok linku do FB. |
| U04 | Prywatność | Polityka prywatności ogólna: mówi o „możliwych cookies/analityce", a realnie ładuje się tylko Netlify Identity (P06); brak analityki i embedów. | `www/polityka-prywatnosci.md:61`; `en/privacy-policy.md:52` | 🟢 | S | Uściślić politykę do stanu faktycznego (po naprawie P06). |

### Higiena kodu i repozytorium

| ID | Obszar | Opis | Dowód | Wpływ | Trud. | Rekomendacja |
|----|--------|------|-------|:---:|:---:|--------------|
| R01 | Martwe zasoby | **~145 MB martwych fontów**: format SVG (8–11 MB/plik, 26 szt.) nigdy nie serwowany + całe nieużywane rodziny `SF/M1/M2/P/SS` (0 odwołań) + `HK` (zadeklarowana, nieużywana). `fonts/` = 149 MB, w całości trafia do `dist/`. | `public/fonts/`; grep `fonts/SF|M1|M2|P|SS`=0; `mixins.styl:7` (brak `.svg`) | 🔴 | M | Usunąć fonty SVG i nieużywane rodziny; zostawić tylko Lemur/SC/oj-icons w `woff2`(+`woff`). |
| R02 | Waga | `wiedza/` = 4 PDF-y = **147 MB** (w tym `2018_wytyczne-konserwatorskie.pdf` **96 MB**). Cały katalog trafia do `dist/` i repo. | `public/wiedza/*.pdf` | 🟠 | M | Skompresować PDF-y / hostować poza repo (np. link zewn.); rozważyć git-lfs lub usunięcie z repo. |
| R03 | Kruchy link | Okładka karty „kalendarz" na home to zahardkodowany hash webpacka `/assets/img/sleepey.dd05d40c.svg` w markdown → zepsuje się po zmianie hasha. | `www/README.md:26` | 🟠 | S | Wskazać zasób z `theme/assets` przez import komponentu, nie hash w treści. |
| R04 | Hardkod | Link plakatu na home ma zaszyty miesiąc + absolutny URL `https://jazdow.pl/plakaty/2026_08.png`; duplikacja z `aktualny_plakat.png`. Wymaga edycji kodu co miesiąc. | `theme/layouts/Home.vue:8` | 🟠 | S | Sterować plakatem z frontmatter/CMS; jedno źródło prawdy. |
| R05 | Build/Node | Build wymaga `NODE_OPTIONS=--openssl-legacy-provider` (webpack 4 / VuePress 1 na Node ≥17). **Blokada** dla nowszych środowisk. | `package.json:6-7` | 🟠 | L | Patrz „Blokady"; docelowo migracja z VuePress 1.x. |
| R06 | Node rozjazd | `.nvmrc`=20, Netlify `NODE_VERSION`=20, **lokalnie 22.15.1**, CodeQL = `ubuntu-latest` (Node niepięty). | `.nvmrc`; `netlify.toml:8`; `codeql-analysis.yml` | 🟢 | S | Ujednolicić Node (pin w CI); zdecydować 20 vs 22. |
| R07 | Zależności | `yarn audit`: **471 podatności (37 krytycznych, 206 wysokich)** — niemal wszystkie tranzytywne, build-time (webpack-dev-server, svgo…), **nie trafiają do użytkownika**. Symptom EOL VuePress 1.x. | `yarn audit` (1268 pakietów) | 🟠 | L | Traktować jako sygnał do migracji, nie łatać pojedynczo (patrz decyzja o VuePress 1.x). |
| R08 | CMS | `config.yml` `repo: Miastodwa/jazdow.pl`, a realne `origin` to `Jazdow/jazdow.pl` — nieaktualna/niespójna konfiguracja CMS. | `public/admin/config.yml:3`; `git remote -v` | 🟠 | S | Poprawić `repo:` na `Jazdow/jazdow.pl`. |
| R09 | Bezpieczeństwo | Produkcja wysyła tylko `Strict-Transport-Security`. Brak CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. `netlify.toml` nie ma `[[headers]]`. | `curl -I https://jazdow.pl`; `netlify.toml` | 🟠 | S | Dodać nagłówki bezpieczeństwa w `netlify.toml` (lub na docelowym hostingu). |
| R10 | Deploy | **`.DS_Store` (4 szt.) serwowane publicznie** z `dist/` (są w `public/`). Nie są śledzone w git, ale kopiowane do builda. | `dist/.DS_Store`, `dist/plakaty/.DS_Store`… | 🟢 | S | Usunąć `.DS_Store` z `public/`; dodać krok czyszczący/`.gitignore` już je pokrywa dla repo. |
| R11 | Gałęzie | Scalone do usunięcia: `dialog`, `claude/xenodochial-nobel-94c8a6`. Otwarte prace: `chore/fonty` (+4), `chore/pdf-i-cms` (+1), `fix/codeql` (+1), `dependabot/…/js-yaml-3.15.0` (+1, przestarzały). | `git for-each-ref` | 🟢 | S | Usunąć scalone; ocenić/domknąć PR-y (patrz §niżej). |
| R12 | Build warn | Ostrzeżenie „An error was encountered in theme" — brak `index.js` w katalogu motywu (VuePress łagodnie wraca do motywu opartego na `layouts/`). Benign. | `yarn build` log; brak `theme/*.js` | 🟢 | S | Opcjonalnie dodać `theme/index.js`, by wyciszyć. |
| R13 | Build warn | `Browserslist: caniuse-lite is outdated`. | `yarn build` log | 🟢 | S | `npx update-browserslist-db@latest`. |
| R14 | ✅ CI | Workflow to wyłącznie CodeQL (JS) — **nie dubluje** builda Netlify. Brak sekretów w repo (dawny sekret FB usunięty w `fe2761d`/`47c3496`). | `.github/workflows/codeql-analysis.yml` | 🟢 | — | Utrzymać. |

---

## 3. Priorytetyzacja

**P0 — blokuje/wyklucza użytkowników**
- **A01** ikony social jako litery (czytnik ekranu)
- **A03** menu mobilne nieobsługiwalne klawiaturą
- **A02** kontrast zieleni na bieli poniżej AA (linki, UI)

**P1 — wydajność / SEO / bezpieczeństwo / duży dług**
- **S02** brak Open Graph / og:image
- **R01** ~145 MB martwych fontów (SVG + nieużywane rodziny)
- **R02** 147 MB PDF-ów (w tym 96 MB)
- **P06** Netlify Identity na każdej stronie
- **P01** brak woff2/`font-display`
- **P04/P05** nieoptymalne obrazy (brak wymiarów/lazy/srcset)
- **S01** duplikat meta description
- **R09** brak nagłówków bezpieczeństwa
- **A04/A05** brak/niedostateczne `alt` (intro, plakat)
- **A07** brak skip-linku i landmarków
- **R08** błędny `repo:` w CMS

**P2 — dług techniczny**
- **P03** nadmiarowy prefetch (71 linków)
- **U01** agresywne skalowanie fontu na mobile
- **U02** brak tokenów, martwe zmienne kolorów
- **U03** wydarzenia tylko na Facebooku
- **S03/S04/S05/S06** generator, hreflang/canonical, ikony/PWA, JSON-LD
- **A06/A08/A09/A10** nagłówek home, reduced-motion, focus, cele dotykowe
- **R03/R04** kruchy hash `sleepey`, hardkod plakatu
- **R06** rozjazd wersji Node
- **R07** 471 podatności (tranzytywne)
- **R11** gałęzie do sprzątnięcia

**P3 — nice-to-have**
- **U04** doprecyzowanie polityki prywatności
- **R10** `.DS_Store` w deployu
- **R12/R13** ostrzeżenia builda
- **A11** `speak:none` / `aria-hidden` na glifach

---

## 4. Metryki „przed" (baseline)

| Metryka | Wartość | Uwaga |
|---|---|---|
| Lighthouse (perf/a11y/SEO) | **nie zmierzono** | Lighthouse nie był instalowany (świadoma decyzja — ocena ręczna). Do uzupełnienia w sesji z narzędziami. |
| axe/pa11y (liczba błędów) | **nie zmierzono** | Ręcznie: ~10 znalezisk a11y, w tym 3× P0. |
| Waga zasobów publicznych (repo→deploy) | **~385–388 MB** | `fonts/` 149 MB · `wiedza/` 147 MB · `images/` 43 MB · `plakaty/` 38 MB · `sprawozdania/` 6.3 MB |
| Szacowany pierwszy load home | **~1.5 MB** | HTML 11 KB + CSS 38 KB + JS ~300 KB + fonty ~208 KB (woff) + obrazy kart/hero ~1 MB; dodatkowo ~740 KB JS prefetch w tle |
| Zależności | **9 devDeps bezpośrednich / 1268 pakietów** | 471 podatności (37 krytycznych, 206 wysokich), tranzytywne/build-time |
| Gałęzie | **6 lokalnych + 6 zdalnych**; 2 scalone (do usunięcia), 4 niescalone | dep. `js-yaml-3.15.0` przestarzały |
| Treść | **32 pliki MD (PL) / 17 (EN)** | pokrycie EN ≈ **35%** |
| Pokrycie EN — braki | dialog(list otwarty), co-robimy, pytania, wesprzyj, wspolpraca, regulamin, statut, sprawozdania, deklaracja, obywatelstwo | EN menu celowo węższe (events/map/history/co-management/partnership) |
| Build | `yarn build` **~6.3 s**, 50 URL w sitemap, exit 0 | warny: caniuse-lite outdated, „error in theme" (benign) |
| Node | lokalnie **22.15.1**; `.nvmrc`/Netlify **20** | rozjazd (R06) |
| Produkcja | wszystkie testowane URL = **200** (partnerstwo, sprawozdania, polityka-prywatnosci, statut) | hosting nadal **Netlify**; nagłówki: tylko HSTS |

---

## 5. Blokady (dla kolejnych sesji)

1. **Backend CMS = `git-gateway` + Netlify Identity.** Redaktorzy logują się przez tożsamość Netlify. Zejście z Netlify (np. na Cloudflare Pages) **odetnie im logowanie do CMS** — trzeba wcześniej wybrać alternatywę (Decap CMS z innym backendem OAuth, Sveltia CMS, lub inny panel). Dodatkowo `config.yml` wskazuje **błędne repo** `Miastodwa/jazdow.pl` (R08).
2. **`--openssl-legacy-provider`.** Wynika z webpacka 4 / VuePress 1.x (przestarzały algorytm hashowania). Flaga jest konieczna na Node ≥17. Utrzyma się dopóki jest VuePress 1.x; **zablokuje** środowisko, które nie pozwoli ustawić `NODE_OPTIONS` lub wymusi Node bez tej flagi. Realne rozwiązanie = migracja z VuePress 1.x (EOL) — powiązane z R07 (471 podatności).
3. **Brak dostępu do Google Search Console / analityki.** Nie ma jak zmierzyć realnego baseline'u ruchu, indeksacji i pozycji przed zmianami SEO — trzeba pozyskać dostęp, zanim ocenimy efekt poprawek S01–S06.
4. **`gh` CLI niezalogowane w tej sesji.** Stan PR-ów/issues/alertów Dependabota pobrano tylko z lokalnego `git`. Do pełnej oceny (kto jest autorem PR, status review, alerty bezpieczeństwa GitHub) potrzebne `gh auth login`.

---

## 6. Propozycja GitHub issues dla P0/P1 (do utworzenia po potwierdzeniu — NIE utworzone)

> Sugerowane tytuły + treść. Utworzę je dopiero na wyraźną zgodę.

1. **[a11y][P0] Ikony social w stopce nieczytelne dla czytników ekranu** — dodać dostępną nazwę linku (A01).
2. **[a11y][P0] Menu mobilne nieobsługiwalne z klawiatury** — `<button>` + `aria-expanded` + focus/Esc (A03).
3. **[a11y][P0] Kontrast zieleni `#6ba568` poniżej WCAG AA** — przyciemnić kolor tekstu/linków (A02).
4. **[seo][P1] Brak Open Graph / og:image** — podglądy linków dla social (S02).
5. **[perf][repo][P1] Usunąć ~145 MB martwych fontów (SVG + nieużywane rodziny)** (R01).
6. **[perf][repo][P1] Odchudzić PDF-y w `wiedza/` (147 MB, w tym 96 MB)** (R02).
7. **[perf][privacy][P1] Ograniczyć Netlify Identity do `/admin/`** (P06).
8. **[perf][P1] Fonty: dodać `woff2` + `font-display: swap`, usunąć `eot`** (P01).
9. **[perf][P1] Optymalizacja obrazów: wymiary, `lazy`, `srcset`, WebP** (P04/P05).
10. **[seo][P1] Unikalny `meta description` per strona** (S01).
11. **[sec][P1] Nagłówki bezpieczeństwa w `netlify.toml` (CSP, X-Frame-Options…)** (R09).
12. **[a11y][P1] `alt` dla zdjęć intro i plakatu; skip-link + landmarki** (A04/A05/A07).
13. **[cms][P1] Poprawić `repo:` w `public/admin/config.yml`** (R08).

---

---

## 7. Status realizacji (Sesja 2)

Sesja 2 zrealizowała szybkie poprawki niezależne od struktury treści (URL-e, podział stron i tłumaczenia zostały nietknięte — to sesje 3/4). Praca w **9 PR-ach** (branch → `master`), każdy z osobnym buildem. Wszystkie 9 scala się razem **bez konfliktów** (zweryfikowane na gałęzi integracyjnej).

Legenda statusu: ✅ zamknięte · 🟡 częściowe · ⏭️ odłożone (z powodem).

### Dostępność
| ID | Status | PR / uwaga |
|----|:---:|-----------|
| A01 ikony social jako litery | ✅ | #186 — inline SVG (Simple Icons) + `aria-label` |
| A02 kontrast zieleni | ✅ | #187 — `$oj-green-free` `#6ba568`→`#477f42` (2.9:1 → **4.79:1**) |
| A03 menu klawiaturą | ✅ | #187 — `<button>` + `aria-expanded`/`controls`, Esc + powrót focusu |
| A04 alt zdjęć intro | ✅ | #187 — `alt=""` (dekoracyjne) |
| A05 alt plakatu | ✅ | #187 — opisowy `alt` |
| A06 `<h1>` na home | ✅ | #187 — zwięzły `<h1>` (sr-only) + lead jako `<p>` |
| A07 skip link + landmarki | ✅ | #187 (+ `<footer>` w #186) |
| A08 prefers-reduced-motion | ✅ | #187 — `@media` + wyłączenie paralaksy JS |
| A09 focus ring | ✅ | #187 — globalny `:focus-visible` |
| A10 cele dotykowe | 🟡 | #186 — ikony social 2.5rem; pełny audyt 24px odłożony |
| A11 aria-hidden na glifach | ✅ | #186 — `aria-hidden` na SVG |
| — hreflang | ⏭️ | wymaga mapy URL PL↔EN i tłumaczeń → sesje 3/4 |

### Uszkodzone linki
| ID | Status | PR / uwaga |
|----|:---:|-----------|
| martwe linki (P0) | ✅ | #188 — `/en/model/`→`/en/co-management/`; skan 83 celów: **1 martwy, naprawiony**, reszta OK. Produkcyjne 404 z hipotezy audytu nie występują |

### SEO / metadane
| ID | Status | PR / uwaga |
|----|:---:|-----------|
| S01 unikalny description | ✅ | #189 — plugin `oj-seo` (50 stron) |
| S02 Open Graph / Twitter | ✅ | #189 — OG+Twitter+`og:image` (banner.jpg) |
| S03 usunięcie generatora | ✅ | #189 — postbuild (50 plików) |
| S04 canonical | ✅ | #189 — `<link rel=canonical>` (50 stron). **hreflang** ⏭️ sesje 3/4 |
| S05 ikony/PWA | ✅ | #189 — apple-touch, manifest, theme-color |
| S06 JSON-LD NGO | ✅ | #189 — KRS/NIP/REGON + sameAs |

### Wydajność
| ID | Status | PR / uwaga |
|----|:---:|-----------|
| P01 fonty (display/formaty) | 🟡 | #192 — `font-display: swap` + tylko woff, usunięcie eot/svg/ttf. **woff2 + subsetting** ⏭️ (lokalny npm cache blokuje enkoder) |
| P04 lazy obrazy | 🟡 | #193 — lazy dla obrazów z treści; `oj-card` = CSS background (poza zakresem); **srcset/WebP** ⏭️ |
| P05 plakaty | 🟡 | #187 — `width/height` plakatu (CLS); konwersja PNG→WebP + srcset ⏭️ |
| P06 Netlify Identity na każdej stronie | ➖ | **świadomie zostaje** — panel CMS pozostaje (Decap, #198), widget Identity potrzebny do logowania redaktorów. Optymalizacja (ładowanie tylko gdy potrzebne) możliwa później bez usuwania panelu |
| P03 nadmiarowy prefetch | ⏭️ | nie ruszone (P2) |

### Bezpieczeństwo
| ID | Status | PR / uwaga |
|----|:---:|-----------|
| R09 nagłówki bezpieczeństwa | ✅ | #190 — CSP + XFO + nosniff + Referrer + Permissions + HSTS, w `netlify.toml` **i** `_headers` (Cloudflare-ready). **Wymaga testu CMS/Identity na preview** |

### Higiena kodu / repo
| ID | Status | PR / uwaga |
|----|:---:|-----------|
| R01 martwe fonty (~145 MB) | ✅ | #191 + #192 — `fonts/` **149 MB → 268 KB** |
| R08 błędny `repo:` w CMS | ✅ | **#198** — `repo:` `Miastodwa/jazdow.pl` → `Jazdow/jazdow.pl` |
| R11 gałęzie / PR-y | ✅ | `dialog` usunięty; **#184 zamknięty** (rozbity na mniejsze PR-y), **#182 zmergowany** |
| R10 `.DS_Store` w deploy | ⏭️ | nie ruszone (P3) |
| R12/R13 warny builda | ⏭️ | nie ruszone (P3) |

### Design / UX / tokeny
| ID | Status | PR / uwaga |
|----|:---:|-----------|
| U02 tokeny (literały koloru) | 🟡 | #194 — kolory mapy jako tokeny. Centralizacja + usunięcie nieużywanych zmiennych w `variables.styl` ⏭️ (kolizja z #187, po jego merge) |
| U01 skalowanie fontu na mobile | ⏭️ | nie ruszone (P2) |
| U03 wydarzenia tylko na FB | ⏭️ | zmiana treści/architektury → sesje 3/4 |

### Panel CMS — decyzja: ZOSTAJE (zaktualizowany)

Rozważano pełne usunięcie Netlify Identity + CMS (#197). **Decyzja użytkownika: panel zostaje** i został zaktualizowany.

| Element | Status | PR / uwaga |
|---|:---:|---|
| Silnik CMS | ✅ | **#198** — `netlify-cms@^2.0.0` (zarchiwizowany, nieprzypięty) → **Decap CMS 3.15.1** (pinned + Subresource Integrity, hash zweryfikowany) |
| `repo:` (R08) | ✅ | **#198** — Miastodwa → Jazdow |
| CSP dla `/admin` | ✅ | **#190** — blok `/admin/*` + `identity.netlify.com` (przywrócone po chwilowym usunięciu — revert) |
| README | ✅ | #198 — wskazuje Decap CMS zamiast Netlify CMS |
| Usunięcie panelu | ⏭️ parked | **#197** — otwarte jako alternatywa; **nie mergować** dopóki panel jest używany (wyklucza się z #198) |

**⚠️ Do przetestowania na deploy preview:** wejście na `/admin/`, logowanie przez Netlify Identity, załadowanie kolekcji i zapis (Decap + git-gateway + editorial workflow).

### Metryki „przed" → „po" (stan zintegrowany 9 PR-ów)

| Metryka | Przed (Sesja 1) | Po (Sesja 2) |
|---|---|---|
| `public/` łącznie | **385 MB** | **237 MB** |
| w tym `fonts/` | **149 MB** | **268 KB** |
| w tym `wiedza/` (PDF) | 147 MB | 147 MB (⏭️ R02 nie ruszone) |
| Ikony social (a11y) | litery `b/d/o/p/x` | inline SVG + `aria-label` |
| Kontrast zieleni tekstu | 2.9:1 (❌ AA) | **4.79:1** (✅ AA) |
| Menu mobilne z klawiatury | ❌ nie działa | ✅ `<button>`+aria+Esc |
| Skip link / landmarki | brak | ✅ skip link, `<header>/<nav>/<main>/<footer>` |
| `meta description` | identyczny wszędzie | unikalny / 50 stron |
| Open Graph / og:image | brak | ✅ na wszystkich |
| JSON-LD / canonical | brak | ✅ NGO + canonical / 50 stron |
| `meta generator` | `VuePress 1.9.10` | usunięty |
| Nagłówki bezpieczeństwa | tylko HSTS | CSP + 5 kolejnych |
| `font-display` | brak (FOIT) | `swap` |
| Formaty fontów | woff+ttf+eot+svg | woff (woff2 ⏭️) |
| Obrazy z treści | eager | `loading=lazy` |
| Martwe linki wewn. | 1 (`/en/model/`) | 0 |
| Otwarte PR-y (obce) | 2 (#182, #184) | 0 (zmergowany / zamknięty) |
| Lighthouse / axe | nie mierzone | **nadal nie mierzone** (brak narzędzi — do sesji z Lighthouse CI) |

### Odłożone świadomie (z powodem)
- **P06** (Netlify Identity site-wide) — **świadomie zostaje**: panel CMS pozostaje (Decap, #198), a widget Identity jest potrzebny do logowania. Ewentualna optymalizacja (ładowanie widgetu tylko gdy potrzebny) bez usuwania panelu — opcjonalny follow-up.
- **R02** (147 MB PDF w `wiedza/`) — wymaga kompresji PDF (narzędzia) lub decyzji o hostowaniu poza repo. Największa pozostała pozycja wagowa.
- **woff2 + subsetting polskich diakrytyków** — lokalny npm cache w złym stanie blokuje instalację enkodera (`ttf2woff2`/`woff2_compress`/fonttools niedostępne). Łatwy follow-up.
- **srcset / WebP** dla plakatów i okładek — wymaga generowania wariantów; miniatury `*-small.jpg` już istnieją do podłączenia.
- **hreflang** (S04) — wymaga kompletnej mapy URL PL↔EN i tłumaczeń → sesje 3/4.
- **Centralizacja tokenów + usunięcie nieużywanych zmiennych** (`variables.styl`) — kolizja z #187; po jego merge.
- **R10** (`.DS_Store`), **CodeQL fail** (istnieje branch `fix/codeql`), **P03** (prefetch), **U01** (skalowanie fontu) — drobne/P2–P3, nie ruszone. *(R08 — zrobione w #198.)*

---

*Sesja 1 (audyt) nie zmieniła kodu. Sesja 2 zrealizowała powyższe w PR-ach #186–#194 (+ #195 docs), a następnie: #190 (nagłówki, wspiera panel), **#198 (aktualizacja panelu CMS → Decap 3.15.1 + R08)**, #197 (opcjonalne usunięcie panelu — otwarte, parked). Zamknięto #184, zmergowano #182.*
