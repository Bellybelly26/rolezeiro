/* ============================================================================
   rolezeiro — app.js
   Site 100% HTML + CSS + JS puro (sem build, sem frameworks).
   Organizado em: DADOS, HELPERS, ÍCONES, ESTADO, RENDER (shell + telas),
   COMPONENTES (funções que retornam HTML em string) e EVENTOS.
============================================================================ */

/* ============================================================================
   DADOS FICTÍCIOS
============================================================================ */
const TODAY = new Date("2026-09-01T00:00:00");
const GENRES = ["Sertanejo", "Pagode", "Samba", "Funk", "Forró", "MPB", "Pop", "Rock", "Rap", "Eletrônica", "Reggae", "Festival"];
const GENRE_COLORS = {
  Sertanejo: "#F4B942", Pagode: "#FF8A3D", Samba: "#FF5A6E", Funk: "#D946A8",
  Forró: "#FF7A45", MPB: "#33B58C", Pop: "#FF6FB5", Rock: "#E4483A",
  Rap: "#FFD23F", "Eletrônica": "#5ED0FF", Reggae: "#4CAF6D", Festival: "#8B6BFF",
};
const ESTADOS = ["SP", "RJ", "MG", "BA", "PE", "GO", "PR", "DF", "SC", "CE", "RS", "AM"];

const ARTISTS = [
  { id: "a1", name: "Vitor Aragão", genre: "Sertanejo", city: "Goiânia, GO", fans: 812000, verified: true, bio: "Sertanejo raiz com pegada moderna. Vitor cresceu ouvindo viola nas festas do interior de Goiás e hoje leva esse som pras maiores arenas do país, sem perder a simplicidade das primeiras composições." },
  { id: "a2", name: "Duda & Herculano", genre: "Sertanejo", city: "Uberlândia, MG", fans: 634000, verified: true, bio: "Dupla revelação do sertanejo universitário, conhecida pelos refrões que tomam conta das rádios e pelas participações especiais em toda turnê." },
  { id: "a3", name: "Larissa Menezes", genre: "Sertanejo", city: "Ribeirão Preto, SP", fans: 921000, verified: true, bio: "Voz marcante do sertanejo pop, Larissa mistura batidas contemporâneas com letras que falam de superação e liberdade feminina." },
  { id: "a4", name: "Raiz do Pagode", genre: "Pagode", city: "Rio de Janeiro, RJ", fans: 455000, verified: true, bio: "Grupo carioca que resgata o pagode de raiz com roupagem atual, famoso pelas rodas históricas na Lapa." },
  { id: "a5", name: "Nêga Flor", genre: "Samba", city: "Salvador, BA", fans: 388000, verified: true, bio: "Sambista baiana com passagem por escolas tradicionais, Nêga Flor traz um samba de terreiro que contagia qualquer plateia." },
  { id: "a6", name: "MC Trovão", genre: "Funk", city: "São Paulo, SP", fans: 1120000, verified: true, bio: "Um dos nomes mais tocados do funk paulista, MC Trovão comanda bailes lotados com hits que dominam as paradas." },
  { id: "a7", name: "Asas do Forró", genre: "Forró", city: "Recife, PE", fans: 276000, verified: false, bio: "Banda pernambucana que mantém viva a tradição do forró pé-de-serra, com sanfona, zabumba e muita animação." },
  { id: "a8", name: "Clarice Andrade", genre: "MPB", city: "Belo Horizonte, MG", fans: 341000, verified: true, bio: "Compositora mineira aclamada pela crítica, Clarice une poesia e groove em shows intimistas e arranjos sofisticados." },
  { id: "a9", name: "Rebeca Dias", genre: "Pop", city: "São Paulo, SP", fans: 1450000, verified: true, bio: "Fenômeno do pop nacional, Rebeca comanda espetáculos com produção cinematográfica e coreografias marcantes." },
  { id: "a10", name: "Concreto Cinza", genre: "Rock", city: "Curitiba, PR", fans: 198000, verified: false, bio: "Banda de rock alternativo com letras urbanas e shows de guitarras afiadas, referência da cena independente do Sul." },
  { id: "a11", name: "Flow Zulu", genre: "Rap", city: "Brasília, DF", fans: 512000, verified: true, bio: "Rapper e produtor que virou voz da periferia de Brasília, misturando boom bap clássico com trap contemporâneo." },
  { id: "a12", name: "DJ Nômade", genre: "Eletrônica", city: "Florianópolis, SC", fans: 289000, verified: true, bio: "DJ e produtor que percorre o litoral brasileiro com sets de house e techno tropical, sempre ao pôr do sol." },
  { id: "a13", name: "Raízes do Caribe", genre: "Reggae", city: "Porto Alegre, RS", fans: 143000, verified: false, bio: "Banda gaúcha de reggae roots que canta sobre resistência, natureza e música como ferramenta de união." },
  { id: "a14", name: "Baião Novo", genre: "Forró", city: "Fortaleza, CE", fans: 205000, verified: false, bio: "Coletivo cearense que funde forró eletrônico e MPB, trazendo o Nordeste para os grandes palcos do Brasil." },
];

const EVENTS_SEED = [
  { id: "e1", type: "show", title: "Turnê Chão de Terra", genre: "Sertanejo", artistIds: ["a1"], date: "2026-09-12", time: "21:00", venue: "Espaço Vibra", city: "Goiânia", state: "GO", price: 90, interested: 3420, going: 1890, rating: 4.8, description: "Vitor Aragão abre a turnê que celebra dez anos de carreira em cima do palco, revisitando os maiores sucessos e apresentando as faixas do novo álbum ao lado da banda completa.", lineup: [{ time: "19:30", act: "Abertura de portões" }, { time: "20:00", act: "Banda de abertura local" }, { time: "21:00", act: "Vitor Aragão" }], info: ["Classificação: 16 anos", "Meia-entrada conforme lei federal", "Estacionamento no local (pago)", "Abertura de portões: 19h30"] },
  { id: "e2", type: "show", title: "Ao Vivo em Uberlândia", genre: "Sertanejo", artistIds: ["a2"], date: "2026-09-19", time: "20:00", venue: "Praça Vitória", city: "Uberlândia", state: "MG", price: 70, interested: 2110, going: 980, rating: 4.6, description: "Show gratuito de aniversário da cidade com Duda & Herculano recebendo convidados especiais do sertanejo universitário.", lineup: [{ time: "18:00", act: "DJ de abertura" }, { time: "20:00", act: "Duda & Herculano" }], info: ["Classificação: livre", "Evento ao ar livre", "Área pet friendly"] },
  { id: "e3", type: "show", title: "Tour Coração Aberto", genre: "Sertanejo", artistIds: ["a3"], date: "2026-10-03", time: "21:30", venue: "Arena RP", city: "Ribeirão Preto", state: "SP", price: 110, interested: 4870, going: 2310, rating: 4.9, description: "Larissa Menezes apresenta a nova fase da carreira com um show cheio de efeitos visuais, telão de LED de 360° e banda de doze músicos.", lineup: [{ time: "20:00", act: "Banda de abertura" }, { time: "21:30", act: "Larissa Menezes" }], info: ["Classificação: 14 anos", "Meia-entrada disponível na bilheteria", "Camarote e pista disponíveis"] },
  { id: "e4", type: "show", title: "Roda Grande", genre: "Pagode", artistIds: ["a4"], date: "2026-09-26", time: "19:00", venue: "Fundição Progresso", city: "Rio de Janeiro", state: "RJ", price: 60, interested: 1980, going: 1120, rating: 4.7, description: "A tradicional roda de pagode do Raiz do Pagode volta à Lapa com participação de convidados surpresa direto da micareta carioca.", lineup: [{ time: "19:00", act: "Abertura com DJ" }, { time: "20:30", act: "Raiz do Pagode" }], info: ["Classificação: 18 anos", "Evento em pé", "Bares no local"] },
  { id: "e5", type: "show", title: "Sambaqui", genre: "Samba", artistIds: ["a5"], date: "2026-10-10", time: "20:00", venue: "Concha Acústica", city: "Salvador", state: "BA", price: 80, interested: 2530, going: 1340, rating: 4.8, description: "Nêga Flor sobe ao palco da Concha Acústica com um repertório que passeia pelo samba de terreiro e homenageia os mestres baianos.", lineup: [{ time: "18:30", act: "Roda de samba de rua" }, { time: "20:00", act: "Nêga Flor" }], info: ["Classificação: 12 anos", "Assentos numerados e pista livre", "Meia-entrada para estudantes"] },
  { id: "e6", type: "show", title: "Trovão no Baile", genre: "Funk", artistIds: ["a6"], date: "2026-09-13", time: "23:00", venue: "Complexo Sonora", city: "São Paulo", state: "SP", price: 50, interested: 6210, going: 3980, rating: 4.5, description: "O baile mais quente do funk paulista com MC Trovão e um time de DJs revezando no palco até o sol nascer.", lineup: [{ time: "22:00", act: "Abertura com DJs residentes" }, { time: "23:30", act: "MC Trovão" }], info: ["Classificação: 18 anos", "Evento sem meia-entrada", "Revista na entrada"] },
  { id: "e7", type: "show", title: "Xote & Cia", genre: "Forró", artistIds: ["a7"], date: "2026-10-24", time: "19:30", venue: "Marco Zero", city: "Recife", state: "PE", price: 40, interested: 1340, going: 780, rating: 4.6, description: "Uma noite de forró pé-de-serra ao ar livre no Marco Zero, com direito a quadrilha e comidas típicas na praça.", lineup: [{ time: "19:30", act: "Asas do Forró" }, { time: "21:30", act: "Repente ao vivo" }], info: ["Classificação: livre", "Evento gratuito", "Praça de alimentação local"] },
  { id: "e8", type: "show", title: "Sob o Céu de Minas", genre: "MPB", artistIds: ["a8"], date: "2026-09-20", time: "20:00", venue: "Palácio das Artes", city: "Belo Horizonte", state: "MG", price: 95, interested: 1670, going: 690, rating: 4.9, description: "Clarice Andrade apresenta o show intimista que gerou o álbum ao vivo mais elogiado do ano, só ela, o piano e um quarteto de cordas.", lineup: [{ time: "20:00", act: "Clarice Andrade" }], info: ["Classificação: livre", "Assentos numerados", "Alteração recente: local trocado para o Grande Teatro"] },
  { id: "e9", type: "show", title: "Neon Tour", genre: "Pop", artistIds: ["a9"], date: "2026-11-07", time: "21:00", venue: "Allianz Hall", city: "São Paulo", state: "SP", price: 150, interested: 8920, going: 5410, rating: 4.9, description: "A turnê mais aguardada do ano: Rebeca Dias traz produção internacional, figurinos exclusivos e mais de vinte hits em uma única noite.", lineup: [{ time: "19:30", act: "Abertura de portões" }, { time: "20:15", act: "Ato de abertura" }, { time: "21:00", act: "Rebeca Dias" }], info: ["Classificação: livre", "Pista premium, pista e cadeiras", "Proibido o uso de câmeras profissionais"] },
  { id: "e10", type: "show", title: "Ruído Interno", genre: "Rock", artistIds: ["a10"], date: "2026-10-17", time: "21:00", venue: "Ópera de Arame", city: "Curitiba", state: "PR", price: 85, interested: 980, going: 510, rating: 4.7, description: "O Concreto Cinza celebra o lançamento do quarto álbum em um dos palcos mais icônicos do Sul do país.", lineup: [{ time: "20:00", act: "Banda convidada" }, { time: "21:00", act: "Concreto Cinza" }], info: ["Classificação: 16 anos", "Local coberto", "Estacionamento próximo pago"] },
  { id: "e11", type: "show", title: "Cidade Satélite", genre: "Rap", artistIds: ["a11"], date: "2026-09-27", time: "20:00", venue: "Tribo Espaço Cultural", city: "Brasília", state: "DF", price: 55, interested: 2760, going: 1590, rating: 4.8, description: "Flow Zulu volta pra casa com um show que mistura boom bap, trap e poesia falada, celebrando a cena underground de Brasília.", lineup: [{ time: "19:00", act: "Batalha de rima local" }, { time: "20:00", act: "Flow Zulu" }], info: ["Classificação: 14 anos", "Evento em espaço cultural independente", "Renda revertida para projetos sociais"] },
  { id: "e12", type: "show", title: "Rotas", genre: "Eletrônica", artistIds: ["a12"], date: "2026-10-31", time: "23:30", venue: "Costa Beach Club", city: "Florianópolis", state: "SC", price: 120, interested: 3340, going: 1870, rating: 4.7, description: "Set de sunset seguido de madrugada inteira de house e techno tropical à beira-mar com DJ Nômade e convidados.", lineup: [{ time: "18:00", act: "Sunset set" }, { time: "23:30", act: "DJ Nômade" }], info: ["Classificação: 18 anos", "Evento à beira-mar", "Open bar em pacotes selecionados"] },
  { id: "e13", type: "show", title: "Sertão Novo", genre: "Forró", artistIds: ["a14"], date: "2026-11-14", time: "19:00", venue: "Centro de Eventos do Ceará", city: "Fortaleza", state: "CE", price: 65, interested: 1450, going: 690, rating: 4.6, description: "Baião Novo mistura forró eletrônico e MPB em um espetáculo visual que celebra a cultura cearense contemporânea.", lineup: [{ time: "19:00", act: "DJ set nordestino" }, { time: "20:30", act: "Baião Novo" }], info: ["Classificação: livre", "Praça de alimentação regional", "Estacionamento gratuito"] },
  { id: "e14", type: "show", title: "Show Especial Interior", genre: "Sertanejo", artistIds: ["a1"], date: "2026-11-21", time: "21:00", venue: "Village Country", city: "Campinas", state: "SP", price: 100, interested: 2980, going: 1420, rating: 4.8, description: "Segunda parada da turnê Chão de Terra, com participação surpresa de Larissa Menezes.", lineup: [{ time: "20:00", act: "Abertura" }, { time: "21:00", act: "Vitor Aragão" }], info: ["Classificação: 16 anos", "Meia-entrada disponível", "Área vip com open food"] },
  { id: "e15", type: "show", title: "Dose Dupla", genre: "Pop", artistIds: ["a9", "a3"], date: "2026-12-05", time: "21:00", venue: "Mineirão Hall", city: "Belo Horizonte", state: "MG", price: 130, interested: 5120, going: 2760, rating: 4.9, description: "Rebeca Dias e Larissa Menezes se unem pela primeira vez em um show que mistura pop e sertanejo em duetos inéditos.", lineup: [{ time: "20:00", act: "Abertura de portões" }, { time: "21:00", act: "Rebeca Dias & Larissa Menezes" }], info: ["Classificação: livre", "Evento com transmissão para telões externos", "Estacionamento rotativo pago"] },
  { id: "e16", type: "show", title: "Samba de Verão", genre: "Samba", artistIds: ["a5"], date: "2026-12-12", time: "18:00", venue: "Marina da Glória", city: "Rio de Janeiro", state: "RJ", price: 75, interested: 3110, going: 1650, rating: 4.7, description: "Abertura oficial do verão carioca com Nêga Flor e uma feijoada completa antes do show.", lineup: [{ time: "16:00", act: "Feijoada" }, { time: "18:00", act: "Nêga Flor" }], info: ["Classificação: livre", "Vista para a Baía de Guanabara", "Ingresso inclui feijoada"] },
  { id: "f1", type: "festival", title: "Festival Terra Brasil", genre: "Festival", genres: ["Sertanejo", "Pop", "Rap", "Eletrônica", "Rock", "Samba"], artistIds: ["a1", "a9", "a11", "a12", "a10", "a5"], date: "2026-10-24", endDate: "2026-10-25", time: "16:00", venue: "Autódromo de Interlagos", city: "São Paulo", state: "SP", price: 280, interested: 18400, going: 9200, rating: 4.9, featured: true, description: "O maior encontro de gêneros musicais do Brasil chega à sua quinta edição com dois dias, quatro palcos e mais de trinta artistas em cartaz — do sertanejo ao eletrônico, tudo em um só lugar.", lineup: [{ time: "Dia 1 · 16h", act: "Palco Raiz abre com atrações locais" }, { time: "Dia 1 · 21h", act: "Vitor Aragão + Nêga Flor" }, { time: "Dia 2 · 18h", act: "Flow Zulu + Concreto Cinza" }, { time: "Dia 2 · 22h", act: "Rebeca Dias (encerramento) + DJ Nômade" }], info: ["Classificação: 16 anos (menores acompanhados até 21h)", "Ingresso válido para os dois dias", "Área de camping disponível", "Proibida a entrada com bebidas e alimentos"] },
  { id: "f2", type: "festival", title: "Arraiá Elétrico", genre: "Festival", genres: ["Sertanejo", "Forró"], artistIds: ["a2", "a7", "a14", "a3"], date: "2026-11-28", time: "18:00", venue: "Parque dos Bois", city: "Caruaru", state: "PE", price: 150, interested: 7650, going: 3980, rating: 4.7, featured: true, description: "O clássico arraiá pernambucano ganha estrutura de festival com trio elétrico, forró pé-de-serra e sertanejo universitário na mesma noite.", lineup: [{ time: "18:00", act: "Asas do Forró" }, { time: "20:00", act: "Baião Novo" }, { time: "22:00", act: "Duda & Herculano" }, { time: "00:00", act: "Larissa Menezes" }], info: ["Classificação: 14 anos", "Decoração junina temática", "Praça de alimentação com comidas típicas"] },
  { id: "f3", type: "festival", title: "Enraizados Fest", genre: "Festival", genres: ["Samba", "Pagode", "MPB"], artistIds: ["a5", "a4", "a8"], date: "2026-12-19", time: "17:00", venue: "Parque de Exposições", city: "Salvador", state: "BA", price: 190, interested: 6120, going: 2870, rating: 4.8, featured: true, description: "Um festival dedicado às raízes da música popular brasileira, reunindo samba, pagode e MPB em três palcos ao ar livre.", lineup: [{ time: "17:00", act: "Roda de samba de abertura" }, { time: "19:00", act: "Clarice Andrade" }, { time: "21:00", act: "Raiz do Pagode" }, { time: "23:00", act: "Nêga Flor" }], info: ["Classificação: livre", "Estrutura com três palcos", "Transporte gratuito do centro da cidade"] },
  { id: "f4", type: "festival", title: "Bass Nation", genre: "Festival", genres: ["Funk", "Eletrônica"], artistIds: ["a6", "a12"], date: "2026-10-03", time: "20:00", venue: "Píer Mauá", city: "Rio de Janeiro", state: "RJ", price: 140, interested: 9870, going: 5230, rating: 4.6, featured: true, description: "Funk e eletrônica dividem o mesmo line-up em uma noite de graves pesados e visuais imersivos à beira da Baía de Guanabara.", lineup: [{ time: "20:00", act: "Abertura com DJs locais" }, { time: "22:00", act: "MC Trovão" }, { time: "01:00", act: "DJ Nômade" }], info: ["Classificação: 18 anos", "Estrutura open air", "Guarda-volumes disponível"] },
];

const PAST_EVENTS = [
  { id: "p1", title: "Verão Raiz 2026", artist: "Nêga Flor", city: "Salvador, BA", date: "2026-02-14", genre: "Samba" },
  { id: "p2", title: "Rebeca Dias — Turnê Anterior", artist: "Rebeca Dias", city: "São Paulo, SP", date: "2026-04-02", genre: "Pop" },
  { id: "p3", title: "Arraiá da Praça", artist: "Duda & Herculano", city: "Uberlândia, MG", date: "2026-06-20", genre: "Sertanejo" },
];

const COMMUNITY_SEED = [
  { artistId: "a1", members: 214000, posts: [
    { id: "c1p1", author: "joana.viola", category: "Avisos", text: "Datas confirmadas do fim de ano saindo aos poucos! Fiquem de olho na aba de eventos, vem novidade boa por aí 🤠", likes: 842, comments: 63, time: "há 2 h", hasImage: false },
    { id: "c1p2", author: "rafa_sertanejo", category: "Fotos", text: "Registro da última noite em Goiânia, que energia foi aquela!", likes: 1290, comments: 94, time: "há 5 h", hasImage: true },
    { id: "c1p3", author: "marina.duarte", category: "Conversas", text: "Gente alguém sabe se vai ter pré-venda pro show de Campinas ainda essa semana?", likes: 58, comments: 21, time: "há 1 dia", hasImage: false },
    { id: "c1p4", author: "beto.rural", category: "Shows", text: "Segunda vez vendo o Vitor ao vivo e ele só melhora. A abertura com viola solo arrepiou.", likes: 410, comments: 37, time: "há 2 dias", hasImage: false },
    { id: "c1p5", author: "vitor.aragao.oficial", category: "Música", text: "Faixa nova gravada essa semana no estúdio, ansioso pra dividir com vocês em breve 🎶", likes: 3120, comments: 210, time: "há 3 dias", hasImage: true },
  ]},
  { artistId: "a4", members: 98000, posts: [
    { id: "c2p1", author: "roda.carioca", category: "Shows", text: "A Fundição tremeu ontem! Melhor roda do ano até agora.", likes: 512, comments: 44, time: "há 6 h", hasImage: true },
    { id: "c2p2", author: "pandeiro_leo", category: "Conversas", text: "Alguém tem o cavaco igual ao que o Diego usa? Preciso saber a marca kkk", likes: 32, comments: 18, time: "há 1 dia", hasImage: false },
    { id: "c2p3", author: "raizdopagode.oficial", category: "Avisos", text: "Roda Grande esgotando rápido, quem ainda não garantiu o ingresso corre!", likes: 980, comments: 71, time: "há 2 dias", hasImage: false },
  ]},
  { artistId: "a6", members: 356000, posts: [
    { id: "c3p1", author: "trovao.oficial", category: "Avisos", text: "Baile de sábado com portões abrindo mais cedo, chega junto que vai lotar.", likes: 1540, comments: 132, time: "há 3 h", hasImage: false },
    { id: "c3p2", author: "duda.zl", category: "Fotos", text: "Print do momento que o grave bateu e todo mundo pulou junto", likes: 2210, comments: 156, time: "há 8 h", hasImage: true },
    { id: "c3p3", author: "mc_iniciante", category: "Música", text: "Faixa nova tá tocando em todo lugar, já é hino", likes: 670, comments: 40, time: "há 1 dia", hasImage: false },
  ]},
  { artistId: "a8", members: 67000, posts: [
    { id: "c4p1", author: "poesia.mineira", category: "Shows", text: "Show intimista emocionou a plateia inteira, Clarice tem uma presença única.", likes: 340, comments: 29, time: "há 4 h", hasImage: false },
    { id: "c4p2", author: "clarice.andrade", category: "Avisos", text: "Obrigada pelo carinho de sempre. Bastidores do álbum ao vivo saindo em breve por aqui.", likes: 980, comments: 88, time: "há 1 dia", hasImage: true },
  ]},
  { artistId: "a9", members: 812000, posts: [
    { id: "c5p1", author: "rebeca.dias.oficial", category: "Avisos", text: "NEON TOUR chegando em mais cidades ano que vem, aguardem o anúncio 💫", likes: 9820, comments: 740, time: "há 1 h", hasImage: true },
    { id: "c5p2", author: "fan_neon", category: "Fotos", text: "Fileira 2 no show de SP, ainda em choque com a produção", likes: 2430, comments: 190, time: "há 5 h", hasImage: true },
    { id: "c5p3", author: "carol.pop", category: "Conversas", text: "Alguém troca ingresso pista premium por duas pistas comuns?", likes: 44, comments: 33, time: "há 1 dia", hasImage: false },
    { id: "c5p4", author: "rebeca.dias.oficial", category: "Música", text: "Prévia da faixa que abre o show liberada nos stories, corre ouvir", likes: 5210, comments: 402, time: "há 2 dias", hasImage: false },
  ]},
  { artistId: "a12", members: 121000, posts: [
    { id: "c6p1", author: "nomade.oficial", category: "Avisos", text: "Set completo do sunset em Floripa disponível na comunidade, bora relembrar", likes: 1120, comments: 65, time: "há 7 h", hasImage: true },
    { id: "c6p2", author: "raver_sc", category: "Shows", text: "Nunca vi um pôr do sol tão bem sincronizado com um set, surreal", likes: 640, comments: 51, time: "há 1 dia", hasImage: false },
  ]},
];

const NOTIFS_SEED = [
  { id: "n1", type: "show", text: "Vitor Aragão anunciou um novo show em Campinas", time: "há 2 h", read: false },
  { id: "n2", type: "reminder", text: "Faltam 4 dias para Trovão no Baile, o show que você marcou interesse", time: "há 5 h", read: false },
  { id: "n3", type: "community", text: "Rebeca Dias publicou uma novidade na comunidade", time: "há 6 h", read: false },
  { id: "n4", type: "change", text: "Sob o Céu de Minas mudou de local: agora é no Grande Teatro", time: "há 1 dia", read: true },
  { id: "n5", type: "show", text: "Nêga Flor anunciou presença no Enraizados Fest", time: "há 1 dia", read: true },
  { id: "n6", type: "community", text: "Nova publicação na comunidade do Raiz do Pagode", time: "há 2 dias", read: true },
  { id: "n7", type: "reminder", text: "Seu evento salvo Festival Terra Brasil está chegando em menos de dois meses", time: "há 3 dias", read: true },
];

const CITY_POS = {
  "Manaus": [20, 20], "Belém": [46, 14], "Fortaleza": [70, 20], "Recife": [77, 29],
  "Salvador": [66, 41], "Brasília": [52, 47], "Goiânia": [47, 49], "Belo Horizonte": [59, 57],
  "Rio de Janeiro": [61, 68], "São Paulo": [53, 70], "Ribeirão Preto": [51, 62], "Campinas": [52, 67],
  "Curitiba": [49, 79], "Florianópolis": [51, 85], "Porto Alegre": [44, 91], "Caruaru": [75, 32], "Uberlândia": [53, 58],
};

/* ============================================================================
   HELPERS
============================================================================ */
function byId(arr, id) { return arr.find((x) => x.id === id); }
function artistNames(ids) { return ids.map((id) => { const a = byId(ARTISTS, id); return a ? a.name : null; }).filter(Boolean); }
function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}
function fmtDateFull(iso) {
  const d = new Date(iso + "T00:00:00");
  const s = d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function daysUntil(iso) {
  const d = new Date(iso + "T00:00:00");
  return Math.round((d - TODAY) / 86400000);
}
function money(v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }); }
function initials(name) { return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase(); }
const PALETTE_ROT = ["#FF5A6E", "#8B6BFF", "#F4B942", "#5ED0FF", "#33B58C", "#FF8A3D"];
function hashColor(str) { let h = 0; for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h); return PALETTE_ROT[Math.abs(h) % PALETTE_ROT.length]; }
function esc(str) { const d = document.createElement("div"); d.textContent = str == null ? "" : String(str); return d.innerHTML; }

/* ============================================================================
   ÍCONES (SVG inline, sem dependências externas)
============================================================================ */
const ICONS = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2.4 5 6 5c2 0 3.4 1 6 3.4C14.6 6 16 5 18 5c3.6 0 5.5 3.4 4 6.7C19.5 16.4 12 21 12 21z"/></svg>',
  heartFill: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2.4 5 6 5c2 0 3.4 1 6 3.4C14.6 6 16 5 18 5c3.6 0 5.5 3.4 4 6.7C19.5 16.4 12 21 12 21z"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 21.5 12 17.8 5.5 21.5 7 14.5 2 9.5 9 9"/></svg>',
  starFill: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 21.5 12 17.8 5.5 21.5 7 14.5 2 9.5 9 9"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z"/><line x1="10" y1="6" x2="10" y2="18" stroke-dasharray="2 3"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.5 14.3c2.7.4 4.5 2.4 4.5 5.7"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15 9 13 13 9 15 11 11 15 9"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v10h12V10"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="13 5 20 12 13 19"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="20" y1="12" x2="4" y2="12"/><polyline points="11 5 4 12 11 19"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 5 16 12 9 19"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9 17 20 6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z"/><polyline points="9 12 11 14 15 10"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.4"/><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="19" r="2.4"/><line x1="8.2" y1="10.8" x2="15.8" y2="6.2"/><line x1="8.2" y1="13.2" x2="15.8" y2="17.8"/></svg>',
  comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4V5z"/></svg>',
  thumb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v10H4V10h3zm0 0 4-7a2 2 0 0 1 3.7 1.4L13.5 9H18a2 2 0 0 1 2 2.3l-1.3 7A2 2 0 0 1 16.7 20H7"/></svg>',
  thumbFill: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M7 10v10H4V10h3zm0 0 4-7a2 2 0 0 1 3.7 1.4L13.5 9H18a2 2 0 0 1 2 2.3l-1.3 7A2 2 0 0 1 16.7 20H7"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5.5-5.5L7 19"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/><line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/><line x1="4.6" y1="4.6" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.4" y2="19.4"/><line x1="4.6" y1="19.4" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.4" y2="4.6"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1"/><line x1="8" y1="7" x2="8" y2="7.01"/><line x1="12" y1="7" x2="12" y2="7.01"/><line x1="16" y1="7" x2="16" y2="7.01"/><line x1="8" y1="11" x2="8" y2="11.01"/><line x1="12" y1="11" x2="12" y2="11.01"/><line x1="16" y1="11" x2="16" y2="11.01"/><line x1="9" y1="21" x2="9" y2="16"/><line x1="15" y1="21" x2="15" y2="16"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="20" x2="4" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="20" y1="20" x2="20" y2="14"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 20 7"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/><path d="M10 7V4h4v3"/></svg>',
  userPlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 3-6.3 6.5-6.3s6.5 2.7 6.5 6.3"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>',
  userCheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 3-6.3 6.5-6.3s6.5 2.7 6.5 6.3"/><polyline points="16 12 18.5 14.5 22.5 9.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>',
  megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h2l1 5h2l-1-5h1l10 4V6L9 10H4a1 1 0 0 0-1 1z"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 22 20H2L12 3z"/><line x1="12" y1="9" x2="12" y2="14"/><line x1="12" y1="17" x2="12" y2="17.01"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.9L19 9.5l-4.9 1.8L12 16l-1.8-4.7L5 9.5l4.9-1.8L12 3z"/><path d="M19 15l.9 2.4L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.6L19 15z"/></svg>',
  trending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 6"/><polyline points="15 6 21 6 21 12"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  party: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l6-13 10 10-13 6z"/><line x1="14" y1="4" x2="14" y2="6"/><line x1="18" y1="8" x2="20" y2="8"/><line x1="19" y1="3" x2="20.5" y2="4.5"/></svg>',
  disc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.6"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13.5" r="3.3"/></svg>',
};
function icon(name, size) {
  size = size || 16;
  return `<span class="icon" style="width:${size}px;height:${size}px">${ICONS[name] || ""}</span>`;
}

/* ============================================================================
   COMPONENTES (funções que retornam HTML em string)
============================================================================ */
function gradientArt(genre, seed, opts) {
  opts = opts || {};
  const c1 = GENRE_COLORS[genre] || "#8B6BFF";
  const c2 = hashColor(seed || "x");
  const bg = `radial-gradient(120% 140% at 15% 0%, ${c1}CC 0%, transparent 55%), radial-gradient(120% 140% at 100% 100%, ${c2}CC 0%, transparent 55%), linear-gradient(160deg, #1D1626 0%, #120E1A 100%)`;
  const iconSize = opts.big ? 120 : 56;
  const labelSize = opts.big ? 34 : 20;
  return `<div class="gart" style="background:${bg}">
    <span class="gart-icon" style="width:${iconSize}px;height:${iconSize}px">${ICONS[opts.icon || "music"]}</span>
    ${opts.label ? `<span class="gart-label" style="font-size:${labelSize}px">${esc(opts.label)}</span>` : ""}
  </div>`;
}
function genrePill(genre, big) {
  const c = GENRE_COLORS[genre] || "#8B6BFF";
  return `<span class="pill${big ? " lg" : ""}" style="background:${c}26;color:${c}"><span class="dot" style="background:${c}"></span>${esc(genre)}</span>`;
}
function avatar(name, size) {
  size = size || 36;
  const c = hashColor(name);
  return `<div class="avatar" style="width:${size}px;height:${size}px;background:${c}30;color:${c};font-size:${Math.round(size * 0.38)}px">${initials(name)}</div>`;
}
function iconBtn(name, active, activeColor, action, id, extraAttrs) {
  const color = active ? activeColor : "var(--ink-mid)";
  const bg = active ? `${activeColor}22` : "var(--surface2)";
  const border = active ? activeColor : "var(--border)";
  const filled = active && (name === "heart" || name === "star") ? (name === "heart" ? ICONS.heartFill : ICONS.starFill) : ICONS[name];
  return `<button class="icon-btn" style="background:${bg};border-color:${border};color:${color}" data-action="${action}" data-id="${esc(id)}" ${extraAttrs || ""}><span class="icon" style="width:16px;height:16px">${filled}</span></button>`;
}
function countdownBadge(dateIso) {
  const d = daysUntil(dateIso);
  if (d < 0 || d > 14) return "";
  return `<div class="countdown">${d === 0 ? "É hoje!" : `Faltam ${d} dias`}</div>`;
}
function eventCardHTML(ev, saved, interested, wide) {
  const genreForArt = ev.genre === "Festival" ? "Festival" : ev.genre;
  const iconName = ev.type === "festival" ? "party" : "music";
  return `<div class="event-card${wide ? " wide" : ""}" data-action="open-event" data-id="${ev.id}">
    <div class="cover">
      ${gradientArt(genreForArt, ev.id, { label: ev.title.split(" ")[0], icon: iconName })}
      <div class="top-row">
        <div class="badges">${genrePill(ev.genre)}${ev.type === "festival" ? `<span class="fest-badge">Festival</span>` : ""}</div>
        <button class="icon-btn" style="${saved ? "background:rgba(255,90,110,0.18);border-color:var(--flame);color:var(--flame)" : "background:rgba(0,0,0,0.35);border-color:transparent;color:#fff"}" data-action="toggle-save" data-id="${ev.id}" data-stop="1">
          <span class="icon" style="width:16px;height:16px">${saved ? ICONS.heartFill : ICONS.heart}</span>
        </button>
      </div>
      ${countdownBadge(ev.date)}
    </div>
    <div class="perforation"><span class="dash"></span><span class="hole left"></span><span class="hole right"></span></div>
    <div class="body">
      <h3 class="title">${esc(ev.title)}</h3>
      <div class="meta">${icon("calendar", 13)}<span>${fmtDate(ev.date)}${ev.endDate ? ` – ${fmtDate(ev.endDate)}` : ""} · ${ev.time}</span></div>
      <div class="meta last">${icon("pin", 13)}<span>${esc(ev.venue)}, ${esc(ev.city)}</span></div>
      <div class="bottom-row">
        <span class="price">${money(ev.price)}</span>
        <button class="btn ${interested ? "btn-flame" : "btn-ghost-mid"} btn-sm" data-action="toggle-interest" data-id="${ev.id}" data-stop="1">
          ${icon(interested ? "starFill" : "star", 12)} ${interested ? "Interessado" : "Interesse"}
        </button>
      </div>
    </div>
  </div>`;
}
function artistCardHTML(a, following) {
  return `<div class="artist-card" data-action="open-artist" data-id="${a.id}">
    <div class="cover">${gradientArt(a.genre, a.id, { label: initials(a.name) })}</div>
    <div class="body">
      <div class="name-row"><span class="name">${esc(a.name)}</span>${a.verified ? icon("shield", 13) : ""}</div>
      <p class="fans">${(a.fans / 1000).toFixed(0)} mil fãs</p>
      <button class="btn btn-block btn-sm" style="${following ? "background:var(--surface2);color:var(--ink-mid);border:1px solid var(--border)" : "background:var(--electric);color:#fff"}" data-action="toggle-follow" data-id="${a.id}" data-stop="1">
        ${following ? icon("userCheck", 12) + " Seguindo" : icon("userPlus", 12) + " Seguir"}
      </button>
    </div>
  </div>`;
}
function shelfHTML(title, sub, iconName, seeAllView, cardsHTML) {
  return `<section class="shelf">
    <div class="shelf-head">
      <div>
        <div class="shelf-title-row">${iconName ? `<span style="color:var(--flame);width:18px;height:18px" class="icon">${ICONS[iconName]}</span>` : ""}<h2 class="shelf-title">${esc(title)}</h2></div>
        ${sub ? `<p class="shelf-sub">${esc(sub)}</p>` : ""}
      </div>
      ${seeAllView ? `<button class="shelf-seeall" data-action="nav" data-id="${seeAllView}">Ver tudo ${icon("chevronRight", 14)}</button>` : ""}
    </div>
    <div class="shelf-scroll">${cardsHTML}</div>
  </section>`;
}
function emptyStateHTML(iconName, title, text) {
  return `<div class="empty-state">
    <div class="icon-wrap"><span class="icon" style="width:26px;height:26px">${ICONS[iconName]}</span></div>
    <h3>${esc(title)}</h3><p>${esc(text)}</p>
  </div>`;
}
function statCardHTML(label, value, iconName, accent) {
  return `<div class="stat-card">
    <div class="icon-wrap" style="background:${accent}20"><span class="icon" style="width:16px;height:16px;color:${accent}">${ICONS[iconName]}</span></div>
    <div class="value">${value}</div><div class="label">${esc(label)}</div>
  </div>`;
}
function selectHTML(id, options, placeholder, currentVal) {
  return `<select id="${id}" class="field" data-action="filter-change" data-id="${id}">
    <option value="">${esc(placeholder)}</option>
    ${options.map((o) => `<option value="${esc(o)}" ${currentVal === o ? "selected" : ""}>${esc(o)}</option>`).join("")}
  </select>`;
}
function segHTML(id, options, current) {
  return `<div class="seg">${options.map((o) => `<button class="${current === o.value ? "active" : ""}" data-action="seg-change" data-id="${id}" data-value="${o.value}">${icon(o.icon, 13.5)} ${esc(o.label)}</button>`).join("")}</div>`;
}

/* ============================================================================
   MAPA DO BRASIL (estilizado)
============================================================================ */
function brazilMapHTML(events, mapKey) {
  const cities = {};
  events.forEach((e) => { (cities[e.city] = cities[e.city] || []).push(e); });
  const sel = state.mapSel[mapKey] || null;
  let markers = "";
  Object.entries(cities).forEach(([city, evs]) => {
    const pos = CITY_POS[city] || [50, 50];
    const active = sel === city;
    const size = 14 + Math.min(evs.length, 4) * 4;
    markers += `<button class="marker" style="left:${pos[0]}%;top:${pos[1]}%;width:${size}px;height:${size}px;background:${active ? "var(--gold)" : "var(--flame)"};box-shadow:0 0 0 ${active ? 5 : 3}px ${active ? "rgba(244,185,66,0.2)" : "rgba(255,90,110,0.13)"}" data-action="map-select" data-mapkey="${mapKey}" data-id="${esc(city)}">${evs.length}</button>`;
  });
  let popover = "";
  if (sel && cities[sel]) {
    popover = `<div class="map-popover">
      <div class="head"><h4 class="display" style="font-size:13.5px;margin:0">Eventos em ${esc(sel)}</h4><button data-action="map-select" data-mapkey="${mapKey}" data-id="">${icon("x", 15)}</button></div>
      ${cities[sel].map((e) => `<div class="row" data-action="open-event" data-id="${e.id}">
        <div style="min-width:0"><p style="margin:0;font-size:12.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(e.title)}</p><p style="margin:0;font-size:11px;color:var(--ink-mid)">${fmtDate(e.date)} · ${esc(e.venue)}</p></div>
        ${icon("chevronRight", 14)}
      </div>`).join("")}
    </div>`;
  }
  return `<div class="card" style="padding:20px">
    <div class="brmap-wrap">
      <div class="brmap"><div class="shape"></div>${markers}</div>
      <p class="map-hint">Toque em um marcador para ver os eventos da cidade</p>
    </div>
    ${popover}
  </div>`;
}

/* ============================================================================
   ESTADO GLOBAL
============================================================================ */
const state = {
  theme: "dark",
  authed: true,
  view: "home",
  selectedId: null,
  toast: "",
  user: { name: "Marina Duarte", username: "marina.duarte", city: "São Paulo, SP", bio: "Apaixonada por sertanejo e boas rodas de samba. Já fui a vários shows esse ano e não perco um festival 🎤🎶", genres: ["Sertanejo", "Samba", "Pop"] },
  events: JSON.parse(JSON.stringify(EVENTS_SEED)),
  saved: new Set(["e9", "f1"]),
  interested: new Set(["e6", "e1", "f4"]),
  following: new Set(["a1", "a4", "a9"]),
  followingCommunities: new Set(["a1", "a9"]),
  likedPosts: new Set(),
  communities: JSON.parse(JSON.stringify(COMMUNITY_SEED)),
  notifs: JSON.parse(JSON.stringify(NOTIFS_SEED)),
  mapSel: {},
  discover: { q: "", state: "", genre: "", price: "", viewMode: "list", calMonth: 9, calDay: null },
  community: { tab: "Todos" },
  organizer: { modalOpen: false },
  admin: { tab: "Usuários" },
  profile: { tab: "Sobre" },
  auth: { mode: "login", step: 0, form: { name: "", username: "", genres: [], artists: [], city: "" } },
};

function findCommunity(artistId) { return state.communities.find((c) => c.artistId === artistId); }

/* ============================================================================
   AÇÕES (mudam o estado)
============================================================================ */
function notify(msg) {
  state.toast = msg;
  render();
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => { state.toast = ""; render(); }, 2400);
}
function goto(view, id) {
  state.view = view;
  state.selectedId = id != null ? id : null;
  window.scrollTo({ top: 0 });
  render();
}
function toggleSetVal(set, id) { if (set.has(id)) set.delete(id); else set.add(id); }
function toggleSave(id) { const had = state.saved.has(id); toggleSetVal(state.saved, id); notify(had ? "Removido dos salvos" : "Evento salvo!"); }
function toggleInterest(id) { const had = state.interested.has(id); toggleSetVal(state.interested, id); notify(had ? "Interesse removido" : "Interesse marcado!"); }
function toggleFollow(id) { const had = state.following.has(id); toggleSetVal(state.following, id); notify(had ? "Deixou de seguir" : "Agora você segue este artista!"); }
function toggleFollowCommunity(id) { const had = state.followingCommunities.has(id); toggleSetVal(state.followingCommunities, id); notify(had ? "Saiu da comunidade" : "Você entrou na comunidade!"); }
function toggleLike(id) { toggleSetVal(state.likedPosts, id); render(); }
function markNotifRead(id) { const n = state.notifs.find((x) => x.id === id); if (n) n.read = true; render(); }
function addPost(artistId, text, category) {
  const c = findCommunity(artistId);
  if (!c) return;
  c.posts.unshift({ id: "np" + Date.now(), author: state.user.username, category, text, likes: 0, comments: 0, time: "agora", hasImage: false });
}
function addEvent(ev) { state.events.unshift(ev); }
function logout() { state.authed = false; state.view = "home"; render(); }

/* ============================================================================
   TELA: HOME
============================================================================ */
function viewHome() {
  const events = state.events;
  const featured = events.find((e) => e.featured) || events[0];
  const userCity = state.user.city.split(",")[0].trim();
  const userState = (state.user.city.split(",")[1] || "").trim();
  const perto = events.filter((e) => e.city === userCity || e.state === userState).slice(0, 8);
  const emAlta = [...events].sort((a, b) => b.interested - a.interested).slice(0, 8);
  const festivals = events.filter((e) => e.type === "festival");
  const popularArtists = [...ARTISTS].sort((a, b) => b.fans - a.fans).slice(0, 10);
  const talvez = events.filter((e) => state.user.genres.includes(e.genre) || (e.genres && e.genres.some((g) => state.user.genres.includes(g)))).slice(0, 8);

  const heroGenres = (featured.genres || [featured.genre]).slice(0, 4);
  let html = `
  <div class="hero">
    ${gradientArt("Festival", featured.id, { icon: "party", big: true })}
    <div class="scrim"></div>
    <div class="tag">${icon("trending", 14)} Em destaque</div>
    <div class="content">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">${heroGenres.map((g) => genrePill(g)).join("")}</div>
      <h1>${esc(featured.title)}</h1>
      <div class="meta-row">
        <span>${icon("calendar", 14)}${fmtDate(featured.date)}${featured.endDate ? ` – ${fmtDate(featured.endDate)}` : ""}</span>
        <span>${icon("pin", 14)}${esc(featured.city)}, ${featured.state}</span>
        <span>${icon("users", 14)}${(featured.interested / 1000).toFixed(1)} mil interessados</span>
      </div>
      <p class="lineup">${esc(artistNames(featured.artistIds).join(" · "))}</p>
      <div class="actions">
        <button class="btn btn-flame" data-action="open-event" data-id="${featured.id}">Ver evento ${icon("arrowRight", 15)}</button>
        <button class="btn btn-hero-ghost" data-action="toggle-save" data-id="${featured.id}">${icon(state.saved.has(featured.id) ? "heartFill" : "heart", 16)} Salvar</button>
      </div>
    </div>
  </div>
  <div class="page" style="padding-top:0">`;

  if (perto.length) html += shelfHTML("Eventos perto de você", `Baseado em ${state.user.city}`, "pin", "discover", perto.map((e) => eventCardHTML(e, state.saved.has(e.id), state.interested.has(e.id))).join(""));
  html += shelfHTML("Em alta", "Os eventos mais comentados da semana", "trending", "discover", emAlta.map((e) => eventCardHTML(e, state.saved.has(e.id), state.interested.has(e.id))).join(""));
  html += shelfHTML("Artistas populares", "Quem está bombando agora", "star", "discover", popularArtists.map((a) => artistCardHTML(a, state.following.has(a.id))).join(""));
  html += shelfHTML("Festivais em destaque", "Vários artistas, um só ingresso", "party", "discover", festivals.map((e) => eventCardHTML(e, state.saved.has(e.id), state.interested.has(e.id))).join(""));
  if (talvez.length) html += shelfHTML("Talvez você goste", `Porque você curte ${state.user.genres.slice(0, 2).join(" e ")}`, "sparkles", "discover", talvez.map((e) => eventCardHTML(e, state.saved.has(e.id), state.interested.has(e.id))).join(""));
  html += `</div>`;
  return html;
}

/* ============================================================================
   TELA: DESCOBRIR
============================================================================ */
function filteredEvents() {
  const f = state.discover;
  return state.events.filter((e) => {
    const q = f.q.toLowerCase();
    const matchQ = !q || e.title.toLowerCase().includes(q) || e.city.toLowerCase().includes(q) || artistNames(e.artistIds).join(" ").toLowerCase().includes(q);
    const matchState = !f.state || e.state === f.state;
    const matchGenre = !f.genre || e.genre === f.genre || (e.genres && e.genres.includes(f.genre));
    const matchPrice = !f.price || (f.price === "ate50" && e.price <= 50) || (f.price === "50-100" && e.price > 50 && e.price <= 100) || (f.price === "100-200" && e.price > 100 && e.price <= 200) || (f.price === "200+" && e.price > 200);
    return matchQ && matchState && matchGenre && matchPrice;
  });
}
function viewDiscover() {
  const f = state.discover;
  const filtered = filteredEvents();
  let html = `<div class="page">
    <h1 class="display" style="font-size:28px;margin:0 0 16px">Descobrir</h1>
    <div class="search-wrap">
      ${icon("search", 17)}
      <input id="discover-search" class="input-lg" placeholder="Buscar artistas, eventos, festivais ou cidades" value="${esc(f.q)}" data-action="search-input" />
    </div>
    <div class="filters-row">
      ${selectHTML("filter-state", ESTADOS, "Estado", f.state)}
      ${selectHTML("filter-genre", GENRES, "Gênero", f.genre)}
      ${selectHTML("filter-price", ["ate50", "50-100", "100-200", "200+"], "Faixa de preço", f.price)}
      ${(f.state || f.genre || f.price || f.q) ? `<button class="chip" style="color:var(--flame);background:transparent" data-action="clear-filters">${icon("x", 13)} Limpar filtros</button>` : ""}
      <div class="spacer">${segHTML("discover-viewmode", [{ value: "list", label: "Lista", icon: "grid" }, { value: "calendar", label: "Calendário", icon: "calendar" }, { value: "map", label: "Mapa", icon: "map" }], f.viewMode)}</div>
    </div>
    <p style="font-size:12.5px;color:var(--ink-mid);margin:0 0 16px">${filtered.length} evento${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}</p>`;

  if (f.viewMode === "list") {
    html += filtered.length
      ? `<div class="grid-events">${filtered.map((e) => eventCardHTML(e, state.saved.has(e.id), state.interested.has(e.id), true)).join("")}</div>`
      : emptyStateHTML("search", "Nada por aqui ainda", "Tente ajustar os filtros ou buscar por outro termo, artista ou cidade.");
  } else if (f.viewMode === "calendar") {
    const monthNames = { 9: "Setembro", 10: "Outubro", 11: "Novembro", 12: "Dezembro" };
    const monthEvents = filtered.filter((e) => new Date(e.date + "T00:00:00").getMonth() + 1 === f.calMonth);
    const dayEvents = f.calDay ? monthEvents.filter((e) => new Date(e.date + "T00:00:00").getDate() === f.calDay) : monthEvents;
    const daysInMonth = new Date(2026, f.calMonth, 0).getDate();
    const firstWeekday = new Date(2026, f.calMonth - 1, 1).getDay();
    html += `<div class="cal-months">${Object.entries(monthNames).map(([m, name]) => `<button class="chip ${f.calMonth === Number(m) ? "active" : ""}" data-action="cal-month" data-id="${m}">${name}</button>`).join("")}</div>
      <div class="card" style="padding:16px">
        <div class="cal-grid">${["D", "S", "T", "Q", "Q", "S", "S"].map((d) => `<div class="wd">${d}</div>`).join("")}</div>
        <div class="cal-grid">`;
    for (let i = 0; i < firstWeekday; i++) html += `<div></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const evs = monthEvents.filter((e) => new Date(e.date + "T00:00:00").getDate() === d);
      const active = f.calDay === d;
      html += `<button class="cal-day ${evs.length ? "has-event" : ""} ${active ? "active" : ""}" data-action="cal-day" data-id="${d}">${d}${evs.length ? '<span class="cdot"></span>' : ""}</button>`;
    }
    html += `</div></div>
      <div style="margin-top:20px">
        <h3 class="display" style="font-size:14px;margin:0 0 12px">${f.calDay ? `Eventos em ${f.calDay} de ${monthNames[f.calMonth]}` : `Todos os eventos de ${monthNames[f.calMonth]}`}</h3>
        ${dayEvents.length ? `<div class="grid-events">${dayEvents.map((e) => eventCardHTML(e, state.saved.has(e.id), state.interested.has(e.id), true)).join("")}</div>` : emptyStateHTML("calendar", "Sem eventos nessa data", "Escolha outro dia no calendário para ver a programação.")}
      </div>`;
  } else if (f.viewMode === "map") {
    html += brazilMapHTML(filtered, "discover");
  }
  html += `</div>`;
  return html;
}

/* ============================================================================
   TELA: EVENTO — DETALHE
============================================================================ */
const FAN_NAMES = ["marina.duarte", "joao.pedro", "beatriz_ss", "lucasfan", "carol.rocha", "thiagoo", "aninha23", "renan.silva"];
function viewEvent() {
  const ev = byId(state.events, state.selectedId);
  if (!ev) return emptyStateHTML("ticket", "Evento não encontrado", "Volte e escolha outro evento.");
  const saved = state.saved.has(ev.id), interested = state.interested.has(ev.id);
  const genreForArt = ev.genre === "Festival" ? "Festival" : ev.genre;
  return `
  <div class="detail-hero">
    ${gradientArt(genreForArt, ev.id, { icon: ev.type === "festival" ? "party" : "music", big: true })}
    <div class="scrim"></div>
    <div class="content">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">${(ev.genres || [ev.genre]).map((g) => genrePill(g)).join("")}</div>
      <h1>${esc(ev.title)}</h1>
      <div style="display:flex;align-items:center;gap:6px;margin-top:8px;color:#fff">${icon("starFill", 14)}<span style="font-size:13px;font-weight:700">${ev.rating || "—"}</span><span style="font-size:12.5px;color:rgba(255,255,255,0.6)">avaliação dos fãs</span></div>
    </div>
  </div>
  <div class="detail-wrap">
    <div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px">
        <button class="btn btn-sm" style="${saved ? "background:var(--flame);color:#fff" : "background:var(--surface2);color:var(--ink);border:1px solid var(--border)"}" data-action="toggle-save" data-id="${ev.id}">${icon(saved ? "heartFill" : "heart", 15)} ${saved ? "Salvo" : "Salvar evento"}</button>
        <button class="btn btn-sm" style="${interested ? "background:var(--gold);color:#1B1425" : "background:var(--surface2);color:var(--ink);border:1px solid var(--border)"}" data-action="toggle-interest" data-id="${ev.id}">${icon(interested ? "starFill" : "star", 15)} Tenho interesse</button>
        <button class="btn btn-electric btn-sm" style="margin-left:auto" data-action="ticket-click" data-id="${ev.id}">${icon("ticket", 15)} Ver ingressos</button>
      </div>
      <div class="info-boxes">
        <div class="info-box">${icon("calendar", 17)}<div><p style="margin:0;font-size:12px;font-weight:700">${fmtDateFull(ev.date)}</p><p style="margin:0;font-size:11.5px;color:var(--ink-mid)">${ev.time}${daysUntil(ev.date) >= 0 ? ` · faltam ${daysUntil(ev.date)} dias` : ""}</p></div></div>
        <div class="info-box">${icon("pin", 17)}<div><p style="margin:0;font-size:12px;font-weight:700">${esc(ev.venue)}</p><p style="margin:0;font-size:11.5px;color:var(--ink-mid)">${esc(ev.city)}, ${ev.state}</p></div></div>
      </div>
      <h2 class="section-title">Sobre o evento</h2>
      <p style="font-size:13.5px;line-height:1.6;color:var(--ink-mid);margin:0 0 26px">${esc(ev.description)}</p>
      <h2 class="section-title">Programação</h2>
      <div style="margin-bottom:26px">${ev.lineup.map((l) => `<div class="timeline-item"><span class="time-badge">${esc(l.time)}</span><span style="font-size:13px;font-weight:600">${esc(l.act)}</span></div>`).join("")}</div>
      <h2 class="section-title">Artistas participantes</h2>
      <div style="display:flex;gap:12px;overflow-x:auto;padding-bottom:8px;margin-bottom:26px">
        ${ev.artistIds.map((id) => { const a = byId(ARTISTS, id); return a ? `<div class="artist-chip" data-action="open-artist" data-id="${a.id}">${avatar(a.name, 38)}<div><p style="margin:0;font-size:12.5px;font-weight:700">${esc(a.name)}</p><p style="margin:0;font-size:11px;color:var(--ink-mid)">${esc(a.genre)}</p></div></div>` : ""; }).join("")}
      </div>
      <h2 class="section-title">Informações importantes</h2>
      <ul class="info-list">${ev.info.map((i) => `<li>${icon("check", 14)}<span>${esc(i)}</span></li>`).join("")}</ul>
    </div>
    <div>
      <div class="sticky-card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px"><span style="font-size:12px;color:var(--ink-mid)">A partir de</span><span class="display" style="font-weight:800;font-size:21px">${money(ev.price)}</span></div>
        <p style="font-size:11.5px;color:var(--ink-low);margin:0 0 16px">Valor médio do ingresso · site oficial</p>
        <h3 class="display" style="font-size:14px;margin:0 0 12px">Quem vai? <span style="color:var(--ink-mid);font-weight:600">(${(ev.interested / 1000).toFixed(1)} mil)</span></h3>
        <div class="who-avatars">${FAN_NAMES.slice(0, 8).map((n) => avatar(n, 30)).join("")}<div class="who-more">+${Math.round(ev.interested / 1000)}k</div></div>
        <p style="font-size:12px;color:var(--ink-mid);margin:0">${FAN_NAMES[0]}, ${FAN_NAMES[1]} e outras ${(ev.going / 1000).toFixed(1)} mil pessoas confirmaram presença.</p>
      </div>
    </div>
  </div>`;
}

/* ============================================================================
   TELA: ARTISTA — DETALHE
============================================================================ */
function viewArtist() {
  const a = byId(ARTISTS, state.selectedId);
  if (!a) return emptyStateHTML("user", "Artista não encontrado", "Volte e escolha outro artista.");
  const shows = state.events.filter((e) => e.artistIds.includes(a.id));
  const community = findCommunity(a.id);
  const following = state.following.has(a.id);
  const discografia = [`${a.name.split(" ")[0]} ao Vivo (2025)`, "Raízes & Caminhos (2023)", "Primeiros Acordes (2021)"];
  return `
  <div class="detail-hero">
    ${gradientArt(a.genre, a.id, { icon: "music", big: true })}
    <div class="scrim"></div>
    <div class="content" style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:14px">
      <div>
        ${genrePill(a.genre)}
        <div style="display:flex;align-items:center;gap:8px;margin-top:10px"><h1>${esc(a.name)}</h1>${a.verified ? `<span class="icon" style="width:22px;height:22px;color:var(--electric)">${ICONS.shield}</span>` : ""}</div>
        <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:4px 0 0">${(a.fans / 1000).toFixed(0)} mil fãs · ${esc(a.city)}</p>
      </div>
      <button class="btn" style="${following ? "background:rgba(255,255,255,0.15);color:#fff" : "background:var(--flame);color:#fff"}" data-action="toggle-follow" data-id="${a.id}">${following ? icon("userCheck", 15) + " Seguindo" : icon("userPlus", 15) + " Seguir"}</button>
    </div>
  </div>
  <div class="page-mid" style="padding:16px 16px 40px">
    <p style="font-size:13.5px;line-height:1.6;color:var(--ink-mid);margin:0 0 30px">${esc(a.bio)}</p>
    <h2 class="section-title">Próximos eventos</h2>
    ${shows.length ? `<div class="shelf-scroll" style="margin-bottom:30px">${shows.map((e) => eventCardHTML(e, state.saved.has(e.id), state.interested.has(e.id))).join("")}</div>` : `<p style="font-size:13px;color:var(--ink-low);margin:0 0 30px">Nenhum show marcado no momento. Siga o artista para saber primeiro quando anunciar.</p>`}
    <h2 class="section-title">Discografia</h2>
    <div class="grid-3" style="margin-bottom:30px">${discografia.map((d, i) => `<div style="border:1px solid var(--border);border-radius:12px;overflow:hidden"><div style="aspect-ratio:1/1">${gradientArt(a.genre, a.id + i, { icon: "disc" })}</div><div style="padding:9px"><p style="margin:0;font-size:11px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(d)}</p></div></div>`).join("")}</div>
    <h2 class="section-title">Comunidade</h2>
    ${community ? `<div class="card" style="padding:18px;display:flex;align-items:center;justify-content:space-between;cursor:pointer" data-action="open-community" data-id="${a.id}">
      <div style="display:flex;align-items:center;gap:12px"><div style="width:48px;height:48px;border-radius:12px;overflow:hidden">${gradientArt(a.genre, a.id)}</div><div><p style="margin:0;font-weight:700;font-size:13.5px">Comunidade ${esc(a.name)}</p><p style="margin:0;font-size:12px;color:var(--ink-mid)">${(community.members / 1000).toFixed(0)} mil membros · ${community.posts.length} publicações recentes</p></div></div>
      ${icon("chevronRight", 18)}
    </div>` : `<p style="font-size:13px;color:var(--ink-low)">Comunidade em breve.</p>`}
  </div>`;
}

/* ============================================================================
   TELA: COMUNIDADES
============================================================================ */
function viewCommunities() {
  let html = `<div class="page">
    <h1 class="display" style="font-size:28px;margin:0 0 6px">Comunidades</h1>
    <p style="font-size:13.5px;color:var(--ink-mid);margin:0 0 22px">Converse, compartilhe fotos e acompanhe novidades junto com outros fãs.</p>
    <div class="grid-events">`;
  state.communities.forEach((c) => {
    const a = byId(ARTISTS, c.artistId);
    const isFollowing = state.followingCommunities.has(c.artistId);
    html += `<div class="community-card">
      <div class="cover" data-action="open-community" data-id="${c.artistId}">${gradientArt(a.genre, a.id)}</div>
      <div class="body">
        <div class="thumb">${gradientArt(a.genre, a.id + "x", { label: initials(a.name) })}</div>
        <div data-action="open-community" data-id="${c.artistId}" style="cursor:pointer">
          <h3 class="display" style="font-size:15px;margin:0">${esc(a.name)}</h3>
          <p style="font-size:12px;color:var(--ink-mid);margin:4px 0 12px">${(c.members / 1000).toFixed(0)} mil membros · ${c.posts.length} publicações</p>
        </div>
        <button class="btn btn-block btn-sm" style="${isFollowing ? "background:var(--surface2);color:var(--ink-mid)" : "background:var(--electric);color:#fff"}" data-action="toggle-follow-community" data-id="${c.artistId}">${isFollowing ? "Participando" : "Participar"}</button>
      </div>
    </div>`;
  });
  html += `</div></div>`;
  return html;
}

const CATEGORIES = ["Todos", "Avisos", "Conversas", "Fotos", "Shows", "Música"];
function viewCommunityDetail() {
  const c = findCommunity(state.selectedId);
  const a = byId(ARTISTS, state.selectedId);
  if (!c || !a) return emptyStateHTML("users", "Comunidade não encontrada", "Volte e escolha outra comunidade.");
  const tab = state.community.tab;
  const posts = tab === "Todos" ? c.posts : c.posts.filter((p) => p.category === tab);
  const following = state.followingCommunities.has(a.id);
  return `
  <div class="detail-hero" style="height:160px">${gradientArt(a.genre, a.id, { big: true })}<div class="scrim"></div></div>
  <div class="page-narrow" style="padding:0 16px 40px;margin-top:-32px;position:relative">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:20px;gap:10px">
      <div style="display:flex;align-items:flex-end;gap:12px">
        <div style="width:64px;height:64px;border-radius:16px;overflow:hidden;border:3px solid var(--bg)">${gradientArt(a.genre, a.id + "y", { label: initials(a.name) })}</div>
        <div><h1 class="display" style="font-size:19px;margin:0">${esc(a.name)}</h1><p style="font-size:12px;color:var(--ink-mid);margin:2px 0 0">${(c.members / 1000).toFixed(0)} mil membros</p></div>
      </div>
      <button class="btn btn-sm" style="${following ? "background:var(--surface2);color:var(--ink-mid)" : "background:var(--electric);color:#fff"}" data-action="toggle-follow-community" data-id="${a.id}">${following ? "Participando" : "Participar"}</button>
    </div>
    <div class="cat-tabs">${CATEGORIES.map((cat) => `<button class="chip ${tab === cat ? "active" : ""}" data-action="community-tab" data-id="${cat}">${esc(cat)}</button>`).join("")}</div>
    <div class="composer">
      <textarea id="compose-text" rows="2" placeholder="Compartilhe algo com a comunidade de ${esc(a.name)}...">${esc(state.composeText || "")}</textarea>
      <div class="row">
        ${selectHTML("compose-cat", CATEGORIES.filter((x) => x !== "Todos"), "Categoria", state.composeCat || "Conversas")}
        <button class="btn btn-flame btn-sm" data-action="submit-post" data-id="${a.id}">Publicar</button>
      </div>
    </div>
    ${posts.map((p) => `<div class="post-card">
      <div class="post-head">
        ${avatar(p.author, 34)}
        <div class="who"><p class="name">${esc(p.author)}</p><p class="time">${esc(p.time)}</p></div>
        <span class="cat-tag">${esc(p.category)}</span>
      </div>
      <p class="post-text">${esc(p.text)}</p>
      ${p.hasImage ? `<div class="post-image">${gradientArt(a.genre, p.id, { icon: "camera" })}</div>` : ""}
      <div class="post-actions">
        <button class="${state.likedPosts.has(p.id) ? "liked" : ""}" data-action="toggle-like" data-id="${p.id}">${icon(state.likedPosts.has(p.id) ? "thumbFill" : "thumb", 14)} ${p.likes + (state.likedPosts.has(p.id) ? 1 : 0)}</button>
        <span>${icon("comment", 14)} ${p.comments}</span>
        <button style="margin-left:auto" data-action="share-post">${icon("share", 14)} Compartilhar</button>
      </div>
    </div>`).join("")}
  </div>`;
}

/* ============================================================================
   TELA: MEU ROLÊ
============================================================================ */
function viewMeuRole() {
  const viewMode = state.meuRoleView || "list";
  const myEvents = state.events.filter((e) => state.saved.has(e.id) || state.interested.has(e.id)).sort((a, b) => new Date(a.date) - new Date(b.date));
  let html = `<div class="page">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:6px">
      <h1 class="display" style="font-size:28px;margin:0">Meu Rolê</h1>
      ${segHTML("meurole-viewmode", [{ value: "list", label: "Lista", icon: "grid" }, { value: "map", label: "Mapa", icon: "map" }], viewMode)}
    </div>
    <p style="font-size:13.5px;color:var(--ink-mid);margin:0 0 22px">Seus eventos salvos e marcados com interesse, tudo em um só lugar.</p>`;
  if (!myEvents.length) {
    html += emptyStateHTML("ticket", "Seu rolê está vazio", "Salve eventos ou marque interesse para começar a montar sua agenda musical.");
  } else if (viewMode === "map") {
    html += brazilMapHTML(myEvents, "meurole");
  } else {
    myEvents.forEach((e) => {
      const d = daysUntil(e.date);
      html += `<div class="myevent-row">
        <div class="thumb" data-action="open-event" data-id="${e.id}" style="cursor:pointer">${gradientArt(e.genre === "Festival" ? "Festival" : e.genre, e.id)}</div>
        <div class="info" data-action="open-event" data-id="${e.id}" style="cursor:pointer">
          <p style="margin:0;font-weight:700;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(e.title)}</p>
          <p style="margin:0;font-size:12px;color:var(--ink-mid)">${fmtDate(e.date)} · ${esc(e.city)}, ${e.state}</p>
          <p style="margin:2px 0 0;font-size:11.5px;font-weight:700;color:${d >= 0 ? "var(--gold)" : "var(--ink-low)"}">${d >= 0 ? (d === 0 ? "É hoje!" : `Faltam ${d} dias`) : "Evento já passou"}</p>
        </div>
        <div class="actions">
          ${iconBtn("heart", state.saved.has(e.id), "var(--flame)", "toggle-save", e.id)}
          ${iconBtn("star", state.interested.has(e.id), "var(--gold)", "toggle-interest", e.id)}
        </div>
      </div>`;
    });
  }
  html += `</div>`;
  return html;
}

/* ============================================================================
   TELA: PERFIL
============================================================================ */
function viewProfile() {
  const u = state.user;
  const tab = state.profile.tab;
  const savedEvents = state.events.filter((e) => state.saved.has(e.id));
  const followedArtists = ARTISTS.filter((a) => state.following.has(a.id));
  const followedCommunities = state.communities.filter((c) => state.followingCommunities.has(c.artistId));
  let html = `
  <div class="detail-hero" style="height:130px">${gradientArt("Festival", u.username)}</div>
  <div class="page-mid" style="padding:0 16px 40px;margin-top:-48px;position:relative">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:18px">
      <div style="display:flex;align-items:flex-end;gap:14px">
        <div style="width:96px;height:96px;border-radius:16px;overflow:hidden;border:4px solid var(--bg)">${gradientArt("Sertanejo", u.username + "p", { label: initials(u.name) })}</div>
        <div style="padding-bottom:4px"><h1 class="display" style="font-size:19px;margin:0">${esc(u.name)}</h1><p style="font-size:12.5px;color:var(--ink-mid);margin:2px 0 0">@${esc(u.username)} · ${esc(u.city)}</p></div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-sm btn-ghost" data-action="edit-profile-toast">Editar perfil</button>
        <button class="icon-btn" data-action="logout">${icon("logout", 15)}</button>
      </div>
    </div>
    <p style="font-size:13.5px;color:var(--ink-mid);margin:0 0 20px">${esc(u.bio)}</p>
    <div class="stats-grid">
      ${[["Salvos", savedEvents.length], ["Artistas", followedArtists.length], ["Comunidades", followedCommunities.length], ["Histórico", PAST_EVENTS.length]].map(([l, v]) => `<div class="stat-card" style="text-align:center;padding:12px"><div class="display" style="font-weight:800;font-size:18px">${v}</div><div style="font-size:10.5px;color:var(--ink-mid)">${l}</div></div>`).join("")}
    </div>
    <div class="tabs-row">${["Sobre", "Comunidades", "Eventos salvos", "Histórico"].map((t) => `<button class="chip ${tab === t ? "active" : ""}" data-action="profile-tab" data-id="${t}">${t}</button>`).join("")}</div>`;

  if (tab === "Sobre") {
    html += `<h3 class="display" style="font-size:14px;margin:0 0 10px">Gêneros favoritos</h3>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px">${u.genres.map((g) => genrePill(g, true)).join("")}</div>
      <h3 class="display" style="font-size:14px;margin:0 0 10px">Artistas favoritos</h3>
      <div class="shelf-scroll">${followedArtists.map((a) => artistCardHTML(a, true)).join("")}</div>`;
  } else if (tab === "Comunidades") {
    html += `<div class="grid-2">${followedCommunities.map((c) => { const a = byId(ARTISTS, c.artistId); return `<div class="card" style="padding:12px;display:flex;align-items:center;gap:10px">${avatar(a.name, 40)}<div><p style="margin:0;font-weight:700;font-size:13px">${esc(a.name)}</p><p style="margin:0;font-size:11.5px;color:var(--ink-mid)">${(c.members / 1000).toFixed(0)} mil membros</p></div></div>`; }).join("")}</div>`;
  } else if (tab === "Eventos salvos") {
    html += savedEvents.length ? `<div class="grid-events">${savedEvents.map((e) => eventCardHTML(e, true, state.interested.has(e.id), true)).join("")}</div>` : emptyStateHTML("heart", "Nenhum evento salvo", "Toque no coração de um evento para guardá-lo aqui.");
  } else if (tab === "Histórico") {
    html += PAST_EVENTS.map((p) => `<div class="card" style="padding:14px;display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <div style="width:48px;height:48px;border-radius:10px;overflow:hidden;flex-shrink:0">${gradientArt(p.genre, p.id)}</div>
      <div style="flex:1"><p style="margin:0;font-weight:700;font-size:13px">${esc(p.title)}</p><p style="margin:0;font-size:11.5px;color:var(--ink-mid)">${esc(p.artist)} · ${esc(p.city)}</p></div>
      ${icon("check", 16)}
    </div>`).join("");
  }
  html += `</div>`;
  return html;
}

/* ============================================================================
   TELA: NOTIFICAÇÕES
============================================================================ */
const NOTIF_ICON = { show: "megaphone", reminder: "clock", community: "comment", change: "alert" };
function viewNotifications() {
  const groups = [["Recentes", state.notifs.filter((n) => !n.read)], ["Anteriores", state.notifs.filter((n) => n.read)]];
  let html = `<div class="page page-narrow"><h1 class="display" style="font-size:28px;margin:0 0 22px">Notificações</h1>`;
  groups.forEach(([label, list]) => {
    if (!list.length) return;
    html += `<h3 style="font-size:12.5px;text-transform:uppercase;letter-spacing:.03em;color:var(--ink-low);margin:0 0 10px">${label}</h3><div style="margin-bottom:22px">`;
    list.forEach((n) => {
      html += `<div style="display:flex;align-items:flex-start;gap:10px;padding:13px;border-radius:12px;cursor:pointer;margin-bottom:8px;${n.read ? "" : "background:var(--surface);border:1px solid var(--border)"}" data-action="mark-notif" data-id="${n.id}">
        <div style="width:36px;height:36px;border-radius:999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:var(--electric-soft)"><span class="icon" style="width:15px;height:15px;color:var(--electric)">${ICONS[NOTIF_ICON[n.type] || "bell"]}</span></div>
        <div style="flex:1"><p style="margin:0;font-size:13px;font-weight:${n.read ? 500 : 700}">${esc(n.text)}</p><p style="margin:3px 0 0;font-size:11px;color:var(--ink-low)">${esc(n.time)}</p></div>
        ${!n.read ? `<span style="width:8px;height:8px;border-radius:999px;background:var(--flame);margin-top:6px;flex-shrink:0"></span>` : ""}
      </div>`;
    });
    html += `</div>`;
  });
  html += `</div>`;
  return html;
}

/* ============================================================================
   TELA: PAINEL DO ORGANIZADOR
============================================================================ */
function barsHTML(data, accent) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return `<div class="bars">${data.map((d) => `<div class="bar-col"><div class="bar" style="height:${Math.max(6, (d.value / max) * 100)}%;background:${accent}"></div><div class="bar-label">${esc(d.label)}</div></div>`).join("")}</div>`;
}
function lineChartSVG(data, accent) {
  const w = 560, h = 180, pad = 24;
  const max = Math.max(...data.map((d) => d.value)) * 1.15;
  const stepX = (w - pad * 2) / (data.length - 1);
  const pts = data.map((d, i) => `${pad + i * stepX},${h - pad - (d.value / max) * (h - pad * 2)}`).join(" ");
  const dots = data.map((d, i) => `<circle cx="${pad + i * stepX}" cy="${h - pad - (d.value / max) * (h - pad * 2)}" r="3.5" fill="${accent}"/>`).join("");
  const labels = data.map((d, i) => `<text x="${pad + i * stepX}" y="${h - 4}" font-size="10" fill="var(--ink-mid)" text-anchor="middle">${esc(d.label)}</text>`).join("");
  return `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:200px">
    <polyline points="${pts}" fill="none" stroke="${accent}" stroke-width="2.5"/>${dots}${labels}
  </svg>`;
}
function viewOrganizer() {
  const events = state.events;
  const mine = events.slice(0, 6);
  const chartData = mine.map((e) => ({ label: e.title.split(" ").slice(0, 2).join(" "), value: Math.round(e.interested * 1.8) }));
  let html = `<div class="page">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:22px">
      <div><h1 class="display" style="font-size:26px;margin:0">Painel do organizador</h1><p style="font-size:13px;color:var(--ink-mid);margin:4px 0 0">Gerencie seus eventos e acompanhe o desempenho</p></div>
      <button class="btn btn-flame" data-action="open-organizer-modal">${icon("plus", 16)} Cadastrar novo evento</button>
    </div>
    <div class="stats-grid">
      ${statCardHTML("Visualizações totais", "248,3 mil", "eye", "var(--electric)")}
      ${statCardHTML("Pessoas interessadas", "61,2 mil", "star", "var(--gold)")}
      ${statCardHTML("Eventos cadastrados", events.length, "calendar", "var(--flame)")}
      ${statCardHTML("Artistas cadastrados", ARTISTS.length, "users", "var(--green)")}
    </div>
    <div class="card" style="padding:20px;margin-bottom:26px">
      <h3 class="display" style="font-size:14px;margin:0 0 6px">Visualizações por evento</h3>
      ${barsHTML(chartData, "var(--flame)")}
    </div>
    <h3 class="display" style="font-size:14px;margin:0 0 12px">Meus eventos</h3>
    <div class="card row-list">
      ${mine.map((e) => `<div class="row-item">
        <div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0">${gradientArt(e.genre === "Festival" ? "Festival" : e.genre, e.id)}</div>
        <div style="flex:1;min-width:0"><p style="margin:0;font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(e.title)}</p><p style="margin:0;font-size:11.5px;color:var(--ink-mid)">${fmtDate(e.date)} · ${esc(e.city)}</p></div>
        <span style="font-size:11.5px;font-weight:700;color:var(--ink-mid)" class="hide-mobile">${(e.interested / 1000).toFixed(1)} mil interessados</span>
        <span class="status-badge" style="background:rgba(51,181,140,0.18);color:var(--green)">Publicado</span>
      </div>`).join("")}
    </div>
  </div>`;
  if (state.organizer.modalOpen) {
    const f = state.organizer.form || {};
    html += `<div class="modal-overlay" data-action="close-modal">
      <div class="modal-box" data-stop="1">
        <div class="modal-head"><h3 class="display">Cadastrar evento</h3><button data-action="close-modal">${icon("x", 18)}</button></div>
        <div style="display:flex;flex-direction:column;gap:12px">
          <input id="org-title" class="input" placeholder="Nome do evento" value="${esc(f.title || "")}" />
          <div class="grid-2">
            <input id="org-date" type="date" class="input" value="${esc(f.date || "")}" />
            <input id="org-time" type="time" class="input" value="${esc(f.time || "20:00")}" />
          </div>
          <div class="grid-2">
            <input id="org-venue" class="input" placeholder="Local" value="${esc(f.venue || "")}" />
            <input id="org-city" class="input" placeholder="Cidade" value="${esc(f.city || "")}" />
          </div>
          <div class="grid-2">
            ${selectHTML("org-genre", GENRES, "Gênero", f.genre || "")}
            <input id="org-price" class="input" placeholder="Preço (R$)" value="${esc(f.price || "")}" />
          </div>
          <input id="org-link" class="input" placeholder="Link oficial de ingressos" value="${esc(f.link || "")}" />
          <textarea id="org-desc" class="input" rows="3" placeholder="Descrição do evento">${esc(f.desc || "")}</textarea>
          <div class="upload-box">${icon("image", 16)} Capa do evento (upload simulado)</div>
          <button class="btn btn-flame btn-block" data-action="submit-event">Publicar evento</button>
        </div>
      </div>
    </div>`;
  }
  return html;
}

/* ============================================================================
   TELA: PAINEL ADMIN
============================================================================ */
function viewAdmin() {
  const tab = state.admin.tab;
  const growth = [{ label: "Mai", value: 12 }, { label: "Jun", value: 19 }, { label: "Jul", value: 24 }, { label: "Ago", value: 31 }, { label: "Set", value: 38 }];
  const users = [
    { name: "Marina Duarte", city: "São Paulo, SP", status: "Ativo" }, { name: "João Pedro Lima", city: "Recife, PE", status: "Ativo" },
    { name: "Beatriz Souza", city: "Salvador, BA", status: "Pendente" }, { name: "Lucas Fontes", city: "Curitiba, PR", status: "Ativo" },
  ];
  let html = `<div class="page">
    <h1 class="display" style="font-size:26px;margin:0 0 4px">Painel de administração</h1>
    <p style="font-size:13px;color:var(--ink-mid);margin:0 0 22px">Visão geral da plataforma</p>
    <div class="stats-grid">
      ${statCardHTML("Usuários ativos", "42,1 mil", "users", "var(--electric)")}
      ${statCardHTML("Eventos publicados", state.events.length, "calendar", "var(--flame)")}
      ${statCardHTML("Artistas verificados", ARTISTS.filter((a) => a.verified).length, "shield", "var(--green)")}
      ${statCardHTML("Denúncias pendentes", "3", "alert", "var(--gold)")}
    </div>
    <div class="card" style="padding:20px;margin-bottom:26px">
      <h3 class="display" style="font-size:14px;margin:0 0 6px">Crescimento de usuários (mil)</h3>
      <div class="linechart-wrap">${lineChartSVG(growth, "var(--electric)")}</div>
    </div>
    <div class="tabs-row">${["Usuários", "Artistas", "Eventos", "Comunidades"].map((t) => `<button class="chip ${tab === t ? "active" : ""}" data-action="admin-tab" data-id="${t}">${t}</button>`).join("")}</div>
    <div class="card row-list">`;
  if (tab === "Usuários") {
    html += users.map((u) => `<div class="row-item">${avatar(u.name, 34)}<div style="flex:1"><p style="margin:0;font-size:13px;font-weight:700">${esc(u.name)}</p><p style="margin:0;font-size:11.5px;color:var(--ink-mid)">${esc(u.city)}</p></div><span class="status-badge" style="background:${u.status === "Ativo" ? "rgba(51,181,140,0.18)" : "rgba(244,185,66,0.2)"};color:${u.status === "Ativo" ? "var(--green)" : "var(--gold)"}">${u.status}</span><button class="icon-btn" data-action="admin-action">${icon("more", 14)}</button></div>`).join("");
  } else if (tab === "Artistas") {
    html += ARTISTS.slice(0, 8).map((a) => `<div class="row-item">${avatar(a.name, 34)}<div style="flex:1"><p style="margin:0;font-size:13px;font-weight:700">${esc(a.name)}</p><p style="margin:0;font-size:11.5px;color:var(--ink-mid)">${esc(a.genre)} · ${(a.fans / 1000).toFixed(0)} mil fãs</p></div><span class="status-badge" style="background:${a.verified ? "rgba(51,181,140,0.18)" : "var(--surface2)"};color:${a.verified ? "var(--green)" : "var(--ink-mid)"}">${a.verified ? "Verificado" : "Pendente"}</span></div>`).join("");
  } else if (tab === "Eventos") {
    html += state.events.slice(0, 8).map((e) => `<div class="row-item"><div style="width:36px;height:36px;border-radius:8px;overflow:hidden">${gradientArt(e.genre === "Festival" ? "Festival" : e.genre, e.id)}</div><div style="flex:1"><p style="margin:0;font-size:13px;font-weight:700">${esc(e.title)}</p><p style="margin:0;font-size:11.5px;color:var(--ink-mid)">${esc(e.city)}, ${e.state} · ${fmtDate(e.date)}</p></div><button class="icon-btn" data-action="admin-action">${icon("trash", 13.5)}</button></div>`).join("");
  } else if (tab === "Comunidades") {
    html += state.communities.map((c) => { const a = byId(ARTISTS, c.artistId); return `<div class="row-item">${avatar(a.name, 34)}<div style="flex:1"><p style="margin:0;font-size:13px;font-weight:700">Comunidade ${esc(a.name)}</p><p style="margin:0;font-size:11.5px;color:var(--ink-mid)">${(c.members / 1000).toFixed(0)} mil membros · ${c.posts.length} publicações</p></div><span class="status-badge" style="background:rgba(51,181,140,0.18);color:var(--green)">Ativa</span></div>`; }).join("");
  }
  html += `</div></div>`;
  return html;
}

/* ============================================================================
   TELA: AUTENTICAÇÃO / ONBOARDING
============================================================================ */
function viewAuth() {
  const au = state.auth;
  if (au.mode === "login") {
    return `<div class="auth-wrap">
      <div class="auth-card">
        <div class="brand" style="justify-content:center;margin-bottom:26px"><div class="logo">${icon("ticket", 19)}</div><span class="name display">rolezeiro</span></div>
        <div class="auth-box">
          <h1>Bem-vindo de volta</h1><p class="sub">Entre para descobrir seu próximo show.</p>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px">
            <input class="input" placeholder="E-mail" />
            <input class="input" type="password" placeholder="Senha" />
          </div>
          <button class="btn btn-flame btn-block" style="margin-bottom:12px" data-action="do-login">Entrar</button>
          <p style="text-align:center;font-size:12.5px;color:var(--ink-mid)">Não tem conta? <button style="color:var(--electric);font-weight:700;background:none;border:none" data-action="auth-mode" data-id="signup">Cadastre-se</button></p>
        </div>
      </div>
    </div>`;
  }
  const steps = ["Seus dados", "Gêneros favoritos", "Artistas que você acompanha", "Sua cidade"];
  const cities = [...new Set(ARTISTS.map((a) => a.city))];
  const f = au.form;
  let body = "";
  if (au.step === 0) {
    body = `<div style="display:flex;flex-direction:column;gap:10px">
      <input id="auth-name" class="input" placeholder="Nome completo" value="${esc(f.name)}" />
      <input id="auth-username" class="input" placeholder="Nome de usuário" value="${esc(f.username)}" />
      <input class="input" placeholder="E-mail" />
    </div>`;
  } else if (au.step === 1) {
    body = `<div style="display:flex;flex-wrap:wrap;gap:8px">${GENRES.filter((g) => g !== "Festival").map((g) => `<button class="genre-chip-pick ${f.genres.includes(g) ? "picked" : ""}" style="${f.genres.includes(g) ? `background:${GENRE_COLORS[g]};border-color:${GENRE_COLORS[g]}` : ""}" data-action="auth-toggle-genre" data-id="${g}">${g}</button>`).join("")}</div>`;
  } else if (au.step === 2) {
    body = `<div class="pick-scroll">${ARTISTS.map((a) => `<button class="pick-row ${f.artists.includes(a.id) ? "picked" : ""}" data-action="auth-toggle-artist" data-id="${a.id}">${avatar(a.name, 32)}<div style="flex:1;text-align:left"><p style="margin:0;font-size:13px;font-weight:700">${esc(a.name)}</p><p style="margin:0;font-size:11px;color:var(--ink-mid)">${esc(a.genre)}</p></div>${f.artists.includes(a.id) ? icon("check", 16) : ""}</button>`).join("")}</div>`;
  } else if (au.step === 3) {
    body = `<div class="pick-scroll">${cities.map((c) => `<button class="pick-row ${f.city === c ? "picked" : ""}" data-action="auth-set-city" data-id="${esc(c)}">${icon("pin", 14)}<span style="font-size:13px;font-weight:600">${esc(c)}</span></button>`).join("")}</div>`;
  }
  return `<div class="auth-wrap">
    <div class="auth-card" style="max-width:420px">
      <div class="brand" style="justify-content:center;margin-bottom:20px"><div class="logo">${icon("ticket", 19)}</div><span class="name display">rolezeiro</span></div>
      <div class="steps-bar">${steps.map((_, i) => `<div class="seg-step ${i <= au.step ? "done" : ""}"></div>`).join("")}</div>
      <div class="auth-box">
        <h2 class="display" style="font-size:17px;margin:0 0 16px">${steps[au.step]}</h2>
        ${body}
        <div style="display:flex;gap:10px;margin-top:22px">
          ${au.step > 0 ? `<button class="btn btn-ghost-mid" data-action="auth-step-back">Voltar</button>` : ""}
          ${au.step < steps.length - 1 ? `<button class="btn btn-flame" style="flex:1;justify-content:center" data-action="auth-step-next">Continuar ${icon("arrowRight", 15)}</button>` : `<button class="btn btn-flame" style="flex:1;justify-content:center" data-action="auth-complete">Concluir cadastro</button>`}
        </div>
      </div>
      <p style="text-align:center;font-size:12.5px;color:var(--ink-mid);margin-top:14px">Já tem conta? <button style="color:var(--electric);font-weight:700;background:none;border:none" data-action="auth-mode" data-id="login">Entrar</button></p>
    </div>
  </div>`;
}

/* ============================================================================
   SHELL: SIDEBAR / TOPBAR / BOTTOM NAV / TOAST
============================================================================ */
const NAV_MAIN = [
  { key: "home", label: "Início", icon: "home" }, { key: "discover", label: "Descobrir", icon: "compass" },
  { key: "discover", label: "Eventos", icon: "ticket" }, { key: "communities", label: "Comunidades", icon: "users" },
  { key: "meurole", label: "Meu Rolê", icon: "sparkles" },
];
function unreadCount() { return state.notifs.filter((n) => !n.read).length; }
function sidebarHTML() {
  const unread = unreadCount();
  return `<aside class="sidebar">
    <div class="brand"><div class="logo">${icon("ticket", 19)}</div><span class="name display">rolezeiro</span></div>
    <nav class="navlist">
      ${NAV_MAIN.map((i) => `<button class="navlink ${state.view === i.key ? "active" : ""}" data-action="nav" data-id="${i.key}">${icon(i.icon, 18)} ${i.label}</button>`).join("")}
      <div class="navsep"></div>
      <button class="navlink ${state.view === "notifications" ? "active" : ""}" data-action="nav" data-id="notifications">${icon("bell", 18)} Notificações ${unread > 0 ? `<span class="badge">${unread}</span>` : ""}</button>
      <button class="navlink ${state.view === "profile" ? "active" : ""}" data-action="nav" data-id="profile">${icon("user", 18)} Perfil</button>
      <div class="navsep"></div>
      <button class="navlink secondary ${state.view === "organizer" ? "active" : ""}" data-action="nav" data-id="organizer">${icon("building", 17)} Sou organizador</button>
      <button class="navlink secondary ${state.view === "admin" ? "active" : ""}" data-action="nav" data-id="admin">${icon("chart", 17)} Painel admin</button>
    </nav>
    <button class="theme-toggle-btn" data-action="toggle-theme">${icon(state.theme === "dark" ? "sun" : "moon", 16)} ${state.theme === "dark" ? "Modo claro" : "Modo escuro"}</button>
  </aside>`;
}
function topbarHTML() {
  const unread = unreadCount();
  return `<div class="topbar">
    <div class="brand" data-action="nav" data-id="home"><div class="logo">${icon("ticket", 15)}</div><span class="name display">rolezeiro</span></div>
    <div style="display:flex;gap:6px">
      <button class="icon-round" data-action="toggle-theme">${icon(state.theme === "dark" ? "sun" : "moon", 15)}</button>
      <button class="icon-round" data-action="nav" data-id="notifications">${icon("bell", 15)}${unread > 0 ? '<span class="dot"></span>' : ""}</button>
    </div>
  </div>`;
}
function bottomNavHTML() {
  const items = [{ key: "home", label: "Início", icon: "home" }, { key: "discover", label: "Descobrir", icon: "compass" }, { key: "discover", label: "Eventos", icon: "ticket" }, { key: "communities", label: "Comunidades", icon: "users" }, { key: "profile", label: "Perfil", icon: "user" }];
  return `<nav class="bottomnav">
    ${items.map((i) => `<button class="bn-item ${state.view === i.key ? "active" : ""}" data-action="nav" data-id="${i.key}">${icon(i.icon, 20)}<span class="label">${i.label}</span></button>`).join("")}
  </nav>`;
}
function toastHTML() {
  if (!state.toast) return "";
  return `<div class="toast">${icon("check", 15)} ${esc(state.toast)}</div>`;
}
function backLinkHTML() {
  if (!["event", "artist", "community"].includes(state.view)) return "";
  return `<div class="back-wrap"><button class="back-link" data-action="nav" data-id="discover">${icon("arrowLeft", 15)} Voltar</button></div>`;
}
function desktopSearchRowHTML() {
  const skip = ["home", "event", "artist", "community", "discover"];
  if (skip.includes(state.view)) return "";
  return `<div class="desktop-search-row show"><button class="btn btn-ghost btn-sm" data-action="nav" data-id="discover">${icon("search", 14)} Buscar na plataforma</button></div>`;
}

const VIEW_FN = {
  home: viewHome, discover: viewDiscover, event: viewEvent, artist: viewArtist,
  communities: viewCommunities, community: viewCommunityDetail, meurole: viewMeuRole,
  profile: viewProfile, notifications: viewNotifications, organizer: viewOrganizer, admin: viewAdmin,
};

function shellHTML() {
  const fn = VIEW_FN[state.view] || viewHome;
  return `
    ${sidebarHTML()}
    <div class="content-area">
      ${topbarHTML()}
      ${backLinkHTML()}
      ${desktopSearchRowHTML()}
      <main id="view">${fn()}</main>
    </div>
    ${bottomNavHTML()}
    ${toastHTML()}
  `;
}

/* ============================================================================
   RENDER PRINCIPAL
============================================================================ */
function render() {
  document.documentElement.setAttribute("data-theme", state.theme);
  const root = document.getElementById("root");
  const active = document.activeElement;
  let focusInfo = null;
  if (active && active.id && root.contains(active)) {
    focusInfo = { id: active.id, start: active.selectionStart, end: active.selectionEnd };
  }
  root.innerHTML = state.authed ? shellHTML() : viewAuth();
  if (focusInfo) {
    const el = document.getElementById(focusInfo.id);
    if (el) {
      el.focus();
      if (typeof focusInfo.start === "number" && el.setSelectionRange) {
        try { el.setSelectionRange(focusInfo.start, focusInfo.end); } catch (e) {}
      }
    }
  }
}

/* ============================================================================
   EVENTOS (delegação única no #root)
============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  root.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    if (el.dataset.stop) e.stopPropagation();
    const action = el.dataset.action;
    const id = el.dataset.id;

    switch (action) {
      case "nav": goto(id); break;
      case "open-event": goto("event", id); break;
      case "open-artist": goto("artist", id); break;
      case "open-community": state.community.tab = "Todos"; goto("community", id); break;
      case "toggle-save": toggleSave(id); render(); break;
      case "toggle-interest": toggleInterest(id); render(); break;
      case "toggle-follow": toggleFollow(id); render(); break;
      case "toggle-follow-community": toggleFollowCommunity(id); render(); break;
      case "toggle-like": toggleLike(id); break;
      case "mark-notif": markNotifRead(id); break;
      case "toggle-theme": state.theme = state.theme === "dark" ? "light" : "dark"; render(); break;
      case "logout": logout(); break;
      case "edit-profile-toast": notify("Edição de perfil em breve."); break;
      case "ticket-click": notify("Redirecionando para o site oficial de ingressos…"); break;
      case "share-post": notify("Link copiado!"); break;
      case "admin-action": notify("Ação registrada."); break;
      case "clear-filters": state.discover.q = ""; state.discover.state = ""; state.discover.genre = ""; state.discover.price = ""; render(); break;
      case "seg-change": {
        if (id === "discover-viewmode") state.discover.viewMode = el.dataset.value;
        if (id === "meurole-viewmode") state.meuRoleView = el.dataset.value;
        render();
        break;
      }
      case "cal-month": state.discover.calMonth = Number(id); state.discover.calDay = null; render(); break;
      case "cal-day": { const d = Number(id); state.discover.calDay = state.discover.calDay === d ? null : d; render(); break; }
      case "map-select": { const key = el.dataset.mapkey; state.mapSel[key] = state.mapSel[key] === id ? null : (id || null); render(); break; }
      case "profile-tab": state.profile.tab = id; render(); break;
      case "admin-tab": state.admin.tab = id; render(); break;
      case "community-tab": state.community.tab = id; render(); break;
      case "submit-post": {
        const ta = document.getElementById("compose-text");
        const cat = document.getElementById("compose-cat");
        const text = ta ? ta.value.trim() : "";
        if (!text) { notify("Escreva algo antes de publicar."); break; }
        addPost(id, text, (cat && cat.value) || "Conversas");
        state.composeText = ""; state.composeCat = "Conversas";
        notify("Publicação criada!");
        render();
        break;
      }
      case "open-organizer-modal": state.organizer.modalOpen = true; state.organizer.form = {}; render(); break;
      case "close-modal": if (e.target === el) { state.organizer.modalOpen = false; render(); } break;
      case "submit-event": {
        const val = (sel) => { const n = document.getElementById(sel); return n ? n.value : ""; };
        const title = val("org-title"), date = val("org-date");
        if (!title || !date) { notify("Preencha ao menos o nome e a data do evento."); break; }
        const genre = val("org-genre") || "Sertanejo";
        const time = val("org-time") || "20:00";
        addEvent({
          id: "e" + Date.now(), type: "show", title, genre, artistIds: [], date, time,
          venue: val("org-venue") || "Local a definir", city: val("org-city") || "São Paulo", state: "SP",
          price: Number(val("org-price")) || 0, interested: 0, going: 0, rating: 0,
          description: val("org-desc") || "Descrição em breve.", lineup: [{ time, act: title }],
          info: ["Classificação: livre", "Informações adicionais em breve"],
        });
        state.organizer.modalOpen = false;
        notify("Evento publicado com sucesso!");
        render();
        break;
      }
      case "auth-mode": state.auth.mode = id; render(); break;
      case "do-login": {
        state.authed = true;
        state.user = { name: "Marina Duarte", username: "marina.duarte", city: "São Paulo, SP", bio: "Apaixonada por sertanejo e boas rodas de samba. Já fui a vários shows esse ano e não perco um festival 🎤🎶", genres: ["Sertanejo", "Samba", "Pop"] };
        state.following = new Set(["a1", "a4", "a9"]);
        state.view = "home";
        render();
        break;
      }
      case "auth-toggle-genre": { const g = state.auth.form.genres; const i = g.indexOf(id); if (i > -1) g.splice(i, 1); else g.push(id); render(); break; }
      case "auth-toggle-artist": { const a = state.auth.form.artists; const i = a.indexOf(id); if (i > -1) a.splice(i, 1); else a.push(id); render(); break; }
      case "auth-set-city": state.auth.form.city = id; render(); break;
      case "auth-step-back": state.auth.step = Math.max(0, state.auth.step - 1); render(); break;
      case "auth-step-next": {
        if (state.auth.step === 0) {
          state.auth.form.name = (document.getElementById("auth-name") || {}).value || "";
          state.auth.form.username = (document.getElementById("auth-username") || {}).value || "";
        }
        state.auth.step = Math.min(3, state.auth.step + 1);
        render();
        break;
      }
      case "auth-complete": {
        const f = state.auth.form;
        state.user = {
          name: f.name || "Novo Fã", username: (f.username || "fa.musica").toLowerCase().replace(/\s/g, ""),
          city: f.city || "São Paulo, SP", bio: "Novo por aqui, pronto para descobrir meu próximo show 🎶",
          genres: f.genres && f.genres.length ? f.genres : ["Sertanejo", "Pop"],
        };
        if (f.artists && f.artists.length) state.following = new Set(f.artists);
        state.authed = true;
        state.view = "home";
        render();
        break;
      }
    }
  });

  root.addEventListener("input", (e) => {
    const t = e.target;
    if (t.id === "discover-search") { state.discover.q = t.value; render(); }
  });

  root.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset && t.dataset.action === "filter-change") {
      if (t.id === "filter-state") state.discover.state = t.value;
      if (t.id === "filter-genre") state.discover.genre = t.value;
      if (t.id === "filter-price") state.discover.price = t.value;
      render();
    }
  });

  render();
});
