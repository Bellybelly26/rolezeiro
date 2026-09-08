/* =========================================================
   ROLEZEIRO — app.js
   SPA em HTML/CSS/JS puro. Dados fictícios. Sem build step.
   ========================================================= */
(function(){
"use strict";

const NOW = new Date('2026-09-05T09:00:00');

/* ---------------------------------------------------------
   1) DADOS FICTÍCIOS
   --------------------------------------------------------- */
const GENRES = ['Sertanejo','Pagode','Samba','Funk','Forró','MPB','Pop','Rock','Rap','Eletrônica','Reggae','Festival'];

const REGION_BY_STATE = {
  AM:'norte',PA:'norte',AC:'norte',RO:'norte',RR:'norte',AP:'norte',TO:'norte',
  BA:'nordeste',PE:'nordeste',CE:'nordeste',MA:'nordeste',PB:'nordeste',RN:'nordeste',AL:'nordeste',SE:'nordeste',PI:'nordeste',
  GO:'centro',MT:'centro',MS:'centro',DF:'centro',
  SP:'sudeste',RJ:'sudeste',MG:'sudeste',ES:'sudeste',
  RS:'sul',PR:'sul',SC:'sul'
};
const REGION_LABEL = {norte:'Norte',nordeste:'Nordeste',centro:'Centro-Oeste',sudeste:'Sudeste',sul:'Sul'};

const ARTISTS = [
 {id:'a1',name:'Rian Castilho',genre:'Sertanejo',city:'Goiânia',state:'GO',photo:'rian-castilho',
  bio:'Rian Castilho é um dos nomes mais tocados do sertanejo universitário atual, conhecido por misturar violão e batida eletrônica em shows enérgicos pelo interior do Brasil.',
  fans:812000, discography:[{title:'Chão Batido',year:2023,type:'Álbum'},{title:'Bebi Head',year:2024,type:'Single'},{title:'Ao Vivo em Goiânia',year:2025,type:'Álbum ao vivo'}]},
 {id:'a2',name:'Coração de Ouro',genre:'Sertanejo',city:'Uberlândia',state:'MG',photo:'coracao-de-ouro',
  bio:'Dupla sertaneja raiz que reencontrou o público jovem com letras nostálgicas e produção moderna.',
  fans:540000, discography:[{title:'Estrada Velha',year:2022,type:'Álbum'},{title:'Modão Novo',year:2024,type:'EP'}]},
 {id:'a3',name:'Vitrola de Aço',genre:'Sertanejo',city:'Campo Grande',state:'MS',photo:'vitrola-de-aco',
  bio:'Trio sertanejo do Centro-Oeste com forte presença em rodeios e festas do agro.',
  fans:298000, discography:[{title:'Poeira e Fé',year:2023,type:'Álbum'}]},
 {id:'a4',name:'Bloco do Aroeira',genre:'Pagode',city:'Salvador',state:'BA',photo:'bloco-do-aroeira',
  bio:'Grupo de pagode baiano que une roda de samba tradicional com arranjos de metais.',
  fans:455000, discography:[{title:'Roda Nova',year:2021,type:'Álbum'},{title:'Aroeira ao Vivo',year:2024,type:'Álbum ao vivo'}]},
 {id:'a5',name:'Roda Nossa',genre:'Samba',city:'Rio de Janeiro',state:'RJ',photo:'roda-nossa',
  bio:'Coletivo de samba de raiz nascido nas rodas de subúrbio carioca, hoje enchendo casas de show pelo país.',
  fans:210000, discography:[{title:'Subúrbio em Festa',year:2020,type:'Álbum'}]},
 {id:'a6',name:'MC Tempero',genre:'Funk',city:'São Paulo',state:'SP',photo:'mc-tempero',
  bio:'Voz do funk paulista com batidas que dominam as playlists de baile em todo o país.',
  fans:980000, discography:[{title:'Tempero Bom',year:2023,type:'Single'},{title:'Baile na Zona Sul',year:2024,type:'Álbum'}]},
 {id:'a7',name:'Trio Sanfona Nova',genre:'Forró',city:'Fortaleza',state:'CE',photo:'sanfona-nova',
  bio:'Trio nordestino que renova o forró pé-de-serra com influências pop.',
  fans:322000, discography:[{title:'São João Todo Dia',year:2022,type:'Álbum'}]},
 {id:'a8',name:'Ana Beraldo',genre:'MPB',city:'Belo Horizonte',state:'MG',photo:'ana-beraldo',
  bio:'Cantora e compositora mineira que mistura MPB com jazz e poesia urbana.',
  fans:176000, discography:[{title:'Água e Pedra',year:2021,type:'Álbum'},{title:'Beraldo Acústico',year:2023,type:'Álbum ao vivo'}]},
 {id:'a9',name:'Nuvem Baixa',genre:'Pop',city:'Curitiba',state:'PR',photo:'nuvem-baixa',
  bio:'Projeto pop synth-driven que virou fenômeno das rádios universitárias.',
  fans:402000, discography:[{title:'Satélite',year:2023,type:'Álbum'}]},
 {id:'a10',name:'Granito',genre:'Rock',city:'Porto Alegre',state:'RS',photo:'granito',
  bio:'Banda de rock gaúcha com raízes no rock nacional dos anos 90 e produção contemporânea.',
  fans:265000, discography:[{title:'Pedra Bruta',year:2019,type:'Álbum'},{title:'Concreto',year:2022,type:'Álbum'}]},
 {id:'a11',name:'Real Marginal',genre:'Rap',city:'São Paulo',state:'SP',photo:'real-marginal',
  bio:'Rapper paulistano com letras urgentes sobre periferia e superação.',
  fans:388000, discography:[{title:'Quebrada Fala',year:2022,type:'Álbum'},{title:'Sobrevivi',year:2024,type:'Single'}]},
 {id:'a12',name:'Kaya Selassie',genre:'Reggae',city:'Florianópolis',state:'SC',photo:'kaya-selassie',
  bio:'Banda de reggae catarinense com forte pegada de festival de praia.',
  fans:142000, discography:[{title:'Maré Alta',year:2021,type:'Álbum'}]},
 {id:'a13',name:'VOLT',genre:'Eletrônica',city:'São Paulo',state:'SP',photo:'volt-dj',
  bio:'DJ e produtor que lidera a nova cena de música eletrônica brasileira nos grandes festivais.',
  fans:501000, discography:[{title:'Circuito',year:2023,type:'Álbum'},{title:'Sistema',year:2025,type:'EP'}]},
];
const artistById = id => ARTISTS.find(a=>a.id===id);

let EVENTS = [
 {id:'e1',title:'Festival Cerrado em Chamas',type:'festival',genre:'Festival',city:'Goiânia',state:'GO',date:'2026-09-19',time:'17:00',
  venue:'Autódromo Internacional de Goiânia',price:{min:180,max:450},cover:'festival-cerrado',classification:'18 anos',interested:15400,featured:true,
  ticketsUrl:'https://ingressos.exemplo.com/cerrado-em-chamas',
  description:'Dois dias de música ao ar livre no coração do Centro-Oeste. O Cerrado em Chamas reúne sertanejo raiz, sertanejo universitário e a nova cena eletrônica brasileira em três palcos simultâneos, com praça de alimentação regional e área camping.',
  lineup:[{artistId:'a1',time:'21:30'},{artistId:'a3',time:'19:45'},{artistId:'a13',time:'23:15'}]},
 {id:'e2',title:'Rian Castilho — Turnê Chão Batido',type:'show',genre:'Sertanejo',city:'Uberlândia',state:'MG',date:'2026-09-26',time:'22:00',
  venue:'Arena Sabiazinho',price:{min:90,max:260},cover:'rian-uberlandia',classification:'16 anos',interested:3900,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/rian-uberlandia',
  description:'Rian Castilho desembarca em Uberlândia com a turnê do álbum "Chão Batido", trazendo banda completa, telão de LED e os maiores sucessos dos últimos três anos.',
  lineup:[{artistId:'a1',time:'22:00'}]},
 {id:'e3',title:'Noites de Pagode: Bloco do Aroeira',type:'show',genre:'Pagode',city:'Salvador',state:'BA',date:'2026-10-03',time:'20:00',
  venue:'Concha Acústica',price:{min:60,max:180},cover:'aroeira-salvador',classification:'Livre',interested:5400,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/aroeira-salvador',
  description:'Uma noite de roda de samba e pagode com metais ao vivo, celebrando os 10 anos de carreira do Bloco do Aroeira na sua cidade natal.',
  lineup:[{artistId:'a4',time:'20:30'}]},
 {id:'e4',title:'Roda Nossa ao Vivo',type:'show',genre:'Samba',city:'Rio de Janeiro',state:'RJ',date:'2026-10-10',time:'19:30',
  venue:'Fundição Progresso',price:{min:50,max:150},cover:'roda-nossa-rio',classification:'Livre',interested:3600,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/roda-nossa-rio',
  description:'Gravação do novo DVD ao vivo do coletivo Roda Nossa, direto da Lapa carioca, com participações especiais anunciadas na hora.',
  lineup:[{artistId:'a5',time:'20:00'}]},
 {id:'e5',title:'Baile Tempero Bom',type:'show',genre:'Funk',city:'São Paulo',state:'SP',date:'2026-10-17',time:'23:00',
  venue:'Espaço das Américas',price:{min:70,max:220},cover:'mc-tempero-sp',classification:'18 anos',interested:9800,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/tempero-bom',
  description:'MC Tempero comanda uma noite inteira de batidas com line-up surpresa de convidados do funk paulistano.',
  lineup:[{artistId:'a6',time:'23:30'}]},
 {id:'e6',title:'São João Fora de Época — Trio Sanfona Nova',type:'show',genre:'Forró',city:'Fortaleza',state:'CE',date:'2026-10-24',time:'21:00',
  venue:'Centro de Eventos do Ceará',price:{min:55,max:160},cover:'sanfona-fortaleza',classification:'Livre',interested:2900,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/sanfona-fortaleza',
  description:'Quadrilha, sanfona e muito forró pé-de-serra num São João fora de época para lembrar o verão nordestino.',
  lineup:[{artistId:'a7',time:'21:30'}]},
 {id:'e7',title:'Ana Beraldo Trio — Água e Pedra',type:'show',genre:'MPB',city:'Belo Horizonte',state:'MG',date:'2026-11-01',time:'20:30',
  venue:'Sesc Palladium',price:{min:45,max:130},cover:'ana-beraldo-bh',classification:'Livre',interested:2200,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/ana-beraldo-bh',
  description:'Show intimista em formato trio, revisitando o repertório de "Água e Pedra" com arranjos de piano e cordas.',
  lineup:[{artistId:'a8',time:'21:00'}]},
 {id:'e8',title:'Nuvem Baixa — Turnê Satélite',type:'show',genre:'Pop',city:'Curitiba',state:'PR',date:'2026-11-07',time:'21:00',
  venue:'Ópera de Arame',price:{min:80,max:240},cover:'nuvem-baixa-curitiba',classification:'14 anos',interested:4100,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/nuvem-baixa-curitiba',
  description:'Cenário instalado dentro da Ópera de Arame para a turnê "Satélite", com projeções e sintetizadores analógicos.',
  lineup:[{artistId:'a9',time:'21:30'}]},
 {id:'e9',title:'Granito — 25 Anos de Estrada',type:'show',genre:'Rock',city:'Porto Alegre',state:'RS',date:'2026-11-14',time:'21:30',
  venue:'Opinião',price:{min:65,max:190},cover:'granito-poa',classification:'16 anos',interested:4800,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/granito-poa',
  description:'Show comemorativo de 25 anos de carreira, revisitando os três primeiros álbuns na íntegra.',
  lineup:[{artistId:'a10',time:'22:00'}]},
 {id:'e10',title:'Real Marginal — Quebrada Fala Tour',type:'show',genre:'Rap',city:'São Paulo',state:'SP',date:'2026-11-21',time:'22:00',
  venue:'Audio Club',price:{min:75,max:210},cover:'real-marginal-sp',classification:'16 anos',interested:6200,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/real-marginal-sp',
  description:'Real Marginal apresenta o show mais visual da carreira, com direção de palco e participações da nova geração do rap.',
  lineup:[{artistId:'a11',time:'22:30'}]},
 {id:'e11',title:'Kaya Selassie — Sunset Reggae',type:'show',genre:'Reggae',city:'Florianópolis',state:'SC',date:'2026-11-28',time:'18:00',
  venue:'Praia Mole Beach Club',price:{min:60,max:170},cover:'kaya-floripa',classification:'Livre',interested:2600,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/kaya-floripa',
  description:'Show ao pôr do sol na beira da praia, com abertura de DJ set reggae/dub.',
  lineup:[{artistId:'a12',time:'18:30'}]},
 {id:'e12',title:'VOLT — Sistema Tour',type:'show',genre:'Eletrônica',city:'São Paulo',state:'SP',date:'2026-12-05',time:'23:30',
  venue:'Cine Joia',price:{min:100,max:280},cover:'volt-sp',classification:'18 anos',interested:7600,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/volt-sp',
  description:'Set de quatro horas com produção visual imersiva para o lançamento do EP "Sistema".',
  lineup:[{artistId:'a13',time:'00:00'}]},
 {id:'e13',title:'Festival Verão Nordeste',type:'festival',genre:'Festival',city:'Recife',state:'PE',date:'2027-01-16',time:'16:00',
  venue:'Marco Zero',price:{min:150,max:400},cover:'festival-verao-nordeste',classification:'16 anos',interested:8900,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/verao-nordeste',
  description:'Dois dias de praia, forró, pagode e rap reunindo artistas de todo o Nordeste no Marco Zero do Recife.',
  lineup:[{artistId:'a7',time:'18:00'},{artistId:'a4',time:'20:30'},{artistId:'a11',time:'23:00'}]},
 {id:'e14',title:'Vitrola de Aço — Rodeio Fest',type:'show',genre:'Sertanejo',city:'Campo Grande',state:'MS',date:'2026-12-12',time:'21:00',
  venue:'Parque de Exposições Laucídio Coelho',price:{min:70,max:200},cover:'vitrola-campo-grande',classification:'16 anos',interested:3100,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/vitrola-campo-grande',
  description:'Show de encerramento da temporada de rodeios, com arena de montaria antes da apresentação musical.',
  lineup:[{artistId:'a3',time:'21:30'}]},
 {id:'e15',title:'Coração de Ouro — Modão Novo',type:'show',genre:'Sertanejo',city:'Belo Horizonte',state:'MG',date:'2027-01-23',time:'21:00',
  venue:'Mineirinho',price:{min:80,max:230},cover:'coracao-de-ouro-bh',classification:'Livre',interested:1900,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/coracao-ouro-bh',
  description:'Show de lançamento do EP "Modão Novo", com abertura de duplas revelação da cena mineira.',
  lineup:[{artistId:'a2',time:'21:30'}]},
 {id:'e16',title:'Festival das Águas',type:'festival',genre:'Festival',city:'Manaus',state:'AM',date:'2027-02-06',time:'17:00',
  venue:'Arena da Amazônia',price:{min:120,max:300},cover:'festival-das-aguas',classification:'16 anos',interested:3400,featured:false,
  ticketsUrl:'https://ingressos.exemplo.com/festival-das-aguas',
  description:'Festival multigênero às margens do Rio Negro, com line-up que mistura reggae, pop e a nova safra da região Norte.',
  lineup:[{artistId:'a12',time:'19:00'},{artistId:'a9',time:'21:30'}]},
];

const CATEGORIES = ['Avisos','Conversas','Fotos','Shows','Música'];
let POSTS = [
 {id:'p1',artistId:'a1',category:'Avisos',author:'Rian Castilho',authorAvatar:'rian-castilho',time:'há 2 dias',
  text:'Bora Goiânia! Nos vemos no Cerrado em Chamas dia 19/09. Levem a galera 🤠',likes:2140,liked:false,comments:[{author:'Duda M.',text:'JÁ TÔ COM A ROUPA SEPARADA'}]},
 {id:'p2',artistId:'a1',category:'Fotos',author:'Rian Castilho',authorAvatar:'rian-castilho',time:'há 5 dias',
  text:'Bastidores do ensaio de palco pra turnê Chão Batido.',image:'rian-backstage',likes:3320,liked:false,comments:[]},
 {id:'p3',artistId:'a1',category:'Conversas',author:'Marina T.',authorAvatar:'fan1',time:'há 1 semana',
  text:'Alguém sabe se vai ter meia entrada pra estudante no show de Uberlândia?',likes:88,liked:false,comments:[{author:'Rian Castilho',text:'Sim! Confira as regras na página oficial de ingressos 🎟️'}]},
 {id:'p4',artistId:'a6',category:'Shows',author:'MC Tempero',authorAvatar:'mc-tempero',time:'há 1 dia',
  text:'Baile Tempero Bom em SP tá quase lotado. Corre lá garantir o seu.',likes:4310,liked:false,comments:[]},
 {id:'p5',artistId:'a6',category:'Música',author:'MC Tempero',authorAvatar:'mc-tempero',time:'há 4 dias',
  text:'Prévia da batida nova saindo essa semana. Quem tá esperando?',likes:5120,liked:false,comments:[{author:'Kauê R.',text:'EU EU EU'}]},
 {id:'p6',artistId:'a5',category:'Fotos',author:'Roda Nossa',authorAvatar:'roda-nossa',time:'há 3 dias',
  text:'Registro da última roda antes da gravação do DVD.',image:'roda-nossa-photo',likes:960,liked:false,comments:[]},
 {id:'p7',artistId:'a13',category:'Avisos',author:'VOLT',authorAvatar:'volt-dj',time:'há 6 horas',
  text:'Sistema Tour confirmada em São Paulo. Produção mais pesada que já fizemos até hoje.',likes:2870,liked:false,comments:[]},
 {id:'p8',artistId:'a13',category:'Música',author:'VOLT',authorAvatar:'volt-dj',time:'há 2 dias',
  text:'EP novo já disponível nas plataformas. Faixa favorita de vocês?',likes:1980,liked:false,comments:[{author:'Bia F.',text:'a 3 é insana'}]},
];
// posts genéricos para as demais comunidades não terem feed vazio
ARTISTS.forEach(a=>{
  if(!POSTS.some(p=>p.artistId===a.id)){
    POSTS.push({id:'p-'+a.id+'-1',artistId:a.id,category:'Avisos',author:a.name,authorAvatar:a.photo,time:'há 3 dias',
      text:'Comunidade aberta! Bora trocar ideia sobre os próximos shows por aqui.',likes:Math.round(a.fans*0.0009),liked:false,comments:[]});
    POSTS.push({id:'p-'+a.id+'-2',artistId:a.id,category:'Conversas',author:'Fã da comunidade',authorAvatar:'fan2',time:'há 6 dias',
      text:'Alguém mais só de olho na próxima turnê? 👀',likes:Math.round(a.fans*0.0004),liked:false,comments:[]});
  }
});

const MOCK_PEOPLE = ['Marina T.','Kauê R.','Bia F.','Duda M.','Léo P.','Carol S.','Théo A.','Nanda V.','Bruno C.','Iris L.','Gabi O.','Vini M.'];

/* ---------------------------------------------------------
   2) ESTADO DA APLICAÇÃO
   --------------------------------------------------------- */
const STORAGE_KEY = 'rolezeiro_state_v1';
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed, {
      favorites:new Set(parsed.favorites||[]),
      interested:new Set(parsed.interested||[]),
      following:new Set(parsed.following||[]),
      likedPosts:new Set(parsed.likedPosts||[])
    });
  }catch(e){ return defaultState(); }
}
function defaultState(){
  return {
    theme:'dark', user:null,
    favorites:new Set(), interested:new Set(), following:new Set(), likedPosts:new Set(),
    notifications:[
      {id:'n1',icon:'bell',title:'Bem-vindo(a) ao Rolezeiro! Descubra seu próximo show.',time:'agora',unread:true},
    ]
  };
}
let STATE = loadState();
function persist(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      theme:STATE.theme, user:STATE.user,
      favorites:[...STATE.favorites], interested:[...STATE.interested],
      following:[...STATE.following], likedPosts:[...STATE.likedPosts],
      notifications:STATE.notifications
    }));
  }catch(e){ /* ambiente sem acesso a localStorage — segue só com estado em memória */ }
}

/* ---------------------------------------------------------
   3) HELPERS
   --------------------------------------------------------- */
const $ = s=>document.querySelector(s);
const $$ = s=>Array.from(document.querySelectorAll(s));
function img(seed,w,h){ return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`; }
/* fallback: se uma foto externa não carregar, esconde o <img> e deixa o
   gradiente de fundo do próprio container aparecer, em vez de ficar preto/quebrado */
document.addEventListener('error', function(e){
  const el = e.target;
  if(el && el.tagName === 'IMG'){ el.style.display = 'none'; el.dataset.broken = '1'; }
}, true);
function initials(name){ return name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase(); }
const MESES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const DIAS_SEM = ['dom','seg','ter','qua','qui','sex','sáb'];
function parseDate(str){ const [y,m,d]=str.split('-').map(Number); return new Date(y,m-1,d); }
function fmtDateShort(str){ const d=parseDate(str); return `${DIAS_SEM[d.getDay()]}, ${d.getDate()} ${MESES[d.getMonth()]}`; }
function fmtDateLong(str){ const d=parseDate(str); return `${d.getDate()} de ${['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'][d.getMonth()]} de ${d.getFullYear()}`; }
function daysUntil(str){ const d=parseDate(str); return Math.round((d-NOW)/86400000); }
function toast(msg){
  const root = $('#toast-root');
  const el = document.createElement('div'); el.className='toast'; el.textContent = msg;
  root.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),300); }, 2400);
}
function notify(title){
  STATE.notifications.unshift({id:'n'+Date.now(), icon:'bell', title, time:'agora', unread:true});
  persist(); renderNotifBadge();
}
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function requireAuth(msg, cb){
  if(STATE.user){ cb(); return; }
  toast(msg || 'Entre na sua conta para continuar');
  openAuthModal('login');
}

/* ---------------------------------------------------------
   4) ROTEADOR
   --------------------------------------------------------- */
let discoverState = {query:'', genre:'Todos', region:'Todos', city:'Todos', price:'Todos', view:'list', selectedRegion:null, selectedDay:null, calMonth:8, calYear:2026};
let meuRoleState = {view:'list', selectedDay:null, calMonth:8, calYear:2026};
let artistTab = {};
let communityFilter = {};
let adminTab = 'geral';

function parseHash(){
  const raw = (location.hash||'#/').slice(1);
  const [path, qs] = raw.split('?');
  const segments = path.split('/').filter(Boolean);
  const params = new URLSearchParams(qs||'');
  return {segments, params};
}

function navigate(hash){ location.hash = hash; }

function render(){
  const {segments, params} = parseHash();
  const root = $('#app-root');
  let html = '';
  const seg0 = segments[0];

  if(!seg0){ html = renderHome(); }
  else if(seg0==='discover' || seg0==='events'){
    if(params.get('q')) discoverState.query = params.get('q');
    if(params.get('genre')) discoverState.genre = params.get('genre');
    html = renderDiscover();
  }
  else if(seg0==='event' && segments[1]){ html = renderEventDetail(segments[1]); }
  else if(seg0==='artist' && segments[1]){ html = renderArtistDetail(segments[1]); }
  else if(seg0==='communities'){ html = renderCommunitiesList(); }
  else if(seg0==='community' && segments[1]){ html = renderCommunityDetail(segments[1]); }
  else if(seg0==='meu-role'){ html = renderMeuRole(); }
  else if(seg0==='perfil'){ html = renderProfile(); }
  else if(seg0==='organizador'){ html = renderOrganizerDashboard(); }
  else if(seg0==='admin'){ html = renderAdminDashboard(); }
  else { html = renderNotFound(); }

  root.innerHTML = `<div class="view">${html}</div>`;
  window.scrollTo({top:0,behavior:'instant' in window ? 'instant':'auto'});
  afterRender(seg0);
  updateActiveNav();
}

function renderNotFound(){
  return `<div class="container section"><div class="empty-state"><h3>Página não encontrada</h3><p>Esse rolê ainda não existe por aqui.</p>
  <a href="#/" class="btn btn-primary mt-16">Voltar para o início</a></div></div>`;
}

/* ---------------------------------------------------------
   5) COMPONENTES DE CARD
   --------------------------------------------------------- */
function eventCard(ev){
  const saved = STATE.favorites.has(ev.id);
  const artistNames = ev.lineup.map(l=>artistById(l.artistId)?.name).filter(Boolean).join(', ');
  return `
  <div class="card-event" data-open-event="${ev.id}">
    <div class="card-media">
      <img src="${img(ev.cover,540,405)}" alt="${escapeHtml(ev.title)}" loading="lazy">
      <span class="card-genre-tag">${ev.genre}</span>
      <button class="card-save ${saved?'is-saved':''}" data-action="toggle-save" data-id="${ev.id}" aria-label="Salvar evento">
        <svg viewBox="0 0 24 24"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/></svg>
      </button>
    </div>
    <div class="card-body">
      <span class="card-date-chip">${fmtDateShort(ev.date)}</span>
      <span class="card-title">${escapeHtml(ev.title)}</span>
      <span class="card-city"><svg viewBox="0 0 24 24"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>${ev.city} · ${ev.state}</span>
      <span class="card-artists">${escapeHtml(artistNames)}</span>
    </div>
  </div>`;
}
function artistCard(a){
  const following = STATE.following.has(a.id);
  return `
  <div class="card-artist" data-open-artist="${a.id}">
    <div class="card-artist-photo"><img src="${img(a.photo,260,260)}" alt="${escapeHtml(a.name)}" loading="lazy"></div>
    <div class="card-artist-name">${escapeHtml(a.name)}</div>
    <div class="card-artist-genre">${a.genre} · ${a.city}</div>
    <button class="btn ${following?'btn-active':'btn-secondary'} btn-sm card-artist-follow" data-action="toggle-follow" data-id="${a.id}">${following?'Seguindo':'Seguir'}</button>
  </div>`;
}
function festivalCard(ev){
  return `
  <div class="card-festival" data-open-event="${ev.id}">
    <img src="${img(ev.cover,640,400)}" alt="${escapeHtml(ev.title)}" loading="lazy">
    <div class="card-festival-body">
      <div class="card-festival-title">${escapeHtml(ev.title)}</div>
      <div class="card-festival-meta">${fmtDateShort(ev.date)} · ${ev.city}, ${ev.state}</div>
    </div>
  </div>`;
}
function rail(title,sub,linkHash,cardsHtml){
  return `
  <div class="section">
    <div class="section-head">
      <div><div class="section-title">${title}</div>${sub?`<div class="section-sub">${sub}</div>`:''}</div>
      ${linkHash?`<a class="section-link" data-route="${linkHash}">Ver tudo</a>`:''}
    </div>
    <div class="rail">${cardsHtml}</div>
  </div>`;
}

/* ---------------------------------------------------------
   6) HOME
   --------------------------------------------------------- */
function renderHome(){
  const featured = EVENTS.find(e=>e.featured) || EVENTS[0];
  const user = STATE.user;

  const perto = user ? EVENTS.filter(e=>e.state===user.state) : EVENTS.filter(e=>e.state==='SP');
  const pertoLabel = user ? `perto de ${user.city}` : 'em destaque em São Paulo';

  const emAlta = [...EVENTS].sort((a,b)=>b.interested-a.interested).slice(0,8);
  const artistasPop = [...ARTISTS].sort((a,b)=>b.fans-a.fans).slice(0,8);
  const festivais = EVENTS.filter(e=>e.type==='festival');

  let talvez;
  if(user && user.genres && user.genres.length){
    talvez = EVENTS.filter(e=>user.genres.includes(e.genre) && !STATE.interested.has(e.id));
  } else {
    talvez = EVENTS.filter(e=>['MPB','Rock','Reggae'].includes(e.genre));
  }
  if(talvez.length===0) talvez = EVENTS.slice(0,6);

  return `
  <section class="hero">
    <div class="hero-bg" style="background-image:url('${img(featured.cover,1600,1000)}'), linear-gradient(135deg, var(--violet), var(--pink))"></div>
    <div class="hero-scrim"></div>
    <div class="hero-content">
      <span class="hero-eyebrow"><span class="dot-live"></span>Destaque da semana</span>
      <h1 class="hero-title">${escapeHtml(featured.title)}</h1>
      <div class="hero-meta">
        <span><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>${fmtDateShort(featured.date)}</span>
        <span><svg viewBox="0 0 24 24"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>${featured.city}, ${featured.state}</span>
        <span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>${featured.time}</span>
      </div>
      <div class="hero-artists">Com ${featured.lineup.map(l=>artistById(l.artistId)?.name).join(', ')}</div>
      <div class="hero-actions">
        <button class="btn btn-primary" data-open-event="${featured.id}">Ver evento</button>
        <button class="btn btn-ghost" style="color:#fff;border-color:rgba(255,255,255,.4)" data-action="toggle-save" data-id="${featured.id}">${STATE.favorites.has(featured.id)?'Salvo ✓':'Salvar'}</button>
      </div>
    </div>
  </section>
  <div class="container">
    ${!user ? `
    <div class="info-card" style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div><h3 style="margin-bottom:4px">Personalize sua experiência</h3><p class="text-muted" style="font-size:13px">Crie sua conta e conte seus gêneros e artistas favoritos para recomendações sob medida.</p></div>
      <button class="btn btn-primary" data-action="open-auth" data-tab="signup">Criar conta</button>
    </div>` : ''}

    ${rail(`Eventos ${pertoLabel}`, 'Selecionados para a sua região', '#/discover', perto.slice(0,8).map(eventCard).join('') || '<p class="text-muted">Nenhum evento por aqui ainda.</p>')}
    <hr class="perf-divider">
    ${rail('Em alta 🔥','O que mais tem gente confirmando presença','#/discover', emAlta.map(eventCard).join(''))}
    <hr class="perf-divider">
    ${rail('Artistas populares','Quem está bombando na plataforma','#/communities', artistasPop.map(artistCard).join(''))}
    <hr class="perf-divider">
    ${rail('Festivais em destaque','Vários artistas, um só ingresso','#/discover?genre=Festival', festivais.map(festivalCard).join(''))}
    <hr class="perf-divider">
    ${rail('Talvez você goste','Baseado nos seus gêneros favoritos', '#/discover', talvez.slice(0,8).map(eventCard).join(''))}
  </div>
  <footer class="site-footer container">
    <p><strong>Rolezeiro</strong> — Descubra. Conecte-se. Viva.</p>
    <p class="mt-8">Protótipo de portfólio com dados fictícios. Todos os eventos, artistas e comunidades apresentados são fictícios.</p>
  </footer>`;
}

/* ---------------------------------------------------------
   7) DESCOBRIR / EVENTOS (lista, calendário, mapa)
   --------------------------------------------------------- */
function filterEvents(){
  const s = discoverState;
  return EVENTS.filter(e=>{
    if(s.query){
      const q = s.query.toLowerCase();
      const hay = (e.title+' '+e.city+' '+e.state+' '+e.genre+' '+e.lineup.map(l=>artistById(l.artistId)?.name).join(' ')).toLowerCase();
      if(!hay.includes(q)) return false;
    }
    if(s.genre!=='Todos' && e.genre!==s.genre) return false;
    if(s.region!=='Todos' && REGION_BY_STATE[e.state]!==s.region) return false;
    if(s.city!=='Todos' && e.city!==s.city) return false;
    if(s.price!=='Todos'){
      if(s.price==='ate100' && e.price.min>100) return false;
      if(s.price==='100a250' && (e.price.min<100||e.price.min>250)) return false;
      if(s.price==='250mais' && e.price.min<250) return false;
    }
    return true;
  }).sort((a,b)=>parseDate(a.date)-parseDate(b.date));
}

function renderDiscover(){
  const cities = [...new Set(EVENTS.map(e=>e.city))].sort();
  return `
  <div class="container">
    <div class="page-banner">
      <h1>Descubra seu próximo rolê</h1>
      <p>Busque por artistas, eventos, festivais ou cidades e filtre do seu jeito.</p>
    </div>
    ${discoverState.query ? `<div class="mt-8" style="margin-bottom:14px"><span class="badge-pill badge-pink">Busca: "${escapeHtml(discoverState.query)}"
      <button data-action="clear-query" style="margin-left:8px;background:none;border:none;color:inherit;cursor:pointer;font-weight:700">✕</button></span></div>` : ''}
    <div class="genre-chip-row" id="genre-chip-row">
      ${['Todos',...GENRES].map(g=>`<button class="genre-chip ${discoverState.genre===g?'active':''}" data-action="set-genre" data-genre="${g}">${g}</button>`).join('')}
    </div>
    <div class="filters-bar">
      <select id="filter-region" data-action="set-region">
        <option value="Todos">Todas as regiões</option>
        ${Object.keys(REGION_LABEL).map(r=>`<option value="${r}" ${discoverState.region===r?'selected':''}>${REGION_LABEL[r]}</option>`).join('')}
      </select>
      <select id="filter-city" data-action="set-city">
        <option value="Todos">Todas as cidades</option>
        ${cities.map(c=>`<option value="${c}" ${discoverState.city===c?'selected':''}>${c}</option>`).join('')}
      </select>
      <select id="filter-price" data-action="set-price">
        <option value="Todos">Qualquer preço</option>
        <option value="ate100" ${discoverState.price==='ate100'?'selected':''}>Até R$100</option>
        <option value="100a250" ${discoverState.price==='100a250'?'selected':''}>R$100 – R$250</option>
        <option value="250mais" ${discoverState.price==='250mais'?'selected':''}>Acima de R$250</option>
      </select>
      <div class="view-toggle">
        <button data-action="set-discover-view" data-view="list" class="${discoverState.view==='list'?'active':''}">Lista</button>
        <button data-action="set-discover-view" data-view="calendar" class="${discoverState.view==='calendar'?'active':''}">Calendário</button>
        <button data-action="set-discover-view" data-view="map" class="${discoverState.view==='map'?'active':''}">Mapa</button>
      </div>
    </div>
    <div id="discover-results"></div>
  </div>`;
}
function renderDiscoverResults(){
  const container = $('#discover-results');
  if(!container) return;
  const results = filterEvents();
  if(discoverState.view==='list'){
    container.innerHTML = results.length ? `<div class="results-grid">${results.map(eventCard).join('')}</div>`
      : `<div class="empty-state"><h3>Nenhum evento encontrado</h3><p>Tente ajustar os filtros ou buscar por outro termo.</p></div>`;
  } else if(discoverState.view==='calendar'){
    container.innerHTML = renderCalendar(results,'discover');
  } else {
    container.innerHTML = renderMap(results);
  }
}
function renderCalendar(results, ctx){
  ctx = ctx || 'discover';
  const cs = ctx==='meurole' ? meuRoleState : discoverState;
  const y = cs.calYear, m = cs.calMonth;
  const first = new Date(y,m,1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(y,m+1,0).getDate();
  const byDay = {};
  results.forEach(e=>{ const d=parseDate(e.date); if(d.getFullYear()===y && d.getMonth()===m){ (byDay[d.getDate()]=byDay[d.getDate()]||[]).push(e); } });
  let cells = '';
  for(let i=0;i<startOffset;i++) cells += `<div class="calendar-day empty"></div>`;
  for(let day=1; day<=daysInMonth; day++){
    const evs = byDay[day]||[];
    const sel = cs.selectedDay===day;
    cells += `<div class="calendar-day ${evs.length?'has-event':''} ${sel?'selected':''}" data-action="pick-day" data-ctx="${ctx}" data-day="${day}">
      <span>${day}</span>
      <div class="calendar-day-dots">${evs.slice(0,4).map(()=>'<span></span>').join('')}</div>
    </div>`;
  }
  const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const dayEvents = cs.selectedDay ? (byDay[cs.selectedDay]||[]) : [];
  return `
  <div class="info-card">
    <div class="flex items-center" style="justify-content:space-between;margin-bottom:16px">
      <button class="icon-btn" data-action="cal-prev" data-ctx="${ctx}">‹</button>
      <h3>${monthNames[m]} ${y}</h3>
      <button class="icon-btn" data-action="cal-next" data-ctx="${ctx}">›</button>
    </div>
    <div class="calendar-grid">
      ${DIAS_SEM.map(d=>`<div class="calendar-dow">${d}</div>`).join('')}
      ${cells}
    </div>
  </div>
  ${cs.selectedDay ? `<h3 class="mt-24" style="margin-bottom:12px">Eventos em ${cs.selectedDay}/${m+1}</h3>
  <div class="results-grid">${dayEvents.length?dayEvents.map(eventCard).join(''):'<div class="empty-state">Nenhum evento nesse dia.</div>'}</div>` : ''}
  `;
}
function renderMap(results){
  const counts = {};
  results.forEach(e=>{ const r=REGION_BY_STATE[e.state]; counts[r]=(counts[r]||0)+1; });
  const regionEvents = discoverState.selectedRegion ? results.filter(e=>REGION_BY_STATE[e.state]===discoverState.selectedRegion) : [];
  return `
  <div class="brazil-map">
    ${Object.keys(REGION_LABEL).map(r=>`
      <div class="map-region ${discoverState.selectedRegion===r?'active':''}" data-region="${r}" data-action="pick-region">
        <span class="map-region-label">${REGION_LABEL[r]}</span>
        <span class="map-region-count">${counts[r]||0} evento(s)</span>
      </div>`).join('')}
  </div>
  ${discoverState.selectedRegion ? `
  <div class="map-events-list">
    ${regionEvents.length ? regionEvents.map(e=>`
      <div class="map-event-row" data-action="quick-preview" data-id="${e.id}">
        <img src="${img(e.cover,120,120)}" alt="">
        <div class="mer-info"><div class="mer-title">${escapeHtml(e.title)}</div><div class="mer-meta">${fmtDateShort(e.date)} · ${e.city}, ${e.state}</div></div>
        <svg viewBox="0 0 24 24" width="16" height="16" style="stroke:var(--text-faint);fill:none;stroke-width:2"><path d="m9 6 6 6-6 6"/></svg>
      </div>`).join('') : '<div class="empty-state">Nenhum evento nessa região com os filtros atuais.</div>'}
  </div>` : `<p class="text-muted mt-24">Selecione uma região do mapa para ver os eventos disponíveis.</p>`}
  `;
}

/* ---------------------------------------------------------
   8) PÁGINA DE EVENTO
   --------------------------------------------------------- */
function renderEventDetail(id){
  const ev = EVENTS.find(e=>e.id===id);
  if(!ev) return renderNotFound();
  const saved = STATE.favorites.has(ev.id);
  const interested = STATE.interested.has(ev.id);
  const goingSample = MOCK_PEOPLE.slice(0, Math.min(10, MOCK_PEOPLE.length));
  return `
  <div class="container" style="padding-top:20px">
    <div class="event-hero">
      <img src="${img(ev.cover,1400,700)}" alt="${escapeHtml(ev.title)}">
      <div class="event-hero-scrim"></div>
      <div class="event-hero-info">
        <span class="badge-pill badge-pink">${ev.genre}</span>
        <h1 style="font-size:clamp(24px,4vw,38px);margin-top:10px">${escapeHtml(ev.title)}</h1>
      </div>
    </div>
    <div class="event-layout">
      <div>
        <div class="info-card">
          <h3>Sobre o evento</h3>
          <p style="font-size:14px;line-height:1.6;color:var(--text-muted)">${escapeHtml(ev.description)}</p>
        </div>
        <div class="info-card">
          <h3>Programação</h3>
          ${ev.lineup.map(l=>{ const a=artistById(l.artistId); return `
          <div class="lineup-row">
            <img src="${img(a.photo,90,90)}" alt="">
            <div><div class="lr-name" data-open-artist="${a.id}" style="cursor:pointer">${escapeHtml(a.name)}</div><div class="text-muted" style="font-size:12px">${a.genre}</div></div>
            <span class="lr-time">${l.time}</span>
          </div>`; }).join('')}
        </div>
        <div class="info-card">
          <h3>Informações importantes</h3>
          <div class="info-row"><svg viewBox="0 0 24 24"><path d="M12 9v4M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg><div><b>Classificação</b><span>${ev.classification}</span></div></div>
          <div class="info-row"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 4v16M4 9h16"/></svg><div><b>Meia-entrada</b><span>Conforme legislação vigente, mediante comprovação na entrada.</span></div></div>
          <div class="info-row"><svg viewBox="0 0 24 24"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg><div><b>Acessibilidade</b><span>Local com estrutura de acessibilidade e área reservada (PCD).</span></div></div>
        </div>
      </div>
      <div class="sticky-side">
        <div class="info-card">
          <div class="info-row"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg><div><b>Data</b><span>${fmtDateLong(ev.date)}</span></div></div>
          <div class="info-row"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg><div><b>Horário</b><span>${ev.time}</span></div></div>
          <div class="info-row"><svg viewBox="0 0 24 24"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg><div><b>Local</b><span>${ev.venue} — ${ev.city}, ${ev.state}</span></div></div>
          <div class="info-row"><svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg><div><b>Ingressos a partir de</b><span>R$ ${ev.price.min} — R$ ${ev.price.max}</span></div></div>
          <div class="action-stack mt-16">
            <a class="btn btn-primary" href="${ev.ticketsUrl}" target="_blank" rel="noopener">Ver ingressos</a>
            <button class="btn ${interested?'btn-active':'btn-secondary'}" data-action="toggle-interest" data-id="${ev.id}">${interested?'Interesse confirmado ✓':'Tenho interesse'}</button>
            <button class="btn ${saved?'btn-active':'btn-outline-pink'}" data-action="toggle-save" data-id="${ev.id}">${saved?'Salvo ✓':'Salvar evento'}</button>
            <button class="btn btn-ghost" data-action="share-event" data-id="${ev.id}">Compartilhar</button>
          </div>
        </div>
        <div class="info-card">
          <h3>Quem vai? <span class="text-muted" style="font-weight:500;font-size:12.5px">· ${ev.interested.toLocaleString('pt-BR')} interessados</span></h3>
          <div class="who-going-grid">
            ${goingSample.map(n=>`<div><div class="avatar avatar-md" style="margin:0 auto 6px">${initials(n)}</div><div class="who-going-name">${n}</div></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------------------------------------------------------
   9) PÁGINA DE ARTISTA
   --------------------------------------------------------- */
function renderArtistDetail(id){
  const a = artistById(id);
  if(!a) return renderNotFound();
  const following = STATE.following.has(a.id);
  const tab = artistTab[a.id] || 'eventos';
  const upcoming = EVENTS.filter(e=>e.lineup.some(l=>l.artistId===a.id) && parseDate(e.date)>=NOW).sort((x,y)=>parseDate(x.date)-parseDate(y.date));
  const posts = POSTS.filter(p=>p.artistId===a.id).slice(0,2);

  let tabContent = '';
  if(tab==='eventos'){
    tabContent = upcoming.length ? `<div class="results-grid">${upcoming.map(eventCard).join('')}</div>` : `<div class="empty-state"><h3>Sem shows marcados</h3><p>Siga o artista para ser avisado assim que um novo show for anunciado.</p></div>`;
  } else if(tab==='discografia'){
    tabContent = a.discography.map(d=>`<div class="discog-row"><img src="${img(a.photo+d.title,90,90)}" alt=""><div><b style="font-size:14px">${escapeHtml(d.title)}</b><div class="text-muted" style="font-size:12px">${d.type} · ${d.year}</div></div></div>`).join('');
  } else {
    tabContent = `<div id="artist-community-preview">${posts.map(postCard).join('')}</div><a class="btn btn-secondary mt-8" data-route="#/community/${a.id}">Ver comunidade completa</a>`;
  }

  return `
  <div class="container">
    <div class="artist-hero">
      <div class="artist-hero-photo"><img src="${img(a.photo,300,300)}" alt="${escapeHtml(a.name)}"></div>
      <div>
        <span class="badge-pill badge-violet">${a.genre}</span>
        <h1 style="margin-top:8px;font-size:clamp(24px,3.6vw,34px)">${escapeHtml(a.name)}</h1>
        <p class="text-muted" style="max-width:560px;margin-top:6px;font-size:13.5px">${escapeHtml(a.bio)}</p>
        <div class="artist-stats">
          <div class="artist-stat"><b>${(a.fans/1000).toFixed(0)}k</b><span>fãs na plataforma</span></div>
          <div class="artist-stat"><b>${upcoming.length}</b><span>shows agendados</span></div>
          <div class="artist-stat"><b>${a.discography.length}</b><span>lançamentos</span></div>
        </div>
        <button class="btn ${following?'btn-active':'btn-primary'}" data-action="toggle-follow" data-id="${a.id}">${following?'Seguindo ✓':'Seguir artista'}</button>
      </div>
    </div>
    <div class="tabs">
      <button class="tab-btn ${tab==='eventos'?'active':''}" data-action="artist-tab" data-artist="${a.id}" data-tab="eventos">Próximos eventos</button>
      <button class="tab-btn ${tab==='discografia'?'active':''}" data-action="artist-tab" data-artist="${a.id}" data-tab="discografia">Discografia</button>
      <button class="tab-btn ${tab==='comunidade'?'active':''}" data-action="artist-tab" data-artist="${a.id}" data-tab="comunidade">Comunidade</button>
    </div>
    <div id="artist-tab-content">${tabContent}</div>
  </div>`;
}

/* ---------------------------------------------------------
   10) COMUNIDADES
   --------------------------------------------------------- */
function renderCommunitiesList(){
  const following = ARTISTS.filter(a=>STATE.following.has(a.id));
  const rest = ARTISTS.filter(a=>!STATE.following.has(a.id));
  function grid(list){
    return `<div class="results-grid">${list.map(a=>`
      <div class="card-event" data-open-community="${a.id}">
        <div class="card-media"><img src="${img(a.photo,540,405)}" alt=""><span class="card-genre-tag">${a.genre}</span></div>
        <div class="card-body">
          <span class="card-title">${escapeHtml(a.name)}</span>
          <span class="card-city">${(a.fans/1000).toFixed(0)}k fãs · ${POSTS.filter(p=>p.artistId===a.id).length} publicações</span>
          <button class="btn ${STATE.following.has(a.id)?'btn-active':'btn-secondary'} btn-sm mt-8" data-action="toggle-follow" data-id="${a.id}">${STATE.following.has(a.id)?'Seguindo':'Seguir'}</button>
        </div>
      </div>`).join('')}</div>`;
  }
  return `
  <div class="container">
    <div class="page-banner"><h1>Comunidades</h1><p>Espaços de cada artista para trocar com a fanbase: avisos, fotos, conversas e muito mais.</p></div>
    ${following.length ? `<div class="section-head"><div class="section-title">Suas comunidades</div></div>${grid(following)}<hr class="perf-divider" style="margin:30px 0">` : ''}
    <div class="section-head"><div class="section-title">Descobrir comunidades</div></div>
    ${grid(rest)}
  </div>`;
}

function postCard(p){
  const liked = STATE.likedPosts.has(p.id);
  return `
  <div class="post-card">
    <div class="post-head">
      <span class="avatar avatar-sm"><img src="${img(p.authorAvatar,60,60)}" alt=""></span>
      <div><div class="ph-name">${escapeHtml(p.author)}</div><div class="ph-meta">${p.time}</div></div>
      <span class="badge-pill post-cat-tag">${p.category}</span>
    </div>
    <div class="post-text">${escapeHtml(p.text)}</div>
    ${p.image ? `<div class="post-image"><img src="${img(p.image,700,394)}" alt=""></div>` : ''}
    <div class="post-actions">
      <button class="post-action ${liked?'liked':''}" data-action="toggle-like" data-id="${p.id}">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg>
        ${(p.likes + (liked?1:0)).toLocaleString('pt-BR')}
      </button>
      <button class="post-action" data-action="toggle-comments" data-id="${p.id}">
        <svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v9Z"/></svg>
        ${p.comments.length}
      </button>
      <button class="post-action" data-action="share-post" data-id="${p.id}">
        <svg viewBox="0 0 24 24"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14"/></svg>
        Compartilhar
      </button>
    </div>
    <div class="comments-block hidden" id="comments-${p.id}" style="margin-top:12px">
      ${p.comments.map(c=>`<div style="font-size:12.5px;margin-bottom:6px"><b>${escapeHtml(c.author)}:</b> ${escapeHtml(c.text)}</div>`).join('')}
      <form data-action="add-comment" data-id="${p.id}" style="display:flex;gap:8px;margin-top:8px">
        <input type="text" placeholder="Escreva um comentário..." required style="flex:1;background:var(--surface-2);border:1px solid var(--border);border-radius:100px;padding:8px 14px;color:var(--text);font-size:12.5px">
        <button class="btn btn-sm btn-secondary" type="submit">Enviar</button>
      </form>
    </div>
  </div>`;
}

function renderCommunityDetail(artistId){
  const a = artistById(artistId);
  if(!a) return renderNotFound();
  const cat = communityFilter[artistId] || 'Todos';
  const posts = POSTS.filter(p=>p.artistId===artistId && (cat==='Todos' || p.category===cat)).sort((x,y)=> x.id<y.id?1:-1);
  const following = STATE.following.has(a.id);
  return `
  <div class="container">
    <div class="community-banner"><img src="${img(a.photo+'-banner',1400,540)}" alt=""></div>
    <div class="community-head">
      <div class="community-avatar"><img src="${img(a.photo,200,200)}" alt=""></div>
      <div style="flex:1">
        <h1 style="font-size:22px">${escapeHtml(a.name)}</h1>
        <p class="text-muted" style="font-size:13px">${(a.fans/1000).toFixed(0)}k fãs · ${POSTS.filter(p=>p.artistId===artistId).length} publicações</p>
      </div>
      <button class="btn ${following?'btn-active':'btn-primary'}" data-action="toggle-follow" data-id="${a.id}">${following?'Seguindo ✓':'Seguir comunidade'}</button>
    </div>
    <div class="event-layout">
      <div>
        <div class="category-row">
          <button class="category-chip ${cat==='Todos'?'active':''}" data-action="community-cat" data-artist="${artistId}" data-cat="Todos">Todos</button>
          ${CATEGORIES.map(c=>`<button class="category-chip ${cat===c?'active':''}" data-action="community-cat" data-artist="${artistId}" data-cat="${c}">${c}</button>`).join('')}
        </div>
        <form class="post-composer" data-action="new-post" data-artist="${artistId}">
          <span class="avatar avatar-sm">${STATE.user? initials(STATE.user.name): '?'}</span>
          <textarea placeholder="Compartilhe algo com a comunidade de ${escapeHtml(a.name)}..." required></textarea>
          <button class="btn btn-primary btn-sm" type="submit" style="align-self:flex-end">Publicar</button>
        </form>
        <div id="community-feed">${posts.map(postCard).join('') || '<div class="empty-state">Nenhuma publicação nessa categoria ainda.</div>'}</div>
      </div>
      <div class="sticky-side">
        <div class="community-side-card">
          <h3 style="font-size:14px;margin-bottom:10px">Sobre o artista</h3>
          <p class="text-muted" style="font-size:13px">${escapeHtml(a.bio)}</p>
          <a class="btn btn-secondary btn-sm mt-16 btn-block" data-route="#/artist/${a.id}">Ver perfil do artista</a>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------------------------------------------------------
   11) MEU ROLÊ
   --------------------------------------------------------- */
function renderMeuRole(){
  if(!STATE.user){
    return `<div class="container section"><div class="empty-state"><h3>Entre para ver seu Meu Rolê</h3><p>Salve eventos e marque interesse para montar sua agenda pessoal.</p>
    <button class="btn btn-primary mt-16" data-action="open-auth" data-tab="login">Entrar</button></div></div>`;
  }
  const list = currentMeuRoleList();
  return `
  <div class="container">
    <div class="page-banner"><h1>Meu Rolê</h1><p>Seus eventos salvos e com interesse confirmado, organizados por data.</p></div>
    <div class="filters-bar">
      <div class="view-toggle">
        <button data-action="set-meurole-view" data-view="list" class="${meuRoleState.view==='list'?'active':''}">Lista</button>
        <button data-action="set-meurole-view" data-view="calendar" class="${meuRoleState.view==='calendar'?'active':''}">Calendário</button>
      </div>
    </div>
    <div id="meurole-results">${renderMeuRoleContent(list)}</div>
  </div>`;
}
function currentMeuRoleList(){
  const ids = new Set([...STATE.favorites, ...STATE.interested]);
  return EVENTS.filter(e=>ids.has(e.id)).sort((a,b)=>parseDate(a.date)-parseDate(b.date));
}
function refreshMeuRoleUI(){
  const el = $('#meurole-results');
  if(el) el.innerHTML = renderMeuRoleContent(currentMeuRoleList());
}
function renderMeuRoleContent(list){
  if(list.length===0) return `<div class="empty-state"><h3>Sua agenda está vazia</h3><p>Explore o Descobrir e salve eventos ou marque interesse para vê-los aqui.</p><a class="btn btn-primary mt-16" data-route="#/discover">Descobrir eventos</a></div>`;
  if(meuRoleState.view==='calendar'){
    return renderCalendar(list,'meurole');
  }
  return `<div style="display:flex;flex-direction:column;gap:12px">${list.map(ev=>{
    const d = daysUntil(ev.date);
    const dLabel = d<0 ? 'Já rolou' : d===0 ? 'É hoje!' : `Faltam ${d} dia${d===1?'':'s'}`;
    return `
    <div class="map-event-row" style="padding:14px">
      <img src="${img(ev.cover,120,120)}" alt="" style="width:70px;height:70px" data-open-event="${ev.id}">
      <div class="mer-info" data-open-event="${ev.id}" style="cursor:pointer">
        <div class="mer-title">${escapeHtml(ev.title)}</div>
        <div class="mer-meta">${fmtDateShort(ev.date)} · ${ev.city}, ${ev.state}</div>
        <span class="badge-pill badge-pink mt-8" style="margin-top:6px">${dLabel}</span>
      </div>
      <button class="icon-btn" data-action="remove-role" data-id="${ev.id}" aria-label="Remover" title="Remover da agenda">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
    </div>`; }).join('')}</div>`;
}

/* ---------------------------------------------------------
   12) PERFIL
   --------------------------------------------------------- */
function renderProfile(){
  const u = STATE.user;
  if(!u){
    return `<div class="container section"><div class="empty-state"><h3>Você ainda não entrou</h3><p>Crie uma conta para salvar eventos, seguir artistas e participar de comunidades.</p>
    <div class="flex mt-16" style="justify-content:center;gap:10px"><button class="btn btn-primary" data-action="open-auth" data-tab="signup">Criar conta</button>
    <button class="btn btn-secondary" data-action="open-auth" data-tab="login">Entrar</button></div></div></div>`;
  }
  const favArtists = ARTISTS.filter(a=>STATE.following.has(a.id));
  const favEvents = EVENTS.filter(e=>STATE.favorites.has(e.id) || STATE.interested.has(e.id));
  const past = favEvents.filter(e=>parseDate(e.date)<NOW);
  return `
  <div class="container">
    <div class="profile-head">
      <span class="avatar avatar-lg">${initials(u.name)}</span>
      <div>
        <h1 style="font-size:22px">${escapeHtml(u.name)}</h1>
        <p class="text-muted" style="font-size:13px">@${escapeHtml(u.username)} · ${u.city}, ${u.state}</p>
        <p class="profile-bio">${escapeHtml(u.bio||'Fã de música em busca do próximo rolê.')}</p>
        <div class="stat-strip">
          <div class="artist-stat"><b>${favArtists.length}</b><span>seguindo</span></div>
          <div class="artist-stat"><b>${STATE.favorites.size}</b><span>eventos salvos</span></div>
          <div class="artist-stat"><b>${past.length}</b><span>histórico</span></div>
        </div>
      </div>
      <button class="btn btn-ghost" data-action="logout" style="margin-left:auto">Sair</button>
    </div>
    <h3 class="mt-16" style="margin-bottom:10px">Gêneros favoritos</h3>
    <div class="pick-grid">${(u.genres||[]).map(g=>`<span class="pick-chip active">${g}</span>`).join('') || '<span class="text-muted">Nenhum gênero selecionado.</span>'}</div>
    <h3 class="mt-24" style="margin-bottom:10px">Artistas que você segue</h3>
    <div class="rail" style="padding-left:0;margin-left:0">${favArtists.length? favArtists.map(artistCard).join('') : '<p class="text-muted">Você ainda não segue nenhum artista.</p>'}</div>
    <h3 class="mt-24" style="margin-bottom:10px">Histórico de eventos</h3>
    <div class="results-grid">${past.length? past.map(eventCard).join('') : '<p class="text-muted">Nenhum evento no histórico ainda.</p>'}</div>
  </div>`;
}

/* ---------------------------------------------------------
   13) DASHBOARD DO ORGANIZADOR
   --------------------------------------------------------- */
function renderOrganizerDashboard(){
  const totalInteresse = EVENTS.reduce((s,e)=>s+e.interested,0);
  return `
  <div class="container">
    <div class="page-banner"><h1>Painel do organizador</h1><p>Cadastre eventos e acompanhe estatísticas da sua produtora.</p></div>
    <div class="dash-grid">
      <div class="stat-card"><div class="sc-label">Visualizações totais</div><div class="sc-value">${(totalInteresse*6.4|0).toLocaleString('pt-BR')}</div><div class="sc-trend">↑ 12% na semana</div></div>
      <div class="stat-card"><div class="sc-label">Pessoas interessadas</div><div class="sc-value">${totalInteresse.toLocaleString('pt-BR')}</div><div class="sc-trend">↑ 8% na semana</div></div>
      <div class="stat-card"><div class="sc-label">Eventos cadastrados</div><div class="sc-value">${EVENTS.length}</div></div>
      <div class="stat-card"><div class="sc-label">Artistas cadastrados</div><div class="sc-value">${ARTISTS.length}</div></div>
    </div>
    <h3 style="margin-bottom:12px">Seus eventos</h3>
    <div class="table-wrap mt-8" style="margin-bottom:30px">
      <table class="dash-table">
        <thead><tr><th>Evento</th><th>Cidade</th><th>Data</th><th>Interessados</th><th>Status</th></tr></thead>
        <tbody>${EVENTS.slice(0,8).map(e=>`<tr><td>${escapeHtml(e.title)}</td><td>${e.city}/${e.state}</td><td>${fmtDateShort(e.date)}</td><td>${e.interested.toLocaleString('pt-BR')}</td><td><span class="badge-pill badge-amber">Publicado</span></td></tr>`).join('')}</tbody>
      </table>
    </div>
    <h3 style="margin-bottom:12px">Cadastrar novo evento</h3>
    <form class="info-card" id="new-event-form" data-action="create-event">
      <div class="form-group"><label>Nome do evento</label><input name="title" required placeholder="Ex: Show da Banda X"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div class="form-group"><label>Tipo</label><select name="type"><option value="show">Show</option><option value="festival">Festival</option></select></div>
        <div class="form-group"><label>Gênero</label><select name="genre">${GENRES.map(g=>`<option>${g}</option>`).join('')}</select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div class="form-group"><label>Cidade</label><input name="city" required placeholder="Ex: São Paulo"></div>
        <div class="form-group"><label>Estado (UF)</label><input name="state" required maxlength="2" placeholder="SP"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div class="form-group"><label>Data</label><input type="date" name="date" required></div>
        <div class="form-group"><label>Horário</label><input type="time" name="time" required></div>
      </div>
      <div class="form-group"><label>Local</label><input name="venue" required placeholder="Nome da casa de show / arena"></div>
      <div class="form-group"><label>Link oficial de ingressos</label><input name="ticketsUrl" type="url" placeholder="https://..."></div>
      <div class="form-group"><label>Classificação</label><input name="classification" placeholder="Ex: 16 anos" value="Livre"></div>
      <div class="form-group"><label>Descrição</label><textarea name="description" rows="3" placeholder="Fale sobre o evento..."></textarea></div>
      <div class="form-group"><label>Artistas na programação</label>
        <div class="pick-grid">${ARTISTS.map(a=>`<label class="pick-chip" style="cursor:pointer"><input type="checkbox" name="artists" value="${a.id}" style="margin-right:6px">${a.name}</label>`).join('')}</div>
      </div>
      <button class="btn btn-primary btn-block mt-8" type="submit">Cadastrar evento</button>
    </form>
  </div>`;
}

/* ---------------------------------------------------------
   14) ADMINISTRAÇÃO DA PLATAFORMA
   --------------------------------------------------------- */
const MOCK_USERS = MOCK_PEOPLE.map((n,i)=>({id:'u'+i,name:n,email:n.toLowerCase().replace(/[^a-z]/g,'')+'@email.com',since:'2025',status:'Ativo'}));

function renderAdminDashboard(){
  const tabs = [['geral','Visão geral'],['usuarios','Usuários'],['artistas','Artistas'],['eventos','Eventos'],['comunidades','Comunidades'],['publicacoes','Publicações']];
  return `
  <div class="container">
    <div class="page-banner"><h1>Administração</h1><p>Gestão geral da plataforma Rolezeiro.</p></div>
    <div class="dash-layout">
      <div class="dash-side">${tabs.map(([k,l])=>`<a href="javascript:void(0)" class="${adminTab===k?'active':''}" data-action="admin-tab" data-tab="${k}">${l}</a>`).join('')}</div>
      <div id="admin-content">${renderAdminTabContent()}</div>
    </div>
  </div>`;
}
function renderAdminTabContent(){
  if(adminTab==='geral'){
    return `<div class="dash-grid">
      <div class="stat-card"><div class="sc-label">Usuários</div><div class="sc-value">${(28400).toLocaleString('pt-BR')}</div></div>
      <div class="stat-card"><div class="sc-label">Eventos</div><div class="sc-value">${EVENTS.length}</div></div>
      <div class="stat-card"><div class="sc-label">Artistas</div><div class="sc-value">${ARTISTS.length}</div></div>
      <div class="stat-card"><div class="sc-label">Comunidades</div><div class="sc-value">${ARTISTS.length}</div></div>
      <div class="stat-card"><div class="sc-label">Publicações</div><div class="sc-value">${POSTS.length}</div></div>
    </div>`;
  }
  if(adminTab==='usuarios'){
    return `<div class="table-wrap"><table class="dash-table"><thead><tr><th>Nome</th><th>Email</th><th>Desde</th><th>Status</th><th></th></tr></thead>
    <tbody>${MOCK_USERS.map(u=>`<tr><td>${u.name}</td><td>${u.email}</td><td>${u.since}</td><td><span class="badge-pill ${u.status==='Ativo'?'badge-amber':''}">${u.status}</span></td>
    <td><button class="btn btn-sm btn-ghost" data-action="toggle-user-status" data-id="${u.id}">${u.status==='Ativo'?'Suspender':'Reativar'}</button></td></tr>`).join('')}</tbody></table></div>`;
  }
  if(adminTab==='artistas'){
    return `<div class="table-wrap"><table class="dash-table"><thead><tr><th>Artista</th><th>Gênero</th><th>Fãs</th><th></th></tr></thead>
    <tbody>${ARTISTS.map(a=>`<tr><td>${a.name}</td><td>${a.genre}</td><td>${(a.fans/1000).toFixed(0)}k</td><td><a class="btn btn-sm btn-ghost" data-route="#/artist/${a.id}">Ver</a></td></tr>`).join('')}</tbody></table></div>`;
  }
  if(adminTab==='eventos'){
    return `<div class="table-wrap"><table class="dash-table"><thead><tr><th>Evento</th><th>Cidade</th><th>Data</th><th></th></tr></thead>
    <tbody>${EVENTS.map(e=>`<tr><td>${e.title}</td><td>${e.city}/${e.state}</td><td>${fmtDateShort(e.date)}</td><td><a class="btn btn-sm btn-ghost" data-route="#/event/${e.id}">Ver</a></td></tr>`).join('')}</tbody></table></div>`;
  }
  if(adminTab==='comunidades'){
    return `<div class="table-wrap"><table class="dash-table"><thead><tr><th>Comunidade</th><th>Publicações</th><th></th></tr></thead>
    <tbody>${ARTISTS.map(a=>`<tr><td>${a.name}</td><td>${POSTS.filter(p=>p.artistId===a.id).length}</td><td><a class="btn btn-sm btn-ghost" data-route="#/community/${a.id}">Ver</a></td></tr>`).join('')}</tbody></table></div>`;
  }
  return `<div class="table-wrap"><table class="dash-table"><thead><tr><th>Autor</th><th>Categoria</th><th>Texto</th><th></th></tr></thead>
  <tbody>${POSTS.slice(0,20).map(p=>`<tr><td>${p.author}</td><td>${p.category}</td><td style="max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(p.text)}</td><td><button class="btn btn-sm btn-ghost" data-action="remove-post" data-id="${p.id}">Remover</button></td></tr>`).join('')}</tbody></table></div>`;
}

/* ---------------------------------------------------------
   15) MODAL DE AUTENTICAÇÃO / ONBOARDING
   --------------------------------------------------------- */
let authStep = 1;
let signupDraft = {name:'',username:'',genres:[],artists:[],city:'',state:''};

function openAuthModal(tab){
  authStep = 1;
  signupDraft = {name:'',username:'',genres:[],artists:[],city:'',state:''};
  $('#overlay').hidden = false;
  const modal = $('#auth-modal'); modal.hidden = false;
  renderAuthModal(tab||'login');
}
function closeAuthModal(){ $('#auth-modal').hidden = true; $('#overlay').hidden = true; }
function renderAuthModal(tab){
  const card = $('#auth-modal-card');
  if(tab==='login'){
    card.innerHTML = `
    <div class="auth-head"><div class="auth-tabs"><button class="active" data-action="auth-switch" data-tab="login">Entrar</button><button data-action="auth-switch" data-tab="signup">Cadastrar</button></div></div>
    <div class="auth-body">
      <form data-action="do-login">
        <div class="form-group"><label>Nome</label><input name="name" required placeholder="Como podemos te chamar?"></div>
        <div class="form-group"><label>Cidade de referência</label><input name="city" required placeholder="Ex: São Paulo"></div>
        <button class="btn btn-primary btn-block" type="submit">Entrar</button>
      </form>
      <button class="btn btn-secondary btn-block mt-8" data-action="demo-login">Entrar com conta demo</button>
    </div>`;
  } else {
    card.innerHTML = renderSignupStep();
  }
}
function renderSignupStep(){
  const progress = [1,2,3,4].map(i=>`<span class="${authStep>=i?'done':''}"></span>`).join('');
  let body = '';
  if(authStep===1){
    body = `
    <div class="form-group"><label>Nome completo</label><input id="su-name" value="${signupDraft.name}" placeholder="Seu nome"></div>
    <div class="form-group"><label>Nome de usuário</label><input id="su-username" value="${signupDraft.username}" placeholder="@usuario"></div>
    <button class="btn btn-primary btn-block mt-8" data-action="signup-next">Continuar</button>`;
  } else if(authStep===2){
    body = `
    <p class="text-muted" style="font-size:13px;margin-bottom:10px">Quais gêneros musicais você curte?</p>
    <div class="pick-grid">${GENRES.map(g=>`<button type="button" class="pick-chip ${signupDraft.genres.includes(g)?'active':''}" data-action="toggle-draft-genre" data-genre="${g}">${g}</button>`).join('')}</div>
    <button class="btn btn-primary btn-block mt-16" data-action="signup-next">Continuar</button>`;
  } else if(authStep===3){
    body = `
    <p class="text-muted" style="font-size:13px;margin-bottom:10px">Quais artistas você já acompanha?</p>
    <div class="pick-grid">${ARTISTS.map(a=>`<button type="button" class="pick-chip ${signupDraft.artists.includes(a.id)?'active':''}" data-action="toggle-draft-artist" data-id="${a.id}">${a.name}</button>`).join('')}</div>
    <button class="btn btn-primary btn-block mt-16" data-action="signup-next">Continuar</button>`;
  } else {
    body = `
    <div class="form-group"><label>Cidade de referência</label><input id="su-city" value="${signupDraft.city}" placeholder="Ex: Recife"></div>
    <div class="form-group"><label>Estado (UF)</label><input id="su-state" maxlength="2" value="${signupDraft.state}" placeholder="Ex: PE"></div>
    <button class="btn btn-primary btn-block mt-8" data-action="signup-finish">Criar minha conta</button>`;
  }
  return `
  <div class="auth-head"><div class="auth-tabs"><button data-action="auth-switch" data-tab="login">Entrar</button><button class="active" data-action="auth-switch" data-tab="signup">Cadastrar</button></div></div>
  <div class="auth-body"><div class="onboard-progress">${progress}</div>${body}</div>`;
}

/* ---------------------------------------------------------
   16) PRÉVIA RÁPIDA (mapa/calendário)
   --------------------------------------------------------- */
function openQuickPreview(id){
  const ev = EVENTS.find(e=>e.id===id); if(!ev) return;
  $('#overlay').hidden = false;
  $('#quick-preview-modal').hidden = false;
  $('#quick-preview-card').innerHTML = `
  <div class="card-media" style="aspect-ratio:16/9"><img src="${img(ev.cover,700,394)}" alt=""></div>
  <div style="padding:20px">
    <span class="badge-pill badge-pink">${ev.genre}</span>
    <h3 class="mt-8">${escapeHtml(ev.title)}</h3>
    <p class="text-muted mt-8" style="font-size:13px">${fmtDateShort(ev.date)} · ${ev.time} · ${ev.venue}, ${ev.city}</p>
    <p class="text-muted" style="font-size:13px">${escapeHtml(ev.lineup.map(l=>artistById(l.artistId)?.name).join(', '))}</p>
    <div class="flex gap-8 mt-16">
      <a class="btn btn-primary" data-route="#/event/${ev.id}" data-action="close-modals">Ver página completa</a>
      <button class="btn btn-ghost" data-action="close-modals">Fechar</button>
    </div>
  </div>`;
}
function closeModals(){ $('#overlay').hidden=true; $('#auth-modal').hidden=true; $('#quick-preview-modal').hidden=true; $('#notif-panel').hidden=true; $('#mobile-menu-drawer').hidden=true; }

/* ---------------------------------------------------------
   17) NOTIFICAÇÕES / TEMA / NAV
   --------------------------------------------------------- */
function renderNotifBadge(){
  const unread = STATE.notifications.filter(n=>n.unread).length;
  const badge = $('#notif-badge');
  badge.hidden = unread===0; badge.textContent = unread;
}
function renderNotifPanel(){
  const list = $('#notif-list');
  list.innerHTML = STATE.notifications.length ? STATE.notifications.map(n=>`
    <div class="notif-item ${n.unread?'unread':''}">
      <span class="ni-icon"><svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/></svg></span>
      <div><div class="ni-title">${escapeHtml(n.title)}</div><div class="ni-time">${n.time}</div></div>
    </div>`).join('') : `<div class="empty-state">Nenhuma notificação por aqui ainda.</div>`;
  STATE.notifications.forEach(n=>n.unread=false);
  persist();
}
function applyTheme(){
  document.documentElement.setAttribute('data-theme', STATE.theme);
}
function updateActiveNav(){
  const hash = location.hash || '#/';
  $$('.nav-link, .nav-mobile-link').forEach(el=>{
    const r = el.getAttribute('data-route');
    const active = r==='#/' ? (hash==='#/'||hash==='') : hash.startsWith(r.split('?')[0]);
    el.classList.toggle('active', !!active);
  });
  const chip = $('#user-chip-label');
  const avatar = $('#user-avatar');
  if(STATE.user){ chip.textContent = STATE.user.name.split(' ')[0]; avatar.textContent = initials(STATE.user.name); }
  else { chip.textContent = 'Entrar'; avatar.textContent = '?'; }
}

/* ---------------------------------------------------------
   18) PÓS-RENDER (bindings específicos de cada view)
   --------------------------------------------------------- */
function afterRender(routeKey){
  if(routeKey==='discover' || routeKey==='events'){ renderDiscoverResults(); }
  if(routeKey==='meu-role'){
    /* já renderizado no HTML inicial */
  }
}

/* ---------------------------------------------------------
   19) EVENT DELEGATION (clique / submit / mudança global)
   --------------------------------------------------------- */
document.addEventListener('click', function(e){
  const routeEl = e.target.closest('[data-route]');
  if(routeEl){ e.preventDefault(); closeModals(); navigate(routeEl.getAttribute('data-route')); return; }

  const openEvent = e.target.closest('[data-open-event]');
  if(openEvent){ navigate('#/event/'+openEvent.getAttribute('data-open-event')); return; }
  const openArtist = e.target.closest('[data-open-artist]');
  if(openArtist){ navigate('#/artist/'+openArtist.getAttribute('data-open-artist')); return; }
  const openCommunity = e.target.closest('[data-open-community]');
  if(openCommunity){ navigate('#/community/'+openCommunity.getAttribute('data-open-community')); return; }

  const t = e.target.closest('[data-action]');
  if(!t) return;
  const action = t.getAttribute('data-action');

  switch(action){
    case 'toggle-save': {
      const id = t.getAttribute('data-id');
      requireAuth('Entre para salvar eventos na sua agenda', ()=>{
        if(STATE.favorites.has(id)){ STATE.favorites.delete(id); toast('Removido dos salvos'); }
        else { STATE.favorites.add(id); toast('Evento salvo em Meu Rolê ✓'); }
        persist(); render();
      });
      break; }
    case 'toggle-interest': {
      const id = t.getAttribute('data-id');
      requireAuth('Entre para marcar interesse', ()=>{
        if(STATE.interested.has(id)){ STATE.interested.delete(id); toast('Interesse removido'); }
        else { STATE.interested.add(id); toast('Interesse confirmado ✓'); }
        persist(); render();
      });
      break; }
    case 'remove-role': {
      const id = t.getAttribute('data-id');
      STATE.favorites.delete(id); STATE.interested.delete(id); persist(); toast('Removido do Meu Rolê'); render();
      break; }
    case 'toggle-follow': {
      const id = t.getAttribute('data-id');
      requireAuth('Entre para seguir artistas', ()=>{
        const a = artistById(id);
        if(STATE.following.has(id)){ STATE.following.delete(id); toast('Deixou de seguir '+a.name); }
        else { STATE.following.add(id); toast('Agora você segue '+a.name+' ✓'); }
        persist(); render();
      });
      break; }
    case 'toggle-like': {
      const id = t.getAttribute('data-id');
      requireAuth('Entre para curtir publicações', ()=>{
        if(STATE.likedPosts.has(id)) STATE.likedPosts.delete(id); else STATE.likedPosts.add(id);
        persist(); render();
      });
      break; }
    case 'toggle-comments': {
      const box = document.getElementById('comments-'+t.getAttribute('data-id'));
      if(box) box.classList.toggle('hidden');
      break; }
    case 'share-post': case 'share-event': {
      toast('Link copiado para a área de transferência 🔗');
      break; }
    case 'clear-query': {
      discoverState.query = ''; render();
      break; }
    case 'set-genre': {
      discoverState.genre = t.getAttribute('data-genre');
      $$('#genre-chip-row .genre-chip').forEach(c=>c.classList.toggle('active', c===t));
      renderDiscoverResults();
      break; }
    case 'set-discover-view': {
      discoverState.view = t.getAttribute('data-view');
      $$('.view-toggle button').forEach(b=>{ if(b.parentElement===t.parentElement) b.classList.toggle('active', b===t); });
      renderDiscoverResults();
      break; }
    case 'set-meurole-view': {
      meuRoleState.view = t.getAttribute('data-view');
      render();
      break; }
    case 'pick-day': {
      const ctxD = t.getAttribute('data-ctx')||'discover';
      const csD = ctxD==='meurole' ? meuRoleState : discoverState;
      csD.selectedDay = Number(t.getAttribute('data-day'));
      ctxD==='meurole' ? refreshMeuRoleUI() : renderDiscoverResults();
      break; }
    case 'cal-prev': {
      const ctxP = t.getAttribute('data-ctx')||'discover';
      const csP = ctxP==='meurole' ? meuRoleState : discoverState;
      csP.calMonth--; if(csP.calMonth<0){csP.calMonth=11; csP.calYear--;}
      csP.selectedDay=null;
      ctxP==='meurole' ? refreshMeuRoleUI() : renderDiscoverResults();
      break; }
    case 'cal-next': {
      const ctxN = t.getAttribute('data-ctx')||'discover';
      const csN = ctxN==='meurole' ? meuRoleState : discoverState;
      csN.calMonth++; if(csN.calMonth>11){csN.calMonth=0; csN.calYear++;}
      csN.selectedDay=null;
      ctxN==='meurole' ? refreshMeuRoleUI() : renderDiscoverResults();
      break; }
    case 'pick-region': {
      const r = t.getAttribute('data-region');
      discoverState.selectedRegion = discoverState.selectedRegion===r ? null : r;
      renderDiscoverResults();
      break; }
    case 'quick-preview': openQuickPreview(t.getAttribute('data-id')); break;
    case 'close-modals': closeModals(); break;
    case 'artist-tab': {
      artistTab[t.getAttribute('data-artist')] = t.getAttribute('data-tab');
      render();
      break; }
    case 'community-cat': {
      communityFilter[t.getAttribute('data-artist')] = t.getAttribute('data-cat');
      render();
      break; }
    case 'admin-tab': {
      adminTab = t.getAttribute('data-tab');
      $('#admin-content').innerHTML = renderAdminTabContent();
      $$('.dash-side a').forEach(a=>a.classList.toggle('active', a===t));
      break; }
    case 'toggle-user-status': {
      const u = MOCK_USERS.find(x=>x.id===t.getAttribute('data-id'));
      if(u){ u.status = u.status==='Ativo' ? 'Suspenso' : 'Ativo'; toast('Status de '+u.name+' atualizado'); $('#admin-content').innerHTML = renderAdminTabContent(); }
      break; }
    case 'remove-post': {
      POSTS = POSTS.filter(p=>p.id!==t.getAttribute('data-id'));
      toast('Publicação removida'); $('#admin-content').innerHTML = renderAdminTabContent();
      break; }
    case 'open-auth': openAuthModal(t.getAttribute('data-tab')); break;
    case 'auth-switch': renderAuthModal(t.getAttribute('data-tab')); break;
    case 'demo-login': {
      STATE.user = {name:'Fã Demo', username:'fademo', city:'São Paulo', state:'SP', genres:['Sertanejo','Pop','Funk'], bio:'Explorando o Rolezeiro em modo demonstração.'};
      STATE.following = new Set(['a1','a6','a13']);
      persist(); closeAuthModal(); toast('Bem-vindo(a) de volta!'); render();
      break; }
    case 'signup-next': {
      if(authStep===1){
        const name = document.getElementById('su-name').value.trim();
        const username = document.getElementById('su-username').value.trim().replace(/^@/,'');
        if(!name){ toast('Digite seu nome para continuar'); break; }
        signupDraft.name = name; signupDraft.username = username || name.toLowerCase().replace(/\s+/g,'');
      }
      authStep = Math.min(4, authStep+1);
      renderAuthModal('signup');
      break; }
    case 'toggle-draft-genre': {
      const g = t.getAttribute('data-genre');
      signupDraft.genres = signupDraft.genres.includes(g) ? signupDraft.genres.filter(x=>x!==g) : [...signupDraft.genres,g];
      renderAuthModal('signup');
      break; }
    case 'toggle-draft-artist': {
      const id = t.getAttribute('data-id');
      signupDraft.artists = signupDraft.artists.includes(id) ? signupDraft.artists.filter(x=>x!==id) : [...signupDraft.artists,id];
      renderAuthModal('signup');
      break; }
    case 'signup-finish': {
      const city = document.getElementById('su-city').value.trim() || 'São Paulo';
      const state = (document.getElementById('su-state').value.trim() || 'SP').toUpperCase();
      STATE.user = {name:signupDraft.name, username:signupDraft.username, city, state, genres:signupDraft.genres, bio:'Fã de música em busca do próximo rolê.'};
      signupDraft.artists.forEach(id=>STATE.following.add(id));
      persist(); closeAuthModal(); toast('Conta criada! Bem-vindo(a) ao Rolezeiro 🎟️'); render();
      break; }
    case 'logout': {
      STATE.user = null; persist(); toast('Você saiu da sua conta'); render();
      break; }
  }
});

document.addEventListener('change', function(e){
  const t = e.target;
  if(t.id==='filter-region'){ discoverState.region = t.value; renderDiscoverResults(); }
  if(t.id==='filter-city'){ discoverState.city = t.value; renderDiscoverResults(); }
  if(t.id==='filter-price'){ discoverState.price = t.value; renderDiscoverResults(); }
});

document.addEventListener('submit', function(e){
  const form = e.target;
  const action = form.getAttribute('data-action');
  if(!action) return;
  e.preventDefault();
  if(action==='do-login'){
    const name = form.name.value.trim(); const city = form.city.value.trim();
    STATE.user = {name, username:name.toLowerCase().replace(/\s+/g,''), city, state:'SP', genres:[], bio:''};
    persist(); closeAuthModal(); toast('Bem-vindo(a), '+name.split(' ')[0]+'!'); render();
  }
  if(action==='new-post'){
    requireAuth('Entre para publicar na comunidade', ()=>{
      const artistId = form.getAttribute('data-artist');
      const text = form.querySelector('textarea').value.trim();
      if(!text) return;
      POSTS.unshift({id:'p'+Date.now(), artistId, category:'Conversas', author:STATE.user.name, authorAvatar:'fan-generic', time:'agora', text, likes:0, liked:false, comments:[]});
      form.querySelector('textarea').value='';
      toast('Publicado na comunidade ✓'); render();
    });
  }
  if(action==='add-comment'){
    const id = form.getAttribute('data-id');
    const input = form.querySelector('input');
    const text = input.value.trim(); if(!text) return;
    const p = POSTS.find(p=>p.id===id);
    p.comments.push({author: STATE.user? STATE.user.name : 'Você', text});
    input.value=''; render();
  }
  if(action==='create-event'){
    const fd = new FormData(form);
    const artists = fd.getAll('artists');
    const id = 'e'+Date.now();
    const newEv = {
      id, title: fd.get('title'), type: fd.get('type'), genre: fd.get('genre'),
      city: fd.get('city'), state: (fd.get('state')||'SP').toUpperCase(), date: fd.get('date') || '2026-12-01',
      time: fd.get('time') || '20:00', venue: fd.get('venue'), price:{min:80,max:220},
      cover:'novo-evento-'+id, classification: fd.get('classification')||'Livre', interested:0, featured:false,
      ticketsUrl: fd.get('ticketsUrl') || '#',
      description: fd.get('description') || 'Evento cadastrado pela produtora.',
      lineup: artists.length ? artists.map(aid=>({artistId:aid,time:fd.get('time')||'20:00'})) : []
    };
    EVENTS.unshift(newEv);
    toast('Evento cadastrado com sucesso ✓');
    render();
  }
});

/* botões de ícone / painéis / tema / busca global */
$('#btn-theme').addEventListener('click', ()=>{
  STATE.theme = STATE.theme==='dark' ? 'light' : 'dark';
  applyTheme(); persist();
});
$('#btn-notifs').addEventListener('click', ()=>{
  $('#overlay').hidden=false; $('#notif-panel').hidden=false; renderNotifPanel();
});
$('#notif-close').addEventListener('click', closeModals);
$('#btn-user').addEventListener('click', ()=>{
  if(STATE.user) navigate('#/perfil'); else openAuthModal('login');
});
$('#btn-mobile-menu').addEventListener('click', ()=>{
  $('#overlay').hidden=false; $('#mobile-menu-drawer').hidden=false;
});
$('#overlay').addEventListener('click', closeModals);
$('#global-search-form').addEventListener('submit', function(e){
  e.preventDefault();
  const q = $('#global-search-input').value.trim();
  discoverState.query = q;
  navigate('#/discover');
  if(location.hash==='#/discover') { discoverState.query=q; render(); }
});

window.addEventListener('hashchange', render);
applyTheme();
renderNotifBadge();
render();

})();

