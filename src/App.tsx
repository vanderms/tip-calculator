import LogoURL from './assets/logo.svg';
import Calculator from './components/calculator';

export default function App() {
  return (
    <main className="nv-main">
      <a className='logo-link' href="/" aria-label="Homepage">
        <img src={LogoURL} alt="" />
      </a>
      <Calculator/>
    </main>
  );
}
