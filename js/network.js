/**
 * network.js - Social Network Virality Simulator
 * Algoritmo basato su grafi per simulare il contagio di fake news.
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('network-overlay');
    const gameover = document.getElementById('network-gameover');
    const victory = document.getElementById('network-victory');
    const startBtn = document.getElementById('start-network');
    const restartFailBtn = document.getElementById('restart-network-fail');
    const restartWinBtn = document.getElementById('restart-network-win');
    const scoreDisplay = document.getElementById('network-score');

    let animationId;
    let isRunning = false;
    let nodes = [];
    const numNodes = 60; // Nodi aumentati per maggiore difficoltà
    const connectionDistance = 80; 
    const infectionProbability = 0.015; // Contagio più rapido

    const colors = {
        healthy: '#10b981',
        infected: '#ef4444',
        blocked: '#64748b',
        edge: 'rgba(148, 163, 184, 0.2)',
        edgeInfected: 'rgba(239, 68, 68, 0.5)'
    };

    class Node {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 1.5; // Velocità aumentata
            this.vy = (Math.random() - 0.5) * 1.5; // Velocità aumentata
            this.radius = 8 + Math.random() * 4; // Nodi leggermente più piccoli
            this.state = 'healthy'; 
            this.neighbors = [];
        }

        update(width, height) {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < this.radius || this.x > width - this.radius) this.vx *= -1;
            if (this.y < this.radius || this.y > height - this.radius) this.vy *= -1;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = colors[this.state];
            ctx.fill();
            
            if (this.state === 'infected') {
                ctx.shadowBlur = 15;
                ctx.shadowColor = colors.infected;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        }
    }

    function initNetwork() {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;

        nodes = [];
        for (let i = 0; i < numNodes; i++) {
            nodes.push(new Node(
                Math.random() * (canvas.width - 20) + 10,
                Math.random() * (canvas.height - 20) + 10
            ));
        }

        nodes[Math.floor(Math.random() * numNodes)].state = 'infected';
        updateScore();
    }

    function drawNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < nodes.length; i++) {
            nodes[i].update(canvas.width, canvas.height);
            nodes[i].neighbors = [];
        }

        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    nodes[i].neighbors.push(nodes[j]);
                    nodes[j].neighbors.push(nodes[i]);

                    let edgeColor = colors.edge;
                    if (nodes[i].state === 'infected' && nodes[j].state === 'infected') {
                        edgeColor = colors.edgeInfected;
                    } else if (
                        (nodes[i].state === 'infected' && nodes[j].state === 'healthy') ||
                        (nodes[j].state === 'infected' && nodes[i].state === 'healthy')
                    ) {
                        edgeColor = colors.edgeInfected;
                        if (Math.random() < infectionProbability) {
                            if (nodes[i].state === 'healthy') nodes[i].state = 'infected';
                            if (nodes[j].state === 'healthy') nodes[j].state = 'infected';
                        }
                    }

                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = edgeColor;
                    ctx.stroke();
                }
            }
        }

        for (let node of nodes) {
            node.draw(ctx);
        }

        updateScore();
        checkGameEnd();

        if (isRunning) {
            animationId = requestAnimationFrame(drawNetwork);
        }
    }

    function updateScore() {
        let infectedCount = nodes.filter(n => n.state === 'infected').length;
        let percentage = Math.round((infectedCount / numNodes) * 100);
        scoreDisplay.innerText = `Infezione: ${percentage}%`;
        
        if (percentage > 50) {
            scoreDisplay.style.color = 'var(--danger)';
        } else if (percentage > 20) {
            scoreDisplay.style.color = 'var(--warning)';
        } else {
            scoreDisplay.style.color = 'var(--text-main)';
        }
        return percentage;
    }

    function checkGameEnd() {
        let infectedCount = nodes.filter(n => n.state === 'infected').length;
        let percentage = Math.round((infectedCount / numNodes) * 100);

        if (percentage >= 70) {
            isRunning = false;
            gameover.style.display = 'flex';
        } else if (infectedCount === 0) {
            isRunning = false;
            victory.style.display = 'flex';
        }
    }

    canvas.addEventListener('mousedown', (e) => {
        if (!isRunning) return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        for (let node of nodes) {
            if (node.state === 'infected') {
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Hitbox ridotta per richiedere maggiore precisione
                if (dist <= node.radius + 15) {
                    node.state = 'blocked';
                    break;
                }
            }
        }
    });

    window.addEventListener('resize', () => {
        if (canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
    });

    function startGame() {
        overlay.style.display = 'none';
        gameover.style.display = 'none';
        victory.style.display = 'none';
        initNetwork();
        isRunning = true;
        drawNetwork();
    }

    if (startBtn) startBtn.addEventListener('click', startGame);
    if (restartFailBtn) restartFailBtn.addEventListener('click', startGame);
    if (restartWinBtn) restartWinBtn.addEventListener('click', startGame);

    initNetwork();
    drawNetwork();
});