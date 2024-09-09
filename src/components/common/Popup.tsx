import { X } from "@phosphor-icons/react";
import cn from "classnames";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const portalRoot = document.getElementById("portal-root")!;

const Popup = ({ isOpen, onClose, children }: PopupProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className={cn("fixed inset-0 z-50 flex items-center justify-center", {
        "bg-black bg-opacity-50": isOpen,
      })}
    >
      <div className="bg-white p-4 rounded-xl border border-neutral-200 relative w-full max-w-lg mx-4">
        <button
          className="absolute top-4 right-4 text-neutral-200 hover:text-neutral-400"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </div>,
    portalRoot
  );
};

export default Popup;
