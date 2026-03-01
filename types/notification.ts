export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number; // ms
}

export interface NotificationState {
  notifications: Notification[];
}

export interface AddNotificationPayload {
  type: NotificationType;
  message: string;
  duration?: number;
}
