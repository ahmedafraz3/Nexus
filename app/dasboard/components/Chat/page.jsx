import Link from "next/link";
import Image from "next/image";
import img1 from "../../../dashboardimages/images/user/user-01.png"
import img2 from "../../../dashboardimages/images/user/user-02.png"
import img4 from "../../../dashboardimages/images/user/user-04.png"
import img5 from "../../../dashboardimages/images/user/user-05.png"


const chatData = [
  {
    avatar: img1,
    name: "Bilal Heilo",
    text: "How are you?",
    time: 12,
    textCount: 3,
    dot: 3,
  },
  {
    avatar: img2,
    name: "Fatima Nasir",
    text: "Waiting for you!",
    time: 12,
    textCount: 0,
    dot: 1,
  },
  {
    avatar: img4,
    name: "Aasia",
    text: "What's up?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: img5,
    name: "Ahmad Afraz",
    text: "Great",
    time: 32,
    textCount: 2,
    dot: 6,
  },
  {
    avatar: img1,
    name: "Bilal Heilo",
    text: "System still Working?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: img2,
    name: "Nimra",
    text: "Maintaince Progress?",
    time: 32,
    textCount: 3,
    dot: 6,
  },
];

const ChatCard = function () {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Chats
      </h4>

      <div>
        {chatData.map(function (chat, key) {
          return (
            <Link
              href="/"
              className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
              key={key}
            >
              <div className="relative h-14 w-14 rounded-full">
                <Image
                  width={56}
                  height={56}
                  src={chat.avatar}
                  alt="User"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
           <span
  className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white text-black flex items-center justify-center ${
    chat.dot === 6 ? "bg-meta-6" : `bg-meta-${chat.dot}`
  }`}
>
  {chat.dot}
</span>

              </div>

              <div className="flex flex-1 items-center justify-between">
                <div>
                  <h5 className="font-medium text-black dark:text-white">
                    {chat.name}
                  </h5>
                  <p>
                    <span className="text-sm text-black dark:text-white">
                      {chat.text}
                    </span>
                    <span className="text-xs"> . {chat.time} min</span>
                  </p>
                </div>
                {chat.textCount !== 0 && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <span className="text-sm font-medium text-white">
                      {chat.textCount}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChatCard;
