import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import { createContext, useEffect, useReducer } from 'react';
import userReducer from './reducers/userReducer';
import DashBoard from './components/DashBoard'
import axios from './axios/axios';
import CreateQuestion from './components/CreateQuestion';

export const UserContext = createContext()

function App() {
  const [userState,userDispatch] = useReducer(userReducer,{user:{}})
  console.log(userState)

  useEffect(()=>{
    (async()=>{
      const userData = await axios.get('/api/getprofile',{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
      })
      userDispatch({type:'LOGIN',payload:userData.data})
    })()
  },[])

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{userState,userDispatch}}>
          <h1>Quiz App</h1>
          <NavBar/>
          <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<DashBoard/>}/>
            <Route path='/createquestion' element={<CreateQuestion/>}/>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}


export default App;
