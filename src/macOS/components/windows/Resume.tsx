import WindowControls from '../WindowControls';
import WindowWrapper from '../../hoc/WindowWrapper';
import { Download } from 'lucide-react';
import { profile } from '../../../data/profile';
import { pdfjs, Document, Page } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// The page keeps A4 proportions but never taller than the screen, so the window always fits.
const pageHeight = () => Math.min(842, Math.max(420, window.innerHeight - 150));

const Resume = () => {

    return (
    <>
        <div id="window-header">
            <WindowControls target="resume"/>
            <h2>Resume.pdf</h2>

            <a href={profile.cvUrl} download={profile.cvFileName} className='cursor-pointer' title='Download resume'>
                <Download className='icon' />
            </a>
        </div>
        <Document file={profile.cvUrl}>
            <Page pageNumber={1} height={pageHeight()} renderTextLayer renderAnnotationLayer/>
        </Document>

    </>
  )
}
const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;