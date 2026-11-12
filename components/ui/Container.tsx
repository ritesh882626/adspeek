import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
}) => {
  return (
    <Component className={`max-w-[1280px] mx-auto px-5 sm:px-8 w-full ${className}`}>
      {children}
    </Component>
  );
};

export default Container;
