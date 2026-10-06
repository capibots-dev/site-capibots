// Variáveis globais
let quizData = null;
let rankingAtual = [];
let perguntasSorteadas = [];
let respostas = [];
let perguntaAtual = 0;
let pontuacaoTotal = 0;
let participante = {
    nome: "",
    equipe: ""
};
let resultadoSalvo = false;

// Configurações do timer
const TEMPO_QUIZ_SEGUNDOS = 240; // 4 minutos - PARÂMETRO CONFIGURÁVEL
let timerInterval = null;
let tempoRestante = TEMPO_QUIZ_SEGUNDOS;
let timerIniciado = false;

// Dados do quiz embutidos diretamente no JavaScript
const quizDataEmbutido = {
  "configuracao": {
    "titulo": "Quiz Desafio Prático - CAPIBOTS",
    "numeroQuestoesFaceis": 3,
    "numeroQuestoesMedias": 3,
    "numeroQuestoesDificeis": 2
  },
  "quiz": {
    "titulo": "Quiz do Desafio Prático — TBR Kids 2 2026",
    "descricao": "96 questões de múltipla escolha sobre missões, pontuação, penalidades e regras do Desafio Prático",
    "equipe": "Capibots · TBR Kids 2 · Temporada 2026",
    "tema": "Desafio Prático — Educação em Construção",
    "total_questoes": 96,
    "niveis": {
      "1": "Fácil",
      "2": "Médio",
      "3": "Difícil"
    },
    "perguntas": [
        {
          "id": 1,
          "pergunta": "Qual é o nome da Missão 1?",
          "opcoes": [
            "Balanço Controlado",
            "Acesso Seguro",
            "Conexão do Conhecimento",
            "Despertar do Conhecimento"
          ],
          "resposta": 0,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Missão 1 – Balanço Controlado (a gangorra)."
        },
        {
          "id": 2,
          "pergunta": "A missão “Despertar do Conhecimento” usa qual modelo de missão?",
          "opcoes": [
            "A cancela",
            "O livro",
            "O carro",
            "A gangorra"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Missão 4: o robô precisa abrir o Livro."
        },
        {
          "id": 3,
          "pergunta": "Qual é o nome da Missão 7, em que o robô levanta a cancela?",
          "opcoes": [
            "Ingresso à Universidade",
            "Checkpoint",
            "Inauguração da Universidade",
            "Missão Maker"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Missão 7 – Inauguração da Universidade."
        },
        {
          "id": 4,
          "pergunta": "Qual missão pede para levar o carro até a vaga do estacionamento?",
          "opcoes": [
            "Alvenaria Educacional",
            "Acesso Seguro",
            "Balanço Controlado",
            "Ingresso à Universidade"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Missão 5 – Acesso Seguro."
        },
        {
          "id": 5,
          "pergunta": "Na missão “Alvenaria Educacional”, o que o robô precisa levar?",
          "opcoes": [
            "Os materiais escolares até o almoxarifado",
            "A peça faltante até o quebra-cabeça",
            "Os blocos de construção até as áreas de fundação da escola",
            "O Objeto Maker até a universidade"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Missão 3: blocos de construção vão para as áreas de fundação (Verde, Cinza e Amarela)."
        },
        {
          "id": 6,
          "pergunta": "A área do Checkpoint também é chamada de:",
          "opcoes": [
            "Almoxarifado",
            "Hall da Fama",
            "Área da Universidade",
            "Vaga do Estacionamento"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Missão 6: área do checkpoint = Hall da Fama."
        },
        {
          "id": 7,
          "pergunta": "Para onde a equipe leva os materiais escolares para recuperar pontos?",
          "opcoes": [
            "Para a Base",
            "Para o Hall da Fama",
            "Para o Almoxarifado",
            "Para a Área da Universidade"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Materiais levados ao Almoxarifado voltam a valer 10 pontos cada."
        },
        {
          "id": 8,
          "pergunta": "Quais são as três áreas de fundação da escola na Missão 3?",
          "opcoes": [
            "Verde, Cinza e Amarela",
            "Azul, Vermelha e Verde",
            "Branca, Cinza e Azul",
            "Amarela, Vermelha e Azul"
          ],
          "resposta": 0,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Área Verde, Área Cinza e Área Amarela."
        },
        {
          "id": 9,
          "pergunta": "Quantas missões existem no tapete do Kids 2 em 2026 (sem contar as penalidades)?",
          "opcoes": [
            "6",
            "7",
            "8",
            "9"
          ],
          "resposta": 3,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "São 9 missões, da Missão 1 (Balanço Controlado) até a Missão 9 (Ingresso à Universidade)."
        },
        {
          "id": 10,
          "pergunta": "Quantos pontos vale a Missão Maker quando o Objeto Maker está dentro da área?",
          "opcoes": [
            "45",
            "55",
            "75",
            "100"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Missão 8 – 75 pontos (a que vale mais!)."
        },
        {
          "id": 11,
          "pergunta": "Quantos pontos vale o livro aberto, com a capa tocando o tapete?",
          "opcoes": [
            "30",
            "45",
            "42",
            "35"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Missão 4 – 45 pontos."
        },
        {
          "id": 12,
          "pergunta": "Quantos pontos vale a cancela levantada (barra sem tocar o tapete)?",
          "opcoes": [
            "55",
            "75",
            "30",
            "20"
          ],
          "resposta": 0,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Missão 7 – 55 pontos."
        },
        {
          "id": 13,
          "pergunta": "Quantos pontos vale a gangorra da Missão 1 na posição correta?",
          "opcoes": [
            "20",
            "30",
            "35",
            "45"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Missão 1 – 30 pontos."
        },
        {
          "id": 14,
          "pergunta": "Na Missão 2, quanto vale a peça faltante TOTALMENTE dentro e PARCIALMENTE dentro da área?",
          "opcoes": [
            "35 e 20",
            "42 e 23",
            "30 e 15",
            "35 e 0"
          ],
          "resposta": 0,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Totalmente dentro = 35; parcialmente dentro = 20."
        },
        {
          "id": 15,
          "pergunta": "Na Missão 5, quanto vale o carro TOTALMENTE dentro e PARCIALMENTE dentro da vaga?",
          "opcoes": [
            "35 e 20",
            "45 e 20",
            "42 e 23",
            "40 e 25"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Totalmente dentro = 42; parcialmente dentro = 23."
        },
        {
          "id": 16,
          "pergunta": "Quantos pontos vale cada bloco tocando a Área Verde?",
          "opcoes": [
            "10",
            "12",
            "18",
            "20"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Bloco na Área Verde = 12 pontos."
        },
        {
          "id": 17,
          "pergunta": "Quantos pontos vale cada bloco tocando a Área Cinza OU a Área Amarela?",
          "opcoes": [
            "12",
            "15",
            "18",
            "20"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Bloco na Área Cinza ou Amarela = 18 pontos."
        },
        {
          "id": 18,
          "pergunta": "Qual é o bônus da Missão 3 quando TODOS os blocos estão pontuando?",
          "opcoes": [
            "10",
            "15",
            "20",
            "30"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Bônus de 20 pontos."
        },
        {
          "id": 19,
          "pergunta": "Qual missão, sozinha, vale MAIS pontos?",
          "opcoes": [
            "Inauguração da Universidade",
            "Despertar do Conhecimento",
            "Acesso Seguro",
            "Missão Maker"
          ],
          "resposta": 3,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Missão Maker = 75 pontos. Depois vem a Cancela (55)."
        },
        {
          "id": 20,
          "pergunta": "Na Missão 1, qual lado da gangorra começa levantado?",
          "opcoes": [
            "O lado leste (menino)",
            "O lado oeste (menina)",
            "Os dois lados",
            "Nenhum, ela começa reta"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "O lado OESTE (menina) começa levantado; o robô deve inclinar a gangorra para o outro lado."
        },
        {
          "id": 21,
          "pergunta": "Como a gangorra está presa no tapete?",
          "opcoes": [
            "Com parafusos",
            "Com fita dupla face",
            "Com elásticos",
            "Ela está totalmente solta, sem nenhuma fixação"
          ],
          "resposta": 3,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "A gangorra está totalmente solta — cuidado para não arrastá-la!"
        },
        {
          "id": 22,
          "pergunta": "Na Missão 2, a posição (rotação) da peça faltante importa para pontuar?",
          "opcoes": [
            "Sim, tem que encaixar certinho",
            "Não, a rotação não é considerada",
            "Só importa se estiver parcialmente dentro",
            "Só importa na última partida"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "A orientação ou rotação da peça não conta para a pontuação."
        },
        {
          "id": 23,
          "pergunta": "O que precisa acontecer para o livro (Missão 4) pontuar?",
          "opcoes": [
            "O livro estar na base",
            "A capa estar tocando o tapete",
            "O livro estar em pé",
            "O robô estar tocando o livro"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "A capa precisa estar em contato direto com o tapete."
        },
        {
          "id": 24,
          "pergunta": "O robô levantou a cancela, mas a barra ficou apoiada em um Objeto Estratégico da equipe. Quantos pontos vale a Missão 7?",
          "opcoes": [
            "55",
            "27",
            "20",
            "0"
          ],
          "resposta": 3,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "A barra precisa ficar levantada sozinha, sem estar apoiada em Objeto Estratégico nem no robô. Então vale 0."
        },
        {
          "id": 25,
          "pergunta": "O que acontece quando o robô toca a área do Checkpoint (Hall da Fama)?",
          "opcoes": [
            "Nada, ele continua andando",
            "Ele fica INATIVO e o operador leva para a base, SEM penalidade",
            "Ele fica inativo e a equipe perde um material escolar",
            "A partida acaba"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "O robô fica inativo, é carregado para a base e reinicia — sem penalidade. E ganha 20 pontos."
        },
        {
          "id": 26,
          "pergunta": "A Missão Maker só é validada se…",
          "opcoes": [
            "o livro estiver aberto",
            "o robô terminar na universidade",
            "a Missão 7 (cancela) estiver pontuando no fim da partida",
            "todos os blocos estiverem pontuando"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Sem a cancela levantada no fim, a Missão Maker vale 0."
        },
        {
          "id": 27,
          "pergunta": "Um bloco está tocando a Área Verde E a Área Cinza ao mesmo tempo. Quanto ele vale?",
          "opcoes": [
            "12 pontos",
            "18 pontos",
            "30 pontos",
            "0 pontos"
          ],
          "resposta": 0,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Vale a condição MENOS vantajosa: Área Verde = 12."
        },
        {
          "id": 28,
          "pergunta": "O ambiente escolar da Missão Maker pode ser colado no tapete com fita adesiva?",
          "opcoes": [
            "Sim, com fita dupla face",
            "Sim, mas só com cola branca",
            "Não, não pode ser fixado com cola, fita ou similares",
            "Só se o juiz deixar"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "O ambiente fica totalmente dentro da área, sem fixação por cola ou fita."
        },
        {
          "id": 29,
          "pergunta": "O que acontece quando o operador toca no robô FORA da base?",
          "opcoes": [
            "Nada",
            "O robô fica inativo e o juiz coloca um material escolar no tapete",
            "A equipe é desclassificada",
            "O cronômetro para"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Robô fica INATIVO e o juiz coloca um material escolar no tapete (penalidade)."
        },
        {
          "id": 30,
          "pergunta": "Qual é o PRIMEIRO material escolar colocado no tapete como penalidade?",
          "opcoes": [
            "Lápis vermelho",
            "Borracha verde",
            "Caderno amarelo",
            "Tesoura azul"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Ordem: 1 caderno (amarelo), 2 lápis (vermelho), 3 tesoura (azul), 4 borracha (verde)."
        },
        {
          "id": 31,
          "pergunta": "No TERCEIRO toque fora da base, qual material o juiz coloca?",
          "opcoes": [
            "Tesoura azul",
            "Lápis vermelho",
            "Borracha verde",
            "Caderno amarelo"
          ],
          "resposta": 0,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "O 3º material é a tesoura azul."
        },
        {
          "id": 32,
          "pergunta": "No máximo, quantas vezes a penalidade do material escolar pode ser aplicada numa partida?",
          "opcoes": [
            "2",
            "3",
            "4",
            "Sem limite"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "No máximo 4 vezes (são 4 materiais)."
        },
        {
          "id": 33,
          "pergunta": "Quanto vale cada material escolar que termina a partida com o juiz OU dentro do almoxarifado?",
          "opcoes": [
            "5 pontos",
            "10 pontos",
            "20 pontos",
            "0 pontos"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "10 pontos cada — por isso uma partida sem toques já começa garantindo 40 pontos."
        },
        {
          "id": 34,
          "pergunta": "Sem nenhum toque no robô fora da base, a equipe deixou a gangorra na posição correta, abriu o livro e terminou com o robô tocando a Área da Universidade. Quantos pontos fez? (Não esqueça os materiais escolares!)",
          "opcoes": [
            "105 pontos",
            "135 pontos",
            "145 pontos",
            "155 pontos"
          ],
          "resposta": 2,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "Gangorra 30 + Livro 45 + Universidade 30 + 4 materiais com o juiz 40 = 145."
        },
        {
          "id": 35,
          "pergunta": "A equipe colocou o carro PARCIALMENTE dentro da vaga, a peça faltante TOTALMENTE dentro e tocou o Checkpoint (depois levou o robô para a base). Não houve nenhum outro toque. Quantos pontos?",
          "opcoes": [
            "78 pontos",
            "98 pontos",
            "118 pontos",
            "137 pontos"
          ],
          "resposta": 2,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "Carro 23 + Peça 35 + Checkpoint 20 + 4 materiais 40 = 118. Levar o robô para a base depois do checkpoint NÃO é penalidade."
        },
        {
          "id": 36,
          "pergunta": "Conte só a Missão 3: 2 blocos na Área Cinza, 2 blocos na Área Amarela e 2 blocos na Área Verde. Esses são os 6 blocos do tapete e todos estão pontuando. Quantos pontos?",
          "opcoes": [
            "96 pontos",
            "108 pontos",
            "116 pontos",
            "128 pontos"
          ],
          "resposta": 2,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "4 blocos × 18 = 72; 2 blocos × 12 = 24; bônus 20 (todos os blocos pontuando). Total 72 + 24 + 20 = 116."
        },
        {
          "id": 37,
          "pergunta": "A cancela ficou levantada sozinha e o Objeto Maker terminou dentro da área. O operador tocou no robô 2 vezes fora da base e os materiais ficaram no tapete, fora do almoxarifado. Quantos pontos?",
          "opcoes": [
            "75 pontos",
            "130 pontos",
            "150 pontos",
            "170 pontos"
          ],
          "resposta": 2,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "Cancela 55 + Maker 75 + 2 materiais ainda com o juiz 20 = 150."
        },
        {
          "id": 38,
          "pergunta": "O Objeto Maker terminou dentro da área, mas a barra da cancela caiu e está tocando o tapete. O livro foi aberto. Houve 1 toque fora da base, e o robô depois levou o caderno para o almoxarifado. Quantos pontos?",
          "opcoes": [
            "75 pontos",
            "85 pontos",
            "130 pontos",
            "160 pontos"
          ],
          "resposta": 1,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "Maker 0 (a cancela não pontuou) + Cancela 0 + Livro 45 + 3 materiais com o juiz 30 + 1 caderno no almoxarifado 10 = 85."
        },
        {
          "id": 39,
          "pergunta": "Conte só a Missão 3: um bloco está tocando a Área Verde e a Área Amarela ao mesmo tempo, e outro bloco está só na Área Amarela. Ainda sobraram blocos que não pontuaram. Quantos pontos?",
          "opcoes": [
            "24 pontos",
            "30 pontos",
            "36 pontos",
            "50 pontos"
          ],
          "resposta": 1,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "Bloco em duas áreas vale a menos vantajosa (Verde = 12) + 18 = 30. Sem bônus, porque nem todos os blocos pontuaram."
        },
        {
          "id": 40,
          "pergunta": "Desafio! Qual é a pontuação MÁXIMA possível somando todas as missões e os materiais escolares, SEM contar a Missão 3?",
          "opcoes": [
            "342 pontos",
            "352 pontos",
            "372 pontos",
            "392 pontos"
          ],
          "resposta": 2,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "30 + 35 + 45 + 42 + 20 + 55 + 75 + 30 + 40 = 372 (depois é só somar os blocos e o bônus da Missão 3)."
        },
        {
          "id": 41,
          "pergunta": "Quanto tempo dura cada partida no Kids 2?",
          "opcoes": [
            "60 segundos",
            "90 segundos",
            "120 segundos (2 minutos)",
            "150 segundos"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "120 segundos, e o cronômetro NUNCA para depois que a partida começa."
        },
        {
          "id": 42,
          "pergunta": "Quantos integrantes da equipe podem ficar na mesa durante a partida?",
          "opcoes": [
            "1",
            "2",
            "3",
            "A equipe toda"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Apenas 2 integrantes na mesa de competição."
        },
        {
          "id": 43,
          "pergunta": "Quantos motores o robô pode usar, no máximo, na mesma partida?",
          "opcoes": [
            "2",
            "3",
            "4",
            "6"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "No máximo 3 motores — e a equipe só pode levar 3 motores para a arena."
        },
        {
          "id": 44,
          "pergunta": "Quantos sensores o robô pode usar, no máximo, na mesma partida?",
          "opcoes": [
            "4",
            "6",
            "8",
            "10"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "No máximo 8 sensores."
        },
        {
          "id": 45,
          "pergunta": "Quantos controladores (o “cérebro” programável) o robô pode ter?",
          "opcoes": [
            "Um único",
            "Dois",
            "Três",
            "Quantos quiser"
          ],
          "resposta": 0,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Um único Controlador Programável Educacional."
        },
        {
          "id": 46,
          "pergunta": "Qual é a altura da Base no Kids 2?",
          "opcoes": [
            "10 cm",
            "15 cm",
            "20 cm",
            "Não tem limite"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "A Base é um VOLUME (uma caixa imaginária) com 20 cm de altura, não só a área pintada."
        },
        {
          "id": 47,
          "pergunta": "Como deve estar o robô na hora da largada?",
          "opcoes": [
            "Com metade para fora da base",
            "Completamente dentro da base e parado",
            "Em cima da área do checkpoint",
            "Andando devagar"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Robô e tudo o que ele leva totalmente dentro da base, sem se mexer. Depois do “3, 2, 1, TBR!” o operador aciona um botão, sensor ou comando."
        },
        {
          "id": 48,
          "pergunta": "Se a equipe joga várias partidas (rounds), qual nota conta para o Desafio Prático?",
          "opcoes": [
            "A soma de todas",
            "A média",
            "A MELHOR partida",
            "A última partida"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Vale a melhor nota entre as partidas."
        },
        {
          "id": 49,
          "pergunta": "Qual é a faixa de idade dos participantes do Kids 2?",
          "opcoes": [
            "5 a 7 anos",
            "7 a 10 anos",
            "10 a 14 anos",
            "Qualquer idade"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "7 a 10 anos (idade em 1º de janeiro do ano do torneio)."
        },
        {
          "id": 50,
          "pergunta": "Além do Desafio Prático, quais outros quesitos a equipe apresenta no torneio?",
          "opcoes": [
            "Só o Desafio Prático",
            "Mérito Científico, Organização & Método e Tecnologia & Engenharia",
            "Apenas uma redação",
            "Dança e música"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "São 4 quesitos, cada um valendo até 500 pontos: Mérito Científico, Organização & Método, Tecnologia & Engenharia e Desafio Prático."
        },
        {
          "id": 51,
          "pergunta": "Pelo desenho da capa do livro da missão Despertar do Conhecimento, qual história ele referencia?",
          "opcoes": [
            "Cinderela",
            "Chapeuzinho Vermelho",
            "Branca de Neve",
            "João e Maria"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "A capa do livro da Missão 4 (Despertar do Conhecimento) traz a história da Chapeuzinho Vermelho."
        },
        {
          "id": 52,
          "pergunta": "Quantos cientistas estão no Hall da Fama?",
          "opcoes": [
            "4",
            "5",
            "6",
            "8"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "São 6 cientistas: Albert Einstein, Nikola Tesla, Isaac Newton, Ada Lovelace, Rosalind Franklin e Marie Curie."
        },
        {
          "id": 53,
          "pergunta": "Qual destes cientistas está no Hall da Fama?",
          "opcoes": [
            "Charles Darwin",
            "Galileu Galilei",
            "Santos Dumont",
            "Ada Lovelace"
          ],
          "resposta": 3,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Ada Lovelace é uma das 6 cientistas do Hall da Fama, junto com Albert Einstein, Nikola Tesla, Isaac Newton, Rosalind Franklin e Marie Curie."
        },
        {
          "id": 54,
          "pergunta": "Qual destes cientistas NÃO está no Hall da Fama?",
          "opcoes": [
            "Isaac Newton",
            "Marie Curie",
            "Charles Darwin",
            "Albert Einstein"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "No Hall da Fama estão Albert Einstein, Nikola Tesla, Isaac Newton, Ada Lovelace, Rosalind Franklin e Marie Curie. Charles Darwin não está entre eles."
        },
        {
          "id": 55,
          "pergunta": "Qual é o número da Missão Maker?",
          "opcoes": [
            "6",
            "7",
            "8",
            "9"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "A Missão Maker é a Missão 8 e vale 75 pontos."
        },
        {
          "id": 56,
          "pergunta": "Qual é o número da missão Acesso Seguro, em que o robô leva o carro até a vaga?",
          "opcoes": [
            "3",
            "4",
            "5",
            "6"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Acesso Seguro é a Missão 5."
        },
        {
          "id": 57,
          "pergunta": "Qual é o número da missão Checkpoint, cuja área também se chama Hall da Fama?",
          "opcoes": [
            "5",
            "6",
            "7",
            "8"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "O Checkpoint é a Missão 6."
        },
        {
          "id": 58,
          "pergunta": "Qual é o nome da Missão 9?",
          "opcoes": [
            "Inauguração da Universidade",
            "Despertar do Conhecimento",
            "Ingresso à Universidade",
            "Alvenaria Educacional"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "A Missão 9 é o Ingresso à Universidade: o robô termina a partida tocando a Área da Universidade."
        },
        {
          "id": 59,
          "pergunta": "Quantos blocos de construção precisam ser levados para as áreas de fundação na missão Alvenaria Educacional?",
          "opcoes": [
            "4",
            "5",
            "6",
            "8"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "São 6 blocos de construção. Só recebe o bônus de 20 pontos a equipe que fizer todos pontuarem."
        },
        {
          "id": 60,
          "pergunta": "Para quais áreas os blocos de construção precisam ser levados na missão Alvenaria Educacional?",
          "opcoes": [
            "Almoxarifado",
            "Áreas de fundação (Verde, Cinza e Amarela)",
            "Hall da Fama",
            "Área da Universidade"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Os blocos vão para as áreas de fundação da escola: Verde, Cinza e Amarela."
        },
        {
          "id": 61,
          "pergunta": "Qual missão precisa estar pontuando no fim da partida para que a Missão Maker seja validada?",
          "opcoes": [
            "Despertar do Conhecimento",
            "Acesso Seguro",
            "Balanço Controlado",
            "Inauguração da Universidade"
          ],
          "resposta": 3,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "A Inauguração da Universidade (cancela levantada, Missão 7) é pré-requisito da Missão Maker. Sem ela, a Maker vale 0."
        },
        {
          "id": 62,
          "pergunta": "Quando o robô toca a área do Checkpoint e a missão é concluída, o que o juiz de mesa faz?",
          "opcoes": [
            "Toca um sino",
            "Coloca uma bandeira no telhado da instituição de ensino ao lado",
            "Acende uma luz na base",
            "Retira um material escolar do tapete"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Após a conclusão da missão, o juiz de mesa coloca uma bandeira no telhado da instituição de ensino ao lado, indicando que o checkpoint foi validado."
        },
        {
          "id": 63,
          "pergunta": "Na Missão 3, qual é a diferença de pontuação entre um bloco na Área Cinza e um bloco na Área Amarela?",
          "opcoes": [
            "Nenhuma: as duas valem 18 pontos",
            "A Cinza vale 6 pontos a mais",
            "A Amarela vale 6 pontos a mais",
            "A Cinza vale o dobro da Amarela"
          ],
          "resposta": 0,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Os blocos nas Áreas Cinza e Amarela valem 18 pontos cada. Só a Área Verde vale menos (12)."
        },
        {
          "id": 64,
          "pergunta": "Na Missão 3, quantos pontos a mais vale um bloco na Área Cinza do que um bloco na Área Verde?",
          "opcoes": [
            "0",
            "3",
            "6",
            "12"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Cinza vale 18 e Verde vale 12: são 6 pontos a mais."
        },
        {
          "id": 65,
          "pergunta": "Um bloco de construção está tocando duas áreas de pontuação diferentes. Qual pontuação vale?",
          "opcoes": [
            "A maior",
            "A menor",
            "A soma das duas",
            "A média das duas"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Vale a condição menos vantajosa, ou seja, a menor pontuação."
        },
        {
          "id": 66,
          "pergunta": "Um bloco está tocando a Área Verde e a Área Amarela ao mesmo tempo. Quanto ele vale?",
          "opcoes": [
            "12 pontos",
            "15 pontos",
            "18 pontos",
            "30 pontos"
          ],
          "resposta": 0,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Vale a menor das duas: Verde = 12 pontos."
        },
        {
          "id": 67,
          "pergunta": "O que acontece se um bloco de construção cai para fora do tapete?",
          "opcoes": [
            "Nada, ele continua valendo",
            "A equipe perde só o bônus da missão",
            "A equipe perde os pontos desse bloco e também o bônus da Missão 3",
            "A partida acaba"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "O bloco fora do tapete não toca nenhuma área de pontuação, então não pontua. Como nem todos os blocos pontuam, a equipe também perde o bônus de 20 pontos."
        },
        {
          "id": 68,
          "pergunta": "Uma equipe tem 5 dos 6 blocos pontuando na Missão 3. O bônus de 20 pontos é concedido?",
          "opcoes": [
            "Sim, o bônus completo",
            "Sim, metade do bônus (10 pontos)",
            "Não: o bônus só vale com todos os blocos pontuando",
            "Só se os 5 blocos estiverem na Área Cinza"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "O bônus de 20 pontos exige que TODOS os blocos estejam pontuando."
        },
        {
          "id": 69,
          "pergunta": "Qual é o 4º material escolar colocado pelo juiz como penalidade?",
          "opcoes": [
            "Caderno amarelo",
            "Lápis vermelho",
            "Tesoura azul",
            "Borracha verde"
          ],
          "resposta": 3,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Ordem: 1 caderno (amarelo), 2 lápis (vermelho), 3 tesoura (azul), 4 borracha (verde)."
        },
        {
          "id": 70,
          "pergunta": "No SEGUNDO toque fora da base, qual material o juiz coloca no tapete?",
          "opcoes": [
            "Lápis vermelho",
            "Caderno amarelo",
            "Borracha verde",
            "Tesoura azul"
          ],
          "resposta": 0,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "O 2º material é o lápis vermelho."
        },
        {
          "id": 71,
          "pergunta": "Quantos pontos vale a missão Checkpoint, quando o robô toca o Hall da Fama?",
          "opcoes": [
            "10",
            "20",
            "30",
            "45"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "O Checkpoint vale 20 pontos. Depois, o robô é levado para a base sem penalidade."
        },
        {
          "id": 72,
          "pergunta": "Quantos pontos vale a Missão 9 (Ingresso à Universidade), com o robô tocando a Área da Universidade no fim da partida?",
          "opcoes": [
            "20",
            "30",
            "45",
            "55"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "A Missão 9 vale 30 pontos."
        },
        {
          "id": 73,
          "pergunta": "Quais são os cientistas que estão no Hall da Fama?",
          "opcoes": [
            "Albert Einstein, Nikola Tesla, Isaac Newton, Ada Lovelace, Rosalind Franklin e Marie Curie",
            "Albert Einstein, Charles Darwin, Isaac Newton, Ada Lovelace, Rosalind Franklin e Marie Curie",
            "Albert Einstein, Nikola Tesla, Galileu Galilei, Ada Lovelace, Rosalind Franklin e Marie Curie",
            "Albert Einstein, Nikola Tesla, Isaac Newton, Alan Turing, Rosalind Franklin e Marie Curie"
          ],
          "resposta": 0,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "No Hall da Fama estão Albert Einstein, Nikola Tesla, Isaac Newton, Ada Lovelace, Rosalind Franklin e Marie Curie. Nas outras opções entrou um cientista que não está lá."
        },
        {
          "id": 74,
          "pergunta": "Missão 3 com os 6 blocos: 3 na Área Cinza, 2 na Área Amarela e 1 na Área Verde. Todos pontuam. Quantos pontos a missão vale?",
          "opcoes": [
            "102 pontos",
            "108 pontos",
            "122 pontos",
            "128 pontos"
          ],
          "resposta": 2,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "5 blocos × 18 = 90; 1 bloco × 12 = 12; bônus 20 (todos pontuam). Total 90 + 12 + 20 = 122."
        },
        {
          "id": 75,
          "pergunta": "Missão 3: 4 blocos nas Áreas Cinza ou Amarela, 1 bloco tocando a Área Verde e a Cinza ao mesmo tempo e 1 bloco caiu para fora do tapete. Quantos pontos?",
          "opcoes": [
            "72 pontos",
            "84 pontos",
            "90 pontos",
            "104 pontos"
          ],
          "resposta": 1,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "4 blocos × 18 = 72; o bloco em duas áreas vale a menor (Verde = 12). O bloco fora do tapete vale 0 e não há bônus. Total 72 + 12 = 84."
        },
        {
          "id": 76,
          "pergunta": "Qual é o nome da Missão 2, em que o robô posiciona a Peça Faltante do quebra-cabeça?",
          "opcoes": [
            "Despertar do Conhecimento",
            "Alvenaria Educacional",
            "Conexão do Conhecimento",
            "Balanço Controlado"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "A Missão 2 é a Conexão do Conhecimento."
        },
        {
          "id": 77,
          "pergunta": "Ao posicionar a Peça Faltante no quebra-cabeça da Missão 2, o que o desenho forma?",
          "opcoes": [
            "O logotipo do torneio",
            "O tema da temporada 2026",
            "O mapa do Brasil",
            "O nome da equipe"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "O robô posiciona a peça dentro da área correspondente, formando o tema da temporada 2026."
        },
        {
          "id": 78,
          "pergunta": "De que cor são as peças do ponto de apoio central da gangorra, na Missão 1?",
          "opcoes": [
            "Azuis",
            "Verdes",
            "Vermelhas",
            "Amarelas"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "O ponto de apoio central da gangorra é feito de peças vermelhas."
        },
        {
          "id": 79,
          "pergunta": "A vaga do estacionamento da Missão 5 é composta por qual cor? (A faixa amarela serve apenas para delimitá-la.)",
          "opcoes": [
            "Branca",
            "Cinza claro",
            "Verde escuro",
            "Vermelha"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "A vaga é composta pela cor cinza claro, delimitada pela faixa amarela."
        },
        {
          "id": 80,
          "pergunta": "Em que posição o livro da Missão 4 começa a partida?",
          "opcoes": [
            "Aberto",
            "Fechado",
            "Dentro da Base",
            "Nas mãos do juiz"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "O livro começa a partida fechado, em um local determinado do tapete, e o robô precisa abri-lo."
        },
        {
          "id": 81,
          "pergunta": "Segundo o manual, o que o gesto de levantar a cancela (Missão 7) representa?",
          "opcoes": [
            "O fim da partida",
            "A liberação do estacionamento",
            "A abertura de novas oportunidades e o compromisso com a educação avançada e inclusiva",
            "A entrada da equipe no Hall da Fama"
          ],
          "resposta": 2,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Levantar a cancela permite o acesso oficial ao ensino superior e representa a abertura de novas oportunidades e o compromisso com a educação avançada e inclusiva para todos."
        },
        {
          "id": 82,
          "pergunta": "Quem constrói o ambiente escolar e o Objeto Maker da Missão 8?",
          "opcoes": [
            "A própria equipe",
            "Os organizadores do torneio",
            "O juiz de mesa",
            "Eles vêm prontos no kit oficial"
          ],
          "resposta": 0,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "O ambiente escolar tecnológico e o Objeto Maker são projetados e construídos pela própria equipe."
        },
        {
          "id": 83,
          "pergunta": "Em posse de quem ficam os materiais escolares no começo da partida?",
          "opcoes": [
            "Da equipe, dentro da Base",
            "Do juiz de mesa",
            "No almoxarifado",
            "Espalhados pelo tapete"
          ],
          "resposta": 1,
          "pontos": 10,
          "dificuldade": "Fácil",
          "explicacao": "Os materiais escolares começam em posse do juiz de mesa, que os coloca no tapete a cada penalidade."
        },
        {
          "id": 84,
          "pergunta": "Quando a gangorra da Missão 1 precisa estar na posição de pontuação para valer pontos?",
          "opcoes": [
            "Em qualquer momento da partida",
            "Ao final da partida",
            "Só nos primeiros 30 segundos",
            "Por pelo menos 10 segundos seguidos"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Para pontuar, a gangorra deve estar em posição de pontuação ao final da partida."
        },
        {
          "id": 85,
          "pergunta": "Para pontuar na Missão 9 (Ingresso à Universidade), quanto do robô precisa estar tocando a área da universidade ao fim da partida?",
          "opcoes": [
            "O robô inteiro dentro da área",
            "Qualquer parte do robô",
            "Pelo menos metade do robô",
            "As duas rodas"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "A pontuação é válida se, ao final da partida, qualquer parte do robô estiver tocando a área da universidade, delimitada pela cor cinza claro."
        },
        {
          "id": 86,
          "pergunta": "O robô toca a área do Checkpoint duas vezes na mesma partida. Quantas vezes os 20 pontos são contados?",
          "opcoes": [
            "Duas vezes (40 pontos)",
            "Uma única vez (20 pontos)",
            "Nenhuma, porque o robô ficou inativo duas vezes",
            "Só conta a segunda vez"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "A pontuação do Checkpoint e a volta à base são válidas apenas uma vez."
        },
        {
          "id": 87,
          "pergunta": "Em que momento da partida o robô pode transportar o Objeto Maker da Base para o ambiente escolar?",
          "opcoes": [
            "Somente nos primeiros 30 segundos",
            "Somente depois do Checkpoint",
            "Em qualquer momento da partida",
            "Somente no final da partida"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "O robô pode transportar o Objeto Maker da Base em qualquer momento durante a partida."
        },
        {
          "id": 88,
          "pergunta": "Existe limite de tamanho para o Objeto Maker?",
          "opcoes": [
            "O tamanho é definido pelo juiz no dia do torneio",
            "Deve ter exatamente o tamanho de um bloco de construção",
            "Deve ser comprado pronto no kit oficial",
            "Não há limite de altura ou largura, desde que o robô consiga manipulá-lo e o conjunto robô + Objeto Maker caiba completamente na Base"
          ],
          "resposta": 3,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Não há limitação de altura ou largura, desde que o robô manipule o objeto e o conjunto robô + Objeto Maker caiba completamente na Base."
        },
        {
          "id": 89,
          "pergunta": "Quais materiais a equipe pode usar para construir o ambiente escolar da Missão Maker?",
          "opcoes": [
            "Somente materiais não elétricos",
            "Somente peças do kit oficial",
            "Somente papel e papelão",
            "Qualquer material, elétrico ou não, respeitando a segurança e a integridade do tapete"
          ],
          "resposta": 3,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Não há restrição de materiais elétricos e não elétricos. A equipe tem liberdade criativa, desde que respeite a segurança e a integridade do tapete."
        },
        {
          "id": 90,
          "pergunta": "A equipe usou cola no tapete na Missão Maker e o juiz não validou a missão. O que acontece?",
          "opcoes": [
            "A equipe é desclassificada",
            "A equipe perde todos os pontos da partida",
            "A equipe não pontua a Missão Maker naquela partida e pode corrigir para a rodada seguinte",
            "A equipe perde 10 pontos"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Se a irregularidade persistir e a missão não for validada, a equipe fica impossibilitada de pontuar a Missão Maker naquela partida, podendo corrigi-la na rodada seguinte, se houver."
        },
        {
          "id": 91,
          "pergunta": "Antes de o juiz aplicar a penalidade, o que acontece com qualquer objeto que esteja na área destinada a ela?",
          "opcoes": [
            "Ele volta para a Base",
            "Ele é retirado da partida para liberar o espaço",
            "O material escolar é colocado em cima dele",
            "A penalidade não é aplicada"
          ],
          "resposta": 1,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Antes da aplicação da penalidade, qualquer objeto presente na área destinada a ela é retirado da partida para liberar o espaço."
        },
        {
          "id": 92,
          "pergunta": "Como as montagens (modelos de missão) são fixadas no tapete?",
          "opcoes": [
            "Com cola quente",
            "Com velcro",
            "Com parafusos",
            "Com fita adesiva dupla face de alta aderência nos quadradinhos vermelhos"
          ],
          "resposta": 3,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Os quadradinhos vermelhos do tapete recebem um pedaço de fita adesiva dupla face de alta aderência para fixar cada montagem."
        },
        {
          "id": 93,
          "pergunta": "Houve 3 toques fora da base: caderno, lápis e tesoura foram colocados no tapete. O robô levou o caderno e o lápis para o almoxarifado; a tesoura ficou no tapete e a borracha ficou com o juiz. Quantos pontos valem os materiais escolares?",
          "opcoes": [
            "10 pontos",
            "20 pontos",
            "30 pontos",
            "40 pontos"
          ],
          "resposta": 2,
          "pontos": 20,
          "dificuldade": "Médio",
          "explicacao": "Caderno 10 + lápis 10 (almoxarifado) + borracha com o juiz 10 = 30. A tesoura, fora do almoxarifado, vale 0."
        },
        {
          "id": 94,
          "pergunta": "Sem nenhum toque fora da base: gangorra na posição correta, peça faltante PARCIALMENTE dentro, carro TOTALMENTE dentro da vaga, cancela levantada e robô tocando o Checkpoint (depois voltou à base). Quantos pontos, contando os materiais escolares?",
          "opcoes": [
            "167 pontos",
            "188 pontos",
            "207 pontos",
            "227 pontos"
          ],
          "resposta": 2,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "Gangorra 30 + peça 20 + carro 42 + cancela 55 + Checkpoint 20 + 4 materiais com o juiz 40 = 207."
        },
        {
          "id": 95,
          "pergunta": "A barra da cancela caiu e está tocando o tapete. O Objeto Maker terminou dentro da área e o robô terminou tocando a Área da Universidade. Não houve toque fora da base. Quantos pontos?",
          "opcoes": [
            "40 pontos",
            "70 pontos",
            "105 pontos",
            "145 pontos"
          ],
          "resposta": 1,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "Cancela 0 e Missão Maker 0 (sem a Missão 7 a Maker não é validada) + Universidade 30 + 4 materiais com o juiz 40 = 70."
        },
        {
          "id": 96,
          "pergunta": "Qual é a pontuação máxima possível no Desafio Prático Kids 2, com todas as missões, a Missão 3 completa (6 blocos nas Áreas Cinza ou Amarela, mais o bônus) e os 4 materiais escolares?",
          "opcoes": [
            "372 pontos",
            "450 pontos",
            "500 pontos",
            "600 pontos"
          ],
          "resposta": 2,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "Sem a Missão 3 são 372 pontos. A Missão 3 completa vale 6 × 18 + 20 = 128. Total: 372 + 128 = 500, o máximo do quesito."
        }
    ]}
};

// =================================================================================
// Banco de dados (Firebase Firestore via REST) com reserva em localStorage
// =================================================================================
// Preencha firebase-config.js para ativar o ranking público online.
// Sem configuração, o ranking fica só neste navegador (modo teste).
const FIREBASE = window.FIREBASE_CONFIG || {};
const FIREBASE_ATIVO = Boolean(FIREBASE.apiKey && FIREBASE.projectId);
const FIRESTORE_DOCS = `https://firestore.googleapis.com/v1/projects/${FIREBASE.projectId}/databases/(default)/documents`;
const COLECAO_RANKING = 'ranking';
const CHAVE_LOCAL = 'quizDesafioPraticoRanking';
const LIMITE_BUSCA = 300;   // entradas lidas do banco; depois removemos repetidas e mostramos o TOP 10
const TAMANHO_RANKING = 10;

function normalizarTexto(texto) {
    return String(texto || '').replace(/\s+/g, ' ').trim();
}

function entradaParaDocumento(e) {
    return { fields: {
        nome: { stringValue: e.nome },
        equipe: { stringValue: e.equipe },
        pontuacao: { integerValue: String(e.pontuacao) },
        percentual: { integerValue: String(e.percentual) },
        tempoSegundos: { integerValue: String(e.tempoSegundos) },
        data: { timestampValue: e.data }
    } };
}

function documentoParaEntrada(doc) {
    const f = doc.fields || {};
    return {
        nome: f.nome?.stringValue || '',
        equipe: f.equipe?.stringValue || '',
        pontuacao: Number(f.pontuacao?.integerValue || 0),
        percentual: Number(f.percentual?.integerValue || 0),
        tempoSegundos: Number(f.tempoSegundos?.integerValue || 0),
        data: f.data?.timestampValue || ''
    };
}

async function lerEntradas() {
    if (!FIREBASE_ATIVO) {
        try {
            return JSON.parse(localStorage.getItem(CHAVE_LOCAL) || '[]');
        } catch (erro) {
            return [];
        }
    }
    const resposta = await fetch(`${FIRESTORE_DOCS}:runQuery?key=${encodeURIComponent(FIREBASE.apiKey)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ structuredQuery: {
            from: [{ collectionId: COLECAO_RANKING }],
            orderBy: [{ field: { fieldPath: 'pontuacao' }, direction: 'DESCENDING' }],
            limit: LIMITE_BUSCA
        } })
    });
    if (!resposta.ok) throw new Error(`Firestore respondeu ${resposta.status}`);
    const linhas = await resposta.json();
    return linhas.filter(l => l.document).map(l => documentoParaEntrada(l.document));
}

async function gravarEntrada(entrada) {
    if (!FIREBASE_ATIVO) {
        const entradas = await lerEntradas();
        entradas.push(entrada);
        localStorage.setItem(CHAVE_LOCAL, JSON.stringify(entradas));
        return;
    }
    const resposta = await fetch(`${FIRESTORE_DOCS}/${COLECAO_RANKING}?key=${encodeURIComponent(FIREBASE.apiKey)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entradaParaDocumento(entrada))
    });
    if (!resposta.ok) throw new Error(`Firestore respondeu ${resposta.status}`);
}

// Mantém só a melhor tentativa de cada pessoa (mesmo nome + mesma equipe) e ordena:
// maior pontuação primeiro; em empate, quem usou menos tempo.
function montarRanking(entradas) {
    const melhores = new Map();
    entradas.forEach(e => {
        const chave = `${e.nome}|${e.equipe}`.toLowerCase();
        const atual = melhores.get(chave);
        if (!atual || e.pontuacao > atual.pontuacao ||
            (e.pontuacao === atual.pontuacao && e.tempoSegundos < atual.tempoSegundos)) {
            melhores.set(chave, e);
        }
    });
    return [...melhores.values()].sort((a, b) =>
        b.pontuacao - a.pontuacao || a.tempoSegundos - b.tempoSegundos);
}

// Carregar dados do quiz
async function carregarDados() {
    quizData = quizDataEmbutido;
    return true;
}

// Busca o ranking e preenche a tabela do TOP 10 e a lista de equipes sugeridas
async function atualizarRanking() {
    const rankingBody = document.getElementById('ranking-body');
    rankingBody.innerHTML = '<tr><td colspan="4" class="ranking-aviso">Carregando ranking...</td></tr>';

    try {
        rankingAtual = montarRanking(await lerEntradas());
    } catch (erro) {
        console.error('Erro ao carregar o ranking:', erro);
        rankingBody.innerHTML = '<tr><td colspan="4" class="ranking-aviso">Não foi possível carregar o ranking agora.</td></tr>';
        return;
    }

    atualizarSugestoesEquipe();

    if (rankingAtual.length === 0) {
        rankingBody.innerHTML = '<tr><td colspan="4" class="ranking-aviso">Ainda não há participantes. Seja o primeiro!</td></tr>';
        return;
    }

    rankingBody.innerHTML = '';
    rankingAtual.slice(0, TAMANHO_RANKING).forEach((item, indice) => {
        const tr = document.createElement('tr');
        [indice + 1, item.nome, item.equipe, item.pontuacao].forEach(valor => {
            const td = document.createElement('td');
            td.textContent = valor;
            tr.appendChild(td);
        });
        rankingBody.appendChild(tr);
    });
}

// Sugere nomes de equipes já cadastrados, para evitar grafias diferentes da mesma equipe
function atualizarSugestoesEquipe() {
    const lista = document.getElementById('lista-equipes');
    if (!lista) return;
    const equipes = new Map();
    rankingAtual.forEach(e => equipes.set(e.equipe.toLowerCase(), e.equipe));
    lista.innerHTML = '';
    [...equipes.values()].sort((a, b) => a.localeCompare(b, 'pt-BR')).forEach(nome => {
        const opcao = document.createElement('option');
        opcao.value = nome;
        lista.appendChild(opcao);
    });
}

// Inicializar o quiz
async function inicializarQuiz() {
    const dadosCarregados = await carregarDados();
    if (!dadosCarregados) return;

    if (!FIREBASE_ATIVO) {
        console.warn('Firebase não configurado (firebase-config.js): ranking salvo apenas neste navegador.');
        document.getElementById('aviso-modo-local').classList.remove('hidden');
    }

    document.getElementById('btn-iniciar-quiz').addEventListener('click', function() {
        document.getElementById('tela-inicial').classList.add('hidden');
        document.getElementById('tela-identificacao').classList.remove('hidden');
    });

    document.getElementById('form-registro').addEventListener('submit', function(e) {
        e.preventDefault();
        iniciarQuiz();
    });

    document.getElementById('btn-proxima').addEventListener('click', proximaPergunta);
    document.getElementById('btn-finalizar').addEventListener('click', reiniciarQuiz);

    atualizarRanking();
}

// Iniciar o quiz após preenchimento do formulário
function iniciarQuiz() {
    const nome = normalizarTexto(document.getElementById('nome').value);
    const equipe = normalizarTexto(document.getElementById('equipe').value);

    if (nome.length < 2 || equipe.length < 2) {
        alert('Por favor, preencha o nome e a equipe.');
        return;
    }

    participante = { nome: nome, equipe: equipe };
    resultadoSalvo = false;

    sortearPerguntas();
    respostas = Array(perguntasSorteadas.length).fill(null);
    tempoRestante = TEMPO_QUIZ_SEGUNDOS;

    document.getElementById('tela-identificacao').classList.add('hidden');
    mostrarTelaPergunta();
    mostrarPergunta(0);
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
    const { numeroQuestoesFaceis, numeroQuestoesMedias, numeroQuestoesDificeis } = quizData.configuracao;
    const todas = quizData.quiz.perguntas;

    const sortearNivel = (nivel, quantidade) => {
        const doNivel = todas.filter(p => p.dificuldade === nivel);
        embaralharArray(doNivel);
        return doNivel.slice(0, quantidade);
    };

    const selecionadas = [
        ...sortearNivel('Fácil', numeroQuestoesFaceis),
        ...sortearNivel('Médio', numeroQuestoesMedias),
        ...sortearNivel('Difícil', numeroQuestoesDificeis)
    ];

    // Embaralhar a ordem final e a ordem das alternativas de cada pergunta
    embaralharArray(selecionadas);
    perguntasSorteadas = selecionadas.map(embaralharOpcoes);
}

// Devolve uma cópia da pergunta com as alternativas embaralhadas e o índice da resposta correta ajustado
function embaralharOpcoes(pergunta) {
    const ordem = pergunta.opcoes.map((_, i) => i);
    embaralharArray(ordem);
    return {
        ...pergunta,
        opcoes: ordem.map(i => pergunta.opcoes[i]),
        resposta: ordem.indexOf(pergunta.resposta)
    };
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
    const pontuacaoMaxima = perguntasSorteadas.reduce((sum, p) => sum + p.pontos, 0);

    perguntasSorteadas.forEach((pergunta, i) => {
        if (respostas[i] === pergunta.resposta) {
            pontuacaoTotal += pergunta.pontos;
        }
    });

    const percentual = Math.round((pontuacaoTotal / pontuacaoMaxima) * 100);
    const tempoSegundos = Math.min(TEMPO_QUIZ_SEGUNDOS, Math.max(0, TEMPO_QUIZ_SEGUNDOS - tempoRestante));

    document.getElementById('pontos').textContent = pontuacaoTotal;
    document.getElementById('pontos-total').textContent = pontuacaoMaxima;
    document.getElementById('percentual').textContent = percentual;

    let mensagem = '';
    if (percentual >= 80) {
        mensagem = `Parabéns, ${participante.nome}! Você domina as regras do Desafio Prático!`;
    } else if (percentual >= 50) {
        mensagem = `Muito bem, ${participante.nome}! Você conhece bem o Desafio Prático!`;
    } else {
        mensagem = `Obrigado por participar, ${participante.nome}! Revise as regras abaixo e tente de novo!`;
    }
    document.getElementById('mensagem-resultado').textContent = mensagem;

    mostrarRevisao();

    document.getElementById('tela-pergunta').classList.add('hidden');
    document.getElementById('tela-resultado').classList.remove('hidden');

    salvarParticipante(percentual, tempoSegundos);
}

// Lista as perguntas erradas ou sem resposta, com a resposta certa e a explicação
function mostrarRevisao() {
    const lista = document.getElementById('revisao-lista');
    const titulo = document.getElementById('revisao-titulo');
    lista.innerHTML = '';

    const erradas = perguntasSorteadas
        .map((pergunta, i) => ({ pergunta, resposta: respostas[i] }))
        .filter(item => item.resposta !== item.pergunta.resposta);

    if (erradas.length === 0) {
        titulo.textContent = 'Você acertou todas as perguntas!';
        return;
    }
    titulo.textContent = `Para revisar (${erradas.length})`;

    erradas.forEach(({ pergunta, resposta }) => {
        const item = document.createElement('div');
        item.className = 'revisao-item';

        const enunciado = document.createElement('p');
        enunciado.className = 'revisao-pergunta';
        enunciado.textContent = pergunta.pergunta;

        const sua = document.createElement('p');
        sua.className = 'revisao-errada';
        sua.textContent = resposta === null ? 'Você não respondeu.' : `Sua resposta: ${pergunta.opcoes[resposta]}`;

        const certa = document.createElement('p');
        certa.className = 'revisao-certa';
        certa.textContent = `Resposta certa: ${pergunta.opcoes[pergunta.resposta]}`;

        const explicacao = document.createElement('p');
        explicacao.className = 'revisao-explicacao';
        explicacao.textContent = pergunta.explicacao;

        item.append(enunciado, sua, certa, explicacao);
        lista.appendChild(item);
    });
}

// Salva o resultado no ranking (Firestore ou, sem configuração, localStorage)
async function salvarParticipante(percentual, tempoSegundos) {
    if (resultadoSalvo) return;
    resultadoSalvo = true;

    const status = document.getElementById('status-ranking');
    status.textContent = 'Salvando no ranking...';

    try {
        await gravarEntrada({
            nome: participante.nome,
            equipe: participante.equipe,
            pontuacao: pontuacaoTotal,
            percentual: percentual,
            tempoSegundos: tempoSegundos,
            data: new Date().toISOString()
        });
        status.textContent = FIREBASE_ATIVO
            ? 'Sua pontuação foi salva no ranking!'
            : 'Modo teste: pontuação salva só neste navegador.';
    } catch (erro) {
        console.error('Erro ao salvar no ranking:', erro);
        status.textContent = 'Não foi possível salvar sua pontuação no ranking. Verifique a conexão.';
    }
}

// Voltar para a tela inicial
function reiniciarQuiz() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    document.getElementById('tela-resultado').classList.add('hidden');
    document.getElementById('tela-inicial').classList.remove('hidden');
    document.getElementById('form-registro').reset();

    atualizarRanking();

    perguntasSorteadas = [];
    respostas = [];
    perguntaAtual = 0;
    pontuacaoTotal = 0;
    participante = { nome: "", equipe: "" };
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarQuiz);
