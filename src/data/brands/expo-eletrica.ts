import type { BrandConfig } from '@/types/brand'

export const expoEletrica: BrandConfig = {
  slug: 'expo-eletrica',
  name: 'ExpoElétrica',
  tagline: 'Você diante de milhares de decisores do mercado de instalações elétricas',
  purpose:
    'Ser o ponto de encontro definitivo do setor de instalações elétricas, conectando fabricantes, distribuidores, projetistas e instaladores para gerar negócios reais e compartilhar conhecimento técnico aplicado.',
  niche: 'servicos',
  description:
    'A única feira de negócios da América Latina 100% dedicada ao universo das Instalações e Materiais Elétricos. Combina exposição de produtos, equipamentos e serviços com fórum técnico de alto nível. 4ª edição — 27 e 28 de julho de 2026, Frei Caneca, São Paulo.',

  audience: {
    primary:
      'Profissionais do setor elétrico: engenheiros eletricistas, técnicos em instalações, projetistas, distribuidores, fabricantes e revendedores de material elétrico',
    pain: 'Não existe outro evento nacional focado exclusivamente em instalações elétricas — profissionais ficam diluídos em feiras genéricas que misturam eletrônica, automação e energia',
    desire:
      'Estar diante de milhares de decisores do setor, gerar negócios qualificados, conhecer as últimas novidades em produtos e tecnologias para instalações elétricas',
  },

  positioning: {
    category: 'Feira técnica de instalações elétricas (B2B)',
    differentiator:
      'Único evento da América Latina 100% dedicado a instalações elétricas — sem diluição com eletrônica, automação ou energia genérica',
    promise:
      'O ponto de encontro definitivo para quem vende, projeta e executa instalações elétricas',
  },

  personality: {
    archetype: 'O Especialista',
    traits: [
      {
        trait: 'Autoridade técnica',
        desc: 'Fala com domínio absoluto sobre instalações elétricas, referenciando normas (NBR 5410, NR-10) e tendências do setor',
      },
      {
        trait: 'Curadoria precisa',
        desc: 'Seleciona apenas expositores e conteúdos relevantes ao nicho, sem ruído de segmentos adjacentes',
      },
      {
        trait: 'Conexão de mercado',
        desc: 'Funciona como ponte entre fabricantes, distribuidores e instaladores, criando oportunidades reais de negócio',
      },
      {
        trait: 'Didatismo acessível',
        desc: 'Traduz temas técnicos complexos em conteúdo que engaja tanto o engenheiro quanto o eletricista de campo',
      },
      {
        trait: 'Consistência profissional',
        desc: 'Entrega a mesma qualidade de experiência edição após edição, construindo tradição e confiança',
      },
    ],
    isNot: [
      'Genérica — nunca tenta abraçar eletrônica, automação ou energia de forma ampla',
      'Acadêmica — não é congresso científico inacessível, é feira de negócios com fórum técnico',
      'Elitista — recebe desde o instalador autônomo até o diretor de distribuidora',
      'Sensacionalista — não promete revolução, entrega resultados concretos de mercado',
    ],
  },

  values: [
    {
      title: 'Especialização radical',
      description:
        'Foco absoluto em instalações elétricas. Profundidade > amplitude.',
    },
    {
      title: 'Negócios reais',
      description:
        'Cada metro quadrado de exposição existe para gerar conexões comerciais mensuráveis.',
    },
    {
      title: 'Conhecimento aplicado',
      description:
        'Fórum técnico que sai do papel e vai para a obra. Conteúdo que vira prática.',
    },
    {
      title: 'Ecossistema unificado',
      description:
        'Reunir toda a cadeia (fabricante → distribuidor → projetista → instalador) num único espaço.',
    },
  ],

  voice: {
    archetype: 'O Mentor Técnico',
    tone: 'autoritativo-acessível',
    personality: {
      is: [
        {
          trait: 'Preciso',
          desc: 'Cita números reais (40+ expositores, 8.000 visitantes, 4ª edição), normas e dados do setor. Nunca "muitos" ou "vários".',
        },
        {
          trait: 'Didático',
          desc: 'Traduz linguagem de engenharia para o instalador de campo e vice-versa.',
        },
        {
          trait: 'Confiável',
          desc: 'Construída pela Revista Potência (referência editorial do setor), cada afirmação tem lastro real.',
        },
        {
          trait: 'Direto',
          desc: 'Vai ao ponto: o que é, quando é, para quem é, e por que você deveria estar lá.',
        },
      ],
      isNot: [
        'Arrogante ou condescendente',
        'Excessivamente técnica para o público geral',
        'Vaga ou generalista',
      ],
    },
    rules: [
      {
        rule: 'Sempre use dados ou exemplos para sustentar afirmações',
        example:
          '40+ expositores confirmados, 8.000 visitantes esperados, 2 dias de feira e fórum técnico.',
        bad: 'Muitos expositores renomados e milhares de visitantes.',
      },
      {
        rule: 'Linguagem ativa, nunca passiva',
        example:
          'A ExpoElétrica reúne toda a cadeia de instalações elétricas em São Paulo.',
        bad: 'Toda a cadeia de instalações elétricas é reunida na ExpoElétrica.',
      },
      {
        rule: 'Jargão técnico apenas quando o público entende',
        example:
          'Conheça as novidades em proteção contra surtos, quadros de distribuição e automação predial.',
        bad: 'Soluções disruptivas em DPS classe I/II com coordenação de isolamento per IEC 61643.',
      },
      {
        rule: 'Conclusões antes de explicações',
        example:
          'Única feira 100% instalações elétricas. Sem diluição com eletrônica ou automação genérica.',
        bad: 'Diferente de outras feiras que misturam vários segmentos, a ExpoElétrica é focada exclusivamente em...',
      },
      {
        rule: 'Números específicos, nunca "muitos" ou "vários"',
        example:
          '27 e 28 de julho, Frei Caneca, São Paulo. 4ª edição. 40+ marcas expondo.',
        bad: 'Em breve, mais uma edição imperdível com diversas marcas participantes.',
      },
    ],
    references: [
      'Revista Potência — tom editorial técnico do próprio grupo realizador',
      'FIEE — referência de feira técnica B2B (o que ExpoElétrica supera em foco)',
      'Exame/Bloomberg Energia — tom jornalístico-técnico acessível para decisores',
    ],
  },

  shape: {
    radiusSm: '4px',
    radiusMd: '8px',
    radiusLg: '20px',
    shadowElevated: '0 2px 16px rgba(0,0,0,0.07)',
    shadowModal: '0 4px 20px rgba(245,168,58,0.28)',
    borderWidth: '1.5px',
  },

  theme: {
    bg: '#0F2D97',
    surface: '#0A1F6B',
    surfaceHover: '#1A3BA3',
    primary: '#0F2D97',
    primaryHover: '#1A3BA3',
    primaryDeep: '#081546',
    primaryMuted: 'rgba(15, 45, 151, 0.20)',
    secondary: '#F5A83A',
    secondaryHover: '#FBBF24',
    secondaryDeep: '#D97706',
    secondaryMuted: 'rgba(245, 168, 58, 0.15)',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    border: '#1A3BA3',
    borderSubtle: '#0A1F6B',
    accent: '#0F2D97',
    accentOnDark: '#F5A83A',
  },

  colors: {
    philosophy:
      'Três contextos visuais que se alternam: AZUL ROYAL (institucional, campanha, autoridade — é a cor dominante), PRETO (impacto, personalidade, social media bold) e BRANCO/LIGHT (educacional, conteúdo técnico). Orange (#F5A83A) é exclusivamente ACCENT — nunca background. Aparece em: headlines de destaque, palavras-chave, CTAs, logo e ênfases. Azul é estrutural (backgrounds, tipografia grande, shapes). Orange é pontual (brilho, ação, energia).',
    dark: [
      { token: 'bg-institutional', name: 'Royal Blue', hex: '#0F2D97', usage: 'Background DOMINANTE — hero sections, campanhas, posts de impacto institucional' },
      { token: 'bg-deep', name: 'Deep Navy', hex: '#081546', usage: 'Background mais escuro — gradientes, profundidade, nav' },
      { token: 'bg-dark', name: 'Near Black', hex: '#0D0D0D', usage: 'Background alternativo — posts de personalidade, declarações bold' },
      { token: 'bg-dark-surface', name: 'Dark Surface', hex: '#1A1A1A', usage: 'Cards sobre fundo preto' },
      { token: 'accent-orange', name: 'Expo Orange', hex: '#F5A83A', usage: 'ACCENT ONLY — headlines de destaque, palavras-chave, CTAs, logo' },
      { token: 'accent-orange-hover', name: 'Amber 400', hex: '#FBBF24', usage: 'Orange hover state' },
      { token: 'accent-orange-deep', name: 'Amber 600', hex: '#D97706', usage: 'Orange pressed/active' },
      { token: 'text-primary', name: 'White', hex: '#FFFFFF', usage: 'Texto principal sobre azul ou preto' },
      { token: 'text-secondary', name: 'Slate 100', hex: '#F1F5F9', usage: 'Texto secundário sobre fundos escuros' },
      { token: 'text-tertiary', name: 'Slate 400', hex: '#94A3B8', usage: 'Texto terciário, metadados' },
      { token: 'border-default', name: 'Blue Border', hex: '#1A3BA3', usage: 'Bordas sobre fundo azul' },
    ],
    light: [
      { token: 'bg-primary', name: 'White', hex: '#FFFFFF', usage: 'Background principal — conteúdo educacional, posts técnicos' },
      { token: 'bg-surface', name: 'Off White', hex: '#F5F4F0', usage: 'Cards, containers light' },
      { token: 'text-primary', name: 'Royal Blue', hex: '#0F2D97', usage: 'Tipografia grande, headlines, shapes decorativos sobre fundo claro' },
      { token: 'text-secondary', name: 'Near Black', hex: '#1A1A1A', usage: 'Texto corrido sobre fundo claro' },
      { token: 'text-tertiary', name: 'Muted', hex: '#5F6672', usage: 'Texto terciário light' },
      { token: 'accent-orange', name: 'Expo Orange', hex: '#F5A83A', usage: 'ACCENT — mesmo uso no light: CTAs, destaques, logo' },
      { token: 'border-default', name: 'Light Border', hex: '#E2E8F0', usage: 'Bordas light' },
    ],
    primaryUsage: {
      do: [
        'Usar #0F2D97 (Royal Blue) como background principal de campanhas e posts institucionais',
        'Usar como cor de tipografia grande sobre fundos claros (headlines, shapes decorativos)',
        'Gradientes navy (#081546) → royal blue (#0F2D97) para profundidade em backgrounds',
      ],
      dont: [
        'Não usar royal blue em texto pequeno sobre fundo escuro/preto (baixo contraste)',
        'Não substituir por azul genérico — respeitar os hex exatos (#0F2D97)',
        'Não usar como cor de CTA (reservado para orange)',
      ],
    },
    secondaryUsage: {
      do: [
        'Usar #F5A83A (Orange) APENAS como accent: palavras-chave em headlines, CTAs, badges, logo',
        'Texto em navy (#081546) sobre fundo orange quando necessário (botões, banners pequenos)',
        'Usar para dar "brilho" pontual — nunca como cor dominante de uma peça',
      ],
      dont: [
        'NUNCA usar orange como background de grandes áreas (cansa a vista, perde impacto)',
        'Não usar orange em texto corrido — apenas em palavras de ênfase e ação',
        'Não combinar orange com vermelho ou amarelo (confusão visual)',
      ],
    },
  },

  typography: {
    stack: [
      {
        role: 'display',
        font: 'Oswald',
        source: 'Google Fonts',
        license: 'SIL Open Font',
        weights: '400, 500, 600, 700',
        variable: true,
      },
      {
        role: 'body',
        font: 'Roboto',
        source: 'Google Fonts',
        license: 'Apache 2.0',
        weights: '400, 500, 700',
        variable: true,
      },
      {
        role: 'mono',
        font: 'JetBrains Mono',
        source: 'JetBrains',
        license: 'SIL Open Font',
        weights: '400',
        variable: false,
      },
    ],
    scale: [
      { name: 'Hero', desktop: '72px', mobile: '36px', lineHeight: '0.95', font: 'heading', weight: '700', letterSpacing: '-0.03em', usage: 'Landing hero, campanha ExpoElétrica 2026' },
      { name: 'H1', desktop: '48px', mobile: '32px', lineHeight: '1.1', font: 'heading', weight: '700', letterSpacing: '-0.02em', usage: 'Títulos de página' },
      { name: 'H2', desktop: '36px', mobile: '24px', lineHeight: '1.2', font: 'heading', weight: '700', letterSpacing: '-0.01em', usage: 'Seções principais' },
      { name: 'H3', desktop: '24px', mobile: '20px', lineHeight: '1.3', font: 'heading', weight: '600', usage: 'Subseções, cards de expositores' },
      { name: 'H4', desktop: '18px', mobile: '16px', lineHeight: '1.4', font: 'heading', weight: '600', usage: 'Headers menores, categorias' },
      { name: 'Body', desktop: '16px', mobile: '16px', lineHeight: '1.6', font: 'body', weight: '400', usage: 'Texto corrido, descrições' },
      { name: 'Small', desktop: '14px', mobile: '14px', lineHeight: '1.5', font: 'body', weight: '400', usage: 'Metadados, datas, local' },
      { name: 'Micro', desktop: '11px', mobile: '11px', lineHeight: '1.4', font: 'body', weight: '500', letterSpacing: '0.08em', usage: 'Labels, eyebrows, overlines' },
      { name: 'Code', desktop: '14px', mobile: '14px', lineHeight: '1.5', font: 'mono', weight: '400', usage: 'Normas técnicas, dados' },
    ],
    rules: [
      'Oswald SEMPRE em uppercase para H1 e Hero (identidade condensed da marca)',
      'Roboto para todo texto corrido — nunca Oswald em parágrafos',
      'Mínimo 16px para body text (acessibilidade)',
      'Letter-spacing negativo apenas em Hero e H1 (display sizes)',
      'Eyebrows/overlines: Oswald 11px, 600, letter-spacing 3px (padrão do site)',
    ],
  },

  spacing: {
    base: 8,
    scale: [
      { name: '2xs', value: '0.25rem', px: 4 },
      { name: 'xs', value: '0.5rem', px: 8 },
      { name: 'sm', value: '0.75rem', px: 12 },
      { name: 'md', value: '1rem', px: 16 },
      { name: 'lg', value: '1.5rem', px: 24 },
      { name: 'xl', value: '2rem', px: 32 },
      { name: '2xl', value: '2.5rem', px: 40 },
      { name: '3xl', value: '3rem', px: 48 },
      { name: '4xl', value: '4rem', px: 64 },
      { name: '5xl', value: '6rem', px: 96 },
    ],
    rules: [
      'Base unit: 8px — espaçamentos em múltiplos de 8',
      'Padding interno de cards: 16-24px',
      'Gap entre cards: 16-24px',
      'Section spacing: 48-64px',
      'Max container width: 1160px (--wrap do site existente)',
      'Gutter horizontal: 24px (--gutter do site existente)',
    ],
  },

  motion: {
    principle: 'Every Frame Has Purpose',
    description:
      'Movimentos exatos e eficientes que comunicam profissionalismo e competência. Sem exagero, sem desperdício.',
    profile: 'precise',
    tokens: [
      { name: '--duration-instant', value: '100ms', usage: 'Micro-feedback imediato' },
      { name: '--duration-fast', value: '200ms', usage: 'Hover, toggle states' },
      { name: '--duration-normal', value: '300ms', usage: 'Menus, drawers' },
      { name: '--duration-slow', value: '450ms', usage: 'Page transitions, modals' },
      { name: '--ease-default', value: 'cubic-bezier(0.2, 0, 0.38, 0.9)', usage: 'Easing padrão IBM-style' },
      { name: '--ease-out', value: 'cubic-bezier(0, 0, 0.3, 1)', usage: 'Saída precisa' },
    ],
    microAnimations: [
      { element: 'Button hover', behavior: 'Background color shift + brightness(0.9), no scale', duration: '200ms', easing: 'cubic-bezier(0.2, 0, 0.38, 0.9)' },
      { element: 'Dropdown open', behavior: 'Height expand from 0 + fade', duration: '300ms', easing: 'cubic-bezier(0, 0, 0.3, 1)' },
      { element: 'Tab switch', behavior: 'Underline slide + content cross-fade', duration: '200ms', easing: 'cubic-bezier(0.2, 0, 0.38, 0.9)' },
      { element: 'Toast appear', behavior: 'Slide in from right + fade', duration: '300ms', easing: 'cubic-bezier(0, 0, 0.3, 1)' },
      { element: 'Data update', behavior: 'Number counter animation', duration: '450ms', easing: 'cubic-bezier(0.2, 0, 0.38, 0.9)' },
    ],
    rules: [
      'SEMPRE respeitar prefers-reduced-motion: reduce',
      'Target 60fps — nunca animar propriedades que causam layout (width, height, top, left)',
      'Preferir transform e opacity (GPU-accelerated)',
      'Duração máxima absoluta: 800ms (exceto loops intencionais)',
      'Nenhuma animação deve bloquear interação do usuário',
    ],
  },

  textures: {
    style: 'textured',
    grain: true,
    grainOpacity: 0.04,
    overlays: [],
  },

  logo: {
    file: '/logos/expo-eletrica/horizontal.svg',
    icon: '/logos/expo-eletrica/icon.svg',
    concept:
      'O "E" estilizado com gradiente orange (#F6AE3D → #F0902B) é o ícone principal. O wordmark "EXPO." usa a mesma tipografia condensed em gradiente. O subtítulo "Científica e Elétrica 2026" completa a marca. Fonte do logo: Eurostile LT Std Bold Extended 2.',
    description:
      'Logo combinação horizontal: "E" iconográfico em gradiente orange + wordmark "EXPO." em gradiente + texto "Científica e Elétrica" + badge "2026". Tipografia Eurostile LT Std Bold Extended 2.',
    variants: [
      { name: 'Horizontal', type: 'horizontal', file: '/logos/expo-eletrica/horizontal.svg', lightFile: '/logos/expo-eletrica/horizontal-dark.svg', description: 'Logo completo — "E" em gradiente orange. Versão claro (texto branco) para fundos escuros, versão escuro (texto #231F20) para fundos claros.' },
      { name: 'Wordmark', type: 'stacked', file: '/logos/expo-eletrica/wordmark.svg', description: 'Versão reduzida "EXPO." em gradiente orange. Para espaços compactos, redes sociais e co-branding.' },
      { name: 'Ícone', type: 'icon', file: '/logos/expo-eletrica/icon.svg', description: 'Apenas o "E" em gradiente orange. Favicon, avatar, marca d\'água, espaços mínimos.' },
      { name: 'Mono Claro', type: 'mono-light', file: '/logos/expo-eletrica/mono-light.svg', description: 'Versão monocromática branca completa. Para fundos escuros sem cor.' },
      { name: 'Mono Escuro', type: 'mono-dark', file: '/logos/expo-eletrica/mono-dark.svg', description: 'Versão monocromática escura (#231F21). Para fundos claros, impressos P&B.' },
    ],
    rules: [
      'Clearspace mínimo: altura do ícone ao redor de todo o logo',
      'Tamanho mínimo: 120px de largura (digital) / 30mm (impresso)',
      'Cores permitidas: versão full-color (orange + navy), mono-light (branco), mono-dark (navy)',
      'Sobre fundo navy/escuro: usar versão com wordmark branco ou mono-light',
      'Sobre fundo branco/claro: usar versão full-color ou mono-dark',
      'O subtítulo "Expo & Fórum" pode ser omitido em tamanhos < 80px',
    ],
    misuse: [
      'Não rotacionar ou inclinar o logo',
      'Não alterar as proporções (esticar, comprimir)',
      'Não aplicar efeitos (sombra, brilho, 3D, gradiente) sobre o logo',
      'Não usar orange sobre fundo vermelho ou amarelo (conflito de cor)',
      'Não recolorir com cores fora da paleta da marca',
      'Não posicionar o logo sobre imagens complexas sem overlay de contraste',
    ],
  },

  photography: {
    style: 'Corporativo Moderno',
    lighting: 'Natural + artificial equilibrado, bem iluminado, sem sombras duras',
    composition:
      'Profissionais em stands, interação em corredores de feira, close-ups de produtos elétricos, palestras do fórum',
    colorTreatment: 'Neutro, ligeiramente frio (azulado), clean e profissional',
    subjects: [
      'Stands com expositores apresentando produtos',
      'Profissionais do setor conversando e fazendo networking',
      'Painéis, quadros elétricos e equipamentos em demonstração',
      'Plateia do fórum técnico assistindo palestras',
      'Momentos de networking no coffee break',
    ],
    avoid: [
      'Fotos stock genéricas de escritório',
      'Stands vazios ou ambientes sem pessoas',
      'Iluminação escura ou flash estourado',
      'Fotos desfocadas de corredores lotados',
      'Imagens sem relação com o setor elétrico',
    ],
  },

  iconography: {
    style: 'Outline — ícones de contorno com espessura consistente',
    grid: '24x24',
    strokeWidth: '1.5px',
  },

  mockups: {
    instagramPosts: [
      { type: 'quote', headline: 'Única feira 100% instalações elétricas. Sem diluição. Sem desvio. Só o que importa para o seu negócio.' },
      { type: 'tip', headline: '3 motivos para expor na ExpoElétrica 2026', body: '8.000 visitantes qualificados. 40+ marcas lado a lado. 2 dias de conexões diretas com decisores.', accent: '#F5A83A' },
      { type: 'stats', headline: '4ª edição. 40+ expositores. 8.000 visitantes.', body: 'O maior encontro do setor de instalações elétricas da América Latina. 27-28 de julho, Frei Caneca, SP.', accent: '#0F2D97' },
      { type: 'cta', headline: 'Garanta sua cota de exposição', body: 'Você diante de milhares de decisores do mercado de instalações elétricas. Vagas limitadas.', accent: '#F5A83A' },
    ],
    youtubeThumbnails: [
      { headline: 'Por que a ExpoElétrica NÃO é mais uma feira genérica', style: 'dramatic' },
      { headline: '5 lançamentos que você vai encontrar na ExpoElétrica 2026', style: 'numbered' },
    ],
    newsletter: {
      subject: '27 e 28 de julho: o setor elétrico inteiro em um lugar',
      headline: 'ExpoElétrica 2026 — 4ª Edição',
      body: [
        '40+ fabricantes confirmados. 8.000 visitantes esperados. O único evento 100% dedicado a instalações elétricas.',
        'Novidades em proteção contra surtos, quadros de distribuição, automação predial e ferramentas para instaladores. Tudo em 2 dias no Frei Caneca, São Paulo.',
      ],
      ctaText: 'Inscreva-se gratuitamente',
    },
    landingHero: {
      headline: 'ExpoElétrica 2026',
      subheadline:
        'Você diante de milhares de decisores do mercado de instalações elétricas. 27 e 28 de julho, Frei Caneca, São Paulo.',
      ctaText: 'Garanta sua cota de exposição',
      ctaSecondary: 'Inscreva-se como visitante',
    },
  },

  createdAt: '2026-03-10',
  updatedAt: '2026-03-10',
  completeness: 90,
}
