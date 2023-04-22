// import React from 'react';
import { Table, Button, Input } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";


export default function FeedbackList() {
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [APIData, setAPIData] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);


    useEffect(() => {

        
        axios.get(`http://localhost:5000/feedback/`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])


    const getData = () => {
        axios.get(`http://localhost:5000/feedback/`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:5000/feedback/${id}`).then(response => {
            console.log(response.status)
            // this.refreshTable();

            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Feedback has been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })

                getData();
            }

            else {
                Swal.fire({
                    icon: 'Unsuccess',
                    title: 'Unsuccessfull',
                    text: "Employee has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }


        })
    }

    const setData = (data) => {

        let { _id, course, student, rating, feedback,response } = data;

        localStorage.setItem('ID', _id);
        localStorage.setItem('Course', course);
        localStorage.setItem('Student', student);
        localStorage.setItem('Rating', rating);
        localStorage.setItem('Feedback', feedback);
        localStorage.setItem('Response', response);
        console.log("List data is" + localStorage.setItem('Student', student));
        console.log("List data is" + localStorage.setItem('Feedbak', feedback));
    }

    
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((data) => {
                return Object.values(data).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }


    const exportFeedbacks = () => {
        console.log("Export PDF")


        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Feedback List Report ";
        const headers = [["Course", "Student", "Ratings", "Feedback","Response"]];

        const fed = APIData.map(
            data => [
                data.course,
                data.student,
                data.rating,
                data.feedback,
                data.response
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: fed
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Feedback-Report.pdf")
    }

    return (
        <div>
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table className=''>

                                    <tr>
                                        <th className='drop-shadow-md'><h1>Feedback List</h1></th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => exportFeedbacks()}>Generate Report</button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    required

                                                    icon='search'
                                                    placeholder='Filter By Course'
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />


                                            </div>

                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>




                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Course</th>
                                            <th className="p-2 tbhead">Student</th>
                                            <th className="p-2 tbhead">Ratings</th>
                                            <th className="p-2 tbhead">Feedback</th>
                                            <th className="p-2 tbhead">Response</th>
                                           
                                        </tr>
                                    </thead>


                                    <tbody>
                                        {searchInput.length > 1 ? (
                                            filteredResults.map((data) => {
                                                if(searchInput == data.course){
                                                return (
                                                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                                        <td className='px-6 py-4'>{data.course}</td>
                                                        <td className='px-6 py-4'>{data.student}</td>
                                                        <td className='px-6 py-4'>{data.rating}</td>
                                                        <td className='px-6 py-4'>{data.feedback}</td>
                                                        <td className='px-6 py-4'>{data.response}</td>
                                                       
                                                    </tr>
                                                )
                                                }
                                            })
                                        ) : (
                                            APIData.map((data) => {
                                               
                                                return (
                                                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                                        <td className='px-6 py-4'>{data.course}</td>
                                                        <td className='px-6 py-4'>{data.student}</td>
                                                        <td className='px-6 py-4'>{data.rating}</td>
                                                        <td className='px-6 py-4'>{data.feedback}</td>
                                                        <td className='px-6 py-4'>{data.response}</td>
                                                        



                                                    </tr>
                                                )
                                                
                                            })
                                        )}
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}