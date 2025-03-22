"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wizardApi, WizardStep, Option } from '../services/api';

interface ModalProps {
  option: Option;
  onClose: () => void;
}

interface WizardAnswers {
  [fieldName: string]: Option;
}

export default function InvestmentWizard() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [wizardSteps, setWizardSteps] = useState<WizardStep[]>([]);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadWizardSteps();
  }, []);

  const loadWizardSteps = async () => {
    try {
      const steps = await wizardApi.getSteps();
      setWizardSteps(steps);
      setLoading(false);
    } catch {
      setError('Error cargando los pasos del wizard');
      setLoading(false);
    }
  };

  const handleOptionSelect = (fieldName: string, option: Option) => {
    setAnswers(prev => ({
      ...prev,
      [fieldName]: option
    }));

    // Si es una opción de inversión, mostrar el modal
    if (getCurrentStep()?.step_type === 'investment_options') {
      setSelectedOption(option);
      setShowModal(true);
    } else {
      // Para otros tipos de pasos, avanzar automáticamente
      goToNextStep();
    }
  };

  const getCurrentStep = () => {
    return wizardSteps.find(step => step.id === currentStep);
  };

  const goToNextStep = () => {
    const nextStepId = currentStep + 1;
    if (wizardSteps.some(step => step.id === nextStepId)) {
      setCurrentStep(nextStepId);
    }
  };

  const Modal = ({ option, onClose }: ModalProps) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {option.icon && <div className="text-4xl mb-4">{option.icon}</div>}
        <h3 className="text-2xl font-bold mb-2 text-gray-900">{option.text}</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors w-full"
          onClick={onClose}
        >
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  const step = getCurrentStep();
  if (!step) {
    return <div className="text-center">No hay pasos configurados</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{step.title}</h2>
          {step.description && (
            <p className="text-lg text-gray-700 mb-6">{step.description}</p>
          )}
          
          {step.fields.map((field) => (
            <div key={field.name} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">{field.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {field.options?.map((option) => (
                  <button
                    key={option.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      answers[field.name]?.id === option.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleOptionSelect(field.name, option)}
                  >
                    {option.icon && <div className="text-4xl mb-4">{option.icon}</div>}
                    <div className="text-lg font-semibold text-gray-900">{option.text}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {showModal && selectedOption && (
        <Modal option={selectedOption} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
