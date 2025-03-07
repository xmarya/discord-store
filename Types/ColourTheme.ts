export interface ColourTheme {
  themes: [
    {
      primary: string;
      secondary: string;
      accent: string;
      fontColour: string;
    }
  ];
}

export type ColourThemeDocument = ColourTheme;
