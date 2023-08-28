import "./App.css";
import { Dropzone } from "./Dropzone";

function App() {
    return (
        <>
            <div>
                <svg
                    className="logo"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                </svg>
            </div>
            <h1>Merge images to single PDF</h1>
            <Dropzone />
            <p className="read-the-docs">
                <a href="https://github.com/eai04191/merge-images-to-pdf">
                    github.com/eai04191/merge-images-to-pdf
                </a>
            </p>
        </>
    );
}

export default App;
