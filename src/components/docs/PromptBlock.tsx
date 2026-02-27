"use client";

import { useState } from "react";
import { CopyCodeButton } from "@/components/CopyCodeButton";

const FOLDED_MAX_LINES = 4;
const LINE_HEIGHT_REM = 1.5;

export function PromptBlock({ children }: { children: string }) {
  const [expanded, setExpanded] = useState(false);
  const foldedHeight = FOLDED_MAX_LINES * LINE_HEIGHT_REM;

  return (
    <div className="relative mt-6 rounded-xl border border-[var(--accent)]/20 bg-[var(--accent-light)] px-5 pb-4 pt-6">
      <span className="absolute -top-2.5 left-4 rounded-full border border-[var(--accent)]/20 bg-[var(--bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-dim)]">
        Agent prompt
      </span>
      <div className="relative">
        <pre
          className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-[var(--fg)]"
          style={
            expanded
              ? undefined
              : { maxHeight: `${foldedHeight}rem`, overflow: "hidden" }
          }
        >
          {children.trim()}
        </pre>
        {!expanded && (
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--accent-light)] to-transparent"
            aria-hidden
          />
        )}
      </div>
      <CopyCodeButton
        text={children.trim()}
        className="text-[var(--accent-dim)] hover:text-[var(--accent)]"
      />
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--accent)]/30 bg-[var(--bg)]/50 py-2 text-xs font-medium text-[var(--accent-dim)] transition-colors hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
      >
        {expanded ? (
          <>
            <span aria-hidden>↑</span> Show less
          </>
        ) : (
          <>
            <span aria-hidden>↓</span> Show more
          </>
        )}
      </button>
    </div>
  );
}
