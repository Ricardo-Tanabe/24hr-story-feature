'use client'
import { JSX, useState, useEffect } from "react";
import { convertImageToBase64,
         getImageFromLocalStorage,
         saveImageToLocalStorage,
         isLocalStorageFull } from "./handleImages";
import { AddNewStorieProp, StoriesBarProp, FloatStoriePopUpProp } from './interface'
import { PiImages } from "react-icons/pi";

function AddNewStorie({activatePopUp}: AddNewStorieProp) {
  return (
    <div onClick={activatePopUp}
        className="flex items-center justify-center cursor-pointer bg-gray-300 rounded-full text-black w-10 h-10 hover:bg-gray-100">
      +
    </div>
  );
}

function FloatStoriePopUp({ isAddStorie }: FloatStoriePopUpProp) {

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if(file) {
      try {
        const base64String = await convertImageToBase64(file);
        if (typeof base64String === 'string' && !isLocalStorageFull(base64String.length)) {
          saveImageToLocalStorage('storieImage', base64String);
          console.log('Imagem salva em Local Storage');
        } else {
          console.error('Local Storage está cheio ou a imagem é muito grande')
        }
      } catch (error) {
        console.log('Erro ao converter imagem para base64: ', error);
      }
    }
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isAddStorie ? '' : 'hidden'}`}>
      <div className="abolute flex flex-col items-center justify-center rounded-lg bg-white w-96 h-48">
        {/* Espaço onde será inserido as opções de selecionar imagens no upload */}
        <p className="flex flex-row items-center group mb-3">
          <PiImages className="mr-2 group-hover:text-gray-600" size={40}/>
          <span className="font-bold text-3xl group-hover:text-gray-600">Fotos</span>
        </p>
        <input type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
}

function StoriesBar({activatePopUp}: StoriesBarProp) {
  return(
    <div className=" flex flex-row border-2 rounded-lg border-white border-solid max-w-[1080px] mx-auto h-16 p-2">
      <AddNewStorie activatePopUp={activatePopUp}/>
    </div>
  );
}

function ShowSelectedStories() {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const storedImage = getImageFromLocalStorage('storieImage');
    if(storedImage) {
      setImage(storedImage)
    }
  }, [])

  return (
    <div className="border-2 rounded-lg border-white border-solid max-w-[1080px] h-[1920px] my-4 mx-auto">
      {/* Mostrar os arquivos selecionados */}
      {image && <img src={image} alt='Storie' />}
    </div>
  );
}

export default function Page() {
  const [isAddStorie, setIsAddStorie] = useState<boolean>(false);
  const [storieList, setStorieList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if(event.key === 'Enter') {
        event.preventDefault();
        setIsAddStorie(prev => {
          if(prev === true) {
            return false;
          }
          return prev;
        });
      }

      if(event.key === 'Escape') {
        console.log(isAddStorie)
        event.preventDefault();
        setIsAddStorie(prev => {
          if(prev === true) {
            return false;
          }
          return prev;
        });
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[])

  function activatePopUp() {
    setIsAddStorie(true);
  }

  return(
    <div className={`bg-black w-full h-full p-4`}>
      <div>
        <StoriesBar activatePopUp={activatePopUp}/>
        <ShowSelectedStories />
      </div>
      <FloatStoriePopUp isAddStorie={isAddStorie}/>
    </div>
  );
}

// Imagem de <a href="https://pixabay.com/pt/users/aleem_khan-17859281/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5587706">Aleem_khan</a> por <a href="https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5587706">Pixabay</a>