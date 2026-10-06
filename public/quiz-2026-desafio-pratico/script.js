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
    "descricao": "50 questões de múltipla escolha sobre missões, pontuação, penalidades e regras do Desafio Prático",
    "equipe": "Capibots · TBR Kids 2 · Temporada 2026",
    "tema": "Desafio Prático — Educação em Construção",
    "total_questoes": 50,
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
          "pergunta": "Conte só a Missão 3: 2 blocos na Área Cinza, 1 bloco na Área Amarela e 1 bloco na Área Verde. Imagine que esses eram TODOS os blocos do tapete. Quantos pontos?",
          "opcoes": [
            "66 pontos",
            "72 pontos",
            "86 pontos",
            "92 pontos"
          ],
          "resposta": 2,
          "pontos": 30,
          "dificuldade": "Difícil",
          "explicacao": "3 blocos × 18 = 54; 1 bloco × 12 = 12; bônus 20. Total 54 + 12 + 20 = 86."
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
