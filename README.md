# rolezeiro — Descubra. Conecte-se. Viva.

Protótipo de plataforma brasileira de música, shows, festivais e eventos, com
comunidades de fãs. Feito em React + Vite + Tailwind CSS.

## ⚠️ Importante: como rodar (não abra o index.html direto)

Este projeto usa Vite. Isso significa que os arquivos em `src/` (JSX, imports
como `react`) **não rodam sozinhos num navegador** — eles precisam passar por
um processo de build/dev server primeiro. Se você abrir o `index.html`
direto (duplo clique, extensão "Live Server" etc.) ou publicar a pasta
crua no GitHub Pages, a tela vai ficar em branco.

## Rodando localmente no VS Code

No terminal integrado do VS Code, dentro da pasta do projeto:

```bash
npm install
npm run dev
```

Aí abra o link que aparecer (ex.: `http://localhost:5173`).

## Publicando no GitHub Pages

Este projeto já vem com um workflow pronto em
`.github/workflows/deploy.yml`, que faz o build e publica automaticamente
sempre que você subir código para o branch `main` (ou `master`).

Passo a passo:

1. Suba todos os arquivos deste projeto (incluindo a pasta `.github`) para
   o seu repositório no GitHub (pelo VS Code: aba **Source Control** →
   `+` para adicionar tudo → escreva uma mensagem → **Commit** → **Sync/Push**).
2. No GitHub, vá em **Settings → Pages** (na barra lateral do repositório).
3. Em **Build and deployment → Source**, troque para **GitHub Actions**
   (se estiver como "Deploy from a branch", é isso que causa a tela branca:
   ele publica os arquivos crus em vez de rodar o build).
4. Vá na aba **Actions** do repositório e confira se o workflow
   "Deploy para o GitHub Pages" rodou com sucesso (bolinha verde). Se
   falhar, clique nele para ver o log do erro.
5. Espere terminar e acesse o link em **Settings → Pages** (algo como
   `https://seu-usuario.github.io/rolezeiro/`).

## Build de produção manual (opcional)

```bash
npm run build
npm run preview
```

## Estrutura

- `src/App.jsx` — toda a aplicação (telas, dados fictícios, componentes)
- `src/main.jsx` — ponto de entrada do React (com Error Boundary: se algo
  quebrar, aparece a mensagem de erro na tela em vez de ficar tudo branco)
- `src/index.css` — Tailwind + fontes (Unbounded / Manrope)
- `.github/workflows/deploy.yml` — build e publicação automática no GitHub Pages

Todos os dados (artistas, eventos, festivais, comunidades, notificações) são
fictícios e ficam em memória (state do React) — não há backend nem
persistência entre sessões.
