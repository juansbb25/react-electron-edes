import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";

type ProgressBarState = {
  isOpen: boolean;
  errorText?: string;
};
export type WithProgress = {
  closeProgressBar: () => void;
  showProgressBar: () => void;
};

function withProgressBar<T extends WithProgress>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<Omit<T, keyof WithProgress>> {
  const ComponentWithProgressBar = (props: Omit<T, keyof WithProgress>) => {
    const [progressBarState, setProgressBarState] = useState<ProgressBarState>({
      isOpen: false,
    });
    const CloseProgressBar = () => {
      setProgressBarState({ isOpen: false });
    };
    const ShowProgressBar = () => {
      setProgressBarState({ isOpen: true });
    };
    return (
      <>
        <WrappedComponent
          {...(props as T)}
          showProgressBar={ShowProgressBar}
          closeProgressBar={CloseProgressBar}
        />
        <Dialog open={progressBarState.isOpen}>
          <DialogContent>
            <CircularProgress color="primary" size={70} />
          </DialogContent>
        </Dialog>
      </>
    );
  };
  return ComponentWithProgressBar;
}
export default withProgressBar;
