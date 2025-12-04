

import { getMyPurchasedCourses } from "@/actions/user/getMyPurchasedCourses";
import StudentDashboardClient from "@/component/studentdashbaord/StudentDashboardClient";


export default async function StudentDashboardPage() {

    const purchasedCourses = await getMyPurchasedCourses();

    console.log(purchasedCourses.data);
    return (
        <div className="space-y-8">
            
            {/* Greeting */}
            <section>
                <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Continue your learning journey and achieve your goals.
                </p>
            </section>


            {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                purchasedCourses.data && purchasedCourses.data.length > 0 ? purchasedCourses.data.map((course: any) => (
                    <StudentDashboardClient key={course._id} purchasedCourse={course} />
                )) : (
                    <p>You have not purchased any courses yet.</p>
                )       
            }


        </div>
    );
}
