
import { GoogleGenAI } from "@google/genai";
import { Case, Message } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getInspectorFeedback = async (
  currentCase: Case,
  history: Message[],
  userHypothesis: string
) => {
  const systemInstruction = `
    Eres el "Inspector Lógica", un mentor experto en matemáticas para estudiantes de 15-16 años (2do Medio).
    Tu objetivo es guiar al estudiante para que resuelva el caso "${currentCase.title}".
    
    Reglas de interacción:
    1. NO des la respuesta directamente.
    2. Usa terminología matemática adecuada (pendiente, intercepto, vértice, concavidad, razón de cambio).
    3. Si el estudiante dice que es una función ${currentCase.solutionType}, felicítalo y pídele que justifique basándose en las evidencias (tablas o gráficos).
    4. Si el estudiante se equivoca, hazle preguntas reflexivas como "¿Notas si la diferencia entre los valores de 'y' es constante?" o "¿Ves un punto de retorno en los datos?".
    5. Mantén un tono de detective de cine negro, pero amable y motivador.
    
    Contexto del caso actual:
    - Objetivo: ${currentCase.objective}
    - Tipo esperado: ${currentCase.solutionType}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(m => ({ parts: [{ text: m.content }], role: m.role === 'user' ? 'user' : 'model' })),
        { parts: [{ text: userHypothesis }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Lo siento detective, la conexión con el cuartel central se ha perdido. Inténtalo de nuevo.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hay un error en las comunicaciones. Revisa tus datos y vuelve a consultar.";
  }
};
