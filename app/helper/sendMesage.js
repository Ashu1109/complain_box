const accountSid = "AC444d7701bd5228955327b123acaeed99";
const authToken = "0a3a68b6ab3122429ed852e0bb287cab";
import twilio from "twilio";
export async function sendMessage(flatno, title, complain) {
  const client = twilio(accountSid, authToken);
  try {
    const message = `\nNew complain\nFlat-no:${flatno}\nTitle:${title}\nComplain:${complain}`;
    // const res = await client.messages.create({
    //   body: message,
    //   from: "+12818452668",
    //   to: process.env.TWILIO_NUMBER,
    // });

    const res = await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${process.env.TWILIO_NUMBER}`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
