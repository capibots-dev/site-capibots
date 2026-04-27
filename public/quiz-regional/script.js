// Variáveis globais
let quizData = null;
let perguntasSorteadas = [];
let respostas = [];
let perguntaAtual = 0;
let pontuacaoTotal = 0;
let participante = {
    nome: "",
    tipoContato: "",
    contato: ""
};

// Configurações do timer
const TEMPO_QUIZ_SEGUNDOS = 150; // 5 minutos (300 segundos) - PARÂMETRO CONFIGURÁVEL
let timerInterval = null;
let tempoRestante = TEMPO_QUIZ_SEGUNDOS;
let timerIniciado = false;

// Dados do quiz embutidos diretamente no JavaScript
const quizDataEmbutido = {
  "configuracao": {
    "titulo": "Quiz do Cerrado - CAPIBOTS",
    "numeroQuestoesFaceis": 3,
    "numeroQuestoesMedias": 3,
    "numeroQuestoesDificeis": 2,
    "brindes": [
      {
        "nome": "Bottom Capibots",
        "imagem": "images/bottom_capibots.jpg",
        "quantidade": 60,
        "notaMinima": 0,
        "notaMaxima": 36
      },
      {
        "nome": "Lápis Ecológico",
        "imagem": "images/lapis_ecologico.jpg",
        "quantidade": 70,
        "notaMinima": 37,
        "notaMaxima": 67
      },
      {
        "nome": "Chaveiro de Capivara",
        "imagem": "images/chaveiro_capivara.jpg",
        "quantidade": 100,
        "notaMinima": 68,
        "notaMaxima": 86
      },
      {
        "nome": "Robô Capibots",
        "imagem": "images/robo_capibots.png",
        "quantidade": 70,
        "notaMinima": 87,
        "notaMaxima": 100
      }
    ]
  },
  "perguntas": [
    // Questões Fáceis
    {
      "id": 1,
      "pergunta": "Qual destes animais é típico do Cerrado?",
      "opcoes": ["Capivara", "Foca", "Urso Polar", "Águia Careca"],
      "resposta": 0,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 2,
      "pergunta": "Qual fruta é conhecida pelo cheiro forte e sabor marcante no Cerrado?",
      "opcoes": ["Banana", "Pequi", "Maçã", "Cajá"],
      "resposta": 1,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 3,
      "pergunta": "As árvores do Cerrado geralmente têm casca grossa para:",
      "opcoes": ["Se proteger do frio", "Proteger-se contra o fogo", "Evitar o ataque de aves", "Guardar água"],
      "resposta": 1,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 4,
      "pergunta": "A regeneração do solo com plantas nativas é importante porque:",
      "opcoes": ["Aumenta a venda de frutas", "Ajuda a reter água e nutrientes", "Evita o crescimento de grama", "Reduz o calor do verão"],
      "resposta": 1,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 5,
      "pergunta": "A cor da flor do ipê-roxo é:",
      "opcoes": ["Amarela", "Branca", "Roxa", "Azul"],
      "resposta": 2,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 6,
      "pergunta": "Qual dessas ações ajuda a preservar o Cerrado?",
      "opcoes": ["Queimar mato no verão", "Plantar espécies exóticas", "Reflorestar com espécies nativas", "Desmatar áreas para pasto"],
      "resposta": 2,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 7,
      "pergunta": "Quantos biomas existem no Brasil?",
      "opcoes": ["3", "5", "6", "8"],
      "resposta": 2,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 8,
      "pergunta": "Cerrado é um bioma que se espalha principalmente pelo:",
      "opcoes": ["Nordeste", "Centro-Oeste", "Sul", "Sudeste"],
      "resposta": 1,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 9,
      "pergunta": "Qual destes alimentos vem do Cerrado?",
      "opcoes": ["Amora", "Pequi", "Morango", "Melancia"],
      "resposta": 1,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 10,
      "pergunta": "A palmeira buriti cresce principalmente em:",
      "opcoes": ["Locais secos", "Áreas encharcadas como veredas", "Campos abertos", "Montanhas"],
      "resposta": 1,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 11,
      "pergunta": "O Cerrado é importante para o abastecimento de água porque:",
      "opcoes": ["Tem muitas chuvas no verão", "Abriga nascentes de grandes rios", "Produz muita lama", "Fica perto do oceano"],
      "resposta": 1,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 12,
      "pergunta": "Qual é a principal característica das árvores do Cerrado?",
      "opcoes": ["Troncos finos e retos", "Troncos tortuosos e cascas grossas", "Folhas grandes e largas", "Ausência de raízes profundas"],
      "resposta": 1,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 13,
      "pergunta": "O Cerrado é considerado o segundo maior bioma do Brasil. Qual é a sua área aproximada?",
      "opcoes": ["1 milhão de km²", "2 milhões de km²", "3 milhões de km²", "4 milhões de km²"],
      "resposta": 1,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 14,
      "pergunta": "Qual é a principal adaptação das plantas do Cerrado para sobreviver à seca?",
      "opcoes": ["Folhas pequenas", "Raízes profundas", "Caules ocos", "Flores grandes"],
      "resposta": 1,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    {
      "id": 15,
      "pergunta": "Qual é a principal ameaça à biodiversidade do Cerrado atualmente?",
      "opcoes": ["Caça predatória", "Mudanças climáticas", "Expansão da fronteira agrícola", "Extração de madeira"],
      "resposta": 2,
      "pontos": 10,
      "dificuldade": "Fácil"
    },
    
    // Questões Médias
    {
      "id": 16,
      "pergunta": "O que significa a palavra 'fitofisionomia' no contexto do Cerrado?",
      "opcoes": ["Tipo de clima", "Forma da vegetação", "Composição do solo", "Quantidade de água"],
      "resposta": 1,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 17,
      "pergunta": "Qual é a principal função das raízes profundas nas plantas do Cerrado?",
      "opcoes": ["Captar luz solar", "Evitar erosão", "Buscar água em camadas profundas", "Fixar nutrientes"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 18,
      "pergunta": "Por que o Cerrado é considerado um hotspot?",
      "opcoes": ["Porque faz muito calor", "Por ter pouca água", "Por ser rico em biodiversidade e estar ameaçado", "Por ter vulcões"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 19,
      "pergunta": "Qual desses nomes é uma planta do Cerrado?",
      "opcoes": ["Girassol", "Laranjeira", "Ipê-roxo", "Jatobá"],
      "resposta": 3,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 20,
      "pergunta": "O que acontece quando se planta uma espécie no lugar errado no Cerrado?",
      "opcoes": ["Ela cresce mais rápido", "Ajuda o solo", "Pode não sobreviver ou prejudicar o ambiente", "Aumenta os frutos"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 21,
      "pergunta": "As fitofisionomias ajudam a entender:",
      "opcoes": ["O que plantar em cada área do Cerrado", "O clima da região sul", "O número de animais", "O volume de chuvas no verão"],
      "resposta": 0,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 22,
      "pergunta": "O nome dado a áreas com árvores baixas e gramíneas no Cerrado é:",
      "opcoes": ["Mata Atlântica", "Campo Limpo", "Pantanal", "Vereda"],
      "resposta": 1,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 23,
      "pergunta": "O que diferencia uma vereda de outras formações do Cerrado?",
      "opcoes": ["Presença de árvores altas", "Solo seco e pedregoso", "Presença constante de água e buritis", "Vegetação rasteira e aberta"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 24,
      "pergunta": "Por que a fitofisionomia é importante na escolha das espécies para plantio?",
      "opcoes": ["Ajuda a deixar o solo mais fértil", "Define o tipo de animal que será atraído", "Indica quais espécies são mais adequadas ao local", "Evita a proliferação de insetos"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 25,
      "pergunta": "O que significa dizer que o Cerrado é uma 'floresta invertida'?",
      "opcoes": ["Tem árvores que crescem para baixo", "A maior parte da planta está no subsolo", "As folhas crescem no chão", "Os animais vivem enterrados"],
      "resposta": 1,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 26,
      "pergunta": "Por que a regeneração com espécies nativas é mais eficiente?",
      "opcoes": ["São mais bonitas", "Crescem mais rápido", "Estão adaptadas ao ambiente e ajudam a recuperar o solo", "Necessitam de menos água"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 27,
      "pergunta": "Por que a vegetação do Cerrado é considerada resiliente?",
      "opcoes": ["Cresce muito rápido", "Tem folhas grandes", "Resiste ao fogo e à seca", "Tem flores coloridas"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 28,
      "pergunta": "A escolha incorreta de uma espécie pode:",
      "opcoes": ["Enriquecer o solo", "Aumentar a biodiversidade", "Prejudicar a regeneração e o equilíbrio do ecossistema", "Ajudar no reflorestamento"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 29,
      "pergunta": "Qual dessas ações ajuda a manter a biodiversidade do Cerrado?",
      "opcoes": ["Plantar eucalipto em grandes áreas", "Eliminar cupinzeiros", "Preservar áreas naturais e espécies nativas", "Caçar animais de grande porte"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 30,
      "pergunta": "Qual é o principal fator que contribui para a degradação do Cerrado?",
      "opcoes": ["Turismo excessivo", "Expansão urbana", "Expansão agropecuária", "Extração de minérios"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 31,
      "pergunta": "Qual é a importância das veredas para o ecossistema do Cerrado?",
      "opcoes": ["São áreas de reprodução de peixes", "São fontes de alimento para os animais", "São áreas úmidas que mantêm a biodiversidade", "São barreiras naturais contra incêndios"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    {
      "id": 32,
      "pergunta": "Qual é o nome da palmeira típica do Cerrado, muito utilizada para extração de palmito?",
      "opcoes": ["Açaí", "Buriti", "Guariroba", "Babaçu"],
      "resposta": 2,
      "pontos": 15,
      "dificuldade": "Médio"
    },
    
    // Questões Difíceis
    {
      "id": 33,
      "pergunta": "Qual das seguintes espécies é endêmica do Cerrado brasileiro?",
      "opcoes": ["Jatobá-do-cerrado", "Eucalipto", "Pinheiro-do-paraná", "Seringueira"],
      "resposta": 0,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 34,
      "pergunta": "Qual fenômeno natural é essencial para a quebra de dormência de muitas sementes do Cerrado?",
      "opcoes": ["Inundações sazonais", "Geadas noturnas", "Queimadas naturais", "Ventos fortes"],
      "resposta": 2,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 35,
      "pergunta": "O que é o fenômeno da 'estacionalidade' no Cerrado?",
      "opcoes": ["Variação de temperatura entre dia e noite", "Alternância bem definida entre estação seca e chuvosa", "Migração sazonal de aves", "Floração sincronizada de todas as espécies"],
      "resposta": 1,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 36,
      "pergunta": "Qual característica do solo do Cerrado representa um desafio para a agricultura?",
      "opcoes": ["Alta acidez e presença de alumínio tóxico", "Excesso de matéria orgânica", "Salinidade elevada", "Compactação natural"],
      "resposta": 0,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 37,
      "pergunta": "Qual das seguintes formações vegetais NÃO é encontrada no bioma Cerrado?",
      "opcoes": ["Mata de Galeria", "Campo Rupestre", "Mangue", "Cerradão"],
      "resposta": 2,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 38,
      "pergunta": "Qual processo ecológico é interrompido com a fragmentação do Cerrado?",
      "opcoes": ["Fotossíntese", "Fluxo gênico entre populações", "Decomposição da matéria orgânica", "Ciclo do nitrogênio"],
      "resposta": 1,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 39,
      "pergunta": "Qual é o principal agente polinizador das flores do pequizeiro no Cerrado?",
      "opcoes": ["Vento", "Abelhas nativas", "Morcegos", "Beija-flores"],
      "resposta": 2,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 40,
      "pergunta": "Qual adaptação morfológica é comum em gramíneas do Cerrado para sobreviver a queimadas?",
      "opcoes": ["Folhas largas e finas", "Rizomas subterrâneos", "Caules ocos com água armazenada", "Sementes que germinam apenas após 10 anos"],
      "resposta": 1,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 41,
      "pergunta": "Qual das seguintes bacias hidrográficas NÃO tem nascentes no Cerrado brasileiro?",
      "opcoes": ["Bacia do São Francisco", "Bacia Amazônica", "Bacia do Paraguai", "Bacia do Rio Uruguai"],
      "resposta": 3,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 42,
      "pergunta": "Qual fenômeno está causando a redução do volume de água nas nascentes do Cerrado nas últimas décadas?",
      "opcoes": ["Aumento das chuvas", "Expansão das áreas urbanas", "Conversão de áreas nativas em agricultura intensiva", "Aumento da temperatura global"],
      "resposta": 2,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 43,
      "pergunta": "Qual é a principal estratégia de regeneração do Cerrado após uma queimada?",
      "opcoes": ["Dispersão de sementes pelo vento", "Rebrota a partir de estruturas subterrâneas", "Germinação rápida de novas sementes", "Crescimento de plantas exóticas invasoras"],
      "resposta": 1,
      "pontos": 20,
      "dificuldade": "Difícil"
    },
    {
      "id": 44,
      "pergunta": "Qual é o papel dos cupinzeiros no ecossistema do Cerrado?",
      "opcoes": ["Servem apenas como abrigo para cupins", "Prejudicam o crescimento da vegetação", "Contribuem para a ciclagem de nutrientes e aeração do solo", "Causam a morte de árvores"],
      "resposta": 2,
      "pontos": 20,
      "dificuldade": "Difícil"
    }
  ],
  "participantes": []
};

// Carregar dados do quiz
async function carregarDados() {
    try {
        // Usar dados embutidos em vez de carregar de arquivo
        quizData = quizDataEmbutido;
        
        // Tentar recuperar participantes do localStorage, se existir
        try {
            const dadosSalvos = localStorage.getItem('quizCerradoData');
            if (dadosSalvos) {
                const dadosParseados = JSON.parse(dadosSalvos);
                if (dadosParseados && dadosParseados.participantes) {
                    quizData.participantes = dadosParseados.participantes;
                    console.log('Participantes recuperados do localStorage:', quizData.participantes.length);
                    
                    // Atualizar o ranking após carregar os participantes
                    atualizarRanking();
                }
            }
        } catch (localStorageError) {
            console.warn('Não foi possível acessar localStorage:', localStorageError);
        }
        
        console.log('Dados carregados com sucesso:', quizData);
        return true;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao inicializar os dados do quiz. Por favor, recarregue a página.');
        return false;
    }
}

// Função para atualizar o ranking TOP 10
function atualizarRanking() {
    if (!quizData.participantes || quizData.participantes.length === 0) {
        // Se não houver participantes, exibir mensagem
        const rankingBody = document.getElementById('ranking-body');
        rankingBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Ainda não há participantes</td></tr>';
        return;
    }
    
    // Ordenar participantes por pontuação (do maior para o menor)
    const participantesOrdenados = [...quizData.participantes].sort((a, b) => b.pontuacao - a.pontuacao);
    
    // Pegar os 10 primeiros (ou menos, se não houver 10)
    const top10 = participantesOrdenados.slice(0, 10);
    
    // Preencher a tabela de ranking
    const rankingBody = document.getElementById('ranking-body');
    rankingBody.innerHTML = '';
    
    top10.forEach((participante, index) => {
        const tr = document.createElement('tr');
        
        // Posição
        const tdPosicao = document.createElement('td');
        tdPosicao.textContent = index + 1;
        tr.appendChild(tdPosicao);
        
        // Nome
        const tdNome = document.createElement('td');
        tdNome.textContent = participante.nome;
        tr.appendChild(tdNome);
        
        // Contato (preferência para Instagram)
        const tdContato = document.createElement('td');
        if (participante.tipoContato === 'instagram') {
            tdContato.textContent = '@' + participante.contato;
        } else {
            // Se for email, mostrar apenas se não houver Instagram
            tdContato.textContent = participante.tipoContato === 'email' ? '-' : participante.contato;
        }
        tr.appendChild(tdContato);
        
        // Pontuação
        const tdPontuacao = document.createElement('td');
        tdPontuacao.textContent = participante.pontuacao;
        tr.appendChild(tdPontuacao);
        
        rankingBody.appendChild(tr);
    });
}

// Inicializar o quiz
async function inicializarQuiz() {
    const dadosCarregados = await carregarDados();
    if (!dadosCarregados) return;
    
    // Configurar evento do botão iniciar quiz na tela inicial
    document.getElementById('btn-iniciar-quiz').addEventListener('click', function() {
        document.getElementById('tela-inicial').classList.add('hidden');
        document.getElementById('tela-identificacao').classList.remove('hidden');
    });
    
    // Configurar eventos do formulário de registro
    document.getElementById('form-registro').addEventListener('submit', function(e) {
        e.preventDefault();
        iniciarQuiz();
    });
    
    // Configurar alternância de campos de contato
    document.querySelectorAll('input[name="tipo-contato"]').forEach(radio => {
        radio.addEventListener('change', alternarCamposContato);
    });
    
    // Configurar campo inicial de contato
    alternarCamposContato();
    
    // Configurar botões de navegação
    document.getElementById('btn-proxima').addEventListener('click', proximaPergunta);
    document.getElementById('btn-finalizar').addEventListener('click', reiniciarQuiz);
    
    // Configurar eventos do modal de prêmios
    configurarModalEventos();
}

// Alternar campos de contato com base na seleção
function alternarCamposContato() {
    const tipoContato = document.querySelector('input[name="tipo-contato"]:checked').value;
    
    if (tipoContato === 'email') {
        document.getElementById('email-container').classList.remove('hidden');
        document.getElementById('instagram-container').classList.add('hidden');
        document.getElementById('email').required = true;
        document.getElementById('instagram').required = false;
    } else {
        document.getElementById('email-container').classList.add('hidden');
        document.getElementById('instagram-container').classList.remove('hidden');
        document.getElementById('email').required = false;
        document.getElementById('instagram').required = true;
    }
}

// Iniciar o quiz após preenchimento do formulário
function iniciarQuiz() {
    // Coletar dados do participante
    const nome = document.getElementById('nome').value;
    const tipoContato = document.querySelector('input[name="tipo-contato"]:checked').value;
    const contato = tipoContato === 'email' ? 
                   document.getElementById('email').value : 
                   document.getElementById('instagram').value;
    
    // Validar dados
    if (!nome || !contato) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Verificar se o participante já realizou o quiz
    const participanteExistente = quizData.participantes.find(p => 
        (p.tipoContato === tipoContato && p.contato.toLowerCase() === contato.toLowerCase())
    );
    
    if (participanteExistente) {
        alert('Você já participou deste quiz. Cada pessoa pode participar apenas uma vez.');
        return;
    }
    
    // Salvar dados do participante
    participante = {
        nome: nome,
        tipoContato: tipoContato,
        contato: contato
    };
    
    // Sortear perguntas
    sortearPerguntas();
    
    // Inicializar respostas
    respostas = Array(perguntasSorteadas.length).fill(null);
    
    // Reiniciar o timer
    tempoRestante = TEMPO_QUIZ_SEGUNDOS;
    
    // Mostrar tela de pergunta
    document.getElementById('tela-identificacao').classList.add('hidden');
    mostrarTelaPergunta();
    mostrarPergunta(0);
    
    // Iniciar o timer
    iniciarTimer();
}

// Funções do timer
function iniciarTimer() {
    // Limpar qualquer timer existente
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Reiniciar o timer
    tempoRestante = TEMPO_QUIZ_SEGUNDOS;
    timerIniciado = true;
    
    // Atualizar a exibição inicial do timer
    atualizarExibicaoTimer();
    
    // Iniciar o intervalo para decrementar o timer
    timerInterval = setInterval(() => {
        tempoRestante--;
        
        // Atualizar a exibição do timer
        atualizarExibicaoTimer();
        
        // Verificar se o tempo acabou
        if (tempoRestante <= 0) {
            finalizarPorTempoEsgotado();
        }
    }, 1000);
}

// Atualizar a exibição visual do timer
function atualizarExibicaoTimer() {
    // Atualizar o texto do contador
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    const textoTimer = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    document.getElementById('timer-contador').textContent = textoTimer;
    
    // Atualizar a barra de progresso
    const porcentagemRestante = (tempoRestante / TEMPO_QUIZ_SEGUNDOS) * 100;
    document.getElementById('timer-barra').style.width = `${porcentagemRestante}%`;
    
    // Atualizar as classes de alerta com base no tempo restante
    const timerContainer = document.querySelector('.timer-container');
    const timerTexto = document.querySelector('.timer-texto');
    
    // Remover classes existentes
    timerContainer.classList.remove('timer-alerta', 'timer-critico');
    timerTexto.classList.remove('alerta', 'critico');
    
    // Adicionar classes com base no tempo restante
    if (tempoRestante <= 10) { // Últimos 10 segundos
        timerContainer.classList.add('timer-critico');
        timerTexto.classList.add('critico');
    } else if (tempoRestante <= 30) { // Últimos 30 segundos
        timerContainer.classList.add('timer-alerta');
        timerTexto.classList.add('alerta');
    }
}

// Finalizar o quiz quando o tempo acabar
function finalizarPorTempoEsgotado() {
    // Parar o timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Calcular o resultado com as respostas que foram dadas
    calcularResultado();
    
    // Adicionar mensagem sobre tempo esgotado
    const mensagemResultado = document.getElementById('mensagem-resultado');
    mensagemResultado.textContent = `Tempo esgotado! ${mensagemResultado.textContent}`;
}

// Pausar o timer (usado quando o quiz é finalizado normalmente)
function pausarTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Sortear perguntas aleatoriamente por nível de dificuldade
function sortearPerguntas() {
    // Obter configurações de quantidade por dificuldade
    const numFaceis = quizData.configuracao.numeroQuestoesFaceis;
    const numMedias = quizData.configuracao.numeroQuestoesMedias;
    const numDificeis = quizData.configuracao.numeroQuestoesDificeis;
    
    // Separar perguntas por dificuldade
    const perguntasFaceis = quizData.perguntas.filter(p => p.dificuldade === "Fácil");
    const perguntasMedias = quizData.perguntas.filter(p => p.dificuldade === "Médio");
    const perguntasDificeis = quizData.perguntas.filter(p => p.dificuldade === "Difícil");
    
    // Embaralhar cada conjunto de perguntas
    embaralharArray(perguntasFaceis);
    embaralharArray(perguntasMedias);
    embaralharArray(perguntasDificeis);
    
    // Selecionar o número desejado de cada dificuldade
    const faceisSelecionadas = perguntasFaceis.slice(0, numFaceis);
    const mediasSelecionadas = perguntasMedias.slice(0, numMedias);
    const difíceisSelecionadas = perguntasDificeis.slice(0, numDificeis);
    
    // Combinar todas as perguntas selecionadas
    perguntasSorteadas = [...faceisSelecionadas, ...mediasSelecionadas, ...difíceisSelecionadas];
    
    // Embaralhar a ordem final para não ficar agrupado por dificuldade
    embaralharArray(perguntasSorteadas);
    
    console.log(`Perguntas sorteadas: ${perguntasSorteadas.length} (${numFaceis} fáceis, ${numMedias} médias, ${numDificeis} difíceis)`);
}

// Função auxiliar para embaralhar array
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Mostrar tela de pergunta
function mostrarTelaPergunta() {
    document.getElementById('tela-inicial').classList.add('hidden');
    document.getElementById('tela-identificacao').classList.add('hidden');
    document.getElementById('tela-resultado').classList.add('hidden');
    document.getElementById('tela-pergunta').classList.remove('hidden');
    
    // Atualizar total de perguntas
    document.getElementById('total-perguntas').textContent = perguntasSorteadas.length;
}

// Mostrar pergunta específica
function mostrarPergunta(indice) {
    const pergunta = perguntasSorteadas[indice];
    const perguntaTexto = document.getElementById('pergunta-texto');
    const opcoesContainer = document.getElementById('opcoes-container');
    const btnProxima = document.getElementById('btn-proxima');
    
    // Atualizar texto da pergunta
    perguntaTexto.textContent = pergunta.pergunta;
    
    // Limpar opções anteriores
    opcoesContainer.innerHTML = '';
    
    // Adicionar novas opções
    pergunta.opcoes.forEach((opcao, i) => {
        const opcaoElement = document.createElement('div');
        opcaoElement.className = 'opcao';
        opcaoElement.textContent = opcao;
        
        // Marcar opção se já foi selecionada
        if (respostas[indice] === i) {
            opcaoElement.classList.add('selecionada');
        }
        
        opcaoElement.addEventListener('click', () => selecionarOpcao(opcaoElement, indice, i));
        opcoesContainer.appendChild(opcaoElement);
    });
    
    // Atualizar progresso
    document.getElementById('pergunta-atual').textContent = indice + 1;
    const progresso = ((indice + 1) / perguntasSorteadas.length) * 100;
    document.getElementById('progresso-barra').style.width = `${progresso}%`;
    
    // Desabilitar botão próxima se não houver resposta
    btnProxima.disabled = respostas[indice] === null;
    
    // Atualizar texto do botão na última pergunta
    if (indice === perguntasSorteadas.length - 1) {
        btnProxima.textContent = 'Ver Resultado';
    } else {
        btnProxima.textContent = 'Próxima';
    }
    
    perguntaAtual = indice;
}

// Selecionar uma opção de resposta
function selecionarOpcao(opcaoElement, indicePergunta, indiceOpcao) {
    // Remover seleção anterior
    const opcoesElements = document.querySelectorAll('.opcao');
    opcoesElements.forEach(el => el.classList.remove('selecionada'));
    
    // Adicionar seleção à opção clicada
    opcaoElement.classList.add('selecionada');
    
    // Salvar resposta
    respostas[indicePergunta] = indiceOpcao;
    
    // Habilitar botão próxima
    document.getElementById('btn-proxima').disabled = false;
}

// Avançar para próxima pergunta ou mostrar resultado
function proximaPergunta() {
    if (perguntaAtual < perguntasSorteadas.length - 1) {
        mostrarPergunta(perguntaAtual + 1);
    } else {
        // Pausar o timer quando chegar ao final do quiz
        pausarTimer();
        calcularResultado();
    }
}

// Calcular resultado do quiz
function calcularResultado() {
    pontuacaoTotal = 0;
    const pontuacaoMaxima = 100;
    
    // Calcular pontuação
    perguntasSorteadas.forEach((pergunta, i) => {
        if (respostas[i] === pergunta.resposta) {
            pontuacaoTotal += pergunta.pontos;
        }
    });
    
    // Calcular percentual
    const percentual = Math.round((pontuacaoTotal / pontuacaoMaxima) * 100);
    
    // Determinar brinde
    const brinde = determinarBrinde(percentual);
    
    // Atualizar tela de resultado
    document.getElementById('pontos').textContent = pontuacaoTotal;
    document.getElementById('pontos-total').textContent = pontuacaoMaxima;
    document.getElementById('percentual').textContent = percentual;
    
    // Definir mensagem com base na pontuação
    let mensagem = '';
    if (percentual >= 80) {
        mensagem = `Parabéns, ${participante.nome}! Você é um verdadeiro conhecedor do Cerrado!`;
    } else if (percentual >= 50) {
        mensagem = `Muito bem, ${participante.nome}! Você conhece bastante sobre o Cerrado!`;
    } else {
        mensagem = `Obrigado por participar, ${participante.nome}! Continue aprendendo sobre o Cerrado!`;
    }
    
    document.getElementById('mensagem-resultado').textContent = mensagem;
    
    // Mostrar brinde
    document.getElementById('brinde-nome').textContent = brinde.nome;
    document.getElementById('brinde-imagem').src = brinde.imagem;
    document.getElementById('brinde-imagem').alt = brinde.nome;
    
    // Salvar dados do participante e decrementar estoque
    salvarParticipante(percentual, brinde);
    
    // Mostrar tela de resultado
    document.getElementById('tela-pergunta').classList.add('hidden');
    document.getElementById('tela-resultado').classList.remove('hidden');
}

// Função auxiliar para obter o estoque atual de um brinde
function obterEstoqueAtual(brinde) {
    const chaveEstoque = `estoque_${brinde.nome.replace(/\s/g, '_')}`;
    const estoqueLocalStorage = localStorage.getItem(chaveEstoque);
    
    // Retorna o valor do localStorage se existir, senão retorna a quantidade inicial
    return estoqueLocalStorage !== null ? parseInt(estoqueLocalStorage) : brinde.quantidade;
}

// Função auxiliar para decrementar o estoque de um brinde no localStorage
function decrementarEstoque(brinde) {
    const chaveEstoque = `estoque_${brinde.nome.replace(/\s/g, '_')}`;
    const estoqueAtual = obterEstoqueAtual(brinde);
    
    if (estoqueAtual > 0) {
        const novoEstoque = estoqueAtual - 1;
        localStorage.setItem(chaveEstoque, novoEstoque);
        console.log(`Estoque de ${brinde.nome} decrementado para ${novoEstoque}`);
        return true;
    }
    return false;
}

// Determinar brinde com base na pontuação
function determinarBrinde(percentual) {
    // Encontrar brinde ideal com base na pontuação
    let brindeIdeal = quizData.configuracao.brindes.find(brinde => 
        percentual >= brinde.notaMinima && percentual <= brinde.notaMaxima
    );
    
    // Verificar o estoque do brinde ideal
    let estoqueIdeal = obterEstoqueAtual(brindeIdeal);
    
    // Se o estoque do brinde ideal estiver esgotado, procurar um brinde disponível
    if (estoqueIdeal <= 0) {
        console.log(`Brinde ideal (${brindeIdeal.nome}) esgotado. Procurando alternativa.`);
        
        // Filtrar brindes que ainda têm estoque
        const brindesDisponiveis = quizData.configuracao.brindes.filter(brinde => obterEstoqueAtual(brinde) > 0);
        
        if (brindesDisponiveis.length > 0) {
            // Encontrar o brinde disponível com a faixa de pontuação mais próxima
            brindeIdeal = brindesDisponiveis.reduce((anterior, atual) => {
                // Usar o ponto médio da faixa de pontuação para calcular a distância
                const pontoMedioAnterior = (anterior.notaMinima + anterior.notaMaxima) / 2;
                const pontoMedioAtual = (atual.notaMinima + atual.notaMaxima) / 2;
                
                const distanciaAnterior = Math.abs(pontoMedioAnterior - percentual);
                const distanciaAtual = Math.abs(pontoMedioAtual - percentual);
                
                return distanciaAtual < distanciaAnterior ? atual : anterior;
            });
            console.log(`Alternativa encontrada: ${brindeIdeal.nome}`);
        } else {
            // Se nenhum brinde estiver disponível, retornar o brinde ideal original (para fins de registro)
            console.log('Todos os brindes esgotados. Retornando brinde ideal original.');
        }
    }
    
    return brindeIdeal;
}

// Salvar dados do participante
function salvarParticipante(percentual, brinde) {
    // Adicionar participante à lista
    if (!quizData.participantes) {
        quizData.participantes = [];
    }
    
    // Adicionar participante à lista
    if (!quizData.participantes) {
        quizData.participantes = [];
    }
    
    const novoParticipante = {
        ...participante,
        data: new Date().toISOString(),
        pontuacao: pontuacaoTotal,
        percentual: percentual,
        brinde: brinde.nome // Salvar apenas o nome do brinde para simplificar
    };
    
    quizData.participantes.push(novoParticipante);
    
    // Decrementar o estoque do brinde distribuído
    decrementarEstoque(brinde);
    
    // Salvar dados em arquivo JSON (simulado - na versão local real, isso seria feito pelo backend)
    console.log('Dados do participante salvos:', novoParticipante);
    console.log('Total de participantes:', quizData.participantes.length);
    
    // Em uma implementação real, aqui seria feita uma chamada para salvar o arquivo JSON
    salvarDadosJSON();
}

// Função para simular o salvamento do arquivo JSON
function salvarDadosJSON() {
    // Em uma aplicação real, isso seria feito pelo backend
    // Aqui apenas simulamos o salvamento mostrando os dados no console
    const dadosJSON = JSON.stringify(quizData, null, 2);
    console.log('Dados JSON atualizados:', dadosJSON);
    
    // Na versão local, podemos usar localStorage para persistir os dados entre sessões
    try {
        localStorage.setItem('quizCerradoData', dadosJSON);
        console.log('Dados salvos no localStorage');
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }
    
    // Criar um arquivo de download com os dados
    const blob = new Blob([dadosJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Criar link para download (não visível)
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'participantes_quiz_cerrado.json';
    document.body.appendChild(downloadLink);
    
    // Não fazemos o download automático para não interromper a experiência do usuário
    // Em um ambiente real, isso seria tratado pelo backend
}

// Reiniciar o quiz
function reiniciarQuiz() {
    // Parar o timer se estiver rodando
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Voltar para a tela inicial
    document.getElementById('tela-resultado').classList.add('hidden');
    document.getElementById('tela-inicial').classList.remove('hidden');
    
    // Limpar formulário
    document.getElementById('form-registro').reset();
    alternarCamposContato();
    
    // Atualizar o ranking com os dados mais recentes
    atualizarRanking();
    
    // Resetar variáveis
    perguntasSorteadas = [];
    respostas = [];
    perguntaAtual = 0;
    pontuacaoTotal = 0;
    participante = {
        nome: "",
        tipoContato: "",
        contato: ""
    };
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarQuiz);

// =================================================================================
// Lógica do Modal de Prêmios
// =================================================================================

// Função para popular o modal de prêmios
function popularModalPremios() {
    const listaPremios = document.getElementById('lista-premios');
    listaPremios.innerHTML = ''; // Limpar lista anterior

    const brindes = quizData.configuracao.brindes;
    const totalQuestoes = quizData.configuracao.numeroQuestoesFaceis + 
                          quizData.configuracao.numeroQuestoesMedias + 
                          quizData.configuracao.numeroQuestoesDificeis;
    
    // Assumindo que todas as questões valem 10 pontos (verificando o JSON embutido)
    // A pontuação máxima é 8 questões * 10 pontos = 80 pontos (se todas valerem 10)
    // No entanto, as questões médias valem 15 e as difíceis 20.
    // 3 fáceis * 10 = 30
    // 3 médias * 15 = 45
    // 2 difíceis * 20 = 40
    // Total máximo de pontos: 30 + 45 + 40 = 115 pontos.
    // A pontuação mínima/máxima no JSON de brindes é em percentual (0-100).
    
    brindes.forEach(brinde => {
        // Verificar estoque no localStorage usando a função auxiliar
        const estoque = obterEstoqueAtual(brinde);
        
        const itemPremio = document.createElement('div');
        itemPremio.className = 'item-premio';
        
        const imagem = document.createElement('img');
        imagem.className = 'item-premio-imagem';
        imagem.src = brinde.imagem;
        imagem.alt = brinde.nome;
        
        const info = document.createElement('div');
        info.className = 'item-premio-info';
        
        const titulo = document.createElement('h4');
        titulo.textContent = brinde.nome;
        
        const faixa = document.createElement('p');
        faixa.textContent = `Pontuação: ${brinde.notaMinima}% - ${brinde.notaMaxima}%`;
        
        info.appendChild(titulo);
        info.appendChild(faixa);
        
        const estoqueInfo = document.createElement('div');
        estoqueInfo.className = 'item-premio-estoque';
        estoqueInfo.textContent = `Estoque: ${estoque}`;
        
        itemPremio.appendChild(imagem);
        itemPremio.appendChild(info);
        itemPremio.appendChild(estoqueInfo);
        
        listaPremios.appendChild(itemPremio);
    });
}

// Função para configurar os eventos do modal
function configurarModalEventos() {
    const modal = document.getElementById('modal-premios');
    const btn = document.getElementById('btn-modal-premios');
    const span = document.querySelector('.close-button');

    // Abrir o modal
    btn.onclick = function() {
        popularModalPremios();
        modal.classList.remove('hidden');
    }

    // Fechar o modal pelo 'x'
    span.onclick = function() {
        modal.classList.add('hidden');
    }

    // Fechar o modal clicando fora
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.add('hidden');
        }
    }
}

// Adicionar a configuração do modal na inicialização do quiz
// (Assumindo que a função inicializarQuiz() é chamada no final do script)
// Vou procurar o final da função inicializarQuiz para adicionar a chamada.

// No final do script, após a chamada de inicializarQuiz(), adiciono a chamada para configurarModalEventos.
// Como não tenho o script completo, vou adicionar a chamada de configuração de eventos do modal no final do arquivo.

// A chamada para configurarModalEventos foi movida para dentro de inicializarQuiz()
