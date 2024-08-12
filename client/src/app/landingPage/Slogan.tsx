import React from 'react';

interface TitleSectionProps {
  title: React.ReactNode;
  pill: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  pill,
}) => {
  return (
    <section className="
      flex
      flex-col
      gap-4
      justify-center
      items-start
      md:items-center
    ">
      <article className="
        rounded-full
        p-[1px]
        text-sm
        dark:bg-gradient-to-r
        dark:from-brand-primaryBlue
        dark:to-brand-primaryPurple
      ">
        <div className="
          rounded-full 
          px-3
          py-1
          dark:bg-black
        ">
          {pill}
        </div>
      </article>
      <h1 className="
        text-left 
        text-4xl
        sm:text-6xl
        sm:max-w-[850px]
        md:text-center
        font-semibold
        flex flex-col items-start
      ">
        {title}
      </h1>
    </section>
  );
};

export default TitleSection;
