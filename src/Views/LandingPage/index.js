import LeetcodeLogo from "../../Assets/Leetcode.png";
import "./styles.css";

export default function LandingPage(props) {
  return (
    <div className="content-container">
      <div
        className="landingpage-heading"
        style={props.color ?? { color: "white" }}
      >
        <div className="landingpage-title">
          <div>Katsudon </div>
          <img src={LeetcodeLogo} alt="leetcode" className="leetcode-logo" />
          <div>Leaderboard</div>
        </div>
        <div className="landingpage-details">
          <div className="landingpage-user-count"> 10 Registered Users</div>
          <button className="landingpage-get-started"> Get Started</button>
        </div>
      </div>
      <div className="content-block">
        <div>
          <div className="section-title" style={props.style}>
            How it works
          </div>
          <div className="section">
            This website is dependent on the{" "}
            <span style={props.style}>カツドン (Katsudon)</span> chrome
            extension.
            <br />
            When you successfully submit a Leetcode problem,{" "}
            <span style={props.style}>Katsudon</span> scrapes the details of the
            page's HTML and sends the needed information to the database
          </div>
        </div>
        <div>
          <div className="section-title" style={props.style}>
            Tech Stack
          </div>
          <div className="section">
            Backend server implemented using Node.js and TypeScript.
            <br />
            Using MongoDB as the noSQL database.
            <br />
            <span style={props.style}>Katsudon</span> chrome extension built
            with JavaScript and small hints of HTML
            <br />
            Frontend built with ReactJS and CSS
          </div>
        </div>

        <div>
          <div className="section-title" style={props.style}>
            Credits
          </div>
          <div className="section">
            <span style={props.style}>Qasim Wani</span>
            <br />
            This project was greatly motivated by QasimWani's LeetHub chrome
            extension, which auto commits your leetcode solutions to a github
            repository.
            <br />
            Originally, the plan was to scrape user's github repos using
            LeetHub. However, I was getting rate limited and anticipated that
            5,000 requests per hour definity won't be enough, since it costs 1
            per file read. <br />I decided to make my own Leetcode scraping
            extension to send the solution to my database to get around this
            rate limit.
          </div>
          <div style={{ height: "1rem" }} />
          <div className="section">
            <span style={props.style}>Kevin Chen</span>
            <br />
            Kevin:
            <li>"Hey guys should we buy a leetcode premium and share it?"</li>
            Me:
            <li>
              Sharing an account? It would be kind of weird seeing that a
              problem was solved if I've never even seen it.
            </li>
            <li>
              ...Though that would be a subtle way to tell that someone using
              the account was putting in good work.
            </li>
            <li>
              ...Is there a way to tell which problems our friends have solved?
              It doesn't seem like leetcode has a social platform outside of the
              discuss section.
            </li>
            <li> ...Guess I'll try to make it myself</li>
          </div>
          <div className="section">
            <span style={props.style}>SQL Professor</span>
            <br />
            Me: Hey professor, is there a way for me to create a schema to
            represent a graph of connections without having an having a garbage
            time complexity?
            <br />
            Professor:{" "}
            <span style={{ fontSize: "0.75rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incidid...
            </span>
            TLDR: There's gonna be tradebacks left and right, so choose your
            database wisely.
            <br />
            Me: I don't expect this webpage to blow up, so I guess I'll try
            MongoDB
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
