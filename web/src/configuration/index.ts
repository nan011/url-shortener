import iConfiguration from "./types";

const configuration: iConfiguration = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
}

export default configuration;