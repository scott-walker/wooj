/**
 * Запись для отладки
 */
export interface DebugRecord {
  id: string
  timestamp: number
  type: "info" | "warning" | "error" | "debug"
  message: string
  data?: unknown
}
