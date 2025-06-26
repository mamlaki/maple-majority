import React from 'react'
import { ElectionParty } from '@/lib/parties'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'

interface PartyBadgeProps {
  party: ElectionParty
  selected?: boolean
  onClick?: () => void
  className?: string
}

export const PartyBadge: React.FC<PartyBadgeProps> = ({
  party,
  selected = false,
  onClick,
  className
}) => {
  return (
      <div
        className={cn(
          'relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105',
          selected
            ? 'border-opacity-100 shadow-lag transform scale-105'
            : 'border-opacity-30 hover:border-opacity-60',
          className
        )}
        style={{
          borderColor: party.color,
          backgroundColor: selected ? `${party.color}10` : 'transparent'
        }}
        onClick={onClick}
      >
        <div className='flex flex-col gap-1 mb-2'>
          <div
            className='w-4 h-4 rounded-full'
            style={{ backgroundColor: party.color }}
          />
          <h3 className='font-bold text-lg mt-1 mb-1'>{party.name}</h3>
          <div className='flex items-center gap-1 mb-1'>
            <div>
              <p className='text-sm font-medium text-primary'>
                Leader: <span className='font-bold'>
                  {party.incumbent && (
                    'Prime Minister '
                  )}
                  {party.leader.name}
                </span>
              </p>  
            </div>
            <div>
              {party.incumbent && (
                <Badge variant='secondary' className='text-xs'>
                  Incumbent
                </Badge>
              )}
            </div>
          </div>
          <p className='text-xs text-muted-foreground mb-2'>Ideology: {party.ideology}</p>
          <p className='text-xs'>{party.description}</p>
        </div>
      </div>
  )
}