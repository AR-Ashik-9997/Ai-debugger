"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import {
    Sliders,
    UploadCloud,
    Sparkles,
    FileCode,
    ChevronDown,
    Wand2,
    AlertTriangle,
    Lightbulb,
    Code2,
    ShieldCheck,
    CheckCircle2,
    Circle,
    X
} from "lucide-react";
import Image from "next/image";

interface ControlPanelProps {
    files: { name: string; url: string }[];
    onFilesSelected: (files: File[]) => void;
    onRemoveFile: (index: number) => void;
    onLoadSample: () => void;
    selectedMode: string;
    onSelectMode: (mode: string) => void;
    onDebug: () => void;
    error: string | null;
    targetLang: string;
    setTargetLang: (val: string) => void;
    contextNotes: string;
    setContextNotes: (val: string) => void;
    isLoading: boolean;
}

const ControlPanel = ({
    files,
    onFilesSelected,
    onRemoveFile,
    onLoadSample,
    selectedMode,
    onSelectMode,
    onDebug,
    error,
    targetLang,
    setTargetLang,
    contextNotes,
    setContextNotes,
    isLoading
}: ControlPanelProps) => {
    const [contextOpen, setContextOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onFilesSelected(Array.from(e.target.files));
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            onFilesSelected(Array.from(e.dataTransfer.files));
        }
    };

    return (
        <aside className="w-full lg:w-95 shrink-0 flex flex-col gap-5">
            <div className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col gap-5 shadow-2xl relative bg-slate-900/60 backdrop-blur-xl">

                {/* Section Title */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                        <Sliders className="w-4 h-4 text-brand-400" /> Control Panel
                    </h2>
                    <span className="text-[11px] text-slate-500">v2.4 Engine</span>
                </div>

                {/* File Upload Area */}
                <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-slate-300">Code Screenshots</label>
                        <span className="text-[11px] text-slate-400 font-mono">{files.length} / 3 images</span>
                    </div>

                    {/* Drag & Drop Zone */}
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-white/15 hover:border-brand-500/60 bg-slate-950/40 hover:bg-brand-500/5 rounded-xl p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center group relative overflow-hidden"
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 group-hover:scale-110 group-hover:border-brand-500/40 group-hover:bg-brand-500/10 text-slate-400 group-hover:text-brand-400 flex items-center justify-center transition-all duration-200 mb-3 shadow-inner">
                            <UploadCloud className="w-6 h-6" />
                        </div>

                        <p className="text-xs font-medium text-slate-200 group-hover:text-white">
                            Drop your code screenshot here
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">PNG, JPG or WebP (Max 3 files)</p>

                        {/* Sample Preset Loader */}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onLoadSample(); }}
                            className="mt-3.5 px-3 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-[11px] font-medium text-brand-300 transition flex items-center gap-1.5 z-10 cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Load Sample Bug Screenshot
                        </button>
                    </div>

                    {/* Uploaded Files Gallery */}
                    {files.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-3">
                            {files.map((file, idx) => (
                                <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-slate-950 group">
                                    <Image
                                        src={file.url}
                                        alt="preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onRemoveFile(idx); }}
                                        className="absolute top-1 right-1 bg-rose-600/90 hover:bg-rose-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Debugging Mode Cards */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300 block">Debugging Strategy</label>

                    <div className="grid grid-cols-1 gap-2">

                        {/* Mode Option 1 */}
                        <div
                            className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${selectedMode === "Hint" ? "border-brand-500/50 bg-brand-500/10" : "border-white/5 bg-slate-900/60 hover:bg-slate-900"
                                }`}
                            onClick={() => onSelectMode("Hint")}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                                    <Lightbulb className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-white">Instant Hints & Diagnosis</div>
                                    <div className="text-[11px] text-slate-400">Locates errors and gives guided clues</div>
                                </div>
                            </div>
                            {selectedMode === "Hint" ? (
                                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                            ) : (
                                <Circle className="w-4 h-4 text-slate-600" />
                            )}
                        </div>

                        {/* Mode Option 2 */}
                        <div
                            className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${selectedMode === "Solution" ? "border-brand-500/50 bg-brand-500/10" : "border-white/5 bg-slate-900/60 hover:bg-slate-900"
                                }`}
                            onClick={() => onSelectMode("Solution")}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                    <Code2 className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-slate-200">Full Refactored Code</div>
                                    <div className="text-[11px] text-slate-400">Complete code fix with explanations</div>
                                </div>
                            </div>
                            {selectedMode === "Solution" ? (
                                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                            ) : (
                                <Circle className="w-4 h-4 text-slate-600" />
                            )}
                        </div>

                        {/* Mode Option 3 */}
                        <div
                            className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${selectedMode === "Security" ? "border-brand-500/50 bg-brand-500/10" : "border-white/5 bg-slate-900/60 hover:bg-slate-900"
                                }`}
                            onClick={() => onSelectMode("Security")}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-slate-200">Security & Performance Audit</div>
                                    <div className="text-[11px] text-slate-400">Checks vulnerabilities & memory leaks</div>
                                </div>
                            </div>
                            {selectedMode === "Security" ? (
                                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                            ) : (
                                <Circle className="w-4 h-4 text-slate-600" />
                            )}
                        </div>

                    </div>
                </div>

                {/* Collapsible Context Tweaker */}
                <div className="border-t border-white/5 pt-3">
                    <button
                        type="button"
                        onClick={() => setContextOpen(!contextOpen)}
                        className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 py-1 font-medium transition"
                    >
                        <span className="flex items-center gap-1.5">
                            <FileCode className="w-3.5 h-3.5 text-brand-400" /> Developer Context (Optional)
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${contextOpen ? "rotate-180" : ""}`} />
                    </button>

                    {contextOpen && (
                        <div className="space-y-2.5 mt-3 pt-2">
                            <div>
                                <label className="text-[11px] text-slate-400 block mb-1">Target Language / Framework</label>
                                <input
                                    type="text"
                                    value={targetLang}
                                    onChange={(e) => setTargetLang(e.target.value)}
                                    placeholder="e.g. Python 3.11, FastAPI, Next.js"
                                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500/60"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] text-slate-400 block mb-1">Error Behavior Note</label>
                                <textarea
                                    value={contextNotes}
                                    onChange={(e) => setContextNotes(e.target.value)}
                                    rows={2}
                                    placeholder="e.g. Fails when passing null user parameters..."
                                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500/60 resize-none"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Glowing Execute Button */}
                <button
                    disabled={isLoading}
                    onClick={onDebug}
                    className="relative group w-full py-3.5 px-4 bg-linear-to-r from-brand-600 via-indigo-600 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-600/25 hover:shadow-brand-500/40 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
                >
                    <Wand2 className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                    <span>{isLoading ? "Analyzing..." : "Debug Code Snapshot"}</span>
                </button>

                {/* Validation Error Box */}
                {error && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

            </div>
        </aside>
    );
}
export default ControlPanel;