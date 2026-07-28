export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="dot" />
          MADE BY NIKHIL
        </div>

        <div className="footer-socials">
          
          <a  href="mailto:dsc.vitb@vitbhopal.ac.in"
            className="footer-icon"
            aria-label="Email"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 6.5C3 5.67157 3.67157 5 4.5 5H19.5C20.3284 5 21 5.67157 21 6.5V17.5C21 18.3284 20.3284 19 19.5 19H4.5C3.67157 19 3 18.3284 3 17.5V6.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M4 6.5L12 13L20 6.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          
          <a href="https://www.linkedin.com/company/dsc-vitb/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M7.5 10V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="7.5" cy="7" r="1.1" fill="currentColor" />
              <path
                d="M11 17V13.2C11 11.6 12 10.6 13.4 10.6C14.8 10.6 15.7 11.6 15.7 13.2V17"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          
          < a href="https://www.instagram.com/dsc_vitb?igsh=c2ttemQzanRxd282"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
            </svg>
          </a>
        </div>

        <div className="footer-meta">© 2026 DATAFORGE — All rights reserved</div>
      </div>
    </footer>
  )
}