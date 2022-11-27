export interface iTheme {
  id: string;
  name: string;
  colorScheme: string;
  icon: string;
}

export interface iThemeStore {
  theme: iTheme;
  setTheme: (theme: iTheme) => void;
}
