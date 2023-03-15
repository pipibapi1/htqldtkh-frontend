import { useState, useEffect } from 'react';
import * as XLSX from "xlsx";
const FileViewer = require("react-file-viewer");

let PizZipUtils: any = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

function loadFile(url: string, callback: any) {
  PizZipUtils.getBinaryContent(url, callback);
}

const OfficeViewer = (props: any) => {

  const {fileUrl, fileType} = props;

  const [data, setData] = useState<any[]>([]);

  const onError = (e: any) => {
    console.log(e, "error in file-viewer");
  };

  useEffect(() => {
    if(fileType === "xlsx" || fileType === "xls"){
      loadFile(fileUrl, function (
          error: any,
          content: any
          ) {
              if (error) {
              throw error;
              }
              const workbook = XLSX.read(content, { type: 'array' });
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              const sheetData = XLSX.utils.sheet_to_json(sheet);
              setData(sheetData);
      });
    }
},[fileUrl])
  
  return (
    <div className="items-center justify-center h-full w-full p-2 bg-white">
      {(fileType === "docx" || fileType === "doc") && <FileViewer
        fileType={fileType}
        filePath={fileUrl}
        onError={onError}
      />}
      {(fileType === "xlsx" || fileType === "xls") && 
      <div className='h-full overflow-y-scroll'>
        <table className=''>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {Object.keys(row).map((cellKeys: string, index: number) => (
                  <td className='border-2' key={index}>{row[cellKeys]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );

};

export default OfficeViewer;
