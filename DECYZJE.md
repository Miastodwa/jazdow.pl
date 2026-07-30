# DECYZJE

Dziennik decyzji projektowych dla jazdow.pl.

---

## 2026-07-30 — Sesja 1: Audyt (bez zmian w kodzie)

**Cel:** pełny audit strony i repozytorium; wynik = [`AUDIT.md`](AUDIT.md). Nie zmieniono żadnej linii kodu produkcyjnego.

**Co ustalono (najważniejsze):**
- **Waga zasobów = ~385 MB**, z czego ~145 MB to **martwe fonty** (format SVG 8–11 MB/plik + nieużywane rodziny SF/M1/M2/P/SS/HK) i 147 MB to **4 PDF-y** (jeden 96 MB). Wszystko trafia do `dist/` i na produkcję.
- **P0 dostępności:** ikony social jako litery dla czytnika ekranu (A01), menu mobilne bez obsługi klawiatury (A03), kontrast zieleni `#6ba568` na bieli ≈2.9:1 < AA (A02).
- **SEO:** brak Open Graph/og:image (S02), identyczny `meta description` na wszystkich stronach PL (S01). `sitemap.xml`+`robots.txt` są OK.
- **Netlify Identity** ładowany na każdej stronie dla wszystkich odwiedzających (P06) — niepotrzebnie poza `/admin`.
- **Pokrycie EN ≈ 35%** (17 z ~32 plików); brak m.in. listu otwartego, „jak wspierać", pytań.
- Build OK (~6.3 s, 50 URL, exit 0). Produkcja: wszystkie testowane URL = 200, hosting nadal Netlify, z nagłówków tylko HSTS.

**Blokady zapamiętane na przyszłość:**
1. CMS na `git-gateway`/Netlify Identity — zejście z Netlify odetnie logowanie redaktorów. Dodatkowo `config.yml` ma błędne `repo: Miastodwa/jazdow.pl` (realne: `Jazdow/jazdow.pl`).
2. `--openssl-legacy-provider` (VuePress 1.x / webpack 4, EOL) — ogranicza środowisko Node; 471 podatności tranzytywnych to symptom tego samego.
3. Brak dostępu do Search Console/analityki — brak baseline'u SEO.
4. `gh` CLI niezalogowane — stan PR/issues/alertów tylko z lokalnego git.

**Ograniczenia audytu:** Lighthouse/axe/pa11y **nie instalowane** — ocena a11y/wydajności ręczna; metryki narzędziowe do uzupełnienia.

**Decyzje/rekomendacje otwarte (do potwierdzenia):**
- Utworzyć 13 issues P0/P1 (lista w `AUDIT.md §6`) — **czekają na zgodę**, nie utworzone.
- Gałęzie scalone `dialog` i `claude/xenodochial-nobel-94c8a6` — kandydaci do usunięcia.
- Kierunek strategiczny (osobna decyzja): pozostać na VuePress 1.x vs migracja — waży na blokadach 1–2.

---

## 2026-07-30 — Sesja 2: Szybkie poprawki (P0/P1)

Zrealizowano poprawki niezależne od struktury treści (URL-e, podział stron, tłumaczenia **nietknięte** — sesje 3/4). Efekt: **9 PR-ów (#186–#194)**, każdy z osobnym buildem; wszystkie 9 scala się razem bez konfliktów. Pełny status znalezisk i metryki „przed/po" w [`AUDIT.md §7`](AUDIT.md).

**Zamknięte (✅):** ikony social (SVG+aria), kontrast zieleni 2.9→4.79:1, menu z klawiatury, skip link + landmarki, focus ring, reduced-motion, alt-y, `<h1>` home, martwy link `/en/model/`, unikalne opisy, Open Graph/Twitter, JSON-LD NGO, canonical, ikony/manifest/theme-color, usunięcie `generator`, nagłówki bezpieczeństwa (netlify.toml + `_headers`), `font-display: swap`, usunięcie ~148 MB martwych fontów (149 MB→268 KB), lazy obrazów z treści, tokeny kolorów mapy.

**Rozstrzygnięte PR-y (punkt 8):** `#184` (chore/fonty) **zamknięty** — rozbity na mniejsze, tematyczne PR-y (OG → #189, fonty → #191/#192, lazy → #193); jego `og-meta.js` kolidowałby z #189. `#182` (dependabot js-yaml) **zmergowany** (deploy preview przechodził). Gałąź `dialog` usunięta z origin.

**Decyzje podjęte z użytkownikiem:**
- Praca przez realne PR-y (po `gh auth login`), odgałęzianie od `master`; zmiana KRS na `zmiany-wizualne` zostawiona w stashu (do przywrócenia — patrz niżej).
- Konflikt OG między moim #189 a #184: **#189 zostaje** właścicielem metadanych.
- Fonty: **#184 zamknięty, fonty od zera** w rozdzielonych PR-ach.
- Kontrast: przyciemnienie samej zmiennej `$oj-green-free` do `#477f42` (najjaśniejszy odcień marki spełniający ≥4.5:1) — świadoma, minimalna zmiana wizualna; zieleń mapy celowo pozostaje jaśniejsza (token `$oj-map-green`).

**Odłożone świadomie (z powodem) — do kolejnych sesji:**
- **P06** (Netlify Identity na każdej stronie) — czysta naprawa wymaga dynamicznego ładowania z `Home.vue` (CSP #190 blokuje inline); zależne od merge #187/#189/#190. Zrobić zaraz po nich.
- **R02** (147 MB PDF w `wiedza/`) — kompresja/rehosting; największa pozostała waga.
- **woff2 + subsetting** — lokalny npm cache w złym stanie blokuje enkoder (ttf2woff2/woff2_compress/fonttools). Łatwy follow-up.
- **srcset/WebP** dla plakatów/okładek; **hreflang** (mapa URL PL↔EN → sesje 3/4); **centralizacja tokenów/usunięcie nieużywanych zmiennych** (kolizja z #187, po merge); **R08** (`repo:` w `config.yml`), **R10** (`.DS_Store`), **CodeQL fail** (jest branch `fix/codeql`).

**⚠️ Do zrobienia ręcznie:**
- **Merge PR-ów** #186–#194 (kolejność dowolna — brak konfliktów; sugerowana: a11y i SEO najpierw). **Nagłówki #190 przetestować na deploy preview pod kątem logowania do CMS/Identity** przed mergem.
- **Przywrócić zmianę KRS**: `git checkout zmiany-wizualne && git stash pop` (stash: „KRS link WIP"). Nie było jej w żadnym PR-ze Sesji 2.

### Aktualizacja (2026-07-30, po Sesji 2): decyzja o panelu CMS

Rozważano usunięcie Netlify Identity + CMS (P06 + R08). **Decyzja: panel `/admin` ZOSTAJE** i został zaktualizowany.

- **#198** (`fix/cms-panel-decap`): `netlify-cms@^2.0.0` (zarchiwizowany, nieprzypięty) → **Decap CMS 3.15.1** — utrzymywany następca, zapięty na sztywno + Subresource Integrity (hash `sha384` zweryfikowany lokalnie względem pliku z unpkg). Naprawiony `backend.repo`: `Miastodwa/jazdow.pl` → `Jazdow/jazdow.pl` (**R08 zrobione**). README → Decap CMS. Backend (git-gateway + Netlify Identity) bez zmian.
- **#190** (`chore/security-headers`): chwilowo usunięto z CSP obsługę `/admin` i `identity.netlify.com` (na wcześniejszą prośbę), następnie **cofnięto (revert)** — panel zostaje, więc CSP znów w pełni go wspiera.
- **#197** (`chore/remove-netlify-cms`): usunięcie panelu — **zostaje OTWARTE jako alternatywa**, parked. Wyklucza się z #198; nie mergować dopóki panel jest używany.
- **P06** (Identity site-wide) — **świadomie zostaje**: widget potrzebny do logowania. Opcjonalna optymalizacja (ładowanie tylko gdy potrzebny) bez usuwania panelu — na później.

**⚠️ Test na deploy preview przed mergem #198+#190:** `/admin/` — logowanie (Netlify Identity) + zapis (Decap + git-gateway + editorial workflow).

---

## 2026-07-30 — Sesja 3: Architektura treści i nawigacja (PROPOZYCJA)

**Sesja nie zmieniła żadnego pliku treści, URL-a ani konfiguracji.** Wynik: [`ARCHITEKTURA.md`](ARCHITEKTURA.md) — dokument do akceptacji przed sesją 4.

**⚠️ Brak danych z Google Search Console.** Prosiłem o dostęp na początku sesji, nie otrzymałem. Rekomendacje podziału/scalania stron opierają się wyłącznie na strukturze treści; trzy z nich (`/wspolpraca/`, `/opp/`, kolejność menu) oznaczono w dokumencie jako wymagające weryfikacji danymi.

**Cztery znaleziska ważniejsze niż jakikolwiek podział treści** (opis i dowody w `ARCHITEKTURA.md §0`):
- **A1 🔴** — wszystkie **16 linków do domków na mapie daje 404** (`/3-6/` zamiast `/domki/3-6/`). Mapa jest jedyną drogą do domków, więc cała sekcja (19 stron) jest praktycznie niedostępna. Sesja 1 tego nie wykryła, bo skan obejmował tylko linki markdown, nie pola `link:` we frontmatterze.
- **A2 🔴** — **10 plików jest niewidocznych w CMS**, w tym `dialog.md` (pierwsza pozycja menu) i `wspolpraca.md`. Przyczyna: `filter: {field: generic}` w kolekcji „PL Pages" + pliki poza kolekcjami (`projekty/`, `baza-wiedzy/`).
- **A3** — **9 z 10 angielskich stron domków to kopie polskich bajt w bajt** (nieprzetłumaczone): duplicate content i polski tekst pod angielskim adresem.
- **A4** — nawigacja nie odzwierciedla serwisu: 9 pozycji poza nawigacją globalną, a `pytania`/`historia`/`wspolzarzadzanie` dostępne **wyłącznie** z kafelków strony głównej.

**Główne rekomendacje:**
- Struktura katalogów: **najpierw język, potem typ** (`www/pl/`, `www/en/`) — decydujący argument to możliwość usunięcia `filter: generic`, czyli likwidacja przyczyny A2. Kluczowy fakt: 47/49 plików ma `permalink`, więc **pliki można przenosić bez zmiany URL-i** (wymaga testu pilotażowego).
- Treść: **„zostaw" w 20 z 27 pozycji.** Podział tylko dla `/co-robimy/` (wydzielenie archiwum plakatów — własny cykl życia) i `/wspolpraca/` (organizacja wydarzeń ma własny e-mail i odrębną intencję). Koalicje przeniesione do `/partnerstwo/`. `/pytania/` i `/dialog/` **nie dzielić** — czytane sekwencyjnie.
- Nawigacja: menu dwupoziomowe (5 pozycji + rozwinięcia) wprowadzające do nawigacji globalnej 9 dziś niedostępnych stron; „List otwarty" **z menu do paska aktualności** z regułą wygaszania (max 6 miesięcy, treść zostaje pod adresem).
- URL-e: forma kanoniczna **ze slashem** (tak już działa produkcja). **Zero zmian istniejących adresów** — tabela to 2 nowe adresy, 16 napraw martwych linków i potwierdzenie reszty. Stopka: 6 linków bez slasha generuje zbędne 301.
- Strona **404 nie ma nawigacji** (potwierdzone na buildzie) — ślepy zaułek.

**Do decyzji użytkownika** (`ARCHITEKTURA.md §7`): 7 domków bez stron (dopisać czy odlinkować), angielskie domki (przetłumaczyć czy przekierować), archiwum plakatów (4 opcje), menu dwupoziomowe czy płaskie, czy w ogóle robić restrukturyzację katalogów.

**Proponowana kolejność wdrożenia w sesji 4** (§8): najpierw A1 i A2 — znikome ryzyko, największa wartość; restrukturyzacja katalogów jako ostatnia, po teście pilotażowym.
