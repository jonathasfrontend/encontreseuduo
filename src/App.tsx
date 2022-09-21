import './styles/main.css';
import logoImg from './assets/Logo.svg';
import { useEffect, useState } from 'react'
import { GamerBanner } from './components/GamerBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/Form/CreateAdModal';
import axios from 'axios'


interface Game{
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number,
  },
}
function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(()=>{
    axios('http://18.231.65.162:3333/games').then(response => {
      setGames(response.data);
    })
  }, [])

  return (
    <div className="w-[90%] mx-auto flex flex-col items-center my-10">
      <img src={logoImg} className="w-40" alt="" />
      <h1 className="text-5xl text-white font-black mt-5">Seu <span className="text-transparent bg-clip-text bg-nlw-gradient">duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GamerBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

    <Dialog.Root>
      <CreateAdBanner />
      <CreateAdModal /> 
    </Dialog.Root>
    </div>
  )
}

export default App
