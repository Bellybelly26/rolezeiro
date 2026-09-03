# rolezeiro — Descubra. Conecte-se. Viva.

Protótipo de plataforma brasileira de música, shows, festivais e eventos, com
comunidades de fãs. Feito em React + Vite + Tailwind CSS.

## Como rodar

```bash
npm install
npm run dev
```

Depois abra o endereço que aparecer no terminal (geralmente
`http://localhost:5173`).

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

- `src/App.jsx` — toda a aplicação (telas, dados fictícios, componentes)
- `src/main.jsx` — ponto de entrada do React
- `src/index.css` — Tailwind + fontes (Unbounded / Manrope)

Todos os dados (artistas, eventos, festivais, comunidades, notificações) são
fictícios e ficam em memória (state do React) — não há backend nem
persistência entre sessões.
