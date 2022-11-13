import {Clickable, MediumButton, SmallButton} from '$coms/classes';
import {GitHub, Loader5Line, MoonLine, SunLine} from '$coms/icons';
import type {BlogConfigType} from '$types';
import {classes} from '$utils';
import {createEffect, createSignal, Match, onMount, Show, Switch} from 'solid-js';

interface ThemeButtonProps {
  class: string;
  config: BlogConfigType;
}
export default function ThemeButton(props: ThemeButtonProps) {
  const [isLoading, setLoading] = createSignal(true);
  const [isDarkMode, setDarkMode] = createSignal(false);

  onMount(async () => {
    const commentEl = document.getElementsByClassName('giscus-frame')[0] as unknown as {
      src: string;
    };
    const theme = window.localStorage.getItem('theme');
    setDarkMode(theme === 'dark' || false);
    setLoading(false);
    // console.debug({theme});

    if (theme === 'dark') {
      commentEl &&
        (commentEl.src = commentEl.src.replace(
          /\&theme=.*\&reactionsEnabled/,
          `&theme=${props.config.comments.giscus?.darkTheme}&reactionsEnabled`,
        ));
    } else {
      commentEl &&
        (commentEl.src = commentEl.src.replace(
          /\&theme=.*\&reactionsEnabled/,
          `&theme=${props.config.comments.giscus?.lightTheme}&reactionsEnabled`,
        ));
    }
  });

  const toggleTheme = () => {
    // console.debug('change Theme');
    /* 댓글도 변경해야함 */
    const commentEl = document.getElementsByClassName('giscus-frame')[0] as unknown as {
      src: string;
    };
    /* 현재 값이 다크모드면 */
    if (isDarkMode()) {
      document.getElementsByTagName('html')[0].classList.remove('dark');
      commentEl &&
        (commentEl.src = commentEl.src.replace(
          `theme=${props.config.comments.giscus?.darkTheme}`,
          `theme=${props.config.comments.giscus?.lightTheme}`,
        ));
    } else {
      document.getElementsByTagName('html')[0].classList.add('dark');
      commentEl &&
        (commentEl.src = commentEl.src.replace(
          `theme=${props.config.comments.giscus?.lightTheme}`,
          `theme=${props.config.comments.giscus?.darkTheme}`,
        ));
    }
    window.localStorage.setItem('theme', isDarkMode() ? 'light' : 'dark');
    setDarkMode(!isDarkMode());
  };

  return (
    <button class={props.class} onClick={toggleTheme} aria-label='dark mode toggle'>
      <Switch fallback={<MoonLine />}>
        <Match when={isLoading()}>
          <Loader5Line class='animate-spin' />
        </Match>
        <Match when={isDarkMode()}>
          <SunLine />
        </Match>
      </Switch>
    </button>
  );
}
