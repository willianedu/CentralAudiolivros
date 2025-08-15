
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- TYPE DEFINITIONS ---
interface Platform {
    name: string;
    url: string;
}

interface Audiobook {
    id: number;
    title: string;
    author: string;
    narrator: string;
    cover: string;
    epilogue: string;
    publisher: string;
    studio: string;
    features: string[];
    platforms: Platform[];
}

// --- BANCO DE DADOS DE EXEMPLO ---
const audiobooks: Audiobook[] = [
    {
        id: 1,
        title: "Crônicas de Nébula",
        author: "Elara Vance",
        narrator: "Orion Ramos",
        cover: "https://placehold.co/400x600/1E293B/FFFFFF?text=Crônicas+de+Nébula",
        epilogue: "Em um futuro onde a humanidade colonizou as estrelas, a jovem piloto Kaelen descobre um segredo ancestral que pode destruir o frágil equilíbrio do universo. Uma jornada intergaláctica sobre poder, traição e esperança.",
        publisher: "Edições Cosmos",
        studio: "Voz Estelar",
        features: ["Trilha Sonora Orquestrada", "Efeitos Sonoros de Batalhas Espaciais"],
        platforms: [
            { name: "Audible", url: "#" },
            { name: "Storytel", url: "#" },
        ]
    },
    {
        id: 2,
        title: "O Último Guardião de Aethel",
        author: "Kaelan Blackwood",
        narrator: "Lira Silvestre",
        cover: "https://placehold.co/400x600/1E293B/FFFFFF?text=O+Último+Guardião",
        epilogue: "No reino mágico de Aethel, a antiga ordem dos guardiões foi dizimada. Apenas a jovem Elara, com seus poderes recém-descobertos, pode enfrentar as sombras que ameaçam consumir o mundo. Uma aventura fantástica cheia de magia e criaturas míticas.",
        publisher: "Editora Grifo Dourado",
        studio: "Estúdio Épico",
        features: ["Vozes de Criaturas Modificadas", "Ambientação Sonora de Florestas Mágicas"],
        platforms: [
            { name: "Google Play Livros", url: "#" },
            { name: "Audible", url: "#" },
        ]
    },
    {
        id: 3,
        title: "A Sombra em Espiral",
        author: "Julien Moreau",
        narrator: "Helena Vargas",
        cover: "https://placehold.co/400x600/1E293B/FFFFFF?text=A+Sombra+em+Espiral",
        epilogue: "O detetive Alex Moreau é assombrado por um caso não resolvido que destruiu sua carreira. Quando um novo crime com a mesma assinatura macabra acontece, ele precisa mergulhar novamente em um labirinto de segredos e mentiras para encontrar o assassino.",
        publisher: "L&PM Editores",
        studio: "Som Sombrio",
        features: [],
        platforms: [
            { name: "Storytel", url: "#" },
            { name: "Ubook", url: "#" },
        ]
    },
    {
        id: 4,
        title: "Os Ecos de Zerzura",
        author: "Anya Sharma",
        narrator: "Dante Valério",
        cover: "https://placehold.co/400x600/1E293B/FFFFFF?text=Ecos+de+Zerzura",
        epilogue: "A arqueóloga Dr. Alani Sharma descobre um mapa que pode levar à cidade perdida de Zerzura. O que começa como uma expedição científica se torna uma corrida perigosa contra uma organização secreta que deseja o poder da cidade para si.",
        publisher: "Editora Aventura",
        studio: "Trilhas do Deserto",
        features: ["Efeitos de Eco Realistas", "Sons da Natureza"],
        platforms: [
            { name: "Audible", url: "#" },
        ]
    },
    {
        id: 5,
        title: "Cidade de Silício",
        author: "Ren Fukuda",
        narrator: "Maya Alencar",
        cover: "https://placehold.co/400x600/1E293B/FFFFFF?text=Cidade+de+Silício",
        epilogue: "Na megalópole de Neo-Kyoto, controlada por uma inteligência artificial onipotente, uma jovem hacker descobre uma falha no sistema que pode libertar a humanidade ou condená-la ao caos. Uma distopia cyberpunk sobre liberdade e tecnologia.",
        publisher: "Editora Futura",
        studio: "Voz Digital",
        features: ["Vozes Sintetizadas para IA", "Paisagens Sonoras Cyberpunk"],
        platforms: [
            { name: "Storytel", url: "#" },
            { name: "Skeelo", url: "#" },
        ]
    }
];

// --- DOM ELEMENT SELECTORS ---
const audiobookGrid = document.getElementById('audiobook-grid') as HTMLElement;
const searchBar = document.getElementById('search-bar') as HTMLInputElement;
const noResultsMessage = document.getElementById('no-results') as HTMLParagraphElement;
const modal = document.getElementById('modal') as HTMLDivElement;
const modalContent = document.getElementById('modal-content') as HTMLDivElement;

// --- FUNÇÃO PARA RENDERIZAR OS CARDS ---
const renderAudiobooks = (items: Audiobook[]) => {
    audiobookGrid.innerHTML = '';
    if (items.length === 0) {
        noResultsMessage.classList.remove('hidden');
    } else {
        noResultsMessage.classList.add('hidden');
        items.forEach(book => {
            const card = document.createElement('div');
            card.className = 'cursor-pointer group card-hover-effect';
            card.innerHTML = `
                <div class="rounded-lg overflow-hidden shadow-lg bg-gray-800">
                    <img src="${book.cover}" alt="Capa de ${book.title}" class="w-full h-auto aspect-[2/3] object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x600/111827/FFFFFF?text=Imagem+N%C3%A3o+Dispon%C3%ADvel';">
                </div>
                <div class="pt-3">
                    <h3 class="font-bold text-md text-gray-100 truncate group-hover:text-orange-500 transition-colors">${book.title}</h3>
                    <p class="text-sm text-gray-400">${book.narrator}</p>
                </div>
            `;
            card.addEventListener('click', () => openModal(book));
            audiobookGrid.appendChild(card);
        });
    }
};

// --- FUNÇÃO PARA ABRIR O MODAL ---
const openModal = (book: Audiobook) => {
    modalContent.innerHTML = `
        <div class="w-full md:w-1/3 flex-shrink-0">
            <img src="${book.cover}" alt="Capa de ${book.title}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x600/111827/FFFFFF?text=Imagem+N%C3%A3o+Dispon%C3%ADvel';">
        </div>
        <div class="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto">
            <div class="flex justify-between items-start">
                <h2 class="text-3xl font-bold text-orange-500 mb-2">${book.title}</h2>
                <button id="close-modal" aria-label="Fechar modal" class="text-gray-400 hover:text-white transition-colors text-3xl leading-none">&times;</button>
            </div>
            <p class="text-lg text-gray-300 mb-4">por ${book.author}</p>
            
            <h4 class="font-bold text-lg mt-6 mb-2 text-gray-100">Sinopse</h4>
            <p class="text-gray-400 text-base leading-relaxed">${book.epilogue}</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <h4 class="font-bold text-lg mb-2 text-gray-100">Ficha Técnica</h4>
                    <ul class="space-y-1 text-gray-400">
                        <li><strong>Narração:</strong> ${book.narrator}</li>
                        <li><strong>Publicadora:</strong> ${book.publisher}</li>
                        <li><strong>Estúdio:</strong> ${book.studio}</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-lg mb-2 text-gray-100">Recursos</h4>
                    ${book.features.length > 0 ? 
                        `<ul class="list-disc list-inside text-gray-400">${book.features.map(f => `<li>${f}</li>`).join('')}</ul>` : 
                        '<p class="text-gray-400">Nenhum recurso especial informado.</p>'
                    }
                </div>
            </div>

            <h4 class="font-bold text-lg mt-6 mb-3 text-gray-100">Onde Ouvir</h4>
            <div class="flex flex-wrap gap-3">
                ${book.platforms.map(p => `<a href="${p.url}" target="_blank" class="bg-orange-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-orange-700 transition-colors">${p.name}</a>`).join('')}
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Impede o scroll da página
    
    // Adiciona o listener para o botão de fechar
    (document.getElementById('close-modal') as HTMLButtonElement).addEventListener('click', closeModal);
    
    // Animação de entrada
    setTimeout(() => {
        modal.classList.add('opacity-100');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
};

// --- FUNÇÃO PARA FECHAR O MODAL ---
const closeModal = () => {
     // Animação de saída
    modal.classList.remove('opacity-100');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Libera o scroll da página
    }, 300);
};

// --- LÓGICA DA BARRA DE BUSCA ---
searchBar.addEventListener('input', (e) => {
    const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
    const filteredAudiobooks = audiobooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.narrator.toLowerCase().includes(searchTerm)
    );
    renderAudiobooks(filteredAudiobooks);
});

// --- EVENT LISTENERS DO MODAL ---
// Fecha o modal se clicar fora do conteúdo
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Fecha o modal com a tecla 'Escape'
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// --- RENDERIZAÇÃO INICIAL ---
renderAudiobooks(audiobooks);
