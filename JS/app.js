let eventos = [
    {
        id: 1,
        titulo: "Aulas avançadas de C#",
        tipo: "Curso",
        data: "2027-02-15",
        horario: "Das 09:30 as 15:15",
        local: "Laboratorio de Braile",
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", 
        status: "Agendado"
    },
    {
        id: 2,
        titulo: "Palestra sobre o Setembro Amarelo",
        tipo: "Palestra",
        data: "2026-09-18",
        horario: "Das 09:30 as 13:00",
        local: "Auditorio",
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", 
        status: "Realizado"
    },
    {
        id: 3,
        titulo: "Aulas praticas de rede de computadores",
        tipo: "Curso",
        data: "2027-03-20",
        horario: "Das 14:00 as 18:00",
        local: "Laboratorio 3",
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", 
        status: "Agendado"
    },
    {
        id: 4,
        titulo: "Palestra sobre o Outubro Rosa",
        tipo: "Palestra", 
        data: "2026-10-20",
        horario: "Das 09:30 as 13:00",
        local: "Auditorio",
        descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", 
        status: "Agendado"     
    }
];

let filtroTexto = "";
let filtroStatus = "Todos";

document.addEventListener("DOMContentLoaded", () => {
    const linksMenu = document.querySelectorAll("[data-view]");

    linksMenu.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            linksMenu.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            const vista = link.dataset.view;
            renderizarVista(vista);
        });
    });

    renderizarVista("dashboard");
});

function renderizarVista(vista) {
    const app = document.getElementById("app");

    if (vista === "dashboard") {
        renderizarDashboard(app);
    } else if (vista === "novo") {
        renderizarNovoFormulario(app);
    } else if (vista === "eventos") {
        renderizarTelaEventos(app);
    }
}

function renderizarDashboard(container) {
    const total = eventos.length;
    const agendados = eventos.filter(e => e.status === "Agendado").length;
    const realizados = eventos.filter(e => e.status === "Realizado").length;

    container.innerHTML = `
        <h2>Dashboard</h2>
        <div class="row g-4">
            <div class="col-md-4">
                <div class="card text-white bg-primary shadow-sm h-100">
                    <div class="card-body text-center">
                        <h3 class="h5 card-title">Total de Eventos</h3>
                        <p class="display-4 fw-bold mb-0">${total}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card text-dark bg-warning shadow-sm h-100">
                    <div class="card-body text-center">
                        <h3 class="h5 card-title">Eventos Agendados</h3> 
                        <p class="display-4 fw-bold mb-0">${agendados}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card text-white bg-success shadow-sm h-100">
                    <div class="card-body text-center">
                        <h3 class="h5 card-title">Eventos Realizados</h3>
                        <p class="display-4 fw-bold mb-0">${realizados}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderizarNovoFormulario(app) {
    app.innerHTML = `
        <h2>Novo Evento</h2>
        <form id="novo-evento-form">
            <div class="mb-3">
                <label class="form-label">Título</label>
                <input name="titulo" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Tipo</label>
                <select name="tipo" class="form-select" required>
                    <option value="">Selecione o tipo</option>
                    <option value="Palestra">Palestra</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Conferência">Conferência</option>
                    <option value="Curso">Curso</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Data</label>
                <input type="date" name="data" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Horário</label>
                <input type="time" name="horario" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Local</label>
                <input name="local" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Descrição</label>
                <textarea name="descricao" class="form-control" rows="3" required></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Status</label>
                <select name="status" class="form-select" required>
                    <option value="">Selecione o status</option>
                    <option value="Agendado">Agendado</option>
                    <option value="Realizado">Realizado</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Salvar Evento</button>
        </form>
    `;

    app.querySelector("#novo-evento-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const dadosFormulario = Object.fromEntries(new FormData(e.target));

        const novoEvento = {
            id: eventos.length > 0 ? Math.max(...eventos.map(ev => ev.id)) + 1 : 1,
            ...dadosFormulario
        };

        eventos.push(novoEvento);
        alert("Evento salvo com sucesso!");
        renderizarVista("dashboard");
    });
}

function renderizarTelaEventos(container) {
    container.innerHTML = `
        <h2>Listagem de Eventos</h2>
        <div class="row g-3 my-3">
            <div class="col-md-8">
                <input type="text" id="inputPesquisa" class="form-control" placeholder="Pesquisar por título..." value="${filtroTexto}">
            </div>
            <div class="col-md-4">
                <select id="selectStatus" class="form-select">
                    <option value="Todos" ${filtroStatus === "Todos" ? "selected" : ""}>Todos os Status</option>
                    <option value="Agendado" ${filtroStatus === "Agendado" ? "selected" : ""}>Agendado</option>
                    <option value="Realizado" ${filtroStatus === "Realizado" ? "selected" : ""}>Realizado</option>
                </select>
            </div>
        </div>
        <div id="listaEventosContainer" class="row g-3"></div>
    `;

    const listaContainer = container.querySelector("#listaEventosContainer");

    container.querySelector("#inputPesquisa").addEventListener("input", (e) => {
        filtroTexto = e.target.value;
        atualizarListaCards(listaContainer);
    });

    container.querySelector("#selectStatus").addEventListener("change", (e) => {
        filtroStatus = e.target.value;
        atualizarListaCards(listaContainer);
    });

    atualizarListaCards(listaContainer);
}

function atualizarListaCards(container) {
    const eventosFiltrados = eventos.filter(ev => {
        const atendeTexto = ev.titulo.toLowerCase().includes(filtroTexto.toLowerCase());
        const atendeStatus = filtroStatus === "Todos" || ev.status === filtroStatus;
        return atendeTexto && atendeStatus;
    });

    if (eventosFiltrados.length === 0) {
        container.innerHTML = `<div class="col-12"><div class="alert alert-info">Nenhum evento encontrado.</div></div>`;
        return;
    }

    container.innerHTML = eventosFiltrados.map(ev => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-primary fw-bold">${ev.titulo}</h5>
                    <div class="mb-2">
                        <span class="badge bg-secondary me-1">${ev.tipo}</span>
                        <span class="badge ${ev.status === 'Agendado' ? 'bg-warning text-dark' : 'bg-success'}">${ev.status}</span>
                    </div>
                    <p class="card-text text-muted mb-1 small">📅 ${ev.data} ${ev.horario ? '| ⏰ ' + ev.horario : ''}</p>
                    <p class="card-text text-muted mb-2 small">📍 ${ev.local}</p>
                    <p class="card-text flex-grow-1">${ev.descricao}</p>
                    <div class="mt-3 d-flex gap-2">
                        <button class="btn btn-sm btn-outline-success flex-grow-1" 
                                onclick="marcarComoRealizado(${ev.id})" 
                                ${ev.status === 'Realizado' ? 'disabled' : ''}>
                            ${ev.status === 'Realizado' ? 'Realizado' : 'Marcar como Realizado'}
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="excluirEvento(${ev.id})">Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

function marcarComoRealizado(id) {
    const evento = eventos.find(ev => ev.id === id);
    if (evento) {
        evento.status = "Realizado";
        renderizarVista("eventos");
    }
}

function excluirEvento(id) {
    if (confirm("Deseja realmente remover este evento?")) {
        eventos = eventos.filter(ev => ev.id !== id);
        renderizarVista("eventos");
    }
}
        