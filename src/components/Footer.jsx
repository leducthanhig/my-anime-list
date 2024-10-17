import facebookLogo from '../images/icons8-facebook-logo.svg'
import githubLogo from '../images/icons8-github.svg'
import linkedinLogo from '../images/icons8-linkedin-logo.svg'

export default function Footer() {
    return (
        <footer>
            <div>
                <a target="_blank" href="https://fb.com/leducthanh.ig">
                    <img className="contact-logo" src={facebookLogo}></img>
                </a>
                <a target="_blank" href="https://github.com/leducthanhig">
                    <img className="contact-logo" src={githubLogo}></img>
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/le-duc-thanh">
                    <img className="contact-logo" src={linkedinLogo}></img>
                </a>
            </div>
            <p>Copyright &copy; 2024 Lê Đức Thành</p>
        </footer>
    );
};