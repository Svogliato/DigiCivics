# DigiCivics | Progetto TDP ed Educazione Civica

**DigiCivics** è una piattaforma interattiva sviluppata per promuovere la Cittadinanza Digitale consapevole, contrastare il Cyberbullismo e fornire strumenti concreti per la tutela della Privacy online.

Questo progetto è stato realizzato con l'obiettivo di coniugare le competenze tecniche richieste in **Tecnologie e Progettazione (TDP)** con il valore sociale di **Educazione Civica**.

---

## 🎯 Obiettivi del Progetto

1. **Sensibilizzazione:** Spiegare le dinamiche del Cyberbullismo (Flaming, Doxing, Impersonation) e gli strumenti legali a disposizione (Legge 71/2017).
2. **Prevenzione Attiva:** Fornire un "Simulatore di Scenari" (chat interattiva) in cui le scelte dell'utente determinano l'esito della storia, permettendo di immedesimarsi nelle dinamiche del "bystander effect" (spettatore passivo).
3. **Strumenti Pratici:** Messa a disposizione di tool crittografici e di analisi per valutare la sicurezza della propria impronta digitale.

---

## ⚙️ Tecnologie Utilizzate

Il progetto è rigorosamente "Client-Side", realizzato senza l'uso di framework esterni pesanti per dimostrare la padronanza dei linguaggi fondamentali del Web:

- **HTML5:** Struttura semantica e accessibile (Bento Grid, Semantic Tags).
- **CSS3 (Vanilla):** Variabili CSS (Custom Properties) per la gestione del Tema Chiaro/Scuro (`data-theme`), Flexbox, CSS Grid, e Media Queries per il Responsive Web Design. Animazioni hardware-accelerated (`@keyframes`, `transition`).
- **JavaScript (ES6+):** Logica interattiva, manipolazione del DOM in tempo reale, Canvas API, espressioni regolari (Regex) e gestione dello stato (LocalStorage per i temi).

---

## 🧠 Algoritmi Implementati (Valore Tecnico - TDP)

Per soddisfare il requisito di "codice non banale", il sito integra i seguenti algoritmi:

### 1. Simulatore di Contagio Virale (Teoria dei Grafi)
- **File:** `js/network.js`
- **Descrizione:** Un algoritmo basato su Grafi renderizzato tramite `<canvas>`. L'algoritmo genera casualmente nodi (utenti) e calcola in tempo reale le **distanze euclidee** tra di essi. Se due nodi sono sufficientemente vicini, si forma un arco (connessione). La propagazione dell'infezione (fake news/bullismo) viene calcolata tramite un sistema di probabilità frame-per-frame.
- **Interattività:** Rilevamento delle collisioni 2D (Hitbox) per permettere all'utente di cliccare sui nodi e "bannarli", arrestando il contagio.

### 2. Scanner di URL Sospetti (Anti-Phishing)
- **File:** `js/tools.js`
- **Descrizione:** Un parser basato sull'oggetto `URL` di JavaScript e sulle Regex. L'algoritmo calcola un **"Risk Score"** analizzando:
  - Protocolli insicuri (HTTP vs HTTPS).
  - Presenza di indirizzi IP nascosti al posto dei domini (es. Typosquatting).
  - Utilizzo di Shorteners (es. bit.ly).
  - Lunghezza e pattern anomali del dominio.

### 3. Calcolatore di Entropia Password
- **File:** `js/tools.js`
- **Descrizione:** L'algoritmo valuta la robustezza crittografica di una password analizzando la presenza contemporanea di set di caratteri diversi, fornendo feedback in tempo reale tramite una Progress Bar reattiva.

### 4. Albero Decisionale per Chat Simulatore
- **File:** `js/simulator.js`
- **Descrizione:** Un motore narrativo basato su **nodi grafo-strutturati**. Le decisioni dell'utente navigano l'oggetto JavaScript in tempo reale caricando ritardi asincroni (`setTimeout`) per simulare la digitazione umana e generare finali differenti (Positivo, Neutro, Negativo).

---

## 🚀 Come avviare il progetto

Trattandosi di un'applicazione client-side pura, non è necessario alcun server backend (Node.js, PHP, ecc.). 

1. Clona il repository o estrai i file.
2. Apri il file `index.html` all'interno di un qualsiasi browser web moderno (Chrome, Firefox, Safari, Edge).
3. Per un'esperienza ottimale durante lo sviluppo, si consiglia di usare l'estensione **Live Server** di VS Code.

---

*Progetto sviluppato per l'eccellenza in TDP ed Educazione Civica.*