export interface iTheme {
  id: string;
  name: string;
  colorScheme: string;
  icon: string;
  searchTag: string;
}

export interface iThemeStore {
  theme: iTheme;
  setTheme: (theme: iTheme) => void;
}
