# rolezeiro — Descubra. Conecte-se. Viva.

Protótipo de plataforma brasileira de música, shows, festivais e eventos,
com comunidades de fãs. Feito **100% em HTML, CSS e JavaScript puro** —
sem React, sem Vite, sem npm, sem build. É só abrir e usar, igual ao site
do TCC.

## Arquivos

- `index.html` — a página
- `style.css` — toda a aparência (cores, layout, cartões, etc.)
- `app.js` — os dados fictícios (artistas, eventos, comunidades) e toda a
  lógica do site (navegação, favoritos, publicações, formulários)

## Como testar no seu computador

Só abrir o `index.html` no navegador (duplo clique, ou clique direito →
"Abrir com" → Chrome/Firefox). Não precisa instalar nada.

No VS Code, se quiser um recarregamento automático ao editar, instale a
extensão **Live Server** e clique em "Go Live" no canto inferior direito.

## Como publicar no GitHub Pages (sem build, sem Actions)

1. Suba os 3 arquivos (`index.html`, `style.css`, `app.js`) para o seu
   repositório no GitHub — pode ser pela aba **Source Control** do VS
   Code (ícone de ramificação → `+` para adicionar tudo → escreva uma
   mensagem → **Commit** → **Sync Changes**), ou arrastando os arquivos
   direto na página do repositório no site do GitHub.
2. No GitHub, vá em **Settings → Pages**.
3. Em **Build and deployment → Source**, deixe em **Deploy from a
   branch**.
4. Em **Branch**, escolha `main` (ou `master`) e a pasta `/ (root)`, e
   clique em **Save**.
5. Espere um minuto e acesse o link que aparece ali mesmo (algo como
   `https://seu-usuario.github.io/rolezeiro/`).

Pronto — sem workflow, sem build, sem Actions.

## Sobre os dados

Todos os artistas, eventos, festivais, comunidades e notificações são
fictícios e ficam em memória (no JavaScript) — ao recarregar a página,
tudo volta ao estado inicial. Não há backend nem banco de dados.
