import { MailtrapClient } from "mailtrap";
import config from "../app/config";




export const mailtrapClient = new MailtrapClient({
	endpoint: config.mailtrap_endpoint ?? "",
	token: config.mailtrap_token ?? "",
});

export const sender = {
	email: "hello@demomailtrap.com",
	name: "Azharul Islam",
};
