
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { User, Plus, Edit2, Trash2, Check, X } from "lucide-react"
import { useState } from "react"

export function PassengerTable({ passengers, onPassengersChange, selectedSeats, flightNumbers }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  })
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    age: "",
  })

  const handleAddPassenger = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.age.trim()) {
      return
    }

    const newPassenger = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: formData.age.trim(),
    }

    onPassengersChange([...passengers, newPassenger])
    setFormData({ name: "", email: "", age: "" })
  }

  const handleRemovePassenger = (id) => {
    onPassengersChange(passengers.filter((p) => p.id !== id))
  }

  const handleEditStart = (passenger) => {
    setEditingId(passenger.id)
    setEditData({
      name: passenger.name,
      email: passenger.email,
      age: passenger.age,
    })
  }

  const handleEditSave = (id) => {
    if (!editData.name.trim() || !editData.email.trim() || !editData.age.trim()) {
      return
    }

    onPassengersChange(
      passengers.map((p) =>
        p.id === id
          ? {
              ...p,
              name: editData.name.trim(),
              email: editData.email.trim(),
              age: editData.age.trim(),
            }
          : p,
      ),
    )
    setEditingId(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditData({ name: "", email: "", age: "" })
  }

  const getPassengerSeats = (passengerIndex) => {
    const seats = []
    Object.keys(selectedSeats).forEach((flightId, flightIndex) => {
      const flightSeats = selectedSeats[flightId] || []
      const seatForPassenger = flightSeats[passengerIndex]?.seatId
      if (seatForPassenger) {
        seats.push(`${flightNumbers[flightIndex]}: ${seatForPassenger}`)
      }
    })
    return seats.join(", ") || "-"
  }

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.age.trim()

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center text-lg sm:text-xl">
          <User className="w-5 h-5 mr-2" />
          Passenger Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Add Passenger Form */}
        <div className="p-3 sm:p-4 bg-slate-50/50 rounded-lg border border-slate-200/50">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Add Passenger</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
            <div>
              <Label htmlFor="name" className="text-slate-700 text-sm">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white border-slate-300 text-slate-900 text-sm sm:text-base"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-700 text-sm">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white border-slate-300 text-slate-900 text-sm sm:text-base"
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <Label htmlFor="age" className="text-slate-700 text-sm">
                Age *
              </Label>
              <Input
                id="age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="bg-white border-slate-300 text-slate-900 text-sm sm:text-base"
                placeholder="25"
              />
            </div>
            <div>
              <Button
                onClick={handleAddPassenger}
                disabled={!isFormValid}
                className="bg-slate-900 hover:bg-slate-800 text-white w-full text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add Passenger</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Passengers Table */}
        {passengers.length > 0 ? (
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">
              Added Passengers ({passengers.length})
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="text-slate-700 font-semibold text-xs sm:text-sm">#</TableHead>
                      <TableHead className="text-slate-700 font-semibold text-xs sm:text-sm min-w-[120px]">
                        Full Name
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold text-xs sm:text-sm min-w-[150px] hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold text-xs sm:text-sm">Age</TableHead>
                      <TableHead className="text-slate-700 font-semibold text-xs sm:text-sm min-w-[120px]">
                        Seat Numbers
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold text-center text-xs sm:text-sm">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {passengers.map((passenger, index) => (
                      <TableRow key={passenger.id} className="hover:bg-slate-50/50">
                        <TableCell className="font-medium text-slate-900 text-sm">{index + 1}</TableCell>
                        <TableCell className="min-w-[120px]">
                          {editingId === passenger.id ? (
                            <Input
                              value={editData.name}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                              className="bg-white border-slate-300 text-slate-900 h-8 text-sm"
                            />
                          ) : (
                            <div className="text-slate-900 text-sm">
                              <div className="font-medium">{passenger.name}</div>
                              <div className="text-slate-600 text-xs sm:hidden">{passenger.email}</div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {editingId === passenger.id ? (
                            <Input
                              type="email"
                              value={editData.email}
                              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                              className="bg-white border-slate-300 text-slate-900 h-8 text-sm"
                            />
                          ) : (
                            <span className="text-slate-600 text-sm">{passenger.email}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === passenger.id ? (
                            <Input
                              value={editData.age}
                              onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                              className="bg-white border-slate-300 text-slate-900 h-8 w-16 text-sm"
                            />
                          ) : (
                            <span className="text-slate-600 text-sm">{passenger.age}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-600 text-xs">{getPassengerSeats(index)}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center space-x-1">
                            {editingId === passenger.id ? (
                              <>
                                <Button
                                  onClick={() => handleEditSave(passenger.id)}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white h-7 w-7 p-0"
                                >
                                  <Check className="w-3 h-3" />
                                </Button>
                                <Button
                                  onClick={handleEditCancel}
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-300 text-slate-700 hover:bg-slate-50 h-7 w-7 p-0 bg-transparent"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  onClick={() => handleEditStart(passenger)}
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-300 text-slate-700 hover:bg-slate-50 h-7 w-7 p-0"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button
                                  onClick={() => handleRemovePassenger(passenger.id)}
                                  size="sm"
                                  variant="outline"
                                  className="border-red-300 text-red-600 hover:bg-red-50 h-7 w-7 p-0"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8 text-slate-500">
            <User className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm sm:text-base">No passengers added yet</p>
            <p className="text-xs sm:text-sm">Use the form above to add passengers to your booking</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
