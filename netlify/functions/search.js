// Importa o SDK do Google Generative AI
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Pega a chave da API que guardamos no "cofre" do Netlify
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Este é o nosso "Super Prompt", a receita secreta do RetruscAI
const masterPrompt = `
Aja como um consultor especialista em produtos retrô e um historiador de cultura pop para um site chamado RetruscAI. Sua missão é criar um dossiê completo e profissional para o usuário. A resposta DEVE ser um objeto JSON.

Para o produto pesquisado, siga estas regras RIGOROSAMENTE:

1.  **Análise do Produto (analysis):** Escreva uma análise detalhada e envolvente sobre o produto. Inclua seu ano de lançamento, impacto cultural, modelos icônicos e por que ele é um item de colecionador hoje. O texto deve ser profissional e informativo.
2.  **Imagem Gerada (generatedImagePrompt):** Crie uma descrição curta e artística para uma IA de imagem gerar uma arte conceitual do produto. Exemplo: "Arte estilizada de um Walkman Sony TPS-L2 azul e prata, estilo anos 80".
3.  **Vídeo do YouTube (youtubeVideoId):** Encontre o ID de um vídeo relevante e de alta qualidade no YouTube (um documentário, review profundo ou história do produto). Forneça APENAS o ID do vídeo, não a URL completa.
4.  **Guia de Compra (shoppingGuide):** Dê dicas essenciais sobre o que um comprador deve verificar antes de adquirir o produto usado. Seja específico sobre pontos fracos, testes a serem feitos e sinais de boa conservação.
5.  **Dicas de Manutenção (careTips):** Forneça um guia prático de cuidados para manter o produto funcionando e bem conservado.
6.  **Ranking de Lojas (listings):** Crie uma lista de 4 a 6 marketplaces ou tipos de loja confiáveis para encontrar o produto no Brasil. Para cada um, forneça um 'rank', a 'platform' (nome da loja), uma 'reason' (justificativa curta e útil) e uma 'url' (o link de BUSCA para o produto naquela plataforma, não um anúncio específico).
7.  **Sugestões (suggestions):** Sugira 3 outros produtos retrô relacionados que o usuário poderia gostar de pesquisar. Para cada um, forneça um 'name' e um 'imagePrompt' para a IA de imagem.

A busca do usuário é:
`;

exports.handler = async function (event) {
  try {
    // Pega a busca do usuário que veio do site
    const { query } = JSON.parse(event.body);

    // Prepara o modelo de IA
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Junta o nosso Super Prompt com a busca do usuário
    const fullPrompt = masterPrompt + `"${query}"`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // A IA responde em texto, nós limpamos e convertemos para JSON
    const cleanJsonText = text.replace(/```json/g, "").replace(/```/g, "");
    const jsonData = JSON.parse(cleanJsonText);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    };
  } catch (error) {
    console.error("Erro na função da IA:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Ocorreu um erro ao consultar a IA." }),
    };
  }
};
