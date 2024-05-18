import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const NavBarHome = () => {
  const { userId } = auth();
  return (
    <nav className="p-6 w-[100%] flex flex-row justify-between items-center">
      <div className="w-[95%] flex justify-between items-center">
        {!userId ? (
          <Link href="/sign-in">
            <Button className="bg-gold-foreground font-medium text-lg hover:bg-gold text text-black">
              تسجيل الدخول
            </Button>
          </Link>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
        <div className="w-auto md:w-[40%] flex justify-between items-center">
          <div className="w-auto md:w-[50%] flex justify-between items-center">
            <Link
              href="#contact-us"
              className="hidden md:flex font-medium text-lg text-slate-500 hover:text-gold-foreground"
            >
              تواصل معانا
            </Link>
            <Link
              href="/search"
              className="font-medium text-lg text-slate-500  hover:text-gold-foreground"
            >
              مسارات التعلم
            </Link>
          </div>
          <div className="w-auto flex justify-between items-center">
            <Image height={200} width={200} alt="logo" src="/logo.webp" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarHome;
