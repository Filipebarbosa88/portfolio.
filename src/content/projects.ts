export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  field: string;
  short: string;
  headline: string;
  intro: string;
  role: string;
  audience: string;
  stack: string[];
  site: string;
  repository: string;
  challenge: string[];
  approach: string;
  features: { title: string; description: string }[];
  decisions: { title: string; description: string }[];
  outcomes: string[];
  learning: string;
};

export const projects: Project[] = [
  {
    slug: 'alimenta',
    number: '01',
    title: 'ALIMENTA',
    category: 'Sistema de gestão',
    field: 'Operação de cantina',
    short: 'Da venda no caixa ao controle de estoque. Uma aplicação para acompanhar a rotina de uma cantina escolar.',
    headline: 'Vendas, produtos e estoque em uma aplicação.',
    intro: 'O ALIMENTA reúne vendas, produtos, estoque e relatórios em uma aplicação web utilizada na rotina de uma cantina escolar.',
    role: 'Interface, desenvolvimento e integração com Firebase',
    audience: 'Equipe responsável pelo caixa e pela gestão da cantina',
    stack: ['JavaScript', 'HTML', 'CSS', 'Firebase Auth', 'Firestore'],
    site: 'https://sistemalimenta.netlify.app',
    repository: '',
    challenge: [
      'Na cantina, atender no caixa e acompanhar os produtos fazem parte da mesma rotina. O sistema precisava aproximar essas tarefas e permitir que a equipe consultasse as informações sem interromper a operação.',
      'O uso acontece no computador e no celular, sem leitor de código de barras. Por isso, localizar um produto, registrar uma venda e consultar o histórico precisavam funcionar com poucos passos.',
    ],
    approach: 'Organizei a aplicação em torno do fluxo de venda: encontrar o produto, registrar a operação e acompanhar seus efeitos no estoque. Cadastros, categorias e relatórios complementam esse fluxo.',
    features: [
      { title: 'Caixa com busca', description: 'Localização de produtos por busca e filtros de categoria para apoiar o atendimento diário.' },
      { title: 'Produtos e estoque', description: 'Cadastro e edição de produtos, acompanhamento de estoque e baixa automática dos itens que compõem o kit lanche.' },
      { title: 'Histórico e relatórios', description: 'Consulta às vendas registradas e relatórios para acompanhar a operação, incluindo a visão mensal.' },
      { title: 'Acesso autenticado', description: 'Entrada por e-mail e senha, com login e logout integrados ao Firebase Authentication.' },
    ],
    decisions: [
      { title: 'Busca no centro do caixa', description: 'A ausência de um leitor de código de barras orientou a interface para a identificação dos produtos pela busca e pelas categorias.' },
      { title: 'Dados no Firestore', description: 'Produtos, vendas e informações de estoque ficam no banco de dados, permitindo consultar a operação pelos dispositivos usados pela equipe.' },
      { title: 'Evolução a partir do uso', description: 'O projeto recebeu ajustes no kit lanche, nos relatórios mensais e no carregamento inicial conforme as necessidades apareceram na rotina.' },
    ],
    outcomes: [
      'Aplicação utilizada no computador e no celular.',
      'Vendas, produtos, estoque e histórico reunidos na mesma ferramenta.',
      'Kit lanche incorporado ao fluxo, com custo diário e baixa de estoque.',
    ],
    learning: 'A proximidade com a operação trouxe critérios concretos para evoluir o sistema: o que facilita o atendimento, quais informações fazem falta e onde um erro interfere no trabalho da equipe.',
  },
  {
    slug: 'groove-harmonia',
    number: '02',
    title: 'Portal Groove Harmonia',
    category: 'Portal educacional',
    field: 'Escola de música',
    short: 'Alunos, professores e administração conectados por uma plataforma de aulas, presenças e materiais.',
    headline: 'Aulas, presenças e materiais para cada perfil.',
    intro: 'Um portal interno para a escola Groove Harmonia, com experiências próprias para administração, professores e alunos.',
    role: 'Interface, desenvolvimento em React e integração com Firebase',
    audience: 'Administração, professores e alunos da escola',
    stack: ['React', 'TypeScript', 'Vite', 'Firebase Auth', 'Firestore'],
    site: 'https://groove-harmonia-app.web.app',
    repository: '',
    challenge: [
      'A escola precisava organizar aulas, presenças e materiais em uma única ferramenta. Cada perfil, porém, participa de uma parte diferente dessa rotina.',
      'O professor acompanha seus alunos e distribui materiais; o aluno consulta o conteúdo que recebeu. A administração precisa de uma visão mais ampla para acompanhar as informações da escola.',
    ],
    approach: 'Estruturei o portal com três perfis de acesso e organizei as telas ao redor das responsabilidades de cada um. O vínculo entre professor, aluno e material orienta a apresentação do conteúdo.',
    features: [
      { title: 'Três perfis de acesso', description: 'Áreas para administrador, professor e aluno, com funcionalidades adequadas a cada papel.' },
      { title: 'Registro de presença', description: 'Aulas registradas como presente, faltou ou cancelada, com consulta por professor e mês.' },
      { title: 'Materiais atribuídos', description: 'O professor seleciona materiais para seus alunos, que consultam apenas o conteúdo atribuído a eles.' },
      { title: 'Busca e acompanhamento', description: 'Filtros por mês e professor, além de busca por aluno, instrumento e conteúdo para localizar informações.' },
    ],
    decisions: [
      { title: 'Interface guiada por papéis', description: 'As responsabilidades de administrador, professor e aluno definem a organização das telas e das ações disponíveis.' },
      { title: 'React e TypeScript', description: 'A aplicação usa componentes React e TypeScript para estruturar a interface e os dados usados nas telas do portal.' },
      { title: 'Materiais vinculados aos alunos', description: 'A atribuição conecta o acervo da escola à rotina individual de estudo, mantendo o conteúdo relevante no espaço de cada aluno.' },
    ],
    outcomes: [
      'Portal concluído com áreas de administração, professor e aluno.',
      'Registro de aulas e presenças com acompanhamento mensal.',
      'Distribuição de materiais integrada ao vínculo entre professores e alunos.',
    ],
    learning: 'Minha experiência como professor ajudou a reconhecer as diferenças entre organizar a escola, conduzir uma aula e estudar. Essas perspectivas orientaram o desenho dos fluxos de cada perfil.',
  },
  {
    slug: 'sidnei-consorcios',
    number: '03',
    title: 'Sidnei Consórcios',
    category: 'Site institucional',
    field: 'Serviços de consórcio',
    short: 'Site comercial com consulta de cartas contempladas, perguntas frequentes e contato direto com o consultor.',
    headline: 'Serviços e cartas contempladas ao alcance do cliente.',
    intro: 'Site comercial de Sidnei Consórcios, com entrada para simulação, consulta de cartas contempladas, perguntas frequentes e contato pelo WhatsApp.',
    role: 'Desenvolvimento do site',
    audience: 'Pessoas interessadas nos serviços de consórcio',
    stack: [],
    site: 'https://sidneiconsorcios.com',
    repository: '',
    challenge: [
      'Quem procura um consórcio pode chegar com objetivos diferentes: entender o serviço, consultar uma carta contemplada ou iniciar uma simulação. O site precisava dar espaço a esses caminhos e manter o contato acessível.',
      'Além da apresentação comercial, era necessário organizar informações como crédito, entrada, prazo e parcela, sem perder a conexão com a identidade e o atendimento do consultor.',
    ],
    approach: 'Organizei a experiência em uma página de apresentação, uma área de cartas contempladas e seções de apoio. A seleção de interesse aparece na abertura, enquanto as informações detalhadas e o WhatsApp dão continuidade ao percurso.',
    features: [
      { title: 'Entrada para simulação', description: 'Seleção entre imóvel e veículo, ajuste do valor de crédito e chamada para iniciar a simulação na página inicial.' },
      { title: 'Cartas contempladas', description: 'Tabela com tipo, crédito, entrada, prazo, parcela e administradora, com botão de interesse em cada linha.' },
      { title: 'Perguntas frequentes', description: 'Dúvidas sobre carta de crédito, grupo, lance e outros conceitos apresentadas em blocos expansíveis.' },
      { title: 'Apresentação e atendimento', description: 'Seção sobre o consultor, informações de atendimento e acesso ao WhatsApp ao longo do site.' },
    ],
    decisions: [
      { title: 'Comparação em tabela', description: 'Os atributos das cartas contempladas aparecem nas mesmas colunas, facilitando a leitura das diferentes ofertas.' },
      { title: 'Detalhes sob demanda', description: 'As respostas ficam organizadas em blocos expansíveis, para consultar cada dúvida sem transformar a seção em um bloco extenso de texto.' },
      { title: 'Contato ao alcance', description: 'A presença do WhatsApp nas diferentes telas aproxima a consulta de informações do atendimento comercial.' },
    ],
    outcomes: [
      'Site concluído para Sidnei Consórcios.',
      'Apresentação comercial, consulta de cartas e perguntas frequentes organizadas no site.',
      'Caminhos de simulação e atendimento visíveis na experiência do visitante.',
    ],
    learning: 'Este projeto ampliou minha experiência para uma necessidade diferente dos sistemas internos: apresentar um negócio e ajudar o visitante a encontrar seu próximo passo.',
  },
];

export function getProject(path: string) {
  return projects.find(project => path.replace(/\/$/, '') === `/projetos/${project.slug}`);
}

export function getPageMeta(path: string) {
  const project = getProject(path);
  return project
    ? { title: `${project.title} — Filipe Barbosa`, description: project.intro }
    : path === '/'
      ? { title: 'Filipe Barbosa — Desenvolvedor web', description: 'Desenvolvimento web com foco no uso real. Conheça ALIMENTA, Portal Groove Harmonia e Sidnei Consórcios, projetos de Filipe Barbosa.' }
      : { title: 'Página não encontrada — Filipe Barbosa', description: 'Volte ao portfólio de Filipe Barbosa para conhecer os projetos de desenvolvimento web.' };
}
