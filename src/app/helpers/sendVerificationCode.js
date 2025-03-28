import axios from 'axios'

const sendVerificationCode = async (phone, otp) => {
    const API_KEY = process.env.FAST2SMS_API_KEY
    const url = `https://www.fast2sms.com/dev/bulkV2`
    
    try {
        const response = await axios.get(url, {
            params: {
                authorization: API_KEY,
                route: 'otp',
                variables_values: otp,
                flash: 0,
                numbers: phone
            }
        })
        return response.data
    } catch (error) {
        return error.response?.data || { return: false, message: 'Failed to send OTP' }
    }
}

export default sendVerificationCode
