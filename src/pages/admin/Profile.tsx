import * as React from "react";
import { Page, SectionContainer } from "../../component";
import {
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import AdminDetailsForm from "../../sections/admin/profile/AdminDetailsForm";
import {
  IconBuilding,
  IconLogin,
  IconOtp,
  IconSubscription,
  IconUser,
} from "../../config/icons.config";
import CompanyDetailsFormBk from "../../sections/admin/profile/CompanyDetailsForm";
import SubscriptionForm from "../../sections/admin/profile/Subscription";
import ChangePasswordForm from "../../sections/admin/profile/ChangePassword";
import FactorAuthentication from "../../sections/admin/profile/FactorAuthentication";

export default function Profile() {
  const [selectedMenu, setSelectedMenu] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedMenu(newValue);
  };

  // displays a tabbed menu with five options: Company Details, Admin Details, 2 Factor Authentication, Subscription, and Change Password
  return (
    <Page title="Admin Settings">
      <SectionContainer title="Admin Settings" id="admin-settings">
        <Stack spacing={5}>
          <Stack>
            <Tabs value={selectedMenu} onChange={handleChange}>
              <Tab
                icon={<IconBuilding />}
                label="Company Details"
                id="company-details"
                iconPosition="start"
              />
              <Tab
                icon={<IconUser />}
                iconPosition="start"
                label="Admin Details"
                id="admin-settings"
              />
              <Tab
                icon={<IconOtp style={{ fontSize: "1.5rem" }} />}
                iconPosition="start"
                label="2 Factor Authentication"
              />
              <Tab
                icon={<IconSubscription />}
                iconPosition="start"
                id="subsciption"
                label="Subscription"
              />
              {/* <Tab
                icon={<IconLogin />}
                iconPosition="start"
                id="changePassword"
                label="Change Password"
              /> */}
            </Tabs>
          </Stack>
          <Stack>
            {selectedMenu === 0 && <CompanyDetailsFormBk />}
            {selectedMenu === 1 && <AdminDetailsForm />}
            {selectedMenu === 2 && <FactorAuthentication />}
            {selectedMenu === 3 && <SubscriptionForm />}
            {selectedMenu === 4 && <ChangePasswordForm />}
          </Stack>
        </Stack>
      </SectionContainer>
    </Page>
  );
}
