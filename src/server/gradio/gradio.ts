import "./shim";

import { API_ENDPOINT } from "$env/static/private";
import { client } from "@gradio/client";

async function Gradio() {
	const gradio = await client(API_ENDPOINT, {});
	const api_info = await gradio.view_api();
	for (const endpoint in api_info.named_endpoints) {
		const endpoint_info = api_info.named_endpoints[endpoint];
		console.info(endpoint, endpoint_info);
	}
	return gradio;
}

const gradio = await Gradio();

export default gradio;
