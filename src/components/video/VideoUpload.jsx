import React from "react";
import { Button, Upload } from "antd";

function VideoUpload({ disbled, onChange = () => {}, onRemove = () => {}}) {
  return (
    <>
      <Upload
        disabled={disbled}
        beforeUpload={() => {
          return false;
        }}
        accept="video/*"
        onChange={(info) => {
          if(info.fileList && info.fileList.length > 0) {
            onChange(info.fileList[0].originFileObj);
          }
        }}
        showUploadList={false}
      >
        <Button>Upload Video</Button>
      </Upload>

      <Button
        danger={true}
        disabled={!disbled}
        onClick={() => {
          onRemove(undefined);
        }}
      >
        Remove
      </Button>
    </>
  );
}

export default VideoUpload;
