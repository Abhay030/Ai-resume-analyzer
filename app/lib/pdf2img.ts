export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    loadPromise = import("pdfjs-dist/build/pdf.mjs")
        .then(async (lib) => {
            // Import the worker from the same package to ensure version compatibility
            const workerSrc = await import("pdfjs-dist/build/pdf.worker.mjs?url");
            lib.GlobalWorkerOptions.workerSrc = workerSrc.default || workerSrc;
            pdfjsLib = lib;
            isLoading = false;
            return lib;
        })
        .catch((err) => {
            console.error("Failed to load PDF.js:", err);
            isLoading = false;
            loadPromise = null;
            throw err;
        });

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        console.log('Loading PDF.js library...');
        const lib = await loadPdfJs();
        console.log('PDF.js loaded successfully');

        console.log('Reading file as array buffer...');
        const arrayBuffer = await file.arrayBuffer();
        console.log('Array buffer size:', arrayBuffer.byteLength);

        console.log('Loading PDF document...');
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        console.log('PDF loaded, total pages:', pdf.numPages);

        console.log('Getting first page...');
        const page = await pdf.getPage(1);
        console.log('Page loaded');

        const viewport = page.getViewport({ scale: 4 });
        console.log('Viewport created:', viewport.width, 'x', viewport.height);

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Failed to get 2D context from canvas");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        console.log('Rendering page to canvas...');
        await page.render({ canvasContext: context, viewport }).promise;
        console.log('Page rendered successfully');

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        console.log('Blob created, size:', blob.size);
                        // Create a File from the blob with the same name as the pdf
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        console.error('Failed to create blob from canvas');
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });
                    }
                },
                "image/png",
                1.0
            ); // Set quality to maximum (1.0)
        });
    } catch (err) {
        console.error('PDF conversion error:', err);
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${err}`,
        };
    }
}