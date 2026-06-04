import { FaRegCheckSquare } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Header = ({ username, onLogout }) => {
  return (
    <div className="bg-gray-800 text-mauve-300 p-4 flex items-center justify-between">
      <h2 className="text-2xl mb-3">
        <FaRegCheckSquare className="inline-block text-4xl mr-2 text-green-500" />
        System Task
      </h2>
      <div className="flex items-center space-x-4">
        <p className="mr-8">
          Welcome, <span className="font-bold text-mauve-100">{username}</span>!
        </p>
        <div
          className="
          flex items-center justify-center 
          h-9 w-9
          rounded-full 
          bg-gray-800
          border border-green-100
          shadow-md
        "
        >
          <span className="text-white font-bold">{username.slice(0, 1)}</span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center hover:text-rose-200 transition-colors duration-300"
        >
          <FaArrowRightFromBracket className="inline-block mr-2" />
        </button>
      </div>
    </div>
  );
};

export default Header;
