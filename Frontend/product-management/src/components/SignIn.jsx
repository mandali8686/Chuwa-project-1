import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {fetchUsersAsync} from "../redux/actions/users";
import Products from './Products/Products'

const SignIn  = ({user}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([])
    const dispatch = useDispatch();

    const {
        user: { users, cur_user, status },
        error: { message }
      } = useSelector((state) => state);

    if(cur_user) {
        return <Products />
    }

    const handleSubmit  = async (e) => {
        e.preventDefault()

        try {
              await dispatch(fetchUsersAsync({ email, password }));
            } catch (e) {
              setError(e);
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
