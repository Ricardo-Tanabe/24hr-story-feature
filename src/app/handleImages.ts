import { StoriesData } from "./interface";

export function convertImageToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}

export function saveImageToLocalStorage(storieList: StoriesData[]): void {
    localStorage.setItem('storieList', JSON.stringify(storieList));
}

export function getImageFromLocalStorage(): StoriesData[] | null {
    const storedStorieList = localStorage.getItem('storieList');
    if(storedStorieList) {
        const parsedStorieList: StoriesData[] = JSON.parse(storedStorieList);
        return parsedStorieList;
    }
    return null;
}

export function isLocalStorageFull(newItemSize: number): boolean {
    const allKeys = Object.keys(localStorage);
    let totalSize = 0;

    for (const key of allKeys) {
        const item = localStorage.getItem(key);
        if(item) {
            totalSize += item.length;
        }
    }

    return (totalSize + newItemSize) > 5 * 1024 * 1024
}