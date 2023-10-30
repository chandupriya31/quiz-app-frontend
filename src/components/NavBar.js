import {Link, useNavigate} from 'react-router-dom'
import _ from 'lodash'
import { useContext } from 'react'
import { UserContext } from '../App'

function NavBar(){
    const navigate = useNavigate()
    const {userState,userDispatch} = useContext(UserContext)

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        userDispatch({type:'LOGOUT'})
        navigate('/')
    }

    return (
        <div>
            <nav>
                <li><Link to="/">Home</Link></li>
                {_.isEmpty(userState.user) ? (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ):(
                    <>
                        {userState.user.role === 'admin' && (
                            <li><Link to='/createquestion'>Add Question</Link></li>
                        )}
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/" onClick={handleLogout}>Logout</Link></li>                        
                    </>
                )}
                
            </nav>
        </div>
    )
}

export default NavBar