import type { BrandConfig } from '@/types/brand'

export const rupta: BrandConfig = {
  slug: 'rupta',
  name: 'RUPTA',
  tagline: 'O ponto de ruptura.',
  purpose: 'Destruir o convencional, criar o inevitavel.',
  niche: 'tech',
  description:
    'Plataforma de criacao total com inteligencia artificial. A RUPTA constroi qualquer coisa — sites, sistemas, design, branding, marketing — de forma rapida e eficiente.',

  audience: {
    primary: 'Empreendedores digitais, criadores e founders que querem produzir com qualidade sem depender de agencias',
    pain: 'Gastar meses e dezenas de milhares em agencias para algo que deveria ser rapido',
    desire: 'Velocidade + qualidade profissional + autonomia criativa',
  },

  positioning: {
    category: 'Plataforma de criacao com IA',
    differentiator: 'Qualidade de agencia premium com velocidade de IA',
    promise: 'Tudo que voce precisa, em horas — nao meses',
  },

  personality: {
    archetype: 'O Rebelde',
    traits: [
      { trait: 'Direta', desc: 'Frases curtas, sem jargao corporativo' },
      { trait: 'Confiante', desc: 'Sabe o que faz, nao precisa explicar demais' },
      { trait: 'Provocadora', desc: 'Questiona o status quo com inteligencia' },
      { trait: 'Artesanal', desc: 'Cada detalhe importa, nada e generico' },
      { trait: 'Anti-establishment', desc: 'Contra o convencional, a favor do inevitavel' },
    ],
    isNot: [
      'Arrogante ou elitista',
      'Barulhenta ou sensacionalista',
      'Generica ou "corporate"',
      'Fria ou distante',
    ],
  },

  values: [
    { title: 'Ruptura', description: 'Quebrar o que nao funciona. Sem cerimonia.' },
    { title: 'Criacao', description: 'Do caos nasce o novo. Sempre.' },
    { title: 'Velocidade', description: 'Entregar em horas o que o mercado leva meses.' },
    { title: 'Maestria', description: 'Cada pixel, cada palavra, cada detalhe importa.' },
  ],

  voice: {
    archetype: 'O Rebelde Intelectual',
    tone: 'provocador-confiante',
    personality: {
      is: [
        { trait: 'Direta', desc: 'Frases curtas, sem jargao corporativo' },
        { trait: 'Confiante', desc: 'Sabe o que faz, nao precisa explicar demais' },
        { trait: 'Provocadora', desc: 'Questiona o status quo com inteligencia' },
        { trait: 'Artesanal', desc: 'Cada detalhe importa, nada e generico' },
      ],
      isNot: [
        'Arrogante ou elitista',
        'Barulhenta ou sensacionalista',
        'Generica ou "corporate"',
      ],
    },
    rules: [
      { rule: 'Frases curtas. Diretas.', example: 'Branding em horas. Nao meses.' },
      { rule: 'Sem jargao de startup', example: 'Funciona. Rapido.', bad: 'Solucao disruptiva e inovadora' },
      { rule: 'Provoca com inteligencia', example: 'Sua agencia cobra R$50k por isso. Nos entregamos em 3 horas.' },
      { rule: 'Mostra, nao fala', example: 'Em vez de dizer "somos premium", SER premium em cada detalhe' },
      { rule: 'Humor seco, nunca piadas', example: 'Convencoes sao bonitas. Quando nao sao suas.' },
    ],
    references: ['Nubank', 'Acne Studios', 'Supreme'],
  },

  shape: {
    radiusSm: '4px',
    radiusMd: '8px',
    radiusLg: '12px',
    shadowElevated: '0 10px 15px -3px rgba(0,0,0,0.2)',
    shadowModal: '0 20px 25px -5px rgba(0,0,0,0.25)',
    borderWidth: '1px',
  },

  theme: {
    bg: '#0A0A0B',
    surface: '#161618',
    surfaceHover: '#1C1C1F',
    primary: '#DC2626',
    primaryHover: '#EF4444',
    primaryDeep: '#B91C1C',
    primaryMuted: 'rgba(220, 38, 38, 0.08)',
    secondary: '#F59E0B',
    secondaryHover: '#FBBF24',
    secondaryDeep: '#D97706',
    secondaryMuted: 'rgba(245, 158, 11, 0.08)',
    text: '#FAFAFA',
    textSecondary: '#71717A',
    textTertiary: '#52525B',
    border: '#27272A',
    borderSubtle: '#1E1E21',
  },

  colors: {
    philosophy:
      'Dois eixos cromaticos: Ruptura Red (#DC2626) = destruicao, o corte que rompe. Creation Amber (#F59E0B) = o que emerge da ruptura, a criacao. O brand e 85% monocromatico — red e amber sao cirurgicos, nunca decorativos.',
    dark: [
      { token: 'void', name: 'Void', hex: '#0A0A0B', oklch: 'oklch(0.07 0.005 285)', usage: 'Background primario' },
      { token: 'elevated', name: 'Elevated', hex: '#161618', oklch: 'oklch(0.13 0.005 285)', usage: 'Cards, surfaces, modais' },
      { token: 'hover', name: 'Hover', hex: '#1C1C1F', oklch: 'oklch(0.16 0.005 285)', usage: 'Hover de surfaces' },
      { token: 'ruptura', name: 'Ruptura Red', hex: '#DC2626', oklch: 'oklch(0.53 0.19 27)', usage: 'Accent principal, marca' },
      { token: 'ruptura-light', name: 'Ruptura Light', hex: '#EF4444', oklch: 'oklch(0.59 0.19 25)', usage: 'Hover do primary' },
      { token: 'ruptura-deep', name: 'Ruptura Deep', hex: '#B91C1C', oklch: 'oklch(0.44 0.17 27)', usage: 'Active/pressed' },
      { token: 'creation', name: 'Creation Amber', hex: '#F59E0B', oklch: 'oklch(0.75 0.16 75)', usage: 'Accent de criacao' },
      { token: 'creation-bright', name: 'Creation Bright', hex: '#FBBF24', oklch: 'oklch(0.82 0.15 85)', usage: 'Hover do secondary' },
      { token: 'ash', name: 'Ash', hex: '#FAFAFA', oklch: 'oklch(0.98 0 0)', usage: 'Texto principal' },
      { token: 'muted', name: 'Muted', hex: '#71717A', oklch: 'oklch(0.55 0.01 260)', usage: 'Texto secundario' },
      { token: 'dim', name: 'Dim', hex: '#52525B', oklch: 'oklch(0.42 0.01 260)', usage: 'Placeholders' },
      { token: 'edge', name: 'Edge', hex: '#27272A', oklch: 'oklch(0.21 0.005 285)', usage: 'Bordas' },
    ],
    light: [
      { token: 'cloud', name: 'Cloud', hex: '#FAFAF9', usage: 'Background primario' },
      { token: 'paper', name: 'Paper', hex: '#F4F4F5', usage: 'Cards, surfaces' },
      { token: 'ruptura', name: 'Ruptura Red', hex: '#DC2626', usage: 'Accent principal' },
      { token: 'creation', name: 'Creation Amber', hex: '#F59E0B', usage: 'Accent de criacao' },
      { token: 'ink', name: 'Ink', hex: '#09090B', usage: 'Texto principal' },
      { token: 'muted', name: 'Muted', hex: '#71717A', usage: 'Texto secundario' },
      { token: 'edge', name: 'Edge', hex: '#E4E4E7', usage: 'Bordas' },
    ],
    primaryUsage: {
      do: [
        'CTAs primarios (botoes de acao principal)',
        'Estado ativo/selecionado',
        'Highlight pontual de texto critico',
        'Fracture line em composicoes editoriais',
      ],
      dont: [
        'Backgrounds de secoes inteiras',
        'Texto corrido',
        'Decoracao sem funcao semantica',
        'Gradientes',
        'Mais de 2 elementos vermelhos por viewport',
      ],
    },
    secondaryUsage: {
      do: [
        'Valores de criacao/resultado no posicionamento',
        'Badge "Creation" / categorias de resultado',
        'Glow sutil em fechamentos (criacao completa)',
      ],
      dont: [
        'Adjacente ao red (nunca no mesmo bloco visual)',
        'Backgrounds de secoes inteiras',
        'Texto corrido ou titulos',
        'Substituir o red como accent principal',
      ],
    },
  },

  typography: {
    stack: [
      { role: 'display', font: 'Space Grotesk', source: 'Google Fonts', license: 'SIL Open Font', weights: '500, 700', variable: true },
      { role: 'body', font: 'Satoshi', source: 'Fontshare', license: 'Free for commercial use', weights: '400, 500', variable: true },
      { role: 'mono', font: 'JetBrains Mono', source: 'JetBrains', license: 'SIL Open Font', weights: '400', variable: false },
    ],
    scale: [
      { name: 'Hero', desktop: '72px', mobile: '40px', lineHeight: '1.0', font: 'heading', weight: '700', letterSpacing: '-0.02em', usage: 'Statements de marca' },
      { name: 'H1', desktop: '48px', mobile: '32px', lineHeight: '1.1', font: 'heading', weight: '700', letterSpacing: '-0.01em', usage: 'Titulos de pagina' },
      { name: 'H2', desktop: '36px', mobile: '24px', lineHeight: '1.2', font: 'heading', weight: '500', usage: 'Secoes' },
      { name: 'H3', desktop: '24px', mobile: '20px', lineHeight: '1.3', font: 'heading', weight: '500', usage: 'Sub-secoes' },
      { name: 'H4', desktop: '20px', mobile: '18px', lineHeight: '1.4', font: 'heading', weight: '500', usage: 'Cards, componentes' },
      { name: 'Body', desktop: '16px', mobile: '16px', lineHeight: '1.6', font: 'body', weight: '400', usage: 'Texto corrido' },
      { name: 'Small', desktop: '14px', mobile: '14px', lineHeight: '1.5', font: 'body', weight: '400', usage: 'Captions, labels' },
      { name: 'Micro', desktop: '12px', mobile: '12px', lineHeight: '1.4', font: 'body', weight: '500', letterSpacing: '0.02em', usage: 'Tags, badges' },
      { name: 'Code', desktop: '14px', mobile: '14px', lineHeight: '1.5', font: 'mono', weight: '400', usage: 'Codigo, dados' },
    ],
    rules: [
      'Headlines SEMPRE em Space Grotesk — nunca em Satoshi',
      'Body SEMPRE em Satoshi — nunca em Space Grotesk',
      'Mono APENAS para contextos tecnicos (codigo, dados, specs)',
      'Letter-spacing em display (>=H2): -0.01em a -0.02em',
      'Letter-spacing em ALL-CAPS: +0.08em',
      'Maximo 2 pesos por bloco de texto',
      'Paragrafo: maximo 65 caracteres por linha (measure)',
    ],
  },

  spacing: {
    base: 4,
    scale: [
      { name: 'hair', value: '0.25rem', px: 4 },
      { name: 'tight', value: '0.5rem', px: 8 },
      { name: 'compact', value: '0.75rem', px: 12 },
      { name: 'base', value: '1rem', px: 16 },
      { name: 'comfortable', value: '1.5rem', px: 24 },
      { name: 'spacious', value: '2rem', px: 32 },
      { name: 'breathe', value: '3rem', px: 48 },
      { name: 'open', value: '4rem', px: 64 },
      { name: 'vast', value: '6rem', px: 96 },
      { name: 'horizon', value: '8rem', px: 128 },
    ],
    rules: [
      'Spacing base: 4px (sempre multiplos de 4)',
      'Secoes separadas por "breathe" (48px) ou "open" (64px)',
      'Dentro de cards: "compact" (12px) a "base" (16px)',
      'Entre elementos inline: "tight" (8px)',
    ],
  },

  motion: {
    principle: 'Break, Don\'t Float',
    description:
      'Na RUPTA, nada flutua. Tudo aparece, desloca ou quebra. Ease-out, nunca ease-in-out. Elementos aparecem com intencao, deslocam com precisao, quebram com proposito.',
    profile: 'precise',
    tokens: [
      { name: '--duration-instant', value: '100ms', usage: 'Toggle, snap' },
      { name: '--duration-fast', value: '150ms', usage: 'Hover, micro-interactions' },
      { name: '--duration-normal', value: '200ms', usage: 'Transicoes padrao' },
      { name: '--duration-slow', value: '400ms', usage: 'Animacoes complexas, max UI' },
      { name: '--ease-break', value: 'cubic-bezier(0.16, 1, 0.3, 1)', usage: 'Easing principal da marca' },
      { name: '--ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', usage: 'Easing padrao' },
    ],
    microAnimations: [
      { element: 'Hover botao', behavior: 'Displacement 2px vertical', duration: '150ms', easing: 'ease-out' },
      { element: 'Hover card', behavior: 'Border aparece, surface eleva 1px', duration: '200ms', easing: 'ease-out' },
      { element: 'Transicao de pagina', behavior: 'Fracture horizontal (wipe com gap)', duration: '400ms', easing: 'ease-break' },
      { element: 'Notificacao', behavior: 'Slide-in lateral + settle', duration: '300ms', easing: 'ease-out' },
      { element: 'Toggle/switch', behavior: 'Snap position (sem tween)', duration: '100ms', easing: 'step-end' },
    ],
    rules: [
      'NUNCA usar ease-in-out — sempre ease-out ou ease-break',
      'Duracao maxima de qualquer animacao UI: 400ms',
      'Preferir transform sobre opacity — coisas sao solidas, nao fantasmas',
      'SEMPRE respeitar prefers-reduced-motion: reduce',
    ],
  },

  textures: {
    style: 'editorial',
    grain: true,
    grainOpacity: 0.03,
    overlays: ['grain-dark'],
  },

  logo: {
    concept: 'The Displacement',
    description:
      'A palavra "RUPTA" E o logo. Duas camadas de texto sobrepostas, divididas por clipPath horizontal. Metade superior branca deslocada 3px a direita. Metade inferior Ruptura Red deslocada 4px abaixo.',
    file: '/logos/rupta-wordmark.svg',
    transparent: true,
    variants: [
      { name: 'Wordmark Dark', type: 'full-color', description: 'Upper branca, lower vermelha, sobre fundo escuro', file: '/logos/rupta-wordmark.svg' },
      { name: 'Wordmark Light', type: 'custom', description: 'Upper preta, lower vermelha, sobre fundo claro', filter: { css: 'none', bg: '#FAFAFA' } },
      { name: 'Wordmark Mono', type: 'mono-white', description: 'Monocromatica — impressao P&B' },
    ],
    rules: [
      'Area de protecao: 1x a altura da wordmark ao redor',
      'Nunca sobre imagens ruidosas ou com baixo contraste',
      'Zero sombras, gradientes, outlines, 3D ou distorcoes',
      'Fratura de 3 unidades e CONSTANTE — nunca ajustar',
      'Cor da metade inferior: sempre Ruptura Red',
      'Orientacao: sempre horizontal',
    ],
    misuse: [
      'Alterar cores das metades',
      'Rotacionar a wordmark',
      'Adicionar sombra ou glow',
      'Usar sobre fundo sem contraste',
      'Alterar o displacement',
    ],
  },

  photography: {
    style: 'Cinematografico, contrastado, intencional',
    lighting: 'Iluminacao direcional, sombras fortes, nao flat',
    composition: 'Close-ups dramaticos, crop ousado, regra dos tercos',
    colorTreatment: 'Desaturacao parcial, tons frios, contraste elevado',
    subjects: ['Telas com codigo/design', 'Maos trabalhando', 'Detalhes de craft', 'Espacos de trabalho minimais'],
    avoid: ['Stock generico', 'Sorrisos forcados', 'Corporativismo', 'Cores quentes excessivas'],
  },

  iconography: {
    style: 'Outline 1.5px, rounded caps, geometrico',
    grid: '24x24 com 2px padding',
    strokeWidth: '1.5px',
  },

  mockups: {
    instagramPosts: [
      { type: 'quote', headline: 'Convencoes sao bonitas. Quando nao sao suas.', accent: 'ruptura' },
      { type: 'tip', headline: '3 sinais de que seu branding precisa de ruptura', body: 'Se parece com todo mundo, ja perdeu.' },
      { type: 'stats', headline: 'R$60k', body: 'E o que agencias cobram por algo que entregamos em horas.' },
      { type: 'cta', headline: 'Branding em horas. Nao meses.', body: 'rupta.ai', accent: 'creation' },
    ],
    youtubeThumbnails: [
      { headline: 'Seu branding parece GENERICO?', style: 'face-text' },
      { headline: '5 erros que matam sua marca', style: 'numbered' },
    ],
    newsletter: {
      subject: 'O ponto de ruptura desta semana',
      headline: 'Voce nao precisa de uma agencia.',
      body: ['O mercado te convenceu que branding profissional custa uma fortuna. Mentira.', 'O que custa caro e a ineficiencia do processo, nao o resultado.'],
      ctaText: 'Veja como funciona',
    },
    landingHero: {
      headline: 'Branding em horas. Nao meses.',
      subheadline: 'Identidade visual completa com qualidade de agencia premium. Para qualquer nicho.',
      ctaText: 'Comece agora',
      ctaSecondary: 'Veja exemplos',
    },
  },

  createdAt: '2026-03-03',
  updatedAt: '2026-03-03',
  completeness: 95,
}
