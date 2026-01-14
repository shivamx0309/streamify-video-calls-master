import { PaletteIcon } from "lucide-react";
import useThemeStore from "../store/useThemeStore.js";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost btn-circle">
        <PaletteIcon className="h-6 w-6" />
      </button>

      <div className="dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-56 max-h-80 overflow-y-auto">
        {THEMES.map((t) => (
          <button
            key={t.name} // ✅ unique string
            className={`btn btn-sm w-full mb-1 flex justify-between ${
              theme === t.name ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setTheme(t.name)} // ✅ store only string
          >
            <span>{t.label}</span>

            {/* color preview dots */}
            <span className="flex gap-1">
              {t.colors.map((color, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
