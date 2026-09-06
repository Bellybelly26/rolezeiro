# rolezeiro — Descubra. Conecte-se. Viva.

Protótipo de plataforma brasileira de música, shows, festivais e eventos com comunidades de fãs. Feito 100% em HTML, CSS e JavaScript puro — sem Vite, sem npm, sem build. É só abrir e usar, igual ao site do TCC.

## Arquivos

- `index.html` — a página
- `css/style.css` — toda a aparência (cores, layout, cartões, etc.)
- `js/app.js` — os dados fictícios (artistas, eventos, comunidades) e toda a lógica do site (navegação, favoritos, publicações, formulários)

## Como testar no seu computador

Só abrir o `index.html` no navegador (duplo clique, ou clique direito → abrir com Chrome/Firefox). Não precisa instalar nada.

No VS Code, se quiser um recarregamento automático ao editar, instale a extensão Live Server e clique em "Go Live" no canto inferior direito.

## Como publicar no GitHub Pages (sem build, sem Actions)

1. Suba os arquivos para o seu repositório no GitHub, mantendo esta estrutura de pastas:

   ```
   index.html
   css/
     └── style.css
   js/
     └── app.js
   ```

   Pode ser pela aba Source Control do VS Code (ícone de ramificação → `+` para adicionar tudo → escreva uma mensagem → Commit → Sync) ou arrastando os arquivos e pastas direto na página do repositório no site do GitHub ("Add file" → "Upload files").

2. No repositório, vá em **Settings → Pages**.
3. Em "Build and deployment", escolha **Source: Deploy from a branch**.
4. Em "Branch", selecione `main` e a pasta `/ (root)`.
5. Clique em **Save** e espere 1–2 minutos. O link fica em `https://SEUUSUARIO.github.io/NOMEDOREPOSITORIO/`.

Sempre que você subir uma alteração nova (novo commit), o GitHub Pages atualiza sozinho — só pode levar um minutinho para aparecer.

## Sobre as fotos

Os cards de eventos e artistas usam fotos de um serviço de placeholder (picsum.photos), só para preencher visualmente o protótipo — não são fotos reais dos eventos/artistas fictícios. Se a rede do usuário bloquear esse serviço por algum motivo, o site não quebra: aparece um gradiente rosa/violeta no lugar da foto em vez de ficar com uma área preta.

## Dados fictícios

Todos os artistas, eventos, comunidades e publicações são inventados para fins de portfólio. Para trocar por dados reais no futuro, é só editar os arrays `ARTISTS`, `EVENTS` e `POSTS` no topo do `js/app.js`.
