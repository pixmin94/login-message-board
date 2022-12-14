import { useEffect, useState } from 'react'
import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import app from "../firebase";
import Spinner from "./Spinner"

function Account() {
    const auth = getAuth(app);
    let [user, setUser] = useState()
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    })

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        })
      }

    useEffect(() => {
        console.log("checking auth state in account")
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
                setLoading(false)
            }
        })
    },[])
    
    async function handleSubmit(e) {
        e.preventDefault();

        if (form.username) {
            updateProfile(auth.currentUser, {
                displayName: form.username
            }).then(() => {
                alert("Username updated!")
                window.location.reload();
            })
            return
        }

        if (form.email) {
            updateEmail(auth.currentUser, form.email).then(() => {
                alert("Email updated!")
                window.location.reload();
            })
            return
        }

        if (form.password) {
            updatePassword(auth.currentUser, form.password).then(() => {
                alert("Password updated!")
                window.location.reload();
            })
            return
        }
    }

    return loading ? (
        <div class ="flex justify-center items-center absolute inset-0 m-auto">
            <Spinner />
        </div>
        ) : (
        <>
        <br/>
         <p class="flex justify-center">Currently logged into {user.email}, {user.displayName} </p>
         <form class="flex flex-col items-center" onSubmit={handleSubmit}>
            <br/>
            <input class="input-box w-1/2" type="text" placeholder="Username" value={form.username} onChange={e => updateForm({username: e.target.value})}/>
            <input class="input-box w-1/2" type="text" placeholder="Email" value={form.email} onChange={e => updateForm({email: e.target.value})}/>
            <input class="input-box w-1/2" type="password" placeholder="Password" value={form.password} onChange={e => updateForm({password: e.target.value})}/>
            <input class="button-navbar w-1/2" type="submit" value="Update Profile" />
         </form>
        </>
    );
}

export default Account;