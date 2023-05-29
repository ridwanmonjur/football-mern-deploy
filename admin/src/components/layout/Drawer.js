import { AuthContext } from "@/context/auth";
import Link from "next/link";
import { useContext } from "react";

const links = [
    { href: '/product', label: 'Product' },
    { href: '/cart', label: 'Cart' },
    { href: '/user', label: 'User' },
];

export default function Drawer({
    children
}) {
    const { handleLogout } = useContext(AuthContext);

    return (
        <div className="drawer drawer-mobile max-h-fit h-auto">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content max-h-fit">
                {children}
            </div>
            <div className="drawer-side min-h-screen h-auto z-500 shadow-lg">
                <label htmlFor="my-drawer-2" className="drawer-overlay max-h-fit bg-slate-900" ></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    {
                        links.map(
                            (value) => (
                                <>
                                    <li>
                                        <Link href={value.href}>{value.label}</Link>
                                    </li>
                                </>
                            )
                        )
                    }
                    <li>
                        <a onClick={()=>handleLogout()}>Logout</a>
                    </li>
                </ul>

            </div>
        </div>

        // <div className="drawer">
        //     <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        //     <div className="drawer-side">
        //         {/* <label htmlFor="my-drawer-3" className="drawer-overlay"></label> */}
        //         <ul className="menu p-4 w-80 bg-base-100">
        //             <li>
        //                 <a href={links[0].href}>{links[0].label}</a>
        //             </li>
        //             <li>
        //                 <a onClick={handleLogout} href={links[1].href}>{links[1].label}</a>
        //             </li>
        //         </ul>

        //     </div>
        //     <div className="drawer-content flex flex-col items-center justify-center">

        //         {children}
        //     </div>

        // </div>

    );
}

{/* // <div className="drawer">
        //     <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        //     <div className="drawer-content drawer-overlay z-10">
        //         {/* <label htmlFor="my-drawer-4" className="z-10"></label> */}
        //         {children}
        //     </div>
        //     <div className="drawer-side">
        //         <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        //         <ul className="menu p-4 w-80 bg-base-100 text-base-content z-50">
        //             <li>
        //                 <a href={links[0].href}>{links[0].label}</a>
        //             </li>
        //             <li>
        //                 <a onClick={handleLogout} href={links[1].href}>{links[1].label}</a>
        //             </li>
        //         </ul>
        //     </div>

        // </div> */}