import Home from "@/pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br
                    from-sky-200 via-purple-200 to-rose-200
                    text-gray-900 text-gray-900 flex flex-col items-center p-6  ">
      {/* quick sanity banner */}
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        
      </h1>

      {/* main prompt playground */}
      <Home />
    </div>
  );
}
