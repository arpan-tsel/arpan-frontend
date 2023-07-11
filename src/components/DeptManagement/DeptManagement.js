import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import React, {useState, useEffect} from 'react';
import {FaSearch} from 'react-icons/fa';
import {MdAdd} from 'react-icons/md';
import ModalCreateDept from './ModalCreateDept';
import './DeptManagement.css';
import {FaPencilAlt} from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';
import ReactPaginate from "react-paginate";
import axios from 'axios';
import Select from "react-select";

const DeptManagement = () => {

    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [message, setMessage] = useState('');
    const [departments, setDepartments] = useState([]);
    const [query, setQuery] = useState("");
    const [rows, setRows] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [val, setVal] = useState();
    const [department, setDepartment] = useState("");
    const [idDepartment, setIdDepartment] = useState('');
    const [division, setDivision] = useState('');
    const [devTitle, setDevTitle] = useState("");
    const [msg, setMsg] = useState("");
    const [divisions, setDivisions] = useState([]);

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
    
    const options = divisions.map((divisi) => ({
        value: divisi,
        label: divisi,
    }));

    useEffect(()=>{
        getDeptManagement()
    }, [page, keyword]);

    //get list of diepartments
    const getDeptManagement = async () => {
        const response = await axios.get(
            `getDepartmentManagement?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setDepartments(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    };

    //search dept
    const searchData =async(e) => {
        e.preventDefault();
        setPage(0);
        setMessage("");
        setKeyword(query);
        console.log("search: ",query)
        // console.log(keyword)
    };
    const changePage = ({ selected }) => {
        setPage(selected);
        if (selected === 9) {
            setMessage(
                "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
            );
        } else {
            setMessage("");
        }
    };

    const refreshPage = ()=>{
        window.location.reload();
    }

    //get department from id to show in detail page
    const getDepartmentByID = async(id)=>{
        console.log("department id", id);
        setVal(id)
        setIdDepartment(id)
        const response = await axios.get(`/department/${id}`);
        setDepartment(response.data.department);
        setDivision(response.data.division);
        setDevTitle(response.data.devTitle);
    }

    //update department by admin
    const updateDepartment = async (event) =>{
        event.preventDefault();
        console.log(idDepartment)
        try{
          await axios.patch(`department/${idDepartment}`,{
            department: department,
            division : division,
            devTitle: devTitle
          });
          refreshPage();
        } catch (error){
            if (error.response) {
              setMsg(error.response.data.msg);
            }
        }
    }

    //delete department by admin
    const deleteDepartment = async (event)=>{
        event.preventDefault();
        console.log(idDepartment)
        try{
          await axios.delete(`department/${idDepartment}`);
          refreshPage();
        } catch (error){
            console.log(error)
        }
    }

    return(
        <div>
            <Header/>
            <Sidebar/>
            <div class="content-wrapper">

                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Department Management</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                    <li class="breadcrumb-item active">Department Management</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="card">

                                <div class="col-sm-6" style={{marginTop:'1%'}}>
                                    <div class="col-md-5 offset-md-0">
                                        <form onSubmit={searchData}>
                                            <div className="field has-addons">
                                                <div className="input-group">
                                                    <input
                                                        type="search"
                                                        className="form-control form-control-lg"
                                                        value={query}
                                                        onChange={(e) => setQuery(e.target.value)}
                                                        placeholder="Search"
                                                    />
                                                    <button type="submit" className="btn btn-lg btn-default">
                                                        <i className="fas"><FaSearch/> </i>
                                                    </button>
                                                    <button type="button" className="btn btn-lg btn-danger" data-toggle='modal' data-target='#modal-createDept'>
                                                        <i className="fas"><MdAdd/> </i>
                                                    </button> 
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div class="modal fade" id="modal-createDept">
                                   <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Create Department</h4>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <ModalCreateDept/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{marginLeft:'1%', marginRight:'1%'}}>
                                    <div className='table-container  mt-5'>

                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr className='row-table'>
                                                    <th className='divdeptmanagementno-header'>No</th>
                                                    <th className='divdeptmanagement-header'>Department</th>
                                                    <th className='divdeptmanagement-header'>Division</th>
                                                    <th className='divdeptmanagementdel-header'>Detail</th>
                                                    <th className='divdeptmanagementdel-header'>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {departments.map((department, index) => ( 
                                                    <tr key={department.departmentid}>
                                                        <td>{index + 1}</td>
                                                        <td>{department.department}</td>
                                                        <td>{department.division}</td>
                                                        <td>
                                                            <button type="button" class="btn btn-default" onClick={() => getDepartmentByID(department.id)} onChange={() => setVal(department.id)} data-toggle="modal" data-target="#modal-default" ><i className="fas"><FaPencilAlt/> </i></button>
                                                        </td>
                                                        <td>
                                                            <button type="button" class="btn btn-default" onClick={() => getDepartmentByID(department.id)} data-toggle="modal" data-target="#modal-deletediv"><i className="fas"><AiFillDelete/> </i></button>
                                                        </td>
                                                    </tr>
                                                ))} 
                                            </tbody>
                                        </table>

                                        <div class="modal fade" id="modal-default">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h4 class="modal-title">Update Department</h4>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div className='modalOptionsContainer'>
                                                            <form className="form-horizontal" onSubmit={updateDepartment}>
                                                                <div className="card-header">
                                                                    <h3 className="card-title">Department Details</h3>
                                                                </div>
                                                                <table class="table ">
                                                                    <tr>
                                                                        <th>Department</th>
                                                                        <td>
                                                                            <input type="text" className="form-control" value={department} onChange={(event) => setDepartment(event.target.value)} placeholder="...." />
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <th>Division</th>
                                                                        <td>
                                                                            <Select
                                                                                placeholder={division}
                                                                                onChange={(event) => setDivision(event.value)}
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
                                                                <p className="has-text-centered has-text-danger">{msg}</p>

                                                                <div class="modal-footer justify-content-between">
                                                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                                    <button type="submit" class="btn btn-danger">Save changes</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" id="modal-deletediv">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h4 class="modal-title">Delete Department</h4>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div className='modalOptionsContainer'>
                                                            <div className="card-header">
                                                                <h3 className="card-title">Are you sure you want to delete this Department?</h3>
                                                            </div>
                                                            <table class="table ">
                                                                <tr>
                                                                    <th id="th1">Department</th>
                                                                    <td>{department}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th id="th1">Division</th>
                                                                    <td>{division}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th id="th1">Dev Title</th>
                                                                    <td>{devTitle}</td>
                                                                </tr>
                                                            </table>
                                                            <div class="modal-footer justify-content-between">
                                                                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                                                <button type="button" class="btn btn-danger" onClick={deleteDepartment} data-dismiss="modal">Delete</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p>
                                        Showing {rows ? page + 1 : 0} of {pages} pages from {rows} records
                                    </p>
                                    <p className="has-text-centered has-text-danger">{message}</p>
                                    <nav
                                        className="pagination is-centered"
                                        key={rows}
                                        role="navigation"
                                        aria-label="pagination"
                                    >
                                    <ReactPaginate
                                        previousLabel={"< Prev"}
                                        nextLabel={"Next >"}
                                        pageCount={Math.min(10, pages)}
                                        onPageChange={changePage}
                                        containerClassName={"pagination-list"}
                                        pageLinkClassName={"pagination-link"}
                                        previousLinkClassName={"pagination-previous"}
                                        nextLinkClassName={"pagination-next"}
                                        activeLinkClassName={"pagination-link is-current"}
                                        disabledLinkClassName={"pagination-link is-disabled"}
                                    />
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeptManagement