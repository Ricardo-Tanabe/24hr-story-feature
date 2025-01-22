export interface FloatStoryPopUpProp {
    isAddStory: boolean;
    addStory: (content: string) => void;
}

export interface StoriesBarProp {
    storyList: StoriesData[];
    selectStory: (story: StoriesData) => void
    removeStory: (story: StoriesData) => void;
    activatePopUp: () => void;
}

export interface ShowSelectedStoriesProp {
    image: string | null,
    setImageList: (storageStorieList: StoriesData[]) => void;
}

export interface AddNewStoryProp {
    activatePopUp: () => void;
}

export interface StoryProp {
    story: StoriesData;
    index: number;
    selectStory: (story: StoriesData) => void;
    removeStory: (story: StoriesData) => void;
}

export interface StoriesData {
    key: string;
    content: string;
    createTime: Date;
    deleteTime: Date;
}