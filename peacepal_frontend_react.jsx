import React, { useState, useEffect } from "react";

// PeacePal Dashboard - single-file React component (TailwindCSS)
// Usage: drop into a React + Tailwind project. This component is intentionally
// self-contained and focuses on visual layout & interactions inspired by the
// provided designs (journal card, sentiment gauge, discovery feed, garden).

export default function PeacePalDashboard() {
  const [journal, setJournal] = useState(
    "Today, I took some time to enjoy the outdoors. I went for a long walk in the park and appreciated the fresh air and sunshine."
  );
  const [suggestions, setSuggestions] = useState(["Reflect on something you are grateful for today."]);
  const [sentiment, setSentiment] = useState(4); // 1..5
  const [wellnessPoints, setWellnessPoints] = useState(72);

  useEffect(() => {
    // subtle entrance animation placeholder
    const root = document.getElementById("peacepal-root");
    if (root) root.classList.remove("opacity-0");
  }, []);

  function saveJournal() {
    // placeholder save logic
    alert("Journal saved — sentiment " + sentiment);
  }

  function addPoint() {
    setWellnessPoints((p) => Math.min(999, p + 5));
  }

  function changeSentiment(delta) {
    setSentiment((s) => Math.max(1, Math.min(5, s + delta)));
  }

  return (
    <div id="peacepal-root" className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 p-6 opacity-0 transition-opacity duration-600">
      <div className="max-w-6xl mx-auto">
        {/* Top header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">PP</div>
            <h1 className="text-2xl font-semibold text-slate-800">Wellness Journal</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-lg bg-white shadow text-slate-700">–</button>
            <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white shadow">Reports</button>
          </div>
        </header>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Journal card (large) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-2 text-slate-400">
                  <button className="text-lg font-bold">B</button>
                  <button className="italic">I</button>
                  <button className="pl-2">☰</button>
                </div>
                <h2 className="text-xl font-semibold text-slate-800">Write about your thoughts and feelings...</h2>
              </div>
              <div className="text-slate-400">•••</div>
            </div>

            <textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              className="w-full mt-6 p-6 rounded-xl border border-slate-100 min-h-[220px] text-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3 text-slate-500">
                <div className="text-sm">On-device sentiment</div>
                <div className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-medium">{sentiment}/5</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => changeSentiment(-1)}
                  className="px-3 py-2 rounded-lg bg-white border text-slate-700 hover:bg-slate-50"
                >
                  –
                </button>
                <button
                  onClick={() => changeSentiment(1)}
                  className="px-3 py-2 rounded-lg bg-white border text-slate-700 hover:bg-slate-50"
                >
                  +
                </button>
                <button onClick={saveJournal} className="px-4 py-2 rounded-lg bg-emerald-600 text-white shadow">
                  Save Entry
                </button>
              </div>
            </div>
          </div>

          {/* Right column: Sentiment + Suggestions + Garden */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-slate-800">Sentiment</h3>
              {/* Simple semicircle gauge */}
              <div className="flex items-center justify-center">
                <svg width="160" height="100" viewBox="0 0 160 100">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="60%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f87171" />
                    </linearGradient>
                  </defs>
                  <path d="M10 90 A70 70 0 0 1 150 90" fill="none" stroke="#eef6f2" strokeWidth="18" strokeLinecap="round" />
                  <path
                    d="M10 90 A70 70 0 0 1 150 90"
                    fill="none"
                    stroke="url(#g1)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeDasharray={`${(sentiment / 5) * 440} 440`}
                    transform="rotate(-2 80 80)"
                  />
                  <circle cx="80" cy="60" r="18" fill="#fff" stroke="#e6f6ee" strokeWidth="6" />
                  <text x="80" y="66" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">
                    {sentiment === 5 ? "😊" : sentiment >= 3 ? "🙂" : "😟"}
                  </text>
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-slate-800">AI Suggestions</h3>
              <div className="space-y-2">
                {suggestions.map((s, i) => (
                  <div key={i} className="bg-emerald-50 rounded-lg p-3 text-slate-700">
                    {s}
                  </div>
                ))}
                <div className="text-sm text-slate-400 mt-2">Tap a suggestion to add to journal</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-slate-800">Stress Relief Garden</h3>
              <div className="flex items-center justify-center">
                <div className="w-40 h-32 relative rounded-md overflow-hidden bg-gradient-to-b from-emerald-100 to-emerald-200">
                  {/* simple playful garden illustration (vector-like shapes) */}
                  <div className="absolute left-3 bottom-4 w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold">🐻</div>
                  <div className="absolute right-3 bottom-6 w-12 h-12 rounded-full bg-rose-400 flex items-center justify-center text-white font-bold">🌸</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-slate-500">Wellness Score</div>
                <div className="text-sm font-semibold">{wellnessPoints}/100</div>
              </div>
              <div className="mt-3 text-right">
                <button onClick={addPoint} className="px-3 py-2 rounded-lg bg-emerald-600 text-white">Continue</button>
              </div>
            </div>
          </aside>
        </div>

        {/* Discovery feed and lower cards */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Discovery</h3>
            <div className="space-y-4">
              <article className="flex items-start gap-4">
                <div className="w-28 h-16 bg-slate-100 rounded-lg flex items-center justify-center">🎥</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">The Benefits of Regular Exercise</h4>
                  <p className="text-sm text-slate-500">Simple routines to keep your body and mind healthy.</p>
                </div>
                <div className="text-slate-400">1,042</div>
              </article>

              <hr />

              <article className="flex items-start gap-4">
                <div className="w-20 h-12 bg-slate-100 rounded-lg flex items-center justify-center">📄</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">10 Tips for a Balanced Diet</h4>
                  <p className="text-sm text-slate-500">Learn how to maintain a healthy, well-rounded diet.</p>
                </div>
                <div className="text-slate-400">Curated</div>
              </article>

              <hr />

              <article className="flex items-start gap-4">
                <div className="w-20 h-12 bg-slate-100 rounded-lg flex items-center justify-center">🛌</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">How to Improve Your Sleep</h4>
                  <p className="text-sm text-slate-500">Gentle tips to create a calming bedtime routine.</p>
                </div>
                <div className="text-slate-400">230</div>
              </article>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Progress</h3>
            <div className="h-36 bg-gradient-to-r from-rose-50 via-yellow-50 to-emerald-50 rounded-xl flex items-center justify-center text-slate-500">Chart placeholder</div>
          </div>
        </section>

        {/* Footer small stats */}
        <footer className="mt-8 text-center text-sm text-slate-500">PeacePal — privacy-first wellness journal</footer>
      </div>
    </div>
  );
}
