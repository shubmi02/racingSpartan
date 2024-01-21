import React, { useEffect, useState } from 'react';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf';

const PdfTextReader = ({ base64Pdf }) => {
  const [pdfText, setPdfText] = useState('');

  useEffect(() => {
    // Convert Base64 string to Uint8Array
    console.log(base64Pdf);
    const pdfData = atob(base64Pdf);
    const pdfBytes = new Uint8Array(pdfData.length);

    for (let i = 0; i < pdfData.length; i++) {
      pdfBytes[i] = pdfData.charCodeAt(i);
    }

    // Load the PDF document
    getDocument({ data: pdfBytes }).promise.then((pdf) => {
      // Loop through each page
      let finalText = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then((page) => {
          // Extract text content from the page
          page.getTextContent().then((textContent) => {
            const textItems = textContent.items;

            // Concatenate text items to form the final string
            for (const textItem of textItems) {
              finalText += textItem.str + ' ';
            }

            // Update state with the final text
            setPdfText(finalText);
          });
        });
      }
    }).catch((error) => {
      console.error('Error loading PDF:', error);
    });
  }, [base64Pdf]);

  return (
    <div>
      <h2>PDF Text Viewer</h2>
      <textarea
        value={pdfText}
        style={{ width: '100%', height: '300px', overflow: 'auto' }}
        readOnly
      />
    </div>
  );
};

export default PdfTextReader;
