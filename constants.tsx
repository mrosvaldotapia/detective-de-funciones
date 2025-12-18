
import { Case, FunctionType } from './types';

export const CASES: Case[] = [
  {
    id: 'case-1',
    title: 'El Recorrido Sospechoso',
    description: 'Un vehículo ha sido rastreado por el GPS. Su velocidad parece ser constante, pero necesitamos confirmar el patrón de movimiento para predecir su destino.',
    difficulty: 'Fácil',
    objective: 'Identificar e interpretar una función lineal a partir de patrones constantes.',
    solutionType: FunctionType.LINEAR,
    evidences: [
      {
        id: 'e1-1',
        type: 'text',
        title: 'Informe del Oficial',
        content: 'El sospechoso salió de la base a las 08:00 AM. Cada hora que pasa, se aleja exactamente la misma distancia de la ciudad principal.'
      },
      {
        id: 'e1-2',
        type: 'table',
        title: 'Registro de GPS',
        content: 'Datos de posición (km) vs Tiempo (h)',
        data: [
          { x: 0, y: 10 },
          { x: 1, y: 70 },
          { x: 2, y: 130 },
          { x: 3, y: 190 },
          { x: 4, y: 250 }
        ]
      }
    ]
  },
  {
    id: 'case-2',
    title: 'El Lanzamiento Inesperado',
    description: 'Un objeto fue lanzado desde una azotea. Los testigos dicen que subió y luego bajó siguiendo una trayectoria simétrica. Debemos hallar el punto más alto.',
    difficulty: 'Media',
    objective: 'Análisis de un fenómeno con función cuadrática (vértice, simetría y concavidad).',
    solutionType: FunctionType.QUADRATIC,
    evidences: [
      {
        id: 'e2-1',
        type: 'text',
        title: 'Declaración del Testigo',
        content: 'Vi cómo lanzaban algo hacia arriba. Parecía una parábola perfecta. Llegó a su punto máximo y luego cayó al suelo estrepitosamente.'
      },
      {
        id: 'e2-2',
        type: 'graph',
        title: 'Trayectoria Capturada',
        content: 'Altura (m) vs Tiempo (s)',
        data: [
          { x: 0, y: 20 },
          { x: 1, y: 35 },
          { x: 2, y: 40 },
          { x: 3, y: 35 },
          { x: 4, y: 20 },
          { x: 5, y: -5 }
        ]
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Comparando Modelos',
    description: 'Dos empresas de seguridad ofrecen planes distintos. Una cobra un cargo fijo más una tasa por hora, la otra tiene un costo que aumenta de forma acelerada.',
    difficulty: 'Difícil',
    objective: 'Contrastar distintos modelos funcionales y justificar la toma de decisiones.',
    solutionType: FunctionType.LINEAR, // En este caso el detective debe decidir cuál es mejor
    evidences: [
      {
        id: 'e3-1',
        type: 'text',
        title: 'Contrato Plan A',
        content: 'Costo base de $50.000 más $5.000 por cada hora de servicio adicional.'
      },
      {
        id: 'e3-2',
        type: 'table',
        title: 'Costos Plan B',
        content: 'Proyección de costos basada en complejidad horaria.',
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 1000 },
          { x: 2, y: 4000 },
          { x: 3, y: 9000 },
          { x: 4, y: 16000 }
        ]
      }
    ]
  }
];
