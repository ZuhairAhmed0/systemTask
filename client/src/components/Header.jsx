import { FaRegCheckSquare } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Header = ({ username, onLogout }) => {
  return (
    <div className="bg-gray-800 text-mauve-300 p-4 flex items-center justify-between">
      
      {/* Left side: Logo and Title. Added whitespace-nowrap to prevent line breaks */}
      <h2 className="flex items-center text-xl sm:text-2xl whitespace-nowrap">
        <FaRegCheckSquare className="text-3xl sm:text-4xl mr-2 text-green-500" />
        System Task
      </h2>

      {/* Right side: User Info and Actions. Used gap instead of margins for better spacing */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Hidden on very small screens, visible on sm screens and up */}
        <p className="hidden sm:block">
          Welcome, <span className="font-bold text-mauve-100">{username}</span>!
        </p>
        
        {/* User Avatar. Added shrink-0 to prevent it from squishing */}
        <div
          className="
          flex items-center justify-center 
          h-9 w-9 shrink-0
          rounded-full 
          bg-gray-800
          border border-green-100
          shadow-md
        "
        >
          <span className="text-white font-bold">{username.slice(0, 1)}</span>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center hover:text-rose-200 transition-colors duration-300"
        >
          <FaArrowRightFromBracket className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Header;

export default Header;
