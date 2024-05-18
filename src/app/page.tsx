import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
    const {userId} = await auth();
    const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <div className="flex flex-col items-center text-center">

                <div className="flex items-center">
                    <h1 className="mr-3 text-5xl font-semibold"> Hermes can chat with PDF</h1>
                    <UserButton afterSignOutUrl="/" />
                </div>
                <div className="flex mt-2">
                    {isAuth && <Button>Start Uploading PDF</Button>}
                </div>
                <p className="max-w-l mt-5 text-lg text-slate-600">
                    Empower your PDF experience with <b>Hermes</b>.  Upload your document, ask your questions, and 
                    Hermes will efficiently guide you through your PDF journey
                </p>
                <div className="w-full mt-4">
                    {isAuth ? (<FileUpload />)
                    : (
                        <Link href="/sign-in">
                            <Button>Login to get Started!
                            <LogInIcon className="w-4 h-4 ml-2"/>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
