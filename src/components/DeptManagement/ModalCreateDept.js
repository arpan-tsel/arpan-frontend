import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Select from "react-select";

const ModalCreateDept = () => {
  const [msg, setMsg] = useState('');
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState("");
  const [divisi, setDivisi] = useState("");
  const [devTitle, setDevTitle] = useState("");

  const refreshPage = ()=>{
    window.location.reload();
  }

  useEffect(() => {
    getAllDivisions();
  }, []);

  //get all divisions
  const getAllDivisions = async() =>{
    const res = await axios.get(`getAllDivisions`);
    const allDivision = res.data.map((data) => data.division);
    setDivision([...new Set(allDivision)]); //distinct
    return; 
  }

  const options = division.map((divisi) => ({
    value: divisi,
    label: divisi,
  }));

  const createDept = async (event) => {
    event.preventDefault();
    console.log(department);
    console.log(division);
    console.log(devTitle);
    try {
      await axios.post(`department`, {
        department: department,
        division: divisi,
        devTitle: devTitle
      });
      console.log('bisa')
      refreshPage();
    } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
    }
  }


  return (
    <div className='modalOptionsContainer'>
      <form onSubmit={createDept} className="box">

        <table class="table ">
          <tr>
            <th>Department Name</th>
            <td>
              <input type="text" className="form-control" value={department} onChange={(event) => setDepartment(event.target.value)} placeholder="...." />
            </td>
          </tr>
          <tr>
            <th>Division Name</th>
            <td>
              <Select
                placeholder='-'
                onChange={(event) => setDivisi(event.value)}
                options={options}
                style={{  }}
              />
            </td>
          </tr>
          <tr>
            <th>Dev Title</th>
            <td>
              <input type="text" className="form-control" value={devTitle} onChange={(event) => setDevTitle(event.target.value)} placeholder="...." />
            </td>
          </tr>
        </table>

        <p className="has-text-centered">{msg}</p>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-danger">Create Department</button>
        </div>
      </form>
    </div>
  )
}

export default ModalCreateDept