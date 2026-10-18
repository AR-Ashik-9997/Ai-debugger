/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
"use client";

import {
    Bug,
    FileCheck2,
    Terminal,
    Cpu,
    Zap,
    ScanLine,
    CheckCircle,
    CheckCheck,
    Copy,
    Check,
    AlertCircle
} from "lucide-react";
import { useEffect, useState } from "react";

interface ResultsWorkbenchProps {
    currentTab: "issues" | "solution" | "json";
    setCurrentTab: (tab: "issues" | "solution" | "json") => void;
    appState: "empty" | "loading" | "results";
    loadingStageText: string;
    loadingStageDesc: string;
    loadingProgress: string;
    scannerImages?: string[];
    issues?: string;
    solution?: string;
    copied: boolean;
    onCopy: () => void;
    onToast?: (msg: string) => void;
}

const ResultsWorkbench = ({
    currentTab,
    setCurrentTab,
    appState,
    loadingStageText,
    loadingStageDesc,
    loadingProgress,
    scannerImages,
    issues,
    solution,
    copied,
    onCopy,
    onToast
}: ResultsWorkbenchProps) => {

    // Raw JSON construct for the Raw Logs tab
    const [timestamp, setTimestamp] = useState<string>('');

    useEffect(() => {
        setTimestamp(new Date().toISOString());
    }, []);

    const rawLogsJson = JSON.stringify({
        timestamp,
        status: "success",
        issues: issues || null,
        solution: solution || null,
    }, null, 2);

    return (
        <section className="flex-1 flex flex-col gap-6 min-w-0">

            {/* Workbench Header Card */}
            <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-xl bg-slate-900/60 backdrop-blur-xl">

                {/* Workbench Tabs Switcher */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-white/10">
                    <button
                        onClick={() => setCurrentTab("issues")}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${currentTab === "issues" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white cursor-pointer"
                            }`}
                    >
                        <Bug className="w-3.5 h-3.5" />
                        <span>Issues & Analysis</span>
                    </button>

                    <button
                        onClick={() => setCurrentTab("solution")}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${currentTab === "solution" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white cursor-pointer"
                            }`}
                    >
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>AI Solution & Fix</span>
                    </button>

                    <button
                        onClick={() => setCurrentTab("json")}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${currentTab === "json" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white cursor-pointer"
                            }`}
                    >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Raw Logs</span>
                    </button>
                </div>

                {/* Quick Info Tags */}
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-indigo-400" /> Vision AI Active</span>
                    <span className="hidden sm:inline-flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> Gemini-3.8-Flash</span>
                </div>

            </div>

            {/* MAIN WORKBENCH PANEL CONTENT */}
            <div className="flex-1 flex flex-col">

                {/* ==================== STATE 1: EMPTY PLACEHOLDER ==================== */}
                {appState === "empty" && (
                    <div className="glass-panel rounded-2xl border border-white/10 p-8 sm:p-14 flex flex-col items-center justify-center text-center flex-1 min-h-120 relative overflow-hidden bg-slate-900/60 backdrop-blur-xl">
                        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-indigo-400 mb-6 shadow-inner relative group">
                            <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur group-hover:blur-md transition"></div>
                            <ScanLine className="w-9 h-9 relative z-10" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 font-mono">No Code Image Uploaded</h3>
                        <p className="text-xs text-slate-400 max-w-md mb-8 leading-relaxed">
                            Upload your code screenshot in the control panel to see Gemini AI debugging in action.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg text-left">
                            <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-xs">
                                <CheckCircle className="w-4 h-4 text-emerald-400 mb-1.5" />
                                <div className="font-medium text-slate-200">Syntax Errors</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Missing params, typos</div>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-xs">
                                <CheckCircle className="w-4 h-4 text-emerald-400 mb-1.5" />
                                <div className="font-medium text-slate-200">Scope & Types</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Undefined vars, type cast</div>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-xs col-span-2 sm:col-span-1">
                                <CheckCircle className="w-4 h-4 text-emerald-400 mb-1.5" />
                                <div className="font-medium text-slate-200">Logic & Bugs</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">Algorithmic flaws</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== STATE 2: LOADING & SCANNING ==================== */}
                {appState === "loading" && (
                    <div className="glass-panel rounded-2xl border border-white/10 p-8 sm:p-12 flex flex-col items-center justify-center text-center flex-1 min-h-120 relative overflow-hidden bg-slate-900/60 backdrop-blur-xl">
                        {scannerImages && scannerImages.length > 0 && (
                            <div className="flex flex-wrap items-center justify-center gap-3 mb-6 max-w-xl">
                                {scannerImages.map((imgUrl, idx) => (
                                    <div key={idx} className="relative w-40 h-28 rounded-xl bg-slate-950 border border-white/15 overflow-hidden shadow-2xl">
                                        <div
                                            className="w-full h-full bg-cover bg-center opacity-40"
                                            style={{ backgroundImage: `url('${imgUrl}')` }}
                                        ></div>
                                        <div className="absolute left-0 w-full h-1 bg-linear-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_#6366f1] animate-scan-line"></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <h3 className="text-base font-bold text-white mb-1 font-mono">{loadingStageText}</h3>
                        <p className="text-xs text-slate-400 max-w-sm mb-6">{loadingStageDesc}</p>

                        <div className="w-full max-w-md bg-slate-900 rounded-full h-2 border border-white/10 overflow-hidden mb-8">
                            <div
                                className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-300"
                                style={{ width: loadingProgress }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* ==================== STATE 3: RESULTS DISPLAY ==================== */}
                {appState === "results" && (
                    <div className="flex-1">

                        {/* PANEL A: ISSUES VIEW */}
                        {currentTab === "issues" && (
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Analysis Report Generated</h4>
                                            <p className="text-[11px] text-slate-400">Gemini AI completed code inspection.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-panel rounded-xl p-5 border border-rose-500/30 relative overflow-hidden bg-slate-900/60 backdrop-blur-xl">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertCircle className="w-4 h-4 text-rose-400" />
                                        <h3 className="text-sm font-bold text-white">Detected Code Issues</h3>
                                    </div>
                                    <pre className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                                        {issues || "No specific issues identified."}
                                    </pre>
                                </div>
                            </div>
                        )}

                        {/* PANEL B: SOLUTION VIEW */}
                        {currentTab === "solution" && (
                            <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden bg-slate-900/60 backdrop-blur-xl">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                            <CheckCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white font-mono">AI Recommended Fix</h3>
                                            <p className="text-[11px] text-slate-400">Refactored code and solution hints.</p>
                                        </div>
                                    </div>

                                    <button onClick={onCopy} className="px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg transition flex items-center gap-2 shadow-sm">
                                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
                                        <span>{copied ? "Copied!" : "Copy Code"}</span>
                                    </button>
                                </div>

                                {/* Code / Solution Block */}
                                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-950">
                                    <pre className="p-4 m-0 text-xs text-indigo-300 font-mono overflow-x-auto whitespace-pre-wrap">
                                        {solution || "No solution provided."}
                                    </pre>
                                </div>
                            </div>
                        )}

                        {/* PANEL C: RAW LOGS VIEW */}
                        {currentTab === "json" && (
                            <div className="glass-panel rounded-2xl p-5 border border-white/10 bg-slate-900/60 backdrop-blur-xl">
                                <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                                    <span>RAW_RESPONSE_LOG.json</span>
                                    {onToast && (
                                        <button onClick={() => onToast("Logs copied!")} className="text-indigo-400 hover:text-indigo-300">
                                            <Copy className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                                <pre className="bg-slate-950 p-4 rounded-xl border border-white/5 text-xs font-mono text-cyan-300 overflow-x-auto">
                                    <code>{rawLogsJson}</code>
                                </pre>
                            </div>
                        )}

                    </div>
                )}

            </div>

        </section>
    );
}

export default ResultsWorkbench;