import React from 'react'

const TodoFooter = ({ activeCount, clearAll, filter, setFilter }) => {
  return (
    <div className="max-w-full overflow-x-auto flex flex-col sm:flex-row justify-between items-center mt-6 px-4 py-3 border-t bg-gray-50 text-sm text-gray-700 shadow-sm rounded-md">
      
      {/* Aktif görev sayısı */}
      <span className="mb-3 sm:mb-0 font-semibold whitespace-nowrap">
        Görev: {activeCount}
      </span>

      {/* Filtre butonları */}
      <div className="flex flex-wrap gap-2 mb-3 mx-5 sm:mb-0 justify-center sm:justify-start">
        {["all", "active", "completed"].map((item) => {
          const label = item === "all" ? "Tümü" : item === "active" ? "Yapılmamışlar" : "Yapılmışlar";
          const isActive = filter === item;
          return (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-3 py-0.5 rounded-md text-xs font-medium transition 
                ${isActive 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "bg-white text-gray-600 hover:bg-gray-200 hover:text-gray-900"}`
              }
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Tümünü temizle */}
      <button
        onClick={clearAll}
        className="text-red-600 hover:text-red-800 font-semibold transition whitespace-nowrap text-xs px-3 py-1 rounded-md border border-red-600 hover:border-red-800"
      >
        Hepsini Sil
      </button>
    </div>
  )
}

export default TodoFooter
