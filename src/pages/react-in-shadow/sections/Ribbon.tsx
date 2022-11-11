import * as React from "react";
import { Button, TabList, Tab, TabValue, TabListProps, Text } from '@fluentui/react-components';
import { ThemeSwitcher } from "./ThemeSwitcher";

const ThemeSwitcherPanel = ({ themeStore }) => {
    return (<div role="tabpanel" aria-labelledby="theme-switcher-tab">
      <Text size={400}>(Shadow DOM 1)</Text><br/>
        <ThemeSwitcher themeStore={themeStore}/>
        </div>);
}

export const RibbonView = () => {

    const [selectedValue, setSelectedValue] = React.useState<TabValue>('theme');
    const onTabSelect: TabListProps['onTabSelect'] = (_e, data) => {
        setSelectedValue(data.value);
    }
    return (<>
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        <Tab id="theme-switcher-tab" value="theme">Theme</Tab>
        <Tab id="tab2" value="tab2">Tab 2</Tab>
        <Tab id="tab3" value="tab3">Tab 3</Tab>
      </TabList>
      <div>
        {selectedValue === "theme" && <ThemeSwitcherPanel />}
        {selectedValue === "tab2" && <Button>🎃</Button>}
      </div>
    </>)
};
