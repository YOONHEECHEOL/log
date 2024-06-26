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
                <div className="
                    container-sm mx-auto
                    overflow-hidden
                    xl:text-xl
                    lg:text-lg
                    md:text-md
                    sm:text-sm
                ">
                    <div className='flex flex-auto justify-around'>
                        {/* <Lnb /> */}
                        <div className={`w-full`}>
                            {header}
                            <div className='min-h-screen pb-2'>
                                {children}
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
