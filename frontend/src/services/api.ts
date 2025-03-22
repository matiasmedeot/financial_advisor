import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface Option {
  id: string;
  text: string;
  score?: number;
  icon?: string;
}

export interface Field {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options?: Option[];
}

export interface WizardStep {
  id: number;
  title: string;
  description?: string;
  fields: Field[];
  step_type: 'purpose' | 'risk_assessment' | 'investment_options';
}

export const wizardApi = {
  getSteps: async (): Promise<WizardStep[]> => {
    const response = await axios.get(`${API_BASE_URL}/wizard/steps`);
    return response.data;
  },

  getStepById: async (stepId: number): Promise<WizardStep> => {
    const response = await axios.get(`${API_BASE_URL}/wizard/step/${stepId}`);
    return response.data;
  }
};
