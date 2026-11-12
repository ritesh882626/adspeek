import React from 'react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Placeholder from '../ui/Placeholder';
import { TEAM_MEMBERS } from '@/data/team';

export const Team: React.FC = () => {
  return (
    <Section
      id="team"
      bg="white"
      border={true}
      padTopDesktop={96}
      padBottomDesktop={96}
      padTopMobile={64}
      padBottomMobile={64}
    >
      <Eyebrow>The team</Eyebrow>
      <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink m-0 mb-12">
        The people on your project.
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="flex flex-col gap-3">
            <Placeholder
              ratio="1/1"
              label={member.photoLabel}
              className="w-full"
            />
            <p className="m-0 text-[16px] sm:text-[18px] font-bold text-ink">
              {member.name}
            </p>
            <p className="m-0 text-[13px] sm:text-[14px] text-muted">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Team;
