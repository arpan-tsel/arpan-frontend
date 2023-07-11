import React, {useState} from 'react';
import axios from 'axios';

const ModalCreateDiv = () => {
  const [msg, setMsg] = useState('');
  const [division, setDivision] = useState("");
  const [sub_directorate, setSub_directorate] = useState("Business Solution Management");

  const refreshPage = ()=>{
    window.location.reload();
  }

  const createDiv = async (event) => {
    event.preventDefault();
    console.log(division);
    console.log(sub_directorate);
    try {
      await axios.post(`division`, {
        division: division,
        sub_directorate: sub_directorate,
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
      <form onSubmit={createDiv} className="box">

        <table class="table ">
          <tr>
            <th>Division Name</th>
            <td>
              <input type="text" className="form-control" value={division} onChange={(event) => setDivision(event.target.value)} placeholder="..." />
            </td>
          </tr>
          <tr>
            <th>Sub-Directorate Name</th>
            <td>
              <input type="text" className="form-control" value={sub_directorate} onChange={(event) => setSub_directorate(event.target.value)} placeholder="" />
            </td>
          </tr>
        </table>

        <p className="has-text-centered">{msg}</p>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-danger">Create Division</button>
        </div>
      </form>
    </div>
  )
}

export default ModalCreateDiv