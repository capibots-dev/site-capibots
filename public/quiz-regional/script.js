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
        "nome": "Lápis Ecológico",
        "imagem": "images/lapis_ecologico.jpg",
        "quantidade": 33,
        "notaMinima": 0,
        "notaMaxima": 69
      },
      {
        "nome": "Tag Capivara",
        "imagem": "images/chaveiro_capivara.jpg",
        "quantidade": 48,
        "notaMinima": 70,
        "notaMaxima": 84
      },
      {
        "nome": "Chaveiro Capiney",
        "imagem": "images/chaveiro_capiney.jpeg",
        "quantidade": 34,
        "notaMinima": 85,
        "notaMaxima": 100
      }
    ]
  },
  "quiz": {
    "titulo": "Capibot Aprende+ — Quiz do Estande",
    "descricao": "50 questões de múltipla escolha para ativação no estande — conectividade, educação e tecnologia offline",
    "equipe": "Capibots · TBR Kids 2 · Temporada 2026",
    "tema": "ODS 4 — Educação, Trabalho e Sustentabilidade",
    "total_questoes": 65,
    "niveis": {
      "1": "Fácil",
      "2": "Médio",
      "3": "Difícil",
      "4": "Especialista"
    },
    "perguntas": [
      {
        "id": 1,
        "pergunta": "O que significa uma criança não ter internet em casa?",
        "opcoes": [
          "Ela não pode assistir filmes em casa",
          "Ela não consegue estudar, pesquisar ou fazer trabalhos escolares online em casa",
          "Ela não pode usar o celular",
          "Ela não tem televisão"
        ],
        "resposta": 1,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Sem internet em casa, a criança perde acesso à pesquisa, videoaulas e ferramentas de estudo que ajudam no aprendizado fora da escola."
      },
      {
        "id": 2,
        "pergunta": "Em quais regiões do Brasil o problema de falta de internet em casa é mais grave?",
        "opcoes": [
          "Sul e Sudeste",
          "Centro-Oeste",
          "Norte e Nordeste, especialmente na zona rural",
          "Somente nas capitais"
        ],
        "resposta": 2,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "As regiões Norte e Nordeste e a zona rural concentram os maiores índices de crianças sem acesso à internet em casa."
      },
      {
        "id": 3,
        "pergunta": "O que significa um aplicativo funcionar 'offline'?",
        "opcoes": [
          "Ele funciona só de noite",
          "Ele funciona sem precisar de internet",
          "Ele funciona só com Wi-Fi",
          "Ele não precisa de celular"
        ],
        "resposta": 1,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Offline significa que o aplicativo roda sem necessidade de conexão com a internet, usando apenas o que foi baixado no dispositivo."
      },
      {
        "id": 4,
        "pergunta": "O que é o ODS 4?",
        "opcoes": [
          "Um programa de saúde pública",
          "Um objetivo global que fala sobre educação de qualidade para todos",
          "Uma lei brasileira sobre tecnologia",
          "Um torneio de robótica"
        ],
        "resposta": 1,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "O ODS 4 é o Objetivo de Desenvolvimento Sustentável que busca garantir educação de qualidade, inclusiva e equitativa para todas as pessoas."
      },
      {
        "id": 5,
        "pergunta": "Qual das seguintes ferramentas de inteligência artificial você PRECISA de internet para usar?",
        "opcoes": [
          "Uma calculadora instalada no celular",
          "ChatGPT, Gemini e Claude",
          "Um dicionário baixado no aparelho",
          "Um jogo instalado no celular"
        ],
        "resposta": 1,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Ferramentas como ChatGPT, Gemini e Claude rodam em servidores gigantes na nuvem — sem internet, elas param completamente. É exatamente esse o problema para quem não tem conexão em casa!"
      },
      {
        "id": 6,
        "pergunta": "O que é o IBGE?",
        "opcoes": [
          "Um aplicativo de estudos",
          "Um instituto que faz pesquisas e coleta dados sobre o Brasil",
          "Um programa do governo para conectar escolas",
          "Uma empresa de tecnologia"
        ],
        "resposta": 1,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "O IBGE (Instituto Brasileiro de Geografia e Estatística) é o órgão responsável por coletar e divulgar dados sobre a população e a realidade brasileira."
      },
      {
        "id": 7,
        "pergunta": "O que acontece com os aplicativos que precisam de internet quando os dados móveis do celular acabam?",
        "opcoes": [
          "Eles ficam mais lentos, mas continuam funcionando",
          "Somente as redes sociais são bloqueadas",
          "Todos os aplicativos que dependem de conexão param de funcionar",
          "O celular desliga automaticamente para economizar bateria"
        ],
        "resposta": 2,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Sem dados e sem Wi-Fi, qualquer app que depende de internet simplesmente para. Para 22% das crianças mais pobres do Brasil, acabar os créditos é uma realidade frequente — e significa parar de estudar."
      },
      {
        "id": 8,
        "pergunta": "Qual é a atividade número 1 que as crianças fazem na internet, segundo a TIC Kids Online?",
        "opcoes": [
          "Assistir vídeos engraçados",
          "Jogar videogame",
          "Pesquisar para trabalhos da escola",
          "Ouvir músicas"
        ],
        "resposta": 2,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "81% das crianças entrevistadas na TIC Kids Online 2025 declararam que pesquisam para trabalhos escolares — a atividade mais realizada na internet."
      },
      {
        "id": 9,
        "pergunta": "O que o governo brasileiro está fazendo para levar internet às escolas?",
        "opcoes": [
          "Nada ainda",
          "Distribuindo celulares para os alunos",
          "Investindo em programas como ENEC e GESAC para conectar as escolas públicas",
          "Construindo novas escolas"
        ],
        "resposta": 2,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "O governo investe por meio da ENEC (Estratégia Nacional de Escolas Conectadas) e do GESAC/Wi-Fi Brasil para levar internet às escolas públicas."
      },
      {
        "id": 10,
        "pergunta": "Como a equipe Capibots fez a pesquisa nesta primeira fase?",
        "opcoes": [
          "Viajando para escolas rurais do Brasil",
          "Pesquisando dados públicos e oficiais de fontes confiáveis",
          "Criando um aplicativo e testando com crianças",
          "Fazendo entrevistas nas ruas"
        ],
        "resposta": 1,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Na primeira fase, a equipe focou em pesquisa bibliográfica e documental, lendo dados de fontes como IBGE, INEP, CETIC e OCDE."
      },
      {
        "id": 11,
        "pergunta": "Qual desses conteúdos você consegue acessar no celular SEM precisar de internet?",
        "opcoes": [
          "Um vídeo do YouTube",
          "Uma pesquisa no Google",
          "Um livro ou jogo que você baixou antes",
          "Uma mensagem no WhatsApp"
        ],
        "resposta": 2,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Conteúdos baixados ficam guardados no celular e funcionam sem conexão — mesmo em locais sem sinal! Livros, jogos e até modelos de IA podem ser baixados com antecedência e usados depois, em qualquer lugar."
      },
      {
        "id": 12,
        "pergunta": "Qual aparelho as crianças mais pobres usam para acessar a internet?",
        "opcoes": [
          "Computador de mesa",
          "Notebook",
          "Celular",
          "Tablet"
        ],
        "resposta": 2,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Nas classes D e E, só 7% das crianças têm computador em casa, mas o celular é acessível à maioria. Isso significa que qualquer solução educativa para crianças de baixa renda precisa funcionar bem no celular."
      },
      {
        "id": 13,
        "pergunta": "Quantas crianças e adolescentes de 9 a 17 anos não têm internet em casa no Brasil?",
        "opcoes": [
          "1 milhão",
          "4,8 milhões",
          "10 milhões",
          "500 mil"
        ],
        "resposta": 1,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "Segundo a TIC Kids Online, 4,8 milhões de crianças e adolescentes de 9 a 17 anos vivem em domicílios sem acesso à internet."
      },
      {
        "id": 14,
        "pergunta": "Qual percentual das crianças na zona rural não tem internet em casa?",
        "opcoes": [
          "5%",
          "10%",
          "25%",
          "50%"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "Na zona rural, 25% das crianças de 9 a 17 anos não têm internet em casa, uma taxa muito acima da média nacional de 17%."
      },
      {
        "id": 15,
        "pergunta": "Segundo o Censo Escolar 2024, qual percentual das escolas públicas tinha internet?",
        "opcoes": [
          "50%",
          "70%",
          "90%",
          "100%"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "O Censo Escolar 2024 mostrou que 90% das escolas públicas já tinham internet, evidenciando o avanço da conectividade escolar."
      },
      {
        "id": 16,
        "pergunta": "Qual percentual das escolas de Ensino Fundamental disponibilizava internet para os alunos usarem?",
        "opcoes": [
          "90%",
          "75%",
          "48,8%",
          "20%"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "Apesar de 90% das escolas terem internet, só 48,8% das escolas de Ensino Fundamental a disponibilizavam para uso dos alunos."
      },
      {
        "id": 17,
        "pergunta": "Quanto o governo federal investiu na Estratégia Nacional de Escolas Conectadas (ENEC)?",
        "opcoes": [
          "R$ 500 milhões",
          "R$ 2 bilhões",
          "R$ 8,8 bilhões",
          "R$ 50 bilhões"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "A ENEC prevê investimento de R$ 8,8 bilhões para conectar todas as escolas públicas brasileiras até o final de 2026."
      },
      {
        "id": 18,
        "pergunta": "Segundo a TIC Kids Online 2025, qual percentual das crianças acessava a internet de casa?",
        "opcoes": [
          "60%",
          "75%",
          "85%",
          "95%"
        ],
        "resposta": 3,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "95% das crianças acessavam a internet de casa — confirmando que o domicílio é o principal local de acesso, o que torna a exclusão domiciliar ainda mais grave."
      },
      {
        "id": 19,
        "pergunta": "Segundo a TIC Kids Online 2025, qual percentual das crianças já usou inteligência artificial?",
        "opcoes": [
          "20%",
          "40%",
          "65%",
          "90%"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "65% das crianças e adolescentes já usaram ferramentas de IA generativa, sendo que 59% usaram para fazer pesquisas escolares ou estudar."
      },
      {
        "id": 20,
        "pergunta": "O acesso à internet na escola, segundo a TIC Kids 2025, caiu para qual percentual?",
        "opcoes": [
          "70%",
          "55%",
          "37%",
          "20%"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "O acesso na escola caiu de 51% (2024) para 37% (2025) após a lei que restringiu celulares nas escolas, tornando a criança ainda mais dependente da internet em casa."
      },
      {
        "id": 21,
        "pergunta": "Quantos pontos de diferença o PISA 2022 registrou entre alunos ricos e pobres em matemática no Brasil?",
        "opcoes": [
          "20 pontos",
          "45 pontos",
          "77 pontos",
          "102 pontos"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "O PISA 2022 mostrou diferença de 77 pontos em matemática entre os 25% mais ricos e os 25% mais pobres dos estudantes brasileiros."
      },
      {
        "id": 22,
        "pergunta": "O que é o programa GESAC / Wi-Fi Brasil?",
        "opcoes": [
          "Um aplicativo educativo do governo",
          "Um programa que leva internet via satélite para escolas em locais remotos",
          "Uma rede social para professores",
          "Um sistema de avaliação de alunos"
        ],
        "resposta": 1,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "O GESAC/Wi-Fi Brasil é um programa do Ministério das Comunicações que usa satélites para levar internet a escolas em regiões remotas onde o cabo não chega."
      },
      {
        "id": 23,
        "pergunta": "Qual percentual de alunos buscou na internet sobre uma matéria que não entendeu, segundo a TIC Educação 2024?",
        "opcoes": [
          "30%",
          "55%",
          "86%",
          "100%"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "86% dos alunos buscaram na internet conteúdo sobre matérias que não entenderam — mostrando como a internet em casa é essencial para o estudo."
      },
      {
        "id": 24,
        "pergunta": "O que é o CETIC.br?",
        "opcoes": [
          "Um sistema de matrícula escolar",
          "Um centro de pesquisas sobre uso de tecnologia e internet no Brasil",
          "Uma empresa privada de tecnologia",
          "Um órgão do Ministério da Educação"
        ],
        "resposta": 1,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "O CETIC.br (Centro Regional de Estudos para o Desenvolvimento da Sociedade da Informação) realiza pesquisas sobre o uso de internet no Brasil, como a TIC Kids e a TIC Educação."
      },
      {
        "id": 25,
        "pergunta": "Como a equipe Capibots escolheu o tema da pesquisa?",
        "opcoes": [
          "O professor escolheu por eles",
          "Sortearam entre os temas",
          "Votaram com adesivos coloridos num mural, avaliando critérios como tamanho do problema e possibilidade de solução",
          "Escolheram o tema mais fácil de pesquisar"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "A equipe usou uma dinâmica de votação por critérios, com bolinhas coloridas num mural, avaliando cada tema por impacto, pesquisabilidade e possibilidade de criar uma solução."
      },
      {
        "id": 26,
        "pergunta": "O que é um Small Language Model (SLM)?",
        "opcoes": [
          "Um aplicativo infantil de idiomas",
          "Um modelo de inteligência artificial com poucos parâmetros, capaz de rodar em dispositivos com recursos limitados",
          "Uma linguagem de programação para crianças",
          "Um tipo de celular pequeno"
        ],
        "resposta": 1,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "SLMs são modelos de IA menores que os grandes modelos de nuvem, projetados para rodar localmente em dispositivos comuns, sem precisar de servidores ou internet."
      },
      {
        "id": 27,
        "pergunta": "Por que o ChatGPT para de funcionar imediatamente quando a internet cai?",
        "opcoes": [
          "Porque a empresa desliga os servidores durante falhas de rede",
          "Porque toda a inteligência do ChatGPT está em servidores na nuvem — sem internet, não há como acessar o processamento",
          "Porque o celular superaquece sem internet e desativa os aplicativos",
          "Porque o ChatGPT só funciona com Wi-Fi, e não com dados móveis"
        ],
        "resposta": 1,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "O ChatGPT não está 'dentro' do seu celular — ele existe apenas nos servidores da OpenAI. Seu celular é só uma janela para acessá-los. Sem internet, a janela fecha e a IA desaparece. Por isso IA offline é tão difícil — e tão importante!"
      },
      {
        "id": 28,
        "pergunta": "O que é necessário para que uma inteligência artificial funcione completamente offline, sem internet?",
        "opcoes": [
          "Uma antena especial instalada no celular",
          "O modelo de IA precisa estar inteiramente instalado no dispositivo, com todo o processamento acontecendo localmente",
          "Um contrato especial com uma operadora de telefonia",
          "Conexão via satélite para funcionar em zonas rurais"
        ],
        "resposta": 1,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "Para uma IA funcionar offline, ela precisa estar completamente 'dentro' do aparelho — como um livro que você carrega na mochila. É diferente de um site, que só existe na internet. Isso exige modelos menores e muito mais eficientes."
      },
      {
        "id": 29,
        "pergunta": "O GPT-4 precisa de centenas de servidores para funcionar. Qual a diferença de tamanho estimada entre ele e um modelo pequeno de 3,8 bilhões de parâmetros?",
        "opcoes": [
          "O dobro — cerca de 7 bilhões de parâmetros",
          "Cinco vezes maior — cerca de 20 bilhões",
          "Mais de 260 vezes maior — o GPT-4 tem estimados mais de 1 trilhão de parâmetros",
          "São praticamente iguais — a diferença está só na velocidade"
        ],
        "resposta": 2,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "Modelos gigantes como o GPT-4 têm estimados mais de 1 trilhão de parâmetros, por isso precisam de centenas de servidores potentes. Modelos pequenos têm 3,8 bilhões e cabem em celulares. É como comparar um navio a uma bicicleta!"
      },
      {
        "id": 30,
        "pergunta": "Qual região do Brasil apresentou menor percentual de alunos com acesso ao computador da escola, segundo a TIC Educação 2024?",
        "opcoes": [
          "Sul (87%)",
          "Sudeste (64%)",
          "Centro-Oeste (54%)",
          "Norte (29%)"
        ],
        "resposta": 3,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "A região Norte registrou apenas 29% de alunos com acesso ao computador da escola, contrastando com os 87% do Sul, evidenciando a enorme desigualdade regional."
      },
      {
        "id": 31,
        "pergunta": "Segundo o estudo da OCDE (2025) sobre impacto de tecnologias digitais, o que realmente melhora o aprendizado?",
        "opcoes": [
          "Dar um celular para cada aluno",
          "Aumentar o número de computadores nas escolas",
          "Ter uma ferramenta pensada pedagogicamente, não apenas o acesso à tecnologia",
          "Conectar todas as casas à internet"
        ],
        "resposta": 2,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "O estudo da OCDE concluiu que o acesso à tecnologia sozinho não garante ganhos educacionais — é preciso uma solução pedagógica, não apenas técnica."
      },
      {
        "id": 32,
        "pergunta": "Qual percentual dos professores já usa inteligência artificial para preparar aulas, segundo a TIC Educação 2024?",
        "opcoes": [
          "10%",
          "25%",
          "43%",
          "80%"
        ],
        "resposta": 2,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "43% dos professores já usam IA para preparar aulas, mostrando que a inteligência artificial está cada vez mais presente na educação."
      },
      {
        "id": 33,
        "pergunta": "Segundo o Censo Escolar 2024, qual percentual das escolas indígenas tinha internet adequada?",
        "opcoes": [
          "90%",
          "75%",
          "60%",
          "44,1%"
        ],
        "resposta": 3,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "Apenas 44,1% das escolas indígenas tinham internet adequada, contra 90% da média geral das escolas públicas de Ensino Fundamental."
      },
      {
        "id": 34,
        "pergunta": "Após a ENEC, qual foi o crescimento de conectividade nas escolas do campo?",
        "opcoes": [
          "De 10% para 20%",
          "De 38,4% para 71,3%",
          "De 60% para 90%",
          "De 70% para 95%"
        ],
        "resposta": 1,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "Com a ENEC, as escolas do campo saltaram de 38,4% para 71,3% de conectividade adequada — um avanço significativo, mas que ainda não resolve a falta de internet nas casas."
      },
      {
        "id": 35,
        "pergunta": "Qual percentual dos estudantes brasileiros não atingiu o nível básico de matemática no PISA 2022?",
        "opcoes": [
          "30%",
          "50%",
          "73%",
          "90%"
        ],
        "resposta": 2,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "73% dos estudantes brasileiros avaliados pelo PISA 2022 não alcançaram o nível básico de proficiência em matemática, evidenciando a necessidade de reforço no aprendizado."
      },
      {
        "id": 36,
        "pergunta": "Por que usar o ChatGPT ou o Gemini no celular consome dados móveis a cada mensagem enviada?",
        "opcoes": [
          "Porque fazem download de vídeos em alta definição automaticamente",
          "Porque cada mensagem é enviada pela internet até servidores poderosos, que a processam e devolvem a resposta — tudo trafegando pela rede",
          "Porque atualizam automaticamente a cada minuto em segundo plano",
          "Porque sincronizam o histórico de conversa com outros dispositivos"
        ],
        "resposta": 1,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "Cada mensagem ao ChatGPT viaja pela internet até servidores nos EUA, é processada lá, e a resposta volta para o celular. Esse vai e vem consome dados — e para quem tem pouco crédito no celular, isso é um problema real de todos os dias."
      },
      {
        "id": 37,
        "pergunta": "Por que é difícil provar que a falta de internet é a única causa do baixo desempenho escolar de uma criança?",
        "opcoes": [
          "Porque as escolas brasileiras são muito bem equipadas",
          "Porque crianças sem internet tendem a ser também as mais pobres, com pais menos escolarizados e em regiões com menos recursos — vários fatores aparecem juntos ao mesmo tempo",
          "Porque o PISA não avalia crianças sem internet",
          "Porque crianças sem internet estudam apenas em escolas particulares"
        ],
        "resposta": 1,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "Este é um dos desafios da ciência: quando vários fatores ruins aparecem juntos — pobreza, falta de internet, pais com menos estudo — fica difícil dizer qual deles, sozinho, é o culpado pelo baixo desempenho. Por isso a pesquisa continua nas próximas fases!"
      },
      {
        "id": 38,
        "pergunta": "Qual é o significado da expressão 'conectar a escola não é o mesmo que conectar o estudante'?",
        "opcoes": [
          "As escolas não precisam de internet",
          "Mesmo quando a escola tem internet, a criança passa a maior parte do tempo em casa, onde pode não ter conexão",
          "Os estudantes não sabem usar a internet",
          "A internet da escola é muito lenta"
        ],
        "resposta": 1,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "Este é o insight central da pesquisa: mesmo com a escola conectada, a criança passa a maior parte do tempo em casa, onde a exclusão digital continua e impacta seu aprendizado."
      },
      {
        "id": 39,
        "pergunta": "Quando uma inteligência artificial é desenvolvida para ser usada por crianças, qual é a principal preocupação além do conteúdo educativo?",
        "opcoes": [
          "Que a IA tenha personagens famosos e coloridos para atrair as crianças",
          "Que a IA não produza conteúdo impróprio, respeite a privacidade infantil e use linguagem adequada para a faixa etária",
          "Que a IA responda mais rápido do que as IAs desenvolvidas para adultos",
          "Que a IA possa substituir completamente o papel do professor em sala de aula"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "Criar IA para crianças exige cuidado extra: ela não pode produzir conteúdo inadequado, precisa proteger dados pessoais (exigido por lei no Brasil pelo ECA Digital e pela LGPD) e usar linguagem que a criança entenda. Segurança sempre em primeiro lugar!"
      },
      {
        "id": 40,
        "pergunta": "Por que ainda é um desafio rodar um modelo de inteligência artificial completo em um celular comum?",
        "opcoes": [
          "Porque celulares não têm tela grande o suficiente",
          "Porque modelos de IA grandes consomem muita memória e processamento — o que exige soluções como modelos menores (SLMs) e técnicas de compressão",
          "Porque a Apple e o Google bloqueiam IA em celulares",
          "Porque modelos de IA precisam de conexão constante para funcionar"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "Os grandes modelos de IA como o ChatGPT rodam em servidores enormes com centenas de gigabytes de memória. Para caber num celular, é preciso criar versões menores e comprimidas — usando técnicas como quantização e modelos especialmente projetados para hardware limitado."
      },
      {
        "id": 41,
        "pergunta": "Um modelo de inteligência artificial pode ter bilhões de 'parâmetros'. O que são esses parâmetros?",
        "opcoes": [
          "Os usuários cadastrados que já interagiram com o modelo",
          "Os valores numéricos que o modelo aprendeu durante o treinamento e que determinam como ele responde a cada pergunta",
          "Os servidores físicos onde o modelo está hospedado",
          "As versões e atualizações lançadas pela empresa ao longo do tempo"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "Parâmetros são como o 'cérebro' da IA — bilhões de números ajustados durante o treinamento para que ela aprenda a responder bem. Quanto mais parâmetros, mais o modelo 'sabe' — mas também mais memória ocupa. Por isso é tão difícil caber num celular!"
      },
      {
        "id": 42,
        "pergunta": "Qual língua domina a internet e, por isso, é usada para treinar a maioria dos modelos de inteligência artificial do mundo?",
        "opcoes": [
          "Espanhol — por ser falado em mais de 20 países",
          "Chinês — por ter o maior número de falantes nativos no mundo",
          "Inglês — estima-se que mais da metade de todo o conteúdo da internet está em inglês",
          "Francês — por ser língua oficial da ONU e de organizações internacionais"
        ],
        "resposta": 2,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "Mais de 50% do conteúdo da internet está em inglês, mesmo que apenas 17% da população mundial fale esse idioma. Isso faz com que modelos de IA 'saibam muito mais' inglês do que português — algo crucial para pensar em soluções educativas no Brasil!"
      },
      {
        "id": 43,
        "pergunta": "A OCDE descobriu que crianças que aprendem a programar com Scratch ficam melhores também em matemática, criatividade e na forma de pensar. Como se chama esse fenômeno?",
        "opcoes": [
          "Efeito dominó educacional",
          "Efeito de transferência — quando aprender algo em uma área melhora o desempenho em outras áreas também",
          "Efeito placebo",
          "Efeito cascata"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "Aprender a programar não melhora só programação! A ciência mostrou que o raciocínio lógico que a criança treina ao criar no Scratch se transfere para matemática, escrita criativa e até para a forma como resolve problemas do dia a dia. Incrível, né?"
      },
      {
        "id": 44,
        "pergunta": "Por que os dados do PISA não permitem atribuir o baixo desempenho à falta de internet isoladamente?",
        "opcoes": [
          "O PISA não mede desempenho em português",
          "Porque os fatores socioeconômicos (renda, escolaridade dos pais, localização) estão correlacionados com a falta de internet e com o baixo desempenho ao mesmo tempo, tornando difícil isolar o efeito de apenas uma variável",
          "Porque o PISA foi aplicado só em escolas particulares",
          "Porque a internet no Brasil é sempre de boa qualidade"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "Esta é a principal limitação metodológica identificada pela equipe. Crianças sem internet tendem a ser também as mais pobres, com pais menos escolarizados, morando em regiões com menos recursos — o que dificulta isolar o impacto específico da internet."
      },
      {
        "id": 45,
        "pergunta": "Qual é a vantagem do uso de um SLM local em relação à privacidade dos dados da criança?",
        "opcoes": [
          "O SLM local armazena os dados em nuvem criptografada",
          "Nenhum dado da criança sai do dispositivo, pois toda a computação é feita localmente — sem enviar informações para servidores externos",
          "O SLM local compartilha os dados apenas com o governo",
          "O SLM local não armazena nenhum dado, nem mesmo o progresso da criança"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "Como o modelo roda localmente, todas as conversas e dados permanecem no dispositivo da criança, sem envio para servidores externos — o que é especialmente importante para proteger a privacidade de crianças e adolescentes."
      },
      {
        "id": 46,
        "pergunta": "O que é uma 'revisão sistemática da literatura' como a feita pelo estudo da OCDE 2025?",
        "opcoes": [
          "Um processo de ler um único artigo muito longo",
          "Uma pesquisa que analisa e sintetiza os resultados de vários estudos científicos já publicados, chegando a conclusões baseadas no conjunto das evidências",
          "Uma pesquisa feita com entrevistas sistemáticas em escolas",
          "Um sistema de avaliação de livros didáticos"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "A revisão sistemática é uma metodologia científica que reúne, analisa e sintetiza evidências de múltiplos estudos sobre um tema, produzindo conclusões mais robustas do que um único experimento."
      },
      {
        "id": 47,
        "pergunta": "Segundo a OCDE, o que transforma uma ferramenta tecnológica em uma ferramenta verdadeiramente educativa?",
        "opcoes": [
          "Ter muitas cores, animações e sons chamativos que prendem a atenção",
          "Ser fabricada por uma grande empresa de tecnologia reconhecida",
          "Ter um propósito pedagógico claro — ser projetada para ajudar a aprender, e não apenas para entreter",
          "Custar pouco e ser acessível financeiramente a qualquer criança"
        ],
        "resposta": 2,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "A OCDE descobriu que simplesmente dar tecnologia para as crianças não melhora o aprendizado. O que faz diferença é a ferramenta ter objetivo educativo claro — com atividades com propósito, feedback que orienta e linguagem que ensina. Tecnologia com propósito!"
      },
      {
        "id": 48,
        "pergunta": "Qual é a importância do dado de que 43% das escolas não monitoram a qualidade da sua internet (Censo Escolar 2024)?",
        "opcoes": [
          "Mostra que as escolas não precisam de internet",
          "Revela que ter internet não garante ter internet de qualidade suficiente para uso pedagógico — reforçando que a conectividade escolar ainda é um desafio mesmo onde existe",
          "Significa que 43% das escolas estão sem internet",
          "Indica que os diretores não sabem usar tecnologia"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "Este dado revela que 'ter internet' e 'ter internet adequada para aprender' são coisas distintas — reforçando tanto o problema da conectividade escolar quanto a relevância de uma solução que não dependa da qualidade da conexão."
      },
      {
        "id": 49,
        "pergunta": "Uma pessoa entra num avião sem Wi-Fi para uma viagem longa. O que ela deveria ter feito ANTES de embarcar para aproveitar o tempo de voo?",
        "opcoes": [
          "Ativar o modo avião — isso libera um tipo especial de internet",
          "Baixar os filmes, músicas e conteúdos que vai querer usar enquanto ainda tinha internet disponível",
          "Contratar um pacote de dados internacionais de roaming",
          "Não há nada que se possa fazer — sem internet, nada funciona no celular"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "Conteúdos baixados ficam no dispositivo e funcionam sem internet em qualquer lugar! É a mesma lógica de uma solução educativa offline: baixa quando tem conexão, usa depois — seja num avião, numa área rural ou em casa sem internet."
      },
      {
        "id": 50,
        "pergunta": "Na ciência, qual é a diferença entre dizer que uma ideia é 'promissora' e dizer que é 'comprovada'?",
        "opcoes": [
          "Não há diferença prática — as duas palavras são usadas como sinônimos",
          "'Promissora' significa que os indícios são positivos, mas ainda faltam testes e evidências para confirmar. 'Comprovada' exige validação real com resultados confiáveis",
          "'Comprovada' é um termo técnico usado apenas por universidades renomadas",
          "'Promissora' significa que vai funcionar com certeza no futuro próximo"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "Honestidade científica é um dos valores mais importantes da ciência. Dizer que algo é 'promissor' mostra que você tem evidências positivas mas ainda não testou o suficiente. Só se pode dizer que algo está 'comprovado' após testes reais com resultados verificáveis. Ética na ciência!"
      },
      {
        "id": 51,
        "pergunta": "Em qual escola a equipe Capibots está e fica localizada em qual cidade?",
        "opcoes": [
          "Escola Estadual Mineirão, em Belo Horizonte",
          "Colégio Batista Mineiro, em Uberlândia",
          "Colégio Tiradentes, em Uberlândia",
          "Escola Municipal Cerrado, em Uberaba"
        ],
        "resposta": 1,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "A equipe Capibots é do Colégio Batista Mineiro, unidade Martins, em Uberlândia, no Triângulo Mineiro — região rodeada pelo bioma Cerrado."
      },
      {
        "id": 52,
        "pergunta": "Qual foi o tema do projeto de pesquisa da equipe Capibots na temporada de 2025?",
        "opcoes": [
          "Educação e conectividade digital",
          "Regeneração do bioma Cerrado",
          "Energia solar em escolas públicas",
          "Redução do desperdício de água"
        ],
        "resposta": 1,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Em 2025, alinhados ao ODS 15 (Vida Terrestre), os Capibots pesquisaram como ajudar a regenerar áreas degradadas do Cerrado — um dos biomas mais ameaçados do planeta!"
      },
      {
        "id": 53,
        "pergunta": "Qual foi o nome da solução criada pelos Capibots na temporada de 2025?",
        "opcoes": [
          "CerradoTech",
          "VerdeApp",
          "BioScan",
          "PlantaIA"
        ],
        "resposta": 0,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "A CerradoTech foi uma plataforma digital com o princípio 'plantar a planta certa no lugar certo' — com simulador de regeneração, catálogo de espécies nativas e rede colaborativa entre escolas, viveiros e ONGs."
      },
      {
        "id": 54,
        "pergunta": "Qual conquista a equipe Capibots alcançou na etapa regional do TBR em 2025?",
        "opcoes": [
          "1º lugar geral e melhor projeto científico",
          "3º lugar no desafio prático e 1º no científico",
          "Campeã do desafio prático e 2º lugar na classificação geral",
          "Classificação direta para o nacional sem competir no regional"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "Na etapa regional do Triângulo Mineiro, os Capibots conquistaram o troféu de campeões do desafio prático — com mais de 400 pontos — e ficaram em 2º lugar na classificação geral! Uma temporada de estreia incrível."
      },
      {
        "id": 55,
        "pergunta": "Com quais instituições a equipe validou o projeto CerradoTech em 2025?",
        "opcoes": [
          "UNICEF, ONU e Ministério da Educação",
          "NEPSEM/UFU, Rede Sou Cerrado, Associação Cerrado de Pé e Simpósio de Conservação do Cerrado",
          "Embrapa, IBGE e MapBiomas",
          "Google, Microsoft e Meta"
        ],
        "resposta": 1,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "A equipe foi além da competição: apresentou a CerradoTech no Simpósio de Conservação do Cerrado da UFU, foi reconhecida pelo NEPSEM/UFU e integrou a Rede Sou Cerrado. Ciência de verdade começa cedo!"
      },
      {
        "id": 56,
        "pergunta": "O que significa a sigla TBR?",
        "opcoes": [
          "Tecnologia Brasileira de Robôs",
          "Torneio Brasil de Robótica",
          "Time Brasileiro de Robótica",
          "Teste Básico de Robótica"
        ],
        "resposta": 1,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "O TBR — Torneio Brasil de Robótica — é uma das maiores competições educacionais de ciência, tecnologia e robótica do país, com equipes de 3 anos de idade até universitários!"
      },
      {
        "id": 57,
        "pergunta": "Qual é o tema do TBR na temporada de 2026?",
        "opcoes": [
          "Vida Terrestre e Biodiversidade",
          "Saúde e Bem-Estar",
          "Educação, Trabalho e Sustentabilidade",
          "Cidades e Comunidades Sustentáveis"
        ],
        "resposta": 2,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Em 2026, o TBR tem como tema 'Educação, Trabalho e Sustentabilidade' — alinhado ao ODS 4, que trata de educação de qualidade e equitativa para todos."
      },
      {
        "id": 58,
        "pergunta": "Quanto tempo dura uma partida do desafio prático no TBR, nas categorias Kids 2 e acima?",
        "opcoes": [
          "60 segundos",
          "90 segundos",
          "120 segundos",
          "180 segundos"
        ],
        "resposta": 2,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Cada partida dura exatamente 120 segundos — 2 minutos cronometrados sem pausa! O robô precisa completar o máximo de missões nesse tempo. Cada segundo conta!"
      },
      {
        "id": 59,
        "pergunta": "Quantos integrantes da equipe podem ficar na mesa de competição durante uma partida?",
        "opcoes": [
          "Todos os integrantes",
          "Apenas 1",
          "Apenas 2",
          "Até 4"
        ],
        "resposta": 2,
        "pontos": 10,
        "dificuldade": "Fácil",
        "explicacao": "Apenas 2 integrantes — o posicionador e o operador — podem estar na mesa durante a partida. O restante da equipe acompanha de longe. Pressão máxima para a dupla!"
      },
      {
        "id": 60,
        "pergunta": "Em quantos quesitos principais as equipes são avaliadas no TBR?",
        "opcoes": [
          "2 — robótica e ciência",
          "3 — ciência, robótica e criatividade",
          "4 — Mérito Científico, Organização & Método, Tecnologia & Engenharia e Desafio Prático",
          "5 — incluindo apresentação oral e portfólio"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "O TBR avalia 4 quesitos: Mérito Científico (a pesquisa), Organização & Método (como a equipe se organiza), Tecnologia & Engenharia (o robô) e Desafio Prático (as missões). Nota máxima: 500 pontos em cada!"
      },
      {
        "id": 61,
        "pergunta": "No TBR, qual é o quesito que observa o comportamento da equipe durante todo o evento — mesmo fora das salas de avaliação?",
        "opcoes": [
          "Mérito Científico",
          "Desafio Prático",
          "Desenvolvimento Humano",
          "Tecnologia & Engenharia"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "O Desenvolvimento Humano é o quesito que coloca os valores do TBR acima de qualquer outro — a equipe é observada em todos os espaços do evento, o tempo todo. Respeito, postura e espírito de equipe valem pontos!"
      },
      {
        "id": 62,
        "pergunta": "O que acontece quando o operador toca no robô fora da base durante uma partida no TBR?",
        "opcoes": [
          "A partida é encerrada imediatamente",
          "O robô é retirado de campo e a equipe perde todos os pontos",
          "O robô fica inativo e é colocado um material de penalidade no tapete",
          "A equipe perde 50 pontos por toque"
        ],
        "resposta": 2,
        "pontos": 20,
        "dificuldade": "Médio",
        "explicacao": "Tocar no robô fora da base gera penalidade: o robô fica inativo e o juiz coloca um material escolar no tapete (caderno, lápis, tesoura ou borracha). A equipe pode reverter a penalidade levando o material ao almoxarifado — mas perde tempo precioso!"
      },
      {
        "id": 63,
        "pergunta": "No TBR, como funciona a regra das partidas em relação à pontuação final?",
        "opcoes": [
          "A média das partidas é usada para o placar final",
          "Apenas a última partida conta",
          "Apenas a melhor pontuação dentre todas as partidas é somada aos demais quesitos",
          "As pontuações de todas as partidas são somadas"
        ],
        "resposta": 2,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "Cada partida é uma nova chance! Só a melhor pontuação do Desafio Prático entra no placar final — o que significa que uma ótima segunda partida pode mudar tudo na classificação geral."
      },
      {
        "id": 64,
        "pergunta": "Qual é a faixa etária mínima que pode participar do TBR?",
        "opcoes": [
          "6 anos — a partir do 1º ano do Ensino Fundamental",
          "8 anos — a partir do 3º ano do Ensino Fundamental",
          "3 anos — desde a Educação Infantil, na categoria Baby",
          "10 anos — a partir do 5º ano do Ensino Fundamental"
        ],
        "resposta": 2,
        "pontos": 30,
        "dificuldade": "Difícil",
        "explicacao": "A categoria Baby do TBR aceita crianças a partir dos 3 anos! Isso faz do TBR uma das competições educacionais com o maior alcance de faixa etária do Brasil — de 3 anos até universitários."
      },
      {
        "id": 65,
        "pergunta": "Para a categoria Kids 2, qual é o documento que a equipe deve entregar com antecedência mínima de 14 dias para o torneio, e o que acontece se entregar fora do prazo?",
        "opcoes": [
          "O diário de bordo — sem penalidade por atraso",
          "O paper no formato ABNT — a entrega fora do prazo gera penalidade de 10% na nota desse quesito",
          "O vídeo de apresentação — a equipe é desclassificada",
          "O formulário de inscrição — sem penalidade"
        ],
        "resposta": 1,
        "pontos": 40,
        "dificuldade": "Especialista",
        "explicacao": "O paper no formato ABNT é obrigatório para Kids 2 e deve ser entregue com pelo menos 14 dias de antecedência para que os jurados possam analisá-lo. Atraso gera penalidade de 10% na nota do Mérito Científico — todo dia conta!"
      }
    ]},
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
    const perguntasFaceis = quizData.quiz.perguntas.filter(p => p.dificuldade === "Fácil");
    const perguntasMedias = quizData.quiz.perguntas.filter(p => p.dificuldade === "Médio");
    const perguntasDificeis = quizData.quiz.perguntas.filter(p => p.dificuldade === "Difícil");
    
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
    const pontuacaoMaxima = perguntasSorteadas.reduce((sum, p) => sum + p.pontos, 0);
    
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
    btn.addEventListener('click', function() {
        popularModalPremios();
        modal.classList.remove('hidden');
    });

    // Fechar o modal pelo 'x'
    span.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    // Fechar o modal clicando/tocando fora
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// Adicionar a configuração do modal na inicialização do quiz
// (Assumindo que a função inicializarQuiz() é chamada no final do script)
// Vou procurar o final da função inicializarQuiz para adicionar a chamada.

// No final do script, após a chamada de inicializarQuiz(), adiciono a chamada para configurarModalEventos.
// Como não tenho o script completo, vou adicionar a chamada de configuração de eventos do modal no final do arquivo.

// A chamada para configurarModalEventos foi movida para dentro de inicializarQuiz()
