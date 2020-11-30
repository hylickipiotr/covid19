import React from "react";
import { FacebookShareButton } from "react-share";
import {
  FOOTER_AVATAR_URL,
  FOOTER_GITHUB_PROFILE_URL,
  FOOTER_GITHUB_REPO_NAME,
  FOOTER_GITHUB_REPO_URL,
} from "../../constants/footer";
import Icon from "../Icon/Icon";

interface Props {}

const Footer: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center p-16 border-t">
      <div className="flex flex-col space-y-6 lg:space-y-0 lg:space-x-12 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex justify-center">
          <Icon icon={["fab", "github"]} className="w-4 h-4 text-gray-800" />
          <span className="ml-2 text-sm text-gray-500">
            Źródło:{" "}
            <a
              className="font-medium text-gray-800"
              href={FOOTER_GITHUB_REPO_URL}
              title={FOOTER_GITHUB_REPO_NAME}
            >
              {FOOTER_GITHUB_REPO_NAME}
            </a>
          </span>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <img
            className="rounded-full h-8 w-8 border border-gray-300"
            src={FOOTER_AVATAR_URL}
          />
          <span className="text-sm text-gray-500">
            Wykonane przez:{" "}
            <a
              href={FOOTER_GITHUB_PROFILE_URL}
              title="hylickipiotr (Piotr Hylicki)"
              className="font-medium text-gray-800"
            >
              Piotr Hylicki
            </a>
          </span>
        </div>
      </div>
      <div className="flex justify-center text-blue-500">
        <FacebookShareButton
          url={"https://covid19.hylickipiotr.now.sh/"}
          className="flex items-center"
        >
          <Icon icon={["fab", "facebook-f"]} className="w-4 h-4" />
          <span className="ml-2 text-sm">Udostępnij na Facebooku</span>
        </FacebookShareButton>
      </div>
    </div>
  );
};

export default Footer;
