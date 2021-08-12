import React, { useEffect, useContext } from "react";
import {useHistory} from "react-router-dom";

import {userContext} from "../../../App";

const Logout = () =>{

    const {state, dispatch} = useContext(userContext);

    const history = useHistory();

    useEffect(()=>{
        fetch( "http://localhost:3001/api/student/logout", {
            method:"GET", 
            headers:{
                Accept:"appllication/json",
                "Content-Type" : "application/json"
            },
            credentials:"include"
        }).then((res)=>{
            
            dispatch({type:"USER", payload:false});
            history.push('/studentsignin', {replace:true});
            if(!res.status === 200)
            {
                const error = new Error(res.error);
                throw  error;
            }
        }).catch((err)=>{
            console.log(err);
        })
    })



    return(
        <>
        <h1></h1>
        </>
    )
}

export default Logout;