"use client"

import React, { useState } from 'react'
import { PartyBadge } from '@/components/party-badge'
import { ModeSelector } from '@/components/mode-selector'
import { getElectionParties, ElectionParty } from '@/lib/parties'
import { ELECTIONS, ElectionData } from '@/lib/elections'
import { GAME_MODES, GameMode, createGameConfig } from '@/lib/game-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

export default function Page() {
  const [selectedElection, setSelectedElection] = useState<ElectionData | null>(null)
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null)
  const [selectedParty, setSelectedParty] = useState<ElectionParty | null>(null)
  const [availableParties, setAvailableParties] = useState<ElectionParty[]>([])

  const handleElectionSelect = (electionYear: string) => {
    const election = ELECTIONS.find(e => e.year === parseInt(electionYear))
    setSelectedElection(election || null)
    setSelectedMode(null) // reset when a election is selected (changed)
    setSelectedParty(null) // reset when a election is selected (changed) 

    if (election) {
      try {
        const parties = getElectionParties(election.year)
        setAvailableParties(parties)
      } catch (error) {
        console.error('Error loading parties for election: ', error)
        setAvailableParties([])
      }
    } else {
      setAvailableParties([])
    }
  } 
 
  // User can start the campaign after selecting the election, mode, and party they will be playing as
  const canStartCampaign = selectedElection && selectedMode && selectedParty

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="text-center m-10">
        <div className='mb-6'>
          {/* Will add some more stuff later */}
          <h1 className='text-5xl font-bold text-rose-500'>
            Maple Majority
          </h1>
        </div>
        <p className='text-lg text-muted-foreground max-w-xl mx-auto text-center'>
          Lead your party of choice to victory in a Canadian federal election of your choice. Make strategic decisions, answer tough questions, and fight for a majority mandate in the House of Commons!
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Step 1: Election Selection */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              Step 1: Choose An Election
            </CardTitle>
            <CardDescription>
              Select a Canadian federal election to experience. Each election features the relevant* parties and context.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedElection?.year.toString() || ''}
              onValueChange={handleElectionSelect}
            >
              <SelectTrigger className='w-full max-w-md'>
                <SelectValue placeholder='Select an election year...' />
              </SelectTrigger>
              <SelectContent>
                {ELECTIONS.map((election) => (
                  <SelectItem key={election.year} value={election.year.toString()}>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>{election.year}</span>-
                      <span className='font-medium'>{election.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedElection && (
              <div className='mt-4 p-4 bg-secondary/30 rounded-lg'>
                {/* Election Background */}
                <div className='flex items-center gap-2 mb-2'>
                  <h4 className='font-medium'>{selectedElection.year} Canadian Federal Election</h4>

                  {/* Historical Outcome Badge */}
                  {selectedElection.winningParty && (
                    <Badge variant='default'>
                      Historical Outcome: 
                      <span className='font-bold' style={{ color: 'var(--color-liberal)' }}>
                        {selectedElection.winningParty.charAt(0).toUpperCase() + selectedElection.winningParty.slice(1) + ' '} 
                        {selectedElection.governmentType.charAt(0).toUpperCase() + selectedElection.governmentType.slice(1)}
                      </span>
                    </Badge>
                  )}
                </div>

                {/* Election Description */}
                {selectedElection.description && (
                  <p className='text-sm text-muted-foreground mb-3'>
                    {selectedElection.description}
                  </p>
                )}
                
                {/* Other info: seat count, length, etc. */}
                <div className='grid grid-cols-1 md: grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='text-muted-foreground'>Seats Up For Grabs:</span> <span className='font-bold'>{selectedElection.totalSeats}</span>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Called on:</span> <span className="font-bold">{selectedElection.called}</span>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Held:</span> <span className="font-bold">{selectedElection.held}</span>
                  </div>
                  <div>
                    {selectedElection.historical && (
                      <div>
                        <span className='text-muted-foreground'>Campaign Length:</span> <span className="font-bold">{selectedElection.historical.totalWeeks} weeks</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Key Issues */}
                {selectedElection.historical?.keyIssues && (
                  <div className='mt-3'>
                    <span className='text-muted-foreground text-sm'>Key Issues: </span>
                    <div className='flex flex-wrap gap-1 mt-1'>
                      {selectedElection.historical.keyIssues.map((issue) => (
                        <Badge key={issue} variant='outline' className='text-xs'>
                          {issue}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Game Mode Selection */}
        {selectedElection && (
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Step 2: Choose Game Mode
              </CardTitle>
              <CardDescription>
                Select how you want to experience the {selectedElection.year} election.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ModeSelector 
                modes={GAME_MODES}
                selectedMode={selectedMode}
                onModeSelect={setSelectedMode}
                className='flex gap-2'
              />
            </CardContent>
          </Card>
        )}

        {/* Step 3: Party Selection */}
        {selectedElection && selectedMode && availableParties.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Step 3: Choose Your Party & Leader
              </CardTitle>
              <CardDescription>
                Select the political party you want to lead in {selectedElection.year}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-2'>
                {availableParties.map((party) => (
                  <PartyBadge 
                    key={party.id}
                    party={party}
                    selected={selectedParty?.id === party.id}
                    onClick={() => setSelectedParty(party)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Game Preview */}
        {canStartCampaign && (
          <Card>
            <CardHeader>
                <CardTitle>Ready to Start!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Election:</span>
                    <div className='flex items-center gap-2 mt-1'>
                      {selectedElection!.year}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Mode:</span>
                    <div className="mt-1">{GAME_MODES.find(m => m.id === selectedMode)?.name}</div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Party Leader:</span>
                    <div className='flex items-center gap-2 mt-1'>
                      <div 
                        className='w-3 h-3 rounded-full'
                        style={{ backgroundColor: selectedParty!.color}}
                      />
                      {selectedParty.leader.name} ({selectedParty.shortName})
                    </div>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className='bg-secondary/30 p-4 rounded-lg'>
                  <h4 className='font-medium mb-2'>Campaign Overview</h4>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                    <div>
                      <span className='text-muted-foreground'>Campaign Length:</span>
                      <div>{createGameConfig(selectedElection.year, selectedMode, ELECTIONS).totalWeeks} weeks</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Seats: </span>
                      <div>{selectedElection.totalSeats}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Seats for Majority: </span>
                      <div>{selectedElection.majoritySeats}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Debate Week: </span>
                      <div>Week {createGameConfig(selectedElection.year, selectedMode, ELECTIONS).debateWeek}</div>
                    </div>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>    
  );
}
