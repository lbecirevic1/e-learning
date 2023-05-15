import {useState} from "react";
import {useNotification} from "../../../context/NotificationProvider";
import {Request} from "../../../services/Request";
import {forgotPassword} from "../../../services/Routes";
import {useNavigate} from "react-router-dom";

export const ForgotPasswordPage = () => {

    let navigate = useNavigate();

    const [formData, updateFormData] = useState("");

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const dispatch = useNotification();

    const handleNewNotification = (status, message) => {
        dispatch({
            type: status,
            message: message,
        })
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const user = {
            email: formData.email,
        };

        return Request(forgotPassword+formData.email,"POST")
            .then(res => {
                if(res && res.status === 200 && res.data !== "Email doesn't exist"){
                    handleNewNotification("SUCCESS","Successfully sent email")
                    navigate("/login")
                }
                else{
                    handleNewNotification("ERROR","Email doesn't exist")
                }
            })
            .catch(err => {
                if(err.message === "Email doesn't exist") handleNewNotification("ERROR","Email doesn't exist")
                else handleNewNotification("ERROR","Problem with server. Try again later.")
            })


    };

    return(
        <div className={"forgotpwwrapper"}>
            <div className={"container-lg"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h3>Get resset password link</h3>
                        <div className={"form-row mt-3 p-2"}>
                            <input className={"form-control "} name="email" type='email'
                                   placeholder="example@domain.com"
                                   value={formData.email}
                                   onChange={handleChange}/>

                        </div>
                        <div className={"form-row text-center"}>
                            <button type="submit" className='forgotpasswordbtn mt-4 mb-5 ml-3' onClick={handleSubmit}>Get reset link</button>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
}