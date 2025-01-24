import axios from 'axios';

export default async function handler(req, res) {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNzY0OTc5MywianRpIjoiZGZmNThiZjEtNmU0Ny00YWY4LWFiMGYtMTU5NmY0ZTg1ZWFhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJmdWxsTmFtZSI6IkFtZW4gQWxsYWggTUVMS0kiLCJ1c2VybmFtZSI6Im1lbGtpYW1lIiwicm9sZXMiOlsidmlld2VyIl19LCJuYmYiOjE3Mzc2NDk3OTMsImNzcmYiOiJiYWYzYjEyOS02YmM2LTRkNDItYTZiOS00MTUwNjI4YzJiMjciLCJleHAiOjE3Mzc2NjA1OTN9.-Qdzt8TNzKUPaaCCL54jP5LsGe8j7QMjuqtBHY_tvHQ';
        const response = await axios.get('http://localhost:3001/api/boards', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        });
        res.status(200).json(response.data.data);
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching board data:', error);
        res.status(500).json({ error: 'Error fetching board data' });
    }
}