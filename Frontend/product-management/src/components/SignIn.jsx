import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {fetchUsersAsync} from "../redux/actions/users";
import Products from './Products/Products'
import { useNavigate } from "react-router-dom";

const SignIn  = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        user: { cur_user },
      } = useSelector((state) => state);
    console.log("cur_user ",cur_user)

    useEffect(() => {
        if (cur_user) {
          navigate("/products");
        }
      }, [cur_user]);

    if(cur_user) {
        return <Products />
    }

    const handleSubmit  = async (e) => {
        e.preventDefault()
        try {
            await dispatch(fetchUsersAsync({ email, password }));
        } catch (e) {
            setError(e.message);
        }
    }

    return(
        <div>
            <div>Sign in to your account</div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Email
                        <input
                        id="email"
                        type="email"
                        value= {email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div>
                    <label> Password
                        <input id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default SignIn ;
