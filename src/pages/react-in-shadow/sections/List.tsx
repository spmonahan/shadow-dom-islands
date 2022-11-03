import * as React from "react";
import { makeStyles, Checkbox, Text, shorthands, Divider, tokens } from '@fluentui/react-components';
import { observer } from 'mobx-react';

const useListStyles = makeStyles({
    base: {
        overflowY: 'scroll',
        height: '100%',
    },

    list: {
        paddingLeft: '0',
    }
})

const useListItemStyles = makeStyles({
    wrapper: {
        marginBottom: tokens.spacingVerticalM,
    },

    base: {
        display: 'flex',
    },

    selection: {
        ...shorthands.flex(1)
    },

    info: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.flex(2)
    },

    meta: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.flex(1)
    }
});

const ListItem = ({ title, subject, teaser, date, index, listStore }) => {
    const styles = useListItemStyles();
    const formattedDate = React.useMemo(() => {
        return new Intl.DateTimeFormat('en-US').format(date)
    }, [date]);

    const onSelectionChange = (_e, data) => {
        if (data.checked) {
            listStore.setSelectedIndex(index);
        } else {
            listStore.setSelectedIndex(-1);
        }
    }

    return (<div className={styles.wrapper}>
    
    <div className={styles.base}>

        <Checkbox checked={index === listStore.selectedIndex} onChange={onSelectionChange} className={styles.selection} />

        <div className={styles.info}>
            <Text>{title}</Text>
            <Text>{subject}</Text>
            <Text>{teaser}</Text>
        </div>

        <div className={styles.meta}>
            <Text>{formattedDate}</Text>
        </div>

        

    </div>
    <Divider/>
    </div>);
};

const ListItemView = observer(({ listStore, ...rest } ) => {
    return <ListItem {...rest} listStore={listStore} />
});

export const List = ({ listStore }) => {

    const styles = useListStyles();

    return (<div className={styles.base}>
        <ul className={styles.list}>
            {listStore.list.map((item, index) => <ListItemView key={index} {...item} listStore={listStore} />)}
        </ul>
    </div>);

};

export const ListView = observer(({ listStore }) => {
    return <List listStore={listStore} />;
});