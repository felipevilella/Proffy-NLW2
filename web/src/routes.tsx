import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Lading from './pages/Lading'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm'

function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" exact component={Lading}/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>


        </BrowserRouter>
    )
}

export default Routes;