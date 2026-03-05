import { Button } from '@/components/ui/Button'

interface ContactButtonProps {
  href: string
  name: string
}

export const ContactButton: React.FC<ContactButtonProps> = ({ href, name }) => {
  return (
    <Button
      onClick={() => window.open(href, '_blank')}
      size="lg"
      className="w-full sm:w-auto mb-8"
    >
      → Connect with {name}
    </Button>
  )
}
