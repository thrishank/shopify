"use client";
import { useState } from "react";
import { britney } from "@/app/fonts";
import { Montserrat } from "next/font/google";
import { Sansita_Swashed } from "next/font/google";
const sasita = Sansita_Swashed({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
import { useAccount, useConnect } from "wagmi";
import StoreModal from "./StoreModal";
import { useRouter } from "next/navigation";
import axios from "axios";

import dynamic from "next/dynamic";
import Indexer from "./indexer";
const Hero = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { connectors, connect, status, error } = useConnect();
  const [copied, setCopied] = useState(false);
  const { address } = useAccount();
  const connector = connectors[0];

  function handleCopyAddress() {
    if (!address) return;
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  const handleVerify = async (shopifyToken: string, publicUrl: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ship`,
        {
          shopifyToken,
          publicUrl,
          address,
        }
      );
      const objectId = response.data._id;
      router.push(`/shop/${objectId}`);
    } catch (error) {
      console.error("Error verifying:", error);
    }
    setShowModal(false);
  };

  return (
    <section className="min-h-screen">
      {showModal && (
        <StoreModal setShowModal={setShowModal} handleVerify={handleVerify} />
      )}

      <div className="custom-hero-gradient min-h-screen scale-x-[-1] flex items-center justify-center">
        <div
          className={`${montserrat.className} text-black scale-x-[-1] flex flex-col items-start pl-6 md:pl-28`}
        >
          <div className="h-[50vh] pb-2 w-full md:w-[700px] flex flex-col justify-end">
            <span className="text-4xl md:text-[60px] leading-[1.2] font-bold">
              <span
                className={`${sasita.className} text-transparent bg-clip-text bg-gradient-to-br from-slate-500 mt-2 to-[#01f141]`}
              >
                ShopifyBased
              </span>
              <br />
              Customers can order your products right within Frames
            </span>
          </div>
          <div className="text-white pt-2 text-4xl md:text-[60px] leading-[1.2] font-bold">
            Shopify <span className={britney.className}>OnChain</span>
          </div>
          <p className="pt-16 pb-8 text-white font-normal text-base w-full md:w-[700px]">
            Get a frame link from the product page and share it with your
            customers to order your products right within Frames with Rewards{" "}
            <span className={britney.className}>Onchain</span>
          </p>
          <div className="flex flex-row w-auto gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-3 bg-slate-300 hover:bg-indigo-600 rounded text-base font-semibold shadow-md transition duration-300 ease-in-out"
            >
              Get Started
            </button>
            {address ? (
              <div className="text-center text-xl">
                <button
                  onClick={handleCopyAddress}
                  className="px-5 py-3 bg-blue-500 hover:bg-violet-800 text-white font-bold rounded-lg shadow-md flex items-center gap-2 transition duration-300 ease-in-out"
                >
                  <span>{`${address.slice(0, 4)}...${address.slice(
                    address.length - 4,
                    address.length
                  )}`}</span>
                  <span className="text-[10px] hover:cursor-pointer">
                    {copied ? (
                      <img src="/tick.svg"></img>
                    ) : (
                      <img src="/copy.svg"></img>
                    )}
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector })}
                className="px-5 py-3 rounded-md bg-white text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition duration-300 ease-in-out"
              >
                Log In
              </button>
            )}
          </div>
          <div className="mt-8 text-blue-500">
            Chat with our indexer
            <Indexer />
          </div>
        </div>
      </div>
    </section>
  );
};
// export default Hero;
export default dynamic(() => Promise.resolve(Hero), { ssr: false });
