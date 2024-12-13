import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiActivity } from "react-icons/fi";

const Navbar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/", icon: <FiHome /> },
    { name: "Prediction", href: "/prediction", icon: <FiActivity /> },
  ];

  return (
    <nav className="h-screen w-16 bg-gray-800 text-white flex flex-col items-center py-4 transition-all duration-300 hover:w-56">
      <button className="text-xl mb-4">☰</button>
      <ul className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-700 ${
              pathname === item.href ? "bg-gray-700" : ""
            }`}
          >
            {item.icon}
            <Link href={item.href} className="hidden hover:block">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
