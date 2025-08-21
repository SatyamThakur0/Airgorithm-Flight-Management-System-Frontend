"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, MapPin, X } from "lucide-react"


export function SeatMap({ flight, flightIndex, selectedSeats, maxSeats, onSeatSelect }) {
  const getSeatClass = (seatClass) => {
    switch (seatClass) {
      case "business":
        return "bg-purple-500 hover:bg-purple-600 text-white"
      case "premium":
        return "bg-blue-500 hover:bg-blue-600 text-white"
      case "economy":
        return "bg-emerald-500 hover:bg-emerald-600 text-white"
      default:
        return "bg-slate-500 text-white"
    }
  }

  const handleSeatClick = (seatId, isOccupied) => {
    if (isOccupied) return

    const isSelected = selectedSeats.includes(seatId)

    if (isSelected) {
      // Deselect seat
      onSeatSelect(seatId)
    } else if (selectedSeats.length < maxSeats) {
      // Select seat if under limit
      onSeatSelect(seatId)
    }
  }

  const getSelectedSeatInfo = () => {
    return selectedSeats
      .map((seatId) => {
        const seat = flight.seats.find((s) => s.id === seatId)
        return seat ? { id: seatId, price: seat.price, class: seat.class } : null
      })
      .filter(Boolean)
  }

  const totalPrice = getSelectedSeatInfo().reduce((sum, seat) => sum + (seat?.price || 0), 0)

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-slate-900 p-2 rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900">
                Flight {flightIndex + 1}: {flight.flightNumber}
              </CardTitle>
              <p className="text-slate-600">
                {flight.airline} • {flight.aircraft}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-slate-100 text-slate-700">
            {flight.duration}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600 mt-4 p-4 bg-slate-50/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>
              {flight.departure.city} ({flight.departure.airport})
            </span>
            <Clock className="w-4 h-4 ml-4" />
            <span>{flight.departure.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>
              {flight.arrival.city} ({flight.arrival.airport})
            </span>
            <Clock className="w-4 h-4 ml-4" />
            <span>{flight.arrival.time}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Seat Selection Info */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 font-medium">
            Select {maxSeats} seat{maxSeats > 1 ? "s" : ""} for your passengers
          </p>
          <p className="text-blue-600 text-sm">
            Selected: {selectedSeats.length} of {maxSeats}
          </p>
        </div>

        {/* Seat Legend */}
        <div className="flex items-center justify-center space-x-6 mb-6 p-4 bg-slate-50/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-slate-700">Business ($2,500)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-slate-700">Premium ($800)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-emerald-500 rounded"></div>
            <span className="text-sm text-slate-700">Economy ($350)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-slate-400 rounded"></div>
            <span className="text-sm text-slate-700">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-amber-400 rounded border-2 border-amber-600"></div>
            <span className="text-sm text-slate-700">Selected</span>
          </div>
        </div>

        {/* Seat Map */}
        <div className="bg-slate-50/50 p-6 rounded-lg border border-slate-200">
          <div className="text-center text-slate-500 mb-4 text-sm font-medium">Front of Aircraft</div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((row) => (
              <div key={row} className="flex items-center justify-center space-x-2">
                <span className="text-xs text-slate-500 w-6 text-center font-medium">{row}</span>

                {["A", "B", "C"].map((letter) => {
                  const seat = flight.seats.find((s) => s.row === row && s.letter === letter)
                  if (!seat) return null

                  const isSelected = selectedSeats.includes(seat.id)
                  const isOccupied = seat.isOccupied

                  return (
                    <button
                      key={`${row}${letter}`}
                      onClick={() => handleSeatClick(seat.id, isOccupied)}
                      disabled={isOccupied || (!isSelected && selectedSeats.length >= maxSeats)}
                      className={`
                        w-8 h-8 rounded text-xs font-medium transition-all duration-200 border
                        ${
                          isOccupied
                            ? "bg-slate-400 cursor-not-allowed text-white border-slate-400"
                            : isSelected
                              ? "bg-amber-400 text-slate-900 border-2 border-amber-600 shadow-md"
                              : selectedSeats.length >= maxSeats
                                ? "bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300"
                                : `${getSeatClass(seat.class)} border-transparent hover:shadow-md`
                        }
                      `}
                    >
                      {isOccupied ? <X className="w-3 h-3 mx-auto" /> : letter}
                    </button>
                  )
                })}

                <div className="w-4"></div>

                {["D", "E", "F"].map((letter) => {
                  const seat = flight.seats.find((s) => s.row === row && s.letter === letter)
                  if (!seat) return null

                  const isSelected = selectedSeats.includes(seat.id)
                  const isOccupied = seat.isOccupied

                  return (
                    <button
                      key={`${row}${letter}`}
                      onClick={() => handleSeatClick(seat.id, isOccupied)}
                      disabled={isOccupied || (!isSelected && selectedSeats.length >= maxSeats)}
                      className={`
                        w-8 h-8 rounded text-xs font-medium transition-all duration-200 border
                        ${
                          isOccupied
                            ? "bg-slate-400 cursor-not-allowed text-white border-slate-400"
                            : isSelected
                              ? "bg-amber-400 text-slate-900 border-2 border-amber-600 shadow-md"
                              : selectedSeats.length >= maxSeats
                                ? "bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300"
                                : `${getSeatClass(seat.class)} border-transparent hover:shadow-md`
                        }
                      `}
                    >
                      {isOccupied ? <X className="w-3 h-3 mx-auto" /> : letter}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">Selected Seats</h4>
            <div className="space-y-2">
              {getSelectedSeatInfo().map((seat, index) => (
                <div key={seat?.id} className="flex justify-between items-center text-sm">
                  <span className="text-emerald-700">
                    Passenger {index + 1}: Seat {seat?.id} ({seat?.class})
                  </span>
                  <span className="font-semibold text-emerald-800">${seat?.price}</span>
                </div>
              ))}
              <div className="border-t border-emerald-200 pt-2 mt-2">
                <div className="flex justify-between items-center font-semibold text-emerald-800">
                  <span>Total for this flight:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
