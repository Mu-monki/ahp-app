import React, { useState } from 'react';
import { createAHPRoom } from '@/actions/actions';
import { ConfirmationModal } from '@/components/modal-confirmation';

// Define types for our form data
interface AHPFormData {
  goal: string;
  alternatives: string[];
  criteria: string[];
}

// Define types for form errors
interface AHPFormErrors {
  goal: string;
  alternatives: string;
  criteria: string;
}

const AHPForm: React.FC = () => {
  // Initialize form data with proper typing
  const [formData, setFormData] = useState<AHPFormData>({
    goal: '',
    alternatives: ['', ''],
    criteria: ['', '']
  });

  // Initialize errors with proper typing
  const [errors, setErrors] = useState<AHPFormErrors>({
    goal: '',
    alternatives: '',
    criteria: ''
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


  // Handle goal change
  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, goal: e.target.value });
    if (errors.goal) setErrors({ ...errors, goal: '' });
  };

  // Handle alternative change
  const handleAlternativeChange = (index: number, value: string): void => {
    const newAlternatives = [...formData.alternatives];
    newAlternatives[index] = value;
    setFormData({ ...formData, alternatives: newAlternatives });
  };

  // Handle criterion change
  const handleCriterionChange = (index: number, value: string): void => {
    const newCriteria = [...formData.criteria];
    newCriteria[index] = value;
    setFormData({ ...formData, criteria: newCriteria });
  };

  // Handle modal confirmation
  const handleConfirm = (): void => {
    setIsModalOpen(!isModalOpen);
  }

  // Add a new alternative
  const addAlternative = (): void => {
    setFormData({
      ...formData,
      alternatives: [...formData.alternatives, '']
    });
  };

  // Remove an alternative
  const removeAlternative = (index: number): void => {
    if (formData.alternatives.length > 2) {
      const newAlternatives = formData.alternatives.filter((_, i) => i !== index);
      setFormData({ ...formData, alternatives: newAlternatives });
    }
  };

  // Add a new criterion
  const addCriterion = (): void => {
    setFormData({
      ...formData,
      criteria: [...formData.criteria, '']
    });
  };

  // Remove a criterion
  const removeCriterion = (index: number): void => {
    if (formData.criteria.length > 2) {
      const newCriteria = formData.criteria.filter((_, i) => i !== index);
      setFormData({ ...formData, criteria: newCriteria });
    }
  };

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: AHPFormErrors = {
      goal: '',
      alternatives: '',
      criteria: ''
    };

    let isValid = true;

    // Validate goal
    if (!formData.goal.trim()) {
      newErrors.goal = 'Goal is required';
      isValid = false;
    }

    // Validate alternatives
    const validAlternatives = formData.alternatives.filter(alt => alt.trim() !== '');
    if (validAlternatives.length < 2) {
      newErrors.alternatives = 'At least 2 alternatives are required';
      isValid = false;
    }

    // Validate criteria
    const validCriteria = formData.criteria.filter(crit => crit.trim() !== '');
    if (validCriteria.length < 2) {
      newErrors.criteria = 'At least 2 criteria are required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsModalOpen(true);
    
    if (validateForm()) {
      // Prepare data for submission
      const submissionData: AHPFormData = {
        goal: formData.goal.trim(),
        alternatives: formData.alternatives.filter(alt => alt.trim() !== ''),
        criteria: formData.criteria.filter(crit => crit.trim() !== '')
      };

      createAHPRoom();

      console.log('Form submitted:', submissionData);
      alert('Form submitted successfully! Check console for data.');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-[#2B2B2B]">
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm AHP Form Submission"
        message="Are you sure you want to generate this decision room?"
        isLoading={isSubmitting}
      />
      <div className="max-w-2xl mx-auto bg-[#F2EBE3] rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#D0AC3C] mb-2">AHP Decision Matrix</h1>
          <p className="text-[#2B2B2B] italic">Please Complete the Analytic Hierarchy Process Form</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Goal Field */}
          <div className="space-y-2">
            <label htmlFor="goal" className="block text-sm font-bold text-[#2B2B2B]">
              AHP Goal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="goal"
              value={formData.goal}
              onChange={handleGoalChange}
              placeholder="Enter your decision goal"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-[#2B2B2B] ${
                errors.goal ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.goal && <p className="text-red-500 text-sm">{errors.goal}</p>}
          </div>

          {/* Alternatives Section */}
          <div className="border rounded-lg p-4 bg-[#F2EBE3]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-[#2B2B2B]">Alternatives</h3>
                <p className="text-sm text-gray-600 italic">At least 2 alternatives required</p>
              </div>
              <button
                type="button"
                onClick={addAlternative}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 text-sm"
              >
                + Add Alternative
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.alternatives.map((alternative, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={alternative}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      handleAlternativeChange(index, e.target.value)
                    }
                    placeholder={`Alternative ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-gray-700"
                  />
                  {formData.alternatives.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeAlternative(index)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.alternatives && <p className="text-red-500 text-sm mt-2">{errors.alternatives}</p>}
          </div>

          {/* Criteria Section */}
          <div className="border rounded-lg p-4 bg-[#F2EBE3]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-[#2B2B2B]">Criteria</h3>
                <p className="text-sm text-gray-600 italic">At least 2 criteria required</p>
              </div>
              <button
                type="button"
                onClick={addCriterion}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 text-sm"
              >
                + Add Criterion
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.criteria.map((criterion, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={criterion}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      handleCriterionChange(index, e.target.value)
                    }
                    placeholder={`Criterion ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-gray-700"
                  />
                  {formData.criteria.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeCriterion(index)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.criteria && <p className="text-red-500 text-sm mt-2">{errors.criteria}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create AHP Decision Room
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <h3 className="font-medium text-indigo-800">How to use this form:</h3>
          <ul className="list-disc list-inside text-sm text-indigo-600 mt-2 space-y-1">
            <li>Define your decision goal</li>
            <li>Add at least 2 alternatives (options you're deciding between)</li>
            <li>Add at least 2 criteria (factors to evaluate alternatives)</li>
            <li>Click "Create AHP Matrix" when done</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AHPForm;