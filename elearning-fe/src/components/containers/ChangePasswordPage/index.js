import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useNotification} from "../../../context/NotificationProvider";
import {changePassword} from "../../../services/Routes";
import {Request} from "../../../services/Request";


export const ChangePasswordPage = () => {


    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");
    const [success, setSuccess] = useState(true);

    let navigate = useNavigate();

    const dispatch = useNotification();

    const handleNewNotification = (status, message) => {
        dispatch({
            type: status,
            message: message,
        })
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const pathname = window.location.pathname;

        const token = pathname.substring(pathname.lastIndexOf('/')+1)
        console.log(token)

        if(pw1 === pw2) {
            setSuccess(true);
            const data ={
                "password":pw1
            }


            Request(changePassword+token, "PUT", data)
                .then(res => {
                    if(res.status=== 200){
                        handleNewNotification("SUCCESS","Successfully changed password")
                        navigate("/login")
                    }
                    else{
                        handleNewNotification("ERROR","Time for chaning password expired")
                    }
                })
                .catch(err => {
                    handleNewNotification("ERROR","Problem with server. Try again later.")
                })
        }
        else setSuccess(false)


    };

    return(
        <div className={"changePasswordWrapper"}>
            <div className={"container-lg"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h3>Reset password</h3>
                        <div className={"form-row mt-3"}>
                            <input className={"form-control"} type={"password"} placeholder={"New password"} value={pw1} onChange={(e) => setPw1(e.target.value)}/>
                        </div>
                        <div className={"form-row mt-3"}>
                            <input className={"form-control"} type={"password"} placeholder={"Repeat new password"} value={pw2} onChange={(e) => setPw2(e.target.value)}/>
                        </div>
                        <div className={`${success===false ? "d-1 text-danger mt-2"  : "d-none"}`}>
                            <p>Password doesn't match</p>
                        </div>
                        <div className={"form-row"}>
                            <button type="submit" className='forgotpasswordbtn mt-4 mb-5 ml-3' onClick={handleSubmit}>Change password</button>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    )
}