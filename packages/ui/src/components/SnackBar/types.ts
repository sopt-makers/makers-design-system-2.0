import type * as React from "react";

export type SnackBarVariant = "default" | "success" | "alert" | "error";

export interface SnackBarAction {
  label: string;
  onClick: () => void;
}

export interface SnackBarOptions {
  message: React.ReactNode;
  variant?: SnackBarVariant;
  action?: SnackBarAction;
  duration?: number;
}
