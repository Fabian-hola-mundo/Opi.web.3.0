import type { Translations } from './es';

export const EN: Translations = {
  header: {
    nav: {
      solutions: 'Solutions',
      cases: 'Success Cases',
      metrics: 'Metrics',
      contact: 'Contact',
    },
    cta: 'Schedule Meeting',
    themeToggle: { light: 'Switch to light mode', dark: 'Switch to dark mode' },
    langToggle: { switchTo: 'Cambiar a Español' },
  },
  hero: {
    headline: 'We build the software that sustains',
    headlineGradient: 'the core of your business.',
    subtitle: 'We design and develop technology that sustains real operations.',
    cta: 'Discover how we contribute to the industry',
    sectionAriaLabel: 'Main hero',
  },
  bridge: {
    eyebrow: 'Impact Portfolio',
    title: 'Success',
    titleGradient: 'Stories',
    subtitle:
      'Transforming complex challenges into high-performance architectures. Our methodology applied to software engineering.',
    challengeLabel: 'Challenge',
    resultLabel: 'Result',
    gridAriaLabel: 'Success cases',
    cases: [
      {
        tag: 'Government / Public Sector',
        title: 'Digitization of Fondo Nacional del Ahorro Channels',
        description:
          'Comprehensive redesign of the digital experience to eliminate access barriers and align the platform with the real needs of millions of users.',
        challenge:
          'Outdated digital channels created friction and access barriers, especially for users with limited digital experience.',
        result:
          'Renewed platform with intuitive navigation, greater accessibility and significant reduction of friction in key processes.',
        metric: '-60%',
        metricLabel: 'Friction in digital processes',
      },
      {
        tag: 'Financial / Public',
        title: 'FINAGRO Guarantees Platform',
        description: 'Centralized system for secure operations registration and monitoring.',
        challenge: 'Fragmented and manual processes with high control and audit risks.',
        result: 'Unified module platform with automation and full traceability.',
        metric: '-65%',
        metricLabel: 'Management time',
      },
      {
        tag: 'Education / EdTech',
        title: 'Intelligent LMS Ecosystem',
        description: 'LMS platform for adaptive and personalized experiences.',
        challenge: 'Lack of personalization, integrations and limited student management.',
        result: 'Scalable environment that improves interaction and content management.',
        metric: '+42%',
        metricLabel: 'Student retention',
      },
      {
        tag: 'Government / Public',
        title: 'MinInterior Territorial Platform',
        description: 'System to optimize the relationship between the Ministry and local authorities.',
        challenge: 'Manual, decentralized communication with no real traceability.',
        result: 'Platform with full tracking of communications, surveys and circulars.',
        metric: '-70%',
        metricLabel: 'Response time',
      },
    ],
  },
  pain: {
    heading: 'Opitech Processes',
    points: [
      {
        category: 'Execution',
        title: 'Compliance Engineering',
        body: 'We close the gap between your ideas and technology. We ensure your project meets the agreed budget and is delivered on time, avoiding unnecessary delays that hinder your growth.',
      },
      {
        category: 'Data',
        title: 'Full Visibility and Traceability',
        body: 'We connect all the pieces of your operation so nothing stays hidden. We turn scattered data into a clear business vision, enabling you to make decisions confidently based on real facts.',
      },
      {
        category: 'Talent',
        title: 'Optimized Potential',
        body: 'We free your team from the technical tasks that drain them. We handle the technological complexity so your people can focus exclusively on generating competitive advantage and capturing market opportunities.',
      },
    ],
  },
  metrics: {
    heading: 'OPI in numbers',
    subtitle: 'Metrics that reflect the tangible impact of our way of working.',
    ariaLabel: 'OPI Technology metrics',
    carouselAriaLabel: 'Metrics carousel navigation',
    prevAriaLabel: 'View previous metrics',
    nextAriaLabel: 'View next metrics',
    pageGroupAriaLabel: 'Page indicators',
    items: [
      { suffix: '+', label: 'Years of continuous delivery', description: 'Building mission-critical software without interruption since 2019.' },
      { suffix: '+', label: 'Projects in production', description: 'Each one operating in real environments. Each one with a client who backs the result.' },
      { suffix: '%', label: 'Rehiring rate', description: '9 out of 10 clients choose to come back. Trust is not declared — it is proven with contracts.' },
      { suffix: '+', label: 'High-impact entities', description: 'Public institutions that entrust us with their most sensitive and regulated systems in the country.' },
      { suffix: ' Million', label: 'Colombians impacted', description: 'The systems we build serve citizens who depend on essential public services.' },
      { suffix: '%', label: 'Guaranteed uptime', description: 'Systems that cannot go down, operating with the reliability that mission-critical demands.' },
      { suffix: '%', label: 'Projects delivered', description: 'No abandoned projects. No excuses. What we agree on, we deliver.' },
      { suffix: '%', label: 'Operational efficiency', description: 'Real cost and process optimization in our clients\' projects.' },
    ],
  },
  socialProof: {
    sectionAriaLabel: 'Companies that trust OPI Technology',
    tagline: 'Companies that trust OPI Technology',
    logosAriaLabel: 'Client logos',
  },
  contact: {
    heading: 'Schedule your technical session',
    subtitle: 'Select a specialist and book a 30-minute strategic consultation.',
    step1: '1. SELECT CONSULTANT',
    step2: '2. CHOOSE DATE',
    step3: '3. SELECT TIME',
    duration: '30 minutes • GMT+1',
    confirmBtn: 'Confirm Meeting',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    weekDays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    currentMonth: 'October 2024',
    consultants: [
      {
        role: 'AI Architect',
        quote: '"We will analyze your current architecture to map out a roadmap toward the next level of impact."',
      },
      {
        role: 'Cloud Specialist',
        quote: '"We will assess your scalability needs and design an optimized cloud strategy."',
      },
      {
        role: 'Digital Strategy',
        quote: '"We will explore how to enhance your current workflows through comprehensive digitalization."',
      },
    ],
  },
  footer: {
    projectsHeading: 'PROJECTS',
    servicesHeading: 'SERVICES',
    socialHeading: 'NETWORKS',
    linkedinAriaLabel: 'LinkedIn',
    projects: ['Telecafé', 'Centus', 'Qr Supplies', 'ZUM', 'Uriel', 'Project Bank', 'CND Web Application'],
    services: [
      'Web Pages',
      'Mobile Applications',
      'Cloud Support & Management',
      'Information Systems',
      'Cybersecurity',
      'DevOps',
      'Quality | QA',
      'Enterprise Architecture',
    ],
  },
};
