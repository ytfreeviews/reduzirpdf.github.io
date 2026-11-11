# ReduzirPDF — Comprimir PDF para o Tamanho que Você Precisa

> **Grátis, rápido e sem enviar seus arquivos para um servidor.**  
> Aplicação web de alto desempenho desenvolvida para o público brasileiro (pt-BR), com processamento 100% local no navegador do usuário.

---

## 1. Visão Geral do Projeto

O **ReduzirPDF** permite que qualquer usuário reduza o tamanho de um arquivo PDF para um limite máximo estrito (100 KB, 200 KB, 500 KB, 1 MB, 2 MB ou valor personalizado em KB/MB) sem precisar criar conta, sem pagar e **sem realizar upload de documentos para servidores externos**.

Todo o processamento ocorre no próprio dispositivo utilizando a memória local, PDF.js, Canvas API e pdf-lib.

---

## 2. Estrutura de Pastas do Projeto

```text
reduzirpdf/
├── index.html                   # Ponto de entrada HTML com SEO, OpenGraph e Schema JSON-LD
├── metadata.json                # Metadados da aplicação AI Studio
├── package.json                 # Dependências e scripts de execução
├── tsconfig.json                # Configuração do TypeScript
├── vite.config.ts               # Configuração do Vite com base relativa para GitHub Pages
├── public/
│   ├── 404.html                 # Roteamento SPA para GitHub Pages (redirecionamento de rotas limpas)
│   ├── robots.txt               # Diretivas para rastreadores de busca
│   └── sitemap.xml              # Mapa do site com todas as rotas canônicas
└── src/
    ├── main.tsx                 # Inicialização do React 19
    ├── App.tsx                  # Componente raiz, roteador e orquestrador da ferramenta
    ├── index.css                # Importação Tailwind CSS v4
    ├── types/
    │   └── index.ts             # Tipos TypeScript (presets, progresso, resultados, inspeção)
    ├── lib/
    │   ├── pdfWorkerConfig.ts   # Configuração do Web Worker do PDF.js no Vite
    │   ├── fileUtils.ts         # Cálculos binários (1 KB = 1024 B), formatação pt-BR e downloads
    │   ├── pdfInspector.ts      # Inspeção de páginas, dimensões, senha e validação de assinatura %PDF
    │   ├── pdfCompressor.ts     # Motor real de compressão adaptativa progressiva
    │   ├── samplePdfGenerator.ts# Gerador de PDF de exemplo (1,5 MB+ com fotos) para testes rápidos
    │   └── routesConfig.ts      # Dados de conteúdo e SEO exclusivo para cada landing page
    └── components/
        ├── Header.tsx           # Barra de navegação limpa com selo de privacidade
        ├── Footer.tsx           # Rodapé institucional, links e nota de desvinculação
        ├── UploadCard.tsx       # Área de arrastar/soltar, seletor de arquivos e teste com amostra
        ├── TargetSizeSelector.ts# Seletor visual de presets e ajuste livre em KB/MB
        ├── ProgressIndicator.tsx# Barra de progresso ao vivo com botão de cancelamento
        ├── ResultCard.tsx       # Tela profissional de resultados (Antes/Depois/Economia/Download)
        ├── HowItWorks.tsx       # Seção "Como comprimir um PDF?" em 3 passos
        ├── WhyReduzirPdf.tsx    # Seção "Por que usar o ReduzirPDF?" com 6 diferenciais
        ├── UseCasesSection.tsx  # Casos de uso contextuais (Concursos, INSS, Tribunais, RH, E-mail)
        ├── FaqSection.tsx       # FAQ expansível com Schema.org FAQPage integrado
        ├── RelatedSizesSection.tsx # Links internos para SEO entre tamanhos
        ├── PrivacyPage.tsx      # Política de privacidade completa (Zero-Upload e LGPD)
        ├── TermsPage.tsx        # Termos de uso e responsabilidades
        ├── ContactPage.tsx      # Formulário de contato e suporte
        └── AdSensePlaceholder.tsx # Espaço reservado para monetização não intrusiva
```

---

## 3. Dependências e Licenças

| Pacote | Versão | Licença | Finalidade |
| :--- | :--- | :--- | :--- |
| `pdfjs-dist` | `^6.5.438` | Apache-2.0 | Leitura, inspeção e renderização de páginas em Canvas |
| `pdf-lib` | `^1.17.1` | MIT | Criação, reconstrução e compressão estrutural de PDFs |
| `react` | `^19.0.1` | MIT | Interface reativa do usuário |
| `react-dom` | `^19.0.1` | MIT | Renderização React no DOM |
| `lucide-react`| `^0.546.0` | ISC | Ícones modernos da interface |
| `canvas-confetti` | `^1.9.4` | ISC | Animação de comemoração após compressão bem-sucedida |
| `tailwindcss` | `^4.3.3` | MIT | Estilização minimalista e responsiva |
| `vite` | `^8.3.0` | MIT | Bundler e servidor de desenvolvimento ultra-rápido |

---

## 4. Como Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado.
- NPM ou Yarn.

### Passos
1. Clone o repositório ou acesse a pasta do projeto:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd reduzirpdf
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra no seu navegador:
   ```text
   http://localhost:3000
   ```

---

## 5. Instruções para Deploy no GitHub Pages

O projeto foi configurado com `base: './'` no `vite.config.ts` e inclui `public/404.html` para suporte nativo a Single Page Applications (SPA) no GitHub Pages, suportando tanto domínios personalizados na raiz quanto subdiretórios de repositório (`https://usuario.github.io/nome-do-repo/`).

### Correções Implementadas para o Problema da Tela Branca (White Screen):
1. **Polyfill de `Promise.withResolvers`**: O PDF.js v4+/v6+ utiliza intensamente esse método recente do ECMAScript. Em navegadores que ainda não o implementaram nativamente, um erro fatal causava a tela branca. Adicionamos o polyfill no topo do `src/main.tsx`.
2. **Normalização de Subdiretório do Repositório**: Em `https://usuario.github.io/repo/`, o roteador extrai e preserva o nome do repositório automaticamente, evitando que links limpos e atualizações de página quebrem a aplicação.
3. **Normalização de Barra Final (Trailing Slash)**: Script no `<head>` do `index.html` que garante o redirecionamento caso o usuário acerte o repositório sem a barra final, impedindo erros 404 em assets relativos `./assets/`.
4. **Code Splitting (Importação Dinâmica)**: A biblioteca pesada do PDF.js (1,4 MB) foi desacoplada do carregamento inicial e é importada sob demanda somente quando o usuário seleciona ou comprime um documento, garantindo renderização inicial instantânea.
5. **ErrorBoundary e Fallback Visual**: Se qualquer erro inesperado acontecer, o usuário recebe uma tela amigável em português com botão de recarregar em vez de uma tela vazia sem resposta.

### Método 1: Via GitHub Actions (Recomendado)
1. No seu repositório no GitHub, acesse **Settings > Pages**.
2. Em **Build and deployment > Source**, selecione **GitHub Actions**.
3. Crie o arquivo `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Set up Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'npm'
         - name: Install dependencies
           run: npm ci
         - name: Build
           run: npm run build
         - name: Setup Pages
           uses: actions/configure-pages@v4
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: './dist'
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

### Método 2: Build Manual
1. Execute:
   ```bash
   npm run build
   ```
2. A pasta gerada `dist/` contém todos os arquivos estáticos prontos para publicação na branch `gh-pages` ou qualquer hospedagem estática (Netlify, Vercel, Cloudflare Pages, S3).

---

## 6. Arquitetura do Motor de Compressão

1. **Inspeção Prévia (`pdfInspector.ts`)**:
   - Valida assinatura mágica `%PDF-`.
   - Lê contagem de páginas e dimensões físicas (pontos A4).
   - Detecta documentos criptografados ou protegidos por senha e alerta com clareza.
2. **Tentativa Sem Perdas / Otimização Estrutural (`pdfCompressor.ts`)**:
   - Otimiza árvores de objetos com streams empacotados via `pdf-lib`.
   - Se o tamanho já for inferior ao alvo, retorna o arquivo vetorial intacto (preservando seleção de texto e links).
3. **Compressão Adaptativa por Resolução e Qualidade**:
   - Se a redução estrutural não atingir o alvo desejado, calcula o orçamento de bytes por página (`targetBytes / totalPages`).
   - Renderiza as páginas via `PDF.js` em Canvas com escala proporcional inteligente.
   - Aplica quantização JPEG em níveis controlados de qualidade.
   - Reúne as páginas em um novo documento PDF limpo com preservação rigorosa da ordem, rotação e dimensões originais.
4. **Proteção de Legibilidade e Qualidade Mínima**:
   - Se um documento com muitas páginas não puder alcançar o tamanho desejado (ex: 100 KB para 20 páginas) sem tornar as letras ilegíveis, o motor interrompe o processo com transparência, informa a menor tentativa segura obtida e recomenda o preset viável seguinte.

---

## 7. Garantias de Privacidade e Segurança

- **100% Client-Side**: O arquivo PDF nunca é transmitido pela rede.
- **Zero Servidores de Processamento**: Não existem rotas de upload no backend.
- **Limpeza de Memória**: Canais gráficos Canvas são zerados (`width=0; height=0`) e `URL.revokeObjectURL` é acionado para evitar vazamento de memória RAM no navegador.
- **Sem Rastreamento de Documentos**: Nem nomes, nem conteúdos são enviados para telemetrias ou analytics.
- **Conformidade com a LGPD**: Implementa o princípio de *Privacy by Design*.

---

## 8. Páginas de SEO e URLs Implementadas

| Rota | Título SEO | Preset Pré-selecionado |
| :--- | :--- | :--- |
| `/` | Reduzir o tamanho do seu PDF grátis | 500 KB |
| `/comprimir-pdf-para-100kb` | Comprimir PDF para 100 KB Online Grátis | 100 KB |
| `/comprimir-pdf-para-200kb` | Comprimir PDF para 200 KB Grátis | 200 KB |
| `/comprimir-pdf-para-500kb` | Comprimir PDF para 500 KB Online | 500 KB |
| `/comprimir-pdf-para-1mb-gratis` | Comprimir PDF para 1 MB Grátis Online | 1 MB |
| `/compactar-pdf-para-enviar` | Compactar PDF para Enviar por E-mail ou WhatsApp | 1 MB |
| `/diminuir-tamanho-de-pdf` | Diminuir Tamanho de PDF Online Grátis | 500 KB |
| `/privacidade` | Política de Privacidade (Arquitetura Zero-Upload) | N/A |
| `/termos` | Termos de Uso | N/A |
| `/contato` | Contato e Suporte Técnico | N/A |
