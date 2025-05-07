import clsx from 'clsx';

interface SpaceProps {
  type?: 'vertical' | 'horizontal';
  size?: number;
}

const Space = ({ type = 'vertical', size = 4 }: SpaceProps) => {
  const dimensionClass =
    type === 'vertical'
      ? `h-${size} w-full`
      : `w-${size} inline-block`;

  return <div className={clsx(dimensionClass, 'flex-shrink-0')}></div>;
};

export default Space;
