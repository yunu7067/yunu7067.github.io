import {btn} from '@coms/classes';
import {MoonLine, SunLine} from '@coms/icons';
import {BlogConfigType} from '@types';
import {createEffect, createSignal} from 'solid-js';

interface ThemeButtonProps {
  config: BlogConfigType;
}
export default function ThemeButton({config}: ThemeButtonProps) {
  const [isDarkMode, setDarkMode] = createSignal(false);

  createEffect(() => {
    console.log('create effect');
    const commentEl = document.getElementsByClassName('giscus-frame')[0] as unknown as {src: string};
    const theme = window.localStorage.getItem('theme');
    console.log({theme});

    if (theme === 'dark') {
      commentEl &&
        (commentEl.src = commentEl.src.replace(
          /\&theme=.*\&reactionsEnabled/,
          `&theme=${config.comments.giscus.darkTheme}&reactionsEnabled`,
        ));
    } else {
      commentEl &&
        (commentEl.src = commentEl.src.replace(
          /\&theme=.*\&reactionsEnabled/,
          `&theme=${config.comments.giscus.lightTheme}&reactionsEnabled`,
        ));
    }
    setDarkMode(theme === 'dark' || false);
  });

  const toggleTheme = () => {
    console.log('change Theme');
    /* 댓글도 변경해야함 */
    const commentEl = document.getElementsByClassName('giscus-frame')[0] as unknown as {src: string};
    /* 현재 값이 다크모드면 */
    if (isDarkMode()) {
      document.getElementsByTagName('html')[0].classList.remove('dark');
      commentEl &&
        (commentEl.src = commentEl.src.replace(
          `theme=${config.comments.giscus.darkTheme}`,
          `theme=${config.comments.giscus.lightTheme}`,
        ));
    } else {
      document.getElementsByTagName('html')[0].classList.add('dark');
      commentEl &&
        (commentEl.src = commentEl.src.replace(
          `theme=${config.comments.giscus.lightTheme}`,
          `theme=${config.comments.giscus.darkTheme}`,
        ));
    }
    window.localStorage.setItem('theme', isDarkMode() ? 'light' : 'dark');
    setDarkMode(!isDarkMode());
  };

  return (
    <button class={btn} onClick={toggleTheme} aria-label='dark mode toggle'>
      {isDarkMode ? <SunLine /> : <MoonLine />}
    </button>
  );
}
