import type {GiscusProps, Theme} from '$types';

export interface GiscusConfigProps extends GiscusProps {
  lightTheme: Theme;
  darkTheme: Theme;
}

export type CommentsProvider = 'giscus';

export interface CommentsType {
  enabled: boolean;
  provider?: CommentsProvider;
  giscus?: GiscusConfigProps;
}
