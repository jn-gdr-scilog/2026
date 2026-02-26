import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ThemeCard({ icon, title, children }: any) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">{children}</div>
      </CardContent>
    </Card>
  )
}

export function DateCard({ date, label, color = "blue" }: any) {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.toLocaleDateString('fr-FR', { month: 'long' })
  const year = dateObj.getFullYear()
  
  const colors = {
    blue: "text-blue-600",
    purple: "text-purple-600",
    pink: "text-pink-600",
    green: "text-green-600",
  }
  
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <div className={`text-6xl font-bold mb-2 ${colors[color as keyof typeof colors]}`}>
          {day}
        </div>
        <div className="text-xl font-semibold mb-2 capitalize">{month} {year}</div>
        <div className="text-gray-600">{label}</div>
      </CardContent>
    </Card>
  )
}

export function Area({ icon, title, children }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600">{children}</div>
      </CardContent>
    </Card>
  )
}