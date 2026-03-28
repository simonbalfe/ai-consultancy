import { useState, useEffect } from "react";

const STORAGE_KEY = "hermesops_popup_dismissed";
const SHOW_DELAY_MS = 2000;

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
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={dismiss}
      />

      {/* Centered modal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in zoom-in-95 fade-in duration-500">
        <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mx-auto w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-5">
            <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>

          <h3 className="text-lg font-semibold mb-2">How much time is your team losing?</h3>
          <p className="text-muted-foreground text-sm mb-5">Take a 60-second quiz and get a free, personalised automation audit for your business.</p>
          <a
            href="/quiz"
            onClick={() => sessionStorage.setItem(STORAGE_KEY, "1")}
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Take the quiz
          </a>
          <p className="text-muted-foreground text-xs mt-3">No email required. Takes 60 seconds.</p>
        </div>
      </div>
    </>
  );
}
