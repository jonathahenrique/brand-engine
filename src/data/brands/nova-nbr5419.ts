import type { BrandConfig } from '@/types/brand'

export const novaNbr5419: BrandConfig = {
  slug: 'nova-nbr5419',
  name: 'Como Aplicar a NBR 5419:2026',
  tagline: 'Aprenda a norma com quem a escreveu.',
  purpose:
    'Capacitar engenheiros, tecnólogos e técnicos para aplicar a NBR 5419:2026 com domínio técnico real — transformando conhecimento normativo em segurança profissional e excelência em projetos de SPDA.',
  niche: 'educacao',
  description:
    'Formação online 100% prática com os autores da norma. Jobson Modena e Hélio Sueta — Coordenador e Secretário da Comissão ABNT que redigiram a NBR 5419:2026 e representantes brasileiros no TC-81/IEC — ensinam como aplicar a norma vigente em projetos reais. 4 módulos, acesso por 2 anos, certificado de extensão universitária (UniFatec). Turma Fundadora.',

  audience: {
    primary:
      'Engenheiros eletricistas, tecnólogos e técnicos em eletricidade que projetam instalações de PDA, assinam ARTs e precisam de conformidade com a nova norma',
    pain:
      'A norma foi atualizada para :2026 e o profissional não sabe exatamente o que mudou — precisa assinar ART com segurança, tem projetos em andamento sem saber se atendem, já foi questionado por clientes, fiscalizadores ou seguradoras',
    desire:
      'Ser reconhecido como referência técnica em PDA, aplicar a norma em projetos reais com segurança técnica e jurídica, assinar ARTs sem medo',
  },

  positioning: {
    category: 'Formação técnica profissional em SPDA e proteção contra descargas atmosféricas',
    differentiator:
      'Os únicos professores do mercado que são os autores da norma — Coordenador e Secretário da Comissão ABNT que redigiram a NBR 5419:2026, representantes brasileiros no TC-81/IEC',
    promise:
      'Sair com segurança técnica e jurídica para dimensionar qualquer SPDA e assinar qualquer ART — sem dúvidas, sem medo de questionamento',
  },

  personality: {
    archetype: 'O Especialista',
    traits: [
      { trait: 'Autoral', desc: 'Não interpreta a norma, a define. Os professores são a fonte primária — não existe referência mais alta.' },
      { trait: 'Preciso', desc: "Cada afirmação tem respaldo normativo. Sem achismo, sem 'na prática funciona assim'." },
      { trait: 'Didático', desc: 'Domínio técnico de 30 anos + doutorado USP traduzido em aplicação prática imediata em projetos reais.' },
      { trait: 'Exigente', desc: 'Formação para quem quer realmente aplicar. Não é curso de nivelamento — é de domínio.' },
      { trait: 'Confiável', desc: 'A mesma autoridade que representa o Brasil no TC-81/IEC é quem assina seu certificado de formação.' },
    ],
    isNot: [
      "Um resumo 'facilitado' da norma para quem não quer ir fundo",
      'Para quem busca apenas certificado sem comprometimento técnico real',
      'Conteúdo genérico sobre SPDA sem ancoragem na norma :2026 vigente',
      'Um curso para iniciantes — pressupõe profissional que já projeta e assina ARTs',
    ],
  },

  values: [
    { title: 'Autoria sobre Opinião', description: 'O conhecimento vem de quem escreveu, não de quem interpretou. Cada conceito tem fonte primária.' },
    { title: 'Precisão Técnica', description: 'Cada decisão de projeto precisa ter base normativa verificável. Sem margem para achismo em segurança elétrica.' },
    { title: 'Aplicação Real', description: 'Formação que resolve dúvidas de obra e projeto, não de prova. O critério de qualidade é o laudo emitido, não a nota.' },
    { title: 'Responsabilidade Profissional', description: 'Assinar uma ART é um ato técnico e jurídico. A formação precisa estar à altura dessa responsabilidade.' },
  ],

  voice: {
    archetype: 'O Mentor Técnico',
    tone: 'autoritativo-acessivel',
    personality: {
      is: [
        { trait: 'Preciso', desc: "Cada instrução é rastreável à norma. Quando diz 'classe de proteção II', cita o item exato da NBR 5419:2026, não uma interpretação." },
        { trait: 'Didático', desc: 'O domínio do Coordenador ABNT é traduzido em aplicação de projeto real — não em teoria abstraída do canteiro de obra.' },
        { trait: 'Confiável', desc: 'Afirmações sustentadas por quem escreveu a norma. No mercado brasileiro de SPDA, não existe fonte mais alta.' },
        { trait: 'Direto', desc: "Vai ao ponto normativo sem rodeios. O profissional que assina ART não tem tempo para 'bem, depende...'." },
      ],
      isNot: [
        'Arrogante com profissionais que ainda não conhecem a :2026 — a norma mudou, ninguém sabe tudo ainda',
        'Excessivamente acadêmica a ponto de perder aplicabilidade prática',
        "Vaga ('pode ser que...', 'em alguns casos...') — toda afirmação tem base normativa verificável",
      ],
    },
    rules: [
      {
        rule: 'Sustente toda afirmação com referência normativa',
        example: "Segundo o item 5.3 da NBR 5419-3:2026, a distância de segurança 's' é calculada com base na classe de proteção definida na análise de risco.",
        bad: 'A distância de segurança depende de vários fatores e deve ser verificada caso a caso.',
      },
      {
        rule: 'Linguagem ativa — o profissional é o sujeito da ação',
        example: 'Você dimensiona o SPDA com base no nível de proteção definido na sua análise de risco.',
        bad: 'O SPDA deve ser dimensionado conforme os resultados da análise de risco.',
      },
      {
        rule: 'Conclusão antes da explicação',
        example: 'DPS Classe I é obrigatório quando o SPDA existe. A coordenação com Classes II e III é responsabilidade do projetista — o item 6.2 da :2026 especifica os critérios.',
        bad: 'Primeiro, vamos entender o que é um DPS. Existem três classes principais...',
      },
      {
        rule: "Números específicos — nunca 'muitos' ou 'vários'",
        example: 'A norma define 4 classes de proteção (I, II, III e IV) com eficiências de 98%, 95%, 90% e 80% respectivamente.',
        bad: 'Existem várias classes de proteção com diferentes eficiências, que devem ser analisadas.',
      },
      {
        rule: 'Jargão técnico como padrão — o público domina o vocabulário',
        example: 'O método da esfera rolante usa raio r = 20m para LPL I. Para LPL IV, r = 60m. Essa diferença define toda a geometria do subsistema de captação.',
      },
    ],
    references: [
      'NBR 5419:2026 (ABNT) — A fonte primária. O padrão de rigor que toda comunicação deve espelhar.',
      'IEC 62305 — Padrão internacional do qual a norma brasileira deriva. Conteúdo alinhado ao que é praticado mundialmente.',
      'Laudo Técnico / ART CONFEA — Produto real do aprendizado. Cada regra de comunicação calibrada pelo padrão de um laudo técnico bem fundamentado.',
    ],
  },

  shape: {
    radiusSm: '6px',
    radiusMd: '10px',
    radiusLg: '16px',
    shadowElevated: '0 4px 24px rgba(76,29,149,0.18)',
    shadowModal: '0 16px 64px rgba(16,7,34,0.8)',
    borderWidth: '1px',
  },

  theme: {
    bg: '#100722',
    surface: '#1A0F35',
    surfaceHover: '#221444',
    primary: '#F0C142',
    primaryHover: '#DDA832',
    primaryDeep: '#C8910E',
    primaryMuted: 'rgba(240,193,66,0.12)',
    secondary: '#4C1D95',
    secondaryHover: '#5B21B6',
    secondaryDeep: '#3730A3',
    secondaryMuted: 'rgba(76,29,149,0.12)',
    text: '#F5F3FF',
    textSecondary: '#B4A9D4',
    textTertiary: '#7C6FA8',
    border: 'rgba(76,29,149,0.22)',
    borderSubtle: 'rgba(76,29,149,0.10)',
  },

  colors: {
    philosophy:
      'Âmbar como o flash do raio — luminoso, fugaz, poderoso. Roxo como o céu da tempestade — profundo, envolvente, inevitável. Juntos evocam a fenomenologia do SPDA: o evento que a norma foi criada para dominar.',
    dark: [
      { token: 'bg-deep', name: 'Noite Elétrica', hex: '#100722', usage: 'Background principal' },
      { token: 'bg-surface', name: 'Azul Abissal', hex: '#1A0F35', usage: 'Cards, superfícies' },
      { token: 'bg-elevated', name: 'Roxo Elevado', hex: '#221444', usage: 'Hover de card, dropdowns' },
      { token: 'amber-primary', name: 'Âmbar Luminoso', hex: '#F0C142', usage: 'CTA, highlights, headings em destaque' },
      { token: 'amber-hover', name: 'Âmbar Hover', hex: '#DDA832', usage: 'Hover do amber' },
      { token: 'amber-deep', name: 'Âmbar Original', hex: '#C8910E', usage: 'Pressed state' },
      { token: 'violet-primary', name: 'Violet 900', hex: '#4C1D95', usage: 'Secondary actions, tags, accents' },
      { token: 'violet-hover', name: 'Violet 800', hex: '#5B21B6', usage: 'Hover do violet' },
      { token: 'violet-deep', name: 'Indigo 800', hex: '#3730A3', usage: 'Pressed state, sombras coloridas' },
      { token: 'text-primary', name: 'Branco Violetado', hex: '#F5F3FF', usage: 'Texto principal' },
      { token: 'text-secondary', name: 'Lilás Médio', hex: '#B4A9D4', usage: 'Texto secundário, metadados' },
      { token: 'text-tertiary', name: 'Lilás Escuro', hex: '#7C6FA8', usage: 'Placeholders, texto desabilitado' },
    ],
    light: [
      { token: 'bg-light', name: 'Lavanda Suave', hex: '#FAF8FF', usage: 'Background seções claras' },
      { token: 'surface-light', name: 'Lilás Claro', hex: '#F0EBF8', usage: 'Cards em seções claras' },
      { token: 'amber-light', name: 'Âmbar Contraste', hex: '#C8910E', usage: 'Primary em contexto claro' },
      { token: 'violet-light', name: 'Violet 900', hex: '#4C1D95', usage: 'Secondary em contexto claro' },
      { token: 'text-light', name: 'Roxo-Preto', hex: '#1A0F35', usage: 'Texto em fundo claro' },
      { token: 'text-secondary-light', name: 'Indigo Escuro', hex: '#4C1D95', usage: 'Texto secundário em fundo claro' },
      { token: 'border-light', name: 'Violet Sutil', hex: 'rgba(76,29,149,0.12)', usage: 'Bordas em fundo claro' },
    ],
    primaryUsage: {
      do: [
        'CTAs principais e botões de conversão',
        'Highlights de módulos e seções importantes',
        'Badges de destaque e contadores',
        'Headings hero em âmbar sobre fundo escuro',
      ],
      dont: [
        'Background de grandes áreas — ofusca e perde impacto',
        'Texto corrido — legibilidade comprometida',
        'Borders decorativos — dilui o valor do amber como cor de ação',
      ],
    },
    secondaryUsage: {
      do: [
        'Tags de categoria e labels de feature',
        'Ícones de benefício e checklist',
        'Accents em cards e gradientes sutis',
        'Links e elementos interativos secundários',
      ],
      dont: [
        'CTA principal — compete com o amber e dilui a hierarquia',
        'Texto corrido longo',
        'Substituir o primary em contextos de conversão',
      ],
    },
  },

  typography: {
    stack: [
      { role: 'display', font: 'Outfit', source: 'Google Fonts', license: 'SIL Open Font', weights: '400,500,600,700,800', variable: true },
      { role: 'body', font: 'Source Sans 3', source: 'Google Fonts', license: 'SIL Open Font', weights: '400,500,600', variable: true },
      { role: 'mono', font: 'Fira Code', source: 'Google Fonts', license: 'SIL Open Font', weights: '400', variable: false },
    ],
    scale: [
      { name: 'Hero', desktop: '72px', mobile: '40px', lineHeight: '0.95', font: 'heading', weight: '800', letterSpacing: '-0.03em', usage: 'Landing hero, campanha' },
      { name: 'H1', desktop: '48px', mobile: '32px', lineHeight: '1.1', font: 'heading', weight: '700', letterSpacing: '-0.02em', usage: 'Títulos de página' },
      { name: 'H2', desktop: '36px', mobile: '26px', lineHeight: '1.2', font: 'heading', weight: '700', letterSpacing: '-0.01em', usage: 'Seções principais' },
      { name: 'H3', desktop: '24px', mobile: '20px', lineHeight: '1.3', font: 'heading', weight: '600', usage: 'Subsecções, cards' },
      { name: 'H4', desktop: '18px', mobile: '16px', lineHeight: '1.4', font: 'heading', weight: '600', usage: 'Headers menores' },
      { name: 'Body', desktop: '16px', mobile: '16px', lineHeight: '1.6', font: 'body', weight: '400', usage: 'Texto corrido' },
      { name: 'Small', desktop: '14px', mobile: '14px', lineHeight: '1.5', font: 'body', weight: '400', usage: 'Metadados, captions' },
      { name: 'Micro', desktop: '11px', mobile: '11px', lineHeight: '1.4', font: 'body', weight: '500', letterSpacing: '0.08em', usage: 'Labels, overlines' },
      { name: 'Code', desktop: '14px', mobile: '14px', lineHeight: '1.5', font: 'mono', weight: '400', usage: 'Referências normativas: NBR 5419-3:2026, LPL I, r = 20m' },
    ],
    rules: [
      'Headlines em âmbar #F0C142 ou branco #F5F3FF sobre fundo escuro',
      'Peso 800 reservado exclusivamente para Hero — garante hierarquia clara',
      'Code para qualquer referência normativa: NBR 5419-3:2026, LPL I, r = 20m',
    ],
  },

  spacing: {
    base: 4,
    scale: [
      { name: '2xs', value: '4px', px: 4 },
      { name: 'xs', value: '8px', px: 8 },
      { name: 'sm', value: '12px', px: 12 },
      { name: 'md', value: '16px', px: 16 },
      { name: 'lg', value: '24px', px: 24 },
      { name: 'xl', value: '32px', px: 32 },
      { name: '2xl', value: '48px', px: 48 },
      { name: '3xl', value: '64px', px: 64 },
      { name: '4xl', value: '96px', px: 96 },
      { name: '5xl', value: '128px', px: 128 },
    ],
    rules: [
      'Conteúdo denso (listas normativas) usa sm/md entre itens',
      'Seções hero usam 4xl/5xl de padding vertical',
      'Cards com padding interno xl (32px)',
    ],
  },

  motion: {
    principle: 'Movimento com intenção, nunca decorativo',
    description:
      'Cada animação tem propósito técnico. Consistente com o arquétipo Especialista — nada de floreios. O profissional que usa o brandbook precisa de foco no conteúdo, não de distrações visuais.',
    profile: 'precise',
    tokens: [
      { name: '--duration-instant', value: '80ms', usage: 'Feedback imediato — hover, focus' },
      { name: '--duration-fast', value: '150ms', usage: 'Micro-interações, tooltips' },
      { name: '--duration-normal', value: '250ms', usage: 'Transições de componente' },
      { name: '--duration-slow', value: '400ms', usage: 'Modais, page transitions' },
      { name: '--ease-default', value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Padrão' },
      { name: '--ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', usage: 'Entradas' },
    ],
    microAnimations: [
      { element: 'Botão CTA', behavior: 'scale 1 → 1.02', duration: '150ms', easing: 'ease-out' },
      { element: 'Card hover', behavior: 'translateY -2px + shadow elevada', duration: '150ms', easing: 'ease-out' },
      { element: 'Accordion FAQ', behavior: 'height expand', duration: '250ms', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      { element: 'Badge/tag', behavior: 'fade-in + translateY 4px → 0', duration: '200ms', easing: 'ease-out' },
      { element: 'Page sections', behavior: 'fade-in stagger 80ms', duration: '400ms', easing: 'ease-out' },
    ],
    rules: [
      'Nunca usar motion como decoração — só quando comunica estado',
      'Stagger máximo de 80ms entre elementos em lista',
      'Animações desabilitadas se prefers-reduced-motion',
    ],
  },

  textures: {
    style: 'clean',
    grain: false,
    grainOpacity: 0,
    overlays: [
      'linear-gradient(135deg, rgba(240,193,66,0.04) 0%, rgba(76,29,149,0.08) 100%) — cards',
    ],
  },

  logo: {
    concept: 'Proteção pelo conhecimento — o SPDA dentro do escudo representa o domínio da norma como blindagem profissional',
    description:
      'Combinação de escudo heráldico em gradiente âmbar (#C8910E → #DDA832) com ícone branco de mastro SPDA (captador em Y, haste vertical e base de aterramento) centralizado. Wordmark flanqueado por chevrons decorativos (►► ◄◄) com linha âmbar abaixo. Cores do gradiente âmbar encaixam na paleta Alquimia Técnica.',
    file: '/logos/nova-nbr5419-logo.webp',
    icon: '/logos/nova-nbr5419/icon.png',
    transparent: true,
    variants: [
      { name: 'Logo Horizontal', type: 'horizontal', description: 'Escudo + wordmark lado a lado — versão principal para hero, materiais e apresentações', file: '/logos/nova-nbr5419-logo.webp', source: 'upload' },
      { name: 'Logo Vertical', type: 'stacked', description: 'Escudo sobre wordmark — social media, mobile, espaços restritos' },
      { name: 'Ícone', type: 'icon', description: 'Só o escudo âmbar com ícone SPDA branco — favicon, app icon, perfil', file: '/logos/nova-nbr5419/icon.png', source: 'sharp' },
      { name: 'Mono Claro', type: 'mono-light', description: 'All-white — sobre fundos sólidos roxo (#100722, #1A0F35) ou âmbar escuro', file: '/logos/nova-nbr5419/mono-light.png', source: 'sharp' },
      { name: 'Mono Escuro', type: 'mono-dark', description: 'All-black — sobre fundos claros, papel branco, materiais impressos', file: '/logos/nova-nbr5419/mono-dark.png', source: 'sharp' },
    ],
    rules: [
      'Clearspace mínimo de 1× a altura do escudo em todos os lados',
      'Tamanho mínimo: escudo não menor que 32px de altura — abaixo disso usar shield-only',
      'Cores permitidas: âmbar gradiente (padrão), all-white (sobre roxo/escuro), all-dark #1A0F35 (sobre âmbar)',
      'Sobre fundos claros: escudo âmbar + wordmark em #1A0F35',
      'O ícone SPDA interno sempre branco ou #100722 — nunca recolorir',
    ],
    misuse: [
      'Não distorcer proporções do escudo em nenhum eixo',
      'Não aplicar sobre fundos que removam contraste do gradiente âmbar (laranja, amarelo)',
      'Não remover os chevrons decorativos do wordmark — são parte da identidade',
      'Não aplicar drop-shadow sobre o escudo — o gradiente já cria profundidade',
      'Não recriar o ícone SPDA interno em outro estilo (outline, 3D) — manter flat/sólido',
    ],
  },

  photography: {
    style: 'Corporativo Moderno — adaptado com color grading âmbar/roxo da paleta Alquimia Técnica',
    lighting: 'Natural equilibrado com tom levemente frio, sem sombras duras',
    composition: 'Professor em postura de autoridade, diagramas técnicos, engenheiros em campo',
    colorTreatment: 'Dark overlay rgba(16,7,34,0.4) + grade âmbar sutil — integra fotos reais à paleta',
    subjects: [
      'Professores em ambiente técnico (laboratório, quadro, diagrama de SPDA)',
      'Engenheiros em campo com EPI realizando inspeção de SPDA',
      'Documentação técnica: laudos, memoriais de cálculo, ARTs',
      'Diagramas normativos e esquemas de proteção atmosférica',
    ],
    avoid: [
      'Stock genérico de pessoas em escritório sem contexto técnico',
      'Aperto de mão corporativo clichê',
      'Imagens de iluminação sem relação com SPDA',
      'Sorrisos forçados sem engajamento técnico',
    ],
  },

  iconography: {
    style: 'Outline — contorno técnico, preciso, consistente com arquétipo Especialista',
    grid: '24x24',
    strokeWidth: '1.5px',
  },

  mockups: {
    instagramPosts: [
      { type: 'quote', headline: 'Existe uma diferença entre o profissional que conhece a norma e o profissional que sabe aplicá-la.' },
      { type: 'tip', headline: 'DPS Classe I: obrigatório quando o SPDA existe', body: 'A NBR 5419-4:2026 é clara: se há SPDA, há obrigação de coordenar DPS Classe I, II e III. Essa responsabilidade é do projetista — não da seguradora, não do cliente.', accent: '#F0C142' },
      { type: 'stats', headline: '4 classes. 98%, 95%, 90%, 80%.', body: 'São as eficiências das classes de proteção definidas pela NBR 5419:2026. Você sabe qual aplicar em cada edificação?', accent: '#F0C142' },
      { type: 'cta', headline: 'A norma mudou. Sua ART não pode esperar.', body: 'Aprenda a NBR 5419:2026 com o Coordenador e Secretário da Comissão ABNT que a redigiram. Turma Fundadora — vagas limitadas.', accent: '#F0C142' },
    ],
    youtubeThumbnails: [
      { headline: 'O QUE MUDOU na NBR 5419:2026 — Tudo que você precisa saber', style: 'dramatic' },
      { headline: 'Como dimensionar SPDA pelo Método da Esfera Rolante', style: 'tutorial' },
      { headline: 'ART de SPDA com erro — Responsabilidade civil explicada', style: 'dramatic' },
    ],
    newsletter: {
      subject: 'A norma que entrou em vigor agora — você já sabe o que mudou?',
      headline: 'NBR 5419:2026 está em vigor. Seus projetos estão em conformidade?',
      body: [
        'Em vigor desde 2026, a nova NBR 5419 introduz mudanças significativas na análise de risco, dimensionamento de SPDA e documentação técnica. Profissionais que ainda operam pela versão 2015 estão assinando ARTs com base em norma revogada.',
        'Para resolver isso, Jobson Modena e Hélio Sueta — Coordenador e Secretário da Comissão ABNT que redigiram a norma — abriram a Turma Fundadora. Oferta especial por tempo limitado.',
      ],
      ctaText: 'Garantir vaga na Turma Fundadora',
    },
    landingHero: {
      headline: 'Aprenda a norma com quem a escreveu.',
      subheadline:
        'Jobson Modena e Hélio Sueta — Coordenador e Secretário da Comissão ABNT da NBR 5419:2026 — ensinam como aplicar a norma vigente em projetos reais. Assine ARTs com segurança técnica e jurídica.',
      ctaText: 'Garantir vaga na Turma Fundadora',
      ctaSecondary: 'Ver conteúdo completo',
    },
  },

  createdAt: '2026-03-04',
  updatedAt: '2026-03-04',
  completeness: 95,
}
