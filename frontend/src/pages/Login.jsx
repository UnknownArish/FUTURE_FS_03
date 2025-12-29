// src/pages/Login.jsx
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--neon-green)]/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[var(--cyber-pink)]/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md p-8 glass rounded-2xl relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--neon-green)] to-[var(--cyan)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_var(--neon-green)]">
            <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.58.39-.88.21-2.42-1.48-5.47-1.81-9.07-.99-.33.07-.66-.14-.73-.47-.07-.33.14-.66.47-.73 3.96-.9 7.35-.53 10.01 1.1.3.18.39.58.21.88zm1.26-2.8c-.23.37-.72.49-1.09.26-2.85-1.75-7.19-2.26-10.55-1.24-.41.12-.84-.11-.96-.52-.12-.41.11-.84.52-.96 3.82-1.16 8.64-.59 11.83 1.37.37.23.49.72.26 1.09zm.11-2.92c-3.41-2.03-9.05-2.21-12.31-1.22-.52.16-1.07-.13-1.23-.65-.16-.52.13-1.07.65-1.23 3.76-1.14 10.01-.93 13.94 1.41.47.28.62.89.34 1.36-.28.47-.89.62-1.36.34z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Welcome Back</h1>
          <p className="text-[var(--text-secondary)]">Log in to continue your musical journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
            <input 
              type="email" 
              defaultValue="arish@example.com"
              className="w-full bg-[var(--bg-tertiary)] border border-transparent focus:border-[var(--neon-green)] rounded-lg px-4 py-3 text-[var(--text-primary)] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Password</label>
            <input 
              type="password" 
              defaultValue="password123"
              className="w-full bg-[var(--bg-tertiary)] border border-transparent focus:border-[var(--neon-green)] rounded-lg px-4 py-3 text-[var(--text-primary)] outline-none transition-all"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-[var(--neon-green)] hover:bg-[#1ed760] text-black font-bold py-3 rounded-full transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(29,185,84,0.3)]"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            Don't have an account? <a href="#" className="text-[var(--text-primary)] hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
