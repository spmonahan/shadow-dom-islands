import * as React from 'react';
import { Label, useId } from '@fluentui/react-components';
import { Select, SelectProps } from '@fluentui/react-components/unstable';
import { ThemeName } from '../../../state/themeStore';
import {  useShadowContext } from '../ReactShadowFluentThemeProvider';

const themes: ThemeName[] = [
    'Web Light',
    'Web Dark',
    'Teams Light',
    'Teams Dark',
    'Teams High Contrast',
];

type ThemeSwitcherProps = {};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = () => {

    const { setTheme } = useShadowContext();
    const [theme, setLocalTheme] = React.useState(themes[0]);
    const onThemeChange: SelectProps['onChange'] = (_, data) => {
        const value = data.value as ThemeName;
        setLocalTheme(value);
        setTheme(value);
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