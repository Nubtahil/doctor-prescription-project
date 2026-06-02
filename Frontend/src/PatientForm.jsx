  import axios from "axios";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useRef } from "react";
  function PatientForm({ formData, setFormData, editId, setEditId }) {
    // name of inputfield + useState Obj name + backend Schema  = same same must be
    const imagerefresh = useRef();
    function handleInfo(e) {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    //image handler
    function handleImage(e) {
      setFormData((prev) => ({
        ...prev,
        //e.target.files[0] file input se user ki select ki hui pehli image/file ko hasil karta hai.
        image: e.target.files[0],
      }));
    }

    function submit(e) {
      e.preventDefault();
      // backend do not dirctely understand the image ans text so i am using constructor here
      // we are unable to sent data in formdata state so we use other option
      // Why append()?

      // Because FormData is like a BOX 📦

      // You cannot directly put object inside.

      // You must say:

      // "put this item inside box"

      // 🚨 Why we cannot skip this?

      // Because backend expects:

      // req.body + req.file

      // And that only works with:

      // multipart/form-data

      // this FormData(); is the built_in constructie is m ap changing nae ker skti ye JS ki apni class jo nubtahil ne usestate m formdata liya us ka is koi link nae h
      // FormData(); is class se ap image or form data dono backend ko bhj skty ho or ye follwing methods deta g get,delete,append
      const data = new FormData();

      data.append("name", formData.name);
      data.append("age", formData.age);
      data.append("disease", formData.disease);
      data.append("duration", formData.duration);
      data.append("gender", formData.gender);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("image", formData.image);

      const request = editId
        ? axios.put(`http://localhost:5000/patient/update/${editId}`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : axios.post("http://localhost:5000/patient/add", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

      request
        .then((result) => {
          if (editId) {
            toast.success("Patient updated successfully ✅");
          } else {
            toast.success("Patient added successfully ✅");
          }

          setFormData({
            name: "",
            age: "",
            disease: "",
            duration: "",
            medicine: "",
            gender: "",
            phoneNumber: "",
            image: null,
          });

          setEditId(null);
          // since the input field of type file is not able to get empty by react so we use "useRef" hook to refesh it there
          imagerefresh.current.value = "";
        })

        .catch((err) => {
          //forEach() → jab sirf koi action perform karna ho.
          // map() → jab naya array create karna ho.
          if (err.response?.data?.errors) {
            err.response.data.errors.forEach((e) => toast.error(e.msg));
          } else {
            toast.error("Server error");
          }
          console.log(err);
        });
    }
    return (
      <>
        <ToastContainer></ToastContainer>
        <form
          method="POST"
          onSubmit={submit}
          id="patient_form"
          encType="multipart/form-data"
        >
          <div>
            <label className="label_Tag">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInfo}
            />
            <label className="label_Tag">Age</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInfo}
            />
          </div>

          <div>
            <label className="label_Tag">disease</label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleInfo}
            />
            <label className="label_Tag">duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInfo}
            />
            <label className="label_Tag">Medicine & Dosage</label>
            <input
              type="text"
              name="medicine"
              value={formData.medicine}
              onChange={handleInfo}
            />
          </div>
          <div>
            <label className="label_Tag">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleInfo}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label className="label_Tag">PhoneNumber</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInfo}
            />
            <label className="label_Tag">Patient photo</label>
            <input
              type="file"
              name="image"
              ref={imagerefresh}
              //onclick is use when we nedd to do something immidiately but in case i am just submittinh the form so iam using onchange becuse this is the best option
              onChange={handleImage}
            />
          </div>
          <button type="submit">{editId ? "Update Patient" : "Submit"}</button>
        </form>
      </>
    );
  }

  export default PatientForm;
