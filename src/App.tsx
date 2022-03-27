import LogoURL from './images/logo.svg';

export default function App() {
  return (
   <main className='main'>
      <a href="/" aria-label='Homepage'>
        <img src={LogoURL} alt="" />
      </a>

   </main>
  );
}


