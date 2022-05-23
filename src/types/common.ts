export interface Notification {
  type: "error" | "success" | "info";
  title: string;
}

export enum Layouts {
  DEFAULT = "default",
  WITH_TOAST = "with-toast",
}
