import '@/styles/globals.css'
import Navbar from "@components/Navbar"
import Provider from '@components/Provider'

export const metadata = {
  title:  "PromptDairy",
  discription: "Discover and Share AI Prompts"
}

const Rootlayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        
        <Provider>
          <div className='main dark:bg-[#282828]'>
            <div className='gradiant'/>
          </div>

          <main className='app'>
            <Navbar/>
            {children}
          </main>
        </Provider>

      </body>
    </html>
  )
}

export default Rootlayout