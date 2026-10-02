import { useMemo } from 'react';

interface PreviewProps {
  code: string;
}

export default function Preview({ code }: PreviewProps) {
  const srcDoc = useMemo(() => {
    if (!code.trim()) {
      return '<html><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#94a3b8;">Chỉnh sửa code để xem kết quả</body></html>';
    }
    return code;
  }, [code]);

  return (
    <div className="h-full overflow-hidden rounded-lg border border-slate-300 bg-white">
      <iframe
        srcDoc={srcDoc}
        title="Preview"
        className="h-full w-full border-0"
        sandbox="allow-same-origin"
      />
    </div>
  );
}
