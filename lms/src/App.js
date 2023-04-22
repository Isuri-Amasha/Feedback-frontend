import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/navbar.component";

import AddFeedback from './components/feedback/add-feedback.component';
import FeedbackList from './components/feedback/feedback-list.component.js.js';
import EditFeedback from './components/feedback/edit-feedback.component';
import FeedbackListStudent from './components/feedback/feedback-list-student.component';
import FeedbackListAdmin from './components/feedback/feedback-list-admin.component';
import AddResponse from './components/feedback/add-response.component';


function App() {
  return (
    
    <div>
      <Navbar />
    
      <Router>
       

        <Routes>

        <Route exact path="/addFeedback" element={<AddFeedback/> } />
        <Route exact path="/listFeedback" element={<FeedbackList/> } />
        <Route exact path="/updateFeedback" element={<EditFeedback/> } />
        <Route exact path="/myFeedback" element={<FeedbackListStudent/> } />
        <Route exact path="/adFeedback" element={<FeedbackListAdmin/> } />
        <Route exact path="/addResponse" element={<AddResponse/> } />

        <Route exact path="/nav" element={Navbar } />
     

          
          
        </Routes>
      </Router>

    </div>
  );

}

export default App;
