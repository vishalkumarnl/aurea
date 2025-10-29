import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [data,setData] =useState([]);

  useEffect(() =>{
    fetch("http://localhost:8080/notes").then(res=>res.json()).then(data=>setData(data))
  },[]);

  const goToAbout = () => {
    navigate("/about");
  };

  return (
    <div>
      <h1>Home Page</h1>{
        data?.map(post=>(<li>{post.title}</li>))
      }
      <button onClick={goToAbout}>Go to About</button>
    </div>
  );
}

export default Home;
