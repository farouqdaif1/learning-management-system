import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const Buyers = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const users = await db.chapterCustomer.findMany({});
  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default Buyers;
