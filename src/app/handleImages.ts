export function convertImageToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}

export function saveImageToLocalStorage(key: string, image: string | ArrayBuffer | null): void {
    if (typeof image === 'string') {
        localStorage.setItem(key, image);
    }
}

export function getImageFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
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

    return (totalSize + newItemSize) > 5 * 10124 * 1024
}