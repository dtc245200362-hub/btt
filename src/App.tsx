import { useState, useCallback } from 'react';
import { Code2, Eye, RefreshCw, BookOpen, Lightbulb, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { steps } from '@/data/steps';
import CodeEditor from '@/components/CodeEditor';
import Preview from '@/components/Preview';
import StepNavigation from '@/components/StepNavigation';

function App() {
  const [currentStepId, setCurrentStepId] = useState(1);
  const [userCode, setUserCode] = useState<Record<number, string>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const currentStep = steps.find((s) => s.id === currentStepId)!;
  const currentCode = userCode[currentStepId] ?? currentStep.code;

  const handleCodeChange = (code: string) => {
    setUserCode((prev) => ({ ...prev, [currentStepId]: code }));
  };

  const handleStepClick = (id: number) => {
    setCompletedSteps((prev) => new Set(prev).add(currentStepId));
    setCurrentStepId(id);
    setActiveTab('editor');
  };

  const handleReset = () => {
    setUserCode((prev) => {
      const next = { ...prev };
      delete next[currentStepId];
      return next;
    });
  };

  const goNext = useCallback(() => {
    if (currentStepId < steps.length) {
      setCompletedSteps((prev) => new Set(prev).add(currentStepId));
      setCurrentStepId(currentStepId + 1);
      setActiveTab('editor');
    }
  }, [currentStepId]);

  const goPrev = useCallback(() => {
    if (currentStepId > 1) {
      setCurrentStepId(currentStepId - 1);
      setActiveTab('editor');
    }
  }, [currentStepId]);

  const isModified = userCode[currentStepId] !== undefined && userCode[currentStepId] !== currentStep.code;
  const progress = Math.round((completedSteps.size / steps.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">Học CSS qua ví dụ</h1>
              <p className="text-xs text-slate-500">Interactive CSS Tutorial</p>
            </div>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <div className="flex items-center gap-2">
              <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium text-slate-600">{progress}%</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Step Navigation */}
        <StepNavigation
          steps={steps.map((s) => ({ id: s.id, title: s.title }))}
          currentStep={currentStepId}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
        />

        {/* Step Info Card */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-xl font-bold text-teal-700">
              {currentStep.id}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-800">{currentStep.titleVi}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{currentStep.description}</p>
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>{currentStep.hint}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editor + Preview */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {/* Editor Panel */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-700">HTML Editor</span>
              </div>
              <div className="flex items-center gap-2">
                {isModified && (
                  <span className="text-xs font-medium text-amber-600">Đã chỉnh sửa</span>
                )}
                <button
                  onClick={handleReset}
                  disabled={!isModified}
                  className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Khôi phục
                </button>
              </div>
            </div>
            <div className="h-[400px] p-3 lg:h-[500px]">
              <CodeEditor value={currentCode} onChange={handleCodeChange} />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-700">Kết quả</span>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-slate-200 p-0.5">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    activeTab === 'editor' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    activeTab === 'preview' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="h-[400px] p-3 lg:h-[500px]">
              <Preview code={currentCode} />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentStepId === 1}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Bước trước
          </button>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <BookOpen className="h-4 w-4" />
            <span>Bước {currentStepId} / {steps.length}</span>
          </div>

          {currentStepId < steps.length ? (
            <button
              onClick={goNext}
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 hover:shadow-teal-600/30"
            >
              Bước tiếp theo
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setCompletedSteps(new Set(steps.map((s) => s.id)));
                setCurrentStepId(1);
              }}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700"
            >
              <GraduationCap className="h-4 w-4" />
              Hoàn thành!
            </button>
          )}
        </div>

        {/* Completion Banner */}
        {completedSteps.size === steps.length && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <GraduationCap className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Chúc mừng! Bạn đã hoàn thành tất cả các bước.</h3>
            <p className="mt-1 text-sm text-slate-600">
              Bạn đã học về font-family, border, padding, và id selectors. Quay lại bất kỳ bước nào để thực hành thêm!
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-400 sm:px-6">
          Học CSS qua ví dụ — Interactive CSS Tutorial
        </div>
      </footer>
    </div>
  );
}

export default App;
