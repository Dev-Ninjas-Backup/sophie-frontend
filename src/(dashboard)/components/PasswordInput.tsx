import { Eye, EyeOff } from "lucide-react"

type PasswordInputProps = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  show: boolean
  toggleShow: () => void
}

export function PasswordInput({
  label,
  value,
  onChange,
  show,
  toggleShow,
}: PasswordInputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full  px-3 py-2 pr-10 bg-[#1a1a1a] border border-[#F80B58]/40 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#F80B58]"
        />

        <button
          type="button"
          onClick={toggleShow}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white cursor-pointer"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  )
}
