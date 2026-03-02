import { Button } from "@/components/ui/button"
import { Phone, Gift, Headphones } from "lucide-react"
import { getContactInfo } from "@/lib/data-loader"

// Icon mapping function
const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Phone,
    Gift,
    Headphones,
  }
  return icons[iconName] || Phone
}

export function ContactInfo() {
  const contactItems = getContactInfo()
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {contactItems.map((item) => (
        <div key={item.title} className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className={`w-16 h-16 ${item.buttonColor === 'green' ? 'bg-green-100' : 'bg-purple-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {(() => {
              const IconComponent = getIcon(item.icon)
              return IconComponent ? <IconComponent className={`w-8 h-8 ${item.buttonColor === 'green' ? 'text-green-500' : 'text-purple-500'}`} /> : null
            })()}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm mb-4">
            {item.description}
          </p>
          <p className="font-medium text-gray-900 mb-1">{item.phone}</p>
          <p className="text-sm text-gray-600 mb-4">{item.email}</p>
          <Button className={`w-full ${item.buttonColor === 'green' ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} text-white`}>
            {item.buttonText}
          </Button>
        </div>
      ))}
    </div>
  )
}
