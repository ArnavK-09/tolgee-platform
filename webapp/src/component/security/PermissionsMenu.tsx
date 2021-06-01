import { Button, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { T } from '@tolgee/react';
import * as React from 'react';
import { ComponentProps, FunctionComponent } from 'react';

import { components } from '../../service/apiSchema';
import { RepositoryPermissionType } from '../../service/response.types';
import { RepositoryPermissions } from '../../hooks/useRepositoryPermissions';

export const PermissionsMenu: FunctionComponent<{
  selected: NonNullable<
    components['schemas']['RepositoryModel']['computedPermissions']
  >;
  onSelect: (
    value: NonNullable<
      components['schemas']['RepositoryModel']['computedPermissions']
    >
  ) => void;
  buttonProps?: ComponentProps<typeof Button>;
  minPermissions?: NonNullable<
    components['schemas']['RepositoryModel']['computedPermissions']
  >;
}> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  let types = Object.keys(RepositoryPermissionType);

  if (props.minPermissions) {
    types = types.filter((k) =>
      new RepositoryPermissions(k as any).satisfiesPermission(
        props.minPermissions as any
      )
    );
  }

  return (
    <>
      <Button
        data-cy="permissions-menu-button"
        {...props.buttonProps}
        variant="outlined"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <T>{`permission_type_${props.selected.toLowerCase()}`}</T>{' '}
        <ArrowDropDown fontSize="small" />
      </Button>
      <Menu
        data-cy="permissions-menu"
        elevation={1}
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {types.map((k) => (
          <MenuItem
            key={k}
            onClick={() => {
              props.onSelect(k as any);
              handleClose();
            }}
            disabled={k === props.selected}
            selected={k === props.selected}
          >
            <T>{`permission_type_${k.toLowerCase()}`}</T>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};