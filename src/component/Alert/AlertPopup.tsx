import SweetAlert2 from 'react-sweetalert2'

//This is a component that imports the "react-sweetalert2" library and exports a component called "Alert".
export default function Alert(props: any) {
  return <SweetAlert2  didOpen =
  {() => {
    const blurElement = document.createElement('div');
    // blurElement.classList.add('blur-background');
    document.body.appendChild(blurElement);
  }}  {...props.swalProps} {...props} />
}
