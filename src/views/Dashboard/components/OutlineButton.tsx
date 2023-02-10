import React from 'react';
import {Button} from "@material-ui/core";

const OutlineButton = (props: { icon: React.ReactNode; title: React.ReactNode; }) => (
    <Button variant="outlined" endIcon={props.icon} style={{borderColor: '#ffffff', borderRadius: '32px'}}>
        {props.title}
    </Button>
);

export default OutlineButton;