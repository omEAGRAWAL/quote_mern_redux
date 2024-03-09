import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className=" bg-[rgb(166,180,220)]   text-gray-700 dark:text-gray-200 dark:bg-[rgb(2,11,35)] min-h-screen">
        {children}
      </div>
    </div>
  );
}
