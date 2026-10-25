// Inlined before paint to avoid FOUC when user has chosen a non-system theme.
export default function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);} }catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
