import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinksProps {
    href: string;
    label: string;
}

const NavLinks = ({ href, label }: LinksProps) => {

    const pathname = usePathname();
    
    return (
        <li className={`${pathname == href ? " bg-solar-orange-middle shadow-md" : "  shadow hover:shadow-md"} mx-2 border border-solar-gray-middle transition-opacity ease-in duration-400 opacity-100 hover:opacity-80 hover:bg-solar-orange-middle`}>
            <Link
                className={`${pathname === href ? "text-solar-blue-dark" : "text-solar-gray-light"} drop-shadow-md text-sm uppercase font-semibold w-56 h-8 flex items-center justify-center hover:text-solar-blue-dark`}
                href={href}
                title={label}
            >
                <span>{label}</span>
            </Link>
        </li>
    )
}

export default NavLinks;