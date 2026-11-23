# Portfólio de Bernardo Bombazaro

Site de página única do Bernardo, desenvolvedor Full Stack de Palhoça/SC. Mostra os projetos (Padaria Bombazaro's, Fluxus e Livrum), os modelos de site para pequenos e grandes negócios (barbearia, salão, padaria, pet shop, oficina e restaurante), um resumo da formação e experiência, e os contatos.

**Site no ar:** https://bombazaro.github.io/

## Tecnologias

React, TypeScript, Vite, Vitest e CSS puro. Publicado no GitHub Pages.

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento
npm test         # testes
npm run build    # gera a pasta dist
```

## Estrutura

- `src/data/content.ts`: todo o texto e os links do site, em um só lugar.
- `src/components/`: seções e peças da página (cada uma com seu teste).
- `src/hooks/`: efeitos (brilho do mouse, digitação, progresso de rolagem).
- `docs/design.md`: o design aprovado.

Os efeitos de movimento se desligam automaticamente para quem usa "reduzir movimento" no sistema e em telas sem mouse.
