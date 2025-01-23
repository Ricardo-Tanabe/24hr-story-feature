export interface StoriesData {
    key: string;
    content: string;
    createTime: Date;
    deleteTime: Date;
}

export interface FloatStoryPopUpProp {
    isAddStory: boolean;
    addStory: (content: string) => void;
}

export interface AddNewStoryProp {
    activatePopUp: () => void;
}

export interface StoryProp {
    story: StoriesData;
    selectStory: (story: StoriesData) => void;
    removeStory: (story: StoriesData) => void;
}

export interface StoriesBarProp {
    image: string | null;
    storyList: StoriesData[];
    selectStory: (story: StoriesData) => void
    removeStory: (story: StoriesData) => void;
    activatePopUp: () => void;
}

export interface ShowSelectedStoriesProp {
    image: string | null,
    listLength: number;
    currentIndex: number;
    setImageList: (storageStorieList: StoriesData[]) => void;
}
