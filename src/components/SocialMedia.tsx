import LinkedInLogo from '../assets/linkedin-logo.svg';
import GitHubLogo from '../assets/github-logo.svg';
import MediumLogo from '../assets/medium-logo.svg';
import { ExternalLink } from "lucide-react"; // Assuming you want to use this icon

interface SocialMediaIconsProps {
  className?: string;
  iconClassName?: string;
}

const SocialMediaIcons = ({ className = "flex space-x-4 ", iconClassName = "icon" }: SocialMediaIconsProps) => {
  return (
    <div className={className}>
      <a
        href="https://www.linkedin.com/in/cl7/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="inline-block transform scale-[0.7] transition duration-300 ease-in-out hover:scale-[0.9] social-link opacity-50 hover:opacity-90"
      >
        <img src={LinkedInLogo} alt="LinkedIn" className={iconClassName} />
      </a>
      <a
        href="https://github.com/CL-LCQ"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="inline-block transform scale-[0.7] transition duration-300 ease-in-out hover:scale-[0.9] social-link opacity-50 hover:opacity-90"
      >
        <img src={GitHubLogo} alt="GitHub" className={iconClassName} />
      </a>
      <a
        href="https://medium.com/@charlesleclercq"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Medium"
        className="inline-block transform scale-[0.7] transition duration-300 ease-in-out hover:scale-[0.9] social-link opacity-50 hover:opacity-90"
      >
        <img src={MediumLogo} alt="Medium" className={iconClassName} />
      </a>
      {/* You can add more social media links here */}
    </div>
  );
};

export default SocialMediaIcons;