import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import './bookList.css';
import {FiEdit} from 'react-icons/fi';
import { FcSearch } from "react-icons/fc";
import { GrNext,GrPrevious } from "react-icons/gr";
import {AiOutlineSortDescending,AiOutlineSortAscending} from 'react-icons/ai';
import BookForm from "./bookForm";

const client = axios.create({
  baseURL: "http://68.178.162.203:8080/application-test-v1.1/books" 
});

const BookList = () => {
    const [search,setSearch] = useState(''); 
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [sort,setSort] = useState('ASC');   
    const [searchClick,setSearchClick] = useState(false);    
    const [posts, setPosts] = useState([]);
    const [isEdit,setEdit] = useState([-1,false]);

    useEffect(() => {
    client.get(search!==''?`?title=${search}&DIR=${sort}&page=${page}`:`?DIR=${sort}&page=${page}`).then((response) => {
        setTotal(response.data.pagination.totalElements);
        setPosts(response.data.data);
    });
    }, [searchClick,sort,page]);
    const handleEdit=(event,index)=>{
        setEdit([index,true]);
    }
    return(
        <center>
            <div className="search-bar">
                <input className="field" type="text" placeholder="Search the book by Title" name="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <FcSearch className="icon" onClick={(event)=>setSearchClick(!searchClick)}/>
                {sort==="ASC"?<AiOutlineSortAscending className="sort-style" name="sort" onClick={(e)=>setSort("DESC")}/>:
                <AiOutlineSortDescending className="sort-style" name="sort" onClick={(e)=>setSort("ASC")}/>}
            </div>
            <div>
                {isEdit[1]?<BookForm value={posts[isEdit[0]]}/>:<BookForm/>}
            </div>
            <div className="outside">
                <table className="table-style">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Country</th>
                            <th>Language</th>
                            <th>Link</th>
                            <th>Pages</th>
                            <th>Year</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts?.map((value,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{value.title}</td>
                                    <td>{value.author}</td>
                                    <td>{value.country}</td>
                                    <td>{value.language}</td>
                                    <td>{value.link}</td>
                                    <td>{value.pages}</td>
                                    <td>{value.year}</td>
                                    <td><FiEdit className="edit" onClick={(event)=>handleEdit(event,index)}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot className="pagination">
                        {page<=1?<></>:<GrPrevious className="page-button" onClick={(e)=>setPage(page-1)}/>}Page:{page}{page<=(total%25)?
                        <GrNext className="page-button" onClick={(e)=>setPage(page+1)}/>:<></>}
                    </tfoot>
                </table>
            </div>
        </center>
    )
}
export default BookList;