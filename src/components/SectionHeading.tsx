import React from 'react';

interface SectionHeadingProps {
  number?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  badge,
  title,
  subtitle,
  align = 'left',
  light = false,
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}>
      <div className={`flex items-center gap-3 mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
        {number && (
          <span className="text-xs font-mono tracking-widest text-[#eb0028] uppercase font-semibold">
            {number}
          </span>
        )}
        {number && badge && (
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
        )}
        {badge && (
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            {badge}
          </span>
        )}
      </div>

      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-[1.1] text-white">
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? 'text-neutral-300' : 'text-neutral-400'}`}>
          {subtitle}
        </p>
      )}

      <div className={`mt-6 h-[2px] w-12 bg-[#eb0028] ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
};
