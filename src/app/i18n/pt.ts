import type { Translations } from './es';

export const PT: Translations = {
  header: {
    nav: {
      solutions: 'Soluções',
      cases: 'Cases de Sucesso',
      metrics: 'Métricas',
      contact: 'Contato',
    },
    cta: 'Agendar Reunião',
    themeToggle: { light: 'Mudar para modo claro', dark: 'Mudar para modo escuro' },
    langToggle: { switchTo: 'Cambiar a Español' },
  },
  hero: {
    headline: 'Construímos o software que sustenta',
    headlineGradient: 'o núcleo do seu negócio.',
    subtitle: 'Projetamos e desenvolvemos tecnologia que sustenta operações reais.',
    cta: 'Descubra como impactamos a indústria',
    sectionAriaLabel: 'Hero principal',
  },
  bridge: {
    eyebrow: 'Portfólio de Impacto',
    title: 'Histórias de',
    titleGradient: 'Sucesso',
    subtitle:
      'Transformando desafios complexos em arquiteturas de alto desempenho. Nossa metodologia aplicada à engenharia de software.',
    challengeLabel: 'Desafio',
    resultLabel: 'Resultado',
    gridAriaLabel: 'Cases de sucesso',
    cases: [
      {
        tag: 'Governo / Setor Público',
        title: 'Modernização de Canais Digitais - Fondo Nacional del Ahorro',
        description:
          'Redesign integral da experiência digital para eliminar barreiras de acesso e alinhar a plataforma às necessidades reais de milhões de usuários.',
        challenge:
          'Canais digitais desatualizados geravam fricção e barreiras de acesso, especialmente para usuários com menor experiência digital.',
        result:
          'Plataforma renovada com navegação intuitiva, maior acessibilidade e redução significativa de fricção em processos-chave.',
        metric: '-60%',
        metricLabel: 'Fricção em processos digitais',
      },
      {
        tag: 'Financeiro / Público',
        title: 'Plataforma de Garantias FINAGRO',
        description: 'Sistema centralizado para o registro e monitoramento seguro de operações.',
        challenge: 'Processos fragmentados e manuais com altos riscos de controle e auditoria.',
        result: 'Plataforma de módulos unificados com automação e rastreabilidade total.',
        metric: '-65%',
        metricLabel: 'Tempo de gestão',
      },
      {
        tag: 'Educação / EdTech',
        title: 'Ecossistema LMS Inteligente',
        description: 'Plataforma LMS para experiências adaptativas e personalizadas.',
        challenge: 'Falta de personalização, integrações e escassa gestão de estudantes.',
        result: 'Ambiente escalável que melhora a interação e gestão de conteúdo.',
        metric: '+42%',
        metricLabel: 'Retenção de estudantes',
      },
      {
        tag: 'Governo / Público',
        title: 'Plataforma Territorial MinInterior',
        description: 'Sistema para otimizar a relação entre o Ministério e autoridades locais.',
        challenge: 'Comunicação manual, descentralizada e sem rastreabilidade real.',
        result: 'Plataforma com acompanhamento total de comunicados, pesquisas e circulares.',
        metric: '-70%',
        metricLabel: 'Tempo de resposta',
      },
    ],
  },
  pain: {
    heading: 'Processos Opitech',
    points: [
      {
        category: 'Execução',
        title: 'Engenharia de conformidade',
        body: 'Reduzimos a distância entre suas ideias e a tecnologia. Garantimos que seu projeto cumpra o orçamento acordado e seja entregue no prazo, evitando atrasos desnecessários que freiam seu crescimento.',
      },
      {
        category: 'Dados',
        title: 'Visibilidade total e rastreabilidade',
        body: 'Conectamos todas as peças da sua operação para que nada fique oculto. Convertemos dados dispersos em uma visão clara do negócio, permitindo que você tome decisões seguras baseadas em fatos reais.',
      },
      {
        category: 'Talento',
        title: 'Potencial Otimizado',
        body: 'Libertamos sua equipe das tarefas técnicas desgastantes. Nós cuidamos da complexidade tecnológica para que seu time se concentre exclusivamente em gerar vantagem competitiva e capturar oportunidades de mercado.',
      },
    ],
  },
  metrics: {
    heading: 'OPI em números',
    subtitle: 'Métricas que refletem o impacto tangível da nossa forma de trabalhar.',
    ariaLabel: 'Métricas da OPI Technology',
    carouselAriaLabel: 'Navegação do carrossel de métricas',
    prevAriaLabel: 'Ver métricas anteriores',
    nextAriaLabel: 'Ver próximas métricas',
    pageGroupAriaLabel: 'Indicadores de página',
    items: [
      { suffix: '+', label: 'Anos de execução contínua', description: 'Construindo software de missão crítica sem interrupções desde 2019.' },
      { suffix: '+', label: 'Projetos em produção', description: 'Cada um operando em ambientes reais. Cada um com um cliente que endossa o resultado.' },
      { suffix: '%', label: 'Taxa de recontratação', description: '9 em cada 10 clientes optam por voltar. Confiança não se declara — se demonstra com contratos.' },
      { suffix: '+', label: 'Entidades de alto impacto', description: 'Instituições públicas que nos confiam seus sistemas mais sensíveis e regulados do país.' },
      { suffix: ' Milhões', label: 'De colombianos impactados', description: 'Os sistemas que construímos atendem cidadãos que dependem de serviços públicos essenciais.' },
      { suffix: '%', label: 'Disponibilidade garantida', description: 'Sistemas que não podem cair, operando com a solidez que a missão crítica exige.' },
      { suffix: '%', label: 'De projetos entregues', description: 'Sem projetos abandonados. Sem desculpas. O que acordamos, cumprimos.' },
      { suffix: '%', label: 'De eficiência operacional', description: 'Otimização real de custos e processos nos projetos de nossos clientes.' },
    ],
  },
  socialProof: {
    sectionAriaLabel: 'Empresas que confiam na OPI Technology',
    tagline: 'Empresas que confiam na OPI Technology',
    logosAriaLabel: 'Logos de clientes',
  },
  contact: {
    heading: 'Agende sua sessão técnica',
    subtitle: 'Selecione um especialista e reserve uma consultoria estratégica de 30 minutos.',
    step1: '1. SELECIONAR CONSULTOR',
    step2: '2. ESCOLHER DATA',
    step3: '3. SELECIONAR HORÁRIO',
    duration: '30 minutos • GMT+1',
    confirmBtn: 'Confirmar Reunião',
    prevMonth: 'Mês anterior',
    nextMonth: 'Próximo mês',
    weekDays: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
    currentMonth: 'Outubro 2024',
    consultants: [
      {
        role: 'Arquiteto de IA',
        quote: '"Analisaremos sua arquitetura atual para traçar um roadmap rumo ao próximo nível de impacto."',
      },
      {
        role: 'Especialista Cloud',
        quote: '"Avaliaremos suas necessidades de escalabilidade e desenharemos uma estratégia cloud otimizada."',
      },
      {
        role: 'Estratégia Digital',
        quote: '"Exploraremos como potencializar seus fluxos de trabalho atuais através de uma digitalização integral."',
      },
    ],
  },
  footer: {
    projectsHeading: 'PROJETOS',
    servicesHeading: 'SERVIÇOS',
    socialHeading: 'REDES',
    linkedinAriaLabel: 'LinkedIn',
    projects: ['Telecafé', 'Centus', 'Qr Supplies', 'ZUM', 'Uriel', 'Banco de projetos', 'Aplicação web CND'],
    services: [
      'Websites',
      'Aplicativos Móveis',
      'Suporte e Gestão Cloud',
      'Sistemas de Informação',
      'Cibersegurança',
      'DevOps',
      'Qualidade | QA',
      'Arquitetura Corporativa',
    ],
  },
};
