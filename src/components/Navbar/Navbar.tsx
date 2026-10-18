/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { BugPlay, Share2 } from "lucide-react";

interface NavbarProps {
    onShare: () => void;
}

const Navbar = ({ onShare }: NavbarProps) => {
    return (
        <header className="border-b border-white/10 bg-dark-sidebar/80 sticky top-0 z-50 backdrop-blur-xl px-4 lg:px-8 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Brand Logo & Live Model Badge */}
                <a href="/">
                    <div className="flex items-center space-x-3">

                        <div className="relative group cursor-pointer">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-brand-500 via-accent-violet to-accent-cyan rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white border border-white/10">
                                <BugPlay className="w-5 h-5 text-brand-400" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-base font-bold tracking-tight text-white font-mono">
                                    DebugAI<span className="text-brand-400">.Studio</span>
                                </h1>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Gemini 3.8 Flash
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-400 hidden sm:block">Multimodal Vision Engine for Automated Code Analysis</p>
                        </div>

                    </div>
                </a>

                {/* Quick Action Navigation */}
                <div className="flex items-center space-x-3">

                    <button
                        onClick={onShare}
                        className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                        <Share2 className="w-3.5 h-3.5 text-brand-400" />
                        <span className="hidden sm:inline">Share Workspace</span>
                    </button>
                </div>

            </div>
        </header>
    );
}
export default Navbar;