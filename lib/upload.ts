export async function uploadFile(file: File): Promise<string> {
    // placeholder temporário (mock de upload)

    await new Promise((resolve) => setTimeout(resolve, 500));

    return URL.createObjectURL(file);
}