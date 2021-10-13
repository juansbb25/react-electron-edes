import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";

type NotificationType = "error" | "success";
type ToastState = {
  state: boolean;
  type?: NotificationType;
  message?: string;
};
export type WithNotifications = {
  showNotification: (message: string, type: NotificationType) => void;
};

/*  Basado en las mejrores practicas para componentes de react fuente abajo */
// https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
function withNotifications<T extends WithNotifications>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<Omit<T, keyof WithNotifications>> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithNotifications = (
    props: Omit<T, keyof WithNotifications>
  ) => {
    const [toastState, setToastState] = useState<ToastState>({ state: false });

    const closeToast = () => {
      setToastState({ state: false });
    };

    const showNotification = (message: string, type: NotificationType) => {
      setToastState({
        state: true,
        message,
        type,
      });
    };
    // Props come afterwards so the can override the default ones.
    return (
      <>
        <WrappedComponent
          {...(props as T)}
          showNotification={showNotification}
        />
        <Snackbar
          open={toastState.state}
          autoHideDuration={2000}
          onClose={closeToast}
        >
          {toastState.type === "success" ? (
            <Alert
              onClose={closeToast}
              severity="success"
              sx={{ width: "100%" }}
            >
              {toastState.message}
            </Alert>
          ) : (
            <Alert onClose={closeToast} severity="error" sx={{ width: "100%" }}>
              {toastState.message}
            </Alert>
          )}
        </Snackbar>
      </>
    );
  };

  //Cambia el nomber del componente par debugear mas facil
  ComponentWithNotifications.displayName = `withNotifications(${displayName})`;

  return ComponentWithNotifications;
}

export default withNotifications;
