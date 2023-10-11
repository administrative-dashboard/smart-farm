import * as React from "react";
import { AbacProvider } from "react-abac";
import { AdminDesktop } from "./pages/admin/Desktop";
import { OwnerDesktop } from "./pages/owner/Desktop";

const permissions = {
  EDIT_GREENHOUSE: "EDIT_GREENHOUSE",
  EDIT_FIELD: "EDIT_FIELD",
  EDIT_FIXED_DEVICE: "EDIT_FIXED_DEVICE",
  EDIT_PORTABLE_DEVICE: "EDIT_PORTABLE_DEVICE",
  EDIT_ROLE: "EDIT_ROLE",
  EDIT_PRODUCT: "EDIT_PRODUCT",
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
const AbacApp = (props) => {
const isAdmin = roles.includes("ADMIN");

  const isOwner = roles.includes("OWNER");

  return (
    <AbacProvider
      user="Ani"
      roles="ADMIN"
      rules={props.rules}
    >
      {isAdmin ? (
        <AdminDesktop />
      ) : isOwner ? (
        <>
          <OwnerDesktop />
          
        </>
      ) : (
        <null />
      )}
    </AbacProvider>
  );
};

export default AbacApp;
