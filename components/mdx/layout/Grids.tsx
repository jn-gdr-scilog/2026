export function ThemeGrid({ children }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
      {children}
    </div>
  )
}

export function ImportantDates({ children }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 not-prose">
      {children}
    </div>
  )
}

export function ResearchAreas({ children }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
      {children}
    </div>
  )
}