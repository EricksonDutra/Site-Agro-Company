# AGENTS.md — Guia de Contexto e Padrões do Projeto (Agro Company)

Este documento fornece o contexto arquitetural, estrutura de arquivos e regras de negócio do site institucional da **Agro Company — Assessoria Financeira para o Agronegócio**.

---

## 1. Visão Geral do Projeto

- **Projeto:** Site Institucional V2 da **Agro Company — Assessoria Financeira para o Agronegócio**.
- **Arquitetura:** Site estático multi-página (15 páginas HTML) em HTML5, CSS3 e JavaScript puro, empacotado com **Vite Multi-Page** para desenvolvimento local (`npm run dev`) e geração do diretório `dist/` (`npm run build`).
- **Formulários:** Os formulários de contato (`contato.html`) e parceria (`seja-parceiro.html`) preparam uma mensagem estruturada e abrem conversa no WhatsApp (`https://wa.me/5567998214438`). Não há backend ou banco de dados.

---

## 2. Comandos Essenciais

```bash
# Servidor de desenvolvimento local
npm run dev

# Build de produção multi-página (gera dist/)
npm run build

# Pré-visualização do build
npm run preview
```

> **Regra de Validação:** Sempre execute `npm run build` após alterações para garantir que todas as páginas HTML e assets sejam gerados corretamente em `dist/`.

---

## 3. Estrutura de Diretórios

```text
agrocompany/
├── index.html                        # Página inicial (com slideshow automático de 4 imagens)
├── quem-somos.html                   # Quem Somos
├── mercado-financeiro.html           # Mercado Financeiro
├── solucoes.html                     # Visão geral das soluções
├── assessoria-financeira.html        # Serviço 01
├── consultoria-financeira.html       # Serviço 02
├── reestruturacao-financeira.html    # Serviço 03
├── family-office.html                # Serviço 04 (Outsourced Family Office)
├── credito-inteligente.html          # Serviço 05
├── proteja-seu-patrimonio.html       # Serviço 06
├── credito-pessoa-juridica.html      # Serviço 07
├── como-podemos-ajudar.html          # Como Podemos Ajudar
├── seja-parceiro.html                # Seja um Parceiro
├── contato.html                      # Contato
├── privacidade.html                  # Política de Privacidade
├── public/
│   ├── assets/
│   │   ├── site.css                  # Estilos principais e responsividade
│   │   ├── conteudo-v2.css           # Ajustes de layout para os textos da V2
│   │   ├── home-slideshow.css        # Estilos do slideshow da Home
│   │   ├── site.js                   # Menu, dropdown e formulários WhatsApp
│   │   ├── home-slideshow.js         # Controle do slideshow da Home
│   │   ├── fonts/                    # Fontes locais DM Sans e Libre Baskerville + licenças
│   │   └── images/                   # Fotografias, imagens ilustrativas e logomarca
│   └── favicon/                      # Ícones de manifesto e dispositivos
├── vite.config.ts                    # Configuração Vite Multi-Page (coleta todos os *.html da raiz)
├── robots.txt                        # Diretivas de indexação
├── sitemap.xml                       # Mapa do site com todas as 15 páginas
└── .htaccess                         # Redirecionamento HTTPS, compressão e cache (Apache)
```

---

## 4. Dados Institucionais Vigentes (Validados pelo Cliente)

- **Endereço:** `Rua Mar Cáspio, 208 - Campo Grande – MS - Brasil`
- **Telefones:** `(67) 99821-4438` (WhatsApp) / `(67) 98115-4023`
- **WhatsApp Principal:** `5567998214438`
- **E-mail:** `falecomagrocompany@gmail.com`
- **Instagram:** `@agrocompany.assessoria` (`https://www.instagram.com/agrocompany.assessoria/`)
- **LinkedIn:** `linkedin.com/in/augusto-alvarenga-2064b2b3` (`https://www.linkedin.com/in/augusto-alvarenga-2064b2b3/`)

---

## 5. Diretrizes para Agentes de IA

1. **Escopo Estrito:** Preserve integralmente os textos, imagens, estilos e comportamentos aprovados pelo cliente. Não altere copy ou layout sem solicitação explícita.
2. **Nomes de Arquivo (Case-Sensitive):** Mantenha todos os arquivos `.html` e caminhos em `public/assets/` em minúsculas e correspondentes aos links internos (ex.: `privacidade.html`).
3. **Assets Estáticos:** Os arquivos em `public/assets/` são copiados diretamente para `dist/assets/` pelo Vite; mantenha os caminhos relativos `assets/...` nos arquivos HTML.
4. **Verificação Final:** Antes de concluir qualquer tarefa, execute `npm run build` e verifique a integridade das páginas geradas em `dist/`.
