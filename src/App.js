import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import {v4 as uuidv4} from 'uuid';
import './App.css';

//! Improvements
// 1. Configuring the languages
// 2. Configuring the language codes
// 3. Check backend if needed
// 4. Use OCR or No OCR control
// 5. Add and hide download button
// 6. Limit CORS at AWS Backend


function App() {

  const [sourceLanguage, setSourceLanguage] = useState()
  const [targetLanguage, setTargetLanguage] = useState()    
  const [fileContent, setFileContent] = useState()
  const [translatedContent, setTranslatedContent] = useState()

  useEffect(() => {
    if(translatedContent){
      var blob = new Blob([translatedContent], {
        type: "text/plain;charset=utf-8"
      });
      var filename = uuidv4()
      saveAs(blob, filename + '.txt')
      // window.location.reload(true)
    }
  }, [translatedContent])
  

  const awsTranslate = async () => {
    await fetch(`https://pdw93vt1x2.execute-api.us-west-2.amazonaws.com/default/dlp-aws-translate-function?source_language=${sourceLanguage}&target_language=${targetLanguage}&text_input=${fileContent}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    .then(res => res.json().then(j => setTranslatedContent(String(j))))
  }
    
  const onFileChange = (e) => {
    e.preventDefault();
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      setFileContent(text)
    };
    reader.readAsText(e.target.files[0]);
  }

  const onFileUpload = (e) => {
    e.preventDefault()
    console.log(`https://pdw93vt1x2.execute-api.us-west-2.amazonaws.com/default/dlp-aws-translate-function?source_language=${sourceLanguage}&target_language=${targetLanguage}&text_input=${fileContent}`)
    awsTranslate()
  }

  const onSourceSelect = (e) => {
    setSourceLanguage(e.target.value)
  }

  const onTargetSelect = (e) => {
    setTargetLanguage(e.target.value)
  }

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>Translation Application</h2>
        <p className="lead">This application can be used by Vodafone employees to translate the documents from one language to any other desired language.</p>
      </div>
      <div className="row g-5">
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Choose the options</h4>
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-md-5">
              <label htmlFor="sourceLanguage" className="form-label">Source Language</label>
              <select className="form-select" id="sourceLanguage" onChange={onSourceSelect} required>
                <option value="">Choose...</option>
                <option>English</option>
                <option>Italian</option>
                <option>Romanian</option>
                <option>Czech</option>
                <option>Hungarian</option>
                <option>Spanish</option>
                <option>German</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid source language.
              </div>
            </div>

            <div className="col-md-5">
              <label htmlFor="targetLanguage" className="form-label">Target Language</label>
              <select className="form-select" id="targetLanguage" onChange={onTargetSelect} required>
                <option value="">Choose...</option>
                <option>English</option>
                <option>Italian</option>
                <option>Romanian</option>
                <option>Czech</option>
                <option>Hungarian</option>
                <option>Spanish</option>
                <option>German</option>
              </select>
              <div className="invalid-feedback">
                Please provide a valid target language.
              </div>
            </div>

          </div>

          <br></br>
          <h4 className="mb-3">Method</h4>

          <div className="my-3">
            <div className="form-check">
              <input id="ocr" name="recognitionMethod" type="radio" className="form-check-input" checked required></input>
              <label className="form-check-label" htmlFor="ocr">OCR</label>
            </div>
            <div className="form-check">
              <input id="noOcr" name="recognitionMethod" type="radio" className="form-check-input" required></input>
              <label className="form-check-label" htmlFor="noOcr">No OCR</label>
            </div>
          </div>

          <br></br>
          <h4 className="mb-3">File upload</h4>

          <div className="row gy-3">
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Upload the file to be translated</label>
              <input className="form-control" type="file" id="formFile" onChange={onFileChange}></input>
            </div>
          </div>

          <button className="w-100 btn btn-primary btn-lg" type="submit" onClick={onFileUpload}>Translate</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default App;
