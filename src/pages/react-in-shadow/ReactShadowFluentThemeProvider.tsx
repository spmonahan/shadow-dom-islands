import * as React from 'react';
import { teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme, Theme, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { ThemeName } from 'src/state/themeStore';

const themes: Record<ThemeName, Theme> = {
    'Web Light': webLightTheme,
    'Web Dark': webDarkTheme,
    'Teams Light': teamsLightTheme,
    'Teams Dark': teamsDarkTheme,
    'Teams High Contrast': teamsHighContrastTheme,
};

type ShadowContextType = {
    theme: Theme;
    setTheme: (themeName: ThemeName) => void;
};

export const ShadowContext = React.createContext<ShadowContextType | null>(null);

export const useShadowContext = () => {
    const context = React.useContext(ShadowContext);
    if (!context) {
        throw new Error('useShadowContext must be used within a ShadowContextProvider');
    }
    return context;
}

export const ReactShadowFluentThemeProvider: React.FC = ({ children }) => {

    const [ themeName, setThemeName] = React.useState<ThemeName>('Web Light');
    const theme = themes[themeName];

    return <ShadowContext.Provider value={{ theme, setTheme: setThemeName }}>
            {children}
        </ShadowContext.Provider>;
};

