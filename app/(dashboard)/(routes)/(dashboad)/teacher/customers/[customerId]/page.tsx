import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import CourseCardInfo from "./_components/course-card-info";
import DataCard from "./_components/data-card";
import NewPurchases from "./_components/new-purches";
import DeleteCustomer from "./_components/delete.-customers";

const CustomerPage = async ({ params }: { params: { customerId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const customer = await db.paymobCustomer.findFirst({
    where: {
      id: params.customerId,
    },
  });
  if (!customer) {
    return redirect("/");
  }
  const purchases = await db.purchase.findMany({
    where: {
      userId: customer.userId,
    },
    include: {
      course: true,
    },
  });
  const purchasedCourses = purchases.map((purchase) => purchase.courseId);

  return (
    <div className="p-6">
      <DeleteCustomer customerId={params.customerId} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label={"الاسم"}
          value={customer.userName}
          shouldFormat={false}
        />
        <DataCard
          label={"البريد الالكتروني"}
          value={customer.userEmail}
          shouldFormat={false}
        />
        <DataCard
          label={"مجموع الكورسات المشترك فيها "}
          value={customer.totalCourses ?? 0}
          shouldFormat={false}
        />
        <DataCard
          label={"محموع المشتريات "}
          value={customer.totalPurchases}
          shouldFormat={true}
        />
      </div>
      <div>
        <h1 className="text-center text-4xl font-bold text-gold">
          الاشتراك في مسار جديد
        </h1>
        <NewPurchases
          name={customer.userName}
          email={customer.userEmail}
          purchasedCourses={purchasedCourses}
        />
      </div>
      <div className="p-4">
        <h1 className="text-center text-4xl font-bold text-gold">
          المسارات المشترك بها
        </h1>
        <div className="p-4 grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-4 mb-4 r">
          {purchases.map((purchase) => (
            <CourseCardInfo
              key={purchase.course.id}
              id={purchase.id}
              title={purchase.course.title}
              imageUrl={purchase.course.imageUrl!}
              price={purchase.course.price!}
              ownerId={purchase.course.userId}
              currentUserId={userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
