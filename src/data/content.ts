import { asset } from '../lib/asset';
import { whatsappUrl } from '../lib/links';

export type Action = { label: string; href: string; variant: 'main' | 'ghost' };

export type Project = {
  id: 'padaria' | 'fluxus' | 'livrum';
  title: string;
  badge?: string;
  summary: string;
  note?: string;
  backend: string;
  stack: string[];
  image?: { src: string; alt: string };
  actions: Action[];
  featured?: boolean;
};

export type Service = { title: string; text: string };
export type SiteModel = { id: string; title: string; href: string; image: { src: string; alt: string } };
export type TimelineItem = { when: string; title: string; place: string };
export type TechGroup = { title: string; items: string[] };

export const site = {
  name: 'Bernardo Silva Bombazaro',
  role: 'Desenvolvedor Full Stack',
  headline: 'Código limpo. Interfaces que acolhem.',
  typed: 'olá, eu sou o Bernardo',
  lead: 'Sou o Bernardo, desenvolvedor full stack. Faço sites e apps com React, TypeScript e Java, do desenho da tela ao banco de dados.',
  location: 'Palhoça/SC',
  about:
    'Sou estudante de Análise e Desenvolvimento de Sistemas no IFSC São José, de Palhoça/SC. Gosto de construir coisas que as pessoas realmente usam e de explicar tecnologia de um jeito simples: hoje ensino informática e lógica de programação para crianças e adolescentes.',
};

export const links = {
  whatsapp: whatsappUrl('48984555696'),
  instagram: 'https://instagram.com/bombazaro.sites',
  email: 'mailto:bombazarobernardo@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bernardo-silva-bombazaro-855b65276',
  github: 'https://github.com/bombazaro',
  cv: asset('/curriculo-bernardo-bombazaro.pdf'),
};

export const contactLabels = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
};

export const heroChips = ['React', 'TypeScript', 'Java', 'Spring Boot', 'SQL'];

export const projects: Project[] = [
  {
    id: 'padaria',
    title: "Padaria Bombazaro's",
    badge: 'em destaque',
    featured: true,
    summary:
      'Site de uma padaria real, com painel em português para os donos atualizarem produtos, horários e avisos sozinhos. "Aberto agora" calculado no fuso de Brasília, formulário de currículo, acessibilidade e SEO local.',
    backend: 'Conteúdo e painel de edição no Sanity, com o site hospedado no Netlify.',
    stack: ['React', 'TypeScript', 'Sanity', 'Netlify'],
    image: { src: asset('/projetos/padaria.webp'), alt: "Página inicial do site da Padaria Bombazaro's" },
    actions: [
      { label: 'Ver site', href: 'https://padariabombazaros.netlify.app', variant: 'main' },
      { label: 'Código', href: 'https://github.com/bombazaro/padaria-bombazaros', variant: 'ghost' },
    ],
  },
  {
    id: 'fluxus',
    title: 'Fluxus',
    summary:
      'App de contas a pagar que calcula sozinho o que falta pagar e quanto sobra do mês. Funciona 100% offline.',
    backend: 'Os dados ficam em um banco SQLite dentro do próprio celular, por isso tudo funciona sem internet.',
    stack: ['Expo', 'TypeScript', 'SQLite', 'Netlify'],
    image: { src: asset('/projetos/fluxus.webp'), alt: 'Telas Início e Contas do app Fluxus no modo escuro' },
    actions: [
      { label: 'Abrir na web', href: 'https://fluxus-financas.netlify.app', variant: 'main' },
      { label: 'Baixar APK', href: 'https://github.com/bombazaro/fluxus/releases/latest', variant: 'ghost' },
      { label: 'Código', href: 'https://github.com/bombazaro/fluxus', variant: 'ghost' },
    ],
  },
  {
    id: 'livrum',
    title: 'Livrum',
    badge: 'em equipe',
    summary:
      'RPG gamificado que incentiva jovens a ler, com XP, badges e quizzes. Projeto do IFSC feito em grupo.',
    note: 'Versão inicial em React e Java, feita em grupo; depois reescrita em Python pelo colega. Participei de várias partes (83 commits no repositório atual).',
    backend: 'Contas e progresso dos leitores guardados no Supabase, com o site hospedado na Vercel.',
    stack: ['React', 'Java', 'Python', 'Supabase', 'Vercel'],
    image: { src: asset('/projetos/livrum.webp'), alt: 'Tela inicial do Livrum depois do login, com nível, XP, fases concluídas e o gato mascote lendo sobre uma pilha de livros' },
    actions: [
      { label: 'Ver site', href: 'https://livrum-ifsc1.vercel.app', variant: 'main' },
    ],
  },
];

export const services: Service[] = [
  {
    title: 'Site de apresentação',
    text: 'Uma página simples e rápida para o seu negócio ser encontrado e chamado de qualquer celular, com horário, endereço e botão de WhatsApp.',
  },
  {
    title: 'Site com painel de edição',
    text: 'Você mesmo atualiza produtos, preços e avisos, sem depender de ninguém. Foi assim que fiz o site da padaria.',
  },
  {
    title: 'Ajustes e melhorias',
    text: 'Já tem um site? Eu deixo mais rápido, bonito no celular e mais fácil de achar na busca.',
  },
];

const modelImage = (id: string, title: string) => ({
  src: asset(`/modelos/${id}.webp`),
  alt: `Página inicial do modelo de site para ${title.toLowerCase()}`,
});

export const siteModels: SiteModel[] = [
  { id: 'barbearia', title: 'Barbearia', href: 'https://bombazaro-barbearia.pages.dev/', image: modelImage('barbearia', 'Barbearia') },
  { id: 'salao', title: 'Salão de beleza', href: 'https://bombazaro-salao.pages.dev/', image: modelImage('salao', 'Salão de beleza') },
  { id: 'padaria', title: 'Padaria', href: 'https://bombazaro-padaria.pages.dev/', image: modelImage('padaria', 'Padaria') },
  { id: 'petshop', title: 'Pet shop', href: 'https://bombazaro-petshop.pages.dev/', image: modelImage('petshop', 'Pet shop') },
  { id: 'oficina', title: 'Oficina', href: 'https://bombazaro-oficina.pages.dev/', image: modelImage('oficina', 'Oficina mecânica') },
  { id: 'restaurante', title: 'Restaurante', href: 'https://bombazaro-restaurante.pages.dev/', image: modelImage('restaurante', 'Restaurante') },
  { id: 'relojoaria', title: 'Relojoaria e joalheria', href: 'https://bombazaro-relojoaria.pages.dev/', image: modelImage('relojoaria', 'Relojoaria e joalheria') },
  { id: 'academia', title: 'Academia', href: 'https://bombazaro-academia.pages.dev/', image: modelImage('academia', 'Academia') },
  { id: 'consultorio', title: 'Consultório odontológico', href: 'https://bombazaro-consultorio.pages.dev/', image: modelImage('consultorio', 'Consultório odontológico') },
];

export const quoteMessage = 'Olá, Bernardo! Vi seu portfólio e quero pedir um orçamento de site.';

export const timeline: TimelineItem[] = [
  {
    when: '2025 a hoje',
    title: 'Instrutor de Informática',
    place: 'Associação Laura dos Santos, informática básica e lógica com Scratch',
  },
  {
    when: '2024 a 2025',
    title: 'Jovem Aprendiz em Eletrônica e Comunicação de Dados',
    place: 'Intelbras, curso SENAI',
  },
  {
    when: 'cursando',
    title: 'Técnico em Análise e Desenvolvimento de Sistemas',
    place: 'IFSC São José',
  },
];

export const techGroups: TechGroup[] = [
  {
    title: 'Programação',
    items: ['Java', 'Spring Boot', 'POO', 'JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Kotlin'],
  },
  { title: 'Banco de dados', items: ['SQL', 'SQLite', 'Supabase / PostgreSQL'] },
  { title: 'Ferramentas', items: ['Git / GitHub', 'Linux', 'Scrum', 'Claude', 'ChatGPT'] },
  { title: 'Pessoal', items: ['Organização', 'Responsabilidade', 'Proatividade', 'Boa comunicação'] },
];

export const marqueeItems = ['React', 'TypeScript', 'Java', 'Spring Boot', 'SQL', 'Kotlin', 'Git', 'Linux'];
