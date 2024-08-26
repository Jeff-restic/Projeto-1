interface Tarefa {
    dia: string;
    horaInicial: string;
    horaFinal: string;
    nome: string;
}

const tarefas: Tarefa[] = [];

// Adiciona um listener para o botão de adicionar tarefa
document.getElementById('adicionar-tarefa')?.addEventListener('click', () => {
    const dia = (document.getElementById('dia') as HTMLSelectElement).value;
    const horaInicial = (document.getElementById('hora-inicial') as HTMLInputElement).value;
    const horaFinal = (document.getElementById('hora-final') as HTMLInputElement).value;
    const nome = (document.getElementById('nome-tarefa') as HTMLInputElement).value;

    // Verifica se todos os campos foram preenchidos
    if (dia && horaInicial && horaFinal && nome) {
        const novaTarefa: Tarefa = { dia, horaInicial, horaFinal, nome };
        tarefas.push(novaTarefa);
        exibirTarefas();
        limparFormulario();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para exibir as tarefas no quadro de horários
function exibirTarefas() {
    const exibicaoAgenda = document.getElementById('exibicao-agenda');
    if (exibicaoAgenda) {
        const dias = [
            'segunda-feira', 'terça-feira', 'quarta-feira', 
            'quinta-feira', 'sexta-feira', 'sábado', 'domingo'
        ];

        exibicaoAgenda.innerHTML = '';
        dias.forEach(dia => {
            // Filtra e ordena as tarefas para o dia atual
            const tarefasDia = tarefas.filter(tarefa => tarefa.dia === dia);
            tarefasDia.sort((a, b) => a.horaInicial.localeCompare(b.horaInicial));

            const coluna = document.createElement('div');
            coluna.className = 'coluna';
            coluna.innerHTML = `<h3>${capitalizarPrimeiraLetra(dia)}</h3>`;
            tarefasDia.forEach(tarefa => {
                const tarefaElemento = document.createElement('div');
                tarefaElemento.className = 'tarefa';
                tarefaElemento.innerHTML = `
                    <span><strong>Horário Inicial:</strong> ${tarefa.horaInicial}</span>
                    <span><strong>Horário Final:</strong> ${tarefa.horaFinal}</span>
                    <span><strong>Tarefa:</strong> ${tarefa.nome}</span>
                `;
                coluna.appendChild(tarefaElemento);
            });

            exibicaoAgenda.appendChild(coluna);
        });
    }
}

// Função para limpar os campos do formulário após a adição da tarefa
function limparFormulario() {
    (document.getElementById('dia') as HTMLSelectElement).value = '';
    (document.getElementById('hora-inicial') as HTMLInputElement).value = '';
    (document.getElementById('hora-final') as HTMLInputElement).value = '';
    (document.getElementById('nome-tarefa') as HTMLInputElement).value = '';
}

// Função para capitalizar a primeira letra de uma string
function capitalizarPrimeiraLetra(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
