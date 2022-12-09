import { useState } from 'react'
import { getAuth, updateProfile } from "firebase/auth";


function Account() {
    const auth = getAuth();
    const user = auth.currentUser;

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
    
    async function handleSubmit(e) {
        e.preventDefault();

        if (form.username) {
            updateProfile(auth.currentUser, {
                displayName: form.username
            }).then(() => {
                alert("Username updated!")
            })
            return
        }
    }


    return (
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