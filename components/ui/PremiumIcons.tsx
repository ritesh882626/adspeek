import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  tone?: 'emerald' | 'mint' | 'dark' | 'gold';
}

/**
 * Premium Icon wrapper with responsive dimensions and smooth rendering
 */
export function PremiumIconBase({
  children,
  size = 28,
  className = '',
  viewBox = '0 0 32 32',
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      {...props}
    >
      {children}
    </svg>
  );
}

/* ==========================================================================
   BENEFITS SECTION ICONS (Bespoke 32x32 Duotone SVG)
   ========================================================================== */

/**
 * Mobile-First Experiences: Precision smartphone viewport, gesture wave, dynamic notch
 */
export function IconMobileFirst({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Phone Body with Ambient Bevel */}
      <rect x="7" y="3" width="18" height="26" rx="4" stroke={primary} strokeWidth="1.75" />
      <rect x="9.5" y="5.5" width="13" height="21" rx="2" fill={secondary} fillOpacity="0.12" />
      {/* Dynamic Island / Speaker Notch */}
      <rect x="13" y="5" width="6" height="1.5" rx="0.75" fill={primary} />
      {/* Screen Interface: Product Hero Card & Cart Button */}
      <rect x="11" y="9" width="10" height="7" rx="1.5" stroke={primary} strokeWidth="1.2" strokeDasharray="1 1" />
      <path d="M11 19H17" stroke={primary} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 21.5H15" stroke={secondary} strokeWidth="1.2" strokeLinecap="round" />
      {/* Radiant Floating Gesture Arc */}
      <path
        d="M21 21L23 23M24 18H26.5M22.5 14.5L25 13"
        stroke={secondary}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Home Bar Indicator */}
      <path d="M13.5 26.5H18.5" stroke={primary} strokeWidth="1.5" strokeLinecap="round" />
    </PremiumIconBase>
  );
}

/**
 * Sub-Second Speed: High-precision speedometer with velocity ticks and lightning spark
 */
export function IconSubsecondSpeed({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Gauge Outer Arc */}
      <path
        d="M6 22C4.7 19.3 4.5 16 5.5 13C7 8.5 11.2 5 16 5C20.8 5 25 8.5 26.5 13C27.5 16 27.3 19.3 26 22"
        stroke={primary}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Speedometer Track Glow */}
      <path
        d="M8.5 20C7.5 17.8 7.3 15.2 8.2 12.8C9.5 9.2 12.5 6.8 16 6.8"
        stroke={secondary}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />
      {/* Needle Pivot & Precision Velocity Pointer */}
      <circle cx="16" cy="18" r="2.5" fill={primary} />
      <path d="M16 18L21.5 10.5" stroke={primary} strokeWidth="2" strokeLinecap="round" />
      {/* Lightning Flash Spark on Right */}
      <path
        d="M23 15L20.5 19H23.5L21 24"
        stroke={secondary}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base Gauge Line */}
      <path d="M6 25H12M20 25H26" stroke={primary} strokeWidth="1.5" strokeLinecap="round" />
    </PremiumIconBase>
  );
}

/**
 * Customizable Themes: Modular Liquid sections, drag handles, settings gear
 */
export function IconCustomizableTheme({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Theme Canvas Window */}
      <rect x="4" y="5" width="24" height="22" rx="3.5" stroke={primary} strokeWidth="1.75" />
      {/* Window Header */}
      <path d="M4 11H28" stroke={primary} strokeWidth="1.2" />
      <circle cx="7.5" cy="8" r="1" fill={primary} />
      <circle cx="11" cy="8" r="1" fill={secondary} />
      {/* Modular Section Stack */}
      <rect x="7" y="14" width="18" height="4.5" rx="1.5" fill={secondary} fillOpacity="0.2" stroke={primary} strokeWidth="1.2" />
      <rect x="7" y="21" width="11" height="3.5" rx="1" stroke={primary} strokeWidth="1.2" strokeDasharray="1.5 1.5" />
      {/* Interactive Drag / Control Sliders Badge */}
      <circle cx="23" cy="22.5" r="3.5" fill={tone === 'mint' ? '#061A1C' : '#FFFFFF'} stroke={secondary} strokeWidth="1.5" />
      <path d="M21.5 22.5H24.5M23 21V24" stroke={primary} strokeWidth="1.4" strokeLinecap="round" />
    </PremiumIconBase>
  );
}

/**
 * User-Friendly Navigation: Multi-tier taxonomy crystal, search beacon, breadcrumbs
 */
export function IconSmartNavigation({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Compass / Navigation Hub Outer Ring */}
      <circle cx="16" cy="16" r="12" stroke={primary} strokeWidth="1.75" />
      {/* Ambient Radial Fill */}
      <circle cx="16" cy="16" r="9" fill={secondary} fillOpacity="0.12" />
      {/* Compass Star Diamond */}
      <path
        d="M16 7L18.5 13.5L25 16L18.5 18.5L16 25L13.5 18.5L7 16L13.5 13.5L16 7Z"
        fill={primary}
        fillOpacity="0.18"
        stroke={primary}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* North Arrow Accent */}
      <path d="M16 7L18.5 13.5L16 16L13.5 13.5L16 7Z" fill={secondary} />
      {/* Center Pivot Point */}
      <circle cx="16" cy="16" r="1.5" fill={primary} />
    </PremiumIconBase>
  );
}

/**
 * Scalable Architecture: High-availability cloud nodes, layered infrastructure stack
 */
export function IconScalableArchitecture({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Isometric Layer 1 (Top) */}
      <path
        d="M16 4L26 9.5L16 15L6 9.5L16 4Z"
        fill={secondary}
        fillOpacity="0.2"
        stroke={primary}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Isometric Layer 2 (Middle) */}
      <path
        d="M6 14.5L16 20L26 14.5"
        stroke={primary}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Isometric Layer 3 (Bottom Server Base) */}
      <path
        d="M6 19.5L16 25L26 19.5"
        stroke={secondary}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* High-Throughput Core Signal */}
      <path d="M16 10V14M16 16V20" stroke={primary} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="9.5" r="1.5" fill={primary} />
      <circle cx="21" cy="12" r="1" fill={secondary} />
    </PremiumIconBase>
  );
}

/**
 * Analytics-Ready Implementation: Conversion funnel sparkline with upward trajectory
 */
export function IconConversionAnalytics({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Chart Canvas Framing */}
      <rect x="4" y="4" width="24" height="24" rx="4" stroke={primary} strokeWidth="1.75" />
      {/* Grid Lines */}
      <path d="M4 22H28" stroke={primary} strokeWidth="1" strokeOpacity="0.4" />
      <path d="M4 14H28" stroke={primary} strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.25" />
      {/* Metric Bars */}
      <rect x="7.5" y="15" width="3" height="7" rx="1" fill={primary} fillOpacity="0.25" />
      <rect x="12.5" y="11" width="3" height="11" rx="1" fill={primary} fillOpacity="0.4" />
      <rect x="17.5" y="8" width="3" height="14" rx="1" fill={secondary} fillOpacity="0.6" />
      {/* Vector Growth Curve & Beacon */}
      <path
        d="M8 15L13.5 10.5L18 12L24.5 6"
        stroke={secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24.5" cy="6" r="2" fill={secondary} stroke={primary} strokeWidth="1.2" />
    </PremiumIconBase>
  );
}

/* ==========================================================================
   SERVICES SECTION ICONS (Bespoke 32x32 Duotone SVG)
   ========================================================================== */

/**
 * Shopify Store Development: Bespoke storefront with shopping cart extensibility shield
 */
export function IconStoreDev({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Modern Shopping Bag Silhouette */}
      <path
        d="M6 10H26L24.5 26C24.5 27.1 23.6 28 22.5 28H9.5C8.4 28 7.5 27.1 7.5 26L6 10Z"
        stroke={primary}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Bag Interior Fill */}
      <path
        d="M7.5 12H24.5L23.2 25.5C23.2 26.2 22.6 26.8 21.8 26.8H10.2C9.4 26.8 8.8 26.2 8.8 25.5L7.5 12Z"
        fill={secondary}
        fillOpacity="0.12"
      />
      {/* Elegant Bag Handles */}
      <path
        d="M11 10V7C11 4.8 13.2 3 16 3C18.8 3 21 4.8 21 7V10"
        stroke={primary}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Shopify Liquid Symbol Shield / Gem Accent */}
      <path
        d="M16 14L19 18.5L16 23L13 18.5L16 14Z"
        fill={secondary}
        stroke={primary}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="18.5" r="1" fill={primary} />
    </PremiumIconBase>
  );
}

/**
 * Shopify Store Design: Figma vector bezier curves, artboard frame & color palette
 */
export function IconStoreDesign({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Modern Designer Palette & Pen */}
      <path
        d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C17.7 28 19 26.7 19 25C19 24.2 18.7 23.5 18.1 23C17.6 22.5 17.2 21.8 17.2 21C17.2 19.3 18.5 18 20.2 18H22C25.3 18 28 15.3 28 12C28 7.6 22.6 4 16 4Z"
        stroke={primary}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Color Swatch Nodes */}
      <circle cx="9.5" cy="12.5" r="2" fill={secondary} />
      <circle cx="15.5" cy="9.5" r="2" fill={primary} />
      <circle cx="21.5" cy="12.5" r="2" fill={secondary} fillOpacity="0.4" />
      <circle cx="10.5" cy="18.5" r="1.75" fill={primary} fillOpacity="0.25" />
      {/* Precision Anchor Point */}
      <rect x="18" y="22" width="4" height="4" rx="1" fill={secondary} stroke={primary} strokeWidth="1" />
    </PremiumIconBase>
  );
}

/**
 * Custom Shopify Sections: Modular OS 2.0 drag-and-drop sectional blocks
 */
export function IconModularSections({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* 4 Interlocking Grid Blocks */}
      <rect x="4" y="4" width="10.5" height="10.5" rx="2.5" fill={secondary} fillOpacity="0.2" stroke={primary} strokeWidth="1.75" />
      <rect x="17.5" y="4" width="10.5" height="10.5" rx="2.5" stroke={primary} strokeWidth="1.75" />
      <rect x="4" y="17.5" width="10.5" height="10.5" rx="2.5" stroke={primary} strokeWidth="1.75" />
      <rect x="17.5" y="17.5" width="10.5" height="10.5" rx="2.5" fill={primary} fillOpacity="0.15" stroke={secondary} strokeWidth="1.75" />
      {/* Inner Accent Highlights */}
      <path d="M7 9H11.5" stroke={primary} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M20.5 9H25" stroke={primary} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 22.5H11.5" stroke={primary} strokeWidth="1.4" strokeLinecap="round" />
      {/* Active Section Node Plus Indicator */}
      <path d="M22.75 20.5V25M20.5 22.75H25" stroke={secondary} strokeWidth="1.5" strokeLinecap="round" />
    </PremiumIconBase>
  );
}

/**
 * Store Redesign & Migration: 1-to-1 data pipeline & 301 redirect node
 */
export function IconZeroDowntimeMigration({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Source Platform Capsule */}
      <circle cx="9" cy="9" r="5" stroke={primary} strokeWidth="1.75" />
      <circle cx="9" cy="9" r="2.5" fill={primary} fillOpacity="0.2" />
      {/* Target Shopify Capsule */}
      <circle cx="23" cy="23" r="5" stroke={secondary} strokeWidth="1.75" />
      <circle cx="23" cy="23" r="2.5" fill={secondary} />
      {/* Bidirectional Migration Tracks */}
      <path
        d="M15 8H20C21.7 8 23 9.3 23 11V15M23 15L25.5 12.5M23 15L20.5 12.5"
        stroke={primary}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 24H12C10.3 24 9 22.7 9 21V17M9 17L6.5 19.5M9 17L11.5 19.5"
        stroke={secondary}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 301 Shield Indicator */}
      <circle cx="16" cy="16" r="3" fill={tone === 'mint' ? '#061A1C' : '#FFFFFF'} stroke={primary} strokeWidth="1.4" />
      <path d="M15 16L15.8 16.8L17.2 15.2" stroke={secondary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </PremiumIconBase>
  );
}

/**
 * Conversion Rate Optimization (CRO): Target bullseye with upward ROI velocity curve
 */
export function IconCroGrowth({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Target Radar Rings */}
      <circle cx="16" cy="16" r="12" stroke={primary} strokeWidth="1.75" strokeOpacity="0.4" />
      <circle cx="16" cy="16" r="7.5" stroke={primary} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="3" fill={secondary} />
      {/* Exponential Upward Conversion Vector Arrow */}
      <path
        d="M6 24L13 18L18 20L26 8"
        stroke={secondary}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 8H26V13.5"
        stroke={secondary}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </PremiumIconBase>
  );
}

/**
 * Store Maintenance & Support: Diagnostic gear with 24/7 server health heartbeat pulse
 */
export function IconEnterpriseSupport({ size = 28, className = '', tone = 'emerald', ...props }: IconProps) {
  const primary = tone === 'mint' ? '#36F4A4' : '#0C5A48';
  const secondary = tone === 'mint' ? '#C5E1C5' : '#10B981';

  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Outer Protective Hexagonal Shield */}
      <path
        d="M16 3L26 7.5V15C26 21.5 21.7 26.5 16 29C10.3 26.5 6 21.5 6 15V7.5L16 3Z"
        stroke={primary}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Shield Inner Radiant Tint */}
      <path
        d="M16 5L24 8.7V14.8C24 20.3 20.6 24.5 16 26.8C11.4 24.5 8 20.3 8 14.8V8.7L16 5Z"
        fill={secondary}
        fillOpacity="0.12"
      />
      {/* Heartbeat EKG Pulse */}
      <path
        d="M10 16H13L14.5 12.5L17 19.5L19 14.5L20.5 16H22"
        stroke={secondary}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Verified Status Dot */}
      <circle cx="16" cy="7.5" r="1.25" fill={primary} />
    </PremiumIconBase>
  );
}

/* ==========================================================================
   CREDIBILITY STRIP ICONS (Dark Luxury Duotone 32x32)
   ========================================================================== */

export function IconCredibilityStore({ size = 24, className = '', ...props }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} {...props}>
      <rect x="5" y="7" width="22" height="18" rx="3" stroke="#36F4A4" strokeWidth="1.75" />
      <path d="M5 12H27" stroke="#36F4A4" strokeWidth="1.2" strokeOpacity="0.6" />
      <path d="M10 7V5C10 3.9 10.9 3 12 3H20C21.1 3 22 3.9 22 5V7" stroke="#EFF8F0" strokeWidth="1.5" />
      <circle cx="16" cy="18" r="2.5" fill="#36F4A4" fillOpacity="0.3" stroke="#36F4A4" strokeWidth="1.5" />
    </PremiumIconBase>
  );
}

export function IconCredibilityCustom({ size = 24, className = '', ...props }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} {...props}>
      <rect x="4" y="5" width="24" height="22" rx="3" stroke="#36F4A4" strokeWidth="1.75" />
      <path d="M4 11H28" stroke="#36F4A4" strokeWidth="1.2" strokeOpacity="0.4" />
      <rect x="8" y="15" width="6" height="8" rx="1.5" fill="#36F4A4" fillOpacity="0.25" stroke="#EFF8F0" strokeWidth="1.2" />
      <rect x="17" y="15" width="7" height="3.5" rx="1" stroke="#36F4A4" strokeWidth="1.2" />
      <rect x="17" y="20" width="7" height="3" rx="1" stroke="#EFF8F0" strokeWidth="1" strokeDasharray="1 1" />
    </PremiumIconBase>
  );
}

export function IconCredibilityGauge({ size = 24, className = '', ...props }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} {...props}>
      <path d="M6 21C4.7 18 5 14.5 6.8 12C9.5 8 13.5 6 16 6C18.5 6 22.5 8 25.2 12C27 14.5 27.3 18 26 21" stroke="#36F4A4" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="16" cy="18" r="2" fill="#EFF8F0" />
      <path d="M16 18L21 11" stroke="#36F4A4" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 24H11M21 24H26" stroke="#36F4A4" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
    </PremiumIconBase>
  );
}

export function IconCredibilityRetainer({ size = 24, className = '', ...props }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} {...props}>
      <circle cx="16" cy="16" r="11" stroke="#36F4A4" strokeWidth="1.75" />
      <path d="M16 9V16L20 18" stroke="#EFF8F0" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2" fill="#36F4A4" />
      <path d="M7 6L5 4M25 6L27 4" stroke="#36F4A4" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    </PremiumIconBase>
  );
}

/* ==========================================================================
   PROCESS SECTION ICONS (Dark Luxury 32x32)
   ========================================================================== */

export function IconProcessScope({ size = 28, className = '', ...props }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Radar Discovery Loop */}
      <circle cx="15" cy="15" r="9" stroke="#C5E1C5" strokeWidth="1.75" />
      <circle cx="15" cy="15" r="5" stroke="#36F4A4" strokeWidth="1.4" strokeDasharray="2 2" />
      <circle cx="15" cy="15" r="2" fill="#36F4A4" />
      {/* Precision Lens Handle */}
      <path d="M22 22L28 28" stroke="#C5E1C5" strokeWidth="2.2" strokeLinecap="round" />
      {/* Crosshair Ticks */}
      <path d="M15 4V7M15 23V26M4 15H7M23 15H26" stroke="#36F4A4" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
    </PremiumIconBase>
  );
}

export function IconProcessDev({ size = 28, className = '', ...props }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Clean Terminal Canvas */}
      <rect x="4" y="5" width="24" height="22" rx="3.5" stroke="#C5E1C5" strokeWidth="1.75" />
      <path d="M4 11H28" stroke="#C5E1C5" strokeWidth="1.2" strokeOpacity="0.5" />
      {/* Code Brackets */}
      <path d="M10 16L7 19L10 22" stroke="#36F4A4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 16L25 19L22 22" stroke="#36F4A4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 15L14 23" stroke="#EFF8F0" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7.5" cy="8" r="1" fill="#36F4A4" />
      <circle cx="11" cy="8" r="1" fill="#C5E1C5" />
    </PremiumIconBase>
  );
}

export function IconProcessLaunch({ size = 28, className = '', ...props }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} {...props}>
      {/* Orbital Rocket Booster */}
      <path
        d="M16 3C16 3 23 8 23 17L19 21L16 19L13 21L9 17C9 8 16 3 16 3Z"
        fill="#36F4A4"
        fillOpacity="0.15"
        stroke="#C5E1C5"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Cockpit Porthole */}
      <circle cx="16" cy="11" r="2.5" fill="#02090A" stroke="#36F4A4" strokeWidth="1.4" />
      {/* Exhaust Thruster Flame */}
      <path
        d="M14 22L16 27L18 22"
        stroke="#36F4A4"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Atmospheric Star Sparks */}
      <path d="M6 10L7 11M26 10L25 11M5 19L7 18M27 19L25 18" stroke="#C5E1C5" strokeWidth="1.4" strokeLinecap="round" />
    </PremiumIconBase>
  );
}

/* ==========================================================================
   HERO TRUST BADGES & VERIFIED SEALS
   ========================================================================== */

export function IconHeroCheck({ size = 18, className = '', ...props }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} viewBox="0 0 20 20" {...props}>
      <circle cx="10" cy="10" r="8.5" fill="#EBF7F2" stroke="#0C5A48" strokeWidth="1.4" />
      <path d="M6.5 10.2L8.8 12.5L13.5 7.5" stroke="#0C5A48" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </PremiumIconBase>
  );
}

export function IconHeroMobile({ size = 18, className = '', ...props }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} viewBox="0 0 20 20" {...props}>
      <rect x="5.5" y="2.5" width="9" height="15" rx="2.5" fill="#EBF7F2" stroke="#0C5A48" strokeWidth="1.4" />
      <path d="M8.5 4H11.5" stroke="#0C5A48" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.8" fill="#0C5A48" />
    </PremiumIconBase>
  );
}

export function IconHeroZap({ size = 18, className = '', ...props }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} viewBox="0 0 20 20" {...props}>
      <circle cx="10" cy="10" r="8.5" fill="#EBF7F2" stroke="#0C5A48" strokeWidth="1.4" />
      <path
        d="M10.5 4.5L7 11H11L9.5 15.5L14 9.5H10.5L12 4.5"
        stroke="#0C5A48"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </PremiumIconBase>
  );
}

/**
 * Luxury 5-Star Rating Cluster & Emerald Verified Shield for Testimonials
 */
export function PremiumRatingStars({ size = 15, count = 5, className = '' }: { size?: number; count?: number; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Subtle drop shadow/ambient star base */}
          <path
            d="M8 1.5L9.9 5.8L14.5 6.3L11.1 9.4L12 14L8 11.7L4 14L4.9 9.4L1.5 6.3L6.1 5.8L8 1.5Z"
            fill="url(#goldStarGrad)"
            stroke="#D97706"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="goldStarGrad" x1="8" y1="1.5" x2="8" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      ))}
    </div>
  );
}

export function PremiumVerifiedShield({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M9 2L15 4.5V9.5C15 13.5 12.3 16.2 9 17.5C5.7 16.2 3 13.5 3 9.5V4.5L9 2Z"
        fill="#EBF7F2"
        stroke="#0C5A48"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 9.2L8.2 10.9L11.5 7.2"
        stroke="#0C5A48"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ==========================================================================
   ENTERPRISE & PLUS MOCKUP ICONS
   ========================================================================== */

export function IconPlusB2B({ size = 20, className = '' }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} viewBox="0 0 24 24">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="#0C5A48" strokeWidth="1.5" />
      <path d="M8 7H10M14 7H16M8 11H10M14 11H16M8 15H10M14 15H16" stroke="#0C5A48" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 21V18H13V21" stroke="#10B981" strokeWidth="1.5" />
    </PremiumIconBase>
  );
}

export function IconPlusMarkets({ size = 20, className = '' }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="#0C5A48" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke="#10B981" strokeWidth="1.3" />
      <path d="M3 12H21" stroke="#0C5A48" strokeWidth="1.3" />
    </PremiumIconBase>
  );
}

export function IconPlusCheckout({ size = 20, className = '' }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} viewBox="0 0 24 24">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="#0C5A48" strokeWidth="1.5" />
      <path d="M3 10H21" stroke="#0C5A48" strokeWidth="1.2" />
      <circle cx="7" cy="14" r="1" fill="#10B981" />
      <path d="M15 14H18" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" />
    </PremiumIconBase>
  );
}

export function IconNdaLock({ size = 28, className = '' }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} viewBox="0 0 32 32">
      {/* Padlock Body */}
      <rect x="7" y="13" width="18" height="15" rx="3.5" fill="#EBF7F2" stroke="#0C5A48" strokeWidth="1.75" />
      {/* Shackle */}
      <path
        d="M11 13V9.5C11 6.7 13.2 4.5 16 4.5C18.8 4.5 21 6.7 21 9.5V13"
        stroke="#0C5A48"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Keyhole */}
      <circle cx="16" cy="19.5" r="2" fill="#0C5A48" />
      <path d="M16 21.5V24.5" stroke="#0C5A48" strokeWidth="1.75" strokeLinecap="round" />
    </PremiumIconBase>
  );
}

export function IconImpactRocket({ size = 24, className = '' }: IconProps) {
  return (
    <PremiumIconBase size={size} className={className} viewBox="0 0 24 24">
      <path
        d="M12 2C12 2 18 5 18 12L15 15L12 13.5L9 15L6 12C6 5 12 2 12 2Z"
        fill="#0C5A48"
        fillOpacity="0.2"
        stroke="#0C5A48"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7.5" r="1.5" fill="#0C5A48" />
      <path d="M10.5 16L12 19.5L13.5 16" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </PremiumIconBase>
  );
}
