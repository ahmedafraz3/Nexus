import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserShield,
  faSignal,
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faDesktop,
  faHandPaper,
  faCheck,
  faBan,
  faTimes,
  faLocationDot,
  faUpload,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons'; // Correct import

const iconClasses = {
  presenter: faUserShield,
  guest: faSignal,
  audioOn: faMicrophone,
  audioOff: faMicrophoneSlash,
  videoOn: faVideo,
  videoOff: faVideoSlash,
  screenOn: faDesktop,
  screenOff: faDesktop,
  raiseHand: faHandPaper,
  acceptPeer: faCheck,
  banPeer: faBan,
  ejectPeer: faTimes,
  geoLocation: faLocationDot,
  sendFile: faUpload,
  sendMsg: faPaperPlane,
  sendVideo: faYoutube, // Use the YouTube icon here
};

export default function IconComponent({ type, active }) {
  return (
    <FontAwesomeIcon
      icon={iconClasses[type]}
      className={`text-lg ${active ? 'text-green-500' : 'text-red-500'} rounded-md border-2 size-5 p-2 `}
    />
  );
}
