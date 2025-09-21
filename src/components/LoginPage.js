import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  // State management using React hooks
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: false });

  const navigate = useNavigate();
  const goToHomePage = () => {
    // 3. Use navigate to go to the new route
    navigate('/');
};
  // Effect to hide the toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  // Form submission handler
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('https://skillwell-loginapi.onrender.com/skillwell/v1/logapi/login?email_id=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToast({ show: true, message: '✅ Login Successful! Redirecting...', isSuccess: true });
        // Redirect after a short delay
        setTimeout(() => {
          // window.location.href = "./course.html"; // In React, you'd typically use React Router for this
          console.log("Redirecting to course page...");
        }, 1500);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setToast({ show: true, message: `❌ ${error.message || 'Network or server error.'}`, isSuccess: false });
      setIsLoading(false); // Restore UI only on failure
    }
  };

  return (
    <div className="font-['Poppins'] text-[#f0f0f0] bg-[#f2f2f3] bg-cover bg-center min-h-screen grid place-items-center">
      
      {/* --- Main Card --- */}
      <div className="w-[90%] max-w-[420px] lg:max-w-[660px] lg:h-[600px] bg-[rgba(10,20,30,0.6)] backdrop-blur-[25px] border border-[rgba(157,0,0,0.15)] rounded-[20px] shadow-[0_8px_32px_0_rgba(25,17,67,1)] overflow-hidden animate-fadeIn flex flex-col lg:flex-row">
        
        <div className="p-[30px] lg:p-10 flex flex-col justify-center flex-1">
          {/* <img src={LoginLogo} alt="Logo" className="block mx-auto mb-5 w-20 h-20 rounded-[40%] border-2 border-white/50" /> */}
          <img src="https://res.cloudinary.com/da72eh5rv/image/upload/v1755842584/SkillWell_Logo_1_wtphyo.png" alt="Logo" className="block mx-auto mb-5 w-20 h-20 rounded-[40%] border-2 border-white/50" />{/* Logo image from src*/}
          <h1 className="text-center text-white font-semibold text-[1.8rem] mb-2">Welcome Back</h1>
          <p className="text-center text-white/70 mb-[25px]">Log in to continue your journey</p> 

          <form id="loginForm" onSubmit={handleLogin}>
            <div className="relative mb-[15px]">
              <span className="absolute left-[15px] top-1/2 -translate-y-1/2 text-white/60">📧</span>
              <input 
                type="email" 
                id="email" 
                placeholder="you@example.com" 
                required 
                className="w-full py-[14px] pr-[15px] pl-[45px] bg-white/10 border border-white/20 rounded-[10px] text-[#f0f0f0] text-base transition-all duration-300 placeholder:text-white/50 focus:outline-none focus:border-[#3a79f7] focus:shadow-[0_0_10px_rgba(58,121,247,0.5)]" 
              />
            </div>
            <div className="relative mb-[15px]">
              <span className="absolute left-[15px] top-1/2 -translate-y-1/2 text-white/60">🔒</span>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                required 
                className="w-full py-[14px] pr-[15px] pl-[45px] bg-white/10 border border-white/20 rounded-[10px] text-[#f0f0f0] text-base transition-all duration-300 placeholder:text-white/50 focus:outline-none focus:border-[#3a79f7] focus:shadow-[0_0_10px_rgba(58,121,247,0.5)]" 
              />
            </div>
            <button 
              type="submit" 
              id="loginBtn" 
              disabled={isLoading} 
              className="w-full p-[14px] mt-5 bg-[#3a79f7] text-white border-none rounded-[10px] font-semibold text-base cursor-pointer transition-all duration-300 flex justify-center items-center hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_6px_20px_rgba(58,121,247,0.3)] disabled:bg-[#3a79f7]/50 disabled:cursor-not-allowed"
            >
              Log In
            </button>
          </form>

          <a onClick={goToHomePage} className="cursor-pointer block text-center mt-5 text-white/70 no-underline text-sm hover:text-white">
            ← Go to Homepage
          </a>
        </div>
      </div>

      {/* --- Toast Notification --- */}
      <div 
        className={`fixed top-5 py-[14px] px-[22px] rounded-lg font-medium shadow-lg transition-all duration-600 ease-in-out z-[9999] ${toast.isSuccess ? 'bg-[#4caf50]' : 'bg-[#ff4d4f]'} ${toast.show ? 'right-5' : '-right-full'}`}
      >
        {toast.message}
      </div>

      {/* --- Fullscreen Loader --- */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/85 flex flex-col justify-center items-center z-[99999] transition-opacity duration-400">
          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-[#3a79f7] border-r-[#ff6b6b] border-b-[#feca57] animate-spin"></div>
          <div className="mt-5 text-lg font-medium text-white animate-pulse">
            Logging you in...
          </div>
        </div>
      )}

    </div>
  );
}

export default LoginPage;