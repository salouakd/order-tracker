import { defineEventHandler, readBody } from 'h3';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = twilio(accountSid, authToken);


async function sendSMS() {
    try {
        const message = await client.messages.create({
            body: 'New order received',
            from: '+12404665161',
            to: '+212603033551'  
        });
        console.log('SMS sent:', message.sid);
        return message.sid;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error; 
    }
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    console.log('Webhook processed:', body);

        await sendSMS();
});
