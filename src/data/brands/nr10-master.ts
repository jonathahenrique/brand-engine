import type { BrandConfig } from '@/types/brand'

export const nr10Master: BrandConfig = {
  slug: 'nr10-master',
  name: 'NR-10 Master',
  tagline: 'Seguranca eletrica com maestria.',
  purpose: 'Formar profissionais que dominam seguranca eletrica com confianca e competencia tecnica.',
  niche: 'educacao',
  description:
    'Curso completo de NR-10 (Seguranca em Instalacoes e Servicos em Eletricidade) com simulacoes praticas, certificacao reconhecida e suporte tecnico continuo.',

  audience: {
    primary: 'Eletricistas, tecnicos e engenheiros eletricos de 25-50 anos buscando certificacao NR-10',
    pain: 'Medo de acidentes eletricos + cursos teoricos demais sem pratica real + certificacoes duvidosas',
    desire: 'Dominar NR-10 com confianca, obter certificacao reconhecida e se destacar no mercado',
  },

  positioning: {
    category: 'Curso tecnico de seguranca eletrica',
    differentiator: 'Simulacoes praticas reais + certificacao valida + instrutor com 20 anos de campo',
    promise: 'Domine NR-10 com a confianca de quem ja praticou antes de ir a campo',
  },

  personality: {
    archetype: 'O Especialista',
    traits: [
      { trait: 'Tecnico', desc: 'Dominio profundo da norma e suas aplicacoes praticas' },
      { trait: 'Confiavel', desc: 'Transmite seguranca e credibilidade em cada detalhe' },
      { trait: 'Direto', desc: 'Vai ao ponto — em seguranca eletrica, clareza salva vidas' },
      { trait: 'Pratico', desc: 'Foca no que funciona no campo, nao so na teoria' },
      { trait: 'Acessivel', desc: 'Explica termos tecnicos sem ser condescendente' },
    ],
    isNot: [
      'Academico distante da pratica',
      'Sensacionalista sobre perigos',
      'Generico ou superficial',
      'Arrogante ou inacessivel',
    ],
  },

  values: [
    { title: 'Seguranca', description: 'Seguranca nao e burocracia — e a base de tudo que fazemos.' },
    { title: 'Competencia', description: 'Saber fazer certo, na primeira vez.' },
    { title: 'Pratica', description: 'Teoria sem pratica e papel. Pratica sem teoria e risco.' },
    { title: 'Excelencia', description: 'O padrao minimo aceitavel e a excelencia.' },
  ],

  voice: {
    archetype: 'O Especialista Confiavel',
    tone: 'tecnico-acessivel',
    personality: {
      is: [
        { trait: 'Claro', desc: 'Linguagem tecnica com explicacao — nunca assume que o aluno sabe' },
        { trait: 'Confiante', desc: 'Fala com autoridade de quem ja viveu o campo' },
        { trait: 'Direto', desc: 'Em seguranca, ambiguidade mata. Ser preciso.' },
        { trait: 'Motivador', desc: 'Reforcar que dominar NR-10 e acessivel a todos' },
      ],
      isNot: [
        'Condescendente',
        'Alarmista sem contexto',
        'Corporativo generico',
        'Informal demais (giriass)',
      ],
    },
    rules: [
      { rule: 'Termos tecnicos sempre com explicacao na primeira vez', example: 'EPIs (Equipamentos de Protecao Individual) devem ser...' },
      { rule: 'Numeros e dados concretos', example: '73% dos acidentes eletricos ocorrem por falta de desenergizacao', bad: 'Muitos acidentes acontecem por falta de cuidado' },
      { rule: 'Call-to-action focado em competencia', example: 'Domine os procedimentos de bloqueio e etiquetagem', bad: 'Compre agora com desconto!' },
      { rule: 'Referencias a norma com precisao', example: 'Conforme NR-10, item 10.2.1, a desenergizacao deve seguir...' },
    ],
    references: ['SENAI', 'ABB Academy', 'Schneider Electric University'],
  },

  shape: {
    radiusSm: '6px',
    radiusMd: '10px',
    radiusLg: '16px',
    shadowElevated: '0 4px 12px -2px rgba(0,0,0,0.12)',
    shadowModal: '0 16px 32px -8px rgba(0,0,0,0.18)',
    borderWidth: '1px',
  },

  theme: {
    bg: '#0C1220',
    surface: '#141E30',
    surfaceHover: '#1A2740',
    primary: '#2563EB',
    primaryHover: '#3B82F6',
    primaryDeep: '#1D4ED8',
    primaryMuted: 'rgba(37, 99, 235, 0.08)',
    secondary: '#F97316',
    secondaryHover: '#FB923C',
    secondaryDeep: '#EA580C',
    secondaryMuted: 'rgba(249, 115, 22, 0.08)',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    border: '#1E293B',
    borderSubtle: '#172033',
  },

  colors: {
    philosophy:
      'Dois eixos: Azul Profundo (#2563EB) = confianca, precisao tecnica, profissionalismo. Laranja Industrial (#F97316) = alerta, energia, acao. O azul domina (80%) — o laranja e cirurgico para CTAs, alertas e destaques de seguranca.',
    dark: [
      { token: 'midnight', name: 'Midnight', hex: '#0C1220', oklch: 'oklch(0.11 0.02 260)', usage: 'Background principal — profundidade' },
      { token: 'steel', name: 'Steel', hex: '#141E30', oklch: 'oklch(0.16 0.02 260)', usage: 'Cards, surfaces, paineis' },
      { token: 'slate', name: 'Slate', hex: '#1A2740', oklch: 'oklch(0.20 0.03 260)', usage: 'Hover de surfaces' },
      { token: 'voltage', name: 'Voltage Blue', hex: '#2563EB', oklch: 'oklch(0.55 0.20 260)', usage: 'Accent principal, links, selecao' },
      { token: 'voltage-bright', name: 'Voltage Bright', hex: '#3B82F6', oklch: 'oklch(0.61 0.19 260)', usage: 'Hover do primary' },
      { token: 'voltage-deep', name: 'Voltage Deep', hex: '#1D4ED8', oklch: 'oklch(0.48 0.20 265)', usage: 'Active/pressed' },
      { token: 'alert', name: 'Alert Orange', hex: '#F97316', oklch: 'oklch(0.68 0.18 55)', usage: 'CTAs, alertas de seguranca, destaques' },
      { token: 'alert-bright', name: 'Alert Bright', hex: '#FB923C', oklch: 'oklch(0.74 0.16 60)', usage: 'Hover do secondary' },
      { token: 'wire', name: 'Wire', hex: '#F1F5F9', oklch: 'oklch(0.96 0.005 260)', usage: 'Texto principal' },
      { token: 'conduit', name: 'Conduit', hex: '#94A3B8', oklch: 'oklch(0.70 0.02 255)', usage: 'Texto secundario' },
      { token: 'insulator', name: 'Insulator', hex: '#64748B', oklch: 'oklch(0.55 0.02 255)', usage: 'Placeholders, hints' },
      { token: 'panel', name: 'Panel', hex: '#1E293B', oklch: 'oklch(0.22 0.02 260)', usage: 'Bordas, separadores' },
    ],
    light: [
      { token: 'blueprint', name: 'Blueprint', hex: '#F8FAFC', usage: 'Background principal' },
      { token: 'diagram', name: 'Diagram', hex: '#F1F5F9', usage: 'Cards, surfaces' },
      { token: 'voltage', name: 'Voltage Blue', hex: '#2563EB', usage: 'Accent principal' },
      { token: 'alert', name: 'Alert Orange', hex: '#EA580C', usage: 'CTAs, alertas' },
      { token: 'carbon', name: 'Carbon', hex: '#0F172A', usage: 'Texto principal' },
      { token: 'conduit', name: 'Conduit', hex: '#64748B', usage: 'Texto secundario' },
      { token: 'panel', name: 'Panel', hex: '#E2E8F0', usage: 'Bordas' },
    ],
    primaryUsage: {
      do: [
        'Links e elementos interativos',
        'Headers de secoes tecnicas',
        'Icones de funcionalidade',
        'Badges de certificacao',
        'Progress bars de modulos',
      ],
      dont: [
        'Backgrounds grandes (exceto hero com overlay)',
        'Texto corrido sobre fundo claro',
        'Decoracao sem funcao',
        'Mais de 3 elementos azuis competindo por atencao',
      ],
    },
    secondaryUsage: {
      do: [
        'CTAs primarios de conversao (Matricule-se, Comece Agora)',
        'Alertas de seguranca e avisos importantes',
        'Destaques de prazos e urgencia',
        'Icones de alerta/perigo em contexto educativo',
      ],
      dont: [
        'Decoracao generica',
        'Mais de 1-2 elementos laranja por viewport',
        'Texto corrido',
        'Backgrounds de secoes',
      ],
    },
  },

  typography: {
    stack: [
      { role: 'display', font: 'Space Grotesk', source: 'Google Fonts', license: 'SIL Open Font', weights: '500, 600, 700', variable: true },
      { role: 'body', font: 'Inter', source: 'Google Fonts', license: 'SIL Open Font', weights: '400, 500, 600', variable: true },
      { role: 'mono', font: 'JetBrains Mono', source: 'JetBrains', license: 'SIL Open Font', weights: '400', variable: false },
    ],
    scale: [
      { name: 'Hero', desktop: '64px', mobile: '36px', lineHeight: '1.05', font: 'heading', weight: '700', letterSpacing: '-0.02em', usage: 'Headline principal da landing page' },
      { name: 'H1', desktop: '44px', mobile: '28px', lineHeight: '1.15', font: 'heading', weight: '700', letterSpacing: '-0.01em', usage: 'Titulos de pagina' },
      { name: 'H2', desktop: '32px', mobile: '24px', lineHeight: '1.25', font: 'heading', weight: '600', usage: 'Secoes de modulo' },
      { name: 'H3', desktop: '24px', mobile: '20px', lineHeight: '1.3', font: 'heading', weight: '600', usage: 'Sub-secoes, card headers' },
      { name: 'H4', desktop: '18px', mobile: '16px', lineHeight: '1.4', font: 'heading', weight: '500', usage: 'Labels de componentes' },
      { name: 'Body', desktop: '16px', mobile: '16px', lineHeight: '1.7', font: 'body', weight: '400', usage: 'Texto corrido, conteudo educativo' },
      { name: 'Small', desktop: '14px', mobile: '14px', lineHeight: '1.5', font: 'body', weight: '400', usage: 'Captions, notas tecnicas' },
      { name: 'Micro', desktop: '12px', mobile: '12px', lineHeight: '1.4', font: 'body', weight: '500', letterSpacing: '0.03em', usage: 'Tags de modulo, badges' },
      { name: 'Code', desktop: '14px', mobile: '14px', lineHeight: '1.6', font: 'mono', weight: '400', usage: 'Codigos de norma, referencias tecnicas' },
    ],
    rules: [
      'Headlines em Space Grotesk — transmite precisao e modernidade',
      'Body em Inter — legibilidade maxima para conteudo educativo longo',
      'Mono para referencias de norma (NR-10, item 10.2.1)',
      'Line-height generoso no body (1.7) — conteudo tecnico precisa respirar',
      'Maximo 65 caracteres por linha — regra de leiturabilidade',
      'Em contexto tecnico: numeros sempre em tabular nums (Inter suporta)',
    ],
  },

  spacing: {
    base: 4,
    scale: [
      { name: 'wire', value: '0.25rem', px: 4 },
      { name: 'terminal', value: '0.5rem', px: 8 },
      { name: 'junction', value: '0.75rem', px: 12 },
      { name: 'conduit', value: '1rem', px: 16 },
      { name: 'panel', value: '1.5rem', px: 24 },
      { name: 'bay', value: '2rem', px: 32 },
      { name: 'room', value: '3rem', px: 48 },
      { name: 'floor', value: '4rem', px: 64 },
      { name: 'building', value: '6rem', px: 96 },
      { name: 'campus', value: '8rem', px: 128 },
    ],
    rules: [
      'Base 4px — tudo e multiplo de 4',
      'Secoes de modulo separadas por "room" (48px) a "floor" (64px)',
      'Dentro de cards de conteudo: "junction" (12px) a "conduit" (16px)',
      'Espacamento de lista: "terminal" (8px) entre items',
    ],
  },

  motion: {
    principle: 'Steady & Sure',
    description:
      'No NR-10 Master, movimento e confiavel e previsivel. Nada salta ou surprende — transicoes sao suaves, progressivas e transmitem seguranca. Como um profissional que trabalha com calma e precisao.',
    profile: 'calm',
    tokens: [
      { name: '--duration-instant', value: '120ms', usage: 'Hover, toggle' },
      { name: '--duration-fast', value: '200ms', usage: 'Transicoes de estado' },
      { name: '--duration-normal', value: '350ms', usage: 'Transicoes padrao' },
      { name: '--duration-slow', value: '500ms', usage: 'Modais, revelacoes' },
      { name: '--ease-steady', value: 'cubic-bezier(0.25, 1, 0.5, 1)', usage: 'Easing principal — suave e confiavel' },
      { name: '--ease-enter', value: 'cubic-bezier(0, 0, 0.2, 1)', usage: 'Entrada de elementos' },
    ],
    microAnimations: [
      { element: 'Hover botao', behavior: 'Background shift suave + shadow sutil', duration: '200ms', easing: 'ease-steady' },
      { element: 'Hover card', behavior: 'Elevacao sutil (translateY -2px) + shadow', duration: '350ms', easing: 'ease-steady' },
      { element: 'Progress bar', behavior: 'Fill progressivo da esquerda', duration: '500ms', easing: 'ease-enter' },
      { element: 'Accordion', behavior: 'Expand suave com content reveal', duration: '350ms', easing: 'ease-steady' },
      { element: 'Notificacao', behavior: 'Slide-down sutil + fade', duration: '350ms', easing: 'ease-steady' },
    ],
    rules: [
      'Transicoes sempre suaves — nada pula ou salta',
      'Nenhuma animacao acima de 500ms',
      'Preferir ease-out suave sobre ease-in-out',
      'SEMPRE respeitar prefers-reduced-motion: reduce',
      'Progress indicators para operacoes > 2s',
    ],
  },

  textures: {
    style: 'clean',
    grain: true,
    grainOpacity: 0.02,
    overlays: ['grain-subtle'],
  },

  logo: {
    concept: 'O Escudo Tecnico',
    description:
      'Logotipo combina o nome "NR-10 Master" com um elemento grafico que referencia um escudo de protecao ou simbolo eletrico (raio estilizado dentro de forma geometrica). Transmite seguranca, competencia tecnica e autoridade.',
    variants: [
      { name: 'Logo Dark', description: 'Logo completo sobre fundo escuro' },
      { name: 'Logo Light', description: 'Logo completo sobre fundo claro' },
      { name: 'Logo Compacto', description: 'Versao reduzida para avatar e favicon' },
      { name: 'Logo Mono', description: 'Versao monocromatica para impressao' },
    ],
    rules: [
      'Area de protecao: 1.5x a altura do simbolo',
      'Tamanho minimo: 32px de altura para digital',
      'Sobre foto: usar fundo semi-transparente atras do logo',
      'Proporcoes fixas — nunca distorcer',
    ],
    misuse: [
      'Distorcer proporcoes',
      'Usar sobre fundo com baixo contraste',
      'Adicionar efeitos (sombra, brilho, 3D)',
      'Alterar cores fora das variantes oficiais',
      'Rotacionar ou inclinar',
    ],
  },

  photography: {
    style: 'Tecnico-humanizado — equipamentos reais + profissionais em acao',
    lighting: 'Iluminacao industrial: fluorescente ambiente + direcional para destaque',
    composition: 'Close-ups de maos com EPIs, paineis eletricos, instrumentos de medicao',
    colorTreatment: 'Tons levemente frios, contraste medio, saturacao controlada',
    subjects: [
      'Eletricistas usando EPIs corretamente',
      'Paineis eletricos e quadros de distribuicao',
      'Instrumentos de medicao (multimetro, amperimetro)',
      'Ambientes industriais e canteiros de obra',
      'Close-ups de conexoes e fiacao',
    ],
    avoid: [
      'Fotos de banco genericas de "pessoa no escritorio"',
      'Imagens de raios/relampagos dramaticos',
      'Equipamentos desatualizados ou inseguros',
      'Pessoas sem EPIs em contexto eletrico',
    ],
  },

  iconography: {
    style: 'Outline 1.5px, squared caps, tecnico-funcional',
    grid: '24x24 com 2px padding',
    strokeWidth: '1.5px',
  },

  mockups: {
    instagramPosts: [
      { type: 'stats', headline: '73%', body: 'dos acidentes eletricos ocorrem por falta de desenergizacao adequada.', accent: 'alert' },
      { type: 'tip', headline: '5 EPIs obrigatorios para trabalho em eletricidade', body: 'Voce sabe quais sao e quando usar cada um?' },
      { type: 'quote', headline: 'Seguranca nao e burocracia. E a base de tudo.', accent: 'voltage' },
      { type: 'cta', headline: 'Certificacao NR-10 reconhecida', body: 'Aulas praticas + simulacoes reais. Matriculas abertas.', accent: 'alert' },
    ],
    youtubeThumbnails: [
      { headline: 'NR-10: Os 5 ERROS que podem MATAR', style: 'numbered' },
      { headline: 'ANTES vs DEPOIS do curso', style: 'before-after' },
      { headline: 'Como fazer BLOQUEIO e ETIQUETAGEM correto', style: 'tutorial' },
    ],
    newsletter: {
      subject: 'NR-10 Master — Boletim Tecnico #12',
      headline: 'Voce sabe a diferenca entre zona controlada e zona de risco?',
      body: [
        'Na pratica, muitos profissionais confundem esses conceitos — e isso pode custar vidas.',
        'Nesta edicao, explicamos com diagramas claros e exemplos de campo.',
      ],
      ctaText: 'Leia o boletim completo',
    },
    landingHero: {
      headline: 'Domine NR-10 com a confianca de quem ja praticou.',
      subheadline: 'Curso completo com simulacoes praticas, instrutor com 20 anos de campo e certificacao reconhecida.',
      ctaText: 'Quero me matricular',
      ctaSecondary: 'Ver grade do curso',
    },
  },

  createdAt: '2026-03-03',
  updatedAt: '2026-03-03',
  completeness: 90,
}
