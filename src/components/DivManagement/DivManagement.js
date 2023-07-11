import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import Header from '../Header/Header';
import React, {useState, useEffect} from 'react';
import {FaSearch} from 'react-icons/fa';
import {MdAdd} from 'react-icons/md';
import ModalCreateDiv from './ModalCreateDiv';
import './DivManagement.css';
import {FaPencilAlt} from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';
import ReactPaginate from "react-paginate";

const DivManagement = () => {

    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [message, setMessage] = useState('');
    const [query, setQuery] = useState("");
    const [rows, setRows] = useState(0);
    const [pages, setPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [divisions, setDivisions] = useState([]);
    const [division, setDivision] = useState("");
    const [sub_directorate, setSub_directorate] = useState("Business Solution Management");
    const [idDivision, setIdDivision] = useState('');
    const [msg, setMsg] = useState("");
    const [val, setVal] = useState();

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

    //search division
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

    //update division by admin
    const updateDivision = async (event) =>{
        event.preventDefault();
        console.log(idDivision)
        try{
          await axios.patch(`division/${idDivision}`,{
            division : division,
            sub_directorate : sub_directorate
          });
          refreshPage();
        } catch (error){
            if (error.response) {
              setMsg(error.response.data.msg);
            }
        }
    }

    //delete division by admin
    const deleteDivision = async (event)=>{
        event.preventDefault();
        console.log(idDivision)
        try{
          await axios.delete(`division/${idDivision}`);
          refreshPage();
        } catch (error){
            console.log(error)
        }
    }

    //get division from id to show in detail page
    const getDivisionByID = async(id)=>{
        console.log("division id", id);
        setVal(id)
        setIdDivision(id)
        const response = await axios.get(`/division/${id}`);
        setDivision(response.data.division);
        setSub_directorate(response.data.sub_directorate);
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
                                <h1>Division Management</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                    <li class="breadcrumb-item active">Division Management</li>
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
                                                    <button type="button" className="btn btn-lg btn-danger" data-toggle='modal' data-target='#modal-createDiv'>
                                                        <i className="fas"><MdAdd/> </i>
                                                    </button> 
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div class="modal fade" id="modal-createDiv">
                                   <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Create Division</h4>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <ModalCreateDiv/>
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
                                                    <th className='divdeptmanagement-header'>Division</th>
                                                    <th className='divdeptmanagement-header'>Sub-Directorate</th>
                                                    <th className='divdeptmanagementdel-header'>Detail</th>
                                                    <th className='divdeptmanagementdel-header'>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {divisions.map((division, index) => ( 
                                                    <tr key={division.divisionid}>
                                                        <td>{index + 1}</td>
                                                        <td>{division.division}</td>
                                                        <td>{division.sub_directorate}</td>
                                                        <td>
                                                            <button type="button" class="btn btn-default" onClick={() => getDivisionByID(division.id)} onChange={() => setVal(division.id)} data-toggle="modal" data-target="#modal-default" ><i className="fas"><FaPencilAlt/> </i></button>
                                                        </td>
                                                        <td>
                                                            <button type="button" class="btn btn-default" onClick={() => getDivisionByID(division.id)} data-toggle="modal" data-target="#modal-deletediv"><i className="fas"><AiFillDelete/> </i></button>
                                                        </td>
                                                    </tr>
                                                ))} 
                                            </tbody>
                                        </table>

                                        <div class="modal fade" id="modal-default">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h4 class="modal-title">Update Division</h4>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div className='modalOptionsContainer'>
                                                            <form className="form-horizontal" onSubmit={updateDivision}>
                                                                <div className="card-header">
                                                                    <h3 className="card-title">Division Details</h3>
                                                                </div>
                                                                <table class="table ">
                                                                    <tr>
                                                                        <th>Division Name</th>
                                                                        <td>
                                                                            <input type="text" className="form-control" value={division} onChange={(event) => setDivision(event.target.value)} placeholder="...." />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Sub-Directorate</th>
                                                                        <td>
                                                                            <input type="text" className="form-control" value={sub_directorate} onChange={(event) => setDivision(event.target.value)} placeholder="...." />
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
                                                        <h4 class="modal-title">Delete Division</h4>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div className='modalOptionsContainer'>
                                                            <div className="card-header">
                                                                <h3 className="card-title">Are you sure you want to delete this Division?</h3>
                                                            </div>
                                                            <table class="table ">
                                                                <tr>
                                                                    <th id="th1">Division</th>
                                                                    <td>{division}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th id="th1">Sub-Directorate</th>
                                                                    <td>{sub_directorate}</td>
                                                                </tr>
                                                            </table>
                                                            <div class="modal-footer justify-content-between">
                                                                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                                                <button type="button" class="btn btn-danger" onClick={deleteDivision} data-dismiss="modal">Delete</button>
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

export default DivManagement