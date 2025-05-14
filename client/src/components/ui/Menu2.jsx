import { EllipsisVertical } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const Menus = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu, closeMenu }}>
      <div className="relative inline-block text-left">{children}</div>
    </MenuContext.Provider>
  );
};

const Button = ({ children }) => {
  const { toggleMenu } = useContext(MenuContext);

  return (
    <button
      onClick={toggleMenu}
      className="text-indigo-500 cursor-pointer rounded-md border border-gray-200 dark:border-gray-800 p-2"
    >
      <EllipsisVertical className="" />
    </button>
  );
};

const List = ({ children }) => {
  const { isOpen } = useContext(MenuContext);

  if (!isOpen) return null;

  return (
    <ul className="absolute right-0 z-10 p-2 mt-2 w-44 origin-top-right rounded-md bg-gray-50 dark:bg-dark-bg-1  border dark:border-gray-800 border-gray-100">
      {children}
    </ul>
  );
};

const Item = ({ children, onClick }) => {
  const { closeMenu } = useContext(MenuContext);

  const handleClick = () => {
    onClick?.();
    closeMenu();
  };

  return (
    <li
      onClick={handleClick}
      className="block p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md cursor-pointer"
    >
      {children}
    </li>
  );
};

Menus.Button = Button;
Menus.List = List;
Menus.Item = Item;
