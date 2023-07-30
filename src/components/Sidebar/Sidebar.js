import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import {FaCity, FaUserAlt, FaTools, FaUsersCog, FaBuilding} from 'react-icons/fa'
import {HiClipboardList, HiChat} from 'react-icons/hi'
import {BsListCheck} from 'react-icons/bs'
import {AiOutlineLineChart} from 'react-icons/ai'
import {TbReportAnalytics} from 'react-icons/tb'
import './Sidebar.css'
import logo from '../img/logo-sidebar.png';

const Sidebar = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [divisions, setDivisions] = useState([]);
  const [division, setDivision] = useState("");
 
  useEffect(() => {
    setUserId(localStorage.getItem("uuid"));
    refreshToken();
    getUsers();
  }, []);

  useEffect(()=>{
    getDivManagement()
  }, [page, keyword]);

  //get list of divisions
  const getDivManagement = async () => {
    const response = await axios.get(
        `getDivisionManagement?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setDivisions(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };
    
 
  const refreshToken = async () => {
    try {
      const response = await axios.get('tokenAccount');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
        if (error.response) {
          navigate("/");
        }
      }
  }
 
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('tokenAccount');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) => {
        return Promise.reject(error);
  });
 
  const getUsers = async () => {
    const response = await axiosJWT.get('userAccount', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  }
    

  return (
    <div id="sidebar">
      <aside className="main-sidebar sidebar-dark-primary elevation-4" >
        <Link to = '/dashboard'>
          <div className="brand-link">
            <img src={logo} alt="Telkomsel Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-bold">ARPAN-TSEL</span>
          </div>
        </Link>
        <div className="sidebar" >
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link to= '/dashboard' className='nav-link'>
                  <i className="nav-icon fas fa-chart-pie" />
                  <p>
                    Dashboard
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to= '/dashboard/projectList' className='nav-link'>
                  <i className="nav-icon fas"><BsListCheck/></i>
                  <p>Project Tracking</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to= '/dashboard/audit' className='nav-link'>
                  <i className="nav-icon fas"><HiClipboardList/></i>
                  <p>
                    Audit
                  </p>
                </Link>
              </li>
              <li className="nav-item treeview">
                <a href='#' className="nav-link ">
                  <i className="nav-icon fas"><AiOutlineLineChart/></i>
                  <p>
                    Visualization
                    <i className="fas fa-angle-left right"/>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  {divisions.map((division, index) => (
                    <li className="nav-item">
                      <Link to = '/dashboard/visualization' state = {{division: division.division}} className='nav-link'>
                        <i className="far fa-circle nav-icon"/>
                        <p>{division.division}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
                
              </li>
              <li className="nav-item">
                <Link to= '/dashboard/warehouse' className='nav-link'>
                  <i className="nav-icon fas"><TbReportAnalytics/></i>
                  <p>Warehouse</p>
                </Link>
              </li>
              <li className="nav-item">
                <a className='nav-link' href={`/dashboard/profile/${users.uuid}`}>
                  <i className="nav-icon fas" ><FaUserAlt/></i>
                  <p>
                    User Profile
                  </p>
                </a>
              </li>

              {users && users.role === "admin" && (
                <div className="nav-sidebar">
                  <br/>
                  <li className="nav-item menu-close">
                    <a href='#' className='nav-link'>
                      <i className="nav-icon fas"><FaTools/></i>
                      <p>
                        Administrator Menu
                        <i className="fas fa-angle-left right"/>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to= '/dashboard/usermanagement' className='nav-link'>
                          <i className="far nav-icon"><FaUsersCog/> </i>
                          <p>
                            User Management
                          </p>
                        </Link>
                      </li>
                    </ul>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to= '/dashboard/divmanagement' className='nav-link'>
                          <i className="far nav-icon"><FaCity/> </i>
                          <p>
                            Division Management
                          </p>
                        </Link>
                      </li>
                    </ul>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to= '/dashboard/deptmanagement' className='nav-link'>
                          <i className="far nav-icon"><FaBuilding/> </i>
                          <p>
                            Department Management
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar