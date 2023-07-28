import Drawer from "@mui/material/Drawer";

//The component contains the MUI Drawer component. The "anchor" prop is passed down from the props to determine the placement of the drawer on the screen. The "open" prop is set to the value of the corresponding state value for that anchor passed in through props. The "onClose" prop is set to a function that calls the "toggleDrawer" function also passed in through props
export default function DrawerComponent(props: any) {
  return (
    <div>
      <Drawer
        anchor={props.anchor}
        open={props.state[props.anchor]}
        onClose={props.toggleDrawer(props.anchor, false)}
        sx={{ zIndex: 1205 }}
      >
        {props.children}
      </Drawer>
    </div>
  );
}
