/**
 * simulator.js - Graph-based interactive story logic
 */
const story = {
    start: {
        botText: "Ale: Oh ragazzi guardate che video mi hanno girato di Marco che scivola in mensa 😂",
        delay: 1500,
        choices: [
            { text: "Ahahahaha giralo subito!", next: "condiviso" },
            { text: "Poverino però, si è fatto male?", next: "empatico" },
            { text: "(Visualizza e ignora)", next: "ignora" }
        ]
    },
    condiviso: {
        botText: "Ale: *Video Allegato*\nFra: Lo metto subito sulle storie con una canzone ridicola ahahah",
        delay: 1200,
        choices: [
            { text: "Metti il tag così lo vede! 🚀", next: "fine_negativa" },
            { text: "Aspetta, se lo metti pubblico è troppo. Non farlo.", next: "ripensamento" }
        ]
    },
    empatico: {
        botText: "Fra: Mamma mia che noia che sei! Si sta solo scherzando.",
        delay: 1000,
        choices: [
            { text: "Scherzare è quando ridono tutti. Questo è bullismo, cancellate il video.", next: "fine_positiva" },
            { text: "Vabbè fate come vi pare.", next: "fine_neutra" }
        ]
    },
    ignora: {
        botText: "Ale: *Video Allegato*\nFra: Sto piangendo! Lo giro nel gruppo della scuola.",
        delay: 1400,
        choices: [
            { text: "Scrivi a Marco in privato per avvisarlo e stagli vicino.", next: "fine_positiva" },
            { text: "(Continui a leggere senza intervenire)", next: "fine_neutra" }
        ]
    },
    ripensamento: {
        botText: "Fra: Fra ormai è online, 100 views in un minuto. Ciao proprio.",
        delay: 1200,
        choices: [
            { text: "Esco dal gruppo. Non voglio averci a che fare.", next: "fine_neutra" },
            { text: "Faccio screenshot delle storie e delle chat e lo dico a un prof.", next: "fine_positiva" }
        ]
    },

    // Endings
    fine_negativa: {
        botText: "🚨 PARTECIPAZIONE ATTIVA\nHai contribuito a diffondere un contenuto umiliante. Condividere o incitare questo comportamento costituisce reato di diffamazione e cyberbullismo.",
        isEnd: true
    },
    fine_neutra: {
        botText: "⚠️ BYSTANDER (SPETTATORE PASSIVO)\nIl tuo silenzio è stato percepito come approvazione. Ignorare il problema permette al bullo di agire sentendosi legittimato dal gruppo.",
        isEnd: true
    },
    fine_positiva: {
        botText: "✅ CITTADINO DIGITALE ATTIVO\nOttima scelta. Non hai assecondato il branco, hai raccolto le prove o hai supportato la vittima. Questo è l'unico modo per spezzare la catena.",
        isEnd: true
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const chatArea = document.getElementById('chat-area');
    const controlsArea = document.getElementById('controls-area');
    const typingIndicator = document.getElementById('typing-indicator');

    function addMessage(text, sender) {
        typingIndicator.style.display = 'none';

        const bubble = document.createElement('div');
        bubble.classList.add('imessage', sender === 'user' ? 'msg-sent' : 'msg-received');
        
        // Coloring for endings
        if (text.includes('🚨')) bubble.style.background = 'var(--danger)';
        else if (text.includes('⚠️')) {
            bubble.style.background = 'var(--warning)';
            bubble.style.color = '#000';
        }
        else if (text.includes('✅')) bubble.style.background = 'var(--success)';
        
        if (text.includes('🚨') || text.includes('✅')) {
            bubble.style.color = 'white';
        }
        if (text.includes('🚨') || text.includes('⚠️') || text.includes('✅')) {
            bubble.style.fontWeight = '600';
            bubble.style.whiteSpace = 'pre-line';
        }

        bubble.innerText = text;
        chatArea.insertBefore(bubble, typingIndicator);
        chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
    }

    function renderChoices(choices) {
        controlsArea.innerHTML = '';
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'imessage-btn';
            btn.innerText = choice.text;
            btn.onclick = () => handleChoice(choice);
            controlsArea.appendChild(btn);
        });
    }

    function handleChoice(choice) {
        controlsArea.innerHTML = '';
        addMessage(choice.text, 'user');
        
        typingIndicator.style.display = 'flex';
        chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });

        setTimeout(() => {
            goToNode(choice.next);
        }, 1200);
    }

    function goToNode(nodeId) {
        const node = story[nodeId];
        if (!node) return;

        addMessage(node.botText, 'bot');

        if (node.isEnd) {
            controlsArea.innerHTML = `
                <button class="imessage-btn" style="background: var(--text-main); border-color: var(--text-main); color: var(--bg-main); text-align: center;" onclick="location.reload()">
                    <i class="fa-solid fa-rotate-right"></i> Rigioca Scenario
                </button>
            `;
        } else {
            setTimeout(() => {
                renderChoices(node.choices);
            }, 500);
        }
    }

    // Start simulation
    typingIndicator.style.display = 'flex';
    setTimeout(() => {
        goToNode('start');
    }, 1800);
});
