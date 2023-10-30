import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import axios from "../axios/axios"

function Register(){
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [serverErrors,setServerErrors] = useState([])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = {
            username,
            email,
            password
        }
        console.log(formData)
        try{
            const response = await axios.post('/api/user/register',formData)
            console.log(response.data)
            setEmail('')
            setUsername('')
            setPassword('')
            navigate('/login')
        }catch(e){
            setServerErrors(e.response.data.errors)
        }
    }

    return (
        <div>
            <h2>Register Page</h2>
            {serverErrors.length>0 && (
                <div>
                    <h4>Errors: </h4>
                    {serverErrors.map((ele,i) =>{
                        return <li key={i} id="regerrors">{ele.msg}</li>
                    })}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label><br/>
                <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                /><br/>
                <label htmlFor="email">Email</label><br/>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                /><br/>
                <label htmlFor="password">Password</label><br/>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                /><br/>
                <input type="submit" value="register"/>
            </form>
        </div>
    )
}

export default Register