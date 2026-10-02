import { useRef, useEffect } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');

  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbersEl = lineNumbersRef.current;
    if (!textarea || !lineNumbersEl) return;

    const handleScroll = () => {
      lineNumbersEl.scrollTop = textarea.scrollTop;
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative flex h-full overflow-hidden rounded-lg border border-slate-700 bg-[#0d1117]">
      <div
        ref={lineNumbersRef}
        className="select-none overflow-hidden py-4 pl-4 pr-3 text-right font-mono text-sm leading-6 text-slate-600"
        style={{ minWidth: '3rem' }}
      >
        <pre>{lineNumbers}</pre>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="flex-1 resize-none overflow-auto bg-transparent py-4 pr-4 font-mono text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600"
        style={{ tabSize: 4 }}
      />
    </div>
  );
}
