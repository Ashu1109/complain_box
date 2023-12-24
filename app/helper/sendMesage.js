const accountSid = process.env.Account_SID;
const authToken = process.env.Auth_Token;
import twilio from "twilio";
export async function sendMessage(flatno, title, complain) {
  try {
    const client = twilio(accountSid, authToken);
    const message = `\nNew complain\nFlat-no:${flatno}\nTitle:${title}\nComplain:${complain}`;
    const res = await client.messages.create({
      body: message,
      from: "+12818452668",
      to: "+918210510822",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
