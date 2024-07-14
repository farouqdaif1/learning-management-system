import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" font-Almarai bg-brown w-[100%] h-[290px] flex flex-col  items-center justify-center text-sm ">
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
          <span className="text-white font-medium  text-sm">تواصل معنا</span>
          <ul className="space-y-5">
            <li className=" flex text-white font-medium justify-between text-right text-sm">
              <p>
                ش مصطفي اسماعيل ( مجمع الكليات ) برج
                <br />
                الصفوة الدور الثاني- الازاريطة - الاسكندرية
              </p>
              <MapPin className="text-white" />
            </li>
            <li className=" flex text-white font-medium justify-between">
              <p>+201272731495</p>
              <Phone className="text-white" />
            </li>
            <li className=" flex text-white font-medium justify-between">
              <p> info@international-justice.com</p>
              <Mail className="text-white" />
            </li>
          </ul>
        </div>
        <div className="w-[35%] md:w-auto">
          <Link href="/home">
            <Image height={160} width={160} alt="logo" src="/square.webp" />;
          </Link>
        </div>
      </div>
      <p className="text-white font-medium  text-sm text-center mb-2 mt-2">
        شركة العدل الدولية التي تم تأسيسها بسجل شركات المحاماه بالنقابه العامه
        تحت رقم (١٨) وفقا لقرار وزير العدل رقم ٤٩٢٠
      </p>
    </footer>
  );
};

export default Footer;
