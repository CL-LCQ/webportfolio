import React from 'react';
import './Header.css'; // Import the CSS file
import LinkedInLogo from '../../assets/linkedin-logo.svg';
import GitHubLogo from '../../assets/github-logo.svg';
import MediumLogo from '../../assets/medium-logo.svg';

const HeaderContent = () => {
  return (
    <div className="headerContainer">
      <div className="col1">
        <div className="header-title">Hello </div>
        <div className="text">
        <div className="text">
  <p>I currently lead a product squad at ARxVision, a company who partnered with Microsoft to build the first generative AI wearable and suite of Apps.</p> 
  <p>Having worked at companies like the BBC, Ubisoft, and raised funding from Venture Capital, I can influence and collaborate at scale. Having worked at startups, I just get things done.</p>
  <p>My global experience (France, India, Spain, Romania, UK, USA) and diverse startup journey (UX design, code, GTM, public speaking, sales, scientific research) have made me a well-rounded individual with a deep appreciation for different perspectives and XFN collaboration.</p>
  <p>I'm motivated by ambitious, product-minded teams redefining sectors through thoughtful use of design, tech, and data. If you are part of one, click the orange button and let's chat!</p>
</div>

<a href="mailto:charles.lclcq@gmail.com" className="contact-button" target="_blank" rel="noopener noreferrer">
          <svg 
            width="22" 
            height="22" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ verticalAlign: 'middle', marginRight: '8px' }} 
          >
            <g>
              <path 
                d="M12.2266 21.5918C12.9297 21.5918 13.4277 20.9863 13.7891 20.0488L20.1855 3.33984C20.3613 2.89062 20.459 2.49023 20.459 2.1582C20.459 1.52344 20.0684 1.13281 19.4336 1.13281C19.1016 1.13281 18.7012 1.23047 18.252 1.40625L1.45508 7.8418C0.634766 8.1543 0 8.65234 0 9.36523C0 10.2637 0.683594 10.5664 1.62109 10.8496L8.67188 12.9199L10.7227 19.8828C11.0156 20.8691 11.3184 21.5918 12.2266 21.5918ZM9.11133 11.4355L2.37305 9.375C2.2168 9.32617 2.16797 9.28711 2.16797 9.21875C2.16797 9.15039 2.20703 9.10156 2.35352 9.04297L15.5566 4.04297C16.3379 3.75 17.0898 3.35938 17.8125 3.02734C17.168 3.55469 16.3672 4.17969 15.8301 4.7168ZM12.3828 19.4434C12.3047 19.4434 12.2656 19.375 12.2168 19.2188L10.1562 12.4805L16.875 5.76172C17.4023 5.23438 18.0566 4.41406 18.5742 3.75C18.2422 4.49219 17.8418 5.24414 17.5488 6.03516L12.5488 19.2383C12.4902 19.3848 12.4512 19.4434 12.3828 19.4434Z" 
                fill="white" 
              />
            </g>
          </svg>
          Contact Me
        </a>
        </div>
      </div>
      <div className="col2">
        <div className="header-title">Latest Talks</div>
        <div className="text">
        <ul>
            <li>🗣️ <strong>Google</strong> — "AI for Humans" — <em>Roundtable</em> (2024)</li>
            <li>🎙️ <strong>Google for Startups</strong> — "Storytelling for Pitching" — <em>Guest Speaker</em> (2024)</li>
            <li>🗣️ <strong>CSUN & Microsoft</strong> — "Hands-free AI" — <em>Keynote</em> (2024)</li>
            <li>🗣️ <strong>UC Berkeley</strong> — "Multi-modal Design Systems" — <em>Guest Lecture</em> (2023)</li>
        </ul>
        </div>
        <div className="header-title">Press & Media</div>
        <div className="text">
        <ul>
          <li>📰 <strong>Ophthalmology Times</strong> — <a href="https://europe.ophthalmologytimes.com/view/arxvision-seeing-ai-navilens-announce-partnership-for-headset-programme" target="_blank">"ARx & Microsoft Partnership"</a> (2024)</li>
          <li>📰 <strong>CNET Japan</strong> — <a href="https://japan.cnet.com/article/35120773/" target="_blank">"Kodama AR"</a> (2018) </li>
          <li>📰 <strong>QE Prize for Engineering</strong> — <a href="https://qeprize.org/news/kodama-3d-creation-made-childs-play" target="_blank">"3D creation made child's play"</a> (2018) </li>
          <li>📰 <strong>Wired</strong> — <a href="https://www.wired.it/attualita/tech/2016/12/17/kodama-pixar-fai/" target="_blank">"The PIXAR DIY"</a> (2016) </li>
          <li>🏆 <strong>Apple</strong> — <a href="https://www.macstories.net/news/apple-posts-best-of-2013-itunes-lists/" target="_blank">"Apple Best of 2013"</a> (2013) </li>
       </ul>
        </div>
        
      </div>
      <div className="col3">
      <div className="header-title">Publications</div>
      <div className="text">
        <ul>
          <li>📄 <strong>Patent</strong> — <a href="https://patents.google.com/patent/US20190220106A1/fr" target="_blank">"Object tracking system and method"</a></li>
          <li>📄 <strong>Research Paper</strong> — <a href="https://www.sciencedirect.com/science/article/abs/pii/S107158192300188X#:~:text=The%20AAR%20taxonomy%20consists%20of,Adapted%2C%20with%20three%20subcategories%20respectively." target="_blank">"Audio AR Definition"</a></li>
        </ul>
        </div>

        {/* <div className="header-title">Skills</div>
          <div className="text">
                <ul>
            
              <li>
                <strong>Product Management</strong> <br></br>
                <span className="chip ">Roadmap</span>
                <span className="chip">Jira</span>
                <span className="chip">Scrum</span>
              </li>
              
          
              <li>
                <strong>Product Design</strong> <br></br>
                <span className="chip">Protopie</span>
                <span className="chip">Figma</span>
                <span className="chip">Sketch</span>
              </li>

            
              <li>
                <strong>Engineering</strong> <br></br>
                <span className="chip">Python</span>
                <span className="chip">C++</span>
                <span className="chip">AWS</span>
              </li>
            </ul>
          </div> */}
        
        
        <div className="social-media">
          <div className="button-row">
            <a 
              href="https://www.linkedin.com/in/cl7/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="social-link"
            >
              <img src={LinkedInLogo} alt="LinkedIn" className="icon" />
              
            </a>
          </div>

          <div className="button-row">
            <a 
              href="https://github.com/CL-LCQ" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="social-link"
            >
              <img src={GitHubLogo} alt="GitHub" className="icon" />
              
            </a>
          </div>

          <div className="button-row">
            <a 
              href="https://medium.com/@charlesleclercq" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Medium"
              className="social-link"
            >
              <img src={MediumLogo} alt="Medium" className="icon" />
              
            </a>
          </div>
        </div>

        <br></br>
       
        



      </div>
    </div>
  );
};

export default HeaderContent;
