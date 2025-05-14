import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/NEXUS_bg.png"; // Ensure this path is correct
import logo1 from "../../public/images/nexus-logo_o_bg.png"; 
import maintenanceGif from "../../public/images/maintenance.gif"; // Ensure this path is correct

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col  bg-gray-100 text-gray-800 p-3 ">
      {/* Header */}
      <header className="w-full flex   shadow-lg   rounded-b-full">
        <div className=" mx-auto px-4 py-4 flex justify-between">
          <Link href="https://github.com/miroslavpejic85/mirotalksfu" passHref>
           
          <div className="flex justify-between items-center w-full">
  <div className="flex justify-start items-start">
    <Image src={logo} alt="Nexus logo" width={100} className="rounded-full" />
  </div>
  <div className="flex justify-end items-end">
    <span className="ml-3 font-semibold text-2xl text-blue-700">Nexus</span>
  </div>
</div>



          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-3xl font-bold mb-4 p-6">
            We have got something special in store for you
          </h1>
          <p className="text-lg mb-4">
            And we cannot wait for you to see it. <br />
            Please check back soon.
          </p>
          <Link href="https://github.com/miroslavpejic85/mirotalksfu" passHref>
            <div className="py-8 ">
              <Image src={maintenanceGif} alt="Maintenance mode" 
              
              className="w-full max-w-xl rounded-lg mx-auto pulse" />
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#0070f3] text-gray-300 py-6 rounded-t-full">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <Link href="https://github.com/miroslavpejic85/mirotalksfu" passHref>
              <div className="inline-flex items-center shadow-4 rounded-full bg-black-2">
                <Image src={logo1} alt="Logo" width={100} height={48} />
              </div>
            </Link>
          </div>
          <p className="text-white">Contact: <Link  href="https://www.linkedin.com/in/muhammad-bilal-a21084244" passHref><span className="text-white">Muhammad Bilal</span></Link></p>
          <div className="mt-4">
            <ul className="flex justify-center space-x-6">
              {/* Social Media Links */}
              <li>
                <Link href="https://discord.gg/rgGYfeYW3N" passHref>
                  <span className="sr-only text-white">Discord</span>
                  {/* Replace with a Discord icon */}
                </Link>
              </li>
              <li>
                <Link href="https://www.facebook.com/mirotalk" passHref>
                  <span className="sr-only">Facebook</span>
                  {/* Replace with a Facebook icon */}
                </Link>
              </li>
              <li>
                <Link href="https://www.youtube.com/watch?v=_IVn2aINYww" passHref>
                  <span className="sr-only">YouTube</span>
                  {/* Replace with a YouTube icon */}
                </Link>
              </li>
              <li>
                <Link href="mailto:bilal441465@gmail.com" passHref>
                  <span className="sr-only">Email</span>
                  {/* Replace with a Mail icon */}
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-4 text-sm text-white">&copy; 2024 Nexus, all rights reserved</div>
        </div>
      </footer>
    </div>
  );
}
