import React from 'react';

interface TitleSectionProps {
  title: React.ReactNode;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
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
        relative
        rounded-full
        text-sm
        text-white
      ">
        <div className="
          relative
          z-10
          px-3
          py-1
        ">
  
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
        text-white
      ">
        {title}
      </h1>
    </section>
  );
};

export default TitleSection;
