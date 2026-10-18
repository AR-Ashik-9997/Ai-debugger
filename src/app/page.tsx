/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import ControlPanel from "@/components/ControlPanel/ControlPanel";
import ResultsWorkbench from "@/components/ResultView/ResultsWorkbench";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string; fileObj?: File }[]>([]);
  const [selectedMode, setSelectedMode] = useState("Hint");
  const [targetLang, setTargetLang] = useState("");
  const [contextNotes, setContextNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [appState, setAppState] = useState<"empty" | "loading" | "results">("empty");
  const [loadingStageText, setLoadingStageText] = useState("Extracting code via OCR...");
  const [loadingStageDesc, setLoadingStageDesc] = useState("Reading tokens and structure from image.");
  const [loadingProgress, setLoadingProgress] = useState("25%");

  const [currentTab, setCurrentTab] = useState<"issues" | "solution" | "json">("issues");
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [issues, setIssues] = useState("");
  const [solution, setSolution] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleFilesSelected = (files: File[]) => {
    const validImages = files.filter(f => f.type.startsWith('image/'));

    if (validImages.length === 0) {
      setError("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (uploadedFiles.length + validImages.length > 3) {
      setError("Maximum 3 screenshots allowed per analysis session.");
      return;
    }

    setError(null);

    validImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setUploadedFiles(prev => [...prev, { name: file.name, url: result, fileObj: file }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleLoadSample = async () => {
    try {
      const sampleUrl = "https://i.ibb.co.com/C5CqZLXT/Screenshot-2026-10-19-024415.png";
      const response = await fetch(sampleUrl);
      const blob = await response.blob();
      const sampleFile = new File([blob], "bug_code_sample.png", { type: "image/png" });

      setUploadedFiles([{
        name: "bug_code_sample.png",
        url: sampleUrl,
        fileObj: sampleFile
      }]);
      setError(null);
      triggerToast("Loaded sample code screenshot!");
    } catch {
      setError("Failed to load sample image. Please upload an image directly.");
    }
  };

  const executeDebuggingProcess = async () => {
    if (uploadedFiles.length === 0) {
      setError("Please upload a code screenshot first.");
      return;
    }

    setError(null);
    setAppState("loading");

    const stages = [
      { title: "Extracting code via OCR...", desc: "Reading tokens and structure from image.", fill: "25%" },
      { title: "Running AST Error Verification...", desc: "Checking syntax trees and variable bindings.", fill: "60%" },
      { title: "Querying Gemini Vision AI...", desc: "Synthesizing refactored fixes and hints.", fill: "90%" }
    ];

    let step = 0;

    const interval = setInterval(() => {
      if (step < stages.length) {
        setLoadingStageText(stages[step].title);
        setLoadingStageDesc(stages[step].desc);
        setLoadingProgress(stages[step].fill);
        step++;
      }
    }, 700);

    try {
      const formData = new FormData();
      uploadedFiles.forEach((f) => {
        if (f.fileObj) {
          formData.append("files", f.fileObj);
        }
      });
      if (selectedMode) {
        formData.append("option", selectedMode);
      } else {
        console.error("Option is missing!");
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

      const response = await fetch(`${API_URL}/debug`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI Debugger backend.");
      }

      const data = await response.json();

      setIssues(data.issues);
      setSolution(data.solution);

      clearInterval(interval);
      setLoadingProgress("100%");
      setTimeout(() => {
        setAppState("results");
        triggerToast("Analysis complete!");
      }, 500);

    } catch (err: any) {
      clearInterval(interval);
      setAppState("empty");
      setError(err.message || "Something went wrong during analysis.");
    }
  };

  const copySolutionCode = () => {
    if (!solution) return;
    navigator.clipboard.writeText(solution);
    setCopied(true);
    triggerToast("Solution code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-slate-200 min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white bg-grid-pattern bg-dark-bg">
      <Navbar onShare={async () => {
        await navigator.clipboard.writeText(window.location.href);
        triggerToast("Copied API endpoint link!");
      }} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        <ControlPanel
          files={uploadedFiles}
          onFilesSelected={handleFilesSelected}
          onRemoveFile={handleRemoveFile}
          onLoadSample={handleLoadSample}
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          onDebug={executeDebuggingProcess}
          error={error}
          targetLang={targetLang}
          setTargetLang={setTargetLang}
          contextNotes={contextNotes}
          setContextNotes={setContextNotes}
          isLoading={appState === "loading"}
        />

        <ResultsWorkbench
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          issues={issues}
          solution={solution}
          appState={appState}
          loadingStageText={loadingStageText}
          loadingStageDesc={loadingStageDesc}
          loadingProgress={loadingProgress}
          scannerImages={uploadedFiles.map(f => f.url)} // 👈 scannerImages (অ্যারে) পাস করা হলো
          copied={copied}
          onCopy={copySolutionCode}
          onToast={triggerToast}
        />
      </main>

      {/* Interactive Toast Notification */}
      <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl bg-slate-900 border border-brand-500/40 text-white text-xs font-medium shadow-2xl flex items-center gap-2.5 transition-all duration-300 z-50 ${showToast ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}>
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}