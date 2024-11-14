import Head from 'next/head'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Head>
        <title>Nexus - Privacy Policy</title>
        <link rel="icon" href="/images/logo.svg" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="app-webrtc" />
        <meta property="og:site_name" content="Nexus" />
        <meta property="og:title" content="Click the link to make a call." />
        <meta
          property="og:description"
          content="Nexus calling provides real-time HD quality and latency simply not available with traditional technology."
        />
        <meta property="og:image" content="https://sfu.mirotalk.com/images/mirotalksfu.png" />
      </Head>

      <header className="bg-white shadow-lg">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="brand">
              <Link href="/">
                {/* <img src="/images/logo.svg" alt="Nexus logo" className="h-10" /> */}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Nexus</strong> has an integrated <span className="text-blue-600">mediasoup server</span>.
              Routing is a multiparty topology, where each participant sends its media to this server and receives all other participants' media from it.
              Thanks to the SFU architecture, it allows many users to connect in the same room. The media streams are encrypted using Secure Real-time Transport Protocol (SRTP).
            </p>
            <p className="text-lg text-gray-600 mb-4">
              If you record a meeting,  the recording will be temporarily stored in <strong>Your browser</strong> as a <span className="text-blue-600">Blob</span>, and then downloaded to your PC or mobile device.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              We use <strong>Umami</strong> to track aggregated usage statistics to improve our service. The maker of <strong>Nexus</strong> has no intention of using or selling any of the above-mentioned data.
            </p>
            <Link href="/newroom">
              <span className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">AGREE</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white py-8">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <Link href="/">
              {/* <img src="/images/logo.svg" alt="Logo" className="h-10 mx-auto" /> */}
            </Link>
          </div>
          <ul className="list-reset text-gray-600 mb-4">
            <li><Link href="/about"><span className="text-blue-600 hover:underline">About</span></Link></li>
            <li className="mt-2">Contact: <span className="text-blue-600 hover:underline">Muhammad Bilal</span></li>
          </ul>
          <div className="flex justify-center space-x-4 mt-4">
            <span className="text-blue-600 hover:text-blue-800">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" fill="#0270D7"/></svg>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
