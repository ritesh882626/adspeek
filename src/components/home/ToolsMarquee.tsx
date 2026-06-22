"use client";

import Image from "next/image";

const tools = [
  { name: "Google", src: "/icons/google.png" },
  { name: "Meta", src: "/icons/meta.png" },
  { name: "Figma", src: "/icons/figma.png" },
  { name: "Slack", src: "/icons/slack.png" },
  { name: "LinkedIn", src: "/icons/linkedin.png" },
  { name: "Adobe After Effects", src: "/icons/after-effects.png" },
  { name: "Adobe InDesign", src: "/icons/indesign.png" },
  { name: "Play Store", src: "/icons/playstore.png" },
  { name: "PayPal", src: "/icons/paypal.png" },
  { name: "Social", src: "/icons/social.png" },
  { name: "Gmail", src: "/icons/gmail.png" },
];

// Duplicate for seamless loop
const doubled = [...tools, ...tools];

export default function ToolsMarquee() {
  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <div className="flex gap-5 sm:gap-8 animate-marquee pause-on-hover w-max">
        {doubled.map((tool, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border border-[var(--border)] shadow-sm flex items-center justify-center hover:shadow-md hover:scale-110 transition-all duration-300"
            title={tool.name}
          >
            <Image
              src={tool.src}
              alt={tool.name}
              width={36}
              height={36}
              sizes="(max-width: 639px) 26px, 36px"
              className="h-[26px] w-[26px] object-contain sm:h-9 sm:w-9"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
