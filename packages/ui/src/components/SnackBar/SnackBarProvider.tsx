import * as React from "react";
import { SnackBar } from "./SnackBar";
import * as styles from "./SnackBar.css";
import type { SnackBarOptions } from "./types";

const DEFAULT_DURATION = 4000;

type Phase = "enter" | "display" | "exit";

interface SnackBarContextValue {
  // SnackBar를 큐에 넣어 앞선 SnackBar의 Exit이 끝난 뒤 차례로 노출 되도록 함.
  show: (options: SnackBarOptions) => void;
}

const SnackBarContext = React.createContext<SnackBarContextValue | null>(null);

export function useSnackBar(): SnackBarContextValue {
  const context = React.useContext(SnackBarContext);
  if (context == null) {
    throw new Error(
      "useSnackBar는 <SnackBarProvider> 안에서만 사용할 수 있습니다.",
    );
  }
  return context;
}

// SnackBar 큐와 모션을 관리 -> 앱 루트 최초 1회

export function SnackBarProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = React.useState<
    (SnackBarOptions & { id: number })[]
  >([]);
  const [phase, setPhase] = React.useState<Phase>("enter");
  const [paused, setPaused] = React.useState(false);
  const nextId = React.useRef(0);
  const current = queue[0];

  const show = React.useCallback((options: SnackBarOptions) => {
    setQueue((q) => [...q, { ...options, id: nextId.current++ }]);
  }, []);

  React.useEffect(() => {
    if (current == null || phase !== "display" || paused) return;
    const timer = setTimeout(
      () => setPhase("exit"),
      current.duration ?? DEFAULT_DURATION,
    );
    return () => clearTimeout(timer);
  }, [current, phase, paused]);

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (phase === "enter") setPhase("display");
    if (phase === "exit") {
      setQueue((q) => q.slice(1));
      setPhase("enter");
      setPaused(false);
    }
  };

  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };

  const value = React.useMemo(() => ({ show }), [show]);

  return (
    <SnackBarContext.Provider value={value}>
      {children}
      {current != null && (
        <div className={styles.viewport}>
          <SnackBar
            key={current.id}
            variant={current.variant}
            action={
              current.action && {
                label: current.action.label,
                onClick: () => {
                  current.action?.onClick();
                  setPhase("exit");
                },
              }
            }
            className={styles.motion[phase]}
            onAnimationEnd={handleAnimationEnd}
            {...(current.action != null && pauseHandlers)}
          >
            {current.message}
          </SnackBar>
        </div>
      )}
    </SnackBarContext.Provider>
  );
}
