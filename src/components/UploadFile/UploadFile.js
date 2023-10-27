import React, { useState, useCallback } from 'react';
import { Button } from '../../globalStyles';
import {useDropzone} from 'react-dropzone';
import styled from "styled-components";
import { Close } from "@styled-icons/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";


const Dropzone = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  color: #707070;
  border: 3px dashed #bdbdbd;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;

  input {
    display: none;
  }
`;


const SelectedFileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* width: 80%; */
  width: 100%;
`;

const SelectedFile = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: rgb(140, 146, 151);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClearFile = styled(Close)`
  border: 0;
  background: transparent;
  color: red;
  width: 1.5rem;
  cursor: pointer;
`;

const Subtitle = styled.p`
    max-width: 440px;
    font-size: 18px;
    line-height: 24px;
    color: rgb(140, 146, 151);
    /* padding: 0px 15px; */
`;

const FileUploadedTitle = styled.p`
    max-width: 440px;
    font-size: 18px;
    line-height: 24px;
    color: rgb(140, 146, 151);
    width: 195px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const DropContainer = styled.div`
  margin-bottom: 30px;
`;

const StyledButton = styled(Button)`
  width: 150px;
  margin: auto;
`;

const FileUploaded = styled.div`
  margin-top: 30px;
`;

const AlertContainer = styled.p`
  font-size: 18px;
  line-height: 24px;
  color: rgb(255,99,71); 
`;

const SubtitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubtitleFileAccept = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  text-align: center;
  font-style: italic;
`;


const validationSchema = Yup.object().shape({
  file: Yup.mixed(),
  name: Yup.string().required()
});


const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [submitedFile, setSubmitedFile] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  const { handleSubmit } = useForm({
    validationSchema
  });
  
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles) {
      setAlertMessage('Please choose .pdf, .doc, .docx, .xls, .xlsx files.')
      setSelectedFile(null);
    }
    
    if (acceptedFiles.length > 1) {
      setAlertMessage('Please select only one file.');
      setSelectedFile(null);
    } else {
      setSelectedFile(acceptedFiles);
    }
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop, 
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false,
    maxFiles: 1,
  });

  const onSubmit = () => {
    setSubmitedFile(selectedFile);
  };
  console.log(submitedFile);


  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <DropContainer>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Dropzone>
              {
                isDragActive ?
                  <Subtitle>Drop the file here ...</Subtitle>
                  :
                  <>
                    <SubtitleContainer>
                      <Subtitle>Drag and drop your CV in here, or click to select file.</Subtitle>
                      <SubtitleFileAccept>* Only one .pdf, .doc, .docx, .xls, .xlsx file is accepted *</SubtitleFileAccept>
                    </SubtitleContainer>
                  </>
              }
            </Dropzone>
          </div>

          <FileUploaded>
            {alertMessage ? 
              <AlertContainer>{alertMessage}</AlertContainer>
              :
              <>
                {selectedFile ? 
                  <SelectedFileContainer>
                    <FileUploadedTitle>Your selected file: </FileUploadedTitle>
                    <SelectedFile>{selectedFile[0].path}</SelectedFile>               
                    <ClearFile 
                      onClick={() => setSelectedFile(null)} 
                      title='Remove file' 
                    />
                  </SelectedFileContainer>
                  : ''}             
              </>
            }
          </FileUploaded>
        </DropContainer>
        <StyledButton type="submit">Apply</StyledButton>
      </StyledForm>    
    </>
  )
}

export default UploadFile;