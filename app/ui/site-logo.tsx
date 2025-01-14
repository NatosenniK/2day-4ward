import {
  faFrown,
  faHockeyPuck,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link
      href="/"
      className={`flex flex-row items-center leading-none text-white`}
    >
      <FontAwesomeIcon
        icon={faSmile}
        className="fa-fw min-w-8 min-h-8 max-h-8 "
      />
      <p className={`text-[30px] hidden md:block px-2`}>2day 4ward</p>
      <div className="block md:hidden px-2"></div>
      <FontAwesomeIcon
        icon={faFrown}
        className="fa-fw min-w-8 min-h-8 max-h-8"
      />
    </Link>
  );
}
