import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import Swal from "sweetalert2";
import { Rating } from 'react-simple-star-rating'



export default function AddFeedback() {
    const [rating, setRating] = useState(0);
    const [course, setCourse] = useState('');
    const [student, setStudent] = useState('');
    const [feedback, setFeedback] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const handleRating = (rate) => {
        setRating(rate)
        // Some logic
    }

    const postData = () => {
        const feedbacks = {
            course: course,
            student: student,
            rating: rating,
            feedback: feedback
        }

        console.log(feedbacks);

        if(course.length < 3){
            Swal.fire({
                icon: 'warning',
                title: 'Attention',
                text: 'Course Name is too short!!',
                background: '#fff',
                confirmButtonColor: '#eb4034',
                confirmButton:true,
                iconColor: '#60e004',
                closeOnConfirm: true,
                
            })
            

        }else if(student.length < 3){
            Swal.fire({
                icon: 'warning',
                title: 'Attention',
                text: 'Student Name is too short!!',
                background: '#fff',
                confirmButtonColor: '#eb4034',
                confirmButton:true,
                iconColor: '#60e004',
                closeOnConfirm: false,
                timer:2800000
            })
            
        }else if(rating <= 0 || rating >5){
            Swal.fire({
                icon: 'warning',
                title: 'Attention',
                text: 'Invalid Rating Value!!',
                background: '#fff',
                confirmButtonColor: '#eb4034',
                confirmButton:true,
                iconColor: '#60e004',
                closeOnConfirm: false,
                timer:2800000
            })
        }
        else if(feedback.length <= 5){
            Swal.fire({
                icon: 'warning',
                title: 'Attention',
                text: 'Feedback can not be shorter than 5 characters!!',
                background: '#fff',
                confirmButtonColor: '#eb4034',
                confirmButton:true,
                iconColor: '#60e004',
                closeOnConfirm: false,
                timer:2800000
            })
        }else{
        axios.post('http://localhost:5000/feedback/',
            feedbacks,

        ).then(res => {

            console.log(res);

            if (res.status === 200) {
                // this.clearData();
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'Feedback has been added!!',
                    background: '#fff',
                    confirmButtonColor: '#333533',
                    iconColor: '#60e004',
                    timer:2800000
                });



            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error in adding!',
                    background: '#fff',
                    confirmButtonColor: '#333533',
                    iconColor: '#e00404',
                    timer:2800000
                })

            }



        })
    }


    }



    return (
        <div className="flex flex-col px-5 pt-2 ">

            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className='items-center overflow-hidden'>
                        <div className=''>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' >
                                    <div class="">
                                        <p className='text-4xl font-semibold text-black uppercase'>Add Feedback</p>
                                        <div class="">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Course</label>
                                            <select
                                                type="text"
                                                required
                                                className="form-control "
                                                onChange={(e) => setCourse(e.target.value)}
                                                
                                            >
                                                 <option>Select From Here</option>
                                                <option>Artifical Intelligence</option>
                                                <option>Software Architecture</option>
                                                <option>Database Structures</option>
                                                <option>Distributed Systems</option>
                                                <option>Mobile Application Development</option>
                                               
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Student</label>
                                            <input
                                                type="text"
                                                required
                                                className="form-control"
                                                onChange={(e) => setStudent(e.target.value)}
                                            />

                                        </div><p />

                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Rate Here</label>

                                                <Rating

                                                    onClick={handleRating}
                                                    ratingValue={rating}
                                                    size={30}
                                                    label
                                                    vertical

                                                    transition
                                                    fillColor='orange'
                                                    emptyColor='gray'
                                                // Will remove the inline style if applied
                                                />{rating}

                                                {/* <p className="validateMsg">{this.state.userContactError}</p> */}

                                            </div>
                                            <div class="">
                                                <label className='block  mb-2 text-lg font-medium text-gray-900 dark:text-white' >Feedback</label>
                                                <textarea type="text"
                                                    required
                                                    className="h-40 form-control"
                                                    onChange={(e) => setFeedback(e.target.value)}
                                                />
                                                {/* <p className="validateMsg">{this.state.empIDError}</p> */}
                                            </div>
                                        </div><p />

                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Feedback" onClick={postData} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}