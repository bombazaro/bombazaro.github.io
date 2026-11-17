# Portfólio: Bernardo Silva Bombazaro (design curto)

## Intenção
Um site único que serve a dois objetivos: (1) vender sites para pequenos negócios da região
(Instagram já criado) e (2) conseguir vaga na área de desenvolvimento de software.
O portfólio é do Bernardo como **desenvolvedor**. Nenhum projeto (padaria, Fluxus, Livrum)
define a identidade visual; todos aparecem só como cards.

## Objetivos
- Quem é dono de negócio entende em segundos o que o Bernardo faz e consegue chamar (Instagram/WhatsApp).
- Recrutador chega ao GitHub, ao currículo e vê código/README de qualidade.
- Funciona bem no celular.
- Visual tecnológico e acolhedor, com efeitos, parecido em clima (escuro + roxo + brilho) com a
  referência que o Bernardo gostou, mas com identidade própria.

## Não-objetivos
- Sem blog, sem back-end, sem painel de edição, sem várias páginas (por enquanto).
- Repositórios de aula de POO ficam de fora (decisão do Bernardo).
- Não copiar a referência: sem constelação de pontos, sem rótulos numerados `[ 01 ]`, sem foto à direita.

## Abordagens consideradas
1. **Página única (escolhida pelo Bernardo)**: uma rolagem, fácil de manter.
2. Home + página por projeto (estudos de caso): fica para depois, talvez só para a padaria.
3. Duas versões (clientes / vagas): descartada, dois sites para manter.

## Identidade e texto
- **Posicionamento:** "Desenvolvedor Full Stack" (pedido do Bernardo; não usar "front-end").
- **Frase do topo:** "Código limpo. Interfaces que acolhem." (sugestão; ele pode trocar).
- **Tecnologias citadas** (do GitHub e do currículo): Java, Spring Boot, POO, JavaScript, TypeScript,
  React, React Native/Expo, HTML, CSS, Kotlin, SQL (SQLite, Supabase/PostgreSQL), Sanity, Git/GitHub,
  Scrum, Linux. Python só como a reescrita do Livrum, feita pelo colega.
  Ferramentas de IA (Claude, ChatGPT) aparecem como uma linha discreta em "Sobre", como no currículo.
- **Privacidade:** o site NÃO mostra data de nascimento nem bairro/endereço; só "Palhoça/SC".

## Visual (aprovado por mock: mistura de J + K + L)
- **Fundo** quase preto-violeta; **acento** violeta → magenta em gradiente (título, botão principal, brilhos).
- **Layout do topo:** título grande à esquerda; à direita, cartões de vidro inclinados (um com trecho
  de código, outro com o Fluxus); embaixo, os 3 cards dos projetos.
- **Selo "● Disponível para projetos"** em verde, no topo do texto.
- **Brilho por onde o mouse passa (pedido do Bernardo):**
  - holofote violeta que segue o cursor por **toda a página** (luz suave no fundo);
  - cards, botões e links ganham **brilho na borda e no interior** exatamente onde o cursor está;
  - rastro curto e discreto atrás do cursor.
  - No celular (sem mouse): o brilho aparece ao tocar/rolar, mais leve; sem rastro.
  - Para quem ativa "reduzir movimento": brilho estático, sem rastro, sem inclinação.
- Outros efeitos: entrada suave dos blocos ao rolar, cartões de vidro que se mexem em camadas com o
  mouse (parallax leve), texto do topo digitando uma vez. Desempenho primeiro: nada que trave o celular.
- Fontes: uma sem serifa moderna para texto/títulos e uma monoespaçada só em detalhes.

## Estrutura da página, de cima para baixo
1. Menu + selo + título + frase + dois botões: "Quero um site para meu negócio"
   (Instagram) e dois botões secundários, "Currículo" (PDF) e "GitHub"; cartões de vidro ao lado.
   (Mudança feita na revisão final: antes era um só botão "Currículo e GitHub" que levava só ao GitHub.)
   O Contato também ganhou o botão "Currículo".
2. **Projetos**, cada card com captura de tela, uma frase, tecnologias, botão principal e botão "Código":
   - **Padaria Bombazaro's** (destaque): [Ver site](https://padariabombazaros.netlify.app) · código no GitHub.
   - **Fluxus** (app Android + web): [Abrir na web](https://fluxus-financas.netlify.app) · Baixar APK · código.
   - **Livrum** (trabalho em grupo, IFSC): [Ver site](https://livrum-ifsc1.vercel.app) · código
     (github.com/anthyer/livrum). Texto honesto: versão inicial em React e Java, feita em grupo;
     reescrita em Python pelo colega; Bernardo atuou em várias partes (83 commits no repositório atual).
3. **Sobre mim** (curto, do currículo): estudante do curso Técnico em Análise e Desenvolvimento de
   Sistemas no IFSC São José, de Palhoça/SC, buscando oportunidade em desenvolvimento de sistemas.
   Linha do tempo curta:
   - 2025 a hoje · Instrutor de Informática, Associação Laura dos Santos (ensina informática básica e
     lógica de programação com Scratch para crianças e adolescentes).
   - 2024 a 2025 · Jovem Aprendiz em Eletrônica e Comunicação de Dados, Intelbras (curso SENAI).
   - 2021 a 2022 · Menor Aprendiz Administrativo, APAE de Palhoça (entra só como linha curta ou fica fora).
   - Cursando · Técnico em ADS, IFSC São José.
   Tecnologias agrupadas: Programação, Banco de dados, Ferramentas.
   Competências pessoais (organização, responsabilidade, proatividade, comunicação) viram uma frase,
   não uma lista de selos.
4. **Contato:**
   - WhatsApp: (48) 98455-5696 → `https://wa.me/5548984555696`
   - E-mail: bombazarobernardo@gmail.com
   - LinkedIn: https://www.linkedin.com/in/bernardo-silva-bombazaro-855b65276
   - GitHub: https://github.com/bombazaro
   - Instagram: **@bombazaro.sites** (https://instagram.com/bombazaro.sites), o Instagram de sites,
     usado no botão "Quero um site para meu negócio".
   - Currículo: usar o PDF novo do Bernardo, `docs/Curriculo - Bernardo Silva Bombazaro.pdf`
     (**sem data de nascimento e sem bairro**, só "Palhoça/SC"; conferido), copiado para `public/`
     com nome sem espaços (`curriculo-bernardo-bombazaro.pdf`) no botão "Currículo".
     A versão antiga, com data e bairro, não pode ir para o repositório público.

## Decisões técnicas
- **React + TypeScript com Vite** (pedido do Bernardo: React).
- **Hospedagem:** GitHub Pages com deploy automático por GitHub Actions. Repositório
  `bombazaro.github.io` dá o endereço `bombazaro.github.io` (outro nome → `bombazaro.github.io/<nome>`).
- Texto em português; acessibilidade (contraste, foco visível, `prefers-reduced-motion`); título e
  imagem de preview para WhatsApp (Open Graph).
- Brilho do mouse feito com variáveis CSS (`--x`, `--y`) atualizadas por um único listener, sem
  biblioteca pesada.

## Em aberto (preciso do Bernardo)
- Foto: o Bernardo vai fazer um **desenho** dele para usar. Até lá, o topo funciona sem foto
  (o desenho entra depois num círculo com brilho, em "Sobre" ou ao lado do título). Preciso só do
  arquivo (PNG ou WebP, de preferência fundo transparente).
- Capturas de tela: reaproveitar as do README da padaria e do Fluxus; gerar a do Livrum.

## Fica a cargo de quem constrói
- Organização interna dos componentes, ferramenta de teste, detalhes finos de cada animação.
