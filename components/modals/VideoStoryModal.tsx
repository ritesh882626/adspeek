'use client';

import React, { useEffect, useState } from 'react';
import { X, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface VideoStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: {
    clientName: string;
    brand: string;
    role: string;
    title: string;
    summary: string;
    highlight: string;
  } | null;
}

export function VideoStoryModal({
  isOpen,
  onClose,
  story,
}: VideoStoryModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !story) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${story.clientName} Story`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-2xl bg-[#061A1C] border border-[#142024] rounded-2xl overflow-hidden shadow-2xl text-white animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Realistic Interactive Video Presentation Container */}
        <div className="relative aspect-video bg-gradient-to-br from-[#02090A] via-[#061A1C] to-[#041E18] flex items-center justify-center overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#36F4A4_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Animated playback visualizer */}
          <div className="relative z-10 text-center px-4 sm:px-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-transform hover:scale-105 cursor-pointer"
            >
              {isPlaying ? (
                <div className="flex items-center gap-1.5 h-6 sm:h-7">
                  <span className="w-1.5 h-5 sm:h-6 bg-[#36F4A4] rounded-full animate-pulse" />
                  <span className="w-1.5 h-7 sm:h-8 bg-[#36F4A4] rounded-full animate-pulse [animation-delay:150ms]" />
                  <span className="w-1.5 h-3.5 sm:h-4 bg-[#36F4A4] rounded-full animate-pulse [animation-delay:300ms]" />
                  <span className="w-1.5 h-6 sm:h-7 bg-[#36F4A4] rounded-full animate-pulse [animation-delay:450ms]" />
                </div>
              ) : (
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1" />
              )}
            </button>

            <p className="text-xs sm:text-sm font-mono text-[#36F4A4] uppercase tracking-wider mb-1">
              Verified Client Case Video
            </p>
            <h4 className="text-base sm:text-xl md:text-2xl font-light text-white line-clamp-2">
              &ldquo;{story.highlight}&rdquo;
            </h4>
          </div>

          {/* Video Control Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4 flex items-center justify-between text-xs text-white/80">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-[11px] sm:text-xs">{isPlaying ? '0:48 / 2:15' : 'Paused'}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#36F4A4] animate-ping shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono text-white/60">HD 1080P</span>
            </div>
          </div>
        </div>

        {/* Story Metadata & Summary */}
        <div className="p-5 sm:p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg font-medium text-white">{story.clientName}</h3>
              <p className="text-sm text-gray-400">
                {story.role} &bull; <span className="text-[#36F4A4]">{story.brand}</span>
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#102620] border border-[#36F4A4]/20 text-[#36F4A4] text-xs font-mono">
              Store Migration &amp; Custom Build
            </span>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">{story.summary}</p>
        </div>
      </div>
    </div>
  );
}
