import React, { useState } from 'react';
import { motion } from 'motion/react';
import styled from 'styled-components';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    // Mock login - in real app, call API here
    localStorage.setItem('token', 'mock-token');
    toast.success('Đăng nhập thành công!');
    setTimeout(() => {
      navigate('/customer');
    }, 1000);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    // Mock signup - in real app, call API here
    toast.success('Đăng ký thành công!');
    setTimeout(() => {
      setIsSignUp(false);
      setFormData({ name: '', email: '', password: '' });
    }, 1000);
  };

  React.useEffect(() => {
    // Update CSS variables based on theme
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--font-color', '#e2e8f0');
      root.style.setProperty('--font-color-sub', '#94a3b8');
      root.style.setProperty('--bg-color', '#1e293b');
      root.style.setProperty('--main-color', '#e2e8f0');
    } else {
      root.style.setProperty('--font-color', '#323232');
      root.style.setProperty('--font-color-sub', '#666');
      root.style.setProperty('--bg-color', '#fff');
      root.style.setProperty('--main-color', '#323232');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-black' : 'bg-gray-50'}`}>
      <Toaster />
      <Header theme={theme} setTheme={setTheme} />
      
      <StyledWrapper>
        <div
          className="absolute inset-0 z-0"
          style={{
            background: theme === 'dark' 
              ? "radial-gradient(125% 125% at 50% 10%, #1e293b 40%, #0f172a 100%)"
              : "radial-gradient(125% 125% at 50% 10%, #fff 40%, #e2e8f0 100%)",
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex justify-center items-center min-h-[calc(100vh-200px)] py-12"
        >
          <div className="wrapper">
            <div className="card-switch">
              <label className="switch">
                <input 
                  type="checkbox" 
                  className="toggle" 
                  checked={isSignUp}
                  onChange={(e) => setIsSignUp(e.target.checked)}
                />
                <span className="slider" />
                <span className="card-side" />
                <div className="flip-card__inner">
                  <div className="flip-card__front">
                    <div className="title">Đăng nhập</div>
                    <form className="flip-card__form" onSubmit={handleLogin}>
                      <input 
                        className="flip-card__input" 
                        name="email" 
                        placeholder="Email" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      <input 
                        className="flip-card__input" 
                        name="password" 
                        placeholder="Password" 
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                      <button type="submit" className="flip-card__btn">Vào!</button>
                    </form>
                  </div>
                  <div className="flip-card__back">
                    <div className="title">Đăng ký</div>
                    <form className="flip-card__form" onSubmit={handleSignUp}>
                      <input 
                        className="flip-card__input" 
                        placeholder="Name" 
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                      <input 
                        className="flip-card__input" 
                        name="email" 
                        placeholder="Email" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      <input 
                        className="flip-card__input" 
                        name="password" 
                        placeholder="Password" 
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                      <button type="submit" className="flip-card__btn">Tạo</button>
                    </form>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </motion.div>
      </StyledWrapper>

      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

const StyledWrapper = styled.div`
  .wrapper {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
      /* display: flex; */
      /* flex-direction: column; */
      /* align-items: center; */
  }
  /* switch card */
  .switch {
    transform: translateY(-200px);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 50px;
    height: 20px;
  }

  .card-side::before {
    position: absolute;
    content: 'Đăng nhập';
    left: -90px;
    top: 0;
    width: 100px;
    text-decoration: underline;
    color: var(--text-primary);
    font-weight: 600;
  }

  .card-side::after {
    position: absolute;
    content: 'Đăng ký';
    left: 70px;
    top: 0;
    width: 100px;
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 600;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-colorcolor);
    transition: 0.3s;
  }

  .slider:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
  }

  .toggle:checked + .slider {
    background-color: var(--input-focus);
  }

  .toggle:checked + .slider:before {
    transform: translateX(30px);
  }

  .toggle:checked ~ .card-side:before {
    text-decoration: none;
  }

  .toggle:checked ~ .card-side:after {
    text-decoration: underline;
  }

  /* card */ 

  .flip-card__inner {
    width: 300px;
    height: 350px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
      /* width: 100%;
      height: 100%; */
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .toggle:checked ~ .flip-card__inner {
    transform: rotateY(180deg);
  }

  .toggle:checked ~ .flip-card__front {
    box-shadow: none;
  }

  .flip-card__front, .flip-card__back {
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: lightgrey;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .flip-card__back {
    width: 100%;
    transform: rotateY(180deg);
  }

  .flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .title {
    margin: 20px 0 20px 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: var(--main-color);
  }

  .flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .flip-card__input:focus {
    border: 2px solid var(--input-focus);
  }

  .flip-card__btn:active, .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  .flip-card__btn {
    margin: 20px 0 20px 0;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }`;


export default Login;
