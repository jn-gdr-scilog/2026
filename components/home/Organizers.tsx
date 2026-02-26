import { Organizer } from "@/types"

export function Organizers({ organizers }: { organizers: Organizer[] }) {
  if (!organizers || organizers.length === 0) {
    return null
  }

  return (
    <section className="py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Comité d'organisation</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {organizers.map((org) => (
            <div
              key={org.name}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-blue-600">
                  {org.name.charAt(0)}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{org.name}</h3>
                <p className="text-sm text-muted-foreground">{org.role}</p>
                <p className="text-sm text-muted-foreground">{org.affiliation}</p>
                {org.email && (
                  <a
                    href={`mailto:${org.email}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {org.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}