# Garbo Eventos

Site premium para locação de produtos para festas e eventos em Campinas/SP.

## Como abrir
Abra `index.html` no navegador. Não requer build.

## Estrutura
- `index.html` — página principal (SEO completo, dados estruturados LocalBusiness + FAQ)
- `style.css` — design system premium (paleta ink/gold, Fraunces + Outfit)
- `script.js` — busca, filtros, galeria com navegação, menu mobile
- `produtos.js` — dados do catálogo
- `robots.txt` / `sitemap.xml` — SEO técnico
- `assets/produtos/` — imagens dos produtos (não incluídas neste diretório — copie da versão anterior)

## O que mudou nesta versão

### Design
- Paleta refinada preto-café com dourado champagne (credibilidade premium)
- Tipografia: Fraunces (display serif elegante) + Outfit (sans moderna)
- Botões WhatsApp verdes nativos (familiaridade = conversão)
- Animações suaves de entrada, hover states refinados
- Micro-interações: logo gira, filtros com estado visual claro, FAQ com + rotativo
- Background com glow dourado animado + grain sutil no hero

### SEO
- Title e meta description otimizados com palavras-chave locais
- Schema.org LocalBusiness + FAQPage (rich snippets no Google)
- Open Graph + Twitter Cards
- Geo tags (Campinas/SP)
- Sitemap.xml e robots.txt
- Alt text descritivo em todas as imagens
- Headings hierárquicos corretos (h1 único)

### Conversão
- Barra de urgência/confiança no topo
- 3 provas sociais no hero (12+ anos, 1000+ eventos, 100% local)
- Faixa de diferenciais após o hero (qualidade, entrega, resposta rápida)
- Mensagem do WhatsApp já preenchida com contexto
- Botão WhatsApp com efeito "ping" chamando atenção
- CTA repetido em múltiplos pontos estratégicos
- Seção FAQ reduz objeções antes do contato
- Formulário de contato com endereço + telefone + email visíveis (credibilidade)

### Mobile
- Menu hamburger com animação
- Scroll horizontal nos filtros
- Modal adaptado (sheet bottom no mobile)
- Galeria com thumbnails clicáveis
- Botão flutuante só com ícone no mobile (menos invasivo)
- Tipografia fluida (clamp) para todos os títulos
- Breakpoints: 1024px (tablet) e 768px (mobile) e 400px (small)

### Acessibilidade
- ARIA labels completos
- Foco visível com outline dourado
- Suporte a `prefers-reduced-motion`
- Navegação por teclado (Enter nos cards, Esc/setas na galeria)
- Contraste AA em todos os textos
