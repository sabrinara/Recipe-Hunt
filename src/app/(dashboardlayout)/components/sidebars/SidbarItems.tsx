import { clsx } from "clsx";
import NextLink from "next/link";
import { useSidebarContext } from "../../layout/layout-context";
interface Props {
    title: string;
    icon: React.ReactNode;
    isActive?: boolean;
    href?: string;
  }
const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const {  setCollapsed } = useSidebarContext();
    const handleClick = () => {
        if (window.innerWidth < 768) {
          setCollapsed();
        }
      };
 
    return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? " bg-gradient-to-tr from-neutral-100 via-red-300 to-[#E10101]  dark:bg-gradient-to-tr dark:from-neutral-900 dark:via-red-800 dark:to-[#E10101]  font-medium"
            : "hover:bg-default-100",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        {icon}
        <span className="text-default-900">{title}</span>
      </div>
    </NextLink>
  );
};

export default SidebarItem;