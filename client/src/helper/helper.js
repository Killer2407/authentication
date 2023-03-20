import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function authenticate(id) {
    try {
        return await axios.post('/api/authenticate', { id })
    }
    catch (err) {
        return { error: "Username dosn't exist" }
    }
}

export async function getUser({ id }) {
    try {
        const { data } = await axios.get(`/api/user/${id}`)
        return { data }

    } catch (error) {
        return { error: "Password dosn't match" }
    }
}

export async function registerUser(credentials) {
    try {
        const { data: { message }, status } = await axios.post(`/api/register`, credentials)
        let { username, email } = credentials;

        if (status === 200) {
            await axios.post('/api/registered', { username, userEmail: email, text: msg })
        }
        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function userLogin({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data })
        }

    } catch (error) {
        return Promise.reject({ error: "Password did not match" })
    }
}

export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateUser/:id', response, { headers: { "Authorization": `Bearer ${token}` } })

        return Promise.resolve({ data })
    }
    catch (error) {
        return Promise.reject({ error: "Could not update!" })
    }
}

export async function generateOTP(username) {
    try{
       const { data: {code}, status} = await axios.get("/api/generateOTP", {params: {username}})

       if(status===200) {
        let {data: {email} } = await getUser({username});
        let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
        await axios.post('/api/registerMail', {username, userEmail: email, text, subject: "Password Recovery OTP "})  
       }
       return Promise.resolve(code)

    } catch(error) {
        return Promise.reject({error})
    }
}

export async function verifyOTP({username, code}) {
    try{
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code}})
        return { data, status }

    } catch(error) {
        return Promise.reject({error})
    }
}

export async function resetPassword({username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password })
        return Promise.resolve({data, status})
    } catch(error) {
        return Promise.reject(error)
    }
}
