import { Label, Slider, SpinButton, Text, useId, makeStyles, tokens, Input, shorthands } from "@fluentui/react-components";
import * as React from "react";

const useStyles = makeStyles({
    base: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: tokens.spacingVerticalM,
        ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    }
})

export const MessageView = () => {

    const styles = useStyles();

    const spinButtonId = useId('spinbutton');
    const inputId = useId('input');
    const sliderId = useId('slider');

    return (<div className={styles.base}>
        <Text size={800}>Fluent V9 Components</Text>
        <Text size={400}>(Shadow DOM 2)</Text>

        <Label htmlFor={spinButtonId}>SpinButton</Label>
        <SpinButton id={spinButtonId}/>

        <Label htmlFor={inputId}>Input</Label>
        <Input id={inputId} />

        <Label htmlFor={sliderId}>Slider</Label>
        <Slider id={sliderId} />
    </div>)
};