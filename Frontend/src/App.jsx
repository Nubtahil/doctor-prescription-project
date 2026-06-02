 
import './App.css'
import  PatientForm from "./PatientForm.jsx"
import ShowData from "./show_data.jsx"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useState} from "react";
import NavBar from "./NavBar.jsx"
import HomePage from "./HomePage.jsx"
function App() {
   const [formData, setFormData] = useState({
     name: "",
     age: "",
     disease: "",
     duration: "",
     medicine:"",
     gender: "",
     phoneNumber: "",
     image:null
   });

   const [editId, setEditId] = useState(null);

  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/Patientform"
            element={
              <PatientForm
                formData={formData}
                setFormData={setFormData}
                editId={editId}
                setEditId={setEditId}
              />
            }
          ></Route>
          <Route
            path="/showdata"
            element={
              <ShowData
                formData={formData}
                setFormData={setFormData}
                editId={editId}
                setEditId={setEditId}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
