import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-icons";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
function ShowData({ setFormData, setEditId }) {
  const [showData, setShowData] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  //get ke liye new state bnty hein always take jo data backend se aye wo us state m save ho jaye
  //we can use  "useeffect" for the fetching of the data
  useEffect(() => {
    axios
      .get("http://localhost:5000/patient/get")
      .then((result) => setShowData(result.data))
      .catch((err) => console.log(err));
  }, []);
  //delete function

  function PatientDelete(id) {
    axios
      .delete(`http://localhost:5000/patient/delete/${id}`)
      .then(() => {
        setShowData(showData.filter((data) => data._id !== id));
      })
      .catch((err) => console.log(err));
  }

  function PatientUpdate(data) {
    setFormData(data);
    setEditId(data._id);
    navigate("/Patientform");
  }
  // 🔥 FILTER LOGIC (IMPORTANT)
  const filteredData = showData.filter((data) =>
   data.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <input id="search"
        placeholder="Search your patient here!"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
      {/* map do not make a new array since i need to tp put every time new data in the new box mujhy pichla recorde nae chiye tha so i use map  */}
      {filteredData.map((data) => (
        <div key={data._id} id="diaplay_Patient_Data">
          <div className="left_record_data">
            <div id="icon_div">
              <MdDelete
                onClick={() => PatientDelete(data._id)}
                className="icon"
              />
              <GrUpdate onClick={() => PatientUpdate(data)} className="icon" />
            </div>
            <h2>Name:</h2>
            <p>{data.name}</p>
            <h2>Age:</h2>
            <p>{data.age}</p>
            <h2>Disease:</h2>
            <p>{data.disease}</p>
            <h2>Duration:</h2>
            <p>{data.duration}</p>
            <h2>Gender:</h2>
            <p>{data.gender}</p>
            <h2>Phone Number:</h2>
            <p>{data.phoneNumber}</p>
          </div>

          <div className="right_record_image">
            <img src={`http://localhost:5000/uploads/${data.image}`} />
          </div>
        </div>
      ))}
    </>
  );
}

export default ShowData;
