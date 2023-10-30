import { useContext } from "react"
import { UserContext } from "../App"

function DashBoard(){
    const {userState} = useContext(UserContext)
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome <b>{userState.user.username}</b></p>
        </div>
    )
}

export default DashBoard