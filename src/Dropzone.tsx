import jsPDF from "jspdf";
import "./Dropzone.css";
import { getImageDimensions } from "./utils/getImageDimensions";
import { getImageUnit8Array } from "./utils/getImageUnit8Array";
import { useState } from "react";

type DropzoneImage = {
    file: File;
    unit8Array: Uint8Array;
    format: "JPEG" | "PNG";
    width: number;
    height: number;
};

function addImageToPdf(doc: jsPDF, img: DropzoneImage) {
    const { unit8Array, format, width, height } = img;
    const orientation = width > height ? "landscape" : "portrait";
    doc.addPage([width, height], orientation);
    doc.addImage(unit8Array, format, 0, 0, width, height);
}

async function changeEvent(files: File[], shouldCompress: boolean) {
    const imgs: DropzoneImage[] = await Promise.all(
        [...files].map(async (file) => {
            const dimensions = await getImageDimensions(file);
            const unit8Array = await getImageUnit8Array(file);
            return {
                file,
                unit8Array,
                format: file.type === "image/jpeg" ? "JPEG" : "PNG",
                width: dimensions.width,
                height: dimensions.height,
            };
        })
    );

    console.log(imgs, shouldCompress);

    const doc = new jsPDF({
        unit: "px",
        hotfixes: ["px_scaling"],
        compress: shouldCompress,
    });

    // remove default page
    doc.deletePage(1);

    imgs.forEach((img) => {
        addImageToPdf(doc, img);
    });

    doc.save(`${new Date().toISOString()}_${files.length}.pdf`);
}

export function Dropzone() {
    const [shouldCompress, setShouldCompress] = useState(false);

    function resetFileInput(input: HTMLInputElement) {
        input.value = "";
    }

    async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        // filter jpg and png
        const files = event.target.files;
        if (!files) {
            return;
        }
        const imageFiles = [...files].filter(
            (file) => file.type === "image/jpeg" || file.type === "image/png"
        );
        if (!imageFiles) {
            return;
        }

        await changeEvent(imageFiles, shouldCompress);
        resetFileInput(event.target);
    }

    return (
        <>
            <div className="card">
                <label className="dropzone">
                    <p>
                        Drag and drop images here <br />
                        or <br />
                        click to select images.
                    </p>
                    <p>
                        Only <code>JPEG</code> and <code>PNG</code> files are
                        allowed.
                    </p>
                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleChange}
                        multiple
                    />
                </label>
            </div>
            <div className="card">
                <label className="use-compression">
                    <input
                        type="checkbox"
                        checked={shouldCompress}
                        onChange={(event) =>
                            setShouldCompress(event.target.checked)
                        }
                    />
                    Use compression
                </label>
                <small>
                    <p>
                        Use compression to reduce the size of the PDF file to
                        the same level as the size of the file, but note that it
                        consumes a lot of CPU.
                    </p>
                    <p>
                        On the other hand, if you don't use compression, the PDF
                        file may be several times larger than the size of the
                        images.
                    </p>
                </small>
            </div>
        </>
    );
}
