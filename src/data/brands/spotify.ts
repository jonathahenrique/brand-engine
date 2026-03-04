import type { BrandConfig } from '@/types/brand'

export const spotify: BrandConfig = {
  slug: 'spotify',
  name: 'Spotify',
  tagline: 'Music for everyone.',
  purpose: 'Unlock the potential of human creativity — allowing a million creative artists to live off their art and billions of fans the opportunity to enjoy and be inspired by it.',
  niche: 'tech',
  description:
    'A plataforma de streaming de audio mais popular do mundo. Spotify conecta artistas e ouvintes atraves de uma experiencia de audio personalizada, com mais de 600 milhoes de usuarios em 180+ mercados.',

  audience: {
    primary: 'Ouvintes de musica de 18 a 35 anos, conectados digitalmente, que buscam descoberta personalizada e conveniencia',
    pain: 'Dificuldade em descobrir musica nova relevante e ter acesso ilimitado ao catalogo musical',
    desire: 'Uma experiencia musical personalizada, sem interrupcoes, que entende seu humor e gosto',
  },

  positioning: {
    category: 'Streaming de audio',
    differentiator: 'Algoritmo de personalizacao e discovery unicos — Discover Weekly, Release Radar, Wrapped',
    promise: 'A trilha sonora da sua vida, personalizada para voce',
  },

  personality: {
    archetype: 'O Criador',
    traits: [
      { trait: 'Inovador', desc: 'Inovacao como mindset padrao; desejo constante de melhorar' },
      { trait: 'Colaborativo', desc: 'Trabalho em equipe, comunidade, playlists compartilhadas' },
      { trait: 'Sincero', desc: 'Comunicacao aberta, honesta e direta' },
      { trait: 'Apaixonado', desc: 'Energia e comprometimento com musica e criadores' },
      { trait: 'Playful', desc: 'Criatividade e conexoes genuinas atraves da diversao' },
    ],
    isNot: [
      'Corporativo ou frio',
      'Exclusivista ou elitista',
      'Excessivamente tecnico ou jargonizado',
      'Sensacionalista ou clickbait',
    ],
  },

  values: [
    { title: 'Innovative', description: 'Inovacao como mindset padrao. Sempre buscando melhorar a experiencia.' },
    { title: 'Collaborative', description: 'Musica conecta pessoas. Colaboracao e o core de tudo.' },
    { title: 'Sincere', description: 'Comunicacao transparente, feedback valorizado, honestidade acima de tudo.' },
    { title: 'Passionate', description: 'Comprometimento profundo com musica, artistas e a experiencia do ouvinte.' },
    { title: 'Playful', description: 'Criatividade e diversao sao parte da identidade. Lagom — nem demais, nem de menos.' },
  ],

  voice: {
    archetype: 'O Amigo Esperto',
    tone: 'conversacional-confiante',
    personality: {
      is: [
        { trait: 'Conversacional', desc: 'Fala como um amigo que conhece musica, nao como uma corporacao' },
        { trait: 'Confiante', desc: 'Sabe o que faz, sem arrogancia — matter-of-fact' },
        { trait: 'Playful', desc: 'Humor seco, trocadilhos leves, nunca forcado' },
        { trait: 'Inclusiva', desc: 'Music for everyone — acessivel para todos' },
      ],
      isNot: [
        'Excessivamente tecnico',
        'Condescendente ou "try hard"',
        'Excludente com guecos ou giriass',
      ],
    },
    rules: [
      { rule: 'Tom conversacional, nunca corporativo', example: 'Your Discover Weekly is here. Time to find your next obsession.', bad: 'A new curated playlist has been generated for your listening pleasure.' },
      { rule: 'Foco no que o usuario PODE fazer', example: 'Share this playlist with friends.', bad: 'You cannot download this in free mode.' },
      { rule: 'Humor seco e pontual (lagom)', example: 'You played this 847 times this year. No judgment.', bad: 'LOL you are OBSESSED with this song haha!!' },
      { rule: 'Contexto emocional — musica = emocao', example: 'Looks like you need a chill playlist. We got you.' },
      { rule: 'Adaptar tom ao momento', example: 'Erro: "Something went wrong. Try again?" / Wrapped: "Your year in music was... intense."' },
    ],
    references: ['Duolingo (playful)', 'Mailchimp (friendly)', 'Apple Music (competitor contrast)'],
  },

  // Oficial: corner radius 4px small/medium, 8px large
  shape: {
    radiusSm: '4px',
    radiusMd: '8px',
    radiusLg: '8px',
    shadowElevated: '0 8px 24px rgba(0,0,0,0.5)',
    shadowModal: '0 16px 48px rgba(0,0,0,0.6)',
    borderWidth: '0px',
  },

  theme: {
    bg: '#121212',
    surface: '#181818',
    surfaceHover: '#282828',
    primary: '#1ED760',
    primaryHover: '#1DB954',
    primaryDeep: '#169C46',
    primaryMuted: 'rgba(30, 215, 96, 0.10)',
    secondary: '#191414',
    secondaryHover: '#2A2A2A',
    secondaryDeep: '#000000',
    secondaryMuted: 'rgba(25, 20, 20, 0.08)',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#535353',
    border: '#282828',
    borderSubtle: '#1A1A1A',
  },

  colors: {
    philosophy:
      'Spotify Green (#1ED760) e a cor de reconhecimento da marca — usada cirurgicamente para interacao e feedback, nunca decorativamente. O dark theme (#121212) e o canvas. Seja criativo com combinacoes surpreendentes de cores, mas sempre com alto contraste para acessibilidade. Nunca introduza cores fora da paleta oficial. Evite oversaturacao em CMYK.',
    dark: [
      { token: 'base', name: 'Base', hex: '#121212', oklch: 'oklch(0.12 0.00 0)', usage: 'Background principal do app' },
      { token: 'elevated', name: 'Elevated', hex: '#181818', oklch: 'oklch(0.15 0.00 0)', usage: 'Player bar, cards elevados' },
      { token: 'surface', name: 'Surface', hex: '#282828', oklch: 'oklch(0.22 0.00 0)', usage: 'Cards, elementos interativos' },
      { token: 'highlight', name: 'Highlight', hex: '#333333', oklch: 'oklch(0.27 0.00 0)', usage: 'Hover states, surfaces ativas' },
      { token: 'subdued', name: 'Subdued', hex: '#535353', oklch: 'oklch(0.40 0.00 0)', usage: 'Bordas, elementos desabilitados' },
      { token: 'green', name: 'Spotify Green', hex: '#1ED760', oklch: 'oklch(0.78 0.19 152)', usage: 'Cor de reconhecimento — accent principal, Play, shuffle, estados ativos' },
      { token: 'green-hover', name: 'Green Hover', hex: '#1DB954', oklch: 'oklch(0.70 0.17 152)', usage: 'Hover do accent' },
      { token: 'green-deep', name: 'Green Deep', hex: '#169C46', oklch: 'oklch(0.60 0.15 152)', usage: 'Active/pressed state' },
      { token: 'text-primary', name: 'White', hex: '#FFFFFF', oklch: 'oklch(1.00 0.00 0)', usage: 'Texto principal, titulos' },
      { token: 'text-secondary', name: 'Subtext', hex: '#B3B3B3', oklch: 'oklch(0.75 0.00 0)', usage: 'Texto secundario, metadados' },
      { token: 'text-tertiary', name: 'Muted', hex: '#535353', oklch: 'oklch(0.40 0.00 0)', usage: 'Placeholders, timestamps' },
      { token: 'selected', name: 'Selected', hex: '#797979', oklch: 'oklch(0.55 0.00 0)', usage: 'Linha selecionada em listas' },
    ],
    light: [
      { token: 'base', name: 'White', hex: '#FFFFFF', usage: 'Background claro' },
      { token: 'surface', name: 'Light Gray', hex: '#F0F0F0', usage: 'Cards em modo claro' },
      { token: 'green', name: 'Spotify Green', hex: '#1DB954', usage: 'Accent (ajustado para contraste)' },
      { token: 'text-primary', name: 'Near Black', hex: '#191414', usage: 'Texto principal' },
      { token: 'text-secondary', name: 'Dark Gray', hex: '#535353', usage: 'Texto secundario' },
      { token: 'border', name: 'Border', hex: '#E0E0E0', usage: 'Bordas em light mode' },
    ],
    primaryUsage: {
      do: [
        'Spotify Green (#1ED760) como cor de reconhecimento da marca',
        'Botao Play/Shuffle — o verde identifica acao de reproducao',
        'Estados ativos (shuffle on, repeat on)',
        'CTAs primarios quando acao e positiva',
        'Progress bar de reproducao',
        'Alto contraste para acessibilidade',
      ],
      dont: [
        'Logo verde sobre backgrounds que nao sejam preto ou branco puro',
        'Backgrounds de areas extensas em verde',
        'Texto corrido em verde sobre dark bg',
        'Decoracao sem funcao interativa',
        'Gradientes com o verde (fora do Wrapped)',
        'Cores fora da paleta oficial da marca',
        'Cores oversaturadas para impressao CMYK',
      ],
    },
    secondaryUsage: {
      do: [
        'Duotone overlays em imagens de artistas',
        'Wrapped — gradientes vibrantes para celebracao anual',
        'Highlights de playlist tematica (Chill, Focus, Party)',
        'Color extraction de album art para backgrounds contextuais',
        'Usar #191414 como fallback quando color extraction nao disponivel',
      ],
      dont: [
        'Substituir o Spotify Green como cor de reconhecimento',
        'Usar mais de 2 cores vibrantes no mesmo viewport',
        'Modificar, animar ou aplicar overlays em artwork oficial',
        'Colocar marca ou logo sobre artwork de album/podcast',
        'Cropar artwork — deve ser mantido na forma original',
      ],
    },
  },

  // Oficial: Spotify Mix (desde maio 2024, por Dinamo Typefaces) — proprietaria
  // Antes: Circular (2015-2024), Gotham/Proxima Nova (2008-2015)
  // Fallback publico: Plus Jakarta Sans (Google Fonts — mais proximo ao Circular/Spotify Mix)
  typography: {
    stack: [
      { role: 'display', font: 'Plus Jakarta Sans', source: 'Google Fonts (fallback para Spotify Mix)', license: 'SIL Open Font', weights: '500, 700, 800', variable: true },
      { role: 'body', font: 'Plus Jakarta Sans', source: 'Google Fonts (fallback para Spotify Mix)', license: 'SIL Open Font', weights: '400, 500, 600', variable: true },
      { role: 'mono', font: 'JetBrains Mono', source: 'JetBrains', license: 'SIL Open Font', weights: '400', variable: false },
    ],
    scale: [
      { name: 'Hero', desktop: '80px', mobile: '40px', lineHeight: '0.95', font: 'heading', weight: '800', letterSpacing: '-0.04em', usage: 'Wrapped headlines, marketing hero' },
      { name: 'H1', desktop: '48px', mobile: '32px', lineHeight: '1.05', font: 'heading', weight: '700', letterSpacing: '-0.02em', usage: 'Page titles, section heroes' },
      { name: 'H2', desktop: '32px', mobile: '24px', lineHeight: '1.15', font: 'heading', weight: '700', letterSpacing: '-0.01em', usage: 'Section headers' },
      { name: 'H3', desktop: '24px', mobile: '20px', lineHeight: '1.25', font: 'heading', weight: '600', usage: 'Subsections, card titles' },
      { name: 'H4', desktop: '18px', mobile: '16px', lineHeight: '1.35', font: 'heading', weight: '600', usage: 'Small headers, list labels' },
      { name: 'Body', desktop: '16px', mobile: '16px', lineHeight: '1.6', font: 'body', weight: '400', usage: 'Body text, descriptions' },
      { name: 'Small', desktop: '14px', mobile: '14px', lineHeight: '1.5', font: 'body', weight: '400', usage: 'Metadata, captions, timestamps' },
      { name: 'Micro', desktop: '11px', mobile: '11px', lineHeight: '1.4', font: 'body', weight: '500', letterSpacing: '0.1em', usage: 'Overlines, labels (uppercase)' },
      { name: 'Code', desktop: '14px', mobile: '14px', lineHeight: '1.5', font: 'mono', weight: '400', usage: 'API docs, dados tecnicos' },
    ],
    rules: [
      'Font oficial: Spotify Mix (proprietaria, Dinamo Typefaces, desde maio 2024)',
      'Anterior: Circular (Lineto, 2015-2024) — geometrica sans-serif',
      'Fallback publico: Plus Jakarta Sans > DM Sans > system-ui',
      'Spotify Mix: sans-serif hibrida (geometrica + grotesca + humanista)',
      'Variable font com eixos de peso, largura e inclinacao',
      'Negrito (700-800) para headlines, Regular-Medium (400-500) para body',
      'Letter-spacing negativo em display: -0.02em a -0.04em',
      'Uppercase com tracking largo (+0.1em) APENAS para overlines e labels',
      'Maximo 60 caracteres por linha para legibilidade',
      'Alto contraste obrigatorio para acessibilidade',
      'Metadata com character limits: playlist/album 25, artista 18, track 23',
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
      'Base unit: 8px — todos os espacamentos sao multiplos de 8',
      'Corner radius: 4px (small/medium), 8px (large) — oficial',
      'Header height: 72px desktop, 64px mobile — oficial',
      'Scroll padding top: calc(72px + 8px) desktop — oficial',
      'Outline offset: 6px (focus), -3px (mobile) — oficial',
      'Outline width: 3px (primary), 1.5px (fallback) — oficial',
    ],
  },

  motion: {
    principle: 'Move with Purpose',
    description:
      'No Spotify, toda animacao tem um proposito claro: orientar, dar feedback, ou encantar. Nada se move sem razao. As transicoes sao rapidas (max 500ms), fluidas (ease-out), e sempre respeitam o contexto emocional — musica e emocao.',
    profile: 'organic',
    tokens: [
      { name: '--duration-instant', value: '100ms', usage: 'Toggle, like, micro-taps' },
      { name: '--duration-fast', value: '200ms', usage: 'Hover, button feedback' },
      { name: '--duration-normal', value: '300ms', usage: 'Card expand, drawer open' },
      { name: '--duration-slow', value: '500ms', usage: 'Page transition, max duration' },
      { name: '--ease-default', value: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)', usage: 'Easing padrao para transicoes' },
      { name: '--ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', usage: 'Feedback de interacao' },
    ],
    microAnimations: [
      { element: 'Play button', behavior: 'Scale up 1.05 + verde aparece', duration: '200ms', easing: 'ease-out' },
      { element: 'Card hover', behavior: 'Surface highlight + play button fade-in', duration: '200ms', easing: 'ease-out' },
      { element: 'Like (+)', behavior: 'Usar icone + para like. Feedback: "Added to Liked Songs"', duration: '300ms', easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)' },
      { element: 'Progress bar', behavior: 'Informativo, nao seekable em companion apps', duration: 'continuous', easing: 'linear' },
      { element: 'Now playing bar', behavior: 'Slide up from bottom', duration: '300ms', easing: 'ease-out' },
      { element: 'Seek (podcast)', behavior: '15 segundos forward/backward — obrigatorio para podcasts/audiobooks', duration: '200ms', easing: 'ease-out' },
    ],
    rules: [
      'Duracao maxima: 500ms',
      'Alvo: 60fps sempre — sem jank',
      'Preferir ease-out para feedback responsivo',
      'Focus outline: 3px transparente com transicao de cor',
      'Focus-visible com fallback para navegadores antigos',
      'SEMPRE respeitar prefers-reduced-motion: reduce',
    ],
  },

  textures: {
    style: 'clean',
    grain: false,
    grainOpacity: 0,
    overlays: [],
  },

  logo: {
    concept: 'Sound Waves',
    description:
      'O logo completo e a combinacao do icone (circulo com tres ondas sonoras curvas) com a wordmark. A wordmark nunca pode aparecer sem o icone. O icone sozinho so deve ser usado quando o espaco e limitado ou a marca ja esta estabelecida.',
    file: '/logos/spotify-logo-green.svg',
    icon: '/logos/spotify-icon.svg',
    transparent: true,
    variants: [
      { name: 'Full Color (Green)', type: 'full-color', description: 'Logo verde — SOMENTE sobre fundo preto ou branco puro', file: '/logos/spotify-logo-green.svg' },
      { name: 'Black', type: 'mono-black', description: 'Logo preta para fundos claros' },
      { name: 'White', type: 'mono-white', description: 'Logo branca para fundos escuros' },
      { name: 'Monochrome', type: 'grayscale', description: 'Versao monocromatica para fundos que nao sao preto/branco' },
    ],
    rules: [
      'Zona de exclusao: metade da altura do icone ao redor do logo',
      'Logo completo (icone + wordmark) obrigatorio em integracoes de parceiros',
      'Icone sozinho APENAS como app icon ou quando marca ja estabelecida',
      'Tamanho minimo digital: 70px (logo), 21px (icone)',
      'Tamanho minimo impresso: 20mm (logo), 6mm (icone)',
      'Verde SOMENTE sobre preto ou branco — outros fundos usam mono',
      'Artwork deve ser mantido na forma original — sem modificacao',
    ],
    misuse: [
      'Rotacionar, preencher, esticar ou alterar a forma',
      'Usar em sentencas ou como substituicao de letras',
      'Criar novos objetos ou formas a partir do logo',
      'Colocar sobre fundo ocupado ou com baixo contraste',
      'Adicionar sombra, outline ou efeitos 3D',
      'Modificar, animar, distorcer ou aplicar overlays em artwork',
    ],
  },

  photography: {
    style: 'Duotone vibrante — assinatura visual iconica do Spotify',
    lighting: 'Alto contraste, iluminacao dramatica para base da duotone',
    composition: 'Retratos de artistas centrados, close-ups emotivos, performance ao vivo',
    colorTreatment: 'Duotone com duas cores vibrantes. Color extraction de album art para backgrounds.',
    subjects: ['Artistas em performance', 'Retratos emotivos', 'Ambientes musicais', 'Capas de album (forma original)', 'Momentos culturais'],
    avoid: ['Imagens stock genericas', 'Backgrounds poluidos', 'Baixo contraste', 'Crop/modificacao de artwork', 'Overlays/blur sobre artwork', 'Animar artwork', 'Colocar logo sobre artwork'],
  },

  iconography: {
    style: 'Outline 2px, rounded, geometrico-humanista',
    grid: '24x24',
    strokeWidth: '2px',
  },

  mockups: {
    instagramPosts: [
      { type: 'stats', headline: '600M+', body: 'Ouvintes em 180+ mercados. Music for everyone.', accent: 'green' },
      { type: 'quote', headline: 'You played this song 847 times. No judgment.' },
      { type: 'cta', headline: 'Your Wrapped is here.', body: 'See your year in music.', accent: 'green' },
      { type: 'carousel-cover', headline: 'Top Songs 2025', body: 'Your most-played tracks this year' },
    ],
    youtubeThumbnails: [
      { headline: 'How Spotify Wrapped Works', style: 'tutorial' },
      { headline: 'The Algorithm Behind Your Discover Weekly', style: 'dramatic' },
    ],
    newsletter: {
      subject: 'New music Friday: Your weekly drop',
      headline: 'Fresh finds, just for you.',
      body: [
        'This week we spotted some gems that match your vibe.',
        'From indie to electronic, your Release Radar has been updated with 30 new tracks.',
      ],
      ctaText: 'Listen Now',
    },
    landingHero: {
      headline: 'Music for everyone.',
      subheadline: 'Milhoes de musicas e podcasts. Sem cartao de credito.',
      ctaText: 'Get Spotify Free',
      ctaSecondary: 'See Premium Plans',
    },
  },

  createdAt: '2026-03-03',
  updatedAt: '2026-03-03',
  completeness: 95,
}
