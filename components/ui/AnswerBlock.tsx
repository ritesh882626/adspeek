import React from 'react';
import { Sparkles } from 'lucide-react';

interface AnswerBlockProps {
  answer: string;
  badge?: string;
  highlightText?: string;
}

export function AnswerBlock({
  answer,
  badge = 'DIRECT ANSWER',
  highlightText,
}: AnswerBlockProps) {
  return (
    <div className="my-6 sm:my-8 p-5 sm:p-7 rounded-2xl bg-[#EBF7F2] border border-[#C5E1C5]/80 text-[#0C5A48] relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3 text-xs font-mono font-semibold tracking-wider uppercase text-[#0C5A48]">
        <Sparkles className="w-4 h-4 text-[#0C5A48] shrink-0" />
        <span>{badge}</span>
      </div>
      <p className="text-base sm:text-lg font-light leading-relaxed text-gray-950">
        {answer}
      </p>
      {highlightText && (
        <div className="mt-3 pt-3 border-t border-[#C5E1C5]/60 text-xs sm:text-sm font-medium text-[#0C5A48]">
          {highlightText}
        </div>
      )}
    </div>
  );
}
