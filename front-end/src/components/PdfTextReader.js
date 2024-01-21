import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';


const PdfTextReader = ({ base64Pdf }) => {
    const [numPages, setNumPages] = useState(null);
    const [pdfText, setPdfText] = useState('');
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);

        // Extract text from each page
        let finalText = '';
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            setPdfText((prevText) => prevText + '\n\nPage ' + pageNum + '\n');
        }
    };

    return (
        <div>
            {
                (base64Pdf) ? (
                    <div>
                    <h2>PDF Text Viewer</h2>
                    <Document
                        file={{ data: base64Pdf }}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))}
                    </Document>
                    
                    <textarea
                        value={pdfText}
                        style={{ width: '100%', height: '300px', overflow: 'auto' }}
                        readOnly
                    />
                    </div>
                                ) : (
                    <div>hi</div>
                )
            }
        </div>
    )
};

export default PdfTextReader;
