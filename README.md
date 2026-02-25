# 🌾 Site Agro Company

Site institucional moderno para empresa do agronegócio, desenvolvido com React, TypeScript e Vite. O projeto oferece uma experiência de usuário fluida com animações, formulários validados e otimização para SEO.

## 🚀 Tecnologias

### Core
- **React 19.2** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9** - Superset tipado de JavaScript
- **Vite 7.2** - Build tool e bundler de alta performance
- **Sass 1.97** - Pré-processador CSS

### Bibliotecas Principais
- **Framer Motion 12.29** - Animações e transições fluidas
- **React Hook Form 7.71** - Gerenciamento de formulários performático
- **Zod 4.3** - Validação de schemas TypeScript-first
- **Lucide React 0.563** - Ícones SVG modernos
- **React Icons 5.5** - Biblioteca de ícones

### Qualidade de Código
- **ESLint 9.39** - Linter para JavaScript/TypeScript
- **Prettier 3.8** - Formatador de código
- **TypeScript ESLint 8.54** - Regras ESLint para TypeScript

## 📁 Estrutura do Projeto

```
Site-Agro-Company/
├── public/              # Arquivos estáticos públicos
├── src/
│   ├── assets/         # Imagens, fontes e outros recursos
│   ├── components/     # Componentes React reutilizáveis
│   ├── constants/      # Constantes tipadas do projeto
│   ├── hooks/          # Custom hooks (useScrollTo, useIntersectionObserver)
│   ├── lib/            # Utilitários e funções auxiliares
│   ├── pages/          # Páginas da aplicação
│   ├── styles/         # Estilos globais e módulos SCSS
│   ├── types/          # Definições de tipos TypeScript
│   ├── App.tsx         # Componente principal com ErrorBoundary
│   └── main.tsx        # Ponto de entrada da aplicação
├── .env.production     # Variáveis de ambiente de produção
├── .htaccess           # Configurações Apache para SPA
├── robots.txt          # Diretivas para crawlers
├── sitemap.xml         # Mapa do site para SEO
├── index.html          # Template HTML principal
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração TypeScript
└── vite.config.ts      # Configuração Vite
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/EricksonDutra/Site-Agro-Company.git

# Entre no diretório
cd Site-Agro-Company

# Instale as dependências
npm install
```

### Scripts Disponíveis

```bash
# Inicia servidor de desenvolvimento
npm run dev

# Compila para produção
npm run build

# Pré-visualiza build de produção
npm run preview

# Executa linter
npm run lint

# Formata código
npm run format
```

## ✨ Funcionalidades

- ✅ **Design Responsivo** - Adaptável a todos os dispositivos
- ✅ **Animações Fluidas** - Transições suaves com Framer Motion
- ✅ **Formulários Validados** - Validação robusta com React Hook Form + Zod
- ✅ **Botão WhatsApp Flutuante** - Contato direto facilitado
- ✅ **Error Boundary** - Tratamento de erros em toda aplicação
- ✅ **Custom Hooks** - useScrollTo e useIntersectionObserver
- ✅ **SEO Otimizado** - Meta tags, sitemap e robots.txt
- ✅ **TypeScript** - Tipagem estática em todo código
- ✅ **Code Quality** - ESLint e Prettier configurados

## 🎯 Componentes Principais

### Custom Hooks
- `useScrollTo` - Navegação suave entre seções
- `useIntersectionObserver` - Detecção de visibilidade de elementos

### Páginas
- **Home** - Página principal com todas as seções integradas

### Componentes UI
- Componentes base reutilizáveis
- WhatsApp floating button
- ErrorBoundary para captura de erros

## 🔧 Configuração para Deploy

O projeto está pronto para deploy com:
- Arquivo `.htaccess` configurado para SPAs
- Variáveis de ambiente em `.env.production`
- SEO files: `robots.txt` e `sitemap.xml`
- Build otimizado com Vite

### Deploy Sugerido
- **Hostinger VPS** com Nginx
- **Vercel** - Deploy automático
- **Netlify** - Deploy contínuo

## 📋 Histórico de Desenvolvimento

O projeto foi desenvolvido de forma incremental através de issues:

1. ✅ Setup e Configuração Base
2. ✅ Componentes e Seções Visuais
3. ✅ Componentes UI Base
4. ✅ WhatsApp Button Flutuante
5. ✅ ErrorBoundary
6. ✅ Custom Hooks
7. ✅ Constantes Tipadas
8. ✅ Página Home Completa
9. ✅ App com ErrorBoundary
10. ✅ Arquivos de SEO para Deploy

## 🐛 Problemas Conhecidos

Ajustes de estilo ainda podem ser necessários conforme feedback do cliente.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Erickson Dutra**
- GitHub: [@EricksonDutra](https://github.com/EricksonDutra)
- Email: ericksond10@gmail.com

---

⭐ Se este projeto foi útil, considere dar uma estrela no repositório!
