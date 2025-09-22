import axios from "axios";

const iaxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users",
});

export default iaxios;
