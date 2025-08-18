// Este é o nosso "cérebro" inicial, a nossa função de IA.
// Por enquanto, ele não é muito inteligente. Ele sempre devolve a mesma resposta.
// Isso serve para a gente testar a conexão entre o site e a função.

exports.handler = async function (event, context) {
  // O código do seu site (frontend) envia a busca para nós.
  // Por enquanto, vamos ignorar a busca e sempre responder a mesma coisa.

  const fakeProductData = {
    productName: "Super Nintendo (Resultado de Teste)",
    description: "Um console de videogame de 16-bits lançado nos anos 90, famoso por jogos como Super Mario World e Zelda. Esta é uma resposta de teste para garantir que nosso site está se comunicando com a função de IA.",
    suggestions: [
      "Verifique a condição do cartucho",
      "Confirme se os cabos são originais",
      "Teste com jogos diferentes"
    ],
    trustScore: 8.5,
    listings: [
      {
        platform: "Mercado Livre",
        title: "Super Nintendo Clássico",
        seller: "RetroGamerSP",
        price: "R$ 450,00",
        reliability: 9,
        url: "https://www.mercadolivre.com.br"
      }
    ],
    reviews: [
      {
        source: "Canal Nostalgia (YouTube)",
        snippet: "Um dos melhores consoles de todos os tempos...",
        url: "https://www.youtube.com"
      }
    ],
    videos: [
      {
        channel: "Retro Voxel",
        title: "Análise Completa do Super Nintendo em 2025",
        url: "https://www.youtube.com"
      }
    ]
  };

  // Aqui, nós enviamos a resposta de volta para o seu site.
  return {
    statusCode: 200, // Código 200 significa "Tudo correu bem"
    body: JSON.stringify(fakeProductData) // Convertendo nossos dados para o formato de texto JSON
  };
};
