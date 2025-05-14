import React from 'react';
import Image from 'next/image';
import img1 from '../../public/images/contact.gif'

const ContactForm = () => {
    return (
<>
 <div className='flex flex-col '>
         {/* img */}
         <div className='flex justify-center items-center '>
    <Image src={img1} alt='Contact Us' width={500} height={500} />
  </div>

        <div className="flex flex-col md:flex-row max-w-5xl md:justify-between mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-2">



            {/* Form Section */}
            <div className="w-full md:w-1/2 p-8  mr-2 ml-2 ">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 sm:text-blue-500">Get in Touch</h2>
                <form className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black "
                    />
                    <textarea
                        placeholder="Message"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-24 resize-none text-black"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* Contact Info and Map Section */}
            <div className="w-full md:w-1/2 bg-blue-600 text-white p-8 flex flex-col justify-center items-center border-l-2 md:rounded-l-full">
                <div>
                    <h2 className="text-2xl font-semibold mb-6 ">Contact Us</h2>
                    <p className="flex items-center mb-4">
                        <span className="material-icons text-white mr-2">location_on</span>
                        Address: AIR UNIVERSITY ISB
                    </p>
                    <p className="flex items-center mb-4">
                        <span className="material-icons text-white mr-2">phone</span>
                        Phone: +923095258923
                    </p>
                    <p className="flex items-center mb-4">
                        <span className="material-icons text-white mr-2">email</span>
                        Email: bilal441465@gmail.com
                    </p>
                    <p className="flex items-center">
                        <span className="material-icons text-white mr-2">language</span>
                        Website: yoursite.com
                    </p>
                </div>

              
            </div>
        </div>

  {/* Map Section */}
  <div className="mt-6 flex justify-center items-center p-6 ">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.8111050879884!2d73.02207907434472!3d33.713836435525764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbe5967d48243%3A0xcb2c90c562c4687e!2sAir%20University%20Islamabad!5e0!3m2!1sen!2s!4v1731695616920!5m2!1sen!2s"
                        width="100%"
                        height="600"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-md shadow-md"
                    ></iframe>
                </div>

 </div>


</>
    );
};

export default ContactForm;
