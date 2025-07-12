export default function CodeEditor({ code, onChange }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold">Code Editor</span>
        <button className="bg-emerald-600 text-white px-3 py-1 rounded">Run Code</button>
      </div>
      <textarea
        className="w-full h-[400px] bg-black text-white p-3 rounded resize-none font-mono"
        value={code}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
}
