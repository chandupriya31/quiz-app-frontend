import { useContext, useState } from "react"
import axios from "../axios/axios"
import { UserContext } from "../App"
import { useNavigate } from "react-router-dom"

function Login(){
    const navigate = useNavigate()
    const {userDispatch} = useContext(UserContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [serverErrors,setServerErrors] = useState([])

    const handleLogin = async(e)=>{
        e.preventDefault()
        const formData = {
            email,
            password
        }
        // console.log(formData)
        try{
            const response = await axios.post('/api/user/login',formData)
            localStorage.setItem('token',response.data.token)
            const userData = await axios.get('/api/getprofile',{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            console.log('ud:',userData.data)
            userDispatch({type:'LOGIN',payload:userData.data})
            if(userData.data.role === 'admin') {
                navigate('/createquestion')
            }else{
                navigate('/dashboard')
            }
        }catch(e){
            setServerErrors(e.response.data.errors)
        }
    }

    return (
        <div>
            <h2>Login Page</h2>
            {serverErrors.length>0 && (
                <div>
                    <h4>Errors: </h4>
                    {serverErrors.map((ele,i) =>{
                        return <li key={i} id="regerrors">{ele.msg}</li>
                    })}
                </div>
            )}
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label> <br/>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                /><br/>
                <label htmlFor="password">Password</label> <br/>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                /><br/> 
                <input type="submit" value="login"/>
            </form>
        </div>
    )
}

export default Login