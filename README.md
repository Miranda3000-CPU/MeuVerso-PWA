<div align="center">

<img src="https://raw.githubusercontent.com/Miranda3000-CPU/MeuVerso-PWA/main/artifacts/meuverso/public/icon.svg" alt="Ícone do MeuVerso" width="96" />

# MeuVerso

**Um verso da Bíblia para acompanhar o seu dia.**

Leitura e reflexão bíblica em uma aplicação web progressiva (PWA), com interface acolhedora e suporte para uso offline.

[**Abrir aplicação**](https://miranda3000-cpu.github.io/MeuVerso-PWA/) · [Código-fonte](https://github.com/Miranda3000-CPU/MeuVerso-PWA) · [Relatar problema](https://github.com/Miranda3000-CPU/MeuVerso-PWA/issues)

<img src="https://raw.githubusercontent.com/Miranda3000-CPU/MeuVerso-PWA/main/docs/images/meuverso-capa.svg" alt="Ilustração do MeuVerso em um celular, com um versículo bíblico" width="100%" />

</div>

## ✨ Sobre o projeto

O **MeuVerso** foi desenvolvido para tornar a leitura de versículos bíblicos simples e acessível no dia a dia. O projeto utiliza React e Vite, com uma interface responsiva pensada para celulares e computadores.

## Recursos

<img src="https://raw.githubusercontent.com/Miranda3000-CPU/MeuVerso-PWA/main/docs/images/meuverso-recursos.svg" alt="Ilustração dos recursos: verso do dia, explorar versículos e favoritos" width="100%" />

- **Verso do dia:** uma mensagem bíblica para leitura e reflexão.
- **Explorar:** pesquisar e navegar pelos versículos disponíveis no aplicativo.
- **Favoritos:** guardar versículos para consultar novamente.
- **Instalável:** pode ser adicionado à tela inicial em navegadores compatíveis.
- **Experiência offline:** o service worker armazena os recursos da aplicação para permitir acesso sem conexão após o carregamento inicial.
- **Interface responsiva:** adaptada a telas móveis e desktop.
- **Preferências locais:** recursos como favoritos são armazenados no navegador do dispositivo.

> **Nota sobre o conteúdo:** a lista de versículos disponível nesta versão está incorporada ao código do aplicativo. Isso não equivale a uma Bíblia completa nem substitui uma edição bíblica publicada.

## Prévia visual

As imagens acima são **ilustrações conceituais** para apresentar a identidade e os recursos do projeto; não são capturas de tela da aplicação em execução.

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Progressive Web App (PWA)](https://web.dev/explore/progressive-web-apps)
- Service Worker e Cache API para recursos offline
- [GitHub Actions](https://github.com/features/actions) e [GitHub Pages](https://pages.github.com/) para publicação automática

## Executar localmente

O repositório usa **pnpm workspaces**. Com Node.js e pnpm instalados:

```bash
git clone https://github.com/Miranda3000-CPU/MeuVerso-PWA.git
cd MeuVerso-PWA
pnpm install
PORT=4173 BASE_PATH=/ pnpm --filter @workspace/meuverso dev
```

Abra o endereço local indicado pelo Vite no terminal.

Para gerar a versão de produção:

```bash
PORT=4173 BASE_PATH=/MeuVerso-PWA/ pnpm --filter @workspace/meuverso build
```

Os arquivos gerados ficam em `artifacts/meuverso/dist/public`.

## Publicação automática

O deploy é definido em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Faça push das alterações para a branch `main`.
2. O GitHub Actions instala as dependências e compila o aplicativo.
3. O resultado é publicado no GitHub Pages.

Para habilitar a publicação, acesse **Settings → Pages** no repositório e selecione **GitHub Actions** como fonte de build e deploy. O resultado pode ser acompanhado na aba [Actions](https://github.com/Miranda3000-CPU/MeuVerso-PWA/actions).

## Privacidade e armazenamento

Os favoritos e outras preferências do aplicativo são armazenados localmente no navegador. Limpar os dados do site ou usar outro navegador/dispositivo pode apagar ou não incluir esses dados. Não há sincronização entre dispositivos por esse armazenamento local.

## Estrutura principal

```text
artifacts/meuverso/
├── public/                 # Ícones, manifesto e página offline
├── scripts/pwa-plugin.ts   # Geração do service worker
├── src/
│   ├── App.tsx             # Interface e funcionalidades
│   ├── pwa.ts              # Registro e estado do PWA
│   └── main.tsx            # Entrada React
├── index.html
├── package.json
└── vite.config.ts
.github/workflows/
└── deploy.yml              # Build e deploy automáticos
docs/images/                # Imagens usadas neste README
```

## Contribuições

Sugestões e correções são bem-vindas. Abra uma [issue](https://github.com/Miranda3000-CPU/MeuVerso-PWA/issues) descrevendo o problema ou a melhoria proposta.

---

<div align="center">
Feito para levar uma palavra de fé ao cotidiano.
</div>
