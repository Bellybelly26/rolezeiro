import React, { useState, useMemo, useEffect, createContext, useContext, useRef } from "react";
import {
  Search, MapPin, Calendar, CalendarDays, Heart, Bell, User, Home, Compass, Users,
  Ticket, Music, Play, Share2, MessageCircle, ChevronRight, ChevronLeft,
  Filter, X, Check, Plus, TrendingUp, Star, Clock, ArrowRight, ArrowLeft, LogOut,
  Settings, BarChart3, Eye, Building2, Radio, Menu, Map as MapIcon, LayoutGrid,
  Sparkles, Flame, Camera, Image as ImageIcon, Megaphone, Disc3, CheckCircle2,
  AlertTriangle, Trash2, UserPlus, UserCheck, Volume2, PartyPopper, Sun, Moon,
  ShieldCheck, ListMusic, MoreHorizontal, ThumbsUp
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

/* ============================================================================
   TEMA
============================================================================ */
const DARK = {
  bg: "#120E1A", bg2: "#170F22", surface: "#1D1626", surface2: "#251A33",
  border: "rgba(255,255,255,0.09)", borderStrong: "rgba(255,255,255,0.16)",
  ink: "#F6F3FA", inkMid: "#B6ADC9", inkLow: "#78708D",
  flame: "#FF5A6E", flameSoft: "rgba(255,90,110,0.16)",
  electric: "#8B6BFF", electricSoft: "rgba(139,107,255,0.18)",
  gold: "#F4B942", goldSoft: "rgba(244,185,66,0.18)",
  shadow: "0 20px 50px rgba(0,0,0,0.45)",
};
const LIGHT = {
  bg: "#FAF8FC", bg2: "#F2EDF7", surface: "#FFFFFF", surface2: "#F5F0FA",
  border: "rgba(25,10,35,0.09)", borderStrong: "rgba(25,10,35,0.16)",
  ink: "#1B1425", inkMid: "#5C5470", inkLow: "#918AA0",
  flame: "#E8425A", flameSoft: "rgba(232,66,90,0.10)",
  electric: "#6A4FE0", electricSoft: "rgba(106,79,224,0.10)",
  gold: "#B9790F", goldSoft: "rgba(185,121,15,0.12)",
  shadow: "0 20px 45px rgba(30,10,50,0.12)",
};
const ThemeCtx = createContext(DARK);
const useT = () => useContext(ThemeCtx);
const font = { display: "'Unbounded', sans-serif", body: "'Manrope', sans-serif" };

/* ============================================================================
   DADOS FICTÍCIOS
============================================================================ */
const TODAY = new Date("2026-09-01T00:00:00");
const GENRES = ["Sertanejo", "Pagode", "Samba", "Funk", "Forró", "MPB", "Pop", "Rock", "Rap", "Eletrônica", "Reggae", "Festival"];
const GENRE_COLORS = {
  Sertanejo: "#F4B942", Pagode: "#FF8A3D", Samba: "#FF5A6E", Funk: "#D946A8",
  Forró: "#FF7A45", MPB: "#33B58C", Pop: "#FF6FB5", Rock: "#E4483A",
  Rap: "#FFD23F", Eletrônica: "#5ED0FF", Reggae: "#4CAF6D", Festival: "#8B6BFF",
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
const byId = (arr, id) => arr.find((x) => x.id === id);
const artistNames = (ids) => ids.map((id) => byId(ARTISTS, id)?.name).filter(Boolean);

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
  {
    artistId: "a1", members: 214000,
    posts: [
      { id: "c1p1", author: "joana.viola", category: "Avisos", text: "Datas confirmadas do fim de ano saindo aos poucos! Fiquem de olho na aba de eventos, vem novidade boa por aí 🤠", likes: 842, comments: 63, time: "há 2 h", hasImage: false },
      { id: "c1p2", author: "rafa_sertanejo", category: "Fotos", text: "Registro da última noite em Goiânia, que energia foi aquela!", likes: 1290, comments: 94, time: "há 5 h", hasImage: true },
      { id: "c1p3", author: "marina.duarte", category: "Conversas", text: "Gente alguém sabe se vai ter pré-venda pro show de Campinas ainda essa semana?", likes: 58, comments: 21, time: "há 1 dia", hasImage: false },
      { id: "c1p4", author: "beto.rural", category: "Shows", text: "Segunda vez vendo o Vitor ao vivo e ele só melhora. A abertura com viola solo arrepiou.", likes: 410, comments: 37, time: "há 2 dias", hasImage: false },
      { id: "c1p5", author: "vitor.aragao.oficial", category: "Música", text: "Faixa nova gravada essa semana no estúdio, ansioso pra dividir com vocês em breve 🎶", likes: 3120, comments: 210, time: "há 3 dias", hasImage: true },
    ],
  },
  {
    artistId: "a4", members: 98000,
    posts: [
      { id: "c2p1", author: "roda.carioca", category: "Shows", text: "A Fundição tremeu ontem! Melhor roda do ano até agora.", likes: 512, comments: 44, time: "há 6 h", hasImage: true },
      { id: "c2p2", author: "pandeiro_leo", category: "Conversas", text: "Alguém tem o cavaco igual ao que o Diego usa? Preciso saber a marca kkk", likes: 32, comments: 18, time: "há 1 dia", hasImage: false },
      { id: "c2p3", author: "raizdopagode.oficial", category: "Avisos", text: "Roda Grande esgotando rápido, quem ainda não garantiu o ingresso corre!", likes: 980, comments: 71, time: "há 2 dias", hasImage: false },
    ],
  },
  {
    artistId: "a6", members: 356000,
    posts: [
      { id: "c3p1", author: "trovao.oficial", category: "Avisos", text: "Baile de sábado com portões abrindo mais cedo, chega junto que vai lotar.", likes: 1540, comments: 132, time: "há 3 h", hasImage: false },
      { id: "c3p2", author: "duda.zl", category: "Fotos", text: "Print do momento que o grave bateu e todo mundo pulou junto", likes: 2210, comments: 156, time: "há 8 h", hasImage: true },
      { id: "c3p3", author: "mc_iniciante", category: "Música", text: "Faixa nova tá tocando em todo lugar, já é hino", likes: 670, comments: 40, time: "há 1 dia", hasImage: false },
    ],
  },
  {
    artistId: "a8", members: 67000,
    posts: [
      { id: "c4p1", author: "poesia.mineira", category: "Shows", text: "Show intimista emocionou a plateia inteira, Clarice tem uma presença única.", likes: 340, comments: 29, time: "há 4 h", hasImage: false },
      { id: "c4p2", author: "clarice.andrade", category: "Avisos", text: "Obrigada pelo carinho de sempre. Bastidores do álbum ao vivo saindo em breve por aqui.", likes: 980, comments: 88, time: "há 1 dia", hasImage: true },
    ],
  },
  {
    artistId: "a9", members: 812000,
    posts: [
      { id: "c5p1", author: "rebeca.dias.oficial", category: "Avisos", text: "NEON TOUR chegando em mais cidades ano que vem, aguardem o anúncio 💫", likes: 9820, comments: 740, time: "há 1 h", hasImage: true },
      { id: "c5p2", author: "fan_neon", category: "Fotos", text: "Fileira 2 no show de SP, ainda em choque com a produção", likes: 2430, comments: 190, time: "há 5 h", hasImage: true },
      { id: "c5p3", author: "carol.pop", category: "Conversas", text: "Alguém troca ingresso pista premium por duas pistas comuns?", likes: 44, comments: 33, time: "há 1 dia", hasImage: false },
      { id: "c5p4", author: "rebeca.dias.oficial", category: "Música", text: "Prévia da faixa que abre o show liberada nos stories, corre ouvir", likes: 5210, comments: 402, time: "há 2 dias", hasImage: false },
    ],
  },
  {
    artistId: "a12", members: 121000,
    posts: [
      { id: "c6p1", author: "nomade.oficial", category: "Avisos", text: "Set completo do sunset em Floripa disponível na comunidade, bora relembrar", likes: 1120, comments: 65, time: "há 7 h", hasImage: true },
      { id: "c6p2", author: "raver_sc", category: "Shows", text: "Nunca vi um pôr do sol tão bem sincronizado com um set, surreal", likes: 640, comments: 51, time: "há 1 dia", hasImage: false },
    ],
  },
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

/* ============================================================================
   HELPERS
============================================================================ */
function fmtDate(iso, opts) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", opts || { day: "2-digit", month: "short" });
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

/* ============================================================================
   COMPONENTES DE APOIO
============================================================================ */
function GradientArt({ genre = "Festival", seed = "x", icon: Icon = Music, label, big }) {
  const c1 = GENRE_COLORS[genre] || "#8B6BFF";
  const c2 = hashColor(seed);
  return (
    <div className="relative w-full h-full overflow-hidden" style={{
      background: `radial-gradient(120% 140% at 15% 0%, ${c1}CC 0%, transparent 55%), radial-gradient(120% 140% at 100% 100%, ${c2}CC 0%, transparent 55%), linear-gradient(160deg, #1D1626 0%, #120E1A 100%)`,
    }}>
      <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)", backgroundSize: "16px 16px" }} />
      <Icon className="absolute opacity-20" style={{ color: "#fff", width: big ? 120 : 56, height: big ? 120 : 56, right: big ? -10 : -8, bottom: big ? -14 : -10 }} strokeWidth={1.2} />
      {label && (
        <div className="absolute left-3 bottom-2 font-black tracking-tight" style={{ fontFamily: font.display, fontSize: big ? 34 : 20, color: "rgba(255,255,255,0.9)", lineHeight: 1 }}>
          {label}
        </div>
      )}
    </div>
  );
}

function GenrePill({ genre, size = "sm" }) {
  const c = GENRE_COLORS[genre] || "#8B6BFF";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-bold ${size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"}`}
      style={{ background: `${c}26`, color: c, fontFamily: font.body }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />{genre}
    </span>
  );
}

function Avatar({ name, size = 36 }) {
  const c = hashColor(name);
  return (
    <div className="rounded-full flex items-center justify-center shrink-0 font-bold" style={{ width: size, height: size, background: `${c}30`, color: c, fontSize: size * 0.38, fontFamily: font.display }}>
      {initials(name)}
    </div>
  );
}

function IconBtn({ icon: Icon, active, onClick, activeColor, title }) {
  const T = useT();
  return (
    <button onClick={onClick} title={title} className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90"
      style={{ background: active ? `${activeColor}22` : T.surface2, border: `1px solid ${active ? activeColor : T.border}` }}>
      <Icon size={16} style={{ color: active ? activeColor : T.inkMid }} fill={active ? activeColor : "none"} strokeWidth={2} />
    </button>
  );
}

function EventCard({ event, saved, interested, onToggleSave, onToggleInterest, onOpen, wide }) {
  const T = useT();
  const dleft = daysUntil(event.date);
  return (
    <div onClick={() => onOpen(event.id)} className="cursor-pointer rounded-2xl overflow-hidden shrink-0 transition-transform hover:-translate-y-1"
      style={{ background: T.surface, border: `1px solid ${T.border}`, width: wide ? "100%" : 272, boxShadow: T.shadow }}>
      <div className="relative h-36">
        <GradientArt genre={event.genre === "Festival" ? "Festival" : event.genre} seed={event.id} label={event.title.split(" ")[0]} icon={event.type === "festival" ? PartyPopper : Music} />
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <GenrePill genre={event.genre} />
          {event.type === "festival" && <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}>Festival</span>}
        </div>
        <div className="absolute top-2.5 right-2.5" onClick={(e) => { e.stopPropagation(); onToggleSave(event.id); }}>
          <IconBtn icon={Heart} active={saved} activeColor="#FF5A6E" />
        </div>
        {dleft >= 0 && dleft <= 14 && (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-1 rounded-lg text-[11px] font-bold" style={{ background: T.gold, color: "#1B1425" }}>
            {dleft === 0 ? "É hoje!" : `Faltam ${dleft} dias`}
          </div>
        )}
      </div>
      <div className="relative h-3" style={{ background: T.surface }}>
        <div className="absolute inset-x-0 top-0 border-t-2 border-dashed" style={{ borderColor: T.border }} />
        <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full" style={{ background: T.bg }} />
        <div className="absolute -right-1.5 -top-1.5 w-3 h-3 rounded-full" style={{ background: T.bg }} />
      </div>
      <div className="p-3.5 pt-2">
        <h3 className="font-bold leading-snug mb-1.5 line-clamp-1" style={{ fontFamily: font.display, color: T.ink, fontSize: 15 }}>{event.title}</h3>
        <div className="flex items-center gap-1.5 text-[12.5px] mb-1" style={{ color: T.inkMid }}>
          <Calendar size={12.5} /><span>{fmtDate(event.date)}{event.endDate ? ` – ${fmtDate(event.endDate)}` : ""} · {event.time}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[12.5px] mb-2.5" style={{ color: T.inkMid }}>
          <MapPin size={12.5} /><span className="line-clamp-1">{event.venue}, {event.city}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-[13px]" style={{ color: T.ink }}>{money(event.price)}</span>
          <button onClick={(e) => { e.stopPropagation(); onToggleInterest(event.id); }}
            className="px-2.5 py-1.5 rounded-lg text-[11.5px] font-bold flex items-center gap-1 transition-all active:scale-95"
            style={{ background: interested ? T.flame : T.surface2, color: interested ? "#fff" : T.inkMid, border: `1px solid ${interested ? T.flame : T.border}` }}>
            <Star size={12} fill={interested ? "#fff" : "none"} /> {interested ? "Interessado" : "Interesse"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ArtistMiniCard({ artist, following, onToggleFollow, onOpen }) {
  const T = useT();
  return (
    <div onClick={() => onOpen(artist.id)} className="cursor-pointer rounded-2xl overflow-hidden shrink-0 transition-transform hover:-translate-y-1" style={{ width: 168, background: T.surface, border: `1px solid ${T.border}` }}>
      <div className="h-40"><GradientArt genre={artist.genre} seed={artist.id} label={initials(artist.name)} icon={Music} /></div>
      <div className="p-3">
        <div className="flex items-center gap-1">
          <h4 className="font-bold text-[13.5px] line-clamp-1" style={{ fontFamily: font.display, color: T.ink }}>{artist.name}</h4>
          {artist.verified && <ShieldCheck size={13} style={{ color: T.electric }} />}
        </div>
        <p className="text-[11.5px] mb-2" style={{ color: T.inkMid }}>{(artist.fans / 1000).toFixed(0)} mil fãs</p>
        <button onClick={(e) => { e.stopPropagation(); onToggleFollow(artist.id); }} className="w-full py-1.5 rounded-lg text-[11.5px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95"
          style={{ background: following ? T.surface2 : T.electric, color: following ? T.inkMid : "#fff", border: `1px solid ${following ? T.border : T.electric}` }}>
          {following ? <><UserCheck size={12} /> Seguindo</> : <><UserPlus size={12} /> Seguir</>}
        </button>
      </div>
    </div>
  );
}

function Shelf({ title, subtitle, onSeeAll, children, icon: Icon }) {
  const T = useT();
  return (
    <section className="mb-9">
      <div className="flex items-end justify-between mb-3.5 px-4 md:px-0">
        <div>
          <div className="flex items-center gap-2">
            {Icon && <Icon size={18} style={{ color: T.flame }} />}
            <h2 className="font-bold" style={{ fontFamily: font.display, color: T.ink, fontSize: 20 }}>{title}</h2>
          </div>
          {subtitle && <p className="text-[13px] mt-0.5" style={{ color: T.inkMid }}>{subtitle}</p>}
        </div>
        {onSeeAll && (
          <button onClick={onSeeAll} className="text-[12.5px] font-bold flex items-center gap-1 shrink-0" style={{ color: T.electric }}>
            Ver tudo <ChevronRight size={14} />
          </button>
        )}
      </div>
      <div className="flex gap-3.5 overflow-x-auto pb-2 px-4 md:px-0" style={{ scrollSnapType: "x mandatory" }}>
        {children}
      </div>
    </section>
  );
}

function EmptyState({ icon: Icon, title, text, action }) {
  const T = useT();
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: T.surface2 }}>
        <Icon size={26} style={{ color: T.inkLow }} />
      </div>
      <h3 className="font-bold mb-1.5" style={{ fontFamily: font.display, color: T.ink, fontSize: 17 }}>{title}</h3>
      <p className="text-[13.5px] max-w-xs" style={{ color: T.inkMid }}>{text}</p>
      {action}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, accent }) {
  const T = useT();
  return (
    <div className="rounded-2xl p-4" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${accent}20` }}>
        <Icon size={16} style={{ color: accent }} />
      </div>
      <div className="font-bold" style={{ fontFamily: font.display, color: T.ink, fontSize: 22 }}>{value}</div>
      <div className="text-[12.5px]" style={{ color: T.inkMid }}>{label}</div>
    </div>
  );
}

function SegButton({ options, value, onChange }) {
  const T = useT();
  return (
    <div className="inline-flex rounded-xl p-1 gap-1" style={{ background: T.surface2, border: `1px solid ${T.border}` }}>
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} className="px-3 py-1.5 rounded-lg text-[12.5px] font-bold flex items-center gap-1.5 transition-all"
          style={{ background: value === o.value ? T.flame : "transparent", color: value === o.value ? "#fff" : T.inkMid }}>
          <o.icon size={13.5} /> {o.label}
        </button>
      ))}
    </div>
  );
}

function Select({ value, onChange, options, placeholder }) {
  const T = useT();
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="px-3 py-2 rounded-xl text-[12.5px] font-semibold outline-none"
      style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink, fontFamily: font.body }}>
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

/* ============================================================================
   MAPA DO BRASIL (estilizado)
============================================================================ */
const CITY_POS = {
  "Manaus": [20, 20], "Belém": [46, 14], "Fortaleza": [70, 20], "Recife": [77, 29],
  "Salvador": [66, 41], "Brasília": [52, 47], "Goiânia": [47, 49], "Belo Horizonte": [59, 57],
  "Rio de Janeiro": [61, 68], "São Paulo": [53, 70], "Ribeirão Preto": [51, 62], "Campinas": [52, 67],
  "Curitiba": [49, 79], "Florianópolis": [51, 85], "Porto Alegre": [44, 91], "Caruaru": [75, 32], "Uberlândia": [53, 58],
};
function BrazilMap({ events, onOpen }) {
  const T = useT();
  const [sel, setSel] = useState(null);
  const cities = useMemo(() => {
    const m = {};
    events.forEach((e) => { if (!m[e.city]) m[e.city] = []; m[e.city].push(e); });
    return m;
  }, [events]);
  return (
    <div className="rounded-2xl p-5" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
      <div className="relative w-full mx-auto" style={{ maxWidth: 460, aspectRatio: "1/1.05" }}>
        <div className="absolute inset-0" style={{
          clipPath: "polygon(15% 5%,40% 2%,60% 8%,75% 5%,92% 18%,95% 30%,88% 40%,80% 45%,82% 55%,70% 62%,65% 75%,55% 95%,45% 98%,38% 85%,30% 70%,15% 65%,5% 50%,8% 30%,5% 15%)",
          background: `linear-gradient(160deg, ${T.electricSoft}, ${T.flameSoft})`, border: `1px solid ${T.borderStrong}`,
        }} />
        {Object.entries(cities).map(([city, evs]) => {
          const pos = CITY_POS[city] || [50, 50];
          const active = sel === city;
          return (
            <button key={city} onClick={() => setSel(active ? null : city)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-bold transition-all"
              style={{ left: `${pos[0]}%`, top: `${pos[1]}%`, width: 14 + Math.min(evs.length, 4) * 4, height: 14 + Math.min(evs.length, 4) * 4, background: active ? T.gold : T.flame, color: "#fff", fontSize: 9, boxShadow: active ? `0 0 0 5px ${T.gold}33` : `0 0 0 3px ${T.flame}22` }}>
              {evs.length}
            </button>
          );
        })}
      </div>
      <p className="text-center text-[11.5px] mt-2" style={{ color: T.inkLow }}>Toque em um marcador para ver os eventos da cidade</p>
      {sel && (
        <div className="mt-4 rounded-xl p-3.5" style={{ background: T.surface2, border: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="font-bold text-[13.5px]" style={{ color: T.ink, fontFamily: font.display }}>Eventos em {sel}</h4>
            <button onClick={() => setSel(null)}><X size={15} style={{ color: T.inkMid }} /></button>
          </div>
          <div className="space-y-2">
            {cities[sel].map((e) => (
              <div key={e.id} onClick={() => onOpen(e.id)} className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:opacity-80" style={{ background: T.surface }}>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-bold line-clamp-1" style={{ color: T.ink }}>{e.title}</p>
                  <p className="text-[11px]" style={{ color: T.inkMid }}>{fmtDate(e.date)} · {e.venue}</p>
                </div>
                <ChevronRight size={14} style={{ color: T.inkLow }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   AUTENTICAÇÃO / ONBOARDING
============================================================================ */
function AuthView({ onComplete }) {
  const T = useT();
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", username: "", genres: [], artists: [], city: "" });
  const cities = [...new Set(ARTISTS.map((a) => a.city))];

  const toggleArr = (key, val) => setForm((f) => ({ ...f, [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val] }));

  if (mode === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: `radial-gradient(120% 100% at 50% -10%, ${T.electricSoft}, transparent 60%), ${T.bg}` }}>
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${T.flame}, ${T.electric})` }}><Ticket size={19} color="#fff" /></div>
            <span className="font-black text-2xl" style={{ fontFamily: font.display, color: T.ink }}>rolezeiro</span>
          </div>
          <div className="rounded-2xl p-6" style={{ background: T.surface, border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
            <h1 className="font-bold text-xl mb-1" style={{ fontFamily: font.display, color: T.ink }}>Bem-vindo de volta</h1>
            <p className="text-[13px] mb-5" style={{ color: T.inkMid }}>Entre para descobrir seu próximo show.</p>
            <div className="space-y-3 mb-5">
              <input placeholder="E-mail" className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
              <input placeholder="Senha" type="password" className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
            </div>
            <button onClick={() => onComplete({ name: "Marina Duarte", username: "marina.duarte", city: "São Paulo, SP", genres: ["Sertanejo", "Samba", "Pop"], artists: ["a1", "a4", "a9"] })}
              className="w-full py-2.5 rounded-xl font-bold text-[13.5px] mb-3" style={{ background: T.flame, color: "#fff" }}>Entrar</button>
            <p className="text-center text-[12.5px]" style={{ color: T.inkMid }}>Não tem conta? <button onClick={() => setMode("signup")} className="font-bold" style={{ color: T.electric }}>Cadastre-se</button></p>
          </div>
        </div>
      </div>
    );
  }

  const steps = ["Seus dados", "Gêneros favoritos", "Artistas que você acompanha", "Sua cidade"];
  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10" style={{ background: `radial-gradient(120% 100% at 50% -10%, ${T.flameSoft}, transparent 60%), ${T.bg}` }}>
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${T.flame}, ${T.electric})` }}><Ticket size={19} color="#fff" /></div>
          <span className="font-black text-2xl" style={{ fontFamily: font.display, color: T.ink }}>rolezeiro</span>
        </div>
        <div className="flex gap-1.5 mb-6">
          {steps.map((_, i) => <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i <= step ? T.flame : T.surface2 }} />)}
        </div>
        <div className="rounded-2xl p-6" style={{ background: T.surface, border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
          <h2 className="font-bold text-lg mb-4" style={{ fontFamily: font.display, color: T.ink }}>{steps[step]}</h2>

          {step === 0 && (
            <div className="space-y-3">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome completo" className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
              <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Nome de usuário" className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
              <input placeholder="E-mail" className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
            </div>
          )}
          {step === 1 && (
            <div className="flex flex-wrap gap-2">
              {GENRES.filter((g) => g !== "Festival").map((g) => (
                <button key={g} onClick={() => toggleArr("genres", g)} className="px-3.5 py-2 rounded-full text-[12.5px] font-bold transition-all"
                  style={{ background: form.genres.includes(g) ? GENRE_COLORS[g] : T.surface2, color: form.genres.includes(g) ? "#1B1425" : T.inkMid, border: `1px solid ${form.genres.includes(g) ? GENRE_COLORS[g] : T.border}` }}>{g}</button>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {ARTISTS.map((a) => (
                <button key={a.id} onClick={() => toggleArr("artists", a.id)} className="w-full flex items-center gap-3 p-2 rounded-xl transition-all"
                  style={{ background: form.artists.includes(a.id) ? T.electricSoft : T.surface2, border: `1px solid ${form.artists.includes(a.id) ? T.electric : T.border}` }}>
                  <Avatar name={a.name} size={32} />
                  <div className="text-left flex-1 min-w-0"><p className="text-[13px] font-bold line-clamp-1" style={{ color: T.ink }}>{a.name}</p><p className="text-[11px]" style={{ color: T.inkMid }}>{a.genre}</p></div>
                  {form.artists.includes(a.id) && <Check size={16} style={{ color: T.electric }} />}
                </button>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {cities.map((c) => (
                <button key={c} onClick={() => setForm({ ...form, city: c })} className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all"
                  style={{ background: form.city === c ? T.flameSoft : T.surface2, border: `1px solid ${form.city === c ? T.flame : T.border}` }}>
                  <MapPin size={14} style={{ color: form.city === c ? T.flame : T.inkMid }} /><span className="text-[13px] font-semibold" style={{ color: T.ink }}>{c}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2.5 mt-6">
            {step > 0 && <button onClick={() => setStep(step - 1)} className="px-4 py-2.5 rounded-xl font-bold text-[13px]" style={{ background: T.surface2, color: T.inkMid }}>Voltar</button>}
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="flex-1 py-2.5 rounded-xl font-bold text-[13.5px] flex items-center justify-center gap-1.5" style={{ background: T.flame, color: "#fff" }}>Continuar <ArrowRight size={15} /></button>
            ) : (
              <button onClick={() => onComplete(form)} className="flex-1 py-2.5 rounded-xl font-bold text-[13.5px]" style={{ background: T.flame, color: "#fff" }}>Concluir cadastro</button>
            )}
          </div>
        </div>
        <p className="text-center text-[12.5px] mt-4" style={{ color: T.inkMid }}>Já tem conta? <button onClick={() => setMode("login")} className="font-bold" style={{ color: T.electric }}>Entrar</button></p>
      </div>
    </div>
  );
}

/* ============================================================================
   HOME
============================================================================ */
function HomeView({ ctx }) {
  const T = useT();
  const { events, user, saved, interested, toggleSave, toggleInterest, following, toggleFollow, openEvent, openArtist, nav } = ctx;
  const featured = events.find((e) => e.featured) || events[0];
  const perto = events.filter((e) => e.city === user.city.split(",")[0] || e.state === user.city.split(", ")[1]).slice(0, 8);
  const emAlta = [...events].sort((a, b) => b.interested - a.interested).slice(0, 8);
  const festivals = events.filter((e) => e.type === "festival");
  const popularArtists = [...ARTISTS].sort((a, b) => b.fans - a.fans).slice(0, 10);
  const talvez = events.filter((e) => user.genres.includes(e.genre) || (e.genres && e.genres.some((g) => user.genres.includes(g)))).slice(0, 8);

  return (
    <div>
      <div className="relative mx-4 md:mx-0 mt-4 md:mt-0 rounded-3xl overflow-hidden h-[440px] md:h-[480px]" style={{ boxShadow: T.shadow }}>
        <GradientArt genre="Festival" seed={featured.id} icon={PartyPopper} big />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
        <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
          <Flame size={14} style={{ color: T.gold }} /><span className="text-[12px] font-bold text-white">Em destaque</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9">
          <div className="flex flex-wrap gap-2 mb-3">
            {(featured.genres || [featured.genre]).slice(0, 4).map((g) => <GenrePill key={g} genre={g} />)}
          </div>
          <h1 className="font-black text-white mb-3 leading-[1.02]" style={{ fontFamily: font.display, fontSize: "clamp(28px, 5vw, 46px)" }}>{featured.title}</h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4 text-white/90 text-[13.5px]">
            <span className="flex items-center gap-1.5"><Calendar size={14} />{fmtDate(featured.date)}{featured.endDate ? ` – ${fmtDate(featured.endDate)}` : ""}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} />{featured.city}, {featured.state}</span>
            <span className="flex items-center gap-1.5"><Users size={14} />{(featured.interested / 1000).toFixed(1)} mil interessados</span>
          </div>
          <p className="text-white/70 text-[13px] mb-5 max-w-xl line-clamp-1">{artistNames(featured.artistIds).join(" · ")}</p>
          <div className="flex gap-3">
            <button onClick={() => openEvent(featured.id)} className="px-6 py-3 rounded-xl font-bold text-[13.5px] flex items-center gap-2 transition-transform active:scale-95" style={{ background: T.flame, color: "#fff" }}>Ver evento <ArrowRight size={15} /></button>
            <button onClick={() => toggleSave(featured.id)} className="px-4 py-3 rounded-xl flex items-center gap-2 font-bold text-[13.5px]" style={{ background: "rgba(255,255,255,0.14)", color: "#fff", backdropFilter: "blur(6px)" }}>
              <Heart size={16} fill={saved.has(featured.id) ? "#fff" : "none"} /> Salvar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {perto.length > 0 && (
          <Shelf title="Eventos perto de você" subtitle={`Baseado em ${user.city}`} icon={MapPin} onSeeAll={() => nav("discover")}>
            {perto.map((e) => <EventCard key={e.id} event={e} saved={saved.has(e.id)} interested={interested.has(e.id)} onToggleSave={toggleSave} onToggleInterest={toggleInterest} onOpen={openEvent} />)}
          </Shelf>
        )}
        <Shelf title="Em alta" subtitle="Os eventos mais comentados da semana" icon={TrendingUp} onSeeAll={() => nav("discover")}>
          {emAlta.map((e) => <EventCard key={e.id} event={e} saved={saved.has(e.id)} interested={interested.has(e.id)} onToggleSave={toggleSave} onToggleInterest={toggleInterest} onOpen={openEvent} />)}
        </Shelf>
        <Shelf title="Artistas populares" subtitle="Quem está bombando agora" icon={Star} onSeeAll={() => nav("discover")}>
          {popularArtists.map((a) => <ArtistMiniCard key={a.id} artist={a} following={following.has(a.id)} onToggleFollow={toggleFollow} onOpen={openArtist} />)}
        </Shelf>
        <Shelf title="Festivais em destaque" subtitle="Vários artistas, um só ingresso" icon={PartyPopper} onSeeAll={() => nav("discover")}>
          {festivals.map((e) => <EventCard key={e.id} event={e} saved={saved.has(e.id)} interested={interested.has(e.id)} onToggleSave={toggleSave} onToggleInterest={toggleInterest} onOpen={openEvent} />)}
        </Shelf>
        {talvez.length > 0 && (
          <Shelf title="Talvez você goste" subtitle={`Porque você curte ${user.genres.slice(0, 2).join(" e ")}`} icon={Sparkles} onSeeAll={() => nav("discover")}>
            {talvez.map((e) => <EventCard key={e.id} event={e} saved={saved.has(e.id)} interested={interested.has(e.id)} onToggleSave={toggleSave} onToggleInterest={toggleInterest} onOpen={openEvent} />)}
          </Shelf>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   DESCOBRIR
============================================================================ */
function DiscoverView({ ctx, focusSearch }) {
  const T = useT();
  const { events, saved, interested, toggleSave, toggleInterest, openEvent } = ctx;
  const [q, setQ] = useState("");
  const [state, setState] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [calMonth, setCalMonth] = useState(9);
  const [calDay, setCalDay] = useState(null);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchQ = !q || e.title.toLowerCase().includes(q.toLowerCase()) || e.city.toLowerCase().includes(q.toLowerCase()) || artistNames(e.artistIds).join(" ").toLowerCase().includes(q.toLowerCase());
      const matchState = !state || e.state === state;
      const matchGenre = !genre || e.genre === genre || (e.genres && e.genres.includes(genre));
      const matchPrice = !price || (price === "ate50" && e.price <= 50) || (price === "50-100" && e.price > 50 && e.price <= 100) || (price === "100-200" && e.price > 100 && e.price <= 200) || (price === "200+" && e.price > 200);
      return matchQ && matchState && matchGenre && matchPrice;
    });
  }, [events, q, state, genre, price]);

  const monthEvents = filtered.filter((e) => new Date(e.date + "T00:00:00").getMonth() + 1 === calMonth);
  const dayEvents = calDay ? monthEvents.filter((e) => new Date(e.date + "T00:00:00").getDate() === calDay) : monthEvents;
  const monthNames = { 9: "Setembro", 10: "Outubro", 11: "Novembro", 12: "Dezembro" };
  const daysInMonth = new Date(2026, calMonth, 0).getDate();
  const firstWeekday = new Date(2026, calMonth - 1, 1).getDay();

  return (
    <div className="px-4 md:px-0">
      <h1 className="font-black mb-4 pt-4 md:pt-0" style={{ fontFamily: font.display, color: T.ink, fontSize: 28 }}>Descobrir</h1>
      <div className="relative mb-4">
        <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: T.inkLow }} />
        <input autoFocus={focusSearch} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar artistas, eventos, festivais ou cidades"
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-[14px] outline-none" style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.ink }} />
      </div>
      <div className="flex flex-wrap items-center gap-2.5 mb-5">
        <Select value={state} onChange={setState} options={ESTADOS} placeholder="Estado" />
        <Select value={genre} onChange={setGenre} options={GENRES} placeholder="Gênero" />
        <Select value={price} onChange={setPrice} options={["ate50", "50-100", "100-200", "200+"]} placeholder="Faixa de preço" />
        {(state || genre || price || q) && (
          <button onClick={() => { setState(""); setGenre(""); setPrice(""); setQ(""); }} className="text-[12px] font-bold flex items-center gap-1" style={{ color: T.flame }}><X size={13} /> Limpar filtros</button>
        )}
        <div className="ml-auto">
          <SegButton value={viewMode} onChange={setViewMode} options={[{ value: "list", label: "Lista", icon: LayoutGrid }, { value: "calendar", label: "Calendário", icon: CalendarDays }, { value: "map", label: "Mapa", icon: MapIcon }]} />
        </div>
      </div>

      <p className="text-[12.5px] mb-4" style={{ color: T.inkMid }}>{filtered.length} evento{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</p>

      {viewMode === "list" && (
        filtered.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
            {filtered.map((e) => <EventCard key={e.id} event={e} wide saved={saved.has(e.id)} interested={interested.has(e.id)} onToggleSave={toggleSave} onToggleInterest={toggleInterest} onOpen={openEvent} />)}
          </div>
        ) : <EmptyState icon={Search} title="Nada por aqui ainda" text="Tente ajustar os filtros ou buscar por outro termo, artista ou cidade." />
      )}

      {viewMode === "calendar" && (
        <div className="pb-8">
          <div className="flex gap-2 mb-4">
            {Object.entries(monthNames).map(([m, name]) => (
              <button key={m} onClick={() => { setCalMonth(Number(m)); setCalDay(null); }} className="px-3.5 py-1.5 rounded-full text-[12.5px] font-bold" style={{ background: calMonth === Number(m) ? T.flame : T.surface2, color: calMonth === Number(m) ? "#fff" : T.inkMid }}>{name}</button>
            ))}
          </div>
          <div className="rounded-2xl p-4" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
            <div className="grid grid-cols-7 gap-1.5 mb-2">
              {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => <div key={i} className="text-center text-[11px] font-bold" style={{ color: T.inkLow }}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: firstWeekday }).map((_, i) => <div key={"e" + i} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const evs = monthEvents.filter((e) => new Date(e.date + "T00:00:00").getDate() === day);
                const active = calDay === day;
                return (
                  <button key={day} onClick={() => setCalDay(active ? null : day)} className="aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 text-[12px] font-semibold transition-all"
                    style={{ background: active ? T.flame : evs.length ? T.flameSoft : T.surface2, color: active ? "#fff" : T.ink }}>
                    {day}
                    {evs.length > 0 && <span className="w-1 h-1 rounded-full" style={{ background: active ? "#fff" : T.flame }} />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="font-bold mb-3 text-[14px]" style={{ color: T.ink, fontFamily: font.display }}>{calDay ? `Eventos em ${calDay} de ${monthNames[calMonth]}` : `Todos os eventos de ${monthNames[calMonth]}`}</h3>
            {dayEvents.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayEvents.map((e) => <EventCard key={e.id} event={e} wide saved={saved.has(e.id)} interested={interested.has(e.id)} onToggleSave={toggleSave} onToggleInterest={toggleInterest} onOpen={openEvent} />)}
              </div>
            ) : <EmptyState icon={CalendarDays} title="Sem eventos nessa data" text="Escolha outro dia no calendário para ver a programação." />}
          </div>
        </div>
      )}

      {viewMode === "map" && (
        <div className="pb-8">
          <BrazilMap events={filtered} onOpen={openEvent} />
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   EVENTO — DETALHE
============================================================================ */
const FAN_NAMES = ["marina.duarte", "joao.pedro", "beatriz_ss", "lucasfan", "carol.rocha", "thiagoo", "aninha23", "renan.silva", "julia.mp", "otavio.f", "camila_v", "diego.souza"];
function EventDetailView({ ctx }) {
  const T = useT();
  const { events, selectedId, saved, interested, toggleSave, toggleInterest, openArtist, notify } = ctx;
  const event = byId(events, selectedId);
  if (!event) return null;
  const dleft = daysUntil(event.date);
  return (
    <div className="pb-14">
      <div className="relative h-72 md:h-96 md:rounded-b-3xl overflow-hidden">
        <GradientArt genre={event.genre === "Festival" ? "Festival" : event.genre} seed={event.id} icon={event.type === "festival" ? PartyPopper : Music} big />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.9), transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-9">
          <div className="flex flex-wrap gap-2 mb-3">{(event.genres || [event.genre]).map((g) => <GenrePill key={g} genre={g} />)}</div>
          <h1 className="font-black text-white leading-tight" style={{ fontFamily: font.display, fontSize: "clamp(24px,4.4vw,40px)" }}>{event.title}</h1>
          <div className="flex items-center gap-1 mt-2"><Star size={14} fill={T.gold} color={T.gold} /><span className="text-white text-[13px] font-bold">{event.rating}</span><span className="text-white/60 text-[12.5px]">avaliação dos fãs</span></div>
        </div>
      </div>

      <div className="px-4 md:px-0 max-w-5xl md:mx-auto mt-6 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2.5 mb-6">
            <button onClick={() => toggleSave(event.id)} className="px-4 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2 transition-all active:scale-95" style={{ background: saved.has(event.id) ? T.flame : T.surface2, color: saved.has(event.id) ? "#fff" : T.ink, border: `1px solid ${T.border}` }}>
              <Heart size={15} fill={saved.has(event.id) ? "#fff" : "none"} /> {saved.has(event.id) ? "Salvo" : "Salvar evento"}
            </button>
            <button onClick={() => toggleInterest(event.id)} className="px-4 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2 transition-all active:scale-95" style={{ background: interested.has(event.id) ? T.gold : T.surface2, color: interested.has(event.id) ? "#1B1425" : T.ink, border: `1px solid ${T.border}` }}>
              <Star size={15} fill={interested.has(event.id) ? "#1B1425" : "none"} /> Tenho interesse
            </button>
            <button onClick={() => notify("Redirecionando para o site oficial de ingressos…")} className="px-4 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2 transition-all active:scale-95 ml-auto" style={{ background: T.electric, color: "#fff" }}>
              <Ticket size={15} /> Ver ingressos
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-7">
            <div className="rounded-xl p-3.5 flex items-center gap-3" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <Calendar size={17} style={{ color: T.flame }} />
              <div><p className="text-[12px] font-bold" style={{ color: T.ink }}>{fmtDateFull(event.date)}</p><p className="text-[11.5px]" style={{ color: T.inkMid }}>{event.time}{dleft >= 0 && ` · faltam ${dleft} dias`}</p></div>
            </div>
            <div className="rounded-xl p-3.5 flex items-center gap-3" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <MapPin size={17} style={{ color: T.flame }} />
              <div><p className="text-[12px] font-bold" style={{ color: T.ink }}>{event.venue}</p><p className="text-[11.5px]" style={{ color: T.inkMid }}>{event.city}, {event.state}</p></div>
            </div>
          </div>

          <h2 className="font-bold text-[16px] mb-2.5" style={{ fontFamily: font.display, color: T.ink }}>Sobre o evento</h2>
          <p className="text-[13.5px] leading-relaxed mb-7" style={{ color: T.inkMid }}>{event.description}</p>

          <h2 className="font-bold text-[16px] mb-3" style={{ fontFamily: font.display, color: T.ink }}>Programação</h2>
          <div className="space-y-2 mb-7">
            {event.lineup.map((l, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
                <div className="px-2.5 py-1 rounded-lg text-[11.5px] font-bold shrink-0" style={{ background: T.surface2, color: T.electric }}>{l.time}</div>
                <span className="text-[13px] font-semibold" style={{ color: T.ink }}>{l.act}</span>
              </div>
            ))}
          </div>

          <h2 className="font-bold text-[16px] mb-3" style={{ fontFamily: font.display, color: T.ink }}>Artistas participantes</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 mb-7">
            {event.artistIds.map((id) => { const a = byId(ARTISTS, id); return a && (
              <div key={id} onClick={() => openArtist(id)} className="cursor-pointer flex items-center gap-2.5 p-2.5 pr-4 rounded-xl shrink-0" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
                <Avatar name={a.name} size={38} /><div><p className="text-[12.5px] font-bold" style={{ color: T.ink }}>{a.name}</p><p className="text-[11px]" style={{ color: T.inkMid }}>{a.genre}</p></div>
              </div>
            );})}
          </div>

          <h2 className="font-bold text-[16px] mb-3" style={{ fontFamily: font.display, color: T.ink }}>Informações importantes</h2>
          <ul className="space-y-2 mb-7">
            {event.info.map((i, idx) => <li key={idx} className="text-[13px] flex items-start gap-2" style={{ color: T.inkMid }}><CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: T.electric }} />{i}</li>)}
          </ul>
        </div>

        <div>
          <div className="rounded-2xl p-5 sticky top-4" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-between mb-1"><span className="text-[12px]" style={{ color: T.inkMid }}>A partir de</span><span className="font-black text-xl" style={{ color: T.ink, fontFamily: font.display }}>{money(event.price)}</span></div>
            <p className="text-[11.5px] mb-4" style={{ color: T.inkLow }}>Valor médio do ingresso · site oficial</p>
            <h3 className="font-bold text-[14px] mb-3" style={{ fontFamily: font.display, color: T.ink }}>Quem vai? <span style={{ color: T.inkMid, fontWeight: 600 }}>({(event.interested / 1000).toFixed(1)} mil)</span></h3>
            <div className="flex -space-x-2 mb-3">
              {FAN_NAMES.slice(0, 8).map((n) => <Avatar key={n} name={n} size={30} />)}
              <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: T.surface2, color: T.inkMid, border: `2px solid ${T.surface}` }}>+{Math.round(event.interested / 1000)}k</div>
            </div>
            <p className="text-[12px]" style={{ color: T.inkMid }}>{FAN_NAMES[0]}, {FAN_NAMES[1]} e outras {(event.going / 1000).toFixed(1)} mil pessoas confirmaram presença.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   ARTISTA — DETALHE
============================================================================ */
function ArtistDetailView({ ctx }) {
  const T = useT();
  const { events, selectedId, following, toggleFollow, openEvent, saved, interested, toggleSave, toggleInterest, communities, openCommunity } = ctx;
  const artist = byId(ARTISTS, selectedId);
  if (!artist) return null;
  const shows = events.filter((e) => e.artistIds.includes(artist.id));
  const community = communities.find((c) => c.artistId === artist.id);
  const discografia = [
    { title: `${artist.name.split(" ")[0]} ao Vivo`, year: 2025 },
    { title: "Raízes & Caminhos", year: 2023 },
    { title: "Primeiros Acordes", year: 2021 },
  ];
  return (
    <div className="pb-14">
      <div className="relative h-64 md:h-80 md:rounded-b-3xl overflow-hidden">
        <GradientArt genre={artist.genre} seed={artist.id} icon={Music} big />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.88), transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-9 flex items-end justify-between flex-wrap gap-4">
          <div>
            <GenrePill genre={artist.genre} />
            <div className="flex items-center gap-2 mt-2.5">
              <h1 className="font-black text-white" style={{ fontFamily: font.display, fontSize: "clamp(24px,4vw,38px)" }}>{artist.name}</h1>
              {artist.verified && <ShieldCheck size={22} style={{ color: T.electric }} />}
            </div>
            <p className="text-white/70 text-[13px] mt-1">{(artist.fans / 1000).toFixed(0)} mil fãs · {artist.city}</p>
          </div>
          <button onClick={() => toggleFollow(artist.id)} className="px-5 py-2.5 rounded-xl font-bold text-[13.5px] flex items-center gap-2 transition-all active:scale-95" style={{ background: following.has(artist.id) ? "rgba(255,255,255,0.15)" : T.flame, color: "#fff" }}>
            {following.has(artist.id) ? <><UserCheck size={15} /> Seguindo</> : <><UserPlus size={15} /> Seguir</>}
          </button>
        </div>
      </div>

      <div className="px-4 md:px-0 max-w-4xl md:mx-auto mt-6">
        <p className="text-[13.5px] leading-relaxed mb-8" style={{ color: T.inkMid }}>{artist.bio}</p>

        <h2 className="font-bold text-[16px] mb-3" style={{ fontFamily: font.display, color: T.ink }}>Próximos eventos</h2>
        {shows.length ? (
          <div className="flex gap-3.5 overflow-x-auto pb-2 mb-8">
            {shows.map((e) => <EventCard key={e.id} event={e} saved={saved.has(e.id)} interested={interested.has(e.id)} onToggleSave={toggleSave} onToggleInterest={toggleInterest} onOpen={openEvent} />)}
          </div>
        ) : <p className="text-[13px] mb-8" style={{ color: T.inkLow }}>Nenhum show marcado no momento. Siga o artista para saber primeiro quando anunciar.</p>}

        <h2 className="font-bold text-[16px] mb-3" style={{ fontFamily: font.display, color: T.ink }}>Discografia</h2>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {discografia.map((d, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
              <div className="aspect-square"><GradientArt genre={artist.genre} seed={artist.id + i} icon={Disc3} /></div>
              <div className="p-2.5"><p className="text-[11.5px] font-bold line-clamp-1" style={{ color: T.ink }}>{d.title}</p><p className="text-[10.5px]" style={{ color: T.inkMid }}>{d.year}</p></div>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-[16px] mb-3" style={{ fontFamily: font.display, color: T.ink }}>Comunidade</h2>
        {community ? (
          <div onClick={() => openCommunity(artist.id)} className="cursor-pointer rounded-2xl p-5 flex items-center justify-between" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden"><GradientArt genre={artist.genre} seed={artist.id} /></div>
              <div><p className="font-bold text-[13.5px]" style={{ color: T.ink }}>Comunidade {artist.name}</p><p className="text-[12px]" style={{ color: T.inkMid }}>{(community.members / 1000).toFixed(0)} mil membros · {community.posts.length} publicações recentes</p></div>
            </div>
            <ChevronRight size={18} style={{ color: T.inkLow }} />
          </div>
        ) : <p className="text-[13px]" style={{ color: T.inkLow }}>Comunidade em breve.</p>}
      </div>
    </div>
  );
}

/* ============================================================================
   COMUNIDADES
============================================================================ */
function CommunitiesView({ ctx }) {
  const T = useT();
  const { communities, followingCommunities, toggleFollowCommunity, openCommunity } = ctx;
  return (
    <div className="px-4 md:px-0 pb-14 pt-4 md:pt-0">
      <h1 className="font-black mb-1.5" style={{ fontFamily: font.display, color: T.ink, fontSize: 28 }}>Comunidades</h1>
      <p className="text-[13.5px] mb-6" style={{ color: T.inkMid }}>Converse, compartilhe fotos e acompanhe novidades junto com outros fãs.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities.map((c) => {
          const artist = byId(ARTISTS, c.artistId);
          const isFollowing = followingCommunities.has(c.artistId);
          return (
            <div key={c.artistId} className="rounded-2xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <div className="h-24 relative cursor-pointer" onClick={() => openCommunity(c.artistId)}><GradientArt genre={artist.genre} seed={artist.id} /></div>
              <div className="p-4 -mt-7 relative">
                <div className="w-14 h-14 rounded-2xl mb-2" style={{ border: `3px solid ${T.surface}`, overflow: "hidden" }}><GradientArt genre={artist.genre} seed={artist.id + "x"} label={initials(artist.name)} /></div>
                <div className="cursor-pointer" onClick={() => openCommunity(c.artistId)}>
                  <h3 className="font-bold text-[15px]" style={{ fontFamily: font.display, color: T.ink }}>{artist.name}</h3>
                  <p className="text-[12px] mb-3" style={{ color: T.inkMid }}>{(c.members / 1000).toFixed(0)} mil membros · {c.posts.length} publicações</p>
                </div>
                <button onClick={() => toggleFollowCommunity(c.artistId)} className="w-full py-2 rounded-lg text-[12.5px] font-bold flex items-center justify-center gap-1.5" style={{ background: isFollowing ? T.surface2 : T.electric, color: isFollowing ? T.inkMid : "#fff" }}>
                  {isFollowing ? "Participando" : "Participar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CATEGORIES = ["Todos", "Avisos", "Conversas", "Fotos", "Shows", "Música"];
function CommunityDetailView({ ctx }) {
  const T = useT();
  const { communities, selectedId, followingCommunities, toggleFollowCommunity, addPost, likedPosts, toggleLike, notify } = ctx;
  const community = communities.find((c) => c.artistId === selectedId);
  const artist = byId(ARTISTS, selectedId);
  const [tab, setTab] = useState("Todos");
  const [text, setText] = useState("");
  const [cat, setCat] = useState("Conversas");
  if (!community || !artist) return null;
  const posts = tab === "Todos" ? community.posts : community.posts.filter((p) => p.category === tab);

  return (
    <div className="pb-14">
      <div className="relative h-40 md:h-52 md:rounded-b-3xl overflow-hidden"><GradientArt genre={artist.genre} seed={artist.id} big /><div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.75), transparent 70%)" }} /></div>
      <div className="px-4 md:px-0 max-w-2xl md:mx-auto -mt-8 relative">
        <div className="flex items-end justify-between mb-5">
          <div className="flex items-end gap-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden" style={{ border: `3px solid ${T.bg}` }}><GradientArt genre={artist.genre} seed={artist.id + "y"} label={initials(artist.name)} /></div>
            <div><h1 className="font-black text-[19px]" style={{ fontFamily: font.display, color: T.ink }}>{artist.name}</h1><p className="text-[12px]" style={{ color: T.inkMid }}>{(community.members / 1000).toFixed(0)} mil membros</p></div>
          </div>
          <button onClick={() => toggleFollowCommunity(artist.id)} className="px-4 py-2 rounded-xl font-bold text-[12.5px]" style={{ background: followingCommunities.has(artist.id) ? T.surface2 : T.electric, color: followingCommunities.has(artist.id) ? T.inkMid : "#fff" }}>
            {followingCommunities.has(artist.id) ? "Participando" : "Participar"}
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
          {CATEGORIES.map((c) => <button key={c} onClick={() => setTab(c)} className="px-3.5 py-1.5 rounded-full text-[12.5px] font-bold shrink-0" style={{ background: tab === c ? T.flame : T.surface2, color: tab === c ? "#fff" : T.inkMid }}>{c}</button>)}
        </div>

        <div className="rounded-2xl p-4 mb-6" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={`Compartilhe algo com a comunidade de ${artist.name}...`} rows={2} className="w-full bg-transparent outline-none text-[13.5px] resize-none mb-3" style={{ color: T.ink }} />
          <div className="flex items-center justify-between">
            <Select value={cat} onChange={setCat} options={CATEGORIES.filter((c) => c !== "Todos")} placeholder="Categoria" />
            <button onClick={() => { if (!text.trim()) return; addPost(artist.id, text, cat); setText(""); notify("Publicação criada!"); }} className="px-4 py-2 rounded-xl font-bold text-[12.5px]" style={{ background: T.flame, color: "#fff" }}>Publicar</button>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((p) => (
            <div key={p.id} className="rounded-2xl p-4" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <Avatar name={p.author} size={34} />
                <div className="flex-1 min-w-0"><p className="text-[13px] font-bold" style={{ color: T.ink }}>{p.author}</p><p className="text-[11px]" style={{ color: T.inkLow }}>{p.time}</p></div>
                <span className="text-[10.5px] font-bold px-2 py-1 rounded-full" style={{ background: T.electricSoft, color: T.electric }}>{p.category}</span>
              </div>
              <p className="text-[13.5px] leading-relaxed mb-3" style={{ color: T.ink }}>{p.text}</p>
              {p.hasImage && <div className="rounded-xl overflow-hidden h-40 mb-3"><GradientArt genre={artist.genre} seed={p.id} icon={Camera} /></div>}
              <div className="flex items-center gap-4 pt-1" style={{ borderTop: `1px solid ${T.border}` }}>
                <button onClick={() => toggleLike(p.id)} className="flex items-center gap-1.5 text-[12px] font-bold pt-2.5" style={{ color: likedPosts.has(p.id) ? T.flame : T.inkMid }}>
                  <ThumbsUp size={14} fill={likedPosts.has(p.id) ? T.flame : "none"} /> {p.likes + (likedPosts.has(p.id) ? 1 : 0)}
                </button>
                <span className="flex items-center gap-1.5 text-[12px] font-bold pt-2.5" style={{ color: T.inkMid }}><MessageCircle size={14} /> {p.comments}</span>
                <button onClick={() => notify("Link copiado!")} className="flex items-center gap-1.5 text-[12px] font-bold pt-2.5 ml-auto" style={{ color: T.inkMid }}><Share2 size={14} /> Compartilhar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   MEU ROLÊ
============================================================================ */
function MeuRoleView({ ctx }) {
  const T = useT();
  const { events, saved, interested, toggleSave, toggleInterest, openEvent } = ctx;
  const [viewMode, setViewMode] = useState("list");
  const myEvents = events.filter((e) => saved.has(e.id) || interested.has(e.id)).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="px-4 md:px-0 pb-14 pt-4 md:pt-0">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1.5">
        <h1 className="font-black" style={{ fontFamily: font.display, color: T.ink, fontSize: 28 }}>Meu Rolê</h1>
        <SegButton value={viewMode} onChange={setViewMode} options={[{ value: "list", label: "Lista", icon: LayoutGrid }, { value: "map", label: "Mapa", icon: MapIcon }]} />
      </div>
      <p className="text-[13.5px] mb-6" style={{ color: T.inkMid }}>Seus eventos salvos e marcados com interesse, tudo em um só lugar.</p>

      {myEvents.length === 0 ? (
        <EmptyState icon={Ticket} title="Seu rolê está vazio" text="Salve eventos ou marque interesse para começar a montar sua agenda musical." />
      ) : viewMode === "map" ? (
        <BrazilMap events={myEvents} onOpen={openEvent} />
      ) : (
        <div className="space-y-3">
          {myEvents.map((e) => {
            const dleft = daysUntil(e.date);
            return (
              <div key={e.id} className="rounded-2xl p-3.5 flex items-center gap-3.5" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
                <div onClick={() => openEvent(e.id)} className="cursor-pointer w-16 h-16 rounded-xl overflow-hidden shrink-0"><GradientArt genre={e.genre === "Festival" ? "Festival" : e.genre} seed={e.id} /></div>
                <div onClick={() => openEvent(e.id)} className="cursor-pointer flex-1 min-w-0">
                  <p className="font-bold text-[13.5px] line-clamp-1" style={{ color: T.ink, fontFamily: font.display }}>{e.title}</p>
                  <p className="text-[12px]" style={{ color: T.inkMid }}>{fmtDate(e.date)} · {e.city}, {e.state}</p>
                  <p className="text-[11.5px] font-bold mt-0.5" style={{ color: dleft >= 0 ? T.gold : T.inkLow }}>{dleft >= 0 ? (dleft === 0 ? "É hoje!" : `Faltam ${dleft} dias`) : "Evento já passou"}</p>
                </div>
                <div className="flex flex-col gap-1.5 items-end shrink-0">
                  <IconBtn icon={Heart} active={saved.has(e.id)} activeColor={T.flame} onClick={() => toggleSave(e.id)} />
                  <IconBtn icon={Star} active={interested.has(e.id)} activeColor={T.gold} onClick={() => toggleInterest(e.id)} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   PERFIL
============================================================================ */
function ProfileView({ ctx }) {
  const T = useT();
  const { user, saved, interested, events, following, followingCommunities, communities, openEvent, openArtist, notify, logout } = ctx;
  const [tab, setTab] = useState("Sobre");
  const savedEvents = events.filter((e) => saved.has(e.id));
  const followedArtists = ARTISTS.filter((a) => following.has(a.id));
  const followedCommunities = communities.filter((c) => followingCommunities.has(c.artistId));

  return (
    <div className="pb-14">
      <div className="relative h-36 md:h-48 md:rounded-b-3xl overflow-hidden"><GradientArt genre="Festival" seed={user.username} /></div>
      <div className="px-4 md:px-0 max-w-3xl md:mx-auto -mt-12 relative">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
          <div className="flex items-end gap-3.5">
            <div className="w-24 h-24 rounded-2xl overflow-hidden" style={{ border: `4px solid ${T.bg}` }}><GradientArt genre="Sertanejo" seed={user.username + "p"} label={initials(user.name)} /></div>
            <div className="pb-1"><h1 className="font-black text-[19px]" style={{ fontFamily: font.display, color: T.ink }}>{user.name}</h1><p className="text-[12.5px]" style={{ color: T.inkMid }}>@{user.username} · {user.city}</p></div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => notify("Edição de perfil em breve.")} className="px-4 py-2 rounded-xl font-bold text-[12.5px]" style={{ background: T.surface2, color: T.ink, border: `1px solid ${T.border}` }}>Editar perfil</button>
            <button onClick={logout} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: T.surface2, border: `1px solid ${T.border}` }}><LogOut size={15} style={{ color: T.flame }} /></button>
          </div>
        </div>
        <p className="text-[13.5px] mb-5" style={{ color: T.inkMid }}>{user.bio}</p>

        <div className="grid grid-cols-4 gap-2.5 mb-6">
          {[["Salvos", savedEvents.length], ["Artistas", followedArtists.length], ["Comunidades", followedCommunities.length], ["Histórico", PAST_EVENTS.length]].map(([l, v]) => (
            <div key={l} className="rounded-xl p-3 text-center" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
              <div className="font-black text-lg" style={{ color: T.ink, fontFamily: font.display }}>{v}</div>
              <div className="text-[10.5px]" style={{ color: T.inkMid }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto mb-6">
          {["Sobre", "Comunidades", "Eventos salvos", "Histórico"].map((t) => <button key={t} onClick={() => setTab(t)} className="px-3.5 py-1.5 rounded-full text-[12.5px] font-bold shrink-0" style={{ background: tab === t ? T.flame : T.surface2, color: tab === t ? "#fff" : T.inkMid }}>{t}</button>)}
        </div>

        {tab === "Sobre" && (
          <div>
            <h3 className="font-bold text-[14px] mb-2.5" style={{ fontFamily: font.display, color: T.ink }}>Gêneros favoritos</h3>
            <div className="flex flex-wrap gap-2 mb-6">{user.genres.map((g) => <GenrePill key={g} genre={g} size="md" />)}</div>
            <h3 className="font-bold text-[14px] mb-2.5" style={{ fontFamily: font.display, color: T.ink }}>Artistas favoritos</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">{followedArtists.map((a) => <ArtistMiniCard key={a.id} artist={a} following={true} onToggleFollow={() => {}} onOpen={openArtist} />)}</div>
          </div>
        )}
        {tab === "Comunidades" && (
          <div className="grid sm:grid-cols-2 gap-3">
            {followedCommunities.map((c) => { const a = byId(ARTISTS, c.artistId); return (
              <div key={c.artistId} className="rounded-xl p-3 flex items-center gap-3" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
                <Avatar name={a.name} size={40} /><div><p className="font-bold text-[13px]" style={{ color: T.ink }}>{a.name}</p><p className="text-[11.5px]" style={{ color: T.inkMid }}>{(c.members / 1000).toFixed(0)} mil membros</p></div>
              </div>
            );})}
          </div>
        )}
        {tab === "Eventos salvos" && (
          savedEvents.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{savedEvents.map((e) => <EventCard key={e.id} event={e} wide saved interested={interested.has(e.id)} onToggleSave={ctx.toggleSave} onToggleInterest={ctx.toggleInterest} onOpen={openEvent} />)}</div>
            : <EmptyState icon={Heart} title="Nenhum evento salvo" text="Toque no coração de um evento para guardá-lo aqui." />
        )}
        {tab === "Histórico" && (
          <div className="space-y-2.5">
            {PAST_EVENTS.map((p) => (
              <div key={p.id} className="rounded-xl p-3.5 flex items-center gap-3" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0"><GradientArt genre={p.genre} seed={p.id} /></div>
                <div className="flex-1"><p className="font-bold text-[13px]" style={{ color: T.ink }}>{p.title}</p><p className="text-[11.5px]" style={{ color: T.inkMid }}>{p.artist} · {p.city} · {fmtDate(p.date, { day: "2-digit", month: "short", year: "numeric" })}</p></div>
                <CheckCircle2 size={16} style={{ color: T.electric }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   NOTIFICAÇÕES
============================================================================ */
const NOTIF_ICON = { show: Megaphone, reminder: Clock, community: MessageCircle, change: AlertTriangle };
function NotificationsView({ ctx }) {
  const T = useT();
  const { notifs, markRead } = ctx;
  const groups = [["Recentes", notifs.filter((n) => !n.read)], ["Anteriores", notifs.filter((n) => n.read)]];
  return (
    <div className="px-4 md:px-0 pb-14 pt-4 md:pt-0 max-w-2xl">
      <h1 className="font-black mb-6" style={{ fontFamily: font.display, color: T.ink, fontSize: 28 }}>Notificações</h1>
      {groups.map(([label, list]) => list.length > 0 && (
        <div key={label} className="mb-6">
          <h3 className="font-bold text-[12.5px] uppercase tracking-wide mb-2.5" style={{ color: T.inkLow }}>{label}</h3>
          <div className="space-y-2">
            {list.map((n) => {
              const Icon = NOTIF_ICON[n.type] || Bell;
              return (
                <div key={n.id} onClick={() => markRead(n.id)} className="cursor-pointer flex items-start gap-3 p-3.5 rounded-xl" style={{ background: n.read ? "transparent" : T.surface, border: `1px solid ${T.border}` }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: T.electricSoft }}><Icon size={15} style={{ color: T.electric }} /></div>
                  <div className="flex-1"><p className="text-[13px]" style={{ color: T.ink, fontWeight: n.read ? 500 : 700 }}>{n.text}</p><p className="text-[11px] mt-0.5" style={{ color: T.inkLow }}>{n.time}</p></div>
                  {!n.read && <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: T.flame }} />}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================================
   PAINEL DO ORGANIZADOR
============================================================================ */
function OrganizerView({ ctx }) {
  const T = useT();
  const { events, addEvent, notify } = ctx;
  const [showModal, setShowModal] = useState(false);
  const [f, setF] = useState({ title: "", genre: "Sertanejo", date: "", time: "20:00", venue: "", city: "", state: "SP", price: "", link: "", desc: "" });
  const mine = events.slice(0, 6);
  const chart = mine.map((e) => ({ name: e.title.split(" ").slice(0, 2).join(" "), views: Math.round(e.interested * 1.8) }));

  const submit = () => {
    if (!f.title || !f.date) { notify("Preencha ao menos o nome e a data do evento."); return; }
    addEvent({ id: "e" + Date.now(), type: "show", title: f.title, genre: f.genre, artistIds: [], date: f.date, time: f.time, venue: f.venue || "Local a definir", city: f.city || "São Paulo", state: f.state, price: Number(f.price) || 0, interested: 0, going: 0, rating: 0, description: f.desc || "Descrição em breve.", lineup: [{ time: f.time, act: f.title }], info: ["Classificação: livre", "Informações adicionais em breve"] });
    notify("Evento publicado com sucesso!");
    setShowModal(false);
    setF({ title: "", genre: "Sertanejo", date: "", time: "20:00", venue: "", city: "", state: "SP", price: "", link: "", desc: "" });
  };

  return (
    <div className="px-4 md:px-0 pb-14 pt-4 md:pt-0">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div><h1 className="font-black" style={{ fontFamily: font.display, color: T.ink, fontSize: 26 }}>Painel do organizador</h1><p className="text-[13px]" style={{ color: T.inkMid }}>Gerencie seus eventos e acompanhe o desempenho</p></div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2" style={{ background: T.flame, color: "#fff" }}><Plus size={16} /> Cadastrar novo evento</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
        <StatCard label="Visualizações totais" value="248,3 mil" icon={Eye} accent={T.electric} />
        <StatCard label="Pessoas interessadas" value="61,2 mil" icon={Star} accent={T.gold} />
        <StatCard label="Eventos cadastrados" value={events.length} icon={Calendar} accent={T.flame} />
        <StatCard label="Artistas cadastrados" value={ARTISTS.length} icon={Users} accent="#33B58C" />
      </div>

      <div className="rounded-2xl p-5 mb-8" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <h3 className="font-bold text-[14px] mb-4" style={{ fontFamily: font.display, color: T.ink }}>Visualizações por evento</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chart}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: T.inkMid, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.inkMid, fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12 }} />
            <Bar dataKey="views" fill={T.flame} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="font-bold text-[14px] mb-3" style={{ fontFamily: font.display, color: T.ink }}>Meus eventos</h3>
      <div className="rounded-2xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        {mine.map((e, i) => (
          <div key={e.id} className="flex items-center gap-3 p-3.5" style={{ borderTop: i ? `1px solid ${T.border}` : "none" }}>
            <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0"><GradientArt genre={e.genre === "Festival" ? "Festival" : e.genre} seed={e.id} /></div>
            <div className="flex-1 min-w-0"><p className="text-[13px] font-bold line-clamp-1" style={{ color: T.ink }}>{e.title}</p><p className="text-[11.5px]" style={{ color: T.inkMid }}>{fmtDate(e.date)} · {e.city}</p></div>
            <span className="text-[11.5px] font-bold hidden sm:block" style={{ color: T.inkMid }}>{(e.interested / 1000).toFixed(1)} mil interessados</span>
            <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold" style={{ background: "rgba(51,181,140,0.18)", color: "#33B58C" }}>Publicado</span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setShowModal(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full md:max-w-lg rounded-t-3xl md:rounded-3xl p-6 max-h-[88vh] overflow-y-auto" style={{ background: T.bg2, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-between mb-5"><h3 className="font-bold text-[17px]" style={{ fontFamily: font.display, color: T.ink }}>Cadastrar evento</h3><button onClick={() => setShowModal(false)}><X size={18} style={{ color: T.inkMid }} /></button></div>
            <div className="space-y-3">
              <input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="Nome do evento" className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
                <input type="time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input value={f.venue} onChange={(e) => setF({ ...f, venue: e.target.value })} placeholder="Local" className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
                <input value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} placeholder="Cidade" className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Select value={f.genre} onChange={(v) => setF({ ...f, genre: v })} options={GENRES} placeholder="Gênero" />
                <input value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} placeholder="Preço (R$)" className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
              </div>
              <input value={f.link} onChange={(e) => setF({ ...f, link: e.target.value })} placeholder="Link oficial de ingressos" className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] outline-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
              <textarea value={f.desc} onChange={(e) => setF({ ...f, desc: e.target.value })} placeholder="Descrição do evento" rows={3} className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] outline-none resize-none" style={{ background: T.surface2, border: `1px solid ${T.border}`, color: T.ink }} />
              <div className="rounded-xl p-4 flex items-center gap-2 text-[12px]" style={{ background: T.surface2, color: T.inkMid, border: `1px dashed ${T.border}` }}><ImageIcon size={16} /> Capa do evento (upload simulado)</div>
              <button onClick={submit} className="w-full py-3 rounded-xl font-bold text-[13.5px]" style={{ background: T.flame, color: "#fff" }}>Publicar evento</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   PAINEL ADMIN
============================================================================ */
function AdminView({ ctx }) {
  const T = useT();
  const { events, notify } = ctx;
  const [tab, setTab] = useState("Eventos");
  const growth = [{ m: "Mai", v: 12 }, { m: "Jun", v: 19 }, { m: "Jul", v: 24 }, { m: "Ago", v: 31 }, { m: "Set", v: 38 }];
  const users = [
    { name: "Marina Duarte", city: "São Paulo, SP", status: "Ativo" }, { name: "João Pedro Lima", city: "Recife, PE", status: "Ativo" },
    { name: "Beatriz Souza", city: "Salvador, BA", status: "Pendente" }, { name: "Lucas Fontes", city: "Curitiba, PR", status: "Ativo" },
  ];
  return (
    <div className="px-4 md:px-0 pb-14 pt-4 md:pt-0">
      <h1 className="font-black mb-1.5" style={{ fontFamily: font.display, color: T.ink, fontSize: 26 }}>Painel de administração</h1>
      <p className="text-[13px] mb-6" style={{ color: T.inkMid }}>Visão geral da plataforma</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-7">
        <StatCard label="Usuários ativos" value="42,1 mil" icon={Users} accent={T.electric} />
        <StatCard label="Eventos publicados" value={events.length} icon={Calendar} accent={T.flame} />
        <StatCard label="Artistas verificados" value={ARTISTS.filter((a) => a.verified).length} icon={ShieldCheck} accent="#33B58C" />
        <StatCard label="Denúncias pendentes" value="3" icon={AlertTriangle} accent={T.gold} />
      </div>

      <div className="rounded-2xl p-5 mb-7" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <h3 className="font-bold text-[14px] mb-4" style={{ fontFamily: font.display, color: T.ink }}>Crescimento de usuários (mil)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={growth}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="m" tick={{ fill: T.inkMid, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: T.inkMid, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12 }} />
            <Line type="monotone" dataKey="v" stroke={T.electric} strokeWidth={2.5} dot={{ fill: T.electric, r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-2 mb-4">{["Usuários", "Artistas", "Eventos", "Comunidades"].map((t) => <button key={t} onClick={() => setTab(t)} className="px-3.5 py-1.5 rounded-full text-[12.5px] font-bold" style={{ background: tab === t ? T.flame : T.surface2, color: tab === t ? "#fff" : T.inkMid }}>{t}</button>)}</div>

      <div className="rounded-2xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        {tab === "Usuários" && users.map((u, i) => (
          <div key={u.name} className="flex items-center gap-3 p-3.5" style={{ borderTop: i ? `1px solid ${T.border}` : "none" }}>
            <Avatar name={u.name} size={34} /><div className="flex-1"><p className="text-[13px] font-bold" style={{ color: T.ink }}>{u.name}</p><p className="text-[11.5px]" style={{ color: T.inkMid }}>{u.city}</p></div>
            <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold" style={{ background: u.status === "Ativo" ? "rgba(51,181,140,0.18)" : "rgba(244,185,66,0.2)", color: u.status === "Ativo" ? "#33B58C" : T.gold }}>{u.status}</span>
            <button onClick={() => notify("Ação registrada.")} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: T.surface2 }}><MoreHorizontal size={14} style={{ color: T.inkMid }} /></button>
          </div>
        ))}
        {tab === "Artistas" && ARTISTS.slice(0, 8).map((a, i) => (
          <div key={a.id} className="flex items-center gap-3 p-3.5" style={{ borderTop: i ? `1px solid ${T.border}` : "none" }}>
            <Avatar name={a.name} size={34} /><div className="flex-1"><p className="text-[13px] font-bold" style={{ color: T.ink }}>{a.name}</p><p className="text-[11.5px]" style={{ color: T.inkMid }}>{a.genre} · {(a.fans / 1000).toFixed(0)} mil fãs</p></div>
            <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold" style={{ background: a.verified ? "rgba(51,181,140,0.18)" : T.surface2, color: a.verified ? "#33B58C" : T.inkMid }}>{a.verified ? "Verificado" : "Pendente"}</span>
          </div>
        ))}
        {tab === "Eventos" && events.slice(0, 8).map((e, i) => (
          <div key={e.id} className="flex items-center gap-3 p-3.5" style={{ borderTop: i ? `1px solid ${T.border}` : "none" }}>
            <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0"><GradientArt genre={e.genre === "Festival" ? "Festival" : e.genre} seed={e.id} /></div>
            <div className="flex-1"><p className="text-[13px] font-bold" style={{ color: T.ink }}>{e.title}</p><p className="text-[11.5px]" style={{ color: T.inkMid }}>{e.city}, {e.state} · {fmtDate(e.date)}</p></div>
            <button onClick={() => notify("Evento removido (simulado).")} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: T.surface2 }}><Trash2 size={13.5} style={{ color: T.flame }} /></button>
          </div>
        ))}
        {tab === "Comunidades" && COMMUNITY_SEED.map((c, i) => { const a = byId(ARTISTS, c.artistId); return (
          <div key={c.artistId} className="flex items-center gap-3 p-3.5" style={{ borderTop: i ? `1px solid ${T.border}` : "none" }}>
            <Avatar name={a.name} size={34} /><div className="flex-1"><p className="text-[13px] font-bold" style={{ color: T.ink }}>Comunidade {a.name}</p><p className="text-[11.5px]" style={{ color: T.inkMid }}>{(c.members / 1000).toFixed(0)} mil membros · {c.posts.length} publicações</p></div>
            <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold" style={{ background: "rgba(51,181,140,0.18)", color: "#33B58C" }}>Ativa</span>
          </div>
        );})}
      </div>
    </div>
  );
}

/* ============================================================================
   NAVEGAÇÃO
============================================================================ */
const NAV_MAIN = [
  { key: "home", label: "Início", icon: Home }, { key: "discover", label: "Descobrir", icon: Compass },
  { key: "events", label: "Eventos", icon: Ticket }, { key: "communities", label: "Comunidades", icon: Users },
  { key: "meurole", label: "Meu Rolê", icon: Sparkles },
];
function Sidebar({ view, nav, theme, toggleTheme, unread }) {
  const T = useT();
  return (
    <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 p-5 z-30" style={{ background: T.bg2, borderRight: `1px solid ${T.border}` }}>
      <div className="flex items-center gap-2.5 mb-9 px-1">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${T.flame}, ${T.electric})` }}><Ticket size={19} color="#fff" /></div>
        <span className="font-black text-xl" style={{ fontFamily: font.display, color: T.ink }}>rolezeiro</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_MAIN.map((i) => (
          <button key={i.key} onClick={() => nav(i.key)} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold transition-all" style={{ background: view === i.key ? T.flameSoft : "transparent", color: view === i.key ? T.flame : T.inkMid }}>
            <i.icon size={18} /> {i.label}
          </button>
        ))}
        <div className="my-2 h-px" style={{ background: T.border }} />
        <button onClick={() => nav("notifications")} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold relative" style={{ background: view === "notifications" ? T.flameSoft : "transparent", color: view === "notifications" ? T.flame : T.inkMid }}>
          <Bell size={18} /> Notificações {unread > 0 && <span className="ml-auto w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold" style={{ background: T.flame, color: "#fff" }}>{unread}</span>}
        </button>
        <button onClick={() => nav("profile")} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold" style={{ background: view === "profile" ? T.flameSoft : "transparent", color: view === "profile" ? T.flame : T.inkMid }}>
          <User size={18} /> Perfil
        </button>
        <div className="my-2 h-px" style={{ background: T.border }} />
        <button onClick={() => nav("organizer")} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold" style={{ background: view === "organizer" ? T.electricSoft : "transparent", color: view === "organizer" ? T.electric : T.inkMid }}>
          <Building2 size={17} /> Sou organizador
        </button>
        <button onClick={() => nav("admin")} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold" style={{ background: view === "admin" ? T.electricSoft : "transparent", color: view === "admin" ? T.electric : T.inkMid }}>
          <BarChart3 size={17} /> Painel admin
        </button>
      </nav>
      <button onClick={toggleTheme} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold" style={{ background: T.surface2, color: T.inkMid }}>
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />} {theme === "dark" ? "Modo claro" : "Modo escuro"}
      </button>
    </aside>
  );
}

function MobileTopBar({ nav, unread, theme, toggleTheme }) {
  const T = useT();
  return (
    <div className="flex md:hidden items-center justify-between px-4 py-3.5 sticky top-0 z-30" style={{ background: `${T.bg}ee`, backdropFilter: "blur(10px)", borderBottom: `1px solid ${T.border}` }}>
      <div className="flex items-center gap-2" onClick={() => nav("home")}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${T.flame}, ${T.electric})` }}><Ticket size={15} color="#fff" /></div>
        <span className="font-black text-[17px]" style={{ fontFamily: font.display, color: T.ink }}>rolezeiro</span>
      </div>
      <div className="flex items-center gap-1.5">
        <button onClick={toggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: T.surface2 }}>{theme === "dark" ? <Sun size={15} style={{ color: T.inkMid }} /> : <Moon size={15} style={{ color: T.inkMid }} />}</button>
        <button onClick={() => nav("notifications")} className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ background: T.surface2 }}>
          <Bell size={15} style={{ color: T.inkMid }} />
          {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: T.flame }} />}
        </button>
      </div>
    </div>
  );
}

function BottomNav({ view, nav }) {
  const T = useT();
  const items = [{ key: "home", label: "Início", icon: Home }, { key: "discover", label: "Descobrir", icon: Compass }, { key: "events", label: "Eventos", icon: Ticket }, { key: "communities", label: "Comunidades", icon: Users }, { key: "profile", label: "Perfil", icon: User }];
  return (
    <nav className="flex md:hidden fixed bottom-0 inset-x-0 z-40 px-2 pt-1.5 pb-[max(8px,env(safe-area-inset-bottom))]" style={{ background: `${T.bg}f5`, backdropFilter: "blur(10px)", borderTop: `1px solid ${T.border}` }}>
      {items.map((i) => {
        const active = view === i.key || (i.key === "events" && view === "discover-events");
        return (
          <button key={i.key} onClick={() => nav(i.key)} className="flex-1 flex flex-col items-center gap-1 py-1.5">
            <i.icon size={20} style={{ color: active ? T.flame : T.inkLow }} fill={active && i.key === "home" ? T.flame : "none"} strokeWidth={2} />
            <span className="text-[10px] font-bold" style={{ color: active ? T.flame : T.inkLow }}>{i.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function Toast({ msg }) {
  const T = useT();
  if (!msg) return null;
  return (
    <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl font-semibold text-[13px] flex items-center gap-2 animate-[fadeIn_0.2s]" style={{ background: T.ink, color: T.bg, boxShadow: T.shadow }}>
    <CheckCircle2 size={15} /> {msg}
    </div>
  );
}

/* ============================================================================
   APP
============================================================================ */
export default function App() {
  const [theme, setTheme] = useState("dark");
  const T = theme === "dark" ? DARK : LIGHT;
  const [isAuthed, setIsAuthed] = useState(true);
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [toast, setToast] = useState("");

  const [user, setUser] = useState({ name: "Marina Duarte", username: "marina.duarte", city: "São Paulo, SP", bio: "Apaixonada por sertanejo e boas rodas de samba. Já fui a vários shows esse ano e não perco um festival 🎤🎶", genres: ["Sertanejo", "Samba", "Pop"] });
  const [events, setEvents] = useState(EVENTS_SEED);
  const [saved, setSaved] = useState(new Set(["e9", "f1"]));
  const [interested, setInterested] = useState(new Set(["e6", "e1", "f4"]));
  const [following, setFollowing] = useState(new Set(["a1", "a4", "a9"]));
  const [followingCommunities, setFollowingCommunities] = useState(new Set(["a1", "a9"]));
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [communities, setCommunities] = useState(COMMUNITY_SEED);
  const [notifs, setNotifs] = useState(NOTIFS_SEED);

  const notify = (msg) => setToast(msg);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(""), 2400); return () => clearTimeout(t); } }, [toast]);

  const nav = (v, id) => { setView(v === "events" ? "discover" : v); if (id) setSelectedId(id); window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" }); };
  const openEvent = (id) => { setSelectedId(id); setView("event"); };
  const openArtist = (id) => { setSelectedId(id); setView("artist"); };
  const openCommunity = (id) => { setSelectedId(id); setView("community"); };

  const toggleSet = (setFn) => (id) => setFn((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSave = (id) => { toggleSet(setSaved)(id); notify(saved.has(id) ? "Removido dos salvos" : "Evento salvo!"); };
  const toggleInterest = (id) => { toggleSet(setInterested)(id); notify(interested.has(id) ? "Interesse removido" : "Interesse marcado!"); };
  const toggleFollow = (id) => { toggleSet(setFollowing)(id); notify(following.has(id) ? "Deixou de seguir" : "Agora você segue este artista!"); };
  const toggleFollowCommunity = (id) => { toggleSet(setFollowingCommunities)(id); notify(followingCommunities.has(id) ? "Saiu da comunidade" : "Você entrou na comunidade!"); };
  const toggleLike = toggleSet(setLikedPosts);
  const markRead = (id) => setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const addEvent = (e) => setEvents((prev) => [e, ...prev]);
  const addPost = (artistId, text, category) => setCommunities((prev) => prev.map((c) => c.artistId === artistId ? { ...c, posts: [{ id: "np" + Date.now(), author: user.username, category, text, likes: 0, comments: 0, time: "agora", hasImage: false }, ...c.posts] } : c));
  const logout = () => { setIsAuthed(false); setView("home"); };
  const onAuthComplete = (data) => {
    setUser({ name: data.name || "Novo Fã", username: (data.username || "fa.musica").toLowerCase().replace(/\s/g, ""), city: data.city || "São Paulo, SP", bio: "Novo por aqui, pronto para descobrir meu próximo show 🎶", genres: data.genres && data.genres.length ? data.genres : ["Sertanejo", "Pop"] });
    if (data.artists) setFollowing(new Set(data.artists));
    setIsAuthed(true); setView("home");
  };

  const unread = notifs.filter((n) => !n.read).length;
  const ctx = { events, user, saved, interested, following, followingCommunities, likedPosts, communities, notifs, selectedId, toggleSave, toggleInterest, toggleFollow, toggleFollowCommunity, toggleLike, markRead, addEvent, addPost, openEvent, openArtist, openCommunity, nav, notify, logout };

  if (!isAuthed) {
    return (
      <ThemeCtx.Provider value={T}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap'); * { font-family: ${font.body}; } @keyframes fadeIn { from { opacity: 0; transform: translate(-50%, 8px); } to { opacity: 1; transform: translate(-50%, 0); } }`}</style>
        <AuthView onComplete={onAuthComplete} />
      </ThemeCtx.Provider>
    );
  }

  const renderView = () => {
    switch (view) {
      case "home": return <HomeView ctx={ctx} />;
      case "discover": return <DiscoverView ctx={ctx} />;
      case "event": return <EventDetailView ctx={ctx} />;
      case "artist": return <ArtistDetailView ctx={ctx} />;
      case "communities": return <CommunitiesView ctx={ctx} />;
      case "community": return <CommunityDetailView ctx={ctx} />;
      case "meurole": return <MeuRoleView ctx={ctx} />;
      case "profile": return <ProfileView ctx={ctx} />;
      case "notifications": return <NotificationsView ctx={ctx} />;
      case "organizer": return <OrganizerView ctx={ctx} />;
      case "admin": return <AdminView ctx={ctx} />;
      default: return <HomeView ctx={ctx} />;
    }
  };

  return (
    <ThemeCtx.Provider value={T}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');
        * { font-family: ${font.body}; box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { height: 8px; width: 8px; }
        ::-webkit-scrollbar-thumb { background: ${T.borderStrong}; border-radius: 8px; }
        @keyframes fadeIn { from { opacity: 0; transform: translate(-50%, 8px); } to { opacity: 1; transform: translate(-50%, 0); } }
        select option { background: ${T.surface}; color: ${T.ink}; }
      `}</style>
      <div style={{ background: T.bg, minHeight: "100vh" }}>
        <Sidebar view={view} nav={nav} theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} unread={unread} />
        <div className="md:ml-64 pb-20 md:pb-8">
          <MobileTopBar nav={nav} unread={unread} theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
          {view !== "home" && view !== "event" && view !== "artist" && view !== "community" && (
            <div className="hidden md:flex items-center gap-3 px-8 pt-6">
              {view !== "discover" && (
                <button onClick={() => nav("discover")} className="ml-auto flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12.5px] font-bold" style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.inkMid }}>
                  <Search size={14} /> Buscar na plataforma
                </button>
              )}
            </div>
          )}
          {(view === "event" || view === "artist" || view === "community") && (
            <div className="px-4 md:px-8 pt-4">
              <button onClick={() => window.history.length ? nav("discover") : nav("home")} className="flex items-center gap-1.5 text-[12.5px] font-bold" style={{ color: T.inkMid }}>
                <ArrowLeft size={15} /> Voltar
              </button>
            </div>
          )}
          <main className="md:px-8 md:pt-2">{renderView()}</main>
        </div>
        <BottomNav view={view} nav={nav} />
        <Toast msg={toast} />
      </div>
    </ThemeCtx.Provider>
  );
}
