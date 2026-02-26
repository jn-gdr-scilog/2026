import { Card, CardContent } from "@/components/ui/card"

export function Callout({ type = "info", children }: any) {
  const styles = {
    info: "bg-blue-50 border-blue-500 text-blue-900",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-900",
    error: "bg-red-50 border-red-500 text-red-900",
    success: "bg-green-50 border-green-500 text-green-900",
    keynote: "bg-purple-50 border-purple-500 text-purple-900",
  }
  
  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
    success: "✅",
    keynote: "🎤",
  }
  
  return (
    <div className={`border-l-4 p-4 mb-4 ${styles[type as keyof typeof styles]}`}>
      <div className="flex items-start">
        <span className="text-2xl mr-3">{icons[type as keyof typeof icons]}</span>
        <div className="prose-sm">{children}</div>
      </div>
    </div>
  )
}

export function InfoBox({ variant = "default", children }: any) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="prose-sm">{children}</div>
      </CardContent>
    </Card>
  )
}