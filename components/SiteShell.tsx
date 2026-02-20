import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#070707] text-white min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
