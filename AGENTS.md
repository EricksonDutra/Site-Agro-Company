# AGENTS.md — Guia de Contexto e Padrões do Projeto (Agro Company)

Este documento fornece todo o contexto arquitetural, padrões de código, design system e regras de negócio para que qualquer agente ou modelo de IA possa trabalhar de forma **independente, consistente e segura** neste repositório.

---

## 1. Visão Geral do Projeto

- **Projeto:** Landing Page / Site Institucional da **Agro Company — Assessoria Financeira para o Agronegócio**.
- **Objetivo:** Apresentar a empresa, sua identidade organizacional, credenciais técnicas e canais de contato direto (incluindo envio de formulário integrado ao WhatsApp).
- **Tipo de Aplicação:** Single Page Application (SPA) estática e responsiva, otimizada para SEO.

---

## 2. Stack Tecnológica e Ferramentas

- **Core:** React `19.2`, TypeScript `~5.9.3`, Vite `7.2`
- **Estilização:** Sass (`sass` moderno com `@use`) + CSS Modules (`*.module.scss`)
- **Ícones:** `react-icons/fi` (Feather Icons) e `lucide-react`
- **Utilitários & Formulários:** `clsx`, `react-hook-form`, `zod`, `framer-motion`
- **Qualidade de Código:** ESLint 9 + Prettier + TypeScript Strict Mode (`noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`)

### Comandos Essenciais

```bash
# Servidor de desenvolvimento
npm run dev

# Verificação de tipos (tsc --noEmit) + Build de produção (vite build)
npm run build

# Pré-visualização do build
npm run preview

# Linter (ESLint)
npm run lint

# Formatação (Prettier)
npm run format
```

> **Regra de Validação:** Sempre execute `npm run build` após qualquer alteração para garantir que o TypeScript (`tsc --noEmit`) e o bundler do Vite passem sem erros (especialmente imports ou variáveis não utilizadas, que falham o build).

---

## 3. Estrutura de Diretórios e Path Aliases

```text
agrocompany/
├── public/
│   ├── favicon/               # Ícones de manifesto e dispositivos
│   └── images/                # Imagens estáticas (.webp, .png, .svg)
├── src/
│   ├── components/
│   │   ├── layout/            # Header e Footer
│   │   ├── sections/          # Seções da Home (Hero, About, Identity, Maintenance, Pillars, Services, Contact)
│   │   ├── shared/            # Componentes compartilhados (WhatsAppButton)
│   │   ├── ui/                # Componentes base de interface (Input, Textarea)
│   │   └── ErrorBoundary.tsx  # Tratamento global de erros de renderização
│   ├── constants/
│   │   └── index.ts           # Dados institucionais, links de navegação, slides e SEO
│   ├── hooks/                 # Hooks customizados (useScrollTo, useIntersectionObserver)
│   ├── lib/                   # Utilitários (utils.ts)
│   ├── pages/
│   │   ├── Home.tsx           # Composição principal das seções da landing page
│   │   └── NotFound.tsx       # Página 404
│   ├── styles/
│   │   ├── abstracts/         # _variables.scss e _mixins.scss
│   │   ├── base/              # _reset.scss e _typography.scss
│   │   ├── components/        # _buttons.scss
│   │   └── global.scss        # Ponto de entrada global de estilos
│   ├── types/                 # Tipos globais e declarações SCSS (scss.d.ts)
│   ├── App.tsx                # Componente raiz
│   └── main.tsx               # Entrypoint React
├── index.html                 # HTML principal com metadados SEO e Schema.org (JSON-LD)
├── vite.config.ts             # Configuração Vite e aliases
└── tsconfig.app.json          # Configuração TypeScript estrita
```

### Path Aliases Configurados (`vite.config.ts` & `tsconfig.app.json`)

Use sempre os aliases ao importar módulos internos:
- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@styles/*` → `./src/styles/*`
- `@hooks/*` → `./src/hooks/*`
- `@lib/*` → `./src/lib/*`
- `@pages/*` → `./src/pages/*`
- `@constants/*` → `./src/constants/*`
- `@types/*` → `./src/types/*`

---

## 4. Design System ("Terra Dourada")

As variáveis e mixins estão centralizados em `src/styles/abstracts/_variables.scss` e `src/styles/abstracts/_mixins.scss`.

### Paleta de Cores
- **Verde Floresta (Primárias):**
  - `$green-dark`: `#142e21` (Fundo principal escuro, cabeçalhos, botões primários, rodapé)
  - `$green-dark-2`: `#0f3b2a` (Hover de botões primários)
  - `$green-accent`: `#5fc26a`
  - `$green-olive`: `#5b6f5e`
- **Dourado Trigo (Destaque / Acento):**
  - `$gold`: `#cfc291` (Destaques, bordas decorativas, divisores, títulos em destaque)
  - `$gold-light`: `#eadfbb`
  - `$gold-dark`: `#b9a867`
- **Neutras:**
  - `$white`: `#ffffff`
  - `$ivory`: `#f8f6f0` (Fundo creme suave usado para alternar seções e cards)
  - `$gray-bg`: `#f5f6f5`
  - `$gray-light`: `#e5e7eb`
  - `$gray-medium`: `#9ca3af`
  - `$gray-dark`: `#374151`

### Tipografia
- **Títulos / Display (`$font-display`):** `'Playfair Display', Georgia, serif`
- **Corpo (`$font-body`):** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Convenções de SCSS Modules
1. **Nunca use `@import`** (depreciado no Dart Sass moderno). Utilize sempre:
   ```scss
   @use '@styles/abstracts/_variables' as *;
   @use '@styles/abstracts/_mixins' as *;
   ```
2. **Responsividade Mobile-First:** Escreva os estilos base para mobile e expanda com `@media (min-width: $breakpoint-md)` (`768px`) e `@media (min-width: $breakpoint-lg)` (`1024px`).
3. **Espaçamento de Seções:** Utilize `@include section-padding;` nas classes raiz de cada seção e a classe global `.container` para limitar a largura (`1200px`).

---

## 5. Estado Atual das Seções e Regras de Negócio

### Fluxo da Página Principal (`src/pages/Home.tsx`)
Atualmente, a página `Home` renderiza as seções na seguinte ordem:
1. `<Header />` — Menu fixo superior com navegação por âncoras (`#home`, `#about`, `#Identity`, `#pillars`, `#contact`).
2. `<Hero />` (`#home`) — Carrossel de banners com chamada principal.
3. `<About />` (`#about`) — Seção "Quem Somos" (fundo `$white`) com estatísticas (`+7 Anos de experiência`, `100% Foco no produtor`) e card da logo à direita.
4. `<Identity />` (`#Identity`) — Seção "Nossa Identidade" (fundo `$green-dark`) com os 4 cards: *Serviços*, *Missão*, *Visão* e *Valores*.
5. `<Maintenance />` (`#pillars`) — Seção temporária **"SITE EM MANUTENÇÃO"** (fundo `$ivory`) com título em caixa alta dourado (`$gold`) à esquerda e card da logo à direita.
   - *Nota importante:* As seções `<Pillars />` e `<Services />` existem em `src/components/sections/`, mas estão **intencionalmente desativadas/comentadas** em `Home.tsx` a pedido do cliente, sendo substituídas temporariamente por `<Maintenance />`. Não reative `<Pillars />` ou `<Services />` sem solicitação explícita.
6. `<Contact />` (`#contact`) — Informações de contato à esquerda e formulário integrado ao WhatsApp à direita.
7. `<Footer />` — Rodapé institucional com Responsável Técnico, Links Rápidos e Contato.
8. `<WhatsAppButton />` — Botão flutuante de contato rápido.

### Dados Institucionais Vigentes (Validados pelo Cliente)
Qualquer alteração ou referência a dados de contato e credenciais deve respeitar exatamente os valores abaixo (presentes em `Contact.tsx` e `Footer.tsx`):

- **Endereço:** `Rua Mar Cáspio, 208 - Campo Grande – MS - Brasil`
- **Telefones:** `(67) 99821-4438` / `(67) 98115-4023`
- **WhatsApp Principal (envio de formulário e botão flutuante):** `5567998214438`
- **E-mail:** `falecomagrocompany@gmail.com`
- **Instagram:** `@agrocompany.assessoria` (`https://www.instagram.com/agrocompany.assessoria/`)
- **LinkedIn:** `linkedin.com/in/augusto-alvarenga-2064b2b3` (`https://www.linkedin.com/in/augusto-alvarenga-2064b2b3/`)
- **Credenciais do Responsável Técnico (`Footer.tsx`):**
  - `Engenheiro Agrônomo CREA/MS 62.932`
  - `Pós-graduação em Direito do Agronegócio`
  - `Pós-graduação em Agronegócio, Gestão Empresarial e Inteligência Competitiva`
  - `Técnico em Administração e Gestão Financeira voltada ao Agronegócio`
  - `Técnico em Contabilidade no Agronegócio`
  - `FEBRABAN FBB-100 - Correspondente Bancário + LGPD`
  - `FEBRABAN FBB 420 - Agronegócio Crédito Rural`
  - `ANBIMA C-Pro R - Profissional de Investimentos com selo de excelência ANBIMA, focado no relacionamento e gestão de investimentos para Alta Renda, Private e Corporate, investidores institucionais em agências bancárias ou em plataformas de atendimento`
  - `+7 anos de experiência em bancos e instituições financeiras`

---

## 6. Diretrizes para Agentes de IA

1. **Escopo Estrito:** Faça apenas as alterações solicitadas pelo usuário. Não altere textos aprovados pelo cliente, cores da marca ou seções desativadas sem instrução direta.
2. **TypeScript Estrito:** Como `noUnusedLocals` e `noUnusedParameters` estão ativos em `tsconfig.app.json`, ao comentar um componente JSX em uma página, lembre-se de comentar ou remover também o `import` correspondente.
3. **Imagens Estáticas:** Arquivos em `public/images/` devem ser referenciados por caminhos absolutos a partir da raiz pública (ex.: `'/images/logosvg.svg'`).
4. **Acessibilidade e Semântica:** Mantenha atributos `aria-label`, `aria-labelledby`, `rel="noopener noreferrer"` em links externos (`target="_blank"`) e evite IDs de seção duplicados no DOM.
5. **Verificação Final:** Antes de concluir qualquer tarefa, execute `npm run build` para assegurar que não há erros de compilação ou tipagem.

