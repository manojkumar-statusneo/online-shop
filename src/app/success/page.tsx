import Image from "next/image";
import Link from "next/link";
export default function Success() {
  return (
    <div className="flex h-screen  flex-col justify-center items-center text-center">
      <Image src="/success.gif" alt="1" height={100} width={100} />
      <p className="font-medium text-2xl mt-2"> Order place successfully</p>
      <p className="font-normal text-sm text-gray-600">
        Click below button to go back to home
      </p>
      <Link href={"/"}>
        <button className="p-2 px-6 bg-slate-900 rounded-[4px] mt-4 cursor-pointer">
          <p className="text-white">Home</p>
        </button>
      </Link>
    </div>
  );
}
