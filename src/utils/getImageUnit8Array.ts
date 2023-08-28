export function getImageUnit8Array(file: File) {
    return new Promise<Uint8Array>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const unit8Array = new Uint8Array(arrayBuffer);
            resolve(unit8Array);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
