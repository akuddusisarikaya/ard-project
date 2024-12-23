import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useAPI from "../store/storeAPI";
import FormData from "form-data";
import { DataContext } from "../store/DataContext";
//import { useNavigate } from "react-router";


const FileUpload = () => {
  const { updateData } = React.useContext(DataContext);
  const { setFileData } = useAPI();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  //const nav = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const filteredFiles = acceptedFiles.filter(
      (file) => file.size <= 5 * 1024 * 1024
    ); // 5MB
    if (filteredFiles.length < acceptedFiles.length) {
      alert("Bazı dosyalar çok büyük!");
    }
    setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    setUploading(true);
    const progress = {};
    try {
      const uploadedFiles = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("describe", description);
        const response = await setFileData("/aws/upload", {},  formData);
        if (!response.answer) {
          throw new Error(`Dosya yüklenemedi: ${file.name}`);
        }
        const result = await response;
        uploadedFiles.push(result.answer._id);

        progress[file.name] = 100;
      }

      alert("Tüm dosyalar başarıyla yüklendi!");
      setFiles([]);
      var docs = JSON.stringify(uploadedFiles);
      updateData("docs",docs);
      //nav(0)
    } catch (error) {
      console.error("Hata:", error);
      alert("Dosya yükleme sırasında bir hata oluştu!");
    } finally {
      setUploading(false);
    }
  };

  const renderFileList = () =>
    files.map((file, index) => (
      <li key={index}>
        {file.name} - {(file.size / 1024).toFixed(2)} KB
      </li>
    ));

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          borderRadius: "10px",
          backgroundColor: isDragActive ? "#f0f0f0" : "#fff",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Dosyaları bırakın...</p>
        ) : (
          <p>Dosya yüklemek için buraya sürükleyip bırakın veya tıklayın</p>
        )}
      </div>

      {/* Seçilen dosyalar */}
      {files.length > 0 && (
        <div>
          <h3>Seçilen Dosyalar:</h3>
          <ul>{renderFileList()}</ul>
          <br />
          <textarea onChange={handleDescription}></textarea>
          <br />
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{
              padding: "10px 20px",
              backgroundColor: uploading ? "#ccc" : "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: uploading ? "not-allowed" : "pointer",
            }}
          >
            {uploading ? "Yükleniyor..." : "Yükle"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
