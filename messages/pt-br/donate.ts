export const donateMessages = {
  hero: {
    title: "Doe e ajude a manter o abrigo",
    subtitle: "Sua doação vira ração, vacinas e cuidados veterinários.",
    primaryCta: "Doar via PIX",
    secondaryCta: "Ver transparência",
    metrics: {
      inTreatment: "Animais em tratamento",
      monthlyCosts: "Gastos do mês",
      adopted: "Adotados",
    },
  },
  common: {
    retry: "Tentar novamente",
  },
  pix: {
    title: "Doação via PIX",
    subtitle: "Copie a chave ou use o QR code para doar em menos de 1 minuto.",
    keyLabel: "Chave PIX",
    keyDescription:
      "Use o botão abaixo para copiar e concluir o pagamento no seu banco.",
    copyButton: "Copiar chave",
    copySuccess: "Chave PIX copiada com sucesso!",
    copyError: "Não foi possível copiar a chave. Tente novamente.",
    pixInputAriaLabel: "Chave PIX para doação",
    copyAriaLabel: "Copiar chave PIX",
    whatsappButton: "Abrir WhatsApp",
    whatsappAriaLabel: "Abrir WhatsApp para enviar comprovante da doação",
    whatsappPrefilledMessage:
      "Olá! Acabei de fazer uma doação via PIX ({pixKey}) e quero enviar o comprovante.",
    proofHint:
      "Se puder, envie o comprovante pelo WhatsApp para agilizar nosso controle.",
    qrAlt: "QR code para doação via PIX",
    noQr: "QR code indisponível",
    tiersTitle: "Escolha um valor sugerido",
    tierCta: "Copiar chave e doar",
    errorTitle: "Não conseguimos carregar os dados de doação",
    errorDescription: "Verifique sua conexão e tente novamente.",
    bankAccountPrefix: "Conta bancária alternativa:",
  },
  recurring: {
    title: "Doação recorrente",
    description:
      "Apoio mensal nos ajuda a planejar resgates e tratamentos com mais segurança.",
    monthlyCta: "Quero doar mensalmente",
    scheduledPixCta: "Como fazer PIX agendado",
    comingSoon: "Estamos estruturando nossa plataforma de apoio mensal.",
    notifyCta: "Quero ser avisado",
  },
  items: {
    title: "Outras formas de ajudar",
    cards: {
      items: {
        title: "Doação de ração e itens",
        description:
          "Também aceitamos doações de produtos para o dia a dia do abrigo.",
        acceptedList: [
          "Ração seca e úmida (cães e gatos)",
          "Tapetes higiênicos e areia",
          "Medicamentos veterinários (validade vigente)",
          "Produtos de limpeza e mantas",
        ],
      },
      volunteer: {
        title: "Voluntariado",
        description:
          "Ajude em eventos, transporte, banho e socialização dos animais.",
        cta: "Quero ser voluntário",
      },
      foster: {
        title: "Lar temporário",
        description:
          "Receba um animal por um período e ajude na recuperação até a adoção.",
        cta: "Quero oferecer lar temporário",
      },
      bazaar: {
        title: "Bazar solidário",
        description:
          "Comprando no bazar, você apoia diretamente os custos do abrigo.",
        cta: "Ir para o bazar",
      },
    },
  },
  impact: {
    title: "Para onde vai sua doação",
    cards: [
      {
        title: "Ração",
        description:
          "Garantimos alimentação diária para cães e gatos em diferentes fases.",
      },
      {
        title: "Vacinas",
        description:
          "Mantemos o calendário vacinal em dia para proteger os animais.",
      },
      {
        title: "Consultas",
        description:
          "Cobrimos consultas, exames e tratamentos veterinários contínuos.",
      },
      {
        title: "Resgates",
        description:
          "Viabilizamos transporte, primeiros cuidados e acolhimento emergencial.",
      },
    ],
    storiesTitle: "Histórias possíveis com a sua ajuda",
    storiesEmpty: "Novas histórias em breve.",
  },
  transparency: {
    title: "Transparência",
    subtitle: "Veja um resumo mensal de arrecadação e despesas do abrigo.",
    cta: "Ver relatório completo",
    raisedLabel: "Arrecadado no mês",
    spentLabel: "Gasto no mês",
    balanceLabel: "Saldo do mês",
    monthLabelPrefix: "Período:",
    destinationHint: "Ração, vacinas, consultas e resgates.",
    updatedAtPrefix: "Última atualização:",
    lastExpensesTitle: "Últimas despesas",
    errorTitle: "Resumo de transparência indisponível",
    errorDescription:
      "Não foi possível carregar os dados de transparência agora.",
  },
  faq: {
    title: "Perguntas frequentes sobre doação",
    contactCta: "Fale com a gente",
    items: [
      {
        question: "Como envio comprovante?",
        answer:
          "Após doar, você pode enviar o comprovante pelo WhatsApp para agilizar nossa confirmação.",
      },
      {
        question: "Aceitam doação de itens?",
        answer:
          "Sim. Recebemos ração, medicamentos dentro da validade, produtos de limpeza e outros itens de cuidado.",
      },
      {
        question: "Posso doar mensalmente?",
        answer:
          "Sim. Se a opção de apoio mensal estiver ativa, você pode usar o link da seção de recorrência ou configurar PIX agendado no banco.",
      },
      {
        question: "A doação tem destino específico?",
        answer:
          "Priorizamos as necessidades mais urgentes do abrigo: alimentação, saúde veterinária e resgates.",
      },
      {
        question: "Como funciona a transparência?",
        answer:
          "Publicamos resumos de arrecadação, despesas e saldo para que você acompanhe a aplicação dos recursos.",
      },
    ],
  },
};
