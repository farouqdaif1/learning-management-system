import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
const MobileSidebar = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white"></SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
