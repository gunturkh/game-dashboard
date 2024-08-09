import{G as g,H as w,c as f,j as s,T as i,J as y,K as b,M as x,Q as c}from"./index.c3bfd613.js";import{u as S}from"./index.esm.a72616c3.js";import{c as k,a as u,o as N}from"./object.a233b247.js";import{u as q}from"./authApiSlice.14be12de.js";const L=k({username:u().required("Username is Required"),password:u().required("Password is Required")}).required(),M=()=>{const[l,{isLoading:m,isError:T,error:v,isSuccess:E}]=q(),a=g(),{register:o,formState:{errors:r},handleSubmit:d}=S({resolver:N(L),mode:"all"}),p=w(),h=async t=>{var n;try{const e=await l(t);if(e.error)throw new Error(e.error.data.message);if(e.data.error)throw new Error(e.data.data.error);if(!e.data.token)throw new Error("Invalid credentials");a(b(t)),a(x((n=e==null?void 0:e.data)==null?void 0:n.token)),p("/dashboard"),console.log("response",e),localStorage.setItem("token",JSON.stringify(e.data.token)),c.success("Login Successful")}catch(e){c.error(e.message)}};return console.log("errors",r),f("form",{onSubmit:d(h),className:"space-y-4 ",children:[s(i,{name:"username",label:"username",defaultValue:"",placeholder:"Type your username here",type:"text",register:o,error:r.username,className:"h-[48px]"}),s(i,{name:"password",label:"password",type:"password",defaultValue:"",placeholder:"Type your password here",register:o,error:r.password,className:"h-[48px]"}),s(y,{type:"submit",text:"Sign in",className:"btn btn-dark block w-full text-center ",isLoading:m})]})};export{M as L};