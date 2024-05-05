import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-brown w-[100%] h-[250px] flex flex-row  items-center justify-center">
      <div className="w-[90%] h-[90%] flex flex-row  items-center justify-between ">
        <div className="hidden  md:flex flex-col justify-between items-end w-[35%]">
          <span className="mb-5 text-gold font-bold text-xl">
            مسارات التعلم
          </span>
          <div className="flex flex-row justify-between items-center text-white w-[100%] ">
            <ul className="text-white font-medium flex flex-col justify-between items-end space-y-2">
              <li>كورسات الترجمة القانونية</li>
              <li>كورسات عامة</li>
            </ul>
            <ul className="text-white font-medium space-y-2 ">
              <li>الفرقة الاولي</li>
              <li>الفرقة الثانية</li>
              <li>الفرقة الثالثة </li>
              <li>الفرقة الرابعة </li>
            </ul>
          </div>
        </div>
        <div className=" w-auto  flex flex-col justify-between items-end space-y-5 ">
          <span className="text-white font-medium  text-xl">تواصل معنا</span>
          <ul className="space-y-5">
            <li className=" flex text-white font-medium justify-between">
              <p> 221b Bakerstreet, London, UK</p>
              <MapPin className="text-white" />
            </li>
            <li className=" flex text-white font-medium justify-between">
              <p> +44 812 5893 22</p>
              <Phone className="text-white" />
            </li>
            <li className=" flex text-white font-medium justify-between">
              <p> Contact@tanahairstudio.com</p>
              <Mail className="text-white" />
              <p></p>
            </li>
          </ul>
        </div>
        <div className="w-[30%] md:w-auto">
          <Link href="/home">
            <Image height={160} width={160} alt="logo" src="/square.webp" />;
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
