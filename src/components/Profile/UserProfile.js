import React, { useState, useEffect } from "react";
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './UserProfile.css'
import { useParams } from "react-router-dom";
import axios from 'axios';
import profilePict from '../img/profile.jpg';
import Select from "react-select";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [employee_title, setEmployeeTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [division, setDivision] = useState("");
  const [sub_directorate, setSubDirectorate] = useState("Business Solution Management");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState("");
  const [divisions, setDivisions] = useState([]);
  const {id} = useParams()
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDivisions();
  }, []);

  //get all divisions
  const getAllDivisions = async() =>{
    const res = await axios.get(`getAllDivisions`);
    const allDivision = res.data.map((data) => data.division);
    setDivisions([...new Set(allDivision)]); //distinct
    return; 
  }

  const options = divisions.map((division) => ({
    value: division,
    label: division,
  }));
  
  useEffect(() => {
    getAllDepartments();
  }, []);

  //get all dept
  const getAllDepartments = async() =>{
    const res = await axios.get(`getAllDepartments`);
    const allDepartment = res.data.map((data) => data.department);
    setDepartments([...new Set(allDepartment)]); //distinct
    return; 
  }

  const optionsdept = departments.map((dept) => ({
    value: dept,
    label: dept,
  }));

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
  const response = await axios.get(`userAccount/${id}`);
  setName(response.data.name);
  setUsername(response.data.username);
  setEmployeeTitle(response.data.employee_title);
  setDepartment(response.data.department);
  setDivision(response.data.division);
  setSubDirectorate(response.data.sub_directorate);
  setPhone(response.data.phone);
  setAddress(response.data.address);
  setPassword(response.data.password);

  console.log(response)
  };

  const refreshPage = ()=>{
    window.location.reload();
  }

  const updateUser = async (e) => {
    e.preventDefault();
    console.log("ya")
    try {
      await axios.patch(`updateUserAccount/${id}`, {
            name : name,
            username : username,
            employee_title : employee_title,
            department : department,
            division : division,
            sub_directorate : sub_directorate,
            phone : phone,
            address : address,
      });
      refreshPage();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
    }
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    console.log('reset pass');
    try{
      await axios.patch(`resetPasswordAccount/${id}`, {
        password,
        confirmPassword
      });
      refreshPage();
    }catch(error){
      if (error.response) {
        setMsg(error.response.data.msg);
    }
    }
  }

  console.log("id user",id)

  return (
    <div>
      <Header/>
      <Sidebar/>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Profile</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">User Profile</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img className="profile-user-img img-fluid img-circle" src={profilePict} alt="User profile picture" />
                    </div>
                    <h3 className="profile-username text-center">{name}</h3>
                    <p className="text-muted text-center">{employee_title}</p>
                    <div className="text-center">
                      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-changePass">Change Password</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card">
                  <div class="modal fade" id="modal-changePass">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title">Change Password</h4>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div className='modalOptionsContainer'>
                            <form className="form-horizontal" onSubmit={resetPassword}>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">password</label>
                                <div className="col-sm-10">
                                  <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Confirm Password</label>
                                <div className="col-sm-10">
                                  <input type="password" className="form-control" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" />
                                </div>
                              </div>
                              <p className="has-text-centered has-text-danger">{msg}</p>
                              <div class="modal-footer justify-content-between">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-danger">Submit</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-headers p-2">
                    <ul className="nav nav-card-profile">
                      <li><a className="nav-link" data-toggle="tab">Profile</a></li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        <form className="form-horizontal" onSubmit={updateUser}>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Employee Name</label>
                            <div className="col-sm-10">
                              <div className="text-left form-control">{name}</div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Employee Title</label>
                            <div className="col-sm-10">
                              <input type="text" className="form-control" value={employee_title} onChange={(e) => setEmployeeTitle(e.target.value)} placeholder="Employee Title" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Sub-Directorate</label>
                            <div className="col-sm-10">
                              <div className="text-left form-control">{sub_directorate}</div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Division</label>
                            <div className="col-sm-10">
                              <div className="text-left form-control">{division}</div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Department</label>
                            <div className="col-sm-10">
                              <Select
                                placeholder={department}
                                onChange={(event) => setDepartment(event.value)}
                                options={optionsdept}
                                style={{  }}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Phone</label>
                            <div className="col-sm-10">
                              <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Address</label>
                            <div className="col-sm-10">
                              <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                            </div>
                          </div>
                          <p className="has-text-centered has-text-danger">{msg}</p>

                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button type="submit" className="btn btn-danger">Save Changes</button>
                            </div>
                          </div> 
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default UserProfile