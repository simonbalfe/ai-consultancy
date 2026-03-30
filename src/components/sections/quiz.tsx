import { useState } from "react";

type Step = 1 | 2 | 3 | 4 | 5;

const TOTAL_STEPS = 5;

const teamSizeOptions = ["Just me", "2-10", "11-50", "50+"];

const challengeOptions = [
  "Too much manual work",
  "Slow response times",
  "Scaling operations",
  "Data & reporting",
  "Something else",
];

const budgetOptions = [
  "Under $2k/mo",
  "$2k-5k/mo",
  "$5k-10k/mo",
  "$10k+/mo",
  "Not sure yet",
];

const timelineOptions = [
  "ASAP",
  "Next 1-2 months",
  "Next quarter",
  "Just exploring",
];

const BREVO_API_KEY = import.meta.env.PUBLIC_BREVO_API_KEY || "";
const BREVO_LIST_ID = 9;

async function submitQuiz(payload: Record<string, string>) {
  if (!BREVO_API_KEY || !BREVO_LIST_ID) {
    console.warn("Brevo not configured. Set PUBLIC_BREVO_API_KEY and PUBLIC_BREVO_LIST_ID.");
    return { ok: true };
  }

  const headers = {
    "Content-Type": "application/json",
    "api-key": BREVO_API_KEY,
  };

  const [firstName, ...lastParts] = (payload.name || "").trim().split(" ");
  const lastName = lastParts.join(" ");

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({
      email: payload.email,
      listIds: [BREVO_LIST_ID],
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        COMPANY: payload.company || "",
        TEAM_SIZE: payload.teamSize,
        CHALLENGE: payload.challenge,
        BUDGET: payload.budget,
        TIMELINE: payload.timeline,
      },
      updateEnabled: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo subscribe failed (${res.status}): ${body}`);
  }

  return res.status === 204 ? { ok: true } : res.json();
}

export default function Quiz() {
  const [step, setStep] = useState<Step>(1);
  const [teamSize, setTeamSize] = useState("");
  const [challenge, setChallenge] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS) as Step);
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1) as Step);
  }

  function selectAndNext(setter: (v: string) => void, value: string) {
    setter(value);
    setTimeout(next, 150);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    const payload = {
      teamSize,
      challenge,
      budget,
      timeline,
      name,
      email,
      company,
      submittedAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      await submitQuiz(payload);
      setDone(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const progressPct = done ? 100 : ((step - 1) / TOTAL_STEPS) * 100 + (step === TOTAL_STEPS ? 80 : 0);

  if (done) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">You are all set.</h2>
          <p className="text-muted-foreground mb-8">
            We will review your answers and send a personalized automation audit to <span className="text-foreground font-medium">{email}</span> within 24 hours.
          </p>
          <a
            href="/"
            className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Step 1: Team size */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">How big is your team?</h2>
          <p className="text-muted-foreground mb-8">The number of people who would benefit from automation.</p>
          <div className="grid grid-cols-2 gap-3">
            {teamSizeOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => selectAndNext(setTeamSize, opt)}
                className={`px-5 py-4 rounded-xl border text-sm font-medium transition-all ${
                  teamSize === opt
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-card text-foreground hover:border-accent/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Challenge */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Biggest bottleneck right now?</h2>
          <p className="text-muted-foreground mb-8">Pick the one that costs you the most time.</p>
          <div className="flex flex-col gap-3">
            {challengeOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => selectAndNext(setChallenge, opt)}
                className={`px-5 py-4 rounded-xl border text-sm font-medium text-left transition-all ${
                  challenge === opt
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-card text-foreground hover:border-accent/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <BackButton onClick={back} />
        </div>
      )}

      {/* Step 3: Budget */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">What is your monthly budget for this?</h2>
          <p className="text-muted-foreground mb-8">No commitment. Helps us scope the right solution.</p>
          <div className="flex flex-col gap-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => selectAndNext(setBudget, opt)}
                className={`px-5 py-4 rounded-xl border text-sm font-medium text-left transition-all ${
                  budget === opt
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-card text-foreground hover:border-accent/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <BackButton onClick={back} />
        </div>
      )}

      {/* Step 4: Timeline */}
      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">When do you want to get started?</h2>
          <p className="text-muted-foreground mb-8">We will prioritize based on urgency.</p>
          <div className="grid grid-cols-2 gap-3">
            {timelineOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => selectAndNext(setTimeline, opt)}
                className={`px-5 py-4 rounded-xl border text-sm font-medium transition-all ${
                  timeline === opt
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-card text-foreground hover:border-accent/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <BackButton onClick={back} />
        </div>
      )}

      {/* Step 5: Contact details */}
      {step === 5 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Where should we send your audit?</h2>
          <p className="text-muted-foreground mb-8">We will put together a personalized breakdown based on your answers.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name (optional)"
              className="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-accent text-accent-foreground px-5 py-3.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Get my free audit"}
            </button>
          </form>
          <BackButton onClick={back} />
        </div>
      )}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      &larr; Back
    </button>
  );
}
