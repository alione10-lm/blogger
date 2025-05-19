import { EllipsisVertical } from "lucide-react";
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const MenuContext = createContext();

export const Menu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu, closeMenu }}>
      <div className="relative inline-block text-left">{children}</div>
    </MenuContext.Provider>
  );
};

const Button = ({ children }) => {
  const { toggleMenu, isOpen } = useContext(MenuContext);

  return (
    <button
      onClick={toggleMenu}
      className="text-indigo-500 flex items-center cursor-pointer rounded-md border border-gray-200 dark:border-gray-800 p-1"
    >
      <EllipsisVertical size={15} />
    </button>
  );
};

const List = ({ children }) => {
  const { isOpen, closeMenu } = useContext(MenuContext);

  const { ref } = useOutsideClick(closeMenu);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute  right-0 z-10 p-2 mt-2 w-44 origin-top-right rounded-md bg-gray-50 dark:bg-dark-bg-1  border dark:border-gray-800 border-gray-100"
    >
      {children}
    </div>
  );
};

const Item = ({ children }) => {
  const { closeMenu } = useContext(MenuContext);

  return (
    <div className="flex items-center p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md cursor-pointer">
      {/* {children} */}
      {cloneElement(children, { closeMenu })}
    </div>
  );
};

Menu.Button = Button;
Menu.List = List;
Menu.Item = Item;

export default Menu;
