import * as React from 'react';
import { Label, useId } from '@fluentui/react-components';
import { Select, SelectProps } from '@fluentui/react-components/unstable';
import { ThemeStore, ThemeName } from '../../../state/themeStore';

const themes: ThemeName[] = [
    'Web Light',
    'Web Dark',
    'Teams Light',
    'Teams Dark',
    'Teams High Contrast',
];

type ThemeSwitcherProps = {
    themeStore: ThemeStore;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ themeStore }) => {

    const [theme, setTheme] = React.useState(themes[0]);
    const onThemeChange: SelectProps['onChange'] = (_, data) => {
        const value = data.value as ThemeName;
        setTheme(value);
        themeStore.setThemeName(value);
    };

    const selectId = useId('theme-switcher');

    return (
      <>
        <Label htmlFor={selectId}>Theme</Label>
        <Select
          id={selectId}
          value={theme}
          onChange={onThemeChange}
        >
          {themes.map((theme) => {
            return <option key={theme}>{theme}</option>;
          })}
        </Select>
      </>
    );
};