import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface StepOneProps {
  data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    teudatZehut: string
    dateOfAliyah: string
  }
  onChange: (data: any) => void
  onContinue: () => void
}

const StepOne: React.FC<StepOneProps> = ({ data, onChange, onContinue }) => {
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value })
  }

  const isValid = data.firstName && data.lastName && data.email && data.teudatZehut && data.dateOfAliyah

  return (
    <div className="">
      <div className="">
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-base lg:text-lg font-abc-light mb-2">First Name: *</label>
            <Input
              type="text"
              placeholder="first name"
              value={data.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg h-12 "
            />
          </div>
          <div>
            <label className="block text-base lg:text-lg font-abc-light mb-2">Last Name: *</label>
            <Input
              type="text"
              placeholder="last name"
              value={data.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg h-12  "
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-base lg:text-lg font-abc-light mb-2">Email: *</label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg h-12"
            />
            <p className="text-xs text-orange-400 mt-2">Your membership id will be sent in this email</p>
          </div>
          <div>
            <label className="block text-base lg:text-lg font-abc-light mb-2">Phone Number: (optional)</label>
            <Input
              type="tel"
              placeholder="IL (+972) -"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg h-12 "
            />
          </div>
        </div>

        {/* Teudat Zehut & Date of Aliyah */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-base lg:text-lg font-abc-light mb-2">Teudat Zehut: *</label>
            <Input
              type="number"
              placeholder="- - - - - - - -"
              value={data.teudatZehut}
              min={8}
              onChange={(e) => handleChange("teudatZehut", e.target.value)}
              className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg h-12  "
            />
          </div>
          <div>
            <label className="block text-base lg:text-lg font-abc-light mb-2">Date of Aliyah: *</label>
            <Input
              type="date"
              placeholder="Enter Date"
              value={data.dateOfAliyah}
              onChange={(e) => handleChange("dateOfAliyah", e.target.value)}
              className="!bg-[#2b2b2b] border-0 focus:!ring-1 focus:!ring-[#F80B58] text-white placeholder-gray-600 text-base lg:text-lg   h-12 "
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-12">
        <Button
          variant="outline"
          className="px-10 py-5 text-lg md:text-xl rounded-full cursor-pointer !bg-white text-black font-semibold hover:bg-gray-200"
        >
          Cancel
        </Button>
        <Button
          onClick={onContinue}
          disabled={!isValid}
          className="px-10 py-5 text-lg md:text-xl cursor-pointer rounded-full bg-[#F80B58] text-white font-semibold hover:bg-[#F80B5899] disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default StepOne
