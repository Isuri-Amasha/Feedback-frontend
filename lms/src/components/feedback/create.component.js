import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import Swal from "sweetalert2";
import { Rating } from 'react-simple-star-rating'


export default function Create() {
    const [rating, setRating] = useState(0);
    const [course, setCourse] = useState('');
    const [student, setStudent] = useState('');
    const [feedback, setFeedback] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    // const postData = () => {
    //     console.log(firstName);
    //     console.log(lastName);
    //     console.log(checkbox);
    // }

    const handleRating = (rate) => {
        setRating(rate)
        // Some logic
      }

    const postData = () => {
        const feedbacks = {
            course: course,
            student: student,
            rating:rating,
            feedback: feedback
        }

        console.log(feedbacks);

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
                    iconColor: '#60e004'
                })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error in adding!',
                    background: '#fff',
                    confirmButtonColor: '#333533',
                    iconColor: '#e00404'
                })
            }
        })

    }



    return (
        <div className="flex flex-col px-5 pt-2 ">
            {/* <Form className="create-form">
                <Form.Field>
                    <label>Course</label>
                    <input placeholder='First Name' onChange={(e) => setCourse(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Student</label>
                    <input placeholder='Last Name' onChange={(e) => setStudent(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Feedback</label>
                    <input placeholder='Last Name' onChange={(e) => setFeedback(e.target.value)} />
                </Form.Field>
<Form.Field>
<div className='flex'>
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
      />{rating}</div>
      
      </Form.Field>
               
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form> */}


<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' >
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase'>
                                                Add Feedback
                                            </p>
                                           
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Course</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control "
                                                        // value={this.state.course}
                                                        onChange={(e) => setCourse(e.target.value)}
                                                    />
                                                    {/* <p className="validateMsg">{this.state.feedbackError}</p> */}
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Student</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        // value={this.state.student}
                                                        onChange={(e) => setStudent(e.target.value)}
                                                    />
                                                    
                                                    {/* <p className="validateMsg">{this.state.userContactError}</p> */}
                                           
                                                </div>
                                                <p/>

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
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Feedback</label>
                                                    <textarea type="text"
                                                        required
                                                        className="form-control"
                                                        // value={this.state.feedback}
                                                        onChange={(e) => setFeedback(e.target.value)}
                                                    />
                                                    
                                                    {/* <p className="validateMsg">{this.state.empIDError}</p> */}
                                                   
                                                </div>
                                                
                                          
                                           

                                            <p/>
                                            <div className="text-center align-middle form-group">
                                            <Button onClick={postData} type='submit'>Submit</Button>
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