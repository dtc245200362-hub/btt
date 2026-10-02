import { Check } from 'lucide-react';

interface StepNavigationProps {
  steps: { id: number; title: string }[];
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (id: number) => void;
}

export default function StepNavigation({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: StepNavigationProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = completedSteps.has(step.id);

        return (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                : isCompleted
                  ? 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                isActive
                  ? 'bg-white text-teal-600'
                  : isCompleted
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-300 text-slate-600'
              }`}
            >
              {isCompleted ? <Check className="h-3 w-3" /> : step.id}
            </span>
            <span className="hidden sm:inline">{step.title}</span>
          </button>
        );
      })}
    </div>
  );
}
