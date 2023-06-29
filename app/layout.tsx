import Lnb from '@/components/Lnb'
import '../styles/globals.css'
import Footer from './layout/Footer'
import Header from './layout/Header'

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
                <div className="container-sm mx-auto min-w-fit">
                    <div className='flex flex-auto justify-around'>
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
