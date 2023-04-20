import React, { Component,useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { Rating } from 'react-simple-star-rating'
// import Typography from '@material-ui/core/Typography'


export default class EditFeedback extends Component {

    constructor(props) {
        super(props);
        
        // const [rating, setRating] = useState(0)

        this.onChangefeedback = this.onChangefeedback.bind(this);
        this.onChangestudent = this.onChangestudent.bind(this);
        this.onChangecourse = this.onChangecourse.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id:props.fedId,
            course:'',
            student:'',
            feedback: '',
            value:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/feedback/' + this.state.id)
            .then(response => {
                this.setState({
                    course: response.data.course,
                    student: response.data.student,
                    feedback: response.data.feedback

                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangestudent(e) {
        this.setState({
            student: e.target.value
        });
    }

    onChangecourse(e) {
        this.setState({
            course: e.target.value
        });
    }

    onChangefeedback(e) {
        this.setState({
            feedback: e.target.value
        });
    }

    

    onSubmit(e) {
        e.preventDefault();

        const feedbacks = {
            course: this.state.course,
            student: this.state.student,
            feedback: this.state.feedback
        }

        console.log(feedbacks);

        // if(this.state.feedback.length < 4){
        //     this.setState({feedbackError : "Feedback is too short"})
        // }
        // else if(this.state.userContact.length < 5){
        //     this.setState({userContactError : "User is too short"})
        // }
        // else if(this.state.empID.length < 10){
        //     this.setState({empIDError : "Employee ID is too short"})
        // }else{

        axios.put('http://localhost:5000/feedback/' + this.state.id, feedbacks)
            .then(res => {
                console.log(res);

                if (res.status === 200) {
                   
                    this.props.close();

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Feedback has been updated!!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })

                   

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'There was an error updating!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#e00404'
                    })
                }
            })
        // }

    }


    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <div className="formdiv">
                                        <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                           

                                        {/* <Typography component="legend">Controlled</Typography>
<Rating
  name="simple-controlled"
  value={this.state.value}
  onChange={(event, newValue) => {
    // setValue(newValue);
  }}
/> */}
                                            
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Course</label>
                                                    <input type="text"
                                                        // required
                                                        className="form-control"
                                                        value={this.state.course}
                                                        onChange={this.onChangecourse}

                                                    />
                                                    {/* <p className="validateMsg">{this.state.feedbackError}</p> */}
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Student</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.student}
                                                        onChange={this.onChangestudent}
                                                    />
                                                    {/* <p className="validateMsg">{this.state.userContactError}</p> */}
                                                </div>

                                                
                                           
                                           
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Feedback</label>
                                                    <textarea type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.feedback}
                                                        onChange={this.onChangefeedback}
                                                    />
                                                    {/* <p className="validateMsg">{this.state.empIDError}</p> */}
                                                </div>
                                              
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Edit Feedback" />
                                            </div>
                                        </form>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}