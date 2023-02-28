import Link from "next/link"
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const header = (
            <header>
                <div className="text-center bg-slate-800 p-8 mb-4">
                    <Link href={'/'}><h1 className="text-3x1 font-bold text-white">Yoon Log</h1></Link>
                    <p className="text-slate-400">Welcome to my dev log.</p>
                </div>
            </header>
        )

    const footer = (
            <footer className="text-center">
                <h3>Developed by Yoon Hee Cheol</h3>                
            </footer>
        )

    return (
        <html lang="en">
            <head />
            <body>
                <div className="container-sm mx-auto max-w-2x1">
                    {header}
                    {children}
                    {footer}                    
                </div>
            </body>
        </html>
    )
}
