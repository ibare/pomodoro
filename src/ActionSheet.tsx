import React from 'react';
import clsx from 'clsx';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ActionSheet: React.FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* 오버레이 */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/50 transition-opacity duration-300 z-40',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* 액션시트 */}
      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 bg-white rounded-t-4xl shadow-lg z-50 transform transition-transform duration-300 p-6',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ minHeight: '200px' }}
      >
        {children}
      </div>
    </>
  );
};

export default ActionSheet;
