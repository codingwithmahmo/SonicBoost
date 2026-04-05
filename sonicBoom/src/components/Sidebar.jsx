import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Music, Globe2, Heart, Clock, Music2 } from "lucide-react";

const categories = ["All", "English", "Hindi", "Urdu", "Pashto"];

const categoryIcons = {
  "All": <Globe2 size={18} />,
  "English": <Globe2 size={18} />,
  "Hindi": <Globe2 size={18} />,
  "Urdu": <Globe2 size={18} />,
  "Pashto": <Globe2 size={18} />,
};

const getCategoryLabel = (category) => {
  return category.charAt(0).toUpperCase();
};

function Sidebar({ activeCategory, onCategoryChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button - Only when sidebar is closed */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 hover:bg-gray-100 rounded-lg transition"
          title="Open Menu"
        >
          <ChevronRight size={24} className="text-gray-900" />
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed md:hidden inset-0 bg-black/30 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative left-0 top-0 h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-40
          ${isCollapsed ? "md:w-20" : "md:w-64"}
          ${isMobileOpen ? "translate-x-0 shadow-lg" : "-translate-x-full md:translate-x-0"}
          w-64`}
      >
        {/* Logo + Toggle */}
        <div className={`flex items-center px-5 py-8 ${isCollapsed && "md:justify-center"} justify-between`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
                <Music className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">SonicBoom</h1>
            </div>
          )}

          {isCollapsed && (
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center md:mx-auto">
              <Music className="text-white" size={20} />
            </div>
          )}

          {/* Close on mobile, Collapse on desktop */}
          {!isCollapsed && (
            <button
              onClick={() => {
                const isMd = window.innerWidth >= 768;
                if (isMd) {
                  setIsCollapsed(!isCollapsed);
                } else {
                  setIsMobileOpen(false);
                }
              }}
              className="text-gray-400 hover:text-black transition-colors duration-150"
              title={isMobileOpen ? "Close" : "Collapse"}
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {/* Expand toggle when collapsed - Desktop only */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="hidden md:flex items-center justify-center w-12 h-12 mx-auto mb-6 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-2xl text-gray-600 hover:text-black transition-all duration-200 shadow-sm hover:shadow-md"
            title="Expand"
          >
            <ChevronRight size={20} />
          </button>
        )}

      {/* Languages */}
      <div className="mb-8 px-3">
        {!isCollapsed && (
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-2">
            Languages
          </p>
        )}
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => {
                onCategoryChange(cat);
                setIsMobileOpen(false);
              }}
              title={cat}
              className={`group relative flex items-center gap-3 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200
                ${isCollapsed
                  ? "justify-center px-1 py-1"
                  : "px-3 py-2.5"
                }
                ${activeCategory === cat
                  ? isCollapsed
                    ? "text-black"
                    : "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <span className={`flex items-center justify-center transition-all duration-200 ${
                activeCategory === cat && isCollapsed
                  ? "w-9 h-9 bg-black rounded-lg text-white text-xs font-bold flex items-center justify-center"
                  : isCollapsed
                  ? "w-9 h-9 text-gray-600 group-hover:text-black"
                  : ""
              }`}>
                {isCollapsed ? getCategoryLabel(cat) : categoryIcons[cat]}
              </span>
              {!isCollapsed && cat}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-12 bg-black text-white text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  {cat}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Library */}
      <div className="px-3">
        {!isCollapsed && (
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-2">
            Library
          </p>
        )}
        <ul className="space-y-1">
          {[
            { icon: <Music2 size={18} />, label: "All Songs" },
            { icon: <Heart size={18} />, label: "Favourites" },
            { icon: <Clock size={18} />, label: "Recently Played" },
          ].map((item) => (
            <li
              key={item.label}
              title={item.label}
              className={`flex items-center gap-3 rounded-xl cursor-pointer text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all duration-200
                ${isCollapsed
                  ? "justify-center px-1 py-1"
                  : "px-3 py-2.5"
                }`}
            >
              {item.icon}
              {!isCollapsed && item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom User */}
      {!isCollapsed && (
        <div className="mt-auto px-5 pt-6 pb-8 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
              👤
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Mahmood</p>
              <p className="text-xs text-gray-400">Free Plan</p>
            </div>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="mt-auto pb-8 flex justify-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl flex items-center justify-center text-base hover:shadow-md transition-shadow duration-200">
            👤
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Sidebar;