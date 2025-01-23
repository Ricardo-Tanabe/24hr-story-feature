'use client'
import { JSX, useState, useEffect } from "react";
import { convertImageToBase64,
         getImageFromLocalStorage,
         saveImageToLocalStorage,
         isLocalStorageFull } from "./handleImages";
import { AddNewStoryProp,
         StoryProp,
         StoriesBarProp,
         FloatStoryPopUpProp,
         ShowSelectedStoriesProp,
         StoriesData } from './interface'
import { PiImages } from "react-icons/pi";
import { v4 as uuidv4 } from 'uuid';

function FloatStoryPopUp({ isAddStory, addStory }: FloatStoryPopUpProp) {
  const css_flex = "flex items-center justify-center"
  const css_color = "bg-black bg-opacity-50"
  const css_group = "group-hover:text-gray-600"
  const css_shape = "rounded-lg w-96 h-48"

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if(file) {
      try {
        const base64String = await convertImageToBase64(file);
        if (typeof base64String === 'string' && !isLocalStorageFull(base64String.length)) {
          addStory(base64String);
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
    <div className={`fixed inset-0 ${css_flex} ${css_color} ${isAddStory ? '' : 'hidden'}`}>
      <div className={`abolute ${css_flex} ${css_shape} flex-col bg-white`}>
        <p className={`${css_flex} flex-row group mb-3`}>
          <PiImages className={`mr-2 ${css_group}`} size={40}/>
          <span className={`font-bold text-3xl ${css_group}`}>Fotos</span>
        </p>
        <input type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
}

function AddNewStory({activatePopUp}: AddNewStoryProp) {
  const css_flex = "flex items-center justify-center"
  const css_color = "bg-gray-300 text-black hover:bg-gray-100"
  const css_shape = "mr-2 w-10 h-10 rounded-full cursor-pointer"

  return (
    <div onClick={activatePopUp}
        className={`${css_flex} ${css_color} ${css_shape}`}>
      +
    </div>
  );
}

// Função ClearLocalStorage temporaria
function ClearLocalStorage() {
  const css_flex = "flex items-center justify-center"
  const css_color = "bg-red-500 text-black hover:bg-red-300"
  const css_shape = "w-10 h-10 rounded-full cursor-pointer"
  
  return (
    <div onClick={() => {localStorage.clear(); window.location.reload();}}
        className={`${css_flex} ${css_color} ${css_shape}`}>
      <span className="text-xs text-center">Clear List</span>
    </div>
  );
}
// Função ClearLocalStorage temporaria

function Story({ story, selectStory, removeStory }: StoryProp) {
  const css_flex = "flex items-center justify-center";
  const css_border = "hover:border-2 hover:border-white";
  const css_shape = "mr-2 w-10 h-10 rounded-full cursor-pointer";

  useEffect(() => {
    const now = new Date();
    const deleteTime = new Date(story.deleteTime);

    if(now >= deleteTime) {
      removeStory(story);
    } else {
      const timeout = setTimeout(() => {
        removeStory(story);
      }, deleteTime.getTime() - now.getTime());

      return () => clearTimeout(timeout);
    }
  }, [story]);

  return (
    <div key={story.key} className={`${css_flex} ${css_shape} ${css_border} overflow-hidden`}>
      <img src={story.content} alt={`Storie ${story.key}`} 
        className="w-full h-full object-cover" onClick={() => selectStory(story)}/>
    </div>
    );
}

function StoriesBar({ image, storyList, selectStory, removeStory, activatePopUp }: StoriesBarProp) {
  const css_border  ="border-2 border-white border-solid";
  const css_shape = "max-w-[1080px] mx-auto h-16 p-2 rounded-lg";

  const imageList: JSX.Element[] = storyList.map((story, index) => (
    <Story key={story.key} story={story}
    selectStory={selectStory} removeStory={removeStory} />
  ));

  return(
    <div className={`flex flex-row ${css_border} ${css_shape}`}>
      <AddNewStory activatePopUp={activatePopUp}/>
      { imageList.length > 0 && imageList }
      <ClearLocalStorage />
    </div>
  );
}

function ShowSelectedStories({ image, listLength, currentIndex, setImageList }: ShowSelectedStoriesProp) {
  const [localAnimationKey, setLocalAnimationKey] = useState<number>(currentIndex);
  const css_flex = "flex items-center justify-center";
  const css_shape = "max-w-[1080px] max-h-[1920px] my-4 mx-auto"; //min-h-96 
  const css_border = "border-2 border-white border-solid rounded-lg";

  useEffect(() => {
    setLocalAnimationKey(prevKey => prevKey + 1);
  }, [listLength, currentIndex])

  useEffect(() => {
    const storedImage = getImageFromLocalStorage();
    if(storedImage) {
      setImageList(storedImage)
    }
  }, [])

  function setAnimation(): string {
    if(listLength > 1 && localAnimationKey > 0) {
      return "progressBar 3s linear";
    }
    return "";
  }

  return (
    <div className={`relative ${css_flex} ${css_shape} ${css_border} overflow-hidden min-h-screen`}>
      <div className={`absolute border-2 border-white border-solid top-0 h-4 w-full`}>
        <div key={localAnimationKey} className={`bg-white h-full`} style={{animation: setAnimation()}}></div>
      </div>
      {image ? (<img src={image} alt='Storie'
        className="max-w-full max-h-full object-contain"/>) :
        (<div className="text-white">Poste um novo Story</div>)
      }
    </div>
  );
}

export default function Page() {
  const [isAddStory, setIsAddStorie] = useState<boolean>(false);
  const [storyList, setStoryList] = useState<StoriesData[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timerKey, setTimerKey] = useState<number>(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if(event.key === 'Enter' || event.key === 'Escape') {
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

  useEffect(() => {
    if(storyList.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % storyList.length;
          setImage(storyList[nextIndex].content);
          return nextIndex
        }
      )}, 3000);

      return () => clearInterval(timer);
    }
  },[storyList, timerKey]);

  useEffect(() => {
    saveImageToLocalStorage(storyList);
  }, [storyList])

  function addStory(content: string) {
    const createTime = new Date();
    const deleteTime = new Date(createTime.getTime() + 24*60*60*1000); // Remover após 24 horas -> 24*60*60*1000
    const newStorie: StoriesData = {key: uuidv4(), content, createTime, deleteTime};
    setStoryList(prevList => {
      const newList = [...prevList, newStorie];
      setCurrentIndex(newList.length - 1);
      return newList;
    });
    setIsAddStorie(false);
    setImage(newStorie.content);
    setTimerKey(prevKey => prevKey + 1);
  }

  function selectStory(story: StoriesData) {
    if(story.content !== image) {
      const index = storyList.findIndex(item => item.key === story.key);
      setImage(story.content);
      setCurrentIndex(index);
      setTimerKey(prevKey => prevKey + 1);
    }
  }

  function removeStory (story: StoriesData) {
    setStoryList(prevList => {
      const newList = prevList.filter(item => item.key !== story.key);
      if(newList.length > 0) {
        const currentIndex = prevList.findIndex(item => item.key === story.key);
        if(currentIndex !== -1 && prevList[currentIndex].content === image) {
          const nextIndex = (currentIndex + 1) % newList.length;
          setImage(newList[nextIndex].content);
          setCurrentIndex(nextIndex);
        } else {
          const index = newList.findIndex(item => item.content === image);
          if(index !== -1) {
            setImage(newList[index].content);
            setCurrentIndex(index)
          } else {
            setImage(newList[0].content);
            setCurrentIndex(0)
          }
        }
      } else {
        setImage(null);
        setCurrentIndex(0);
      }
      return newList;
    });
    setTimerKey(prevKey => prevKey + 1);
  }

  function setImageList (storageStorieList: StoriesData[]) {
    setStoryList(storageStorieList)
  }

  function activatePopUp() {
    setIsAddStorie(true);
  }

  return(
    <div className={`bg-black w-full min-h-screen p-4`}>
      <StoriesBar image={image} storyList={storyList} selectStory={selectStory}
        removeStory={removeStory} activatePopUp={activatePopUp}/>
      <ShowSelectedStories image={image} listLength={storyList.length} currentIndex={currentIndex} setImageList={setImageList}/>
      <FloatStoryPopUp isAddStory={isAddStory} addStory={addStory}/>
    </div>
  );
}
