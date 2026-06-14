"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            menuToggle.querySelector('.menu-icon').classList.toggle('hidden');
            menuToggle.querySelector('.close-icon').classList.toggle('hidden');
            menuToggle.setAttribute('aria-expanded', String(!isOpen));
        });
    }

    // Fetch and Render Data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderHeroStats(data.hero_stats);
            renderMetrics(data.metrics);
            renderInsights(data.insights);
            setupSearch(data.metrics);
        })
        .catch(error => console.error('Error loading performance data:', error));
});

function renderHeroStats(stats) {
    const container = document.getElementById('hero-stats-container');
    if (!container) return;

    container.innerHTML = stats.map(stat => `
        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
                <p class="text-xs text-slate-500 font-medium uppercase tracking-wider">${stat.label}</p>
                <p class="text-2xl font-bold text-slate-900">${stat.value}</p>
            </div>
            <div class="flex items-center gap-1 ${stat.positive ? 'text-green-600' : 'text-red-600'} font-bold text-sm">
                <i data-lucide="${stat.positive ? 'arrow-up-right' : 'arrow-down-right'}" class="w-4 h-4"></i>
                ${stat.trend}
            </div>
        </div>
    `).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderMetrics(metrics) {
    const grid = document.getElementById('data-grid');
    if (!grid) return;

    grid.innerHTML = metrics.map((item, index) => `
        <div class="data-card bg-white p-8 rounded-3xl animate-fade-in" style="animation-delay: ${index * 100}ms">
            <div class="flex justify-between items-start mb-6">
                <div class="icon-wrapper w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <i data-lucide="${item.icon || 'circle'}"></i>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">${item.category}</span>
            </div>
            <h3 class="text-xl font-bold mb-2">${item.title}</h3>
            <p class="text-slate-500 text-sm mb-6 leading-relaxed">${item.description}</p>
            <div class="pt-4 border-t border-slate-50">
                <span class="text-3xl font-black text-primary">${item.value}</span>
            </div>
        </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderInsights(insights) {
    const container = document.getElementById('insights-container');
    if (!container) return;

    container.innerHTML = insights.map(insight => `
        <div class="flex gap-6 group cursor-default">
            <div class="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                <i data-lucide="${insight.icon}" class="w-5 h-5"></i>
            </div>
            <div>
                <h4 class="text-lg font-bold mb-1">${insight.title}</h4>
                <p class="text-slate-400 leading-relaxed">${insight.text}</p>
            </div>
        </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function setupSearch(allMetrics) {
    const searchInput = document.getElementById('data-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allMetrics.filter(m => 
            m.title.toLowerCase().includes(term) || 
            m.description.toLowerCase().includes(term) ||
            m.category.toLowerCase().includes(term)
        );
        renderMetrics(filtered);
    });
}