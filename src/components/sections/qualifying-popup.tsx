import { useState, useEffect } from "react";

const STORAGE_KEY = "hermesops_popup_dismissed";
const SHOW_DELAY_MS = 15000;

export default function QualifyingPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    if (window.location.pathname.startsWith("/quiz")) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-3rem)] max-w-lg animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-6 flex items-start gap-4">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="shrink-0 w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>

        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-sm font-semibold mb-1">How much time is your team losing?</h3>
          <p className="text-muted-foreground text-xs mb-3">Take a 60-second quiz. Get a free automation audit.</p>
          <a
            href="/quiz"
            onClick={() => sessionStorage.setItem(STORAGE_KEY, "1")}
            className="inline-block bg-accent text-accent-foreground px-5 py-2 rounded-full text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Take the quiz
          </a>
        </div>
      </div>
    </div>
  );
}
