import { useRef } from "react";

const useSingleClick = () => {
  const locked = useRef(false);

  const run = async (callback) => {
    if (locked.current) return; // block all extra clicks
    locked.current = true;

    try {
      await callback();
    } finally {
      locked.current = false; // unlock after completion
    }
  };

  return run;
};

export default useSingleClick;
