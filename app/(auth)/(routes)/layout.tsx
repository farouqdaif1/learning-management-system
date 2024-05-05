import Image from "next/image";
import React from "react";

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-full flex justify-center items-center bg-brown">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>{children}</div>
        <div className="h-[100%] flex flex-col justify-center items-center space-y-5 order-first md:order-last mb-10 md:ml-10">
          <Image src="/logo.webp" width={250} height={250} alt="logo" />
          <h1 className="text-5xl text-white">سجل الأن معانا</h1>
          <p className="text-xl text-gold">سجل بياناتك واكمل تصفحك لموقعنا</p>
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;
