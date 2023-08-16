require('dotenv').config();
// const key = process.env.REACT_APP_PINATA_KEY;
// const secret = process.env.REACT_APP_PINATA_SECRET;
const key = 'bedad0537c534207d793'
const secret = 'f74abb7d19265c170f5a294c2357f272e0b552f546d12eeeda35d06e155b1b88'

const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    try {
        const response = await axios.post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            },
        });

        return {
            success: true,
            pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: error.message,
        };
    }
};