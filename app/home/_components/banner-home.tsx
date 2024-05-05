import Image from "next/image";

const BannerHome = () => {
  return (
    <div className="flex flex-col justify-center items-center md:h-screen">
      <div
        style={{ backgroundImage: "url('/pattern.webp')" }}
        className="w-[100%] h-[80%] flex flex-col justify-center items-center relative aspect-video rounded-md overflow-hidden"
      >
        <Image
          fill
          className="object-contain"
          src="/banner.webp"
          alt="banner"
        />
      </div>
    </div>
  );
};

export default BannerHome;
