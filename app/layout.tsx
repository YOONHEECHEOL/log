import Lnb from '@/components/Lnb'
import '../styles/globals.css'
import Footer from './layout/Footer'
import Header from './layout/Header'
import Tags from './layout/Tags'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    // render layout
    const header = <Header />
    const footer = <Footer />

    return (
        <html lang="en">
            <head />
            <body>
                <div className="container-sm mx-auto max-w-2x1">
                    <div className='flex flex-auto justify-around columns-2'>
                        {/* <Lnb /> */}
                        <div className={`w-full`}>
                            {header}
                            {children}
                            {footer}
                        </div>
                    </div>                    
                </div>
            </body>
        </html>
    )
}
