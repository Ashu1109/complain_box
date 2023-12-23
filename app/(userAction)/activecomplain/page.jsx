"use client";
import React, { useEffect, useState } from "react";
import BottomNavbar from "../../Components/BottomNavbar";
import Card from "../../Components/CardComponent";
import Loader from "../../Loader";
import axios from "axios";
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [activeComplain, setActiveComplain] = useState([]);
  const handleLoad = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/activecomplain");
      const data = await res.data;
      setActiveComplain(data.activeComplain);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="mb-24 w-full">
        <div className="px-10 text-xl font-semibold text-slate-500">
          Active Complain
        </div>
        {activeComplain && activeComplain.length < 1 ? (
          <div className="min-h-[70vh] w-full flex justify-center items-center">
            <div className=" text-lg font-semibold">No Active Complain</div>
          </div>
        ) : (
          <div className="w-[99%] m-auto flex flex-wrap ">
            {activeComplain &&
              activeComplain.map((complain) => {
                return (
                  <Card
                    key={complain._id}
                    title={complain.title}
                    discription={complain.discription}
                    catogory={complain.category}
                    src={complain.image.url}
                    status={complain.status}
                    date={complain.updatedAt.split("T")[0]}
                    time={complain.updatedAt.split("T")[1].split(".")[0]}
                  />
                );
              })}
          </div>
        )}
        <div className="w-full flex justify-center">
          <BottomNavbar />
        </div>
      </div>
    </>
  );
};

export default Page;
