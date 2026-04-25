import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software & Hardware Integration Intern</h4>
                <h5>CIRD – JPVL (Jaypee Power Ventures Ltd.)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built Python data validation framework, cutting verification overhead 40% on Linux infrastructure. 
              Designed AI-assisted hardware failure prediction layer; stress-tested via pytest, achieving 90%+ coverage. 
              Enforced CI/CD & code reviews, accelerating releases 80% and cutting integration defects 45%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research & Development Intern</h4>
                <h5>IIIT Allahabad</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Built Python prediction layer for 10+ failure scenarios; scikit-learn log classification at 85%+ accuracy. 
              Ran regression tests across 3 subsystems via pytest & Linux tools, cutting fault rate 30%. 
              Delivered modular Python utility library, reducing code redundancy 80% across lab workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Freelance</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Developing modern web applications using React, Node.js, and cloud technologies. 
              Passionate about creating intuitive user experiences and scalable backend systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
