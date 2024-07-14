import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const NavBarHome = () => {
  const { userId } = auth();
  return (
    <nav className="font-Almarai p-4 w-[100%]  mb-3 flex flex-row justify-center items-center">
      <div className="w-auto md:w-[90%] flex justify-between items-center  space-x-3">
        {!userId ? (
          <Link href="/sign-in">
            <Button className="bg-gradient-to-l from-gradient-2 to-gradient-3 font-medium text-lg hover:bg-gold text text-black">
              تسجيل الدخول
            </Button>
          </Link>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
        <Link
          href="#contact-us"
          className="hidden md:flex font-bold text-lg text-gray hover:text-gold-foreground"
        >
          تواصل معانا
        </Link>
        <Link
          href="/search"
          className="hidden md:flex font-bold text-lg text-gray hover:text-gold-foreground"
        >
          مسارات التعلم
        </Link>
        <div className="w-auto flex justify-between items-center">
          <Image height={200} width={200} alt="logo" src="/logo.webp" />
        </div>
      </div>
    </nav>
  );
};

export default NavBarHome;
