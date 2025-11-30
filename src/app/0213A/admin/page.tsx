// app/admin/page.tsx
export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
      <p className="text-gray-700">Choose a section from the left sidebar.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Add Course</h2>
          <p className="text-gray-600">Create and publish new courses.</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">All Courses</h2>
          <p className="text-gray-600">View and manage all courses.</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Events</h2>
          <p className="text-gray-600">Create and update upcoming events.</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <p className="text-gray-600">View and control user access.</p>
        </div>
      </div>
    </div>
  );
}