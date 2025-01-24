import axios from 'axios';

export default async function handler(req, res) {
    try {
        const response = await axios.get('http://localhost:3001/api/setups');
        res.status(200).json(response.data.data);
    } catch (error) {
        console.error('Error fetching setup data:', error);
        res.status(500).json({ error: 'Error fetching setup data' });
    }
}