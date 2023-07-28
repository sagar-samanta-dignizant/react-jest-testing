import { Stack, Tab, Tabs } from '@mui/material'
import React from 'react'
import { Page, SectionContainer } from '../../component'
import {
  IconUser,
} from '../../config/icons.config'
import ChangePasswordForm from '../../sections/admin/profile/ChangePassword'
import UserInfo from './UserInfo'

//functional component called Profile that renders a user profile page.
function Profile(props) {
  const [selectedMenu, setSelectedMenu] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedMenu(newValue)
  }

  //The component uses React hooks to manage the selected tab state of a Tabs component from Material-UI.
  //Based on the selectedMenu state variable, the component conditionally renders either a UserInfo component or a ChangePasswordForm component wrapped in a Stack component.
  return (
    <Page title="User Profile">
      <SectionContainer title="User Info">
        <Stack spacing={5}>
          <Stack>
            <Tabs value={selectedMenu} onChange={handleChange}>
              <Tab
                icon={<IconUser />}
                iconPosition="start"
                id="admin-details"
                label="User Detail"
              />

              {/* <Tab
                icon={<IconSubscription />}
                iconPosition="start"
                id="changePassword"
                label="Change Password"
              /> */}
            </Tabs>
          </Stack>
          <Stack>
            {selectedMenu === 0 && (
              <>
                <UserInfo />
              </>
            )}

            {selectedMenu === 1 && <ChangePasswordForm />}
          </Stack>
        </Stack>
      </SectionContainer>
    </Page>
  )
}

export default Profile
