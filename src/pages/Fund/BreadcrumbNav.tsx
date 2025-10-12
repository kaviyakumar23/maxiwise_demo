import { Link } from "@tanstack/react-router";
import { fundData } from "./DummyData";

const BreadcrumbNav = () => {
  const { breadcrumb } = fundData;

  return (
    <nav className="hidden lg:block px-6 py-3 bg-[#F1F5F9]">
      <div className="max-w-6xl pl-4">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumb.items.map((item, index) => {
            const isLast = index === breadcrumb.items.length - 1;
            
            return (
              <li key={index} className="flex items-center">
                {!isLast ? (
                  <>
                    <Link
                      to={item.path}
                      className="text-purple font-outfit hover:text-[#7C3AED] transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                    <span className="mx-2 text-purple text-sm font-outfit font-normal">›</span>
                  </>
                ) : (
                  <span className="text-[#666666] font-normal font-outfit text-sm">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default BreadcrumbNav;