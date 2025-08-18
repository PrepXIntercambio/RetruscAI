// Este é o nosso "cérebro" inicial, agora com o "crachá de autorização" (headers)
// para que o site no GitHub possa conversar com ele.

exports.handler = async function (event, context) {
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

  // Aqui está a MÁGICA! O "crachá de autorização".
  const headers = {
    'Access-Control-Allow-Origin': '*', // Permite que qualquer site acesse (ótimo para testes)
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Enviamos a resposta com os dados E o crachá.
  return {
    statusCode: 200,
    headers: headers, // << A LINHA NOVA E IMPORTANTE!
    body: JSON.stringify(fakeProductData)
  };
};
