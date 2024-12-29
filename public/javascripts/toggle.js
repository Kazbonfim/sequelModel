// Observar os eventos de mudança dos botões de rádio
document.getElementById("btnradio1").addEventListener("change", function () {
    toggleView('cards'); // Salva e alterna para "cards"
});

document.getElementById("btnradio2").addEventListener("change", function () {
    toggleView('table'); // Salva e alterna para "table"
});

// Função para alternar e salvar no localStorage
function toggleView(view) {
    localStorage.setItem('selectedView', view); // Salva a escolha
    updateView(view); // Atualiza a interface
}

// Recuperar a escolha ao carregar a página
window.onload = function () {
    const savedView = localStorage.getItem('selectedView') || 'cards'; // Padrão: "cards"
    updateView(savedView); // Aplica a escolha salva
    updateRadioButton(savedView); // Atualiza o estado dos botões de rádio
};

// Função para aplicar a interface
function updateView(view) {
    if (view === 'cards') {
        document.getElementById("cards").removeAttribute("hidden");
        document.getElementById("planilha").setAttribute("hidden", true);
    } else {
        document.getElementById("cards").setAttribute("hidden", true);
        document.getElementById("planilha").removeAttribute("hidden");
    }
}

// Função para sincronizar o estado dos botões de rádio
function updateRadioButton(view) {
    if (view === 'cards') {
        document.getElementById("btnradio1").checked = true;
    } else {
        document.getElementById("btnradio2").checked = true;
    }
}
