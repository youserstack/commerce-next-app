export default function logError(error: any) {
  if (!error.config) return console.log("No error configuration...");

  const { url } = error.config;
  const { status, statusText, data } = error.response;
  // const Authorization = error.response.config.headers.Authorization;
  console.group(url, " : ", status, statusText);
  console.log(data);
  console.groupEnd();
}
