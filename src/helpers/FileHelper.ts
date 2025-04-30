export class FileHelper {
    static async toBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = (reader.result as string).split(',')[1];
                resolve(base64);
            };
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    }

    static async toBinary(file: File): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = (err) => reject(err);
            reader.readAsArrayBuffer(file);
        });
    }
    static async ToObjectURL(file: File): Promise<string> {
        return URL.createObjectURL(file);
    }
}