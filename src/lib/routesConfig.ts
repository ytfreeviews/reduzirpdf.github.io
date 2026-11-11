import { TargetSizePresetId } from '../types';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageConfig {
  path: string;
  defaultPreset: TargetSizePresetId;
  title: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  introDescription: string;
  useCasesTitle: string;
  useCases: {
    title: string;
    description: string;
    icon: 'file' | 'shield' | 'mail' | 'building' | 'briefcase' | 'scale';
  }[];
  faqs: FAQItem[];
  relatedPresetPaths: { path: string; label: string; bytesLabel: string }[];
}

export const PAGES_CONFIG: Record<string, PageConfig> = {
  '/': {
    path: '/',
    defaultPreset: '500kb',
    title: 'ReduzirPDF – Comprimir PDF para Tamanho Exato Online Grátis',
    metaDescription: 'Reduza o tamanho do seu PDF grátis para 100 KB, 200 KB, 500 KB, 1 MB ou personalizado. Rápido, seguro e 100% no seu navegador sem enviar arquivos para servidor.',
    h1: 'Reduza o tamanho do seu PDF grátis',
    tagline: 'Reduza seu PDF para o tamanho que você precisa.',
    introDescription: 'Precisa enviar um PDF, mas o arquivo está muito grande? Com o ReduzirPDF, você pode comprimir seu documento para o tamanho que precisa. Escolha entre 100 KB, 200 KB, 500 KB, 1 MB ou 2 MB, ou informe um tamanho personalizado. Tudo acontece diretamente no seu navegador, sem cadastro e sem enviar seus arquivos para um servidor.',
    useCasesTitle: 'Onde usar o PDF reduzido?',
    useCases: [
      {
        title: 'Sistemas Públicos e Concursos',
        description: 'Muitos editais e portais como gov.br, INSS, Prouni e SISU limitam o tamanho de anexos a 200 KB ou 500 KB.',
        icon: 'building'
      },
      {
        title: 'Envio de Currículos e Vagas de Emprego',
        description: 'Plataformas de RH (como Gupy e Vagas.com) frequentemente rejeitam currículos acima de 500 KB ou 1 MB.',
        icon: 'briefcase'
      },
      {
        title: 'Portais Jurídicos e Tribunais (PJe / e-SAJ)',
        description: 'Sistemas de peticionamento eletrônico costumam exigir petições e certidões compactadas com limites rigorosos.',
        icon: 'scale'
      },
      {
        title: 'Anexos de E-mail sem Falhas',
        description: 'Evite mensagens de erro de "arquivo muito grande" ao anexar documentos importantes no Gmail, Outlook ou corporativos.',
        icon: 'mail'
      }
    ],
    faqs: [
      {
        question: 'Como reduzir o tamanho de um PDF?',
        answer: 'Basta selecionar ou arrastar seu arquivo PDF na caixa acima, escolher o tamanho desejado (por exemplo, 500 KB, 200 KB ou 100 KB) e clicar em "Comprimir PDF". O processamento é realizado no seu dispositivo e o download fica disponível imediatamente.'
      },
      {
        question: 'Como comprimir um PDF para 1 MB?',
        answer: 'Selecione a opção "1 MB" no seletor de tamanho alvo. O motor do ReduzirPDF otimizará as imagens e fluxos do documento para que o arquivo final fique rigorosamente com 1 MB (1.048.576 bytes) ou menos.'
      },
      {
        question: 'É possível comprimir um PDF para 100 KB?',
        answer: 'Sim, desde que a quantidade de páginas e elementos permita atingir esse tamanho sem tornar o texto ilegível. Para documentos de 1 a 3 páginas, a redução para 100 KB costuma funcionar muito bem. Se o documento tiver muitas páginas, o sistema indicará o menor tamanho seguro para manter a legibilidade.'
      },
      {
        question: 'O ReduzirPDF é gratuito?',
        answer: 'Sim, o ReduzirPDF é 100% gratuito. Você não precisa pagar nada, não precisa criar conta e não há limites diários de uso.'
      },
      {
        question: 'Meus arquivos são enviados para algum servidor?',
        answer: 'Não. Ao contrário da maioria dos conversores online, o ReduzirPDF utiliza tecnologias modernas do seu navegador (WebAssembly, PDF.js e Canvas API) para inspecionar e comprimir o documento diretamente no seu celular ou computador. Seus dados nunca saem do seu dispositivo.'
      },
      {
        question: 'A compressão reduz a qualidade do documento?',
        answer: 'O sistema tenta primeiro uma otimização sem perdas. Se o limite desejado for muito pequeno, é aplicada compressão adaptativa nas imagens para atingir o tamanho exato solicitado. O sistema possui travas de segurança para nunca destruir a legibilidade das letras.'
      }
    ],
    relatedPresetPaths: [
      { path: '/comprimir-pdf-para-100kb', label: 'Comprimir para 100 KB', bytesLabel: '100 KB' },
      { path: '/comprimir-pdf-para-200kb', label: 'Comprimir para 200 KB', bytesLabel: '200 KB' },
      { path: '/comprimir-pdf-para-500kb', label: 'Comprimir para 500 KB', bytesLabel: '500 KB' },
      { path: '/comprimir-pdf-para-1mb-gratis', label: 'Comprimir para 1 MB', bytesLabel: '1 MB' },
      { path: '/compactar-pdf-para-enviar', label: 'Compactar para E-mail', bytesLabel: 'E-mail' },
      { path: '/diminuir-tamanho-de-pdf', label: 'Diminuir Tamanho de PDF', bytesLabel: 'Geral' }
    ]
  },
  '/comprimir-pdf-para-100kb': {
    path: '/comprimir-pdf-para-100kb',
    defaultPreset: '100kb',
    title: 'Comprimir PDF para 100 KB Online Grátis – ReduzirPDF',
    metaDescription: 'Comprima seu arquivo PDF para menos de 100 KB online e grátis. Ideal para peticionamento eletrônico, tribunais, órgãos públicos e portais estaduais.',
    h1: 'Comprimir PDF para 100 KB grátis',
    tagline: 'O limite mais rigoroso para sistemas judiciais e formulários públicos.',
    introDescription: 'Muitos portais públicos, sistemas judiciários (e-SAJ, PJe) e cadastros governamentais exigem documentos com no máximo 100 KB. Com o ReduzirPDF, você comprime seu documento diretamente no navegador até atingir esse limite com a máxima legibilidade possível.',
    useCasesTitle: 'Quando você precisa de um PDF com até 100 KB?',
    useCases: [
      {
        title: 'Tribunais e Peticionamento Eletrônico',
        description: 'Vários sistemas do poder judiciário brasileiro limitam certidões e peças a exatos 100 KB por arquivo.',
        icon: 'scale'
      },
      {
        title: 'Cadastros e Portais Municipais',
        description: 'Sistemas legados de prefeituras frequentemente recusam arquivos maiores que 100 KB em comprovantes de residência.',
        icon: 'building'
      },
      {
        title: 'Formulários Web Antigos',
        description: 'Submissão de documentos escaneados e identidades (RG, CPF) em portais acadêmicos ou vestibulares.',
        icon: 'file'
      }
    ],
    faqs: [
      {
        question: 'Como faço para um PDF ficar com menos de 100 KB?',
        answer: 'Basta enviar seu documento acima com a opção de 100 KB selecionada. Nosso motor aplicará compressão otimizada de resolução e matriz de cor para encaixar o arquivo no teto de 102.400 bytes.'
      },
      {
        question: 'O texto continuará legível após comprimir para 100 KB?',
        answer: 'Para documentos de 1 a 3 páginas com texto escaneado ou formulários, o texto permanece completamente legível. Em documentos com dezenas de páginas, o sistema avisará caso o limite de segurança seja atingido.'
      },
      {
        question: 'Preciso instalar algum aplicativo?',
        answer: 'Não. Todo o processo funciona de forma nativa no navegador do seu smartphone Android, iPhone ou computador.'
      }
    ],
    relatedPresetPaths: [
      { path: '/comprimir-pdf-para-200kb', label: 'Comprimir para 200 KB', bytesLabel: '200 KB' },
      { path: '/comprimir-pdf-para-500kb', label: 'Comprimir para 500 KB', bytesLabel: '500 KB' },
      { path: '/comprimir-pdf-para-1mb-gratis', label: 'Comprimir para 1 MB', bytesLabel: '1 MB' },
      { path: '/', label: 'Todos os Tamanhos', bytesLabel: 'Início' }
    ]
  },
  '/comprimir-pdf-para-200kb': {
    path: '/comprimir-pdf-para-200kb',
    defaultPreset: '200kb',
    title: 'Comprimir PDF para 200 KB Grátis – ReduzirPDF',
    metaDescription: 'Reduza o tamanho do seu PDF para até 200 KB online. Perfeito para INSS, Prouni, SISU, Fies e sistemas do governo federal.',
    h1: 'Comprimir PDF para 200 KB grátis',
    tagline: 'O padrão exigido pelos principais serviços públicos federais.',
    introDescription: 'Portais como Meu INSS, Prouni, SISU e sistemas de matrícula universitária no Brasil frequentemente estabelecem 200 KB como o teto máximo de upload para cada documento. Reduza seus comprovantes e certidões com total segurança e rapidez.',
    useCasesTitle: 'Onde o limite de 200 KB é exigido?',
    useCases: [
      {
        title: 'Meu INSS e Perícias Médicas',
        description: 'O envio de laudos, declarações e carteiras de trabalho no portal Meu INSS exige arquivos leves.',
        icon: 'shield'
      },
      {
        title: 'Prouni, SISU e FIES (MEC)',
        description: 'As etapas de comprovação de renda e documentação familiar solicitam arquivos de até 200 KB por página.',
        icon: 'building'
      },
      {
        title: 'Comprovantes de Matrícula',
        description: 'Universidades públicas e faculdades privadas utilizam o teto de 200 KB para evitar sobrecarga nos servidores.',
        icon: 'file'
      }
    ],
    faqs: [
      {
        question: 'Como comprimir para 200 KB para o Meu INSS?',
        answer: 'Selecione a opção 200 KB nesta página, escolha a foto ou documento escaneado e clique em Comprimir. O PDF gerado respeita o limite do portal do INSS.'
      },
      {
        question: 'O arquivo fica exatamente com 200 KB?',
        answer: 'Ele fica com no máximo 200 KB (204.800 bytes). Se for possível deixá-lo menor preservando a nitidez, o sistema garante que nunca ultrapassará essa marca.'
      }
    ],
    relatedPresetPaths: [
      { path: '/comprimir-pdf-para-100kb', label: 'Comprimir para 100 KB', bytesLabel: '100 KB' },
      { path: '/comprimir-pdf-para-500kb', label: 'Comprimir para 500 KB', bytesLabel: '500 KB' },
      { path: '/comprimir-pdf-para-1mb-gratis', label: 'Comprimir para 1 MB', bytesLabel: '1 MB' },
      { path: '/', label: 'Todos os Tamanhos', bytesLabel: 'Início' }
    ]
  },
  '/comprimir-pdf-para-500kb': {
    path: '/comprimir-pdf-para-500kb',
    defaultPreset: '500kb',
    title: 'Comprimir PDF para 500 KB Online – ReduzirPDF',
    metaDescription: 'Diminua seu PDF para até 500 KB grátis no navegador. O tamanho ideal para currículos, processos seletivos e formulários de RH.',
    h1: 'Comprimir PDF para 500 KB',
    tagline: 'O equilíbrio perfeito entre excelente nitidez e tamanho reduzido.',
    introDescription: '500 KB é o tamanho ouro para envio de currículos em plataformas de recrutamento (Gupy, Kenoby, Vagas.com, LinkedIn) e formulários de RH. Mantém tipografia nítida, fotos profissionais e formatação impecável sem estourar o limite de upload.',
    useCasesTitle: 'Vantagens do alvo de 500 KB',
    useCases: [
      {
        title: 'Currículos e Portfólios Resumidos',
        description: 'Mantenha as fontes vetoriais ou a nitidez fotográfica da foto de perfil sem ultrapassar o limite do portal de vagas.',
        icon: 'briefcase'
      },
      {
        title: 'Contratos e Declarações Assinadas',
        description: 'Ideal para documentos com múltiplas páginas assinadas e rubricadas que precisam ser enviadas para clientes.',
        icon: 'file'
      },
      {
        title: 'Envio por Aplicativos de Mensagem',
        description: 'Documentos de 500 KB carregam instantaneamente no WhatsApp e Telegram, mesmo em conexões móveis 3G/4G.',
        icon: 'mail'
      }
    ],
    faqs: [
      {
        question: 'Por que 500 KB é o tamanho mais recomendado para currículos?',
        answer: 'Porque a maioria dos sistemas de rastreamento de candidatos (ATS) aceita arquivos de até 500 KB sem aplicar compressão secundária destrutiva que borre as palavras.'
      },
      {
        question: 'Quantas páginas posso comprimir para 500 KB?',
        answer: 'Documentos típicos de 1 a 10 páginas alcançam facilmente a faixa de 500 KB com qualidade visual impecável.'
      }
    ],
    relatedPresetPaths: [
      { path: '/comprimir-pdf-para-200kb', label: 'Comprimir para 200 KB', bytesLabel: '200 KB' },
      { path: '/comprimir-pdf-para-1mb-gratis', label: 'Comprimir para 1 MB', bytesLabel: '1 MB' },
      { path: '/compactar-pdf-para-enviar', label: 'Compactar para E-mail', bytesLabel: 'E-mail' },
      { path: '/', label: 'Todos os Tamanhos', bytesLabel: 'Início' }
    ]
  },
  '/comprimir-pdf-para-1mb-gratis': {
    path: '/comprimir-pdf-para-1mb-gratis',
    defaultPreset: '1mb',
    title: 'Comprimir PDF para 1 MB Grátis Online – ReduzirPDF',
    metaDescription: 'Reduza arquivos PDF pesados para até 1 MB grátis. Ideal para apresentações, relatórios com gráficos, catálogos e monografias.',
    h1: 'Comprimir PDF para 1 MB grátis',
    tagline: 'Alta fidelidade visual para relatórios e documentos volumosos.',
    introDescription: 'Tem um PDF pesado com 10 MB, 20 MB ou mais cheio de fotos e gráficos? Com a opção de 1 MB, você reduz drasticamente o peso do arquivo enquanto preserva detalhes visuais, esquemas técnicos e leitura confortável.',
    useCasesTitle: 'Onde aplicar a compressão para 1 MB?',
    useCases: [
      {
        title: 'Apresentações e Propostas Comerciais',
        description: 'Slides convertidos para PDF costumam ficar enormes. Com 1 MB, seu cliente abre a proposta rapidamente no smartphone.',
        icon: 'briefcase'
      },
      {
        title: 'Trabalhos Acadêmicos e TCCs',
        description: 'Portais de repositório universitário e bancas virtuais costumam ter travas em anexos volumosos.',
        icon: 'building'
      },
      {
        title: 'Anexos de E-mail Corporativo',
        description: 'Servidores corporativos frequentemente bloqueiam anexos que ultrapassam cotas padrão.',
        icon: 'mail'
      }
    ],
    faqs: [
      {
        question: 'Quantos megabytes consigo reduzir para 1 MB?',
        answer: 'Arquivos gerados a partir de scanners ou fotos de celular com 15 MB ou 30 MB frequentemente podem ser reduzidos para 1 MB sem perda perceptível de legibilidade.'
      },
      {
        question: 'Existe limite de páginas para 1 MB?',
        answer: 'Documentos de 10, 20 ou até 50 páginas com texto podem ser facilmente compactados para menos de 1 MB.'
      }
    ],
    relatedPresetPaths: [
      { path: '/comprimir-pdf-para-500kb', label: 'Comprimir para 500 KB', bytesLabel: '500 KB' },
      { path: '/comprimir-pdf-para-200kb', label: 'Comprimir para 200 KB', bytesLabel: '200 KB' },
      { path: '/compactar-pdf-para-enviar', label: 'Compactar para E-mail', bytesLabel: 'E-mail' },
      { path: '/', label: 'Todos os Tamanhos', bytesLabel: 'Início' }
    ]
  },
  '/compactar-pdf-para-enviar': {
    path: '/compactar-pdf-para-enviar',
    defaultPreset: '1mb',
    title: 'Compactar PDF para Enviar por E-mail ou WhatsApp – ReduzirPDF',
    metaDescription: 'Compacte seu PDF para enviar por e-mail ou WhatsApp sem erros de anexo muito grande. 100% grátis e processado no navegador.',
    h1: 'Compactar PDF para enviar',
    tagline: 'Acabe com o erro de "anexo muito grande" ao enviar documentos.',
    introDescription: 'Muitos serviços de e-mail e mensageiros impõem limites rígidos no tamanho dos anexos ou demoram minutos para fazer o upload em conexões móveis. Reduza o PDF para o tamanho exato necessário para envio imediato.',
    useCasesTitle: 'Por que compactar antes de enviar?',
    useCases: [
      {
        title: 'Evitar Devolução de Mensagens (Bounce)',
        description: 'Servidores de correio eletrônico de empresas e repartições rejeitam e-mails com anexos pesados sem aviso prévio ao destinatário.',
        icon: 'mail'
      },
      {
        title: 'Economia de Franquia de Dados',
        description: 'Facilita a abertura do documento por quem está no celular utilizando pacote de dados móveis no Brasil.',
        icon: 'shield'
      },
      {
        title: 'Upload Rápido em Formulários',
        description: 'Uploads rápidos reduzem o risco de expiração de sessão (timeout) em formulários online.',
        icon: 'file'
      }
    ],
    faqs: [
      {
        question: 'Qual o melhor tamanho para enviar PDF por e-mail?',
        answer: 'Recomendamos entre 500 KB e 1 MB. Esse tamanho garante nitidez absoluta e passa com facilidade em qualquer servidor de e-mail moderno.'
      },
      {
        question: 'Como enviar o PDF compactado pelo celular?',
        answer: 'Após a compressão no ReduzirPDF, toque em "Baixar PDF comprimido". O arquivo será salvo na pasta Downloads do seu smartphone e estará pronto para ser anexado.'
      }
    ],
    relatedPresetPaths: [
      { path: '/comprimir-pdf-para-500kb', label: 'Comprimir para 500 KB', bytesLabel: '500 KB' },
      { path: '/comprimir-pdf-para-1mb-gratis', label: 'Comprimir para 1 MB', bytesLabel: '1 MB' },
      { path: '/diminuir-tamanho-de-pdf', label: 'Diminuir Tamanho de PDF', bytesLabel: 'Geral' },
      { path: '/', label: 'Todos os Tamanhos', bytesLabel: 'Início' }
    ]
  },
  '/diminuir-tamanho-de-pdf': {
    path: '/diminuir-tamanho-de-pdf',
    defaultPreset: '500kb',
    title: 'Diminuir Tamanho de PDF Online Grátis – ReduzirPDF',
    metaDescription: 'Aprenda e diminua o tamanho do seu arquivo PDF grátis sem perder qualidade e sem enviar documentos para servidores externos.',
    h1: 'Diminuir tamanho de PDF online',
    tagline: 'Ferramenta rápida, privativa e sem limites de uso.',
    introDescription: 'Arquivos PDF podem ficar excessivamente pesados por conterem imagens não otimizadas, elementos desnecessários ou resoluções acima do padrão de tela. O ReduzirPDF recalcula e reprocessa cada elemento para deixar o arquivo leve e compatível.',
    useCasesTitle: 'Como o tamanho do PDF é reduzido?',
    useCases: [
      {
        title: 'Otimização Estrutural de Objetos',
        description: 'Remove referências duplicadas e metadados obsoletos preservando todo o conteúdo original.',
        icon: 'shield'
      },
      {
        title: 'Reamostragem Inteligente de Fotos',
        description: 'Ajusta a densidade de pixels de imagens pesadas para os padrões ideais de leitura em telas e impressões simples.',
        icon: 'file'
      },
      {
        title: 'Compactação de Fluxos de Dados',
        description: 'Aplica algoritmos de compactação de fluxo com object streams para empacotar o arquivo.',
        icon: 'briefcase'
      }
    ],
    faqs: [
      {
        question: 'Por que o PDF gerado pelo celular fica tão pesado?',
        answer: 'Câmeras modernas de celular tiram fotos com resoluções de 12 a 50 megapixels. Quando transformadas em PDF, uma única foto pode ultrapassar 8 MB. O ReduzirPDF reajusta a resolução para o padrão de documento.'
      },
      {
        question: 'Existe risco de perder alguma página do documento?',
        answer: 'Não. O ReduzirPDF processa rigorosamente todas as páginas, preservando a numeração, ordem e orientação (retrato ou paisagem).'
      }
    ],
    relatedPresetPaths: [
      { path: '/comprimir-pdf-para-100kb', label: 'Comprimir para 100 KB', bytesLabel: '100 KB' },
      { path: '/comprimir-pdf-para-200kb', label: 'Comprimir para 200 KB', bytesLabel: '200 KB' },
      { path: '/comprimir-pdf-para-500kb', label: 'Comprimir para 500 KB', bytesLabel: '500 KB' },
      { path: '/', label: 'Todos os Tamanhos', bytesLabel: 'Início' }
    ]
  }
};
