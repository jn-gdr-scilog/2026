import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTAButton({ href, variant = "default", children }: any) {
  return (
    <Button asChild variant={variant as any}>
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export function CallToAction({ text, url, variant = "default" }: any) {
  return (
    <div className="flex justify-center my-8">
      <Button asChild size="lg" variant={variant as any}>
        <Link href={url}>{text}</Link>
      </Button>
    </div>
  )
}

export function ContactButton({ icon, href, children }: any) {
  return (
    <Button asChild variant="outline">
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  )
}