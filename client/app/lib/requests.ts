import { login } from "../utils/login";
import { register } from "../utils/signup";

const server:string|undefined=process.env.EXPRESS_SERVER;

   export async function postLogin(data:login){
    return fetch(`${server}/api/users/login`,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
          'Content-Type':'application/json'
      }
    });
  }
  
  export async function postSignUp(data:register){
    return fetch(`${server}/api/users/register`,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
          'Content-Type':'application/json'
      }
    });
  }

  export async function postQuery(data:string){
    console.log("Question Asked");
    return fetch(`http://localhost:11434/api/generate`,{
      method:'POST',
      body:JSON.stringify({
        model: "llama2",
        prompt:`${data}`,
      }),
      headers:{
          'Content-Type':'application/json'
      }
    });
  }