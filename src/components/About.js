import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import HeaderPage from "./HeaderPage";

export default function AboutPage() {
  const [loginMessage, setLoginMessage] = useState('');

  const navigate = useNavigate();
  const goToAnotherPage = () => {

    navigate('/Home');//HomePage Navigation
  };
  const goToLoginPage = () => {

    navigate('/login');//LoginPage Navigation
  };

  useEffect(() => {
    // Set Year
    const yr = document.getElementById("yr");
    if (yr) yr.textContent = new Date().getFullYear();

    // Count-up effect
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const dur = 1000;
    document.querySelectorAll(".n[data-count]").forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const isLPA = el.textContent.includes("LPA");
      const start = 0;
      const startTime = performance.now();

      function tick(now) {
        const p = Math.min((now - startTime) / dur, 1);
        const v = start + (target - start) * easeOut(p);
        el.textContent = isLPA
          ? v.toFixed(1) + " LPA"
          : el.dataset.count.endsWith("%")
            ? v.toFixed(0) + "%"
            : Math.round(v);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, []);
  const handleLogin = async (userType) => {
    setLoginMessage(`Attempting ${userType} login...`);
    try {
      await new Promise(res => setTimeout(res, 1000)); // Mock network delay
      setLoginMessage(`${userType} login successful!`);
    } catch (error) {
      setLoginMessage(`Network error during ${userType} login.`);
    }
    setTimeout(() => setLoginMessage(''), 4000);
  };


  return (
    <div className="bg-[#fafdff] text-[#222] font-sans text-[17px] leading-[1.7] min-h-screen">
      {/* Header */}
      <HeaderPage
        goToAnotherPage={goToAnotherPage}
        goToLoginPage={goToLoginPage}
        handleLogin={handleLogin}
      />
      {/* Main Section */}
      <main className="wrap px-2 sm:px-4 md:px-0 mt-9">
        <section className="about flex flex-col md:flex-row gap-6 md:gap-12 bg-white shadow p-3 sm:p-6 md:p-8 rounded-xl">
          {/* Left */}
          <div className="w-full md:flex-[2] md:min-w-[320px] mb-8 md:mb-0">
            <span className="inline-block bg-yellow-400 text-white font-semibold rounded-full px-4 py-1.5 text-[15px] mb-5 tracking-wide">
              Mission-First • Affordable & Job-Focused
            </span>
            <h1 className="title text-[2.2rem] font-extrabold mb-5 text-[#0b0d50] leading-tight">
              Learn without breaking the bank.
              <br /> Get placed without breaking a sweat.
            </h1>
            <p className="lead text-[1.15rem] text-[#27282b] mb-6">
              At <strong>SkillWell</strong>, we keep it simple:{" "}
              <em>low-cost, high-impact</em> courses that teach  what companies
              actually hire for. Taught by seasoned pros. Backed by real
              placement support. You learn. We open doors. You get hired.
            </p>

            <div className="pillrow flex flex-wrap gap-2 mb-5">
              {[
                "₹999 starter tracks",
                "Live & self-paced",
                "Mock interviews",
                "Resume & ATS prep",
                "Mentor hours",
                "Offer guarantee*",
              ].map((pill, idx) => (
                <span
                  key={idx}
                  className="pill bg-indigo-100 text-indigo-800 rounded-full px-4 py-1.5 text-[15px] font-medium shadow-sm"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="cta flex flex-col sm:flex-row gap-3 flex-wrap">
              <a
                href="./index.html"
                className="btn primary bg-[#0b0d50] text-white font-semibold rounded-xl px-7 py-3 shadow hover:bg-[#0b0d50]"
              >
                Browse Courses
              </a>
              <a
                href="#placements"
                className="btn ghost bg-white border border-[#0b0d50] text-[#0b0d50] font-semibold rounded-xl px-7 py-3 shadow hover:bg-[#0b0d50] hover:text-white"
              >
                See Placement Playbook
              </a>
            </div>

            <h3 className="text-md text-[#0b0d50] font-extrabold  mt-8">
              OUR STUDENTS ARE FROM
            </h3>

            <div className="partners overflow-x-auto mt-3">
              <div className="rail flex gap-8 animate-[scrollRail_18s_linear_infinite] items-center min-w-max">
                {[
                  "https://res.cloudinary.com/da72eh5rv/image/upload/v1755840488/gcoe_logo_gvulbh.png",
                  "https://res.cloudinary.com/da72eh5rv/image/upload/v1755842367/sasurie_clg_logo_tmtdap.png",
                  "https://res.cloudinary.com/da72eh5rv/image/upload/v1755842367/bharathidhasan_clg_logo_drj4oy.jpg",
                  "https://res.cloudinary.com/da72eh5rv/image/upload/v1755842367/Vels_Clg_ekjzb5.jpg",
                  "https://res.cloudinary.com/da72eh5rv/image/upload/v1755842368/Kasi_clg_logo_zdh446.png",
                  "https://res.cloudinary.com/da72eh5rv/image/upload/v1755842368/psv_clg_y49hsb.png",
                ].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Partner ${idx}`}
                    className="h-[38px] opacity-85 grayscale hover:grayscale-0 hover:opacity-100 transition"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="w-full md:flex-[1.8] md:min-w-[320px] flex flex-col gap-8">
            {/* Stats */}
            <div className="statgrid flex flex-col sm:flex-row gap-4">
              <div className="stat flex-1 bg-gray-500 rounded-xl p-4 sm:p-6 text-center shadow mb-4 sm:mb-0">
                <div className="n text-[2.1rem] font-bold text-[#0b0d50]" data-count="82%">
                  82%
                </div>
                <div className="text-sm  text-[#dde2ea]">
                  Success rate with our mentoring
                </div>
              </div>
              <div className="stat flex-1 bg-gray-500 rounded-xl p-6 text-center shadow ">
                <div className="n text-[2.1rem] font-bold text-[#0b0d50]" data-count="400+">
                  400+
                </div>
                <div className="text-sm text-[#dde2ea] ">
                  No. of course completed Students
                </div>
              </div>
              <div className="stat flex-1 bg-gray-500 rounded-xl p-6 text-center shadow">
                <div className="n text-[2.1rem] font-bold text-[#0b0d50]" data-count="7.2">
                  7.2 LPA
                </div>
                <div className="k text-sm text-[#dde2ea]">Highest package</div>
              </div>
            </div>

            {/* Values */}
            <div id="placements" className="values flex flex-col gap-4">
              <article className="v bg-[#fafdff] rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-[#0b0d50], mb-1 ">
                  Placement Playbook
                </h4>
                <p>
                  Career sprints, DSA drills, projects, mock tech rounds, and
                  referrals. You’ll know exactly what to do each week until you
                  sign the offer.
                </p>
              </article>
              <article className="v bg-[#fafdff] rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-[#0b0d50] mb-1">
                  Real-World Projects
                </h4>
                <p>
                  Ship portfolio-worthy builds reviewed by mentors. Less theory,
                  more delivery—so hiring managers see outcomes, not just
                  certificates.
                </p>
              </article>
              <article className="v bg-[#fafdff] rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-[#0b0d50] mb-1">
                  Transparent Pricing
                </h4>
                <p>
                  Low fees, clear refunds, and EMI options. No hidden “gotchas.”
                  Education should be an escalator, not a paywall.
                </p>
              </article>
            </div>

            {/* Testimonial */}
            <div className="twrap">
              <div className="t flex gap-3 bg-white rounded-xl shadow p-5">
                <div className="avatar w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#0b0d50] to-yellow-400"></div>
                <div>
                  <strong>Riya S.</strong> • Software Engineer, Acme Tech
                  <div className="meta text-sm text-gray-500">
                    Full-Stack Track → Offer in 39 days
                  </div>
                  <p className="mt-1 text-[#222] leading-[1.6]">
                    “No fluff. Projects were legit, mentors kept it real, and the placement
                    team pushed me past interview anxiety. Worth every rupee.”
                  </p>
                </div>
              </div>
            </div>


            {/* CTA */}
            <div className="cta flex flex-col sm:flex-row gap-3 mt-4">
              <a
                href="#apply"
                className="btn primary bg-[#0b0d50] text-white font-semibold rounded-xl px-7 py-3 shadow hover:bg-[#0b0d50]"
              >
                Apply Now
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="card bg-white shadow p-3 sm:p-6 mt-7 rounded-xl">
          <h2 className="mb-2 text-xl font-semibold">FAQs (Quick Hits)</h2>
          <details className="mb-2">
            <summary className="cursor-pointer text-[#0b0d50] font-semibold hover:text-yellow-400">
              How does placement work?
            </summary>
            <p className="mini text-sm mt-1">
              Finish core track + projects → career sprint → mock rounds →
              referrals & interviews. We stick with you through offer
              negotiation.
            </p>
          </details>
          <details className="mb  -2">
            <summary className="cursor-pointer text-[#0b0d50] font-semibold hover:text-yellow-400">
              Is there a refund if I’m not placed?
            </summary>
            <p className="mini text-sm mt-1">
              Yes—subject to <a href="#refund-policy">eligibility</a>{" "}
              (attendance, project completion, interview attempts). Transparent,
              documented, and on time.
            </p>
          </details>
          <details>
            <summary className="cursor-pointer text-[#0b0d50] font-semibold hover:text-yellow-400">
              Are courses really low cost?
            </summary>
            <p className="mini text-sm mt-1">
              Yes. Intro tracks start at ₹999. Scholarships and EMI options
              available for advanced programs.
            </p>
          </details>
        </section>

        {/* Footer */}
        <footer className="mini text-sm text-gray-500 text-center py-4">
          © <span id="yr"></span> SkillWell • Learn. Grow. Get Hired.
        </footer>
      </main>
    </div>
  );
}
