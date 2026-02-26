interface SessionProps {
  time: string
  type?: 'keynote' | 'talk' | 'workshop' | 'break' | 'social' | 'opening' | 'closing' | 'gt' | 'poster'
  title: string
  speaker?: string
  room?: string
  description?: string
}

export function Session({ time, type, title, speaker, room, description }: SessionProps) {
  const typeConfig: Record<string, { bg: string; text: string; border: string }> = {
    keynote: { 
      bg: 'bg-slate-700', 
      text: 'text-white', 
      border: 'border-slate-700',
    },
    gt: { 
      bg: 'bg-slate-700', 
      text: 'text-white', 
      border: 'border-slate-700',
    },
    workshop: { 
      bg: 'bg-slate-600', 
      text: 'text-white', 
      border: 'border-slate-500',
    },
    break: { 
      bg: 'bg-gray-100', 
      text: 'text-gray-700', 
      border: 'border-gray-200',
    },
    poster: { 
      bg: 'bg-slate-600', 
      text: 'text-white', 
      border: 'border-slate-500',
    },
    opening: { 
      bg: 'bg-slate-700', 
      text: 'text-white', 
      border: 'border-slate-700',
    },
    closing: { 
      bg: 'bg-slate-700', 
      text: 'text-white', 
      border: 'border-slate-600',
    },
    talk: { 
      bg: 'bg-white', 
      text: 'text-gray-900', 
      border: 'border-gray-200',
    },
  }
  
  const config = typeConfig[type || 'talk'] || typeConfig.talk
  const isHighlight = ['keynote', 'gt', 'workshop', 'social', 'opening'].includes(type || '')

  return (
    <div className={`group rounded-lg overflow-hidden border ${config.border} shadow-sm hover:shadow-md transition-all ${isHighlight ? 'my-3' : 'my-2'}`}>
      <div className={`${config.bg} ${config.text} px-4 py-3 flex items-center justify-between`}>
        <div className="flex-1">
          <div className="font-semibold text-base leading-tight">{title}</div>
          {speaker && (
            <div className="text-sm opacity-90 mt-1">{speaker}</div>
          )}
        </div>
        <div className="font-mono text-sm font-semibold bg-black/10 px-3 py-1 rounded ml-4">
          {time}
        </div>
      </div>
      
      {(room || description) && (
        <div className="px-4 py-2 bg-white border-t border-slate-700">
          {room && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">{room}</span>
            </div>
          )}
          {description && (
            <div className="text-sm text-gray-600 mt-1">{description}</div>
          )}
        </div>
      )}
    </div>
  )
}

export function SubSession({ time, title, speaker }: { time?: string; title: string; speaker?: string }) {
  return (
    <div className="flex gap-3 py-2 px-4 hover:bg-gray-50 transition-colors rounded-md group">
      {time && (
        <span className="font-mono text-xs text-gray-500 w-20 flex-shrink-0 pt-0.5">
          {time}
        </span>
      )}
      <div className="flex-1">
        <div className="text-sm text-gray-700 group-hover:text-gray-900">
          <span className="text-gray-400 mr-2">›</span>
          {title}
        </div>
        {speaker && (
          <div className="text-xs text-gray-500 mt-0.5">{speaker}</div>
        )}
      </div>
    </div>
  )
}

export function ParallelSessions({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative my-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px bg-gray-300 flex-1"></div>
        <div className="px-4 py-1.5 bg-gray-800 text-white text-xs font-semibold tracking-wide rounded">
          SESSIONS PARALLÈLES
        </div>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  )
}

export function ParallelTrack({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-1 bg-gray-50 rounded-lg p-3 border border-gray-200">
      {children}
    </div>
  )
}