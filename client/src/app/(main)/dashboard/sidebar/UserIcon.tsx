import React from 'react';

interface UserIconProps {
  initial: string;
}

const UserIcon: React.FC<UserIconProps> = ({ initial }) => {
  return (
    <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-gray-800 font-semibold">
      {initial}
    </div>
  );
};

export default UserIcon;