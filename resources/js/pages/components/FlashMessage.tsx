import * as Toast from "@radix-ui/react-toast";
import { useEffect, useState } from "react";

interface FlashMessageProps {
  flash: {
    message?: string;
    type?: "success" | "error" | string;
  };
}

export default function FlashMessage({ flash }: FlashMessageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (flash?.message) setOpen(true);
  }, [flash]);

  if (!flash?.message) return null;

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root className={`bg-${flash.type === "success" ? "green" : "red"}-500 text-white px-4 py-2 rounded shadow`} open={open} onOpenChange={setOpen}>
        <Toast.Title>{flash.message}</Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="fixed top-4 right-4 z-50" />
    </Toast.Provider>
  );
}