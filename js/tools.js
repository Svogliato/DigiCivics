/**
 * tools.js - Logica per Password Checker e Glossario
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Password Analyzer ---
    const pwdInput = document.getElementById('pwd-input');
    const pwdFill = document.getElementById('pwd-fill');
    const pwdFeedback = document.getElementById('pwd-feedback');
    const toggleBtn = document.getElementById('toggle-pwd');
    
    const reqLength = document.getElementById('req-length');
    const reqUpper = document.getElementById('req-upper');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');

    // Mostra/Nascondi Password
    if (toggleBtn && pwdInput) {
        toggleBtn.addEventListener('click', () => {
            const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
            pwdInput.setAttribute('type', type);
            toggleBtn.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
        });
    }

    if (pwdInput) {
        pwdInput.addEventListener('input', (e) => {
            const val = e.target.value;
            let score = 0;

            const hasUpper = /[A-Z]/.test(val);
            const hasNumber = /[0-9]/.test(val);
            const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(val);
            const isLong = val.length >= 8;

            updateReq(reqLength, isLong);
            updateReq(reqUpper, hasUpper);
            updateReq(reqNumber, hasNumber);
            updateReq(reqSpecial, hasSpecial);

            if (isLong) score++;
            if (hasUpper) score++;
            if (hasNumber) score++;
            if (hasSpecial) score++;
            if (val.length >= 12) score++; 
            if (val.length >= 16) score++;

            // Calcolo UI
            let percentage = (score / 6) * 100;
            pwdFill.style.width = `${percentage}%`;

            if (val.length === 0) {
                pwdFill.style.background = 'transparent';
                pwdFeedback.textContent = 'Inizia a digitare...';
                pwdFeedback.style.color = 'var(--text-muted)';
            } else if (score <= 2) {
                pwdFill.style.background = 'var(--danger)';
                pwdFeedback.textContent = 'Molto Debole. Crackabile in pochi secondi.';
                pwdFeedback.style.color = 'var(--danger)';
            } else if (score <= 4) {
                pwdFill.style.background = 'var(--warning)';
                pwdFeedback.textContent = 'Media. Crackabile in qualche ora.';
                pwdFeedback.style.color = 'var(--warning)';
            } else {
                pwdFill.style.background = 'var(--success)';
                pwdFeedback.textContent = 'Forte. Richiederebbe secoli per il brute-force.';
                pwdFeedback.style.color = 'var(--success)';
            }
        });
    }

    function updateReq(el, isValid) {
        const icon = el.querySelector('i');
        if (isValid) {
            icon.className = 'fa-solid fa-circle-check';
            icon.style.color = 'var(--success)';
            el.style.color = 'var(--text-main)';
        } else {
            icon.className = 'fa-solid fa-circle-xmark';
            icon.style.color = 'var(--danger)';
            el.style.color = 'var(--text-muted)';
        }
    }


    // --- 2. Glossario Live Search ---
    const glossaryData = [
        { term: "Cyberbullismo", def: "Atti di bullismo e molestie perpetrati tramite dispositivi elettronici." },
        { term: "Phishing", def: "Truffa online per rubare dati personali (es. password) fingendosi un ente affidabile." },
        { term: "Doxing", def: "Raccolta e pubblicazione online di dati privati di una persona senza il suo consenso." },
        { term: "Flaming", def: "Aggressione verbale violenta in contesti pubblici online (forum, commenti)." },
        { term: "Body Shaming", def: "Derisione o umiliazione di una persona per il suo aspetto fisico sui social." },
        { term: "Grooming", def: "Adescamento di minori in rete da parte di adulti tramite tecniche manipolatorie." },
        { term: "Clickbait", def: "Titoli sensazionalistici creati solo per attirare click, spesso contenenti fake news." }
    ];

    const searchBar = document.getElementById('glossary-search');
    const glossaryList = document.getElementById('glossary-list');

    if (glossaryList && searchBar) {
        renderGlossary(glossaryData);

        searchBar.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filteredData = glossaryData.filter(item => 
                item.term.toLowerCase().includes(query) || 
                item.def.toLowerCase().includes(query)
            );
            renderGlossary(filteredData, query);
        });
    }

    function renderGlossary(data, query = '') {
        glossaryList.innerHTML = '';

        if (data.length === 0) {
            glossaryList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Nessun risultato trovato.</p>';
            return;
        }

        data.forEach(item => {
            const div = document.createElement('div');
            div.style.background = 'var(--bg-main)';
            div.style.padding = '1.5rem';
            div.style.borderRadius = 'var(--radius-md)';
            div.style.marginBottom = '1rem';
            div.style.border = '1px solid rgba(148, 163, 184, 0.1)';

            let termHtml = item.term;
            let defHtml = item.def;

            if (query) {
                const regex = new RegExp(`(${query})`, 'gi');
                const highlightStyle = 'background: rgba(245, 158, 11, 0.3); color: inherit; padding: 0 2px; border-radius: 2px;';
                termHtml = item.term.replace(regex, `<span style="${highlightStyle}">$1</span>`);
                defHtml = item.def.replace(regex, `<span style="${highlightStyle}">$1</span>`);
            }

            div.innerHTML = `
                <h4 style="color: var(--primary); margin-bottom: 0.5rem; font-size: 1.1rem;">${termHtml}</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5;">${defHtml}</p>
            `;
            glossaryList.appendChild(div);
        });
    }

    // --- 3. Phishing URL Scanner ---
    const urlInput = document.getElementById('url-input');
    const urlScanBtn = document.getElementById('url-scan-btn');
    const urlFeedback = document.getElementById('url-feedback');
    const urlResults = document.getElementById('url-results');

    if (urlScanBtn && urlInput) {
        urlScanBtn.addEventListener('click', analyzeUrl);
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') analyzeUrl();
        });
    }

    function analyzeUrl() {
        const rawUrl = urlInput.value.trim();
        if (!rawUrl) return;

        urlResults.innerHTML = '';
        let url;
        let riskScore = 0; // Più alto = più rischioso
        const findings = [];

        try {
            // Aggiungi un protocollo fittizio se manca, per far funzionare URL()
            const urlString = rawUrl.startsWith('http') ? rawUrl : 'http://' + rawUrl;
            url = new URL(urlString);
        } catch (e) {
            urlFeedback.textContent = "URL non valido.";
            urlFeedback.style.color = 'var(--danger)';
            return;
        }

        // Analisi Protocollo HTTP vs HTTPS
        if (url.protocol === 'http:') {
            riskScore += 40;
            findings.push({ icon: 'fa-lock-open', color: 'var(--danger)', text: 'Connessione HTTP non sicura (i dati viaggiano in chiaro).' });
        } else if (url.protocol === 'https:') {
            findings.push({ icon: 'fa-lock', color: 'var(--success)', text: 'Connessione HTTPS sicura (dati cifrati).' });
        }

        // Analisi Dominio IP vs Testo
        const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(url.hostname);
        if (isIp) {
            riskScore += 50;
            findings.push({ icon: 'fa-server', color: 'var(--danger)', text: 'Il dominio è un indirizzo IP, tecnica comune per nascondere identità.' });
        }

        // Analisi lunghezza e trattini (comuni nel typosquatting)
        const hostname = url.hostname;
        if (hostname.split('-').length > 2) {
            riskScore += 20;
            findings.push({ icon: 'fa-minus', color: 'var(--warning)', text: 'Troppi trattini nel dominio, spesso usato per ingannare (es. paypal-login-secure).' });
        }

        if (hostname.length > 30 && !isIp) {
            riskScore += 15;
            findings.push({ icon: 'fa-text-width', color: 'var(--warning)', text: 'Dominio insolitamente lungo.' });
        }

        // Controllo Typosquatting base (caratteri omoglifi o sostituzioni banali)
        if (/[0-9]/.test(hostname) && !isIp) {
            // Se contiene numeri in mezzo a lettere, potrebbe essere es. faceb00k
            riskScore += 20;
            findings.push({ icon: 'fa-eye-low-vision', color: 'var(--warning)', text: 'Contiene numeri: verifica che non sia un "Typosquatting" (es. faceb00k o rnicrosoft).' });
        }

        // URL Shorteners
        const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'is.gd'];
        if (shorteners.some(s => hostname.includes(s))) {
            riskScore += 30;
            findings.push({ icon: 'fa-compress', color: 'var(--warning)', text: 'È un URL abbreviato. Impossibile sapere dove porta realmente.' });
        }

        // Rendering Feedback Globale
        if (riskScore >= 50) {
            urlFeedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Rischio Alto! Potenziale Phishing.';
            urlFeedback.style.color = 'var(--danger)';
        } else if (riskScore > 0) {
            urlFeedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Sospetto. Fai attenzione.';
            urlFeedback.style.color = 'var(--warning)';
        } else {
            urlFeedback.innerHTML = '<i class="fa-solid fa-shield-check"></i> Sembra legittimo, ma resta vigile.';
            urlFeedback.style.color = 'var(--success)';
            findings.push({ icon: 'fa-check', color: 'var(--success)', text: 'Nessuna anomalia evidente trovata.' });
        }

        // Rendering Dettagli
        findings.forEach(f => {
            const div = document.createElement('div');
            div.style.background = 'var(--bg-surface-alt)';
            div.style.padding = '0.8rem 1rem';
            div.style.borderRadius = 'var(--radius-sm)';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.gap = '0.8rem';
            div.style.fontSize = '0.9rem';

            div.innerHTML = `
                <i class="fa-solid ${f.icon}" style="color: ${f.color}; font-size: 1.1rem; width: 20px; text-align: center;"></i>
                <span style="color: var(--text-main);">${f.text}</span>
            `;
            urlResults.appendChild(div);
        });
    }
});
