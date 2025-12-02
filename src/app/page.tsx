import PublicNavbar from "@/component/shared/publicComponents/PublicNavbar";

export default function Home() {
  return (
    <div className=" space-y-10">
      {/* Navbar */}
      <PublicNavbar />

      {/* Banner section */}
      <section className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-gray-700">Banner Section</h1>
      </section>

      {/* Instructor section */}
      <section className="w-full h-64 rounded-lg flex gap-4 max-w-7xl mx-auto px-4 py-6">
        <div className="w-3/5 bg-gray-400 flex items-center justify-center rounded-lg">
          <h1 className="text-xl font-semibold text-white">Instructor Section</h1>
        </div>
        <div className="w-2/5 bg-gray-500 flex items-center justify-center rounded-lg max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-xl font-semibold text-white">Instructor Images</h1>
        </div>
      </section>

      {/* Event section */}
      <section className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-gray-700">Event Section</h1>
      </section>

      {/* Courses section */}
      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center"
          >
            <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Course Title {i + 1}
            </h2>
            <p className="text-gray-600 text-center">
              Short description of course {i + 1}.
            </p>
          </div>
        ))}
      </section>

      {/* Reviews section */}
      <section className="w-full h-72 bg-gray-200 rounded-lg flex items-center justify-center max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-gray-700">Reviews Section</h1>
      </section>

      {/* Footer section */}
      <footer className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-gray-700">Footer Section</h1>
      </footer>

    </div>
  );
}
