const FileViewer = require("react-file-viewer");

const OfficeViewer = (props: any) => {
  const{fileUrl, fileType} = props;
  const onError = (e: any) => {
    console.log(e, "error in file-viewer");
  };
  
  return (
    <div className="h-full">
      {(fileType === "docx" || fileType === "doc") && <FileViewer
        fileType={fileType}
        filePath={fileUrl}
        onError={onError}
      />}
      {(fileType === "xlsx" || fileType === "xls") && <div className='px-5 text-lg'>
        No Preview For Excel Files.
      </div>
      }
    </div>
  );

};

export default OfficeViewer;
