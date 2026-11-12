import React from 'react';
import { ContactData } from './useBuilder';

interface StepContactProps {
  contact: ContactData;
  onChange: (field: keyof ContactData, value: string) => void;
}

export const StepContact: React.FC<StepContactProps> = ({ contact, onChange }) => {
  return (
    <fieldset className="border-0 m-0 p-0 min-w-0">
      <legend className="p-0 m-0 mb-5 flex items-baseline gap-4 w-full">
        <span className="font-mono text-[14px] text-muted shrink-0">06</span>
        <span className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink">
          Where should we send your quote?
        </span>
      </legend>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Field 1: Your name */}
        <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink">
          Your name
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={(e) => onChange('name', e.target.value)}
            autoComplete="name"
            required
            className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none"
          />
        </label>

        {/* Field 2: Brand name or website */}
        <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink">
          Brand name or website
          <input
            type="text"
            name="brand"
            value={contact.brand}
            onChange={(e) => onChange('brand', e.target.value)}
            autoComplete="organization"
            className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none"
          />
        </label>

        {/* Field 3: WhatsApp or email */}
        <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink">
          WhatsApp or email
          <input
            type="text"
            name="contact"
            value={contact.contact}
            onChange={(e) => onChange('contact', e.target.value)}
            autoComplete="email"
            required
            className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none"
          />
        </label>

        {/* Field 4: Timeline */}
        <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-ink">
          When do you want to launch?
          <select
            name="timeline"
            value={contact.timeline}
            onChange={(e) => onChange('timeline', e.target.value)}
            className="text-[16px] p-3.5 border border-[#8A8F86] bg-paper min-h-[48px] font-normal text-ink focus:outline-none focus:border-ink rounded-none"
          >
            <option value="">Choose one</option>
            <option value="asap">As soon as possible</option>
            <option value="1-2-months">In 1–2 months</option>
            <option value="3-plus-months">In 3+ months</option>
            <option value="exploring">Just exploring</option>
          </select>
        </label>
      </div>
    </fieldset>
  );
};

export default StepContact;

