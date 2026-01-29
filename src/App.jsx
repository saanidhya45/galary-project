import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [index, setindex] = useState(1);
  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=30`,
    );
    setData(response.data);
    console.log(data);
  };
  useEffect(() => {
    getData();
  }, [index]);
  let showData = <h3 className="text-grey-400">no data available</h3>;
  showData = data.map((value, index) => {
    return (
      <div key={index}>
        <a href={value.url} target="_blank">
          <div className=" h-40 w-44 bg-white rounded overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={value.download_url}
              alt=""
            />
          </div>
          <h1 className="">{value.author}</h1>
        </a>
      </div>
    );
  });

  return (
    <div className="h-screen bg-black text-white  overflow-auto p-10">
      <div className="flex flex-wrap gap-5 px-3 py-4">{showData}</div>
      <div className="flex gap-10 justify-center items-center">
        <button
        onClick={()=>{
          if(index > 1){
            setindex(index-1);
            setData([])
          }
        }} 
        style={{opacity:index==1 ? 0.4 : 1}}
        className="bg-amber-400 px-4 px-2 text-xl active:scale-80 font-bold rounded mt-3 cursor-pointer">
          prev
        </button>
        <button
        onClick={()=>{
          setindex(index+1);
          setData([])
        }}
          className="bg-amber-400 px-4 px-2 text-xl active:scale-80 font-bold rounded mt-3 cursor-pointer">
          next
        </button>
      </div>
    </div>
  );
}

export default App;
