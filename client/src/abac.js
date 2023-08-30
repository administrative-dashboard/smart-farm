import * as React from "react";
import { AbacProvider, AllowedTo } from "react-abac";

const permissions = {
  VIEW_MAIN_DASHBOARD: "VIEW_MAIN_DASHBOARD",
  VIEW_PROFILE_INFO: "VIEW_PROFILE_INFO",
  EDIT_PROFILE_INFO: "EDIT_PROFILE_INFO",
  ADD_GREENHOUSE: "ADD_GREENHOUSE",
  DELETE_GREENHOUSE: "DELETE_GREENHOUSE",
  CREATE_FIELD: "CREATE_FIELD",
  DELETE_FIELD: "DELETE_FIELD",
  CREATE_FIXED_DEVICE: "CREATE_FIXED_DEVICE",
  DELETE_FIXED_DEVICE: "DELETE_FIXED_DEVICE",
  CREATE_PORTABLE_DEVICE: "CREATE_PORTABLE_DEVICE",
  DELETE_PORTABLE_DEVICE: "DELETE_PORTABLE_DEVICE",
  VIEW_OWN_INFO: "VIEW_OWN_INFO",
  VIEW_PLANNING_INFO: "VIEW_PLANNING_INFO",
  EDIT_PLANNING: "EDIT_PLANNING",
  VIEW_COMMUNITY_INFO: "VIEW_COMMUNITY_INFO",
  ADD_ROLE: "ADD_ROLE",
  ADD_PERMISSION: "ADD_PERMISSION",
  CREATE_ROLE: "CREATE_ROLE",
  VIEW_ALL_INFO: "VIEW_ALL_INFO",
};

const roles = {
  GUEST: "GUEST",
  EMPLOYEE: "EMPLOYEE",
  OWNER: "OWNER",
  COMMUNITY_MANAGER: "COMMUNITY_MANAGER",
  COMMUNITY_OWNER: "COMMUNITY_OWNER",
  ADMIN: "ADMIN",
};

const rules = {
  [roles.GUEST]: {
    [permissions.VIEW_MAIN_DASHBOARD]: true,
  },
  [roles.EMPLOYEE]: {
    [permissions.VIEW_MAIN_DASHBOARD]: true,
    [permissions.VIEW_PROFILE_INFO]: true,
    [permissions.EDIT_PROFILE_INFO]: true,
  },
  [roles.OWNER]: {
    [permissions.ADD_GREENHOUSE]: true,
    [permissions.DELETE_GREENHOUSE]: true,
    [permissions.CREATE_FIELD]: true,
    [permissions.DELETE_FIELD]: true,
    [permissions.CREATE_FIXED_DEVICE]: true,
    [permissions.DELETE_FIXED_DEVICE]: true,
    [permissions.CREATE_PORTABLE_DEVICE]: true,
    [permissions.DELETE_PORTABLE_DEVICE]: true,
    [permissions.VIEW_OWN_INFO]: true,
    [permissions.VIEW_PLANNING_INFO]: true,
    [permissions.EDIT_PLANNING]: true,
    [permissions.VIEW_PROFILE_INFO]: true,
    [permissions.EDIT_PROFILE_INFO]: true,
  },
  [roles.COMMUNITY_MANAGER]: {
    [permissions.ADD_GREENHOUSE]: true,
    [permissions.DELETE_GREENHOUSE]: true,
    [permissions.CREATE_GREENHOUSE]: true,
    [permissions.CREATE_FIELD]: true,
    [permissions.DELETE_FIELD]: true,
    [permissions.CREATE_FIXED_DEVICE]: true,
    [permissions.DELETE_FIXED_DEVICE]: true,
    [permissions.CREATE_PORTABLE_DEVICE]: true,
    [permissions.DELETE_PORTABLE_DEVICE]: true,
    [permissions.EDIT_PLANNING]: true,
    [permissions.VIEW_COMMUNITY_INFO]: true,
    [permissions.VIEW_PROFILE_INFO]: true,
    [permissions.EDIT_PROFILE_INFO]: true,
  },
  [roles.COMMUNITY_OWNER]: {
    [permissions.VIEW_COMMUNITY_INFO]: true,
    [permissions.ADD_ROLE]: true,
    [permissions.ADD_PERMISSION]: true,
    [permissions.CREATE_ROLE]: true,
    [permissions.VIEW_PROFILE_INFO]: true,
    [permissions.EDIT_PROFILE_INFO]: true,
  },
  [roles.ADMIN]: {
    [permissions.VIEW_ALL_INFO]: true,
    [permissions.VIEW_PROFILE_INFO]: true,
    [permissions.EDIT_PROFILE_INFO]: true,
  },
};


const EditProfile = () => <div>Edit Profile Component</div>;
const NotAllowed = () => <div>Not Allowed Component</div>;

const AbacApp = (props) => (
  <AbacProvider
    user={props.user}
    roles={props.userRoles}
    rules={rules}
    permissions={props.userPermissions}
  >
   
    <AllowedTo perform={permissions.EDIT_PROFILE_INFO}>
      {(allowed) => (allowed ? <EditProfile /> : <NotAllowed />)}
    </AllowedTo>
  </AbacProvider>
);


export default AbacApp;
