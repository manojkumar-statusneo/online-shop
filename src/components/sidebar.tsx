import { logOut } from "@/lib/slices/userSlice";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

const section = [
  { name: "Watches", href: "#" },
  { name: "Wallets", href: "#" },
  { name: "Bags", href: "#" },
  { name: "Sunglasses", href: "#" },
  { name: "Hats", href: "#" },
  { name: "Belts", href: "#" },
];
const sideMenuList = [
  { name: "Privacy Policy", href: "#" },
  { name: "Refund Policy", href: "#" },
  { name: "Terms & Conditions", href: "#" },
];
const Sidebar = ({ open, onClose }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user);
  console.log("user", user);
  const onClickSideBarItem = (link: string) => {
    if (link == "logout") {
      dispatch(logOut());
    } else if (link === "myorder") {
      router.push("/myorder");
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="sm:relative z-50 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12">
              <div className="flex px-4 pb-2 pt-5 justify-end">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-slate-900"
                  onClick={onClose}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* Links */}
              {/* <div className="space-y-6 border-b border-gray-200 px-4 pb-4">
                <div className="flow-root text-center">
                  <p className="text-lg"> Account</p>
                </div>
                {Object.keys(user).length > 0 ? (
                  <div className="flow-root text-center">
                    <p>
                      Welcome{" "}
                      <span className="text-blue-700">{user?.name}</span>{" "}
                    </p>
                    <p>{user?.email}</p>
                  </div>
                ) : (
                  <div className="flow-root text-center">
                    <p>
                      Click here to{" "}
                      <Link href="/login">
                        <span className="text-blue-700">Sign in</span>{" "}
                      </Link>
                    </p>
                  </div>
                )}
              </div> */}
              {/* <div className="space-y-6 px-4 py-6">
                <div className="flow-root ">
                  <p className="text-lg"> Shop by Category</p>
                </div>
                <ul role="list" className="mt-6 flex flex-col space-y-6">
                  {section.map((item) => (
                    <li key={item.name} className="flow-root">
                      <a href={item.href} className="font-medium text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div> */}
              <div className="space-y-3 px-4 pb-4">
                <ul role="list" className="mt-4 flex flex-col space-y-3">
                  {sideMenuList.map((item) => (
                    <li
                      key={item.name}
                      className="flow-root cursor-pointer"
                      onClick={() => onClickSideBarItem(item?.href)}
                    >
                      <p className="font-medium text-slate-900">{item.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Sidebar;
