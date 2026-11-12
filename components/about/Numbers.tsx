import React from 'react';
import Container from '../ui/Container';

export const Numbers: React.FC = () => {
  const stats = [
    { num: '[X]+ yrs', label: 'Running AdsPeek' },
    { num: '[XX]', label: 'Stores launched' },
    { num: '[X]', label: 'Countries served' },
    { num: '[XX]', label: 'Brands running ads with us' },
  ];

  return (
    <section className="bg-forest border-b border-line w-full py-16">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-7 border-forest-line ${
                idx % 2 !== 0 ? 'border-l sm:border-l' : 'border-l-0 sm:border-l'
              } ${idx >= 2 ? 'border-t sm:border-t-0' : ''}`}
            >
              <p className="text-[32px] sm:text-[40px] lg:text-[44px] font-extrabold tracking-[-0.03em] text-white m-0 leading-none">
                {s.num}
              </p>
              <p className="mt-2 mb-0 text-[14px] sm:text-[15px] text-forest-text">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Numbers;
