import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import Title from './title';
import Content from './content';
import Actions from './actions';

const Modal = ({
  children,
  open = false,
  title,
  onClose = () => {},
  maxWidth = 'sm'
}) => {
  const childrenArray = React.Children.toArray(children);

  const contentChildren = childrenArray.filter((child, i) => child.props.section === 'content');
  const actionsChildren = childrenArray.filter((child, i) => child.props.section === 'actions');

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="dialog-title"
      open={open}
      maxWidth={maxWidth}
      fullWidth
    >
      <Title onClose={onClose}>
        {title}
      </Title>

      <Content dividers>
        {contentChildren}
      </Content>

      <Actions>
        {actionsChildren}
      </Actions>
    </Dialog>
  );
};

export default Modal;
