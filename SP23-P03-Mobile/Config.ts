const options = {
    headers: {
      'Accept': 'application/json'
    }
  };
  
  export const BaseUrl =
    process.env.NODE_ENV === "production"
      ? "https://selu383-sp23-p03-g04.azurewebsites.net/"
      : "http://bc9e-2607-fb90-d549-8093-e54c-6f45-e992-9ab.ngrok-free.app";
  
  export const fetchData = async () => {
    const response = await fetch(BaseUrl, options);
    const data = await response.json();
    return data;
  };