
export enum FunctionType {
  LINEAR = 'Lineal',
  QUADRATIC = 'Cuadrática',
  EXPONENTIAL = 'Exponencial'
}

export interface DataPoint {
  x: number;
  y: number;
}

export interface Evidence {
  id: string;
  type: 'text' | 'table' | 'graph';
  title: string;
  content: string;
  data?: DataPoint[];
}

export interface Case {
  id: string;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  objective: string;
  evidences: Evidence[];
  solutionType: FunctionType;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
