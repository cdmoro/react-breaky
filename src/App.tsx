import React from 'react';
import defaultTheme from 'tailwindcss/defaultTheme'
import Breaky from './components/Breaky';

function App() {
  return (
    <div
      id="app"
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://source.unsplash.com/random/1600x900")',
      }}
    >
      <h1 className="text-white font-bold text-5xl">breaky</h1>
      <Breaky breakpoints={{
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        'full-hd': '1920px',
        '2k': '2048px',
        '4k': '3840px'
      }} />
    </div>
  )
}

export default App;
