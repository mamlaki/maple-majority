import React from 'react'
import { GameModeOption, GameMode } from '@/lib/game-config'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface ModeSelectorProps {
  modes: GameModeOption[]
  selectedMode: GameMode | null
  onModeSelect: (mode: GameMode) => void
  className?: string
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  modes,
  selectedMode,
  onModeSelect,
  className
}) => {
  return (
    <div className={cn('grid grid cols-1 md:grid-cols-3 gap 4', className)}>
      {modes.map((mode) => (
        <Card
          key={mode.id}
          className={cn(
            'flex-1 cursor-pointer transition-all duration-200 hover:scale-105',
            selectedMode === mode.id
              ? 'ring-2 ring-primary shad-wlg'
              : 'hover: shadow-md',
            mode.id === 'custom' ? 'opacity-50 cursor-not-allowed' : ''
          )}
          onClick={() => mode.id !== 'custom' && onModeSelect(mode.id)} 
        >
          <CardHeader className='pb-2'>
            <CardTitle className='text-lg flex items-center gap-2'>
              {mode.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-sm'>
              {mode.description}
            </CardDescription>
            {mode.id === 'custom' && (
              <div className='mt-2 text-xs text-muted-foreground font-medium'>
                Coming Soon
              </div>  
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}