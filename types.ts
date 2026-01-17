
export interface PlantCare {
  watering: string;
  sunlight: string;
  soil: string;
  fertilizer: string;
  toxicity: string;
}

export interface PlantInfo {
  id: string;
  commonName: string;
  scientificName: string;
  description: string;
  care: PlantCare;
  origin: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  image?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
