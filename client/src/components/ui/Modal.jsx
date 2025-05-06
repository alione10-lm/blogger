import { X } from "lucide-react";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setopenName] = useState("");

  const close = () => setopenName("");
  const open = setopenName;

  return (
    <ModalContext.Provider
      value={{
        close,
        openName,
        open,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  //   return <button onClick={() => open(opensWindowName)}>{children}</button>;
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const { ref } = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 w-full h-full overflow-y-auto  bg-black/10 backdrop-blur-xs z-[1000] transition-all duration-500">
      <div
        ref={ref}
        className="fixed w-full dark:border dark:border-slate-700 md:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-bg-1 rounded-lg shadow-lg p-8 transition-all duration-500"
      >
        <button
          onClick={close}
          className="absolute cursor-pointer top-[1.2rem] right-[1.9rem] p-1 rounded-sm translate-x-3 transition-all duration-200 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-100/4"
        >
          <X />
        </button>
        {cloneElement(children, { closeModal: close })}
      </div>
    </div>,
    document.querySelector("body")
  );
}
Modal.Open = Open;
Modal.Window = Window;
export default Modal;
