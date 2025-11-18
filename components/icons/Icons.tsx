
import React from 'react';

export const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    {...props}
  />
);

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
  </Icon>
);

export const FilmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h15a3 3 0 003-3v-9a3 3 0 00-3-3h-15z" />
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v.008c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V5.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-.008a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v.008a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0v.008c0 .414.336.75.75.75h3v12h-3a.75.75 0 00-.75.75v.008h-1.5V5.25h1.5z" clipRule="evenodd" />
  </Icon>
);

export const TvIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M3.75 3h16.5c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H3.75A1.125 1.125 0 012.625 15.375V4.125C2.625 3.504 3.129 3 3.75 3zM1.5 15.375V4.125C1.5 2.84 2.505 1.75 3.75 1.75h16.5c1.245 0 2.25 1.09 2.25 2.375v11.25c0 1.285-1.005 2.375-2.25 2.375H3.75c-1.245 0-2.25-1.09-2.25-2.375z" />
  </Icon>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path fillRule="evenodd" d="M9.344 3.071a.75.75 0 011.06 1.06-4.5 4.5 0 006.012 6.012.75.75 0 011.06 1.061 6 6 0 01-8.132 8.132.75.75 0 11-1.06-1.06 4.5 4.5 0 00-6.012-6.012.75.75 0 01-1.06-1.061 6 6 0 018.132-8.132zM10.849 9.75a.75.75 0 001.06 1.06l1.06-1.06a.75.75 0 10-1.06-1.06l-1.06 1.06z" clipRule="evenodd" />
  </Icon>
);

export const MagnifyingGlassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
  </Icon>
);

export const WandSparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
      <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 011.06 0l1.25 1.25a.75.75 0 01-1.06 1.06L9.53 3.53a.75.75 0 010-1.06zm-2.25 2.25a.75.75 0 00-1.06 0l-1.25 1.25a.75.75 0 001.06 1.06l1.25-1.25a.75.75 0 000-1.06zM13.28 7.28a.75.75 0 011.06 0l1.25 1.25a.75.75 0 01-1.06 1.06l-1.25-1.25a.75.75 0 010-1.06zm-2.25 2.25a.75.75 0 00-1.06 0l-1.25 1.25a.75.75 0 001.06 1.06l1.25-1.25a.75.75 0 000-1.06zM21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75a.75.75 0 000-1.5h-4.5a.75.75 0 000 1.5h4.5z" clipRule="evenodd" />
    </Icon>
);

export const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.536 0 3.284L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </Icon>
);

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.615 2.875c-.995.608-2.23-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </Icon>
);

export const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
  </Icon>
);

export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
  </Icon>
);

export const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
  </Icon>
);

export const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </Icon>
);
